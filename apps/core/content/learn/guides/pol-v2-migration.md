---
head:
  - - meta
    - property: og:title
      content: PoL V2 Migration Guide
  - - meta
    - name: description
      content: Understanding PoL V2 changes and migration for different stakeholders
  - - meta
    - property: og:description
      content: Understanding PoL V2 changes and migration for different stakeholders
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# PoL V2 Migration Guide 🔄

PoL V2 brings the BERA Yield Module, giving `$BERA` holders direct yield opportunities while keeping the existing Proof-of-Liquidity ecosystem intact. This guide walks you through what's new, what changes, and what stays the same.

## What's New in PoL V2

### 🆕 BERA Yield Module

- **Direct BERA Staking**: Stake `$BERA` directly to earn yield
- **7-Day Unbonding Period**: Keeps stakers aligned for the long term
- **Auto-Compounding**: Your rewards automatically compound
- **Protocol-Native Yield**: No third-party dApps needed

### 🆕 Incentive Tax Mechanism

- **33% Fee Collection**: A portion of PoL incentives goes to BERA stakers
- **WBERA Distribution**: Collected fees get converted to WBERA and distributed
- **Configurable Rate**: Fee rate can be adjusted by governance

### 🆕 Enhanced Security

- **Inflation Attack Protection**: Initial deposit mechanism stops attacks
- **Emergency Controls**: Pausable contracts with role-based access
- **Comprehensive Auditing**: Thorough security review and testing

## Timeline and Implementation

### Community Feedback Period
- **Start**: July 14th, 2025
- **End**: July 20th, 2025
- **Purpose**: Gather community input and address concerns

### Governance Vote
- **Date**: July 21st, 2025
- **Process**: Guardians vote on implementation
- **Requirements**: Majority approval required

### Mainnet Launch
- **Date**: July 21st, 2025 (if vote passes)
- **Deployment**: Contracts deployed and activated
- **Availability**: BERA staking immediately available

## Changes for Different Stakeholders

### 🐻 BERA Holders

#### What Changes
- **New staking opportunity**: Direct yield earning through WBERAStakerVault
- **Enhanced utility**: BERA becomes a yield-bearing asset
- **Simplified access**: One-click staking without DeFi knowledge

#### What Stays the Same
- **Gas token functionality**: BERA still used for transaction fees
- **Validator staking**: Traditional validator staking stays the same
- **Trading**: BERA trading and transfers work as before

#### Action Required
- **Optional**: Stake BERA in the new vault to earn yield
- **No migration needed**: Your existing BERA holdings are fine as they are

### 🥕 BGT Holders

#### What Changes
- **Reduced incentives**: 33% of protocol incentives go to BERA stakers
- **Continued functionality**: BGT still used for governance and validator boosting
- **Maintained role**: Core PoL mechanics stay the same

#### What Stays the Same
- **Governance participation**: BGT holders still vote on proposals
- **Validator boosting**: BGT delegation still increases validator rewards
- **Reward earning**: BGT still earned through Reward Vaults

#### Action Required
- **None**: BGT functionality stays the same
- **Optional**: Consider staking BERA for additional yield

### ⚡ Validators

#### What Changes
- **No operational changes**: Validator operations stay the same
- **Same incentives**: Continue receiving protocol incentives
- **Same BGT emissions**: Block reward structure stays the same

#### What Stays the Same
- **Staking requirements**: BERA staking requirements stay the same
- **Block production**: Consensus mechanism stays the same
- **Commission structure**: Validator commission rates stay the same

#### Action Required
- **None**: No changes to validator operations
- **Optional**: Stake personal BERA for additional yield

### 🏗️ Protocols and dApps

#### What Changes
- **Incentive fee**: 33% of incentives collected as fees
- **Same competition**: Continue competing for BGT emissions
- **Enhanced ecosystem**: More BERA utility helps all protocols

#### What Stays the Same
- **Reward Vault functionality**: All existing Reward Vault features stay the same
- **Incentive distribution**: Remaining 67% distributed as before
- **Integration requirements**: No changes to existing integrations

