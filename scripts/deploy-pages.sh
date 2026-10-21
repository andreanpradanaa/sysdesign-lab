#!/usr/bin/env bash
# Deploy manual ke GitHub Pages lewat branch gh-pages.
# Dipakai selama workflow GitHub Actions (.github/workflows/ci.yml) belum bisa berjalan.
# Jalankan dari root repo: pnpm deploy:pages
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
SITE_URL="${SITE_URL:-https://andreanpradanaa.github.io}" BASE_PATH="${BASE_PATH:-/sysdesign-lab}" pnpm build
touch dist/.nojekyll
TMP="$(mktemp -d)"
cp -R dist/. "$TMP"
cd "$TMP"
git init -q -b gh-pages
git add -A
git commit -q -m "deploy: build from $(git -C "$ROOT" rev-parse --short HEAD)"
git push -f "$(git -C "$ROOT" remote get-url origin)" gh-pages:gh-pages
echo "Deployed: ${SITE_URL:-https://andreanpradanaa.github.io}${BASE_PATH:-/sysdesign-lab}/"
