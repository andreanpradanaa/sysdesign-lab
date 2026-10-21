#!/usr/bin/env bash
# PostToolUse (Edit|Write): format file yang baru diubah dengan Prettier, lalu lint cepat untuk TS/Astro/JS.
# Selalu exit 0 supaya tidak memblokir Claude; hasil lint hanya dilaporkan.
set -u
INPUT=$(cat)
FILE=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)
[ -z "$FILE" ] && exit 0
[ -f "$FILE" ] || exit 0
ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$ROOT" || exit 0

case "$FILE" in
  *.ts|*.mts|*.js|*.mjs|*.astro|*.md|*.mdx|*.json|*.css|*.yml|*.yaml)
    pnpm exec prettier --log-level warn --write "$FILE" >/dev/null 2>&1 || true
    ;;
esac

case "$FILE" in
  *.ts|*.mts|*.js|*.mjs|*.astro)
    OUT=$(pnpm exec eslint --no-warn-ignored "$FILE" 2>&1)
    if [ $? -ne 0 ]; then
      printf 'eslint: ada masalah di %s\n%s\n' "$FILE" "$OUT" | head -40 >&2
    fi
    ;;
esac
exit 0
