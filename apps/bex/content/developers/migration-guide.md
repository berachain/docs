---
head:
  - - meta
    - property: og:title
      content: BEX Migration Guide
  - - meta
    - name: description
      content: Guide for migrating to the Balancer implementation of BEX
  - - meta
    - property: og:description
      content: Guide for migrating to the Balancer implementation of BEX
---

# BEX Migration Guide: v1 to v2

## TODO

- Replace Balancer mentions
- Replace SDK import

## Introduction

This guide assists developers in migrating their code from the Ambient Finance implementation of BEX (v1 BEX, launched with bArtio Testnet) to the most recent Balancer-based implementation (v2 BEX).

## Contents [TODO: provide links]

1. Swaps using a) the `BeraCrocMultiSwap` router; and b) `userCmd`
2. Pool Creation
3. Adding Liquidity
4. Subgraph Queries

## General Notes

- v1 BEX: Required off-chain logic for finding `poolIndex` and determining `base` and `quote` tokens, which dictate the `isBuy` parameter.
- v2 BEX: Requires off-chain logic for finding the `poolId` (a 32-byte identifier).
  - Utilizes the Smart Order Router (SOR) [Link TODO] for this purpose.

## 1. Swaps

### Migrating from `BeraCrocMultiSwap`

`BeraCrocMultiSwap` was a convenience router for executing swaps in v1 BEX.

#### v1 BEX Example:

```javascript
const steps = [
  {
    base: baseTokenAddress,
    quote: quoteTokenAddress,
    poolIdx: poolIndex,
    isBuy: true,
  },
];
const amount = ethers.utils.parseUnits("1", 18);
const minOut = ethers.utils.parseUnits("0.99", 18);

await swapRouter.multiSwap(steps, amount, minOut);
```

#### v2 BEX Example:

In v2 BEX, we leverage the SOR [Link TODO] to construct our swap:

```js
import { BalancerSDK } from '@balancer-labs/sdk'

const balancer = new BalancerSDK({
  network: 80084,
  rpcUrl: 'https://bartio.rpc.berachain.com'
});

const { swaps } = balancer;

const swapInfo = await swaps.findRouteGivenIn({
  tokenIn: 'tokenToSell',
  tokenOut: 'tokenToBuy',
  amount: parseEther('1'),
  gasPrice: parseFixed('1', 9),
  maxPools: 4, // number of pools included in path
});

const tx = this.buildSwap({
  userAddress: 'senderAddress',
  recipient: 'recipientAddress',
  swapInfo,
  kind: SwapType.SwapExactIn,
  deadline: blockTimestamp,
  maxSlippage: maxSlippage, // in basis points (e.g., 100 = 1%)
});

const signer = balancer.provider.getSigner();
await signer.sendTransaction({
  to: tx.to,
  data: tx.data,
  value: tx.value
});
});

// Broadcast Transaction

const signer = balancer.provider.getSigner()
await signer.sendTransaction({
  to: tx.to,
  data: tx.data,
  value: tx.value
})
```

[TODO share example `swapInfo` output]

### Migrating from `userCmd` (Solidity)

If the `poolId` is known, the **v2 BEX** swap transaction can be encoded as follows:

```solidity=
import "@balancer-labs/v2-interfaces/contracts/vault/IVault.sol";

contract YourContract {
    function performSwap(
        bytes32 poolId,
        address tokenIn,
        address tokenOut,
        uint256 amount,
        uint256 limit
    ) external {
        IVault.SingleSwap memory singleSwap = IVault.SingleSwap({
            poolId: poolId,
            kind: IVault.SwapKind.GIVEN_IN,
            assetIn: IAsset(tokenIn),
            assetOut: IAsset(tokenOut),
            amount: amount,
            userData: ""
        });

        IVault.FundManagement memory funds = IVault.FundManagement({
            sender: address(this),
            fromInternalBalance: false,
            recipient: payable(msg.sender),
            toInternalBalance: false
        });

        uint256 deadline = block.timestamp + 600; // 10 minutes

        IVault(vaultAddress).swap(singleSwap, funds, limit, deadline);
    }
}
```

