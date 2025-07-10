---
head:
  - - meta
    - property: og:title
      content: Staking Pools User Guide
  - - meta
    - name: description
      content: Complete guide for users participating in Berachain staking pools, including staking, withdrawals, and stBERA management
  - - meta
    - property: og:description
      content: Complete guide for users participating in Berachain staking pools, including staking, withdrawals, and stBERA management
---

# Staking Pools User Guide

This guide covers everything users need to know about participating in Berachain staking pools, earning rewards, and managing their stBERA tokens.

## What Are Staking Pools?

Staking pools allow you to stake BERA with professional validators while receiving **stBERA** tokens (validator staking shares) that represent your staked position. Unlike traditional staking where your BERA is locked, staking pools provide:

- **Validator Staking Shares**: Receive stBERA tokens representing your stake with a specific validator
- **Automatic Rewards**: No manual claiming required - rewards compound automatically
- **Professional Management**: Validators handle technical operations
- **Flexible Amounts**: Stake any amount, no minimums

## Getting Started

### Prerequisites

Before staking, ensure you have:

- **BERA Tokens**: The amount you want to stake
- **Compatible Wallet**: MetaMask, WalletConnect, or other Ethereum wallet
- **Network Setup**: Connected to Berachain network
- **Gas Funds**: Small amount of BERA for transaction fees

### Choosing a Staking Pool

When selecting a validator's staking pool, consider:

#### Validator Performance

- **Uptime**: High availability and reliability
- **BGT Optimization**: Effective BGT management for additional rewards
- **Technical Competence**: Good validator operations
- **Community Standing**: Reputation in the ecosystem

#### Pool Economics

- **Commission Rate**: Validator's fee on your rewards
- **Pool Size**: Available capacity (pools have 10M BERA maximum)
- **stBERA Price**: Current share price indicating accumulated rewards

#### Pool Status

- **Active Status**: Pool is accepting deposits
- **Minimum Balance**: Pool has sufficient stake (250k+ BERA)
- **Not Paused**: Pool is currently operational

## How to Stake

### Step 1: Connect Your Wallet

Connect your wallet to a dApp that supports staking pools or interact directly with the contracts.

### Step 2: Choose Amount

Select how much BERA you want to stake. Consider:

- **Available Balance**: Don't stake your entire balance (save some for gas)
- **Risk Tolerance**: Only stake what you can afford to lock for the withdrawal period
- **Validator Selection**: Remember that stBERA represents shares in a specific validator's pool

### Step 3: Submit Transaction

Send BERA to the staking pool contract:

```javascript
// Via smart contract interaction
await stakingPool.submit({ value: amountInWei });

// Or simply send BERA to the pool address
// The receive() function will automatically process your deposit
```

### Step 4: Receive stBERA

You'll immediately receive stBERA tokens representing your stake:

```
Initial stBERA = Your BERA Amount × Current Exchange Rate
```

The exchange rate starts at 1:1 but improves over time as rewards accumulate.

## Understanding stBERA

### Share-Based Token

stBERA uses a share-based system where:

- **Fixed Shares**: Your share count stays the same
- **Increasing Value**: Each share becomes worth more BERA as rewards accumulate
- **Auto-Compounding**: Rewards automatically increase your stBERA value

### Example Mechanics

```
Initial Stake: 100 BERA → 100 stBERA (1:1 ratio)

After 1 month of rewards:
- Your shares: Still 100 stBERA
- Share value: 1.05 BERA per stBERA
- Your position value: 105 BERA (5% growth)
```

### Checking Your Balance

View your stBERA balance and value:

```javascript
// Your stBERA token balance
const shares = await stakingPool.sharesOf(userAddress);

// Current value in BERA
const beraValue = await stakingPool.balanceOf(userAddress);

// Total pool value
const totalAssets = await stakingPool.totalAssets();
```

## Using stBERA Validator Staking Shares

### Limited ERC20 Interface

stBERA implements a partial ERC20 interface but with critical limitations:

- **Balance Queries**: You can check your stBERA balance
- **Share Calculations**: View underlying share amounts and conversions
- **No Transfers**: All transfer functions (`transfer`, `transferFrom`, `approve`) are disabled
- **Read-Only Integration**: Protocols can read balances but cannot move tokens

### Important Limitations

:::warning Non-Transferable by Design
stBERA tokens are **permanently non-transferable** - this is hardcoded in the contract. All transfer functions revert with `NotImplemented()` error. You can only:

- Hold stBERA in your wallet (balance increases as rewards compound)
- View your balance and share information
- Withdraw back to BERA via the two-phase withdrawal process
  :::

### Potential Protocol Integration

Given the non-transferable nature, stBERA integration is limited to:

