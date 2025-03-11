---
head:
  - - meta
    - property: og:title
      content: Berachain Node Architecture
  - - meta
    - name: description
      content: Berachain nodes are a combination of an EVM execution client and BeaconKit consensus client.
  - - meta
    - property: og:description
      content: Berachain nodes are a combination of an EVM execution client and BeaconKit consensus client.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain Node Architecture Overview 📓

Berachain's network relies on validator nodes and RPC nodes. Each can be configured as a full node or archive node.

Each of these types of nodes is a pair of both an [execution client](/learn/help/glossary#execution-client) and a [consensus client](/learn/help/glossary#consensus-client). Berachain is a Layer 1 EVM Identical chain, which means that for the execution layer, it supports any EVM execution client paired with a consensus client and framework built by Berachain called [BeaconKit](/nodes/beaconkit-consensus).

![Berachain Node Architecture](/assets/berachain-node-architecture.png)

## RPC vs Validator Nodes 📡

The main difference between an RPC node and a validator node is that a validator can propose blocks and receive block rewards.

An RPC node can become a validator node by joining the [Active Set](#active-set-✅) through interaction with the [`BeaconDeposit`](/developers/contracts/beacondeposit) contract by meeting the `$BERA` [stake requirements](#validator-stake-requirements-🔑).

## Active Set ✅

The active set is the set of validators that are currently participating in the consensus layer of the network.

The current limit of validators in the active set is `{{config.mainnet.validatorActiveSetSize}}`.

There is currently only one way a validator may be removed from the active set: if the active set is completely full, and the validator is the least staked validator in the active set, and a new node entering the active set stakes more than the validator in question.

## Validator Stake Requirements 🔑

The minimum stake requirement depends on whether the active set is completely full.

If the active set is not full, the minimum stake requirement is `{{config.mainnet.validatorDepositAmount.toLocaleString()}}` `$BERA`.

If the active set is full, the minimum stake requirement is `1` `$BERA` more than the amount staked by the last validator in the active set.

It can take up to `{{config.mainnet.validatorActivationEpochDelay}}` epochs (`{{config.mainnet.blocksPerEpoch}}` blocks per epoch) for deposits to be processed and for a validator to be included in the active set.

## Direct Staking

Berachain follows Proof-of-Stake (PoS) direct staking, which allows `$BERA` holders to directly stake their `$BERA` to a validator. However, note that if funds are withdrawn from a validator, currently all funds are returned to a single address: the validator's Withdrawal Credentials Address.

This means that validators will have to communicate how they handle funds when a validator is removed from the active set.

:::warning
Avoid staking to validators without knowing how they handle funds when a validator is removed from the active set.
:::

## Removed From Active Set ❌

If a validator is removed from the active set, all `$BERA` staked to that validator will be returned to the validator's Withdrawal Credentials Address, which is set when the validator makes their first deposit.

A validator can decide to become a validator again but will need to generate new CometBFT validator keys and start the deposit process again as if they were a new validator.

:::warning
Staking with a past validator's CometBFT keys and PubKey (a validator that was removed from the active set), without creating new validator keys, can result in loss of funds.
:::

## Voluntary Withdrawals ⚠️

Voluntary withdrawals are not yet implemented on Berachain and will be coming in a future release.

## Validator Block Rewards & Distribution 🪙

Block rewards are in the form of `$BGT`, with a base reward of `{{config.mainnet.validatorBaseBGTReward}}` `$BGT` per block proposed.

Rewards are not distributed automatically and require that the block rewards be distributed via the [`Distributor`](/developers/contracts/distributor) contract. Distribution must occur before `{{config.mainnet.rewardDistributionTimeExpiration}}` seconds have passed, or validators risk losing those rewards.
