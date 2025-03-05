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

Fees are collected on every trade conducted on BEX. A portion of these fees will go to 1) liquidity providers (LPs), and 2) BGT holders.

### Fee Distribution

Trading fees for LPs are directly compounded inside the pool such that LPs don't need to perform a separate claim transaction. For example, if token prices within an LP's pool are unchanged between deposit and withdrawal, but there have been trades in the interim, the LP will see a higher balance upon withdrawal due to the accumulation of fees.

The portion of fees going to LPs is set at the time of pool creation, starting from 0.01% for stable pools, and ranging up to 0.3%, 0.5%, and 1% for weighted pools. The lower fee tiers are generally more appropriate for stable pairings (e.g. stablecoins and blue-chip assets), while the higher fee tiers may be more appropriate for exotic assets.

Trading fees in BEX are split 50/50 between LPs and the protocol. Protocol fees are collected in the ProtocolFeesCollector contract, where the fees are auctioned for `$HONEY` and subsequently distributed to `$BGT` stakers.

![BEX Fees](/assets/swap_fee.png)
