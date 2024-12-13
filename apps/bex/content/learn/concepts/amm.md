---
head:
  - - meta
    - property: og:title
      content: BEX AMM
  - - meta
    - name: description
      content: BEX uses an automated market maker (AMM) mechanism with flexible pool types to provide liquidity and enable token swaps
  - - meta
    - property: og:description
      content: BEX uses an automated market maker (AMM) mechanism with flexible pool types to provide liquidity and enable token swaps
---

# Automated Market Makers (AMMs) 📈

Liquidity in BEX is provided through an automated market maker (AMM) mechanism. Unlike traditional limit order books (LOBs), liquidity is not provided by individual orders but by an aggregate pool of liquidity with capital provided by liquidity providers (LPs).

BEX supports multiple pool types, each designed for specific use cases:

- **Weighted Pools**: Allow for pools with 2 or more tokens with customizable weights (e.g., 80/20 HONEY/WETH or 33/33/33 HONEY/WETH/WBTC)
- **Stable Pools**: Optimized for tokens that trade at or near parity (e.g., stablecoins) or with predictable exchange rates

## Pool Architecture

All BEX pools interact with the [Vault](/learn/concepts/vault), which manages token accounting while pools handle the swap math and logic. This separation enables:

- Gas-efficient swaps through consolidated liquidity
- Independent pool balances for security
- Flexible pool designs for different use cases

For detailed information about specific pool types, see:

- [Weighted Pools](/learn/concepts/pools/weighted-pools)
- [Stable Pools](/learn/concepts/pools/stable-pools)
