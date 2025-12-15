#!/usr/bin/env node

/**
 * ANTI-SLOP CLI
 * 
 * Scan your project for AI slop patterns
 * 
 * Usage:
 *   npx anti-slop scan ./src
 *   npx anti-slop check index.html
 *   npx anti-slop suggest colors
 *   npx anti-slop prompts
 */

import { program } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import fg from 'fast-glob';
import chalk from 'chalk';
import { analyze, quickCheck, type AnalysisResult, type Detection } from './detector.js';
import { PATTERNS, getCriticalPatterns } from './patterns.js';
import { getAllPromptsAsText, ANTI_SLOP_SYSTEM_PROMPT, QUICK_INJECTIONS } from './prompts.js';
import { 
  FONT_ALTERNATIVES, 
  COLOR_PALETTES, 
  BUTTON_ALTERNATIVES, 
  CARD_ALTERNATIVES,
  suggestFontPairing 
} from './alternatives.js';

// ============================================================================
// CLI SETUP
// ============================================================================

program
  .name('anti-slop')
  .description('Detect and prevent AI-generated "slop" aesthetic in web projects')
  .version('1.0.0');

// ============================================================================
// SCAN COMMAND
// ============================================================================

program
  .command('scan [path]')
  .description('Scan a directory or file for slop patterns')
  .option('-v, --verbose', 'Show detailed output')
  .option('--json', 'Output as JSON')
  .option('--fix', 'Show fix suggestions')
  .action(async (targetPath = '.', options) => {
    const absolutePath = path.resolve(targetPath);
    
    if (!fs.existsSync(absolutePath)) {
      console.error(chalk.red(`Error: Path not found: ${absolutePath}`));
      process.exit(1);
    }

    const stats = fs.statSync(absolutePath);
    let files: string[];

    if (stats.isDirectory()) {
      files = await fg([
        '**/*.html',
        '**/*.htm',
        '**/*.jsx',
        '**/*.tsx',
        '**/*.vue',
        '**/*.svelte',
        '**/*.css',
        '**/*.scss',
        '**/*.less',
      ], {
        cwd: absolutePath,
        ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**'],
        absolute: true,
      });
    } else {
      files = [absolutePath];
    }

    if (files.length === 0) {
      console.log(chalk.yellow('No matching files found.'));
      return;
    }

    console.log(chalk.blue(`\n🔍 Scanning ${files.length} file(s) for slop patterns...\n`));

    let totalScore = 0;
    let totalDetections = 0;
    const allDetections: Array<Detection & { file: string }> = [];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const result = analyze(content);

      if (result.detections.length > 0) {
        totalScore += result.slopScore;
        totalDetections += result.detections.length;
        
        for (const detection of result.detections) {
          allDetections.push({ ...detection, file });
        }
      }
    }

    // Calculate overall grade
    const averageScore = files.length > 0 ? totalScore / files.length : 0;
    const overallGrade = scoreToGrade(averageScore);

    if (options.json) {
      console.log(JSON.stringify({
        filesScanned: files.length,
        averageScore,
        grade: overallGrade,
        totalDetections,
        detections: allDetections,
      }, null, 2));
      return;
    }

    // Print results
    printHeader('SCAN RESULTS');
    
    console.log(`Files scanned:  ${chalk.bold(files.length)}`);
    console.log(`Slop score:     ${formatScore(averageScore)}`);
    console.log(`Grade:          ${formatGrade(overallGrade)}`);
    console.log(`Issues found:   ${chalk.bold(totalDetections)}`);
    console.log();

    if (totalDetections === 0) {
      console.log(chalk.green('✨ No slop patterns detected! Your design looks distinctive.'));
      return;
    }

    // Group by severity
    const critical = allDetections.filter(d => d.pattern.severity === 'critical');
    const warnings = allDetections.filter(d => d.pattern.severity === 'warning');
    const info = allDetections.filter(d => d.pattern.severity === 'info');

    if (critical.length > 0) {
      printHeader('CRITICAL ISSUES', 'red');
      for (const detection of critical) {
        printDetection(detection, options.verbose, options.fix);
      }
    }

    if (warnings.length > 0) {
      printHeader('WARNINGS', 'yellow');
      for (const detection of warnings) {
        printDetection(detection, options.verbose, options.fix);
      }
    }

    if (options.verbose && info.length > 0) {
      printHeader('INFO', 'blue');
      for (const detection of info) {
        printDetection(detection, options.verbose, options.fix);
      }
    }

    // Summary
    console.log();
    printHeader('RECOMMENDATIONS');
    
    const seenPatterns = new Set<string>();
    for (const detection of [...critical, ...warnings].slice(0, 5)) {
      if (!seenPatterns.has(detection.pattern.id)) {
        console.log(chalk.cyan(`→ ${detection.pattern.name}:`));
        console.log(`  ${detection.pattern.alternatives[0]}`);
        seenPatterns.add(detection.pattern.id);
      }
    }

    console.log();
    console.log(chalk.dim('Run with --verbose for more details, or --fix for suggestions.'));
  });

