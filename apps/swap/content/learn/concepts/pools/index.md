---
head:
  - - meta
    - property: og:title
      content: Pools
  - - meta
    - name: description
      content: BeraSwap pools contain the logic and math for swapping tokens and for liquidity operations
  - - meta
    - property: og:description
      content: BeraSwap pools contain the logic and math for swapping tokens and for liquidity operations
---

# Pools

BeraSwap pools contain the logic and math for swapping tokens and for liquidity operations. There are several types of pools, each with its own unique characteristics and use cases.

## Pool Types

- [**Weighted Pools**](/learn/concepts/pools/weighted-pools): pools with custom weights for each token, generally for uncorrelated assets
- [**Stable Pools**](/learn/concepts/pools/stable-pools): pools for pegged tokens (e.g. to USD) or correlated tokens with a known exchange rate

## Pool Differences

### Pool Math

- **Weighted Pools** use constant product formulas (similar to Uniswap V2) and allow for custom weight distributions between tokens
- **Stable Pools** use specialized stable swap curves optimized for tokens that should trade near parity

### Key Parameters

- **Weighted Pools** are configured primarily through token weights (e.g., `80/20`, `50/25/25`)
- **Stable Pools** use an amplification coefficient to determine how tightly the prices should be bound together

### Use Cases

- **Weighted Pools**: Best for uncorrelated assets where price divergence is expected (e.g., `HONEY/WETH`)
- **Stable Pools**: Ideal for correlated assets like:
  - Stablecoins (`USDC/USDT/DAI`)
  - Wrapped/underlying tokens (`iBERA/BERA`)
