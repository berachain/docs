import assert from "node:assert/strict";
import test from "node:test";

import { renderStakingPoolsSnippet } from "../staking-pools-render.mjs";

const fixture = {
  stakingPools: {
    accountingOracle: {
      name: "AccountingOracle",
      address: {
        berachainMainnet: "0x89144B6342d8eB3DdC631a9c452A8414541426bb",
        berachainBepolia: "0x7f3eADA99702AD0E64b8B66808c2F85de4bF20da"
      },
      abi: {
        berachainMainnet:
          "https://github.com/berachain/abis/blob/main/mainnet/contracts-staking-pools/AccountingOracle.json",
        berachainBepolia:
          "https://github.com/berachain/abis/blob/main/bepolia/contracts-staking-pools/AccountingOracle.json"
      }
    }
  }
};

test("TP-7: staking pools singleton snippet includes AccountingOracle on both networks", () => {
  const rendered = renderStakingPoolsSnippet(fixture);
  assert.match(rendered, /AccountingOracle/);
  assert.match(rendered, /0x89144B6342d8eB3DdC631a9c452A8414541426bb/);
  assert.match(rendered, /0x7f3eADA99702AD0E64b8B66808c2F85de4bF20da/);
});
