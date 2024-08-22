<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Bend And Proof-Of-Liquidity 🤝

[Proof-of-Liquidity](http://docs.berachain.com/learn/what-is-proof-of-liquidity/) (PoL) is Berachain's unique consensus mechanism. This mechanism revolves around the idea that the chain's economic incentives (`$BGT`) should flow to active users providing productive liquidity to the chain.

Bend, as a native Berachain dApp, aims to provide access and utility to the chain's native stablecoin `$HONEY`. Bend achieves this by enabling users to earn `$BGT` rewards by borrowing `$HONEY`. This achieves a few objectives:

1. It incentivizes users to borrow `$HONEY` and deploy it in composable DeFi strategies (e.g. leverage, yield farming, etc).
2. It provides a baseline yield to `$HONEY` holders, produced from the interest paid by borrowers.

## How to Earn $BGT with Bend

There are a few steps involved to borrow `$HONEY` and earn `$BGT`, since all loans on Bend are overcollateralized. These steps are outlined below:

1. [Deposit collateral](/learn/guides/depositing-collateral) to Bend (e.g. WETH) - this provides a collateral balance for users to take loans out against.
2. [Borrow `$HONEY`](/learn/guides/borrowing-and-repaying-honey) - users can borrow `$HONEY` against their deposited collateral.
3. Finally, users with `$HONEY` loans can [Claim `$BGT`](/learn/guides/claim-bgt) they have earned.

:::warning Liquidation Risk
Although the most rewards are earned by borrowing maximal amounts of `$HONEY`, users should carefully balance this with managing their liquidation risk
:::

:::warning Looping Loans
`$HONEY` is not enabled as a collateral asset, so it is not possible to loop `$HONEY` borrows and deposits for the purpose of earning more `$BGT`
:::

## PoL Interactions

Those familiar with PoL may realize that earning `$BGT` on Bend is diferent from the usual flow of depositing on <a target="_blank" :href="config.testnet.dapps.bgtStation.url">BGT Station</a>. The following diagram illustrates the unique sequence of interactions between Bend and PoL:

![Bend & Proof Of Liquidity](/assets/bend-bgt-flow.png)

When borrowing `$HONEY`, an equivalent amount of [`$vdHONEY`](/learn/lending-protocol/tokens#variable-debt-tokens) tokens are minted, representing the user's growing debt obligations. These two tokens are sent to users' wallets.

### PoL Reward Vault

Concurrently in the borrow transaction, `Periphery HONEY` tokens are minted and staked on behalf of users in a BGT reward vault, which produces `$BGT` emissions dedicated to Bend borrowers. Users can [Claim BGT](/learn/guides/claim-bgt) rewards on the Bend UI.

When users repay their `$HONEY` loans, their `Periphery HONEY` tokens are unstaked and burned, meaning they stop earning `$BGT` rewards. Any pending rewards are automatically claimed.
