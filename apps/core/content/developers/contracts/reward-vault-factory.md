<script setup>
  import config from '@berachain/config/constants.json';
</script>

# RewardVaultFactory

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.rewardVaultFactory.address">{{config.mainnet.contracts.rewardVaultFactory.address}}</a><span v-if="config.mainnet.contracts.rewardVaultFactory.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.mainnet.contracts.rewardVaultFactory.abi">ABI JSON</a></span></small>

## Functions

### createRewardVault

Creates a new reward vault for the given staking token.

_Reverts if the staking token is not a contract._

_Reverts if a vault already exists for the given staking token and the base vault implementation hasn't
changed as its deployment is deterministic._

```solidity
function createRewardVault(address stakingToken) external returns (address);
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `stakingToken` | `address` | The address of the staking token. |

**Returns**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `<none>` | `address` | The address of the new vault. |

### setRewardVaultImplementation

Updates the vault implementation.

_Only callable by the governance._

```solidity
function setRewardVaultImplementation(address _vaultImpl) external;
```

**Parameters**

| Name         | Type      | Description                                  |
| ------------ | --------- | -------------------------------------------- |
| `_vaultImpl` | `address` | The address of the new vault implementation. |

### VAULT_MANAGER_ROLE

Gets the VAULT_MANAGER_ROLE.

```solidity
function VAULT_MANAGER_ROLE() external view returns (bytes32);
```

**Returns**

| Name     | Type      | Description             |
| -------- | --------- | ----------------------- |
| `<none>` | `bytes32` | The VAULT_MANAGER_ROLE. |

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

### predictRewardVaultAddress

Predicts the address of the reward vault for the given staking token.

```solidity
function predictRewardVaultAddress(address stakingToken) external view returns (address);
```

**Parameters**

| Name           | Type      | Description                       |
| -------------- | --------- | --------------------------------- |
| `stakingToken` | `address` | The address of the staking token. |

**Returns**

| Name     | Type      | Description                      |
| -------- | --------- | -------------------------------- |
| `<none>` | `address` | The address of the reward vault. |

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

### UpdateRewardVaultImplementation

Emitted when the vault implementation is updated.

```solidity
event UpdateRewardVaultImplementation(address indexed oldVaultImpl, address indexed newVaultImpl);
```

**Parameters**

| Name           | Type      | Description                                  |
| -------------- | --------- | -------------------------------------------- |
| `oldVaultImpl` | `address` | The address of the old vault implementation. |
| `newVaultImpl` | `address` | The address of the new vault implementation. |
