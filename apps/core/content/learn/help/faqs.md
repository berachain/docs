---
head:
  - - meta
    - property: og:title
      content: Berachain Frequently Asked Questions
  - - meta
    - name: description
      content: Berachain FAQs
  - - meta
    - property: og:description
      content: Berachain FAQs
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain Frequently Asked Questions ❓

## General Questions

### What is Berachain?

Berachain is a high-performance EVM-compatible blockchain that uses Proof-of-Liquidity (PoL) to align economic incentives among validators, applications, and users.

### What is Proof-of-Liquidity (PoL)?

Proof-of-Liquidity is an extension of Proof-of-Stake that realigns economic incentives through a two-token model:
- `$BERA`: Native gas token used for chain security and validator staking
- `$BGT`: Soulbound governance token distributed for block production and used for validator boosting

## Token Questions

### What is `$BERA`?

`$BERA` is Berachain's native gas token. It is used for:
- Paying transaction fees
- Validator staking (minimum {{ config.mainnet.minEffectiveBalance }} BERA)
- PoL V2 staking for yield (no minimum required)

### What is `$BGT`?

$BGT is Berachain's staking & governance token. That means it is used to secure the network & earn rewards via Proof of Liquidity as well as to vote on governance proposals.

### What is `$HONEY`?

`$HONEY` is the native stablecoin of the Berachain ecosystem. It is a multicollateral backed stablecoin, and is used throughout the Berachain ecosystem.

## Staking and Validation

### What is a Validator?

A validator can refer to three things:

1. A blockchain node being run to validate transactions, produce blocks and come to consensus with other validators in the network
2. The entity that owns and operates the validator node
3. The blend of points #1 and #2 that manages a portion of Proof of Liquidity & Governance votes

### What is the actual staking token of the network, `$BERA` or `$BGT`?

- Validators stake `$BERA`
- Network incentives are received in `$BGT`

### Can validators with `$BERA` alone build blocks and what are the rewards?

Yes, validators only need to stake `$BERA` within the designated min and max range of **{{ config.mainnet.minEffectiveBalance }}** and **{{ config.mainnet.maxEffectiveBalance }}**, and once in the active set they will propose blocks. Validators receive rewards in `$BGT`.

### Why should I boost a validator with my `$BGT`?

Delegating `$BGT` allows you to participate in Proof of Liquidity while helping secure the network.

### Why should I boost my `$BGT` instead of burning it for `$BERA`?

Rewards are the main reason.

With Proof of Liquidity, you can earn many different types of rewards:

- A share of protocol-provided [incentives](/learn/pol/incentives), provided in exchange for `$BGT` emissions directed to those protocols' Reward Vaults
- A share of Berachain core dApp fees, namely fees from BEX and HoneySwap

## BERA Staking (PoL V2) 🐻

### What is PoL V2?

PoL V2 brings the BERA Yield Module, which lets `$BERA` holders stake their tokens directly and earn yield from redirected PoL incentives. It's a simple way to earn yield without diving into complex DeFi protocols.

### How does BERA staking work?

BERA staking works through the WBERAStakerVault:
1. **Deposit BERA**: Stake native BERA or WBERA into the vault
2. **Receive sWBERA**: Get sWBERA (Staked WBERA) tokens representing your position
3. **Earn Yield**: Automatically earn yield from 33% of PoL incentives
4. **Withdraw**: Initiate withdrawal and wait 7 days to receive your BERA back

### What's the difference between BERA staking and validator staking?

**Traditional validator staking**:
- Requires significant BERA amounts (minimum {{ config.mainnet.minEffectiveBalance }} BERA)
- Contributes to network security
- Earns block rewards and gas fees
- Subject to slashing conditions

**PoL V2 BERA staking**:
- No minimum amount required
- Earns yield from PoL incentives
- 7-day withdrawal period
- No slashing risk
- Can be done alongside validator staking

### How much yield can I expect from BERA staking?

Yield varies based on:
- Total PoL incentive volume across all protocols
- Number of stakers in the WBERAStakerVault
- Market conditions and protocol activity

The yield is not fixed and will fluctuate based on ecosystem activity.

### How does the 7-day withdrawal period work?

When you want to withdraw your staked BERA:
1. **Initiate withdrawal** by calling `withdraw()` or `redeem()` on the vault
2. **Wait 7 days** for the unbonding period to complete
3. **Complete withdrawal** by calling `completeWithdrawal()`
4. **Choose format**: Receive either native BERA or WBERA

During the 7-day period, you cannot earn additional rewards, and you cannot cancel the withdrawal request.

### Can I stake both BERA and BGT simultaneously?

Yes! You can participate in both systems simultaneously. BERA staking is completely separate from traditional validator staking and BGT delegation. This allows you to maximize your yield opportunities across the ecosystem.

### Is my staked BERA at risk?

The WBERAStakerVault includes multiple security features:
- **Inflation attack protection** through initial deposit mechanisms
- **Emergency controls** with pausable contracts
- **Role-based access control** for administrative functions
- **Comprehensive auditing** and testing

