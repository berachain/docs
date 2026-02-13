---
head:
  - - meta
    - property: og:title
      content: Staking Pools Smart Contract Reference
  - - meta
    - name: description
      content: Smart contract reference for Berachain staking pools
  - - meta
    - property: og:description
      content: Smart contract reference for Berachain staking pools
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Staking Pools Smart Contract Reference

This reference provides contract addresses and links to detailed documentation for each contract in the staking pools system. For an overview of how the contracts work together, see the [Staking Pools Overview](/nodes/staking-pools/).

## Contract Addresses

### Singleton Contracts

Singleton contracts are deployed once and shared across all staking pools. The **StakingPoolContractsFactory** is the entry point for deploying a staking pool: you call it to create and register your pool's contracts. The other singletons below are shared infrastructure. These are the contracts you interact with directly to deploy and manage your staking pool.

#### Mainnet

| Name                                                                                                                                                    | Address                                                                                                                                                                                                                                                                                                                                                                                          | ABI                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **<a :href="config.contracts.stakingPools.stakingPoolContractsFactory.docsUrl">{{config.contracts.stakingPools.stakingPoolContractsFactory.name}}</a>** | <span v-if="config.contracts.stakingPools.stakingPoolContractsFactory.address?.berachainMainnet"><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.stakingPools.stakingPoolContractsFactory.address.berachainMainnet">{{config.contracts.stakingPools.stakingPoolContractsFactory.address.berachainMainnet}}</a></span><span v-else>Not yet deployed</span> | <span v-if="config.contracts.stakingPools.stakingPoolContractsFactory.abi"><a target="_blank" :href="config.contracts.stakingPools.stakingPoolContractsFactory.abi">ABI JSON</a></span><span v-else>N/A</span> |
| **<a :href="config.contracts.stakingPools.withdrawalVault.docsUrl">{{config.contracts.stakingPools.withdrawalVault.name}}</a>**                         | <span v-if="config.contracts.stakingPools.withdrawalVault.address?.berachainMainnet"><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.stakingPools.withdrawalVault.address.berachainMainnet">{{config.contracts.stakingPools.withdrawalVault.address.berachainMainnet}}</a></span><span v-else>Not yet deployed</span>                                     | <span v-if="config.contracts.stakingPools.withdrawalVault.abi"><a target="_blank" :href="config.contracts.stakingPools.withdrawalVault.abi">ABI JSON</a></span><span v-else>N/A</span>                         |

#### Bepolia

| Name                                                                                                                                                    | Address                                                                                                                                                                                                                                                                                                                                                                                                 | ABI                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **<a :href="config.contracts.stakingPools.stakingPoolContractsFactory.docsUrl">{{config.contracts.stakingPools.stakingPoolContractsFactory.name}}</a>** | <span v-if="config.contracts.stakingPools.stakingPoolContractsFactory.address?.berachainBepolia"><a target="_blank" :href="config.websites.berascanBepolia.url + 'address/' + config.contracts.stakingPools.stakingPoolContractsFactory.address.berachainBepolia">{{config.contracts.stakingPools.stakingPoolContractsFactory.address.berachainBepolia}}</a></span><span v-else>Not yet deployed</span> | <span v-if="config.contracts.stakingPools.stakingPoolContractsFactory.abi"><a target="_blank" :href="config.contracts.stakingPools.stakingPoolContractsFactory.abi">ABI JSON</a></span><span v-else>N/A</span> |
| **<a :href="config.contracts.stakingPools.withdrawalVault.docsUrl">{{config.contracts.stakingPools.withdrawalVault.name}}</a>**                         | <span v-if="config.contracts.stakingPools.withdrawalVault.address?.berachainBepolia"><a target="_blank" :href="config.websites.berascanBepolia.url + 'address/' + config.contracts.stakingPools.withdrawalVault.address.berachainBepolia">{{config.contracts.stakingPools.withdrawalVault.address.berachainBepolia}}</a></span><span v-else>Not yet deployed</span>                                     | <span v-if="config.contracts.stakingPools.withdrawalVault.abi"><a target="_blank" :href="config.contracts.stakingPools.withdrawalVault.abi">ABI JSON</a></span><span v-else>N/A</span>                         |

### Deployed Contracts

When you deploy a staking pool through the StakingPoolContractsFactory, the factory creates proxy contracts for your validator. These proxy contracts are what you and your stakers interact with directly. Each validator receives unique proxy addresses for these contracts when deploying their staking pool.

The factory returns these proxy addresses when you call `deployStakingPoolContracts`. Store these addresses for your operations and provide the StakingPool address to your stakers for deposits.

**Proxy Contracts Deployed with Your Pool:**

- **[StakingPool](contracts/StakingPool)**: Main staking functionality and staker interactions. This is the contract address your stakers use to deposit BERA and receive stBERA shares.
- **[SmartOperator](contracts/SmartOperator)**: Validator operations and Proof of Liquidity integration. Use this contract to manage BGT operations, commission rates, reward allocations, and protocol fees.
- **[IncentiveCollector](contracts/IncentiveCollector)**: Incentive token collection and conversion. Handles the incentive auction mechanism where accumulated tokens can be claimed.
- **[StakingRewardsVault](contracts/StakingRewardsVault)**: Reward collection and automatic reinvestment. Automatically compounds rewards from the consensus layer.
- **[DelegationHandler](contracts/DelegationHandler)**: Delegation handling for capital providers. Only deployed if you're using delegated funds from the Berachain Foundation.