1. **Balance-Based Protocols**: Protocols that read your stBERA balance for governance, rewards, or other purposes without requiring transfers
2. **Specialized Integrations**: Future protocols specifically designed to work with non-transferable validator staking shares
3. **Oracle Usage**: Using stBERA balance as data for other applications

**Note**: Traditional DeFi activities like trading, lending as collateral, or providing liquidity are **not currently possible** due to the transfer restrictions.

## Withdrawal Process

### Two-Phase System

Withdrawing from staking pools requires two steps:

#### Phase 1: Request Withdrawal

Create a withdrawal request NFT:

```javascript
// Request withdrawal of specific BERA amount
await withdrawalRequestERC721.requestWithdrawal(
  amountToWithdraw, // BERA amount to withdraw
  maxFeeToPay, // Maximum EIP-7002 fee you'll pay
);
```

This:

- Burns your stBERA tokens
- Creates a withdrawal NFT representing your claim
- Starts the 256-epoch (~27 hour) waiting period
- Triggers EIP-7002 withdrawal from consensus layer

#### Phase 2: Finalize Withdrawal

After the waiting period, claim your BERA:

```javascript
// Finalize single withdrawal
await withdrawalRequestERC721.finalizeWithdrawalRequest(requestId);

// Finalize multiple withdrawals
await withdrawalRequestERC721.finalizeWithdrawalRequests([id1, id2, id3]);
```

### Withdrawal Fees

Withdrawals incur EIP-7002 fees that vary based on network congestion:

- **Dynamic Pricing**: Fees increase when many withdrawals are processing
- **Fee Estimation**: Check current fee before requesting withdrawal
- **Overpayment Protection**: Excess fees are automatically refunded
- **Max Fee Parameter**: Set maximum fee you're willing to pay

### Withdrawal Timing

#### Immediate (Short Circuit)

If the pool has sufficient buffered BERA:

- Withdrawal processes immediately
- No waiting period required
- Minimal fees

#### Standard (27 Hours)

If withdrawal requires consensus layer exit:

- 256 epoch waiting period (~27 hours)
- EIP-7002 fees apply
- Automatic processing after delay

#### Full Exit Scenario

If your withdrawal would bring pool below 250k BERA:

- Pool automatically triggers full exit
- All remaining users must also withdraw
- Extended processing time for large amounts

## Reward Mechanics

### Automatic Compounding

All rewards automatically compound into your stBERA value:

#### Execution Layer Rewards

- **Block Rewards**: Validator's block production rewards
- **Transaction Fees**: Fees from transactions in produced blocks
- **MEV**: Maximum extractable value opportunities

#### BGT Rewards

- **Base BGT**: BGT earned from validator operations
- **Boost Rewards**: Additional rewards from BGT boosting other validators
- **Incentive Tokens**: Rewards from boosted reward vaults

### Reward Distribution

Rewards are distributed as follows:

1. **Validator Commission**: Validator takes their commission percentage
2. **User Rewards**: Remaining rewards distributed to all stakers
3. **Auto-Compounding**: Rewards automatically increase stBERA value
4. **No Manual Claiming**: All rewards compound automatically

### APR Calculation

Your Annual Percentage Rate (APR) depends on:

- **Base Staking Rewards**: Consensus layer rewards from validation
- **BGT Optimization**: How effectively the validator manages BGT
- **Incentive Rewards**: Additional rewards from boosted vaults
- **Validator Commission**: Fee charged by the validator
- **Pool Performance**: Overall validator and pool efficiency

## Managing Risk

### Understanding Risks

#### Validator Risk

- **Performance**: Poor validator performance reduces rewards
- **Downtime**: Validator offline time affects reward generation
- **Technical Issues**: Validator operational problems impact pool performance

:::info No Slashing on Berachain
Berachain does not implement slashing mechanisms. Your staked BERA principal is never at risk of being reduced due to validator misbehavior, unlike other Proof-of-Stake networks. Validator issues only affect reward generation rates.
:::

#### Smart Contract Risk

- **Code Bugs**: Smart contract vulnerabilities could impact funds
- **Upgrade Risk**: Contract upgrades might introduce issues
- **Oracle Risk**: Incorrect consensus layer data could affect accounting

#### Market Risk

- **BERA Price**: Underlying BERA token price volatility
- **Liquidity Risk**: stBERA might not always be immediately redeemable
- **Regulatory Risk**: Potential regulatory changes affecting staking

### Risk Mitigation

#### Diversification

- **Multiple Pools**: Spread stake across different validators
- **Amount Limits**: Don't stake more than you can afford to lose
- **Time Horizon**: Only stake funds you won't need immediately