However, all DeFi protocols carry some smart contract risk.

### Can I stake BERA from a centralized exchange?

Yes! You can transfer BERA from centralized exchanges and stake it directly in the WBERAStakerVault. The vault accepts both native BERA and wrapped WBERA deposits.

### What happens to my existing BGT rewards with PoL V2?

BGT holders will get about 67% of previous incentive amounts, with 33% going to BERA stakers through the incentive tax mechanism. All existing BGT earning mechanisms stay the same.

### When will PoL V2 launch?

PoL V2 is scheduled to launch on July 21st, 2025, following a governance vote. The community feedback period runs from July 14th to July 20th, 2025.

## DeFi and Trading

### What is a swap?

A swap is the process of exchanging one token for another. This can be thought of as a buy or a sell, depending on which token you're looking at. For example, if you're looking to buy `$BERA` with `$ETH`, you would be swapping `$ETH` for `$BERA`. This is essentially "selling" `$ETH` and "buying" `$BERA`.

### How much does it cost to swap?

Each swap has a fee which varies depending on the fee that was set when the pool was created. Common fees are 0.05%, 0.1%, 0.3% or 1% but you should always check when performing a swap to ensure you are okay with the fee on that pool.

### What is liquidity?

Liquidity is the term for the amount of a token that is available to be swapped. The more liquidity a token has, the easier it is to swap that token.

### What is a liquidity pool?

Liquidity pools are pairings of 2 or more tokens that liquidity providers deposit tokens into. This enables DEX users to swap between any of the tokens in the pool.

### What is a liquidity provider?

Liquidity providers are users who deposit tokens into a liquidity pool. They are rewarded with a portion of the fees that are generated from swaps in the pool.

### What is APY?

APY stands for annual percentage yield. In the context of BEX pools, this refers to the current APY for a given pool. APY yield comes from fees collected on every swap made using that pool.

## HONEY Stablecoin

### Does it cost anything to mint or burn $HONEY?

In order to ensure stability, there is a small fee taken on every mint and burn of `$HONEY`. This fee is currently set to 0.2% of the amount minted or burned and can be changed via governance proposals.

Additionally, because minting & burning requires a transaction, there will be a small gas fee in `$BERA`.

### What stablecoins can I mint $HONEY with during Testnet?

There are various USD-pegged stablecoins that can be used to mint `$HONEY`. Currently, the following stablecoins are supported:

- stgUSDC
- BYUSD

More tokens may be added based on governance.

## BGT and Rewards

### How do I get `$BGT`?

`$BGT` is earned through Reward Vaults when validators direct `$BGT` emissions towards Reward Vaults. See [Earning `$BGT`](/learn/pol/tokens/bgt#earning-bgt) for more.

### Once you've provided liquidity into an eligible pool in BEX (or some other PoL-eligible pool) how do you get `$BGT`? Is `$BGT` automatically sent to recipients?

Each eligible (whitelisted) pool on BEX has an associated LP token. Once liquidity is deposited into a BEX pool, an LP token would be issued relative to the user's total contribution percentage to the pool. With this LP token, users must stake (take an additional action) them into their respective Reward Vaults in order to be eligible to receive `$BGT`. As validators direct `$BGT` emissions to Reward Vaults, a user will accumulate `$BGT` to claim. Users must perform an additional action to claim `$BGT`, it is _NOT_ automatically sent to the user. Users can claim their `$BGT` from any wallet address they choose.

### Do incentives only go to the validators with `$BGT` boost?

The incentives a validator receives depend solely on the amount of rewards offered in the specific reward vault that the validator chooses to fill.

### Can Reward Vaults route emissions to a single pool within a dApp, or only the whole dApp?

The dApp can request a Reward Vault for any encapsulated thing they want. The encapsulated thing just requires a representative ERC-20 token that users can stake in the vault. Developers also have the ability to stake in Vaults on [behalf of users](/developers/guides/advanced-pol).

## Governance

### What is governance?

Governance is the process by which the community decides what changes are made to the Berachain protocol. This includes how the node is upgraded and what parameters are set for various components on the chain.

### Can only Validators vote on or create proposals?

Anyone with the required minimum amounts of `$BGT` can propose and vote on proposals.

### How is the incentive fee rate determined?

The incentive fee rate (currently 33%) is set by governance and can be adjusted based on ecosystem needs and market conditions. The rate affects how much of protocol incentives are redirected to BERA stakers.

### Will PoL V2 affect existing Reward Vaults?

No, all existing Reward Vault functionality stays the same. The incentive tax only affects the distribution of incentives, not the core PoL mechanics. Protocols keep competing for BGT emissions as before.

### Can I delegate my staked BERA to validators?

Right now, staked BERA in the WBERAStakerVault can't be delegated to validators. But future versions will support Liquid Staking Tokens (LSTs), which will let you earn dual yield from both validator staking and PoL incentives.
