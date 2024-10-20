---
head:
  - - meta
    - property: og:title
      content: Stable Pools
  - - meta
    - name: description
      content: Stable Pools are optimized for assets expected to trade at or near parity, or at a predictable exchange rate
    - property: og:description
      content: Stable Pools are optimized for assets expected to trade at or near parity, or at a predictable exchange rate
---

# Stable Pools

Stable Pools are optimized for assets expected to trade at or near parity, or at a predictable exchange rate. These pools employ a stable swap algorithm to allow for substantial swaps with minimal price impact, enhancing capital efficiency for correlated assets.

## Use Cases

- **Pegged Tokens**: Assets trading near 1:1, such as stablecoins of the same currency (e.g. DAI, USDC, USDT) or synthetic assets (e.g., wrapped versions of BTC)
- **Correlated Tokens**: Assets trading at slowly changing ratios, like certain derivatives (e.g. wstETH, WETH)

## Composability

Stable Pools on BEX are composable with other pool types. That is, Stable Pools' LP tokens can be "nested" into other pools, and swaps on that pool would route through the the underlying Stable Pool liquidity. This facilitates deeper liquidity and improved pricing.

As an example:

- There is Stable Pool with `[HONEY, USDC and DAI]`
- A user creates a [Weighted Pool](/learn/concepts/pools/weighted-pools) pairing `WETH` against the `[HONEY, USDC and DAI]` pool

This results in deeper liquidity, and eliminates the need to pair `WETH` against the individual stablecoins in separate pools.

## Pre-minting

To facilitate gas efficiency, an effectively infinite amount of LP tokens (`2**111`) are minted at the time of pool creation and held in the [Vault](/learn/concepts/vault) (and distributed to liquidity providers).
