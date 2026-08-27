#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
EVIDENCE="$ROOT/project/demos/evidence/BERA-940"
PORT="${MINT_PORT:-3456}"
LOG="$EVIDENCE/make-check.log"

mkdir -p "$EVIDENCE"

mint dev --port "$PORT" >/tmp/bera-940-mint.log 2>&1 &
MINT_PID=$!
cleanup() {
  kill "$MINT_PID" 2>/dev/null || true
}
trap cleanup EXIT

for _ in $(seq 1 120); do
  if curl -fsS "http://localhost:${PORT}/nodes/staking-pools/contracts" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

cd "$ROOT"
{
  echo "=== make test ==="
  make test
  echo "=== make check-generate ==="
  make check-generate
  echo "=== make check ==="
  BASE_URL="http://localhost:${PORT}" make check
} 2>&1 | tee "$LOG"

echo "VC-3 pass: transcript at $LOG"
