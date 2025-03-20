<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Incentive Marketplace

Proof-of-Liquidity (PoL) enables protocols to encourage validators to direct their `$BGT` emissions to a protocol's reward vault using whitelisted incentive tokens. In doing so, protocols attract users to their protocol with `$BGT` rewards.

Reward vaults are established via a [governance](learn/governance/rewardvault) process. As part of the governance process, reward vaults identify which ERC20 tokens they might like to offer incentives for, and stipulate an absolute minimum incentive rate of tokens paid per $BGT received. A reward vault can have two different incentive tokens.

Once approved by governance, the reward vault operator can add either of its approved incentive tokens, specifying an incentive rate equal or above the minimum set in their reward vault's proposal. Both incentive tokens can have active incentives at the same time.

Incentive tokens added by approved reward vaults are captured when validators direct their $BGT emissions towards those reward vaults. Validators can direct their block reward $BGT to any number of vaults, specifying a percentage to be sent to the vaults of their choice. These $BGT receive a specified incentive rate of tokens per $BGT. After the validator takes a commission, the validator's boosters receive these incentives.

![Berachain Reward Vault Incentive Marketplace](/assets/berachain-incentive-marketplace.png)

A validator can change their commission percentage by first queuing the rate to notify users of the upcoming change, waiting `16,384` blocks, and then anyone may activate the new rate for the validator. A validator can change their reward allocation via a similar process, subject to a delay of `8,192` blocks.

The reward vault owner can change the tokens they can offer, or their minimum incentive rate, via governance.

### Incentive Distribution Flow

The distribution of incentives follows this process:

1. A **user** associates their $BGT with a validator to increase that validator's block reward $BGT.
2. A **validator** receives block rewards in the form of $BGT emissions, where the amount is influenced by boost (see [\$BGT Emissions Per Block](/learn/pol/bgtmath#bgt-emissions-per-block)), and emissions are directed toward approved reward vaults chosen by the validator.
3. A **protocol** can offer up to 2 different incentive tokens to encourage validators to direct $BGT emissions to their reward vault.
4. When the $BGT block reward emissions are distributed:
   - A validator's commission (percentage of all the incentive tokens captured) is given directly to the validator's operator address.
   - The remaining amount of incentive tokens are sent to a contract which manages distribution and claiming for users who boosted the validator. A backend API prepares a proof of the user's entitlement to a given number of tokens, updated every 24 hours. This eligibility never expires.
5. A user (booster) wanting to claim their incentive token rewards retrieves this proof and claims their incentive token rewards through the $BGT distributor contract. All proof handling is done by the user's browser, by interacting with <a :href="config.mainnet.dapps.hub.url">{{config.mainnet.dapps.hub.name}}</a>. Incentive token eligibility is updated every 24 hours.

### Incentive Creation and Distribution Example

A reward vault can offer up to (2) incentive tokens simultaneously.

When a quantity of incentive token is added to a vault, the incentive rate (of tokens per $BGT) must be specified. This incentive rate must be equal or greater to what was set on the reward vault's proposal. This rate cannot be decreased or reset until the supply of incentive token offered has been distributed. A vault owner can increase the amount of incentive tokens at any time. Further, a vault owner can increase the incentive rate, provided they increase the supply of incentive tokens so that an equal or greater amount of $BGT is incentivized.

| Reward Vault Incentive Token | Supply | Incentive Rate Per $BGT                                    | $BGT Incentivized |
| ---------------------------- | ------ | ---------------------------------------------------------- | ---------------- |
| $USDC                        | 1,000  | 0.2 _(0.2 $USDC per 1 $BGT directed towards reward vault)_ | 5,000            |

A token manager:

- ❌ Cannot decrease the incentive rate < 0.2 
- ✅ Can increase the incentive token supply at the same incentive rate. For instance, by adding another 500 USDC
- ✅ Can increase the incentive rate > 0.2 provided they supply more incentive tokens. With a supply of 1,000 tokens @ 0.2 incentive rate, this incentivizes 5,000 $BGT. If the rate increases to 0.3, this incentivizes 3,333 $BGT. The operator must deposit at least 500 USDC so that 5,000 $BGT is incentivized.

Imagine the validator receives 500 $BGT as a block reward, incentivizing `100 $USDC` according to the 0.2 incentive rate.

In this scenario, Validator A has set an incentive commission of `5%`. From the `100 $USDC`, the validator would get `5 $USDC`, based on their commission, and leaves `95 $USDC` for users who boosted the validator.

Here's what the reward distributions look like:

| Party       | $BGT Boost To Validator A | % Boost | Total Incentive Token Rewards         |
| ----------- | ------------------------- | ------- | ------------------------------------- |
| Validator A | 20 $BGT                   | 25%     | 28.75 $USDC _(5% of 100 + 25% of 95)_ |
| Manny       | 40 $BGT                   | 50%     | 47.5 $USDC _(50% of 95)_              |
| Cami        | 10 $BGT                   | 12.5%   | 11.875 $USDC _(12.5% of 95)_          |
| Jintao      | 10 $BGT                   | 12.5%   | 11.875 $USDC _(12.5% of 95)_          |
