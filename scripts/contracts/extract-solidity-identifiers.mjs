/**
 * Extract Solidity member identifiers cited in MDX prose.
 * Contract-member positions only: calls, SCREAMING_SNAKE constants, and
 * PascalCase events/errors near emit/revert wording.
 */

const TOKEN_SYMBOLS = new Set(["BERA", "WBERA", "BGT", "HONEY", "ETH"]);
const BUILTIN_CALLS = new Set(["min", "max"]);
const ENV_IDENTIFIERS = new Set(["PRIVATE_KEY", "NODE_API_ADDRESS"]);

/**
 * @param {string} text
 * @returns {string[]}
 */
export function extractSolidityIdentifiers(text) {
  const found = new Set();

  for (const match of text.matchAll(/`([a-zA-Z_][a-zA-Z0-9_]*)\(/g)) {
    const id = match[1];
    if (BUILTIN_CALLS.has(id) || ENV_IDENTIFIERS.has(id)) continue;
    found.add(id);
  }

  for (const match of text.matchAll(/(?:^|[^\w.`])([a-z][a-zA-Z0-9_]*)\(/g)) {
    const id = match[1];
    if (BUILTIN_CALLS.has(id)) continue;
    found.add(id);
  }

  for (const match of text.matchAll(/`([A-Z][A-Z0-9_]+)`/g)) {
    const id = match[1];
    if (TOKEN_SYMBOLS.has(id) || ENV_IDENTIFIERS.has(id)) continue;
    if (!id.includes("_")) continue;
    found.add(id);
  }

  const lines = text.split("\n");
  for (const line of lines) {
    for (const match of line.matchAll(
      /(?:emits|reverts with|throws|error)\s+(?:\*\*)?`?([A-Z][a-zA-Z0-9_]*)`?/gi
    )) {
      found.add(match[1]);
    }
  }

  return [...found].sort();
}
