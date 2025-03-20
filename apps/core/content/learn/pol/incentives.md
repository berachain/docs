<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Incentive Marketplace

Proof-of-Liquidity (PoL) enables protocols to encourage validators to direct their `$BGT` emissions to a protocol's Reward Vault using whitelisted Incentive tokens. In doing so, protocols attract users to their protocol with `$BGT` rewards.

Reward Vaults are established via a [Governance](learn/governance/rewardvault) process.  As part of the Governance process, Reward Vaults identify which ERC20 tokens they might like to offer incentives for, and stipulate an absolute minimum Incentive Rate of tokens paid per $BGT received.  A Reward Vault can have two different Incentive Tokens.  

Once approved by Governance, the Reward Vault operator can add either of its approved Incentive Tokens, specifying an Incentive Rate equal or above the minimum set in their Reward Vault's proposal.  Both Incentive Tokens can have activeincentives at the same time.

Incentive Tokens added by approved Reward Vaults are captured when validators direct their $BGT emissions towards those Reward Vaults.  Validators can direct
their block reward $BGT to any number of Vaults, specifying a percentage to be sent to the Vaults of their choice.  These $BGT receive a specified Incentive Rate of tokens per $BGT. After the Validator takes a commission, the Validator's boosters receive these incentives.

![Berachain Reward Vault Incentive Marketplace](/assets/berachain-incentive-marketplace.png)

A Validator can change their commission percentage by first queuing the rate to notify users of the upcoming change, waiting `16,384` blocks, and then anyone may activate the new rate for the validator.  A Validator can change their Reward Allocation via a similar process, subject to a delay of `8,192` blocks.

The Reward Vault Owner can change the tokens they can offer, or their minimum Incentive Rate, via Governance.

### Incentive Distribution Flow

The distribution of Incentives follows this process:

1. A **User** associates their $BGT with a validator to increase that validator's block reward $BGT.
2. A **Validator** receives block rewards in the form of $BGT emissions, where the amount is influenced by Boost (see [\$BGT Emissions Per Block](/learn/pol/bgtmath#bgt-emissions-per-block)), and emissions are directed toward approved Reward Vaults chosen by the validator.
3. A **Protocol** can offer up to 2 different Incentive Tokens to encourage validators to direct $BGT emissions to their Reward Vault.
4. When the $BGT block reward emissions are distributed:
   - A validator's commission (percentage of all the Incentive Tokens captured) is given directly to the validator's operator address.
   - The remaining amount of Incentive Tokens are sent to a contract which manages distribution and claiming for users who Boosted the validator. A backend API prepares a proof of the user's entitlement to a given number of tokens, updated every 24 hours. This eligibility never expires.
5. A user (Booster) wanting to claim their Incentive Token Rewards retrieves this proof and claims their Incentive Token Rewards through the $BGT Distributor contract. All proof handling is done by the user's browser, by interacting with <a :href="config.mainnet.dapps.hub.url">{{config.mainnet.dapps.hub.name}}</a>. Incentive Token eligibility is updated every 24 hours.

### Incentive Creation and Distribution Example

A Reward Vault can offer up to (2) Incentive Tokens simultaneously. 

When an quantity of Incentive Token is added to a Vault, the Incentive Rate (of tokens per $BGT) must be specified. This exchange rate must be equal or greater to what was set on the Reward Vault's proposal.  This rate cannot be decreased or reset until the supply of Incentive Token offered has been distributed. A Vault Owner
can increase the amount of Incentive Tokens at any time.  Further, a Vault Owner can increase the Incentive Rate, provided they increase the supply of Incentive Tokens so that an equal or greater amount of $BGT is incentivized.

| Reward Vault Incentive Token | Supply | Incentive Rate Per $BGT                                    | $BGT Incentivized |
| ---------------------------- | ------ | ---------------------------------------------------------- | ---------------- |
| $USDC                        | 1,000  | 0.2 _(0.2 $USDC per 1 $BGT directed towards Reward Vault)_ | 5,000            |

A Token Manager:

- ❌ Cannot decrease the Incentive Rate < 0.2 
- ✅ Can increase the Incentive Token supply at the same Incentive Rate. For instance, by adding another 500 USDC
- ✅ Can increase the Incentive Rate > 0.2 provided they supply more incentive tokens. With a supply of 1,000 tokens @ 0.2 incentive rate, this incentivizes 5,000 $BGT. If the rate increases to 0.3, this incentivizes 3,333 $BGT. The operator must deposit at least 500 USDC so that 5,000 $BGT is incentivized.

Imagine the validator receives 500 $BGT as a block reward, incentivizing `100 $USDC` according to the 0.2 Incentive Rate.

In this scenario, Validator A has set an Incentive Commission of `5%`. From the `100 $USDC`, the validator would get `5 $USDC`, based on their commission, and leaves `95 $USDC` for users who boosted the validator.

Here's what the reward distributions look like:

| Party       | $BGT Boost To Validator A | % Boost | Total Incentive Token Rewards         |
| ----------- | ------------------------- | ------- | ------------------------------------- |
| Validator A | 20 $BGT                   | 25%     | 28.75 $USDC _(5% of 100 + 25% of 95)_ |
| Manny       | 40 $BGT                   | 50%     | 47.5 $USDC _(50% of 95)_              |
| Cami        | 10 $BGT                   | 12.5%   | 11.875 $USDC _(12.5% of 95)_          |
| Jintao      | 10 $BGT                   | 12.5%   | 11.875 $USDC _(12.5% of 95)_          |
