#!/bin/bash
# InspectPro push script — handles stale git lock files from Linux sandbox
# Usage: bash push.sh <github_pat> "optional commit message"
set -e
PAT=${1:?"Usage: bash push.sh <github_pat> [message]"}
cd "$(dirname "$0")"
rm -f .git/HEAD.lock .git/index.lock 2>/dev/null || true
MSG=${2:-"chore: update"}
git add -A
git commit -m "$MSG" || echo "(nothing to commit)"
git push "https://ncheewee:${PAT}@github.com/ncheewee/inspectPro.git" main
echo "✅ Pushed to GitHub Pages"
