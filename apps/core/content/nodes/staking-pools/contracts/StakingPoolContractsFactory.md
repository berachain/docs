---
head:
  - - meta
    - property: og:title
      content: StakingPoolContractsFactory Contract Reference
  - - meta
    - name: description
      content: Developer reference for the StakingPoolContractsFactory contract
  - - meta
    - property: og:description
      content: Developer reference for the StakingPoolContractsFactory contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# StakingPoolContractsFactory

> <small><span v-if="config.contracts.stakingPools.stakingPoolContractsFactory.address?.berachainMainnet">Mainnet: <a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.stakingPools.stakingPoolContractsFactory.address.berachainMainnet">{{config.contracts.stakingPools.stakingPoolContractsFactory.address.berachainMainnet}}</a></span><span v-else>Mainnet: Not yet deployed</span><span v-if="config.contracts.stakingPools.stakingPoolContractsFactory.address?.berachainBepolia"><br>Bepolia: <a target="_blank" :href="config.websites.berascanBepolia.url + 'address/' + config.contracts.stakingPools.stakingPoolContractsFactory.address.berachainBepolia">{{config.contracts.stakingPools.stakingPoolContractsFactory.address.berachainBepolia}}</a></span><span v-if="config.contracts.stakingPools.stakingPoolContractsFactory.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPools.stakingPoolContractsFactory.abi">ABI JSON</a></span></small>

The StakingPoolContractsFactory is responsible for deploying and managing staking pool contracts for validators. It creates the core contracts (SmartOperator, StakingPool, StakingRewardsVault, and IncentiveCollector) and handles the initial validator deposit to register with the consensus layer.

## State Variables

### accountingOracle

```solidity
address public accountingOracle;
```

### withdrawalVault

```solidity
address public withdrawalVault;
```

## Structs

### ValidatorData

Data for the validator.

```solidity
struct ValidatorData {
    bytes pubkey;
    bytes withdrawalCredentials;
    uint64 initialDepositAmount;
    uint64 validatorIndex;
}
```

**Properties**

| Name                    | Type     | Description                                          |
| ----------------------- | -------- | ---------------------------------------------------- |
| `pubkey`                | `bytes`  | The pubkey of the validator.                         |
| `withdrawalCredentials` | `bytes`  | The withdrawal credentials of the validator.         |
| `initialDepositAmount`  | `uint64` | The initial deposit amount of the validator in GWei. |
| `validatorIndex`        | `uint64` | The index of the validator.                          |

### ProofData

Data for the proofs.

```solidity
struct ProofData {
    bytes32[] pubkeyProof;
    bytes32[] withdrawalCredentialsProof;
    bytes32[] initialDepositProof;
    bytes32 initialDepositProofLeaf;
}
```

**Properties**

| Name                         | Type        | Description                              |
| ---------------------------- | ----------- | ---------------------------------------- |
| `pubkeyProof`                | `bytes32[]` | The proof of the pubkey.                 |
| `withdrawalCredentialsProof` | `bytes32[]` | The proof of the withdrawal credentials. |
| `initialDepositProof`        | `bytes32[]` | The proof of the initial deposit.        |
| `initialDepositProofLeaf`    | `bytes32`   | The leaf of the initial deposit.         |

## View Functions

### getCoreContracts

Returns the core contracts for a given pubkey

```solidity
function getCoreContracts(bytes memory pubkey) external view returns (CoreContracts memory);
```

**Parameters**

| Name     | Type    | Description                 |
| -------- | ------- | --------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator |

### predictStakingPoolContractsAddresses

Predicts the addresses of the staking pool contracts for a given pubkey

```solidity
function predictStakingPoolContractsAddresses(bytes memory pubkey) external view returns (CoreContracts memory);
```

**Parameters**

| Name     | Type    | Description                 |
| -------- | ------- | --------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator |

**Returns**

| Name     | Type            | Description                                 |
| -------- | --------------- | ------------------------------------------- |
| `<none>` | `CoreContracts` | The addresses of the staking pool contracts |

### validatePubkeyProof

Validates the pubkey proof

```solidity
function validatePubkeyProof(
    bytes calldata pubkey,
    bytes32[] calldata pubkeyProof,
    uint64 validatorIndex,
    uint64 timestamp
)
    external
    view;
```

**Parameters**

| Name             | Type        | Description                       |
| ---------------- | ----------- | --------------------------------- |
| `pubkey`         | `bytes`     | The pubkey of the validator       |
| `pubkeyProof`    | `bytes32[]` | The proof of the pubkey           |
| `validatorIndex` | `uint64`    | The index of the validator        |
| `timestamp`      | `uint64`    | The timestamp of the beacon block |

### validateBalanceProof

Validates the balance proof

```solidity
function validateBalanceProof(
    uint64 balance,
    bytes32 balancesLeaf,
    bytes32[] calldata balanceProof,
    uint64 validatorIndex,
    uint64 timestamp
)
    external
    view;
```

**Parameters**

