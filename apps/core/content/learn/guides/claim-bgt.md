---
head:
  - - meta
    - property: og:title
      content: Claim BGT Rewards Guide
  - - meta
    - name: description
      content: Learn how to claim your BGT rewards from Reward Vaults, including partial claiming options
  - - meta
    - property: og:description
      content: Learn how to claim your BGT rewards from Reward Vaults, including partial claiming options
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Claim BGT Rewards Guide 🎁

When you stake tokens in Reward Vaults, you earn BGT rewards based on validator emissions. This guide shows you how to claim those rewards, including new options for claiming partial amounts.

::: tip For Developers
If you're building applications that integrate BGT claiming functionality, see our [developer guides for implementing partial reward claims](/developers/guides/partial-reward-claims) and [staking for other accounts](/developers/guides/staking-for-other-accounts).
:::

## Overview

BGT rewards accumulate in Reward Vaults as validators direct emissions to them. You can claim these rewards in two ways:

- **Full Claim**: Claim all your accumulated BGT at once
- **Partial Claim**: Claim specific amounts, leaving the rest to accumulate

## How to Claim BGT Rewards

### Option 1: Full BGT Claim

**Via Berachain Hub:**

1. Navigate to [hub.berachain.com](https://hub.berachain.com)
2. Go to the **Stake** section
3. Find your staked positions
4. Click **"Claim Rewards"** to claim all accumulated BGT
5. Confirm the transaction

**What happens:**

- All your accumulated BGT is claimed to your wallet
- Your reward balance resets to zero
- You continue earning new rewards on your staked position

### Option 2: Partial BGT Claim

Partial claiming lets you claim specific amounts of BGT while leaving the rest to accumulate. This is useful for:

- **Gradual claiming**: Take profits over time instead of all at once
- **Strategic timing**: Claim when you need BGT for specific purposes
- **Gas optimization**: Avoid claiming small amounts frequently

**How to use partial claiming:**

TODO screenshots from hub

## Advanced Strategies

### Protocol Claiming

You can authorize protocols to claim your BGT rewards on your behalf, enabling automated reward management. This requires setting the protocol as your "operator."

**What Operators Can Do:**

- Claim your BGT rewards (full or partial amounts)
- Send rewards to specified addresses
- Execute pre-approved claiming strategies

**What Operators Cannot Do:**

- Cannot withdraw your staked tokens
- Cannot change your staking positions
- Cannot access other wallet functions

**Common Use Cases:**

- **Automated DeFi strategies**: Protocol claims BGT and reinvests into other opportunities
- **Dollar-cost averaging**: Regular small claims to smooth market volatility
- **Streaming rewards**: Gradual claiming over time for tax or liquidity management

::: tip For Developers
See the [staking for other accounts guide](/developers/guides/staking-for-other-accounts) and [partial reward claims guide](/developers/guides/partial-reward-claims) for implementation details.
:::

## Troubleshooting

### Common Issues

**"No rewards to claim"**

- Your vault may not have received validator emissions recently
- Check if your staking position is active
- Verify you're connected to the correct wallet

**"Transaction failed"**

- You may be trying to claim more than your available balance
- Check gas limits and network congestion
- Ensure your wallet has enough BERA for gas fees

**"Partial claim not available"**

- Some interfaces only support full claims
- Partial claiming requires direct contract interaction or compatible protocol interfaces
- Check with your preferred interface for partial claiming support

### Getting Help

- Visit the [Berachain Hub](https://hub.berachain.com) for the official interface
- Check the [PoL FAQs](/learn/pol/faqs) for common questions
- Join the [Berachain Discord](https://discord.gg/berachain) for community support

## Next Steps

After claiming your BGT:

- **[Boost validators](/learn/guides/boost-a-validator)** to direct more emissions to your preferred vaults
- **[Participate in governance](/learn/governance/)** using your BGT voting power
- **[Explore more earning opportunities](https://hub.berachain.com/earn/)** to diversify your PoL participation

---

::: tip Pro Tip
Consider using partial claiming for better control over your BGT flow. You can always claim more when needed, but once claimed, BGT stops earning additional rewards from staking.
:::
