import assert from "node:assert/strict";
import test from "node:test";

import { extractSolidityIdentifiers } from "../extract-solidity-identifiers.mjs";

const fixture = `
Stakers deposit BERA and receive \`stBERA\` shares. Rewards accrue as \\$WBERA on \`SmartOperator\`.
The pool calls \`deposit()\` and emits \`DepositSubmitted\` when a user stakes.
Minimum constant is \`MIN_EFFECTIVE_BALANCE\`.
`;

test("TP-10: extractor ignores token symbols and selects contract members only", () => {
  const ids = extractSolidityIdentifiers(fixture);
  assert.ok(ids.includes("deposit"));
  assert.ok(ids.includes("MIN_EFFECTIVE_BALANCE"));
  assert.ok(ids.includes("DepositSubmitted"));
  assert.equal(ids.includes("BERA"), false);
  assert.equal(ids.includes("WBERA"), false);
  assert.equal(ids.includes("stBERA"), false);
  assert.equal(ids.includes("SmartOperator"), false);
});
