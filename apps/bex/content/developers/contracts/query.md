# BalancerQueries

This contract provides quotes on swaps, joins and exits, simulating these operations and returning the exact
result they would have if called on the `Vault` given the current state.

:::warning
Be careful not to use these functions to calculate `limits`, `maxAmountsIn` or `minAmountsOut` from within a smart contract transaction.

Doing so will leave you vulnerable to sandwich attacks.
:::

:::tip
All of the functions are defined as mutable functions, instead of `view`, even though that is a common use case.

For example in `ethers.js`, the command would look something like:

`const quote = await queryContract.callStatic.queryBatchSwap(0, [swap0, swap1], assets, funds)`
:::

## Functions

### querySwap

```solidity
function querySwap(IVault.SingleSwap memory singleSwap, IVault.FundManagement memory funds)
    external
    returns (uint256);
```

### queryBatchSwap

```solidity
function queryBatchSwap(
    IVault.SwapKind kind,
    IVault.BatchSwapStep[] memory swaps,
    IAsset[] memory assets,
    IVault.FundManagement memory funds
) external returns (int256[] memory assetDeltas);
```

### queryJoin

```solidity
function queryJoin(bytes32 poolId, address sender, address recipient, IVault.JoinPoolRequest memory request)
    external
    returns (uint256 bptOut, uint256[] memory amountsIn);
```

### queryExit

```solidity
function queryExit(bytes32 poolId, address sender, address recipient, IVault.ExitPoolRequest memory request)
    external
    returns (uint256 bptIn, uint256[] memory amountsOut);
```
