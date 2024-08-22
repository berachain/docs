---
head:
  - - meta
    - property: og:title
      content: BEX AMM
  - - meta
    - name: description
      content: BEX uses an automated market maker (AMM) mechanism based on the constant product formula to provide liquidity and enable token swaps
  - - meta
    - property: og:description
      content: BEX uses an automated market maker (AMM) mechanism based on the constant product formula to provide liquidity and enable token swaps
---

# Automated Market Makers (AMMs)

Liquidity in BEX is provided through an automated market maker (AMM) mechanism. Unlike traditional limit order books (LOBs), liquidity is not provided by individual orders but by an aggregate pool of liquidity with capital provided by liquidity providers (LPs).

Each liquidity pool in BEX represents a two-sided market between a pair of fungible assets or tokens. At any given time, each pool has a single exchange rate determined by the ratio of reserves committed to the pool. End users can swap one token in this pair for the other based on a deterministic formula.

## Constant Product Formula

BEX pools use a constant product market maker (CPMM) algorithm, similar to the one used by Uniswap V2. The product of the reserves of the two tokens in the pool remains constant throughout trades, a concept often referred to as the "invariant." This formula can be expressed as `x * y = k`, where `x` and `y` represent the reserves of the two tokens, and `k` is the invariant.

When a user sends a quantity of one token to the pool (the "base token"), the pool returns a quantity of the other token (the "quote token") based on this constant product relationship. As a result, the pool's exchange rate will adjust to maintain the invariant, thereby balancing supply and demand.
