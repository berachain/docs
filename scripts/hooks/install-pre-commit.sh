#!/usr/bin/env sh
set -e

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)"

mkdir -p "$ROOT_DIR/.git/hooks"
cp "$ROOT_DIR/.githooks/pre-commit" "$ROOT_DIR/.git/hooks/pre-commit"
chmod +x "$ROOT_DIR/.git/hooks/pre-commit"

echo "Installed pre-commit hook to .git/hooks/pre-commit"
