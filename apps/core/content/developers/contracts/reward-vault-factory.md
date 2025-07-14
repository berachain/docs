<script setup>
  import config from '@berachain/config/constants.json';
</script>

# RewardVaultFactory

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.rewardVaultFactory['mainnet-address']">{{config.contracts.pol.rewardVaultFactory['mainnet-address']}}</a><span v-if="config.contracts.pol.rewardVaultFactory.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.rewardVaultFactory.abi">ABI JSON</a></span></small>

Factory contract for creating RewardVaults and keeping track of them.

## State Variables

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

### beacon

The beacon address.

```solidity
address public beacon;
```

### bgt

The BGT token address.

```solidity
address public bgt;
```

### distributor

The distributor address.

```solidity
address public distributor;
```

### beaconDepositContract

The BeaconDeposit contract address.

```solidity
address public beaconDepositContract;
```

### getVault

Mapping of staking token to vault address.

```solidity
mapping(address stakingToken => address vault) public getVault;
```

### allVaults

Array of all vaults that have been created.

```solidity
address[] public allVaults;
```

### bgtIncentiveDistributor

The address of the BGTIncentiveDistributor contract to receive
the BGT booster share of the incentive tokens.

```solidity
address public bgtIncentiveDistributor;
```

## Functions

### constructor

**Note:**
oz-upgrades-unsafe-allow: constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(
    address _bgt,
    address _distributor,
    address _beaconDepositContract,
    address _governance,
    address _vaultImpl
)
    external
    initializer;
```

### \_authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyRole(DEFAULT_ADMIN_ROLE);
```

### setBGTIncentiveDistributor

Sets the BGTIncentiveDistributor contract.

_Only callable by the admin._

```solidity
function setBGTIncentiveDistributor(address _bgtIncentiveDistributor) external onlyRole(DEFAULT_ADMIN_ROLE);
```

**Parameters**

| Name                       | Type      | Description                                              |
| -------------------------- | --------- | -------------------------------------------------------- |
| `_bgtIncentiveDistributor` | `address` | The address of the new BGTIncentiveDistributor contract. |

### createRewardVault

Creates a new reward vault vault for the given staking token.

_Reverts if the staking token is not a contract._

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

### allVaultsLength

Gets the number of vaults that have been created.

```solidity
function allVaultsLength() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description           |
| -------- | --------- | --------------------- |
| `<none>` | `uint256` | The number of vaults. |
