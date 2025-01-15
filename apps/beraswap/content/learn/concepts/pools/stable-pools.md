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

Stable Pools are optimized for assets expected to trade at or near parity, or at a predictable exchange rate. The stable swap algorithm that is employed provides swaps with minimal price impact, enhancing capital efficiency for correlated assets.

## Use Cases

- **Pegged Tokens**: Assets trading near 1:1, such as stablecoins of the same currency (e.g. DAI, USDC, USDT) or synthetic assets (e.g., wrapped versions of BTC)
- **Correlated Tokens**: Assets trading at slowly changing ratios, like certain derivatives (e.g. wstETH, WETH)

## Composability

Stable Pools on BeraSwap are composable with other pool types. That is, Stable Pool LP tokens can be "nested" into other pools, and swaps on that pool would route through the the underlying Stable Pool liquidity. This facilitates deeper liquidity and improved pricing.

As an example:

- There is Stable Pool with `[HONEY, USDC and DAI]`
- A user creates a [Weighted Pool](/learn/concepts/pools/weighted-pools) pairing `WETH` against the `[HONEY, USDC and DAI]` pool

This results in deeper liquidity, and eliminates the need to pair `WETH` against the individual stablecoins in separate pools.

## Technical Parameters

### Amplification Coefficient

The amplification coefficient controls how tightly the pool maintains price parity between tokens. It has a minimum value of `1` and a maximum value of `5000`.

- **Lower Amplification**: More price flexibility, allowing for wider price swings
- **Higher Amplification**: More price stability, reducing price swings

### Rate Providers

For tokens that should trade at non-1:1 ratios (e.g. `iBERA/BERA` or appreciating ERC4626 tokens), rate providers can provide the expected exchange rate between assets. The inclusion of a rate provider results in a Metastable Pool.

## Pre-minting

To facilitate gas efficiency, an effectively infinite amount of LP tokens (`2**111`) are minted at the time of pool creation and held in the [Vault](/learn/concepts/vault) (and distributed to liquidity providers).
