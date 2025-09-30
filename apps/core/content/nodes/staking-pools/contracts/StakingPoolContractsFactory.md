# StakingPoolContractsFactory

<script setup>
  import config from '@berachain/config/constants.json';
</script>

<template v-if="config.contracts.stakingPools.stakingPoolContractsFactory['mainnet-address']">
> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPools.stakingPoolContractsFactory['mainnet-address']">{{config.contracts.stakingPools.stakingPoolContractsFactory['mainnet-address']}}</a><span v-if="config.contracts.stakingPools.stakingPoolContractsFactory.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPools.stakingPoolContractsFactory.abi">ABI JSON</a></span></small>
</template>

**Inherits:**
IStakingPoolContractsFactory, BeaconRootsHelper, OwnableUpgradeable, UUPSUpgradeable

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

## Functions

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
