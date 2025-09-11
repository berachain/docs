<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Deployer

The Deployer contract provides utilities for deploying staking pool contracts and managing the deployment process.

## Functions

### deployStakingPoolContracts

```solidity
function deployStakingPoolContracts(
    bytes memory pubkey,
    bytes memory withdrawalCredentials,
    bytes memory signature,
    address validatorAdmin,
    address defaultSharesRecipient
) external payable returns (address, address, address, address);
```

Deploys all necessary contracts for a new staking pool.

**Parameters:**
- `pubkey`: The validator's 48-byte public key
- `withdrawalCredentials`: Withdrawal credentials (0x01 + withdrawal vault address)
- `signature`: Deposit signature from beacon client
- `validatorAdmin`: Address with admin privileges over the pool
- `defaultSharesRecipient`: Address to receive initial shares

**Returns:**
- `address`: SmartOperator contract address
- `address`: StakingPool contract address
- `address`: StakingRewardsVault contract address
- `address`: IncentiveCollector contract address

### predictAddresses

```solidity
function predictAddresses(bytes memory pubkey) external view returns (
    address smartOperator,
    address stakingPool,
    address stakingRewardsVault,
    address incentiveCollector
);
```

Predicts the addresses of contracts that will be deployed for a given validator public key.

**Parameters:**
- `pubkey`: The validator's public key

**Returns:**
- `smartOperator`: Predicted SmartOperator address
- `stakingPool`: Predicted StakingPool address
- `stakingRewardsVault`: Predicted StakingRewardsVault address
- `incentiveCollector`: Predicted IncentiveCollector address

### getDeployedContracts

```solidity
function getDeployedContracts(bytes memory pubkey) external view returns (
    address smartOperator,
    address stakingPool,
    address stakingRewardsVault,
    address incentiveCollector
);
```

Returns the deployed contract addresses for a given validator public key.

**Parameters:**
- `pubkey`: The validator's public key

**Returns:**
- `smartOperator`: Deployed SmartOperator address
- `stakingPool`: Deployed StakingPool address
- `stakingRewardsVault`: Deployed StakingRewardsVault address
- `incentiveCollector`: Deployed IncentiveCollector address

## Events

### ContractsDeployed

```solidity
event ContractsDeployed(
    bytes indexed pubkey,
    address smartOperator,
    address stakingPool,
    address stakingRewardsVault,
    address incentiveCollector
);
```

Emitted when contracts are successfully deployed for a validator.

## Errors

### AlreadyDeployed

```solidity
error AlreadyDeployed();
```

Thrown when attempting to deploy contracts for a validator that already has contracts deployed.

### InvalidParameters

```solidity
error InvalidParameters();
```

Thrown when invalid parameters are provided.

### DeploymentFailed

```solidity
error DeploymentFailed();
```

Thrown when contract deployment fails.
