<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Incentive Marketplace

Proof-of-Liquidity (PoL) enables protocols to encourage validators to direct their `$BGT` emissions to a protocol's Reward Vault using whitelisted Incentive tokens. In doing so, protocols attract users to their protocol with `$BGT` rewards.

## How Incentives Work

Incentives offered by whitelisted Reward Vaults can be captured by validators directing their $BGT emissions towards those Reward Vaults, defined by a validator's Reward Allocation - the list of Reward Vaults a validator directs percentages of its $BGT emissions to.

![Berachain Reward Vault Incentive Marketplace](/assets/berachain-incentive-marketplace.png)

### Incentive Distribution Flow

The distribution of Incentives follows this process:

1. A **User** Boosts (associates their $BGT with a validator) to increase a validator's $BGT emissions they receive when proposing a block.
2. A **Validator** receives block rewards in the form of $BGT emissions, where the amount is influenced by Boost (see [\$BGT Emissions Per Block](/learn/pol/bgtmath#bgt-emissions-per-block)), and emissions are directed toward whitelisted Reward Vaults chosen by the validator.
3. A **Protocol** can offer up to 2 different Incentive Tokens to encourage validators to direct $BGT emissions to their Reward Vault.
4. When the $BGT block reward emissions are distributed:
   - A validator's commission (percentage of all the Incentive Tokens captured) is given directly to the validator's operator address.
   - The remaining amount of Incentive Tokens are sent to a contract which manages distribution and claiming for users who Boosted the validator.
5. A user (Booster) wanting to claim their Incentive Token Rewards will retrieve a merkle proof from a backend API that tracks all Incentive Token claiming eligibility in a 24-hour period. (NOTE: claim eligibility is updated every 24 hours. It does NOT mean that claims expire in 24 hours)
6. With the merkle proof, the user (Booster) can claim their Incentive Token Rewards through the $BGT Distributor contract.

### Incentives & Users

As an overview, Incentives involve 3 different parties:

| User      | Description & Motivation                                                                                                                                                                                                                     |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Booster   | Any user that boosts a validator with $BGT for the purpose of increasing a validator's $BGT emissions to capture more Incentives from Reward Vaults, so that the Booster can take a portion of those Incentives.                            |
| Validator | A node in the Active Set that directs $BGT emissions to different Reward Vaults defined by their Reward Allocation distribution, captures Incentives from Reward Vaults, and takes a percentage (Commission Rate) of the Incentives captured. |
| Protocol  | An entity, group, or organization that offers Incentive tokens for their respective Reward Vault with the goal of capturing $BGT emissions for their protocol and/or users.                                                                  |


## Incentive Mechanics

Behind Incentives, there are additional mechanics to consider beyond the high-level overview of how distribution works.

### Whitelisting Incentive Tokens

Only Whitelisted Reward Vaults can offer Incentives. Each Incentive Token must also be whitelisted through a governance process, where the proposer needs to specify both the Token and a [Token Manager](#incentive-token-managers).

A Reward Vault can have up to (2) two unique Incentive Tokens whitelisted. If a token needs to be added or replaced, it requires passing a governance proposal.

### Incentive Token Managers

Only Incentive Token Managers of a Reward Vault can offer incentives. This means that one wallet address is responsible for offering an Incentive Token. The same wallet address can be set as a Token Manager for multiple Incentive Tokens.

Token Managers are typically defined when a proposal for an Incentive Token is proposed through governance.
If a Token Manager needs to be changed, it requires passing a governance proposal.

### Offering Incentives

A Reward Vault can offer up to (2) Incentive Tokens simultaneously. Each token offered cannot be reverted or taken back. 

An Incentive Rate must be defined when the Incentive Token is initially offered and cannot be decreased or reset until the supply of Incentive Token offered has been exhausted by validators directing $BGT emissions. While an Incentive Rate is defined, a Token Manager can increase that rate. When the supply of the Incentive Token offered is exhausted, a Token Manager can set a new Incentive Rate.

_Example A:_

| Reward Vault Incentive Token | Supply | Incentive Rate Per $BGT                                    |
| ---------------------------- | ------ | ---------------------------------------------------------- |
| $USDC                        | 1000   | 0.2 _(0.2 $USDC per 1 $BGT directed towards Reward Vault)_ |

A Token Manager:

- ✅ Can increase the Incentive Rate > 0.2 (e.g. 0.3, 1, 5)
- ✅ Can increase the Incentive Token supply at the same Incentive Rate (e.g. Adding an additional 1, 3, 1000 $USDC at 0.2)
- ❌ Cannot decrease the Incentive Rate < 0.2 (e.g. 0.199, 0.1, 0.01)

_Example B:_

| Reward Vault Incentive Token | Supply | Incentive Rate Per $BGT                                 |
| ---------------------------- | ------ | ------------------------------------------------------- |
| $WBERA                       | 10     | 1 _(1 $WBERA per 1 $BGT directed towards Reward Vault)_ |

A validator successfully directs 10 $BGT towards the Reward Vault, claiming 10 $WBERA.

A Token Manager:

- ✅ Can add more to the Incentive Token supply at a new Incentive Rate (e.g. 0.1, 5, 10)

### Validator Incentive Token Commission

Each validator can set a percentage that they take as a commission of all Incentive Tokens received for directing $BGT emissions to different Reward Vaults offering Incentives. Every time $BGT block rewards are distributed, the validator will receive their commission rate of Incentive Tokens.

_Example:_

| Reward Vault Incentive Token | Supply | Incentive Rate Per $BGT                                    |
| ---------------------------- | ------ | ---------------------------------------------------------- |
| $USDC                        | 100    | 100 _(100 $USDC per 1 $BGT directed towards Reward Vault)_ |

Validator A has an Incentive Commission of `5%` and directs 1 $BGT of emissions towards the Reward Vault.

From `100 $USDC`, the validator would get `5 $USDC`, based on their commission, and leaves `95 $USDC` for users who boosted the validator.

| Party       | $BGT Boost To Validator A | % Boost | Total Incentive Token Rewards         |
| ----------- | ------------------------- | ------- | ------------------------------------- |
| Validator A | 20 $BGT                   | 25%     | 28.75 $USDC _(5 $USDC + 23.75 $USDC)_ |
| Manny       | 40 $BGT                   | 50%     | 47.5 $USDC                            |
| Cami        | 10 $BGT                   | 12.5%   | 11.875 $USDC                          |
| Jintao      | 10 $BGT                   | 12.5%   | 11.875 $USDC                          |

A validator can change their commission percentage by first queuing the rate to notify users of the upcoming change, waiting `16,382` blocks, and then anyone may activate the new rate for the validator.

### Booster Incentive Token Rewards

Any user that has $BGT and boosts a validator with that $BGT token is eligible to receive Incentive Tokens from the validator boosted.
The Incentive Tokens rewarded are based on the weight of the $BGT boosted to that validator.

_Example:_

| Party  | $BGT Boost To Validator | % Incentive Token Rewards |
| ------ | ----------------------- | ------------------------- |
| Smokey | 25 $BGT                 | 25%                       |
| Manny  | 50 $BGT                 | 50%                       |
| Cami   | 20 $BGT                 | 20%                       |
| Jintao | 5 $BGT                  | 5%                        |

All eligible users of Incentive Tokens from a validator will need to claim them (it is not automatic) through <a :href="config.mainnet.dapps.hub.url">{{config.mainnet.dapps.hub.name}}</a>. Incentive Token eligibility and claiming is updated every 24 hours.