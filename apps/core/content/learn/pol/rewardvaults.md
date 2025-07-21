<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Reward Vaults

Reward Vaults are smart contracts in which users can stake their Proof-of-Liquidity (PoL) eligible assets to receive `$BGT` rewards. Reward Vaults are the only way anyone can earn `$BGT` rewards, and therefore serve the important function of gating entry into the PoL ecosystem.

Reward Vaults are key infrastructure that allows protocols to leverage PoL, enabling teams to incentivize users' actions in exchange for `$BGT`. A protocol can have multiple Reward Vaults, each with its own PoL-eligible asset to be staked. For example, BEX can have multiple pools earning `$BGT`, each with its own Reward Vault and respective PoL-eligible asset.

:::info
Only Reward Vaults approved through governance are elligible to receive `$BGT` emissions from Validators.

Please see the full [Berachain Reward Vault Requirements & Guidelines](/learn/help/reward-vault-guidelines) for the application process.
:::

## User Interactions

### Staking With A Reward Vault

![Berachain Reward Vault Staking BEX](/assets/berachain-reward-vault-staking-bex.png)

To receive `$BGT`, a user must stake the PoL-eligible asset in its Reward Vault. The protocol that deployed the Reward Vault decides how users acquire the PoL-eligible asset to stake. The idea is that protocols would leverage this to attract liquidity or stimulate activity, and in return award users with the asset they can stake in their vault.

1. The user takes some action that results in receiving a PoL-eligible asset, generally referred to as a receipt token.
2. The user stakes the PoL-eligible asset in the corresponding vault.
3. The user earns a portion of all the BGT emitted to that vault.

### Earning BGT

The amount of `$BGT` rewards a user earns from a Reward Vault is a function of:

1. The user's share of total assets staked in the Reward Vault
2. The amount of `$BGT` rewards emitted to the Reward Vault

After staking assets in a Reward Vault, users are free to claim their earned rewards, add to their deposits, or withdraw their assets whenever they wish.

`$BGT` farming with Reward Vaults is meant to resemble familiar DeFi actions, providing a low barrier to entry.

## Delegation

The RewardVault supports **delegation**, which allows one address (the delegate) to stake tokens on behalf of another address (the account holder). This enables use cases such as:

- **Custodial staking**: Exchanges or custodians staking on behalf of users
- **Smart contract integration**: Protocols automatically staking user funds
- **Managed staking services**: Third-party services handling staking operations

**Key delegation concepts**:

- **Delegate**: The address that deposits/withdraws tokens (msg.sender)
- **Account**: The address that owns the staked position and receives rewards
- **Self-staked balance**: Tokens staked directly by the account holder
- **Delegated balance**: Tokens staked by delegates on behalf of the account

**Important**: Only the account holder can withdraw their self-staked tokens. Delegates can only withdraw tokens they deposited on behalf of the account.

## $BGT Flow

When a validator is chosen to propose a block, they direct a portion of their `$BGT` emissions to specific Reward Vaults of their choice. To learn more about how `$BGT` is calculated in block production, check out the docs on [block rewards](/learn/pol/blockrewards).

## BGT Emission Modes

Reward Vaults operate in one of two mutually-exclusive modes for **BGT reward distribution timing**:

### Duration-Based Mode (Legacy)

In this mode, the `rewardDurationManager` sets a fixed `rewardsDuration` (typically 3-7 days). Each time BGT rewards are added to the vault via `notifyRewardAmount`, the BGT is distributed evenly over this predetermined period.

Duration-based mode enforces the 3-7 day range: if switching from target rate mode where the duration exceeded 7 days, the duration will be capped at 7 days.

**Example**: If 100 BGT is added with a 5-day duration, the vault distributes 20 BGT per day to stakers.

### Target Rate Mode

When `targetRewardsPerSecond` is set to a non-zero value, the vault automatically calculates the optimal distribution period for each BGT deposit. The vault ensures the emission rate never exceeds the target while respecting the minimum duration limit.

