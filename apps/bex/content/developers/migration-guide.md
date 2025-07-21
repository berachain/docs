---
head:
  - - meta
    - property: og:title
      content: BEX Migration Guide
  - - meta
    - name: description
      content: Guide for migrating to the current BEX implementation
  - - meta
    - property: og:description
      content: Guide for migrating to the current BEX implementation
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Migration Guide

This guide assists developers in migrating their code from the bArtio implementation of BEX (launched with bArtio Testnet) to the current Balancer-based BEX implementation.

## General Notes

- bArtio BEX: Required off-chain logic for finding `poolIndex` and determining `base` and `quote` tokens, which dictate the `isBuy` parameter.
- Current BEX: Requires off-chain logic for finding the `poolId` (a 32-byte identifier).
  - Utilizes the Smart Order Router (SOR) for this purpose.

## 1. Swaps

### Migrating from `BeraCrocMultiSwap`

`BeraCrocMultiSwap` was a convenience router for executing swaps in bArtio BEX.

#### bArtio BEX:

```javascript
const steps = [
  {
    base: baseTokenAddress,
    quote: quoteTokenAddress,
    poolIdx: poolIndex,
    isBuy: true
  }
];
const amount = ethers.utils.parseUnits("1", 18);
const minOut = ethers.utils.parseUnits("0.99", 18);

await swapRouter.multiSwap(steps, amount, minOut);
```

#### Current Implementation:

In the current implementation, we leverage the SOR to construct our swap:

```js-vue
import {
  BalancerApi,
  SwapKind,
  TokenAmount,
} from "@berachain-foundation/berancer-sdk";
const balancerApi = new BalancerApi("{{config.mainnet.dapps.bex.balancerApiUrl}}", {{config.mainnet.chainId}});
const honeyToken = new Token(CHAIN_ID, HONEY_ADDRESS, 18, "HONEY");

// Create swap amount (e.g., 1 HONEY)
const tokenAmount = TokenAmount.fromHumanAmount(honeyToken, "1");
// Fetch optimal swap paths
const { paths: sorPaths } = await balancerApi.sorSwapPaths.fetchSorSwapPaths({
  chainId: chainId,
  tokenIn: tokenInAddress,
  tokenOut: tokenOutAddress,
  swapKind: SwapKind.GivenIn,
  swapAmount: tokenAmount,
});
const swap = new Swap({
  chainId: chainId,
  paths: sorPaths,
  swapKind: SwapKind.GivenIn,
  userData: "0x",
});
// Query current rates
const queryOutput = await swap.query(rpcUrl);

// Build transaction with 1% slippage
const slippage = Slippage.fromPercentage("1");
const deadline = BigInt(Math.floor(Date.now() / 1000) + 60);
const callData = swap.buildCall({
  slippage,
  deadline,
  queryOutput,
  sender: walletAddress,
  recipient: walletAddress,
  wethIsEth: false,
});
// Send transaction
const tx = await wallet.sendTransaction({
  to: callData.to,
  data: callData.callData,
  value: callData.value,
});
```

### Migrating from `userCmd` (Solidity)

If the `poolId` is known, the BEX swap transaction can be encoded as follows:

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

#### bArtio BEX:

In the bArtio BEX implementation, pool types were defined by the `poolIdx` parameter (e.g.`36001`).

```solidity
bytes memory initPoolCmd =
            abi.encode(71, token, address(0x7507c1dc16935B82698e4C63f2746A2fCf994dF8), 36001, sqrtPriceTargetX96);

dex.userCmd(3, initPoolCmd); // ColdPath callpath
```

#### Current BEX:

In the current BEX implementation, pools are created through the [PoolCreationHelper](/developers/contracts/factory/pool-creation-helper) contract, which simplifies the pool creation process by allowing pools to be created and joined in a single transaction.

> The `PoolCreationHelper` must first be approved as a relayer in the Vault contract

```js
const POOL_CREATION_HELPER_ABI = [
  "function createAndJoinWeightedPool(string name, string symbol, address[] createPoolTokens, address[] joinPoolTokens, uint256[] normalizedWeights, address[] rateProviders, uint256 swapFeePercentage, uint256[] amountsIn, address owner, bytes32 salt) payable returns (address pool)",
  "function createAndJoinStablePool(string name, string symbol, address[] createPoolTokens, uint256 amplificationParameter, address[] rateProviders, uint256[] tokenRateCacheDurations, bool exemptFromYieldProtocolFeeFlag, uint256 swapFeePercentage, uint256[] amountsIn, address owner, bytes32 salt, bool joinWBERAPoolWithBERA) payable returns (address pool)"
];

// Approve PoolCreationHelper as relayer
await vault.setRelayerApproval(wallet.address, POOL_CREATION_HELPER_ADDRESS, true);
// Create pool with initial liquidity
const poolCreationHelper = new ethers.Contract(
  POOL_CREATION_HELPER_ADDRESS,
  POOL_CREATION_HELPER_ABI,
  wallet
);
const tx = await poolCreationHelper.createAndJoinWeightedPool(
  "Pool Name", // name
  "POOL", // symbol
  [token1Address, token2Address],
  [token1Address, token2Address],
  [weight1, weight2], // Must add up to 1e18
  [address(0), address(0)], // No rate providers
  ethers.parseUnits("0.01", 18), // 1% swap fee
  amountsIn, // Array of initial liquidity amounts
  wallet.address, // Owner
  salt // For deterministic deploys
);
```

## 3. Adding Liquidity

#### bArtio BEX:

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

The current BEX implementation provides an [SDK](/developers/sdk) indexing smart contract data with a GraphQL interface.

### Querying Pools Containing Tokens

A user seeking the `poolIds` of a pool containing two different tokens, might execute the following query:

```graphql
{
  pools(
    first: 5
    where: {
      tokensList_contains: [
        "0xd137593CDB341CcC78426c54Fb98435C60Da193c"
        "0x015fd589F4f1A33ce4487E12714e1B15129c9329"
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
