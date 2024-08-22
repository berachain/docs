<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Bend Overview

Bend is Berachain's non-custodial liquidity and lending protocol, with a focus on making the `$HONEY` stablecoin more widely accessible in the Berachain ecosystem.

## Participant Overview

There are three main participants in Bend:

1. **Suppliers** providing `$HONEY`🍯 liquidity
2. **Borrowers** borrowing `$HONEY`🍯 and paying lending fees
3. **Liquidators** ensuring that the protocol remains solvent

**Borrowers** earn `$BGT` in Bend through Berachain's Proof of Liquidity (PoL) mechanism. Head over to the main docs to [learn more about PoL](https://docs.berachain.com/learn/what-is-proof-of-liquidity).

[![Berachain Bend](/assets/how-bend-works-2.png)](https://bartio.bend.berachain.com/)

Berachain itself may also be considered a Bend participant, as the entity providing `$BGT` incentives to promote Bend usage through PoL.

## How do I Use Bend? 🤔

Interacting with Bend can be done via the the Bend dApp using <a target="_blank" :href="config.testnet.dapps.bend.url">{{config.testnet.dapps.bend.url}}</a> or the [contracts](/developers/deployed-contracts). Below are specific considerations for borrowers and lenders.

### Borrowers

Borrowers can deposit assets as collateral and borrow `$HONEY`. Borrowers automatically earn `$BGT` for borrowing `$HONEY`. This borrowed `$HONEY` is also useable in the Berachain ecosystem, as long as the loan is kept collateralized or is repaid.

See our user guide on [Borrowing](/learn/guides/borrowing-and-repaying-honey).

### Lenders

`$HONEY` holders can supply (lend) their tokens to earn passive lending interest from borrowers. This interest is paid in the form of `$HONEY` tokens.

See our user guide on [Supplying](/learn/guides/supply-honey).
