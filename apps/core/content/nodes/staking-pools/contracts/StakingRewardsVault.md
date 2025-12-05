---
head:
  - - meta
    - property: og:title
      content: StakingRewardsVault Contract Reference
  - - meta
    - name: description
      content: Developer reference for the StakingRewardsVault contract
  - - meta
    - property: og:description
      content: Developer reference for the StakingRewardsVault contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# StakingRewardsVault

> <small><span v-if="config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl.address?.berachainMainnet">Mainnet: <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl.address.berachainMainnet">{{config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl.address.berachainMainnet}}</a></span><span v-else>Mainnet: Not yet deployed</span><span v-if="config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl.address?.berachainBepolia">&nbsp;|&nbsp;Bepolia: <a target="_blank" :href="config.websites.berascanBepolia.url + 'address/' + config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl.address.berachainBepolia">{{config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl.address.berachainBepolia}}</a></span><span v-if="config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl.abi">ABI JSON</a></span></small>

The StakingRewardsVault contract holds execution layer rewards for validators. It receives BERA rewards from validator activities and allows the staking pool to withdraw these rewards when needed.

## Functions

### withdrawRewards

Withdraws rewards from the vault to the staking pool. Can only be called by the staking pool contract.

```solidity
function withdrawRewards(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `amount` | `uint256` | The amount of rewards to withdraw |

**Requirements**

- Must be called by the staking pool contract

## Events

### RewardsReceived

Emitted when the default payable function is called.

```solidity
event RewardsReceived(uint256 amount);
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `amount` | `uint256` | The amount of token received. |

### RewardsWithdrawn

Emitted when rewards are withdrawn from the vault to the staking pool.

```solidity
event RewardsWithdrawn(uint256 amount);
```

**Parameters**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `amount` | `uint256` | The amount of rewards withdrawn. |

## Errors

### InvalidSender

```solidity
error InvalidSender();
```