#### Due Diligence

- **Validator Research**: Research validator track record and reputation
- **Pool Monitoring**: Regularly check pool health and performance
- **Stay Informed**: Follow developments and announcements

#### Exit Planning

- **Withdrawal Timeline**: Plan for ~27 hour withdrawal delays
- **Fee Budgeting**: Reserve funds for withdrawal fees
- **Emergency Scenarios**: Understand full exit scenarios

## Emergency Situations

### Pool Paused

Your pool may be paused in emergency situations:

#### What Pausing Means

- **New Deposits**: Temporarily disabled
- **Your Stake**: Remains active and earning rewards
- **Withdrawals**: Continue to process normally
- **stBERA Value**: Continues to appreciate

#### During a Pause

- **Stay Calm**: Your funds remain safe
- **Monitor Updates**: Watch for communication from governance/validators
- **Withdrawals Available**: You can still exit if needed
- **Automatic Resume**: Pool will be unpaused when safe

#### Reasons for Pausing

- Smart contract security issues
- Oracle system problems
- Validator technical difficulties
- Extreme market conditions
- Governance emergency actions

### Full Exit Scenarios

Your pool may trigger a full exit if:

#### Automatic Triggers

- **Low Balance**: Pool drops below 250k BERA minimum
- **Large Withdrawal**: Single withdrawal brings pool below minimum

#### Full Exit Process

When full exit is triggered:

1. **Notification**: Pool emits FullExitTriggered event
2. **Asset Freeze**: Total assets frozen at current value
3. **BGT Drop**: All BGT positions queued for dropping
4. **Buffer Transfer**: Buffered assets moved to withdrawal vault
5. **Reward Transfer**: Accumulated rewards moved to withdrawal vault
6. **Withdrawal Enable**: All users can finalize withdrawal requests

#### What You Should Do

- **Create Withdrawal Request**: If you haven't already
- **Wait for Processing**: Allow time for consensus layer processing
- **Finalize Withdrawal**: Claim your BERA after the delay period
- **Check for BGT**: Additional BERA from redeemed BGT may be available

## Frequently Asked Questions

### General Questions

**Q: What's the minimum amount I can stake?**
A: There's no minimum - you can stake any amount of BERA.

**Q: Can I withdraw immediately?**
A: Sometimes! If the pool has buffered BERA, you may withdraw immediately. Otherwise, there's a ~27 hour delay.

**Q: Do I need to claim rewards?**
A: No! All rewards automatically compound into your stBERA value.

**Q: Can I transfer my stBERA to someone else?**
A: No - stBERA tokens are permanently non-transferable by design. All transfer functions are hardcoded to revert. You can only hold them or withdraw back to BERA.

### Technical Questions

**Q: How is stBERA value calculated?**
A: stBERA value = (Total Pool Assets) / (Total stBERA Supply). As rewards accumulate, each stBERA becomes worth more BERA.

**Q: What happens if the validator has poor performance?**
A: Poor validator performance (downtime, missed blocks) reduces the rewards earned by the pool, which affects the rate at which stBERA value increases. However, Berachain does not have slashing, so your principal stake is not at risk from validator misbehavior.

**Q: How long do withdrawals take?**
A: Either immediate (if buffered BERA available) or ~27 hours (if consensus layer withdrawal required).

**Q: What are the fees?**
A: Withdrawal fees vary based on network congestion (EIP-7002 fees). Validator commission fees are disclosed per pool.

### Troubleshooting

**Q: My transaction failed. What should I do?**
A: Check gas settings, ensure sufficient BERA balance, and verify the pool isn't paused or at capacity.

**Q: I can't see my stBERA balance. Help?**
A: Add the stBERA token address to your wallet or check the staking pool contract directly.

**Q: The withdrawal is taking longer than expected.**
A: Check if your withdrawal requires consensus layer processing. Network congestion can extend processing times.

**Q: Pool shows as paused. What now?**
A: Your funds are safe. Monitor official channels for updates. You can still process withdrawal requests.

## Getting Help

### Official Resources

- **Documentation**: This guide and related technical docs
- **Discord**: [Berachain Discord](https://discord.gg/berachain) community support
- **Forums**: Community forums for questions and discussions

### Emergency Support

- **Technical Issues**: GitHub issues for technical problems
- **Security Concerns**: Official security channels for urgent matters
- **Community Help**: Discord and forums for general assistance

### Stay Updated

- **Announcements**: Follow official channels for important updates
- **Network Status**: Monitor network health and validator performance
- **Documentation**: Check for updates to guides and procedures

This guide provides comprehensive information for safely and effectively participating in Berachain staking pools. As the system evolves, stay informed about new features and best practices.
