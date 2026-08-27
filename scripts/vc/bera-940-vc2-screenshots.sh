#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
EVIDENCE="$ROOT/project/demos/evidence/BERA-940"
PORT="${MINT_PORT:-3456}"
BASE="http://localhost:${PORT}"

mkdir -p "$EVIDENCE"

mint dev --port "$PORT" >/tmp/bera-940-mint-vc2.log 2>&1 &
MINT_PID=$!
cleanup() {
  kill "$MINT_PID" 2>/dev/null || true
}
trap cleanup EXIT

for _ in $(seq 1 120); do
  if curl -fsS "${BASE}/nodes/staking-pools/contracts" >/dev/null 2>&1; then
    break
  fi
  sleep 1
done

CONTRACTS_HTML="$EVIDENCE/contracts-reference.html"
OPERATORS_HTML="$EVIDENCE/operator-guide.html"
curl -fsS "${BASE}/nodes/staking-pools/contracts" -o "$CONTRACTS_HTML"
curl -fsS "${BASE}/nodes/staking-pools/operators" -o "$OPERATORS_HTML"

for needle in AccountingOracle 0x89144B6342d8eB3DdC631a9c452A8414541426bb 0x7f3eADA99702AD0E64b8B66808c2F85de4bF20da; do
  rg -q "$needle" "$CONTRACTS_HTML"
done

for needle in updateTotalDeposits FEEDER_ROLE coveredByOperator DepositSubmitted queueBoost retryFullExit NotFullyExited PendingWithdrawalInFlight FullExitRequestRetried MIN_EFFECTIVE_BALANCE MIN_CL_DEPOSIT_AMOUNT; do
  rg -q "$needle" "$OPERATORS_HTML"
done

npx --yes playwright@1.49.1 install chromium >/tmp/bera-940-playwright-install.log 2>&1
npx --yes playwright@1.49.1 screenshot --full-page "${BASE}/nodes/staking-pools/contracts" "$EVIDENCE/contracts-reference.png"
npx --yes playwright@1.49.1 screenshot --full-page "${BASE}/nodes/staking-pools/operators" "$EVIDENCE/operator-guide.png"

echo "VC-2 pass: screenshots and HTML captures in $EVIDENCE"
