---
head:
  - - meta
    - property: og:title
      content: Weighted Pools
  - - meta
    - name: description
      content: Pools with custom weights for each token, generally for uncorrelated assets
  - - meta
    - property: og:description
      content: Pools with custom weights for each token, generally for uncorrelated assets
---

# Weighted Pools

Weighted Pools are an extension of traditional AMM pools (i.e. Uniswap V2's 50/50 `x = y * k` pools). Weighted Pools are suitable for very generalized use cases, particularly for pairs of tokens without price correlation (e.g., HONEY/WETH). BeraSwap Weighted Pools allow users to create pools with multiple tokens and custom weight distributions, such as `80/20` or `60/20/20` ratios.

Following is an example with three tokens:

| Token | Weight |
| ----- | ------ |
| HONEY | 40%    |
| WETH  | 30%    |
| WBTC  | 30%    |

## Key Benefits

### Flexible Exposure Management

Weighted Pools empower pool-creators to fine-tune exposure to different assets when providing liquidity. The weighting of a token in a pool influences its susceptibility to impermanent loss during price fluctuations. For instance, in a WBERA/WETH pool, weights control the exposure profile to each asset:

Higher WBERA weight (e.g. `80/20 WBERA:WETH`) means that the liquidity providers are more exposed to WBERA price movements, but it would require a larger amount of WBERA to change the relative price of the two assets in the pool. Conversely, equal weights suggest that the assets are expected to maintain relative value long-term.

### Impermanent Loss Mitigation

Impermanent loss refers to the value difference between holding assets outright and providing liquidity for those assets.

Pools with asymmetric token weights experience reduced impermanent loss, though this comes with a trade-off: swaps between assets in this pool will have higher price slippage due to one side having less liquidity.
