---
head:
  - - meta
    - property: og:title
      content: Berachain Frequently Asked Questions
  - - meta
    - name: description
      content: Berachain's FAQs
  - - meta
    - property: og:description
      content: Berachain's FAQs
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain Frequently Asked Questions ❓

## What do Berachain's performance metrics look like?

Berachain has the following properties:

- Block time: Block times varies, for latest feel free to check it out at <a :href="config.mainnet.dapps.berascan.url">{{config.mainnet.dapps.berascan.name}}</a>.
- Transactions per Second (TPS): This can vary but the following should help with the number of possible transactions (Block gas limit (30m) / Average gas limit per txn) / Block time (2s) = TPS.
- Finality: Instant finality

## What is a DEX?

DEX stands for Decentralized Exchange. It is a place where you can buy and sell tokens that lives directly on the chain instead of being run by any one centralized service. This means that all liquidity can be seen directly on-chain, and is verifiably owned by the smart contracts themselves. A DEX enables you to swap tokens directly from your wallet, as well as allowing anyone to launch their own tokens and provide liquidity.

## What is a swap?

A swap is the process of exchanging one token for another. This can be thought of as a buy or a sell, depending on which token you're looking at. For example, if you're looking to buy `$BERA` with `$ETH`, you would be swapping `$ETH` for `$BERA`. This is essentially "selling" `$ETH` and "buying" `$BERA`.

## How much does it cost to swap?

Each swap has a fee which varies dependening on the fee that was set when the pool was created. Common fees are 0.05%, 0.1%, 0.3% or 1% but you should always check when performing a swap to ensure you are okay with the fee on that pool.

## What is liquidity?

Liquidity is the term for the amount of a token that is available to be swapped. The more liquidity a token has, the easier it is to swap that token.

## What is a liquidity pool?

Liquidity pools are pairings of 2 or more tokens that liquidity providers deposit tokens into. This enables DEX users to swap between any of the tokens in the pool.

## What is a liquidity provider?

Liquidity providers are users who deposit tokens into a liquidity pool. They are rewarded with a portion of the fees that are generated from swaps in the pool.

## What is APY?

APY stands for annual perentage yield. In the context of BeraSwap pools, this refers to the current APY for a given pool. APY yield comes from fees collected on every swap made using that pool? 

## What is $HONEY?

`$HONEY` is the native stablecoin of the Berachain ecosystem. It is a multicollateral backed stablecoin, and is used throughout the Berachain ecosystem.

## Does it cost anything to mint or burn $HONEY?

In order to ensure stability, there is a small fee taken on every mint and burn of `$HONEY`. This fee is currently set to 0.2% of the amount minted or burned and can be changed via governance proposals.

Additionally, because minting & burning requires a transaction, there will be a small gas fee in `$BERA`.

## What stablecoins can I mint $HONEY with during Testnet?

There are various USD-pegged stablecoins that can be used to mint `$HONEY`. Currently, the following stablecoins are supported:

- stgUSDC
- BYUSD 

More tokens may be added based on governance.

## What is `$BGT`?

$BGT is Berachain's staking & governance token. That means it is used to secure the network & earn rewards via Proof of Liquidity as well as to vote on governance proposals.

## What is a Validator?

A validator can refer to three things:

1. A blockchain node being run to validate transactions, produce blocks and come to consensus with other validators in the network
2. The entity that owns and operates the validator node
3. The blend of points #1 and #2 that manages a portion of Proof of Liquidity & Governance votes

## Why should I boost a validator with my `$BGT`?

Delegating `$BGT` allows you to participate in Proof of Liquidity while helping secure the network.

## Why should I boost my `$BGT` instead of burning it for `$BERA`?

Rewards are the main reason.

With Proof of Liquidity, you can earn many different types of rewards:

- A share of protocol-provided [incentives](/learn/pol/incentives), provided in exchange for `$BGT` emissions directed to those protocols' Reward Vaults
- A share of Berachain core dApp fees, namely fees from Bend, BeraSwap and Berps

## How do I get `$BGT`?

`$BGT` is earned through Reward Vaults when validators direct `$BGT` emissions towards Reward Vaults. See [Earning `$BGT`](/learn/pol/tokens/bgt#earning-bgt) for more.

## What is governance?

Governance is the process by which the community decides what changes are made to the Berachain protocol. This includes how the node is upgraded and what parameters are set for various components on the chain.

## Once you’ve provided liquidity into an eligible pool in BeraSwap (or some other BGT-generating action like bend etc) how do you get `$BGT`? Is `$BGT` automatically sent to recipients?

Each eligible (whitelisted) pool on BeraSwap has an associated LP token. Once liquidity is depositted into a BeraSwap pool, an LP token would be issued relative the users total contribution percentage to the pool. With this LP token, users must stake (take an additional action) them into their respective Reward Vaults in order to be eligible to receive `$BGT`. As validators direct `$BGT` emissions to Reward Vaults, a user will accumulate `$BGT` to claim. Users must perform an additional action to claim `$BGT`, it is _NOT_ automatically sent to the user. Users can claim their `$BGT` from any wallet address they choose.

## Can only Validators vote on or create proposals?

Anyone with the required minimum amounts of `$BGT` can propose and vote on proposals.

## What is the actual staking token of the network, `$BERA` or `$BGT`?

- Validators stake `$BERA`
- Network incentives are received in `$BGT`

## Can validators with `$BERA` alone build blocks and what are the rewards?

Yes, validators only need to stake `$BERA` within the designated min and max range of 250K and 10M, and once in the active set they will propose blocks. Validators receive rewards in `$BGT`.

## Do incentives only go to the validators with `$BGT` boost?

The incentives a validator receives depend solely on the amount of rewards offered in the specific reward vault that the validator chooses to fill.

## Can Reward Vaults route emissions to a single pool within a dApp, or only the whole dApp?

The dapp can request a Reward Vault for any encapsulated thing they want. The encapsulated thing just requires a representative ERC-20 token that users can stake in the vault. Developers also have the ability to stake in Vaults on [behalf of users](/developers/guides/advanced-pol).
