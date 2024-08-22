---
head:
  - - meta
    - property: og:title
      content: Bot Rewards
  - - meta
    - name: description
      content: Explanation bot rewards on Berps.
  - - meta
    - property: og:description
      content: Explanation bot rewards on Berps.
---

# Bot Rewards

Bot operators are incentivized through different fee structures for automating various Berps functions (e.g. executing limit orders, liquidating positions). This article outlines the different ways bots can earn rewards.

### Limit Order Fees

When bots execute limit orders on behalf of users, they earn a portion of the trade as the limit order fee. This fee is calculated as a percentage of the entire notional trade size. The limit order fee is specific to each trading pair.

This fee applies to take profit, stop loss, and limit open orders. This is charged separately from open and closing fees (which still apply), which are directed to the [Berps Vault](/learn/vault/).

### Liquidation Fees

Bots earn a liquidation fee for closing undercollateralized positions. Liquidation bots earn 5% of the collateral value of the liquidated position.
