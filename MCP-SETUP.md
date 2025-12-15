# Anti-Slop MCP Setup

## Quick Setup

### 1. Add to Cursor's MCP Config

Open your Cursor settings and add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "anti-slop": {
      "command": "node",
      "args": ["/Users/satoshi/anti-slop-lib/dist/mcp-server.js"]
    }
  }
}
```

### 2. Restart Cursor

Close and reopen Cursor for the MCP server to be recognized.

### 3. Use It!

In any project, you can now say things like:

- **"Analyze this file for AI slop patterns"**
- **"What design kit should I use for a newsletter blog?"**
- **"Get me the warm-editorial design kit"**
- **"Generate CSS variables for the swiss-precision kit"**
- **"Fix the design to not look AI-generated"**

---

## Available MCP Tools

### `analyze_for_slop`
Analyze code for slop patterns (purple gradients, Inter font, centered heroes, etc.)

```
Input: { code: "<your HTML/CSS/JSX>" }
Output: slopScore, grade, issues, recommendations
```

### `get_design_kit`
Get a complete design kit with fonts, colors, components, layouts.

```
Input: { kit: "warm-editorial" }
Output: Full kit with tokens, components, references
```

Available kits:
- `warm-editorial` — Literary, thoughtful (Fraunces + Satoshi)
- `swiss-precision` — Grids, hierarchy (Mona Sans)
- `brutalist-raw` — Punk energy (Space Mono)
- `forest-organic` — Natural, calm (Newsreader + General Sans)
- `noir-luxury` — Dark elegance (Cormorant Garamond + Satoshi)
- `vibrant-play` — Bold, joyful (Cabinet Grotesk + Lexend)

### `list_design_kits`
List all available kits with descriptions.

### `suggest_kit_for_project`
Get a kit recommendation based on project type.

```
Input: { projectType: "saas dashboard", vibe: "minimal" }
Output: Recommended kit with reasoning
```

### `get_css_variables`
Get CSS variables ready to paste into `globals.css`.

```
Input: { kit: "warm-editorial" }
Output: Complete CSS :root and .dark variables
```

### `get_tailwind_config`
Get Tailwind config extension for a kit.

```
Input: { kit: "warm-editorial" }
Output: theme.extend config object
```

---

## Example Workflow

### "Fix my sloppy website"

1. **Scan for slop:**
   > "Analyze this page.tsx for slop patterns"

2. **Get recommendation:**
   > "What design kit fits a developer blog?"

3. **Get the kit:**
   > "Give me the warm-editorial design kit"

4. **Generate CSS:**
   > "Generate the CSS variables for warm-editorial"

5. **Apply changes:**
   > "Update my globals.css with these variables"

---

## CLI Alternative

If you don't want MCP, you can use the CLI directly:

```bash
# Scan a project
cd /path/to/your-project
npx /Users/satoshi/anti-slop-lib scan ./src

# Get a kit
/Users/satoshi/anti-slop-lib/dist/cli.js kit warm-editorial --json

# List kits
/Users/satoshi/anti-slop-lib/dist/cli.js kits
```

---

## Troubleshooting

### MCP not working?

1. Check the path in `mcp.json` is correct
2. Restart Cursor completely
3. Check MCP server runs: `node /Users/satoshi/anti-slop-lib/dist/mcp-server.js`

### Build from source

```bash
cd /Users/satoshi/anti-slop-lib
npm install
npm run build
```

