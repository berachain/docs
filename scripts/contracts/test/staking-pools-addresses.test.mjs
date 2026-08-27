import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const contractsJsonPath = path.join(repoRoot, "data/contracts.json");
const addressBookPath = "/Users/camembearbera/src/documentation/contracts-staking-pools/script/StakingPoolAddresses.sol";

function readAccountingOracleAddress(sol, networkFn) {
  const re = new RegExp(
    `${networkFn}\\(\\)\\s+internal\\s+pure\\s+returns[\\s\\S]*?accountingOracle:\\s*(0x[a-fA-F0-9]{40})`
  );
  const match = sol.match(re);
  assert.ok(match, `missing accountingOracle in ${networkFn}`);
  return match[1];
}

test("TP-8: AccountingOracle addresses and ABI URLs match the Solidity address book", () => {
  const contracts = JSON.parse(fs.readFileSync(contractsJsonPath, "utf8"));
  const oracle = contracts.stakingPools?.accountingOracle;
  assert.ok(oracle, "data/contracts.json must include stakingPools.accountingOracle");

  const sol = fs.readFileSync(addressBookPath, "utf8");
  const mainnet = readAccountingOracleAddress(sol, "_getMainnetStakingPoolAddresses");
  const bepolia = readAccountingOracleAddress(sol, "_getTestnetStakingPoolAddresses");

  assert.equal(oracle.address.berachainMainnet, mainnet);
  assert.equal(oracle.address.berachainBepolia, bepolia);

  const factory = contracts.stakingPools.stakingPoolContractsFactory;
  assert.deepEqual(Object.keys(oracle.abi).sort(), Object.keys(factory.abi).sort());

  assert.equal(
    oracle.abi.berachainMainnet,
    "https://github.com/berachain/abis/blob/main/mainnet/contracts-staking-pools/AccountingOracle.json"
  );
  assert.equal(
    oracle.abi.berachainBepolia,
    "https://github.com/berachain/abis/blob/main/bepolia/contracts-staking-pools/AccountingOracle.json"
  );
});