// ============================================================================
// CHECK COMMAND (Quick single-file check)
// ============================================================================

program
  .command('check <file>')
  .description('Quick check if a file has slop patterns')
  .action((file) => {
    const absolutePath = path.resolve(file);
    
    if (!fs.existsSync(absolutePath)) {
      console.error(chalk.red(`Error: File not found: ${absolutePath}`));
      process.exit(1);
    }

    const content = fs.readFileSync(absolutePath, 'utf-8');
    const result = quickCheck(content);

    if (result.isSlop) {
      console.log(chalk.red(`\n❌ SLOP DETECTED (${result.confidence} confidence)\n`));
      console.log('Top issues:');
      for (const issue of result.topIssues) {
        console.log(chalk.yellow(`  • ${issue}`));
      }
      process.exit(1);
    } else {
      console.log(chalk.green('\n✅ Looks good! No major slop patterns detected.\n'));
    }
  });

// ============================================================================
// SUGGEST COMMAND
// ============================================================================

program
  .command('suggest <type>')
  .description('Get anti-slop suggestions (fonts, colors, buttons, cards)')
  .option('-n, --count <number>', 'Number of suggestions', '5')
  .action((type, options) => {
    const count = parseInt(options.count);

    switch (type.toLowerCase()) {
      case 'fonts':
        printHeader('FONT ALTERNATIVES');
        console.log(chalk.dim('Distinctive fonts to use instead of Inter/Space Grotesk:\n'));
        
        const fonts = FONT_ALTERNATIVES.slice(0, count);
        for (const font of fonts) {
          console.log(chalk.bold(font.name));
          console.log(chalk.cyan(`  Style: ${font.style}`));
          console.log(`  Vibe: ${font.vibe}`);
          console.log(`  Best for: ${font.bestFor.join(', ')}`);
          if (font.url) console.log(chalk.dim(`  ${font.url}`));
          console.log();
        }

        console.log(chalk.cyan('\n💡 Suggested pairing:'));
        const pairing = suggestFontPairing();
        console.log(`  Headlines: ${pairing.headline.name}`);
        console.log(`  Body: ${pairing.body.name}`);
        break;

      case 'colors':
        printHeader('COLOR PALETTE ALTERNATIVES');
        console.log(chalk.dim('Distinctive palettes to use instead of purple gradients:\n'));
        
        const palettes = COLOR_PALETTES.slice(0, count);
        for (const palette of palettes) {
          console.log(chalk.bold(palette.name));
          console.log(`  Vibe: ${palette.vibe}`);
          console.log(`  Best for: ${palette.bestFor.join(', ')}`);
          console.log(`  Primary: ${chalk.hex(palette.colors.primary)('████')} ${palette.colors.primary}`);
          console.log(`  Background: ${chalk.hex(palette.colors.background)('████')} ${palette.colors.background}`);
          console.log(`  Accent: ${chalk.hex(palette.colors.accent)('████')} ${palette.colors.accent}`);
          console.log();
        }
        break;

      case 'buttons':
        printHeader('BUTTON STYLE ALTERNATIVES');
        console.log(chalk.dim('Distinctive button styles:\n'));
        
        for (const btn of BUTTON_ALTERNATIVES) {
          console.log(chalk.bold(btn.name));
          console.log(`  ${btn.description}`);
          console.log(chalk.dim(`  Avoids: ${btn.avoids.join(', ')}`));
          console.log(chalk.cyan(`\n${btn.css}\n`));
        }
        break;

      case 'cards':
        printHeader('CARD STYLE ALTERNATIVES');
        console.log(chalk.dim('Distinctive card styles:\n'));
        
        for (const card of CARD_ALTERNATIVES) {
          console.log(chalk.bold(card.name));
          console.log(`  ${card.description}`);
          console.log(chalk.dim(`  Avoids: ${card.avoids.join(', ')}`));
          console.log(chalk.cyan(`\n${card.css}\n`));
        }
        break;

      default:
        console.log(chalk.red(`Unknown suggestion type: ${type}`));
        console.log('Available types: fonts, colors, buttons, cards');
        process.exit(1);
    }
  });

// ============================================================================
// PROMPTS COMMAND
// ============================================================================

