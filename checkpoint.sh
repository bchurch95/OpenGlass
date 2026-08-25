#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
MSG="${1:-checkpoint: $(date +%Y-%m-%d_%H%M)}"
git add -A
if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi
git commit -m "$MSG"
git push
echo "Checkpoint pushed: $MSG"