#### Action Required
- **None**: Existing integrations keep working
- **Optional**: Consider BERA treasury strategies

### 💧 Liquidity Providers

#### What Changes
- **No changes**: LP positions and rewards stay the same
- **Enhanced ecosystem**: More BERA utility might increase trading volume
- **Additional options**: Can now stake BERA for yield

#### What Stays the Same
- **LP rewards**: Continue earning BGT through Reward Vaults
- **Impermanent loss**: LP mechanics stay the same
- **Pool functionality**: All existing pool features stay the same

#### Action Required
- **None**: LP positions keep working as before
- **Optional**: Consider staking BERA for additional yield

## Technical Migration Details

### Contract Addresses

| Contract | Address | Status |
|----------|---------|--------|
| WBERAStakerVault | `0x...` | TBD |
| BGTIncentiveFeeCollector | `0x...` | TBD |
| BGTIncentiveFeeDeployer | `0x...` | TBD |

### Configuration Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| Incentive Fee Rate | 33% | Percentage of incentives redirected |
| Withdrawal Cooldown | 7 days | Unbonding period for withdrawals |
| Initial Deposit | 10 WBERA | Inflation attack protection |

### Backward Compatibility

- **Existing contracts**: All existing PoL contracts keep working
- **API compatibility**: No breaking changes to existing integrations
- **User experience**: Existing workflows stay the same

## Risk Considerations

### Smart Contract Risk
- **Audited contracts**: Thorough security review completed
- **Emergency controls**: Pausable contracts with role-based access
- **Gradual rollout**: Initial deployment with conservative parameters

### Economic Risk
- **Incentive reduction**: BGT holders get 67% of previous incentives
- **Market impact**: BERA price might go up from increased utility
- **Yield variability**: Returns depend on protocol incentive volume

### Operational Risk
- **Withdrawal delays**: 7-day unbonding period can't be skipped
- **Governance dependency**: Fee rates can be adjusted by governance
- **Technical complexity**: New contracts add some system complexity

## Best Practices

### For BERA Holders
- **Start small**: Begin with a small stake to understand the process
- **Plan withdrawals**: Remember the 7-day unbonding period
- **Monitor yield**: Keep track of how your position performs over time

### For BGT Holders
- **Assess impact**: Understand how incentive reduction affects your returns
- **Consider diversification**: Balance BGT and BERA positions
- **Stay informed**: Keep up with governance proposals for parameter changes

### For Protocols
- **Monitor costs**: Track how incentive fees affect your operations
- **Optimize strategies**: Consider adjusting incentive rates for efficiency
- **Engage governance**: Join discussions about fee rate adjustments

## FAQ

### Will my existing BGT rewards be affected?

Yes, BGT holders will get about 67% of previous incentive amounts, with 33% going to BERA stakers.

### Can I still earn BGT through Reward Vaults?

Yes, all existing Reward Vault functionality stays the same. You'll keep earning BGT as before.

### Is the 7-day unbonding period permanent?

The unbonding period is designed to encourage long-term alignment. It can be adjusted by governance if needed.

### What happens to existing BERA validator stakes?

Traditional BERA validator staking is completely unaffected. This is just an additional staking option.

### Can I stake both BERA and BGT?

Yes! You can participate in both systems at the same time for maximum yield opportunities.

### How is the incentive fee rate determined?

The fee rate is set by governance and can be adjusted based on ecosystem needs and market conditions.

## Support and Resources

### Documentation
- [BERA Staking Guide](/learn/guides/bera-staking)
- [Proof-of-Liquidity Overview](/learn/pol/)
- [Reward Vaults](/learn/pol/rewardvaults)

### Community
- [Discord](https://discord.gg/berachain)
- [Forum](https://forum.berachain.com)
- [Telegram](https://t.me/berachain)

### Technical Support
- [GitHub Issues](https://github.com/berachain/contracts/issues)
- [Developer Documentation](/developers/)

---

*This migration guide will be updated as PoL V2 implementation progresses. Check back for the latest information.* 