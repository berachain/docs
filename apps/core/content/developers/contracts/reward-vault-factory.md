---
head:
  - - meta
    - property: og:title
      content: RewardVaultFactory Contract Reference
  - - meta
    - name: description
      content: Developer reference for the RewardVaultFactory contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the RewardVaultFactory contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# RewardVaultFactory

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.rewardVaultFactory['mainnet-address']">{{config.contracts.pol.rewardVaultFactory['mainnet-address']}}</a><span v-if="config.contracts.pol.rewardVaultFactory.abi && config.contracts.pol.rewardVaultFactory.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.rewardVaultFactory.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/pol/rewards/RewardVaultFactory.sol)

Factory contract for creating RewardVaults and keeping track of them.

**Inherits:** IRewardVaultFactory, AccessControlUpgradeable, UUPSUpgradeable

## Constants

### VAULT_MANAGER_ROLE

The VAULT MANAGER role.

```solidity
bytes32 public constant VAULT_MANAGER_ROLE = keccak256("VAULT_MANAGER_ROLE");
```

### VAULT_PAUSER_ROLE

The VAULT PAUSER role.

```solidity
bytes32 public constant VAULT_PAUSER_ROLE = keccak256("VAULT_PAUSER_ROLE");
```

## State Variables

### allVaults

Array of all vaults that have been created.

```solidity
address[] public allVaults;
```

### beacon

The beacon address.

```solidity
address public beacon;
```

### beaconDepositContract

The BeaconDeposit contract address.

```solidity
address public beaconDepositContract;
```

### bgt

The BGT token address.

```solidity
address public bgt;
```

### bgtIncentiveDistributor

The address of the BGTIncentiveDistributor contract to receive the BGT booster share of the incentive tokens.

```solidity
address public bgtIncentiveDistributor;
```

### bgtIncentiveFeeCollector

The address of the BGTIncentiveFeeCollector contract to receive fees.

```solidity
address public bgtIncentiveFeeCollector;
```

### bgtIncentiveFeeRate

Fee rate on incentives in basis points (e.g., 100 = 1%).

```solidity
uint256 public bgtIncentiveFeeRate;
```

### distributor

The distributor address.

```solidity
address public distributor;
```

### getVault

Mapping of staking token to vault address.

```solidity
mapping(address stakingToken => address vault) public getVault;
```

## View Functions

### allVaultsLength

Gets the number of vaults that have been created.

```solidity
function allVaultsLength() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description          |
| -------- | --------- | -------------------- |
| `<none>` | `uint256` | The number of vaults |

### bgtIncentiveDistributor

Gets the address of the BGTIncentiveDistributor contract.

```solidity
function bgtIncentiveDistributor() external view returns (address);
```

**Returns**

| Name     | Type      | Description                                         |
| -------- | --------- | --------------------------------------------------- |
| `<none>` | `address` | The address of the BGTIncentiveDistributor contract |

### bgtIncentiveFeeCollector

Gets the address of the incentive fee collector.

```solidity
function bgtIncentiveFeeCollector() external view returns (address);
```

**Returns**

| Name     | Type      | Description                                          |
| -------- | --------- | ---------------------------------------------------- |
| `<none>` | `address` | The address of the BGTIncentiveFeeCollector contract |

### bgtIncentiveFeeRate

Gets the value of the incentive fee rate.

```solidity
function bgtIncentiveFeeRate() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                |
| -------- | --------- | -------------------------- |
| `<none>` | `uint256` | The rate (in basis points) |

### getIncentiveFeeAmount

Applies the fee percentage on the incentive amount.

```solidity
function getIncentiveFeeAmount(uint256 incentiveAmount) external view returns (uint256);
```

**Parameters**

| Name              | Type      | Description                    |
| ----------------- | --------- | ------------------------------ |
| `incentiveAmount` | `uint256` | The amount of incentive tokens |

**Returns**

| Name     | Type      | Description    |
| -------- | --------- | -------------- |
| `<none>` | `uint256` | The fee amount |

### getVault

Gets the vault for the given staking token.

```solidity
function getVault(address stakingToken) external view returns (address);
```

**Parameters**

| Name           | Type      | Description                      |
| -------------- | --------- | -------------------------------- |
| `stakingToken` | `address` | The address of the staking token |

**Returns**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `<none>` | `address` | The address of the vault |

### predictRewardVaultAddress

Predicts the address of the reward vault for the given staking token.

```solidity
function predictRewardVaultAddress(address stakingToken) external view returns (address);
```

**Parameters**

| Name           | Type      | Description                      |
| -------------- | --------- | -------------------------------- |
| `stakingToken` | `address` | The address of the staking token |

**Returns**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `<none>` | `address` | The address of the reward vault |

## Functions

### createRewardVault

Creates a new reward vault for the given staking token.

_Reverts if the staking token is not a contract._

**Emits:**

