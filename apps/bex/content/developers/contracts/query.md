---
head:
  - - meta
    - property: og:title
      content: BEX Pool Interfacing
  - - meta
    - name: description
      content: Obtain quotes on pool swaps, joins and exits
  - - meta
    - property: og:description
      content: Obtain quotes on pool swaps, joins and exits
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BalancerQueries

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bex.balancerQueries.address.berachainMainnet">{{config.contracts.bex.balancerQueries.address.berachainMainnet}}</a><span v-if="config.contracts.bex.balancerQueries.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.bex.balancerQueries.abi">ABI JSON</a></span></small>

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

## Structs

These structs do not belong to the Query contract, but are used as parameters in the functions above and provided for convenience below:

```solidity
enum SwapKind { GIVEN_IN, GIVEN_OUT }

struct SingleSwap {
    bytes32 poolId;
    SwapKind kind;
    IAsset assetIn;
    IAsset assetOut;
    uint256 amount;
    bytes userData; // 0x for most swaps
}

struct FundManagement {
    address sender;
    bool fromInternalBalance;
    address payable recipient;
    bool toInternalBalance;
}

struct JoinPoolRequest {
    address[] assets,
    uint256[] maxAmountsIn,
    bytes userData,
    bool fromInternalBalance
}

struct ExitPoolRequest {
    address[] assets,
    uint256[] minAmountsOut,
    bytes userData,
    bool toInternalBalance
}
```
