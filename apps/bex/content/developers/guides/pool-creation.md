---
head:
  - - meta
    - property: og:title
      content: BEX Pool Creation Guide
  - - meta
    - name: description
      content: Guide for creating Berachain BEX pools
  - - meta
    - property: og:description
      content: Guide for creating Berachain BEX pools
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Pool Creation Guide

This guide demonstrates how to create a new BEX pool using the [PoolCreationHelper](/developers/contracts/factory/pool-creation-helper) contract. The PoolCreationHelper is a [Relayer](/developers/contracts/relayers) allowing pools to be created and joined in a single transaction, simplifying the pool creation process.

## Prerequisites

Before creating a pool, you'll need the addresses of tokens you want to include in your pool and tokens to join the pool.

## Example: Creating a Weighted Pool

In this example, we'll create a 50/50 HONEY-WBTC weighted pool using [Ethers.js](https://docs.ethers.org/v6/). Following pool creation, the pool will be joined with 1 HONEY and 0.0001 WBTC.

```js-vue
import { ethers } from "ethers";

// Initialize provider and wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Pool parameters
const poolName = "HONEY-WBTC-WEIGHTED";
const poolSymbol = "50HONEY-50WBTC";
const createPoolTokens = [
  honeyToken.address,
  wbtcToken.address
].sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1);

// 50-50 weights (must add up to 1e18)
const normalizedWeights = [
  ethers.parseUnits('0.5', 18),
  ethers.parseUnits('0.5', 18)
];

// Initial liquidity amounts
const amountsIn = [
  ethers.parseUnits('1', 18),     // 1 HONEY (18 decimals)
  ethers.parseUnits('0.0001', 8)  // 0.0001 WBTC (8 decimals)
];
```

### Step 1: Approve the PoolCreationHelper

The PoolCreationHelper must be approved as a relayer in the Vault contract:

```js
const vault = new ethers.Contract(
  VAULT_ADDRESS,
  [
    "function setRelayerApproval(address sender, address relayer, bool approved)",
  ],
  wallet
);

await vault.setRelayerApproval(
  wallet.address, // sender
  POOL_CREATION_HELPER_ADDRESS, // relayer
  true // approved
);
```

### Step 2: Approve Tokens

The Vault contract needs approval to spend your tokens:

```js
for (const [i, tokenAddress] of createPoolTokens.entries()) {
  const tokenContract = new ethers.Contract(
    tokenAddress,
    ["function approve(address spender, uint256 amount)"],
    wallet
  );

  await tokenContract.approve(VAULT_ADDRESS, amountsIn[i]);
}
```

### Step 3: Create and Join Pool

Finally, create and join the pool in a single transaction. We leverage the function [`createAndJoinWeightedPool`](/developers/contracts/factory/pool-creation-helper#createandjoinweightedpool).

```js
const poolCreationHelper = new ethers.Contract(
  POOL_CREATION_HELPER_ADDRESS,
  POOL_CREATION_HELPER_ABI,
  wallet
);

const tx = await poolCreationHelper.createAndJoinWeightedPool(
  poolName,
  poolSymbol,
  createPoolTokens,
  createPoolTokens, // joinPoolTokens same as createPoolTokens
  normalizedWeights,
  createPoolTokens.map(() => ethers.ZeroAddress), // no rate providers
  ethers.parseUnits("0.01", 18), // 1% swap fee
  amountsIn,
  wallet.address, // pool owner
  ethers.keccak256(ethers.toUtf8Bytes(`${poolName}-${wallet.address}`)) // salt
);
```