The computation follows this formula:

```text
period = max(minRewardDurationForTargetRate, totalReward / targetRate)
```

This guarantees the duration is never shorter than the minimum (default 3 days), but can extend beyond 7 days if needed to maintain the target rate.

**Example**: If 100 BGT is added with a target rate equivalent to 10 BGT/day, the vault will distribute over 10 days at a rate equivalent to 10 BGT/day to maintain the target rate.

**Example - Duration Above Maximum (Target Rate → Duration-Based Mode)**:
Imagine a vault currently in target rate mode with a very low target rate equivalent to 1 BGT/day. If 100 BGT is added, it would normally distribute over 100 days. However, when switching to duration-based mode, the system enforces the 7-day maximum limit, so the 100 BGT would be distributed over exactly 7 days at a rate equivalent to ~14.29 BGT/day instead.

**Example - Rate Above Minimum Duration (Target Rate Mode)**:
Consider a vault with a target rate equivalent to 50 BGT/day. If 100 BGT is added, the natural calculation would be 100 ÷ 50 = 2 days. However, the system enforces the fixed 3-day minimum duration, so the BGT will be distributed over 3 days at a rate equivalent to 33.33 BGT/day (slower than the target rate to respect the minimum duration).

### BGT Emission Timing vs Incentive Exchange Rates

It's important to understand that **BGT emission timing** and **incentive token exchange rates** are controlled by separate mechanisms:

**BGT Emission Timing** is controlled by the Reward Vault's emission mode (as described above):

- **Duration-based mode**: Fixed distribution period (3-7 days)
- **Target rate mode**: `targetRewardsPerSecond` automatically calculates distribution period

**Incentive Exchange Rates** are controlled by protocol token managers through `addIncentive()` calls, which set how many incentive tokens are distributed per individual BGT received. These exchange rates operate independently of BGT emission timing.

### PoL V2 Incentive Fee Collection

With PoL V2, when protocols add incentives to Reward Vaults, a portion is automatically collected as fees for BERA stakers:

- **Fee Rate**: 33% of the incentive amount
- **Collection Process**: Automatically deducted when `addIncentive()` is called
- **Distribution**: Fees are sent to BGTIncentiveFeeCollector for auction to WBERA
- **Remaining Amount**: The remaining 67% is available for distribution to validators

This mechanism ensures that BERA stakers receive direct yield from PoL incentives while maintaining the competitive incentive marketplace.

**Key Point**: These modes control **when** BGT is distributed to stakers, not **how much** incentive tokens protocols offer. Incentive token exchange rates (like "10 USDC per BGT") remain constant regardless of whether that BGT is distributed over 3 days or 7 days.

### Minimum Duration Configuration

The `minRewardDurationForTargetRate` parameter controls the minimum distribution period in target rate mode:

- **Default**: 3 days (259,200 seconds)
- **Range**: Between 3-7 days (259,200 to 604,800 seconds)
- **Management**: Only the `rewardVaultManager` can modify this value
- **Purpose**: Ensures rewards are distributed over a reasonable minimum timeframe even when target rates would allow shorter periods

### Switching Between Modes

- `setTargetRewardsPerSecond(x)` enables target rate mode
- `setTargetRewardsPerSecond(0)` re-enables duration-based mode
- Only the `rewardVaultManager` can switch modes

Example of target rate calculation:

| totalReward |     targetRate |                    resulting duration |
| ----------- | -------------: | ------------------------------------: |
| 10 000 BERA | 0.02572 BERA/s | 388,800 s ≈ 4.5 days ≈ 194,400 blocks |

For detailed implementation and additional configuration options, see the [RewardVault contract reference](/developers/contracts/reward-vault).

## Incentive Management

RewardVaults support **incentive tokens**, which are additional tokens that protocols can offer to BGT stakers beyond the base BGT rewards. This creates a powerful mechanism for protocols to attract liquidity and user engagement.

