import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function read(relPath) {
  return readFileSync(path.join(repoRoot, relPath), "utf8");
}

test("TP-13: generator preserves collateral content and passes --check", () => {
  const gettingStarted = read("build/getting-started/deployed-contracts.mdx");
  assert.match(gettingStarted, /StakingPoolSingletonsTable/);
  assert.match(gettingStarted, /contracts-staking-pools/);
  assert.match(gettingStarted, /immunefi\.com\/bug-bounty\/berachain/);
  assert.match(gettingStarted, /## Staking pool contracts/);

  const bendPage = read("build/bend/deployed-contracts.mdx");
  assert.match(bendPage, /immunefi\.com\/bug-bounty\/berachain/);

  const coreTable = read("snippets/contracts/generated/core-contracts-table.mdx");
  assert.match(coreTable, /BUSD/);
  assert.match(coreTable, /busd\/BUSD\.json/);
  assert.doesNotMatch(coreTable, /HONEY<br/);
  assert.match(coreTable, /AccountingOracle/);

  const bendMarkets = read("snippets/contracts/generated/bend-markets-table.mdx");
  assert.match(bendMarkets, /BUSD/);
  assert.doesNotMatch(bendMarkets, /HONEY/);

  const output = execSync("node scripts/contracts/generate-pages.mjs --check", {
    cwd: repoRoot,
    encoding: "utf8"
  });
  assert.match(output, /up to date/);
});
