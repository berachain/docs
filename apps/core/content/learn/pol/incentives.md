<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Incentive Marketplace

Proof-of-Liquidity (PoL) enables protocols to encourage validators to direct their `$BGT` emissions to a protocol's Reward Vault using whitelisted Incentive tokens. In doing so, protocols attract users to their protocol with `$BGT` rewards.

## How Incentives Work

Reward Vaults are established via a [Governance](learn/governance/rewardvault) process.  As part of the Governance process, Reward Vaults identify which ERC20 tokens they might like to offer incentives for.  Once approved by Governance, the Reward Vault operator can choose to add a quantity of one or both of those tokens, specifying the quantity of tokens paid per $BGT received.

Incentives added by approved Reward Vaults are captured when validators direct their $BGT emissions towards those Reward Vaults, by configuring the Reward Allocation. The Reward Allocation can direct $BGT to any number of Reward Vaults, by selecting a percentage to go to each chosen vault.

![Berachain Reward Vault Incentive Marketplace](/assets/berachain-incentive-marketplace.png)

### Incentive Distribution Flow

The distribution of Incentives follows this process:

1. A **User** Boosts (associates their $BGT with a validator) to increase a validator's $BGT emissions they receive when proposing a block.
2. A **Validator** receives block rewards in the form of $BGT emissions, where the amount is influenced by Boost (see [\$BGT Emissions Per Block](/learn/pol/bgtmath#bgt-emissions-per-block)), and emissions are directed toward whitelisted Reward Vaults chosen by the validator.
3. A **Protocol** can offer up to 2 different Incentive Tokens to encourage validators to direct $BGT emissions to their Reward Vault.
4. When the $BGT block reward emissions are distributed:
   - A validator's commission (percentage of all the Incentive Tokens captured) is given directly to the validator's operator address.
   - The remaining amount of Incentive Tokens are sent to a contract which manages distribution and claiming for users who Boosted the validator.
5. A user (Booster) wanting to claim their Incentive Token Rewards will retrieve a merkle proof from a backend API that tracks all Incentive Token claiming eligibility in a 24-hour period. Claim eligibility is updated every 24 hours. Claims do not expire.
6. With the merkle proof, the user (Booster) can claim their Incentive Token Rewards through the $BGT Distributor contract. All proof handling is done by the user's browser.

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

An Incentive Rate must be defined when the Incentive Token is initially offered and cannot be decreased or reset until the supply of Incentive Token offered has been distributed. While an Incentive Rate is defined, a Token Manager can increase the rate, provided they increase the supply of incentive so that an equal or greater amount of $BGT is incentivized. When the supply of the Incentive Token offered is exhausted, a Token Manager can set a new Incentive Rate.

_Example A:_

| Reward Vault Incentive Token | Supply | Incentive Rate Per $BGT                                    |
| ---------------------------- | ------ | ---------------------------------------------------------- |
| $USDC                        | 1,000  | 0.2 _(0.2 $USDC per 1 $BGT directed towards Reward Vault)_ |

A Token Manager:

- ❌ Cannot decrease the Incentive Rate < 0.2 
- ✅ Can increase the Incentive Token supply at the same Incentive Rate. For instance, by adding another 500 USDC
- ✅ Can increase the Incentive Rate > 0.2 provided they supply more incentive tokens. With a supply of 1,000 tokens @ 0.2 incentive rate, this incentivizes 5,000 $BGT. If the rate increases to 0.3, this incentivizes $3,333 $BGT. The operator must deposit at least 500 USDC so that 5,000 $BGT is incentivized.


_Example B:_

| Reward Vault Incentive Token | Supply | Incentive Rate Per $BGT                                 |
| ---------------------------- | ------ | ------------------------------------------------------- |
| $WBERA                       | 10     | 1 _(1 $WBERA per 1 $BGT directed towards Reward Vault)_ |

A validator successfully directs 10 $BGT towards the Reward Vault, claiming 10 $WBERA.

A Token Manager:

- ✅ Can add more to the Incentive Token supply at a new Incentive Rate (e.g. 0.1, 5, 10), again ensuring that (in this case) at least the same amount of 10 $BGT is incentivized.

### Validator Incentive Token Distribution

Each validator can set a percentage that they take as a commission of all Incentive Tokens received for directing $BGT emissions to different Reward Vaults offering Incentives. Every time $BGT block rewards are distributed, the validator will receive their commission rate of Incentive Tokens.

_Example:_

| Reward Vault Incentive Token | Supply | Incentive Rate Per $BGT                                    |
| ---------------------------- | ------ | ---------------------------------------------------------- |
| $USDC                        | 100    | 100 _(100 $USDC per 1 $BGT directed towards Reward Vault)_ |

Validator A has an Incentive Commission of `5%` and directs 1 $BGT of emissions towards the Reward Vault.

From `100 $USDC`, the validator would get `5 $USDC`, based on their commission, and leaves `95 $USDC` for users who boosted the validator.

Any user boosts a validator with their $BGT token (including the validator itself) is eligible to receive Incentive Tokens remaining after the validator's commission.
The Incentive Tokens rewarded are based on that user's weight in the total $BGT boosted to that validator.

| Party       | $BGT Boost To Validator A | % Boost | Total Incentive Token Rewards         |
| ----------- | ------------------------- | ------- | ------------------------------------- |
| Validator A | 20 $BGT                   | 25%     | 28.75 $USDC _(5% of 95 + 25% of 95)   |
| Manny       | 40 $BGT                   | 50%     | 47.5 $USDC _(50% of 95)_              |
| Cami        | 10 $BGT                   | 12.5%   | 11.875 $USDC _(12.5% of 95)_          |
| Jintao      | 10 $BGT                   | 12.5%   | 11.875 $USDC _(12.5% of 95)_          |

All eligible users of Incentive Tokens from a validator will need to claim them (it is not automatic) through <a :href="config.mainnet.dapps.hub.url">{{config.mainnet.dapps.hub.name}}</a>. Incentive Token eligibility is updated every 24 hours.

A validator can change their commission percentage by first queuing the rate to notify users of the upcoming change, waiting `16,384` blocks, and then anyone may activate the new rate for the validator.