program
  .command('prompts')
  .description('Output anti-slop prompts for AI tools')
  .option('--system', 'Output just the system prompt')
  .option('--quick', 'Output quick injection snippets')
  .option('--copy', 'Copy to clipboard (macOS only)')
  .action((options) => {
    let output: string;

    if (options.system) {
      output = ANTI_SLOP_SYSTEM_PROMPT;
    } else if (options.quick) {
      output = Object.entries(QUICK_INJECTIONS)
        .map(([name, text]) => `## ${name}\n\n${text.trim()}`)
        .join('\n\n---\n\n');
    } else {
      output = getAllPromptsAsText();
    }

    console.log(output);

    if (options.copy) {
      try {
        const { execSync } = require('child_process');
        execSync('pbcopy', { input: output });
        console.log(chalk.green('\n✓ Copied to clipboard!'));
      } catch {
        console.log(chalk.yellow('\n⚠ Could not copy to clipboard'));
      }
    }
  });

// ============================================================================
// PATTERNS COMMAND
// ============================================================================

program
  .command('patterns')
  .description('List all detectable slop patterns')
  .option('--critical', 'Show only critical patterns')
  .action((options) => {
    printHeader('SLOP PATTERNS');
    
    const patterns = options.critical ? getCriticalPatterns() : PATTERNS;
    
    for (const pattern of patterns) {
      const severityColor = {
        critical: 'red',
        warning: 'yellow',
        info: 'blue',
      }[pattern.severity] as 'red' | 'yellow' | 'blue';

      console.log(chalk.bold(pattern.name));
      console.log(chalk[severityColor](`  [${pattern.severity.toUpperCase()}] ${pattern.category}`));
      console.log(`  ${pattern.description}`);
      console.log(chalk.dim(`  Why it's bad: ${pattern.whyItsBad}`));
      console.log();
    }

    console.log(chalk.dim(`Total patterns: ${patterns.length}`));
  });

// ============================================================================
// INIT COMMAND
// ============================================================================

program
  .command('init')
  .description('Initialize anti-slop config in your project')
  .action(() => {
    const configPath = path.resolve('.anti-slop.json');
    
    if (fs.existsSync(configPath)) {
      console.log(chalk.yellow('Config file already exists: .anti-slop.json'));
      return;
    }

    const config = {
      extends: 'default',
      rules: {
        'slop-purple-gradient': 'error',
        'slop-font-inter': 'warn',
        'slop-blob-backgrounds': 'error',
        'slop-rounded-cards': 'warn',
        'slop-glassmorphism': 'warn',
        'slop-generic-headline': 'warn',
      },
      ignore: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.next/**',
      ],
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(chalk.green('✓ Created .anti-slop.json'));
    console.log(chalk.dim('Customize the rules to fit your project.'));
  });

// ============================================================================
// HELPERS
// ============================================================================

function printHeader(text: string, color: 'red' | 'yellow' | 'blue' | 'green' | 'white' = 'white') {
  console.log();
  console.log(chalk[color].bold(`═══ ${text} ${'═'.repeat(Math.max(0, 50 - text.length))}`));
  console.log();
}

function printDetection(detection: Detection & { file?: string }, verbose: boolean, showFix: boolean) {
  const icon = {
    critical: '🔴',
    warning: '🟡',
    info: '🔵',
  }[detection.pattern.severity];

  console.log(`${icon} ${chalk.bold(detection.pattern.name)}`);
  if (detection.file) {
    console.log(chalk.dim(`   ${path.relative(process.cwd(), detection.file)}`));
  }
  
  if (verbose) {
    console.log(chalk.gray(`   ${detection.pattern.description}`));
    console.log(chalk.gray(`   Matches: ${detection.matches.slice(0, 5).join(', ')}${detection.matches.length > 5 ? '...' : ''}`));
  }

  if (showFix && detection.pattern.alternatives.length > 0) {
    console.log(chalk.cyan(`   Fix: ${detection.pattern.alternatives[0]}`));
  }
  
  console.log();
}

function formatScore(score: number): string {
  if (score <= 10) return chalk.green(`${score.toFixed(1)}`);
  if (score <= 25) return chalk.green(`${score.toFixed(1)}`);
  if (score <= 45) return chalk.yellow(`${score.toFixed(1)}`);
  if (score <= 65) return chalk.red(`${score.toFixed(1)}`);
  return chalk.red.bold(`${score.toFixed(1)}`);
}

function formatGrade(grade: string): string {
  const colors: Record<string, typeof chalk.green> = {
    A: chalk.green.bold,
    B: chalk.green,
    C: chalk.yellow,
    D: chalk.red,
    F: chalk.red.bold,
  };
  return (colors[grade] || chalk.white)(grade);
}

function scoreToGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score <= 10) return 'A';
  if (score <= 25) return 'B';
  if (score <= 45) return 'C';
  if (score <= 65) return 'D';
  return 'F';
}

// ============================================================================
// RUN
// ============================================================================

program.parse();

