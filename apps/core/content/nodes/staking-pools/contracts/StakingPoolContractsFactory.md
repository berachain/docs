# StakingPoolContractsFactory

[Git Source](https://github.com/berachain/contracts-staking-pools/blob/b7f6d4823d9636f498243ce334a1458550330535/src/StakingPoolContractsFactory.sol)

**Inherits:**
[IStakingPoolContractsFactory](/src/interfaces/IStakingPoolContractsFactory.sol/interface.IStakingPoolContractsFactory.md), [BeaconRootsHelper](/src/helpers/BeaconRootsHelper.sol/abstract.BeaconRootsHelper.md), OwnableUpgradeable, UUPSUpgradeable

SPDX-License-Identifier: BUSL-1.1

## State Variables

### BEACON_DEPOSIT

```solidity
IBeaconDeposit public constant BEACON_DEPOSIT = IBeaconDeposit(0x4242424242424242424242424242424242424242);
```

### FIRST_DEPOSIT_AMOUNT_WEI

```solidity
uint256 public constant FIRST_DEPOSIT_AMOUNT_WEI = 10_000 ether;
```

### FIRST_DEPOSIT_AMOUNT_GWEI

```solidity
uint256 public constant FIRST_DEPOSIT_AMOUNT_GWEI = 10_000 gwei;
```

### INITIAL_PAYOUT_AMOUNT

```solidity
uint256 public constant INITIAL_PAYOUT_AMOUNT = 100 ether;
```

### MAX_TIMESTAMP_AGE

```solidity
uint64 public constant MAX_TIMESTAMP_AGE = 10 minutes;
```

### accountingOracle

```solidity
address public accountingOracle;
```

### withdrawalVault

```solidity
address public withdrawalVault;
```

### \_beaconSmartOperator

```solidity
address internal _beaconSmartOperator;
```

### \_beaconStakingPool

```solidity
address internal _beaconStakingPool;
```

### \_beaconStakingRewardsVault

```solidity
address internal _beaconStakingRewardsVault;
```

### \_beaconIncentiveCollector

```solidity
address internal _beaconIncentiveCollector;
```

### \_coreContracts

```solidity
mapping(bytes => CoreContracts) internal _coreContracts;
```

## Functions

### constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(
    address governance,
    address accountingOracle_,
    address withdrawalVault_,
    address smartOperatorInitialImpl,
    address stakingPoolInitialImpl,
    address stakingRewardsVaultInitialImpl,
    address incentiveCollectorInitialImpl
)
    public
    initializer;
```

### deployStakingPoolContracts

```solidity
function deployStakingPoolContracts(
    bytes memory pubkey,
    bytes memory withdrawalCredentials,
    bytes memory signature,
    address validatorAdmin,
    address defaultSharesRecipient
)
    external
    payable
    returns (address, address, address, address);
```

### getCoreContracts

```solidity
function getCoreContracts(bytes memory pubkey) external view returns (CoreContracts memory);
```

### predictStakingPoolContractsAddresses

```solidity
function predictStakingPoolContractsAddresses(bytes memory pubkey) external view returns (CoreContracts memory);
```

### activateStakingPool

```solidity
function activateStakingPool(
    ValidatorData calldata validatorData,
    ProofData calldata proofData,
    uint64 timestamp
)
    external;
```

### validatePubkeyProof

```solidity
function validatePubkeyProof(
    bytes calldata pubkey,
    bytes32[] calldata pubkeyProof,
    uint64 validatorIndex,
    uint64 timestamp
)
    public
    view;
```

### validateBalanceProof

```solidity
function validateBalanceProof(
    uint64 balance,
    bytes32 balancesLeaf,
    bytes32[] calldata balanceProof,
    uint64 validatorIndex,
    uint64 timestamp
)
    public
    view;
```

### \_authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyOwner;
```

### setZeroValidatorPubkeyGIndex

_This is necessary to call when the beacon chain hard forks (and specifically the underlying structure of
beacon state is modified)._

```solidity
function setZeroValidatorPubkeyGIndex(uint64 _zeroValidatorPubkeyGIndex) public onlyOwner;
```

### setZeroValidatorWithdrawalCredentialsGIndex

_This is necessary to call when the beacon chain hard forks (and specifically the underlying structure of
beacon state is modified)._

```solidity
function setZeroValidatorWithdrawalCredentialsGIndex(uint64 _zeroValidatorWithdrawalCredentialsGIndex)
    public
    onlyOwner;
```

