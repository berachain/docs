---
head:
  - - meta
    - property: og:title
      content: Staking Pools User Guide
  - - meta
    - name: description
      content: How to stake BERA through validator staking pools
  - - meta
    - property: og:description
      content: How to stake BERA through validator staking pools
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Staking Pools User Guide

This guide explains how to stake BERA through validator-operated staking pools, enabling you to participate in network security while earning rewards. Staking pools represent a user-friendly approach to participating in Berachain's consensus mechanism while maintaining flexibility and transparency.

## What Are Staking Pools?

Staking pools allow you to stake BERA with specific validators through smart contracts, creating a more accessible and flexible staking experience. When you deposit BERA into a staking pool, you receive shares representing your stake in that validator's pool. These shares automatically increase in value as the validator earns rewards, providing you with a liquid representation of your staking position.

The key benefits of staking pools include lower barriers to entry, as you can stake any amount without worrying about validator minimums. The auto-compounding feature ensures that all rewards are automatically reinvested, maximizing your returns over time. Professional management by validators handles the technical operations, allowing you to focus on your investment strategy. The liquid staking nature means you receive shares representing your position, and you have flexible withdrawal options that let you exit your position at any time.

## Find a Staking Pool

### Available Pools

Staking pools are operated by individual validators, each offering their own unique approach to staking services. Each pool provides comprehensive information about the validator's performance history, uptime, and reputation in the community. You'll also find details about the commission rate, which represents the fee charged by the validator on your rewards, and information about the current pool size including total deposits and capacity limits. Performance metrics such as historical returns and reward distribution patterns help you understand how the pool has performed over time.

### Choosing a Pool

Selecting the right staking pool requires careful consideration of several factors that can significantly impact your staking experience and returns. Validator reputation is perhaps the most important factor, as you'll want to research the validator's history and community standing to ensure they're reliable and trustworthy. Commission rates directly affect your returns, with lower rates meaning more rewards stay in your pocket.

Pool performance metrics provide insights into historical returns and consistency, helping you understand what to expect from your investment. Community engagement is another important consideration, as active communities often provide better support and communication. Finally, transparency in operations ensures you have clear visibility into how your funds are being managed and how decisions are made.

:::tip
Look for validators with strong community engagement and transparent operations. Many validators maintain active Discord channels or other community spaces where you can ask questions and stay updated.
:::

## Deposit BERA

### Step 1: Connect Your Wallet

The first step in staking through a pool is ensuring your wallet is properly connected to the Berachain network. You'll need to have sufficient BERA for both your intended stake and gas fees to cover the transaction costs. Most wallets will automatically detect Berachain if it's configured in your network settings.

### Step 2: Approve the Transaction

With your wallet connected, open the validator’s staking pool page or supported dApp, choose Deposit, enter your amount, and confirm in your wallet. Minimum deposit is 1 gwei. Capacity limits may apply based on pool configuration.

### Step 3: Receive Shares

After a successful deposit, you'll see shares appear in the pool UI that represent your proportional ownership. Share value increases with rewards.

### Share Accounting

The share system provides a transparent and fair way to track your stake and rewards. Your initial shares are calculated based on your deposit amount and the current share price at the time of deposit. As rewards accrue to the pool, your shares maintain the same quantity but increase in BERA value, reflecting the growth of your investment. The auto-compounding feature ensures that all rewards are automatically reinvested, maximizing your returns over time.

## Monitor Your Position

### Check Your Balance

Use the pool UI or supported dApp to view your BERA balance (including rewards), share balance, and total pool assets.

### Track Performance

Monitor your pool's performance:

- **Share Price**: Your shares' value in BERA
- **Total Rewards**: Accumulated rewards since deposit
- **Pool Growth**: Total assets under management
- **Validator Performance**: Uptime and reward generation

### Reward Distribution

Rewards accrue automatically and are reflected in your share value:

- **Block Rewards**: BERA from consensus participation
- **BGT Rewards**: Used by the operator to boost validator rewards
- **Incentive Tokens**: Converted to BERA by the operator
- **Auto-Compounding**: Reflected in rising share value

## Request Withdrawal

### Step 1: Initiate Withdrawal Request

When you want to exit your position, open the pool UI and choose Withdraw. You can withdraw by amount (BERA) or redeem by shares. Confirm in your wallet. Any required fees are shown before confirmation.

