#!/bin/bash

# Quick test script - analyze a file for slop without MCP

if [ -z "$1" ]; then
  echo "Usage: ./test-slop.sh <file-path>"
  echo "Example: ./test-slop.sh /path/to/your/repo/src/app/page.tsx"
  exit 1
fi

FILE="$1"

if [ ! -f "$FILE" ]; then
  echo "Error: File not found: $FILE"
  exit 1
fi

echo "🔍 Analyzing $FILE for AI slop patterns..."
echo ""

# Use the CLI directly
node /Users/satoshi/anti-slop-lib/dist/cli.js scan "$FILE" --verbose