### How Incentive Tokens Work

1. **Whitelisting**: Protocol tokens must first be whitelisted in the vault by governance
2. **Exchange Rate Setting**: Protocol managers set exchange rates (e.g., "10 USDC per BGT earned")
3. **Token Deposits**: Protocols deposit their tokens into the vault
4. **Automatic Distribution**: When users earn BGT, they automatically receive proportional incentive tokens

### Independence from BGT Emission

**Important Distinction**: Incentive token exchange rates operate completely independently from BGT emission timing modes. Whether BGT is distributed over 3 days or 7 days, the incentive token exchange rate (tokens per BGT) remains constant.

For comprehensive information about incentive mechanics, see the [Incentive Marketplace documentation](/learn/pol/incentives).

## Incentives

To understand why validators would choose to emit `$BGT` to one Reward Vault over another, refer to [Incentives](/learn/pol/incentives) in PoL, which discusses how protocols can influence validator behavior with economic incentives.

## Vault Creation

New Reward Vaults can be created permissionlessly at <a target="_blank" :href="config.mainnet.dapps.hub.url + 'vaults/create'">{{config.mainnet.dapps.hub.url}}vaults/create</a>.

Protocols creating Reward Vaults must additionally [whitelist their vaults](/learn/governance/rewardvault) through `$BGT` governance to be eligible to receive emissions from validators.

## Calculating `$BGT` APR

As a user, if I want to manually verify the BGT APR for a given Reward Vault, the following information is available on chain to do so.
The value calculated corresponds to the light blue `BGT APR` value found on the Hub frontend.

![BGT APR Example](/public/assets/bgt-apr-example.png)

The [RewardVault](/developers/contracts/reward-vault) APR is determined by several factors.
The components of this APR calculation include:

- `rewardRate` - The BGT amount added to Reward Vault Staker's total claims per second
- `periodFinish` - The timestamp when the `rewardRate` expires
- `stakeToken` - The token you stake into the Reward Vault
- `totalSupply` - The total amount of `stakeToken` staked in the Reward Vault
- Price of `$BGT` (`$BERA`) - The assumption is made the price of `$BGT` is equivalent the `$BERA` price
- Price of Stake Token

:::info
If the `periodFinish` timestamp has elapsed no rewards are being emitted. As a result, the `$BGT` APR is 0%.
:::

The units of `rewardRate` is denominated as `$BGT per second`.
The above pieces of data allow us to calculate the APR on the Reward Vault in the following way:

The units of `rewardRate` is denominated as `$BGT per second`.
The above pieces of data allow us to calculate the APR on the Reward Vault in the following way:

$$ APR = {rewardRate \times secondsPerYear \times priceOfBGT \over totalSupply \times priceOfStakeToken} $$

This formula provides the current rate that the Reward Vault is crediting depositors with `$BGT`.

### Example

As a concrete example of the above formula, a reward vault with the following values can be used:

| Parameter            | Value                                | Normalized          |
| :------------------- | :----------------------------------- | :------------------ |
| Reward Rate          | 272490527103681170793308992914391673 | 0.27249052710368116 |
| Price of `$BERA`     | $7.8                                 | $7.8                |
| Total Supply         | 598626940947001140289                | 598.6269409470011   |
| Price of Stake Token | $223,845.58                          | $223,845.58         |
| Seconds per year     | 31,536,000                           | 31,536,000          |

:::tip
The `rewardRate` returned is in gwei and includes an extra precision factor of `1e18`, so is effectively in wei.
Normalizing it requires dividing by `1e36`.
:::

Using the formula above:

$$ APR = {0.27249052710368116 \times 31536000 \times 7.8 \over 598.6269409470011 \times 223845.58} $$
$$ \therefore APR = 0.500204 = 50.02\% $$

These values are updated on the [Vaults](https://hub.berachain.com/vaults/) page roughly every five minutes.