### setZeroValidatorBalanceGIndex

_This is necessary to call when the beacon chain hard forks (and specifically the underlying structure of
beacon state is modified)._

```solidity
function setZeroValidatorBalanceGIndex(uint64 _zeroValidatorBalanceGIndex) public onlyOwner;
```

### upgradeSmartOperatorBeaconImpl

Upgrades the implementation of the SmartOperator beacon

_Only callable by the owner of the factory contract_

**Note:**
throws: InvalidAddress if newImplementation is the zero address

```solidity
function upgradeSmartOperatorBeaconImpl(address newImplementation) external onlyOwner;
```

**Parameters**

| Name                | Type      | Description                                    |
| ------------------- | --------- | ---------------------------------------------- |
| `newImplementation` | `address` | The address of the new implementation contract |

### upgradeStakingPoolBeaconImpl

Upgrades the implementation of the StakingPool beacon

_Only callable by the owner of the factory contract_

**Note:**
throws: InvalidAddress if newImplementation is the zero address

```solidity
function upgradeStakingPoolBeaconImpl(address newImplementation) external onlyOwner;
```

**Parameters**

| Name                | Type      | Description                                    |
| ------------------- | --------- | ---------------------------------------------- |
| `newImplementation` | `address` | The address of the new implementation contract |

### upgradeStakingRewardsVaultBeaconImpl

Upgrades the implementation of the StakingRewardsVault beacon

_Only callable by the owner of the factory contract_

**Note:**
throws: InvalidAddress if newImplementation is the zero address

```solidity
function upgradeStakingRewardsVaultBeaconImpl(address newImplementation) external onlyOwner;
```

**Parameters**

| Name                | Type      | Description                                    |
| ------------------- | --------- | ---------------------------------------------- |
| `newImplementation` | `address` | The address of the new implementation contract |

### upgradeIncentiveCollectorBeaconImpl

Upgrades the implementation of the IncentiveCollector beacon

_Only callable by the owner of the factory contract_

**Note:**
throws: InvalidAddress if newImplementation is the zero address

```solidity
function upgradeIncentiveCollectorBeaconImpl(address newImplementation) external onlyOwner;
```

**Parameters**

| Name                | Type      | Description                                    |
| ------------------- | --------- | ---------------------------------------------- |
| `newImplementation` | `address` | The address of the new implementation contract |

### \_upgradeBeaconImpl

Upgrades the implementation of a beacon

**Note:**
throws: InvalidAddress if newImplementation is the zero address

```solidity
function _upgradeBeaconImpl(address beacon, address newImplementation) internal;
```

**Parameters**

| Name                | Type      | Description                                    |
| ------------------- | --------- | ---------------------------------------------- |
| `beacon`            | `address` | The address of the beacon to upgrade           |
| `newImplementation` | `address` | The address of the new implementation contract |

### \_getSalt

```solidity
function _getSalt(bytes memory pubkey) internal pure returns (bytes32);
```

### \_withdrawalAddressToCredentials

```solidity
function _withdrawalAddressToCredentials(address withdrawalAddress)
    internal
    pure
    returns (bytes memory withdrawalCredentials);
```

### \_validateInputs

\*Checks that:

- The operator is not already set for this pubkey
- The withdrawal credentials match the withdrawalVault address
- The msg.value matches FIRST_DEPOSIT_AMOUNT\*

```solidity
function _validateInputs(bytes memory pubkey, bytes memory withdrawalCredentials) internal view;
```

### \_validateWithdrawalCredentials

```solidity
function _validateWithdrawalCredentials(bytes memory withdrawalCredentials) internal view;
```

### \_validateProofsTimestamp

```solidity
function _validateProofsTimestamp(uint64 timestamp) internal view;
```

### \_deployAndInitializeCoreContracts

```solidity
function _deployAndInitializeCoreContracts(
    bytes memory pubkey,
    address validatorAdmin,
    address defaultSharesRecipient
)
    internal
    returns (CoreContracts memory);
```

### \_performFirstDeposit

_The deposit function in the beacon deposit contract checks that pubkey, withdrawal credentials and
signature has the correct length._

```solidity
function _performFirstDeposit(
    bytes memory pubkey,
    bytes memory withdrawalCredentials,
    bytes memory depositSignature,
    address operator
)
    internal;
```
