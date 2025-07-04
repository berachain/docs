# Relayers

Relayers are opt-in, audited contracts that can make calls to the vault on behalf of users. They can use the sender's ERC20 vault allowance, internal balance, or BPTs after being approved.

## Types of Relayers

### BalancerRelayer

The BalancerRelayer allows users to execute multiple vault actions in a single transaction by chaining them together. This improves UX by reducing the number of transactions needed for complex operations.

Example of chaining multiple actions:

```js
// Approve relayer
const approval = buildApproval(signature);

// Chain exit pool and swap
const exitPoolCallData = buildExitPool(poolId, bptAmount);
const swapCallData = buildSwap(params);

// Execute all actions in one transaction
const tx = await relayer.multicall([approval, exitPoolCallData, swapCallData]);
```

### PoolCreationHelper

The PoolCreationHelper is a specialized relayer that simplifies pool creation and initial liquidity provision. See the [PoolCreationHelper](/developers/contracts/factory/pool-creation-helper) documentation for details.

Key features:

- Creates and joins pools in a single transaction
- Supports joining WBERA pools with either WBERA or BERA
- Handles both weighted and stable pool creation

## Approving a Relayer

Before a relayer can act on your behalf, you must approve it using the Vault's `setRelayerApproval` function:

```solidity
function setRelayerApproval(
    address sender,
    address relayer,
    bool approved
) external;
```

For example, to approve the PoolCreationHelper:

```js
const vault = new ethers.Contract(VAULT_ADDRESS, vaultAbi, wallet);
await vault.setRelayerApproval(
  wallet.address, // sender
  RELAYER_ADDRESS, // relayer
  true, // approved
);
```

> Note: Only approve relayers that have been audited and are part of the official BEX deployment.