## 2. Pool Creation

In **v1 BEX**, pool types are defined by the `poolIdx` parameter (e.g.`36001`).

In **v2 BEX**, pool creation is accomplished through different **pool factories**, depending on the pool type ([Weighted](/developers/contracts/factory/weighted-pool-factory) or [Stable](/developers/contracts/factory/stable-pool-factory)).

#### v1 BEX Example (full-range liquidity):

```solidity
bytes memory initPoolCmd =
            abi.encode(71, token, address(0x7507c1dc16935B82698e4C63f2746A2fCf994dF8), 36001, sqrtPriceTargetX96);

dex.userCmd(3, initPoolCmd); // ColdPath callpath
```

#### v2 BEX Weighted Pool Creation:

```solidity=
import "@balancer-labs/v2-pool-weighted/contracts/WeightedPoolFactory.sol";

IWeightedPoolFactory factory = IWeightedPoolFactory(factoryAddress);
address pool = factory.create(
    "Pool Name", // Name
    "POOL", // Symbol
    [token1Address, token2Address],
    [weight1, weight2], // Adds up to 1e18
    [address(0), address(0)], // Rate provider addresses
    swapFeePercentage, // e.g. 1e16 == 1% [uint256]
    ownerAddress // Owner can set parameters like swap fee
    salt // For determinstic deploys [bytes32]
);
```

## 3. Adding Liquidity

#### v1 BEX Example

```solidity=
bytes memory addToPoolCmd = abi.encode(
    31, // tokenAmount denominated in base token
    baseToken,
    quoteToken,
    poolIndex,
    lowerTick, // 0 for full-range liquidity
    upperTick, // 0 for full-range liquidity
    tokenAmount, // baseToken liquidity to add
    limitLower,
    limitHigher,
    reserveFlags,
    lpConduit // LP token address
);

dex.userCmd(128, addToPoolCmd); // WarmPath callpath
```

#### v2 BEX Example:

```solidity=
import "@balancer-labs/v2-interfaces/contracts/vault/IVault.sol";

// Encode the userData for joining the pool
bytes memory userData = abi.encode(
    WeightedPoolUserData.JoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT,
    [tokenInAmount, tokenOutAmount],
    minBPTOut // Slippage protection
);

IAsset[] memory assets = [IAsset(tokenIn), IAsset(tokenOut)];

IVault.JoinPoolRequest memory request = IVault.JoinPoolRequest({
    assets: assets,
    maxAmountsIn: [tokenInAmount, tokenOutAmount],
    userData: userData,
    fromInternalBalance: false
});

IVault(vaultAddress).joinPool(
    poolId,
    address(this),
    address(this),
    request
);
```

> The minimum pool shares received (i.e. slippage) in defined in `userData`

## 4. Subgraph

**v2 BEX** provides a subraph [link TODO] indexing smart contract data with a GraphQL interface.

### Querying Pools Containing Tokens

A user seeking the `poolIds` of a pool containing two different tokens, might execute the following query:

```graphql
{
  pools(
    first: 5
    where: {
      tokensList_contains: [
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
      ]
    }
  ) {
    id
    address
    poolType
    poolTypeVersion
    tokensList
  }
}
```

Example response:

```json
{
  "data": {
    "pools": [
      {
        "id": "0x0ec120ed63212a4cb018795b43c0b03c5919042400010000000000000000068f",
        "address": "0x0ec120ed63212a4cb018795b43c0b03c59190424",
        "poolType": "Weighted",
        "poolTypeVersion": 4,
        "tokensList": [
          "0x9deb0fc809955b79c85e82918e8586d3b7d2695a",
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        ]
      }
    ]
}
```