- [VaultCreated](#event-vaultcreated)

```solidity
function createRewardVault(address stakingToken) external returns (address);
```

**Parameters**

| Name           | Type      | Description                      |
| -------------- | --------- | -------------------------------- |
| `stakingToken` | `address` | The address of the staking token |

**Returns**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `<none>` | `address` | The address of the new vault |

### initialize

Initializes the RewardVaultFactory contract.

```solidity
function initialize(
    address _bgt,
    address _distributor,
    address _beaconDepositContract,
    address _governance,
    address _vaultImpl
) external initializer;
```

**Parameters**

| Name                     | Type      | Description                        |
| ------------------------ | --------- | ---------------------------------- |
| `_bgt`                   | `address` | The BGT token address              |
| `_distributor`           | `address` | The distributor address            |
| `_beaconDepositContract` | `address` | The BeaconDeposit contract address |
| `_governance`            | `address` | The governance address             |
| `_vaultImpl`             | `address` | The vault implementation address   |

### setBGTIncentiveDistributor

Sets the BGTIncentiveDistributor contract.

_Only callable by the admin._

**Emits:**

- [BGTIncentiveDistributorSet](#event-bgtincentivedistributorset)

```solidity
function setBGTIncentiveDistributor(address _bgtIncentiveDistributor) external onlyRole(DEFAULT_ADMIN_ROLE);
```

**Parameters**

| Name                       | Type      | Description                                             |
| -------------------------- | --------- | ------------------------------------------------------- |
| `_bgtIncentiveDistributor` | `address` | The address of the new BGTIncentiveDistributor contract |

### setBGTIncentiveFeeCollector

Sets the BGTIncentiveFeeCollector contract.

_Only callable by the admin._

**Emits:**

- [IncentiveFeeCollectorUpdated](#event-incentivefeecollectorupdated)

```solidity
function setBGTIncentiveFeeCollector(address _bgtIncentiveFeeCollector) external onlyRole(DEFAULT_ADMIN_ROLE);
```

**Parameters**

| Name                        | Type      | Description                                              |
| --------------------------- | --------- | -------------------------------------------------------- |
| `_bgtIncentiveFeeCollector` | `address` | The address of the new BGTIncentiveFeeCollector contract |

### setBGTIncentiveFeeRate

Sets the incentives fee rate.

_Only callable by the admin._

**Emits:**

- [IncentiveFeeRateUpdated](#event-incentivefeerateupdated)

```solidity
function setBGTIncentiveFeeRate(uint256 _bgtIncentiveFeeRate) external onlyRole(DEFAULT_ADMIN_ROLE);
```

**Parameters**

| Name                   | Type      | Description                                  |
| ---------------------- | --------- | -------------------------------------------- |
| `_bgtIncentiveFeeRate` | `uint256` | The new value for the rate (in basis points) |

## Events

### BGTIncentiveDistributorSet {#event-bgtincentivedistributorset}

Emitted when the BGTIncentiveDistributor contract is set.

```solidity
event BGTIncentiveDistributorSet(address indexed newBGTIncentiveDistributor, address indexed oldBGTIncentiveDistributor);
```

**Parameters**

| Name                         | Type      | Description                                             |
| ---------------------------- | --------- | ------------------------------------------------------- |
| `newBGTIncentiveDistributor` | `address` | The address of the new BGTIncentiveDistributor contract |
| `oldBGTIncentiveDistributor` | `address` | The address of the old BGTIncentiveDistributor contract |

### IncentiveFeeCollectorUpdated {#event-incentivefeecollectorupdated}

Emitted when the incentive fee collector address is updated.

```solidity
event IncentiveFeeCollectorUpdated(address newAddress, address oldAddress);
```

**Parameters**

| Name         | Type      | Description                        |
| ------------ | --------- | ---------------------------------- |
| `newAddress` | `address` | The new address for incentive fees |
| `oldAddress` | `address` | The old address for incentive fees |

### IncentiveFeeRateUpdated {#event-incentivefeerateupdated}

Emitted when the incentive fee percentage is updated.

```solidity
event IncentiveFeeRateUpdated(uint256 newValue, uint256 oldValue);
```

**Parameters**

| Name       | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| `newValue` | `uint256` | The new rate (in basis points) |
| `oldValue` | `uint256` | The old rate (in basis points) |

### VaultCreated {#event-vaultcreated}

Emitted when a new vault is created.

```solidity
event VaultCreated(address indexed stakingToken, address indexed vault);
```

**Parameters**

| Name           | Type      | Description                      |
| -------------- | --------- | -------------------------------- |
| `stakingToken` | `address` | The address of the staking token |
| `vault`        | `address` | The address of the vault         |

## Errors

### InvalidIncentiveFeeRate

Thrown when the incentive fee rate exceeds the maximum allowed value.

```solidity
error InvalidIncentiveFeeRate();
```

### NotAContract

Thrown when the provided address is not a contract.

```solidity
error NotAContract();
```

### ZeroAddress

Thrown when a zero address is provided where a valid address is required.

```solidity
error ZeroAddress();
```
