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

> <small><span v-if="config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl['mainnet-address']"><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl['mainnet-address']">{{config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl['mainnet-address']}}</a></span><span v-else>Mainnet address not yet deployed</span><span v-if="config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPoolImplementations.stakingRewardsVaultImpl.abi">ABI JSON</a></span></small>

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

### recoverERC20

Recovers ERC20 tokens accidentally sent to the contract.

```solidity
function recoverERC20(address token, address to, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE);
```

**Parameters**

| Name     | Type      | Description                                 |
| -------- | --------- | ------------------------------------------- |
| `token`  | `address` | The address of the ERC20 token to recover   |
| `to`     | `address` | The address to send the recovered tokens to |
| `amount` | `uint256` | The amount of tokens to recover             |

**Requirements**

- Must be called by DEFAULT_ADMIN_ROLE

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

### ERC20Recovered

Emitted when ERC20 tokens are recovered from the vault.

```solidity
event ERC20Recovered(address token, address to, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `token`  | `address` | The address of the ERC20 token recovered.  |
| `to`     | `address` | The address to which the tokens were sent. |
| `amount` | `uint256` | The amount of tokens recovered             |

## Errors

### InvalidSender

```solidity
error InvalidSender();
```
