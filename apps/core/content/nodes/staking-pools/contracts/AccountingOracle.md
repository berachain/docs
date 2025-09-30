<script setup>
  import config from '@berachain/config/constants.json';
</script>

# AccountingOracle

<template v-if="config.contracts.stakingPools.accountingOracle['mainnet-address']">
> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.stakingPools.accountingOracle['mainnet-address']">{{config.contracts.stakingPools.accountingOracle['mainnet-address']}}</a><span v-if="config.contracts.stakingPools.accountingOracle.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.stakingPools.accountingOracle.abi">ABI JSON</a></span></small>
</template>

**Inherits:**
IAccountingOracle, OwnableUpgradeable, UUPSUpgradeable

## State Variables

## Functions

### updateTotalDeposits

Updates the total deposits of a staking pool.

```solidity
function updateTotalDeposits(
    bytes memory pubkey,
    bytes32[] calldata pubkeyProof,
    uint64 balance,
    bytes32 balancesLeaf,
    bytes32[] calldata balanceProof,
    uint64 validatorIndex,
    uint64 timestamp
)
    external;
```

**Parameters**

| Name             | Type        | Description                               |
| ---------------- | ----------- | ----------------------------------------- |
| `pubkey`         | `bytes`     | The pubkey of the validator.              |
| `pubkeyProof`    | `bytes32[]` | The proof of the pubkey.                  |
| `balance`        | `uint64`    | The new balance of the validator in GWei. |
| `balancesLeaf`   | `bytes32`   | The leaf of the balances.                 |
| `balanceProof`   | `bytes32[]` | The proof of the balance.                 |
| `validatorIndex` | `uint64`    | The index of the validator.               |
| `timestamp`      | `uint64`    | The timestamp of the beacon block.        |
