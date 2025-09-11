<script setup>
  import config from '@berachain/config/constants.json';
</script>

# StakingPoolContractsFactory

The StakingPoolContractsFactory is the central deployment and management hub for all staking pool contracts. It handles the creation of new staking pools and ensures all contracts are properly configured and linked.

## State Variables

### BEACON_DEPOSIT

```solidity
IBeaconDeposit public constant BEACON_DEPOSIT = IBeaconDeposit(0x4242424242424242424242424242424242424242);
```

Reference to the BeaconDepositContract on Berachain.

### FIRST_DEPOSIT_AMOUNT_WEI

```solidity
uint256 public constant FIRST_DEPOSIT_AMOUNT_WEI = 10_000 ether;
```

The amount of BERA required for the initial deposit when deploying a staking pool.

### INITIAL_PAYOUT_AMOUNT

```solidity
uint256 public constant INITIAL_PAYOUT_AMOUNT = 100 ether;
```

The initial payout amount for the incentive collector.

### MAX_TIMESTAMP_AGE

```solidity
uint64 public constant MAX_TIMESTAMP_AGE = 10 minutes;
```

Maximum age for proof timestamps to be considered valid.

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

### predictStakingPoolContractsAddresses

```solidity
function predictStakingPoolContractsAddresses(bytes memory pubkey) external view returns (CoreContracts memory);
```

Predicts the addresses of contracts that will be deployed for a given validator public key.

### activateStakingPool

```solidity
function activateStakingPool(
    ValidatorData calldata validatorData,
    ProofData calldata proofData,
    uint64 timestamp
) external;
```

Activates a staking pool after verifying all necessary proofs.

### getCoreContracts

```solidity
function getCoreContracts(bytes memory pubkey) external view returns (CoreContracts memory);
```

Returns the deployed core contracts for a given validator public key.

## Events

### StakingPoolContractsDeployed

```solidity
event StakingPoolContractsDeployed(
    address smartOperator,
    address stakingPool,
    address stakingRewardsVault,
    address incentiveCollector
);
```

Emitted when staking pool contracts are successfully deployed.

### StakingPoolActivated

```solidity
event StakingPoolActivated(address stakingPool);
```

Emitted when a staking pool is successfully activated.

## Errors

### OperatorAlreadySet

```solidity
error OperatorAlreadySet();
```

Thrown when attempting to deploy contracts for a validator that already has an operator set.

### InvalidWithdrawalCredentials

```solidity
error InvalidWithdrawalCredentials();
```

Thrown when withdrawal credentials don't match the expected format.

### InvalidFirstDepositAmount

```solidity
error InvalidFirstDepositAmount();
```

Thrown when the deposit amount doesn't match the required first deposit amount.

### InvalidTimestamp

```solidity
error InvalidTimestamp();
```

Thrown when the proof timestamp is too old or in the future.
