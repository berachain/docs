<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Incentive Marketplace

Proof-of-Liquidity (PoL) enables protocols to encourage validators to direct their `$BGT` emissions to a protocol's Reward Vault using whitelisted Incentive tokens. In doing so, protocols attract users to their protocol with `$BGT` rewards.

## How Incentives Work

Validators can capture Incentives offered by Whitelisted Reward Vaults by directing their $BGT emissions towards those Reward Vaults, defined by a validator's Reward Allocation - the list of Reward Vaults a validator directs percentages of its $BGT emissions to.

![Berachain Reward Vault Incentive Marketplace](/assets/berachain-incentive-marketplace.png)

### Incentive Distribution Flow

The distribution of Incentives follows this process:

1. A **User** Boosts (associates their $BGT with a validator) to increase a validator's $BGT emissions they receive when proposing a block.
2. A **Validator** receives block rewards in the form of $BGT emissions, where the amount is influenced by Boost (see [\$BGT Emissions Per Block](/learn/pol/bgtmath#bgt-emissions-per-block)), and directs emissions toward Whitelisted Reward Vaults chosen by the validator.
3. A **Protocol** can offer up to 2 different Incentive Tokens to encourage validators to direct $BGT emissions to their Reward Vault.
4. When the $BGT block reward emissions are distributed:
   - The validator's operator address receives a commission (percentage of all the Incentive Tokens captured).
   - The remaining Incentives, for users who boosted the validator, are sent to a contract and backend service that manages the distribution and claiming of these tokens. The backend API updates proofs of the user's entitlement to Incentive tokens every 24 hours. This eligibility never expires.
5. A user (Booster) wanting to claim their Incentive token rewards retrieves this proof and claims their incentive token rewards through the [BGTIncentiveDistributor](/developers/contracts/bgtincentivedistributor) contract. All proof handling is done by interacting with <a :href="config.mainnet.dapps.hub.url">{{config.mainnet.dapps.hub.name}}</a>. 

### Incentives & Users

As an overview, Incentives involve 3 different parties:

| User      | Description & Motivation                                                                                                                                                                                                                      |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Booster   | Any user that boosts a validator with $BGT to increase a validator's $BGT emissions to capture more Incentives from Reward Vaults, so that the Booster can take a portion of those Incentives.                              |
| Validator | A node in the Active Set that directs $BGT emissions to different Reward Vaults defined by their Reward Allocation distribution, captures Incentives from Reward Vaults, and takes a percentage (Commission Rate) of the Incentives captured. |
| Protocol  | An entity, group, or organization that offers Incentive tokens for their respective Reward Vault with the goal of capturing $BGT emissions for their protocol and/or users.                                                                   |

## Incentive Mechanics

Behind Incentives, there are additional mechanics to consider beyond the high-level overview of how distribution works.

### Whitelisting Incentive Tokens

Only Whitelisted Reward Vaults can offer Incentives. A governance process must whitelist each Incentive Token, where the proposer needs to specify both the Token and a [Token Manager](#incentive-token-managers).

A Reward Vault can have up to (2) two unique Incentive Tokens whitelisted. Adding or replacing a token requires passing a governance proposal.

### Incentive Token Managers

Only Incentive Token Managers of a Reward Vault can offer Incentives. One wallet address is responsible for offering an Incentive Token. The same wallet address can be set as a Token Manager for multiple Incentive Tokens.

A Governance proposal will specify a Token Managers when proposing an Incentive Token.
Changing a Token Manager requires passing a governance proposal.

### Offering Incentives

A Reward Vault can offer up to (2) Incentive Tokens simultaneously. The offered token cannot be reverted or taken back.

The Incentive Token Manager must define an Incentive Rate when initially offering the Incentive Token and cannot decrease or reset it until the supply of the Incentive Token offered has been exhausted by validators directing $BGT emissions. While defining an Incentive Rate, a Token Manager can increase that rate. When the supply of the Incentive Token offered is exhausted, a Token Manager can set a new Incentive Rate.

_Example:_

| Reward Vault Incentive Token | Supply | Incentive Rate Per $BGT                                    | 
| ---------------------------- | ------ | ---------------------------------------------------------- |
| $USDC                        | 1,000   | 0.2 _(0.2 $USDC per 1 $BGT directed towards Reward Vault)_ |

A Token Manager:

- ✅ Can increase the Incentive Supply by any amount, keeping the same rate.
- ✅ Can increase the Incentive Rate > 0.2 provided they supply more incentive tokens at the same time. With a supply of 1,000 tokens @ 0.2 incentive rate, this incentivizes 5,000 $BGT. If the rate increases to 0.3, this incentivizes 3,333 $BGT. The operator must deposit at least 500 USDC so that 5,000 $BGT is incentivized.
- ❌ Cannot decrease the Incentive Rate < 0.2 (e.g. 0.199, 0.1, 0.01)
- ❌ Cannot remove tokens from the Incentive Supply


### Incentive Commission and Distribution

Each validator can set a percentage that they take as a commission of all Incentive Tokens received for directing $BGT emissions to different Reward Vaults offering Incentives. Every time $BGT block rewards are distributed, the validator will receive their commission rate of Incentive Tokens.

_Example:_

| Reward Vault Incentive Token | Supply | Incentive Rate Per $BGT                                    |
| ---------------------------- | ------ | ---------------------------------------------------------- |
| $USDC                        | 100    | 100 _(100 $USDC per 1 $BGT directed towards Reward Vault)_ |

Validator A has an Incentive Commission of `5%` and directs 1 $BGT of emissions towards the Reward Vault.

From `100 $USDC`, the validator would get `5 $USDC`, based on their commission, leaving `95 $USDC` for anyone who boosted the validator, which can include themselves.  The amount of Incentive Tokens distributed to each booster is based on that booster's proportion among the total $BGT boosting that validator.

| Party       | $BGT Boost To Val A | % of Total Boost | Total Incentive Token Rewards         |
| ----------- | -------------------:| ----------------:| -------------------------------------:|
| Validator A | 20 $BGT             | 25%              |     .05 ⨉100 + .25 ⨉95 = 28.75 $USDC|
| Manny       | 40 $BGT             | 50%              |                  .5 ⨉ 95 = 47.50 $USDC|
| Cami        | 10 $BGT             | 12.5%            |               .125 ⨉ 95 = 11.875 $USDC|
| Jintao      | 10 $BGT             | 12.5%            |               .125 ⨉ 95 = 11.875 $USDC|

A validator can change their commission percentage by first queuing the rate to notify users of the upcoming change, waiting `16,382` blocks, and then anyone may activate the new rate for the validator.

