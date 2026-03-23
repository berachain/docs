#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
DOCS_JSON="$(cd "$(dirname "$0")/.." && pwd)/docs.json"

if ! command -v jq &>/dev/null; then
  echo "jq is required. Install with: brew install jq" >&2
  exit 1
fi

if ! curl -s -o /dev/null --max-time 3 "$BASE_URL" 2>/dev/null; then
  echo "Cannot reach $BASE_URL — start the dev server first (make dev) or pass a reachable URL." >&2
  exit 1
fi

tmpfile=$(mktemp)
trap 'rm -f "$tmpfile"' EXIT

jq -r '.redirects[] | [.source, .destination] | @tsv' "$DOCS_JSON" > "$tmpfile"

total=$(wc -l < "$tmpfile" | tr -d ' ')
failed=0
ok=0
warned=0
skipped=0

while IFS=$'\t' read -r source destination; do
  if echo "$source" | grep -qE ':\w+\*'; then
    printf "SKIP  %-60s (wildcard)\n" "$source"
    skipped=$((skipped + 1))
    continue
  fi

  url="${BASE_URL}${source}"

  # -L follows redirects; -w gives final code + number of redirects
  read -r code hops <<< "$(curl -s -o /dev/null -L --max-redirs 10 --max-time 15 -w '%{http_code} %{num_redirects}' "$url")"

  if [ "$code" = "200" ] && [ "$hops" -le 1 ]; then
    printf "OK    %-60s -> %s\n" "$source" "$destination"
    ok=$((ok + 1))
  elif [ "$code" = "200" ] && [ "$hops" -gt 1 ]; then
    printf "WARN  %-60s -> %s  (%s hops)\n" "$source" "$destination" "$hops"
    warned=$((warned + 1))
  else
    printf "FAIL  %-60s -> %s  (HTTP %s after %s hops)\n" "$source" "$destination" "$code" "$hops"
    failed=$((failed + 1))
  fi
done < "$tmpfile"

echo ""
echo "Results: $total total, $ok ok, $warned warned, $failed failed, $skipped skipped"
[ "$failed" -eq 0 ]
