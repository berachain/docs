<script setup>
  import config from '@berachain/config/constants.json';
</script>

# IRewardVaultFactory

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.rewardsVaultFactory.address">{{config.contracts.rewardsVaultFactory.address}}</a><span v-if="config.contracts.rewardsVaultFactory.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.rewardsVaultFactory.abi">ABI JSON</a></span></small>

## Functions

### createRewardsVault

Creates a new rewards vault for the given staking token.

```solidity
function createRewardsVault(address stakingToken) external returns (address);
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `stakingToken` | `address` | The address of the staking token. |

**Returns**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `<none>` | `address` | The address of the new vault. |

### getVault

Gets the vault for the given staking token.

```solidity
function getVault(address stakingToken) external view returns (address);
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `stakingToken` | `address` | The address of the staking token. |

**Returns**

| Name     | Type      | Description               |
| -------- | --------- | ------------------------- |
| `<none>` | `address` | The address of the vault. |

### allVaultsLength

Gets the number of vaults that have been created.

```solidity
function allVaultsLength() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description           |
| -------- | --------- | --------------------- |
| `<none>` | `uint256` | The number of vaults. |

### predictRewardsVaultAddress

Predicts the address of the rewards vault for the given staking token.

```solidity
function predictRewardsVaultAddress(address stakingToken) external view returns (address);
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `stakingToken` | `address` | The address of the staking token. |

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `<none>` | `address` | The address of the rewards vault. |

## Events

### VaultCreated

Emitted when a new vault is created.

```solidity
event VaultCreated(address indexed stakingToken, address indexed vault);
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `stakingToken` | `address` | The address of the staking token. |
| `vault`        | `address` | The address of the vault.         |