| Name             | Type        | Description                       |
| ---------------- | ----------- | --------------------------------- |
| `balance`        | `uint64`    | The balance of the validator      |
| `balancesLeaf`   | `bytes32`   | The leaf of the balances          |
| `balanceProof`   | `bytes32[]` | The proof of the balance          |
| `validatorIndex` | `uint64`    | The index of the validator        |
| `timestamp`      | `uint64`    | The timestamp of the beacon block |

## Functions

### deployStakingPoolContracts

Deploys all staking pool contracts for a validator and performs the initial deposit to register the validator with the consensus layer.

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

**Parameters**

| Name                     | Type      | Description                                                    |
| ------------------------ | --------- | -------------------------------------------------------------- |
| `pubkey`                 | `bytes`   | The validator's public key (48 bytes)                          |
| `withdrawalCredentials`  | `bytes`   | The withdrawal credentials for the validator                   |
| `signature`              | `bytes`   | The validator's signature for the deposit                      |
| `validatorAdmin`         | `address` | The address that will have admin privileges over the validator |
| `defaultSharesRecipient` | `address` | The address that will receive validator fee shares by default  |

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `address` | SmartOperator contract address       |
| `<none>` | `address` | StakingPool contract address         |
| `<none>` | `address` | StakingRewardsVault contract address |
| `<none>` | `address` | IncentiveCollector contract address  |

**Requirements**

- Must send exactly 10,000 BERA with the transaction
- Validator must not already be registered
- Withdrawal credentials must match the withdrawal vault address

### activateStakingPool

Activates a staking pool by validating proofs and updating the validator's state.

```solidity
function activateStakingPool(
    ValidatorData calldata validatorData,
    ProofData calldata proofData,
    uint64 timestamp
)
    external;
```

**Parameters**

| Name            | Type            | Description                                                    |
| --------------- | --------------- | -------------------------------------------------------------- |
| `validatorData` | `ValidatorData` | The validator data including pubkey and withdrawal credentials |
| `proofData`     | `ProofData`     | The proof data for validation                                  |
| `timestamp`     | `uint64`        | The timestamp of the beacon block                              |

## Events

### StakingPoolContractsDeployed

Emitted when staking pool contracts are deployed for a validator.

```solidity
event StakingPoolContractsDeployed(
    address smartOperator, address stakingPool, address stakingRewardsVault, address incentiveCollector
);
```

**Parameters**

| Name                  | Type      | Description                                              |
| --------------------- | --------- | -------------------------------------------------------- |
| `smartOperator`       | `address` | The address of the deployed SmartOperator contract       |
| `stakingPool`         | `address` | The address of the deployed StakingPool contract         |
| `stakingRewardsVault` | `address` | The address of the deployed StakingRewardsVault contract |
| `incentiveCollector`  | `address` | The address of the deployed IncentiveCollector contract  |

### StakingPoolActivated

Emitted when a staking pool is activated.

```solidity
event StakingPoolActivated(address stakingPool);
```

**Parameters**

| Name          | Type      | Description                               |
| ------------- | --------- | ----------------------------------------- |
| `stakingPool` | `address` | The address of the activated staking pool |

### SmartOperatorBeaconImplUpgraded

Emitted when the SmartOperator beacon implementation is upgraded.

```solidity
event SmartOperatorBeaconImplUpgraded(address newImplementation);
```

**Parameters**

| Name                | Type      | Description                           |
| ------------------- | --------- | ------------------------------------- |
| `newImplementation` | `address` | The address of the new implementation |

### StakingPoolBeaconImplUpgraded

Emitted when the StakingPool beacon implementation is upgraded.

```solidity
event StakingPoolBeaconImplUpgraded(address newImplementation);
```

**Parameters**

| Name                | Type      | Description                           |
| ------------------- | --------- | ------------------------------------- |
| `newImplementation` | `address` | The address of the new implementation |

### StakingRewardsVaultBeaconImplUpgraded

Emitted when the StakingRewardsVault beacon implementation is upgraded.

```solidity
event StakingRewardsVaultBeaconImplUpgraded(address newImplementation);
```

**Parameters**

| Name                | Type      | Description                           |
| ------------------- | --------- | ------------------------------------- |
| `newImplementation` | `address` | The address of the new implementation |

### IncentiveCollectorBeaconImplUpgraded

Emitted when the IncentiveCollector beacon implementation is upgraded.

```solidity
event IncentiveCollectorBeaconImplUpgraded(address newImplementation);
```

**Parameters**

| Name                | Type      | Description                           |
| ------------------- | --------- | ------------------------------------- |
| `newImplementation` | `address` | The address of the new implementation |

## Errors

### OperatorAlreadySet

```solidity
error OperatorAlreadySet();
```

### InvalidOperator

```solidity
error InvalidOperator();
```

### InvalidWithdrawalCredentials

```solidity
error InvalidWithdrawalCredentials();
```

### InvalidAddress

```solidity
error InvalidAddress();
```

### InvalidFirstDepositAmount

```solidity
error InvalidFirstDepositAmount();
```

### InvalidInitialDepositAmount

```solidity
error InvalidInitialDepositAmount();
```

### InvalidTimestamp

```solidity
error InvalidTimestamp();
```