### Step 2: Receive Withdrawal NFT

After requesting withdrawal, the system issues you a withdrawal receipt (NFT) representing your request. You’ll see its status in the UI.

### Withdrawal Processing

Withdrawals are processed in two ways:

#### Short Circuit (Immediate)

If sufficient funds are available in the pool buffer:

- Withdrawal processed immediately
- BERA transferred directly to your wallet
- No waiting period

#### Standard Path (27-hour delay)

If consensus layer withdrawal is required:

- Withdrawal request queued for consensus layer processing
- 256 epochs (~27 hours) processing time
- BERA available after processing period

### Step 3: Complete Withdrawal

After the processing period, click Finalize Withdrawal in the UI to claim BERA back to your wallet.

**Parameters:**

- `requestId`: Your withdrawal request ID (from the NFT)
- `requestIds`: Array of withdrawal request IDs to finalize

## Understanding Fees

### Withdrawal Fees

Withdrawals may incur fees:

- **Network Fees**: Gas costs for transactions
- **Withdrawal Fees**: Dynamic fees based on network congestion
- **Processing Time**: Longer delays during high withdrawal volume

### Validator Commission

Validators may charge commission on your rewards. Commission is set and managed by the operator and is typically capped (up to 10%). You can view the current commission rate in the pool UI. See the [Operator Guide](/nodes/staking-pools/operators) for how operators configure commission.

## Pool Limits and Restrictions

### Capacity Limits

Each staking pool has limits configured by the operator:

- **Maximum Capacity**: e.g., 10,000,000 BERA per validator
- **Minimum Balance**: 250,000 BERA effective balance threshold (affects validator lifecycle)
- **Pool Pausing**: Pools may pause deposits when capacity is reached

### Full Exit Scenarios

Pools may trigger full exit when:

- **Below Minimum**: Effective balance falls below 250,000 BERA
- **Large Withdrawal**: A withdrawal would breach the minimum threshold
- **Emergency**: Governance or validator triggers full exit

### Impact of Full Exit

During full exit:

- **New Deposits**: Disabled
- **Existing Stakes**: Continue earning rewards until exit completes
- **Withdrawals**: Process normally
- **BGT Management**: Automatic unboost and burn of BGT rewards

## Best Practices

### Security

- **Verify Contracts**: Ensure you're interacting with legitimate staking pool contracts
- **Check Validator**: Research validator reputation and performance
- **Monitor Transactions**: Verify all transactions before confirming
- **Secure Wallet**: Use hardware wallets for large stakes

### Monitoring

- **Regular Checks**: Monitor your position regularly
- **Performance Tracking**: Track your pool's performance over time
- **Community Updates**: Stay informed through validator community channels
- **Market Conditions**: Consider market conditions when timing withdrawals

### Risk Management

- **Diversification**: Consider staking with multiple validators
- **Liquidity Planning**: Plan for withdrawal delays
- **Emergency Preparedness**: Understand full exit scenarios
- **Community Support**: Join validator communities for support

## Troubleshooting

### Common Issues

**Deposit Fails**

- Check you have sufficient BERA for deposit and gas
- Verify pool is not at maximum capacity
- Ensure pool is active and not paused

**Withdrawal Delays**

- Normal processing time is ~27 hours
- Check network congestion for additional delays
- Monitor pool status for any issues

**Share Value Issues**

- Share values automatically adjust with rewards
- Check total assets vs. total shares for current value
- Contact validator support if concerns persist

### Getting Help

- **Validator Support**: Contact your validator's support channels
- **Community**: Join validator Discord or other community spaces
- **Documentation**: Refer to this guide and smart contract documentation
- **Technical Support**: Contact Berachain technical support for contract issues

## Next Steps

After staking with a pool:

1. **Monitor Performance**: Track your pool's performance and your returns
2. **Stay Informed**: Join validator communities for updates
3. **Consider Diversification**: Explore staking with multiple validators
4. **Plan Withdrawals**: Understand withdrawal timing and fees

For detailed technical information about the smart contracts, see the [Smart Contract Reference](/nodes/staking-pools/contracts).

:::tip
Successful staking often involves building relationships with validators and their communities. Many validators provide regular updates and support to their stakers.
:::

:::warning
The off-chain oracle and incentive management bot components are required for full functionality but are not yet implemented. These will be deployed separately and integrated with the staking pools system.
:::
