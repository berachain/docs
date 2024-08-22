---
head:
  - - meta
    - property: og:title
      content: Fees
  - - meta
    - name: description
      content: Learn how to execute transactions on BEX without the need for gas, using EIP-712 off-chain signing and relayer tips.
  - - meta
    - property: og:description
      content: Learn how to execute transactions on BEX without the need for gas, using EIP-712 off-chain signing and relayer tips.
---

# Fees

Fees are collected on every trade conducted on BEX. A portion of these fees will go to 1) liquidity providers (LPs), and 2) BGT stakers.

### LP Fee

Trading fees for LPs are directly compounded inside the pool such that LPs don't need to perform a separate claim transaction. For example, if token prices within an LP's pool are unchanged between deposit and withdrawal, but there have been trades in the interim, the LP will see a higher balance upon withdrawal due to the accumulation of fees.

The portion of fees going to LPs is set at the time of pool creation, the available options being 0.05%, 0.30%, and 1%. The lower fee tiers are generally more appropriate for stable pairings (e.g. stablecoins and blue-chip assets), while the higher fee tiers may be more appropriate for exotic assets, offsetting the risk of LPs holding volatile assets for the duration fo their position.

![BEX Fees](/assets/bex-fees.png)

### BGT Fee

An additional 0.1% is levied against traders, which is redirected to BGT stakers as reward for securing the Berachain network.
