# AccountingOracle

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.accountingOracle['mainnet-address']">{{config.contracts.pol.accountingOracle['mainnet-address']}}</a><span v-if="config.contracts.pol.accountingOracle.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.accountingOracle.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/AccountingOracle.sol)

**Inherits:**
[IAccountingOracle](/src/interfaces/IAccountingOracle.sol/interface.IAccountingOracle.md), OwnableUpgradeable, UUPSUpgradeable

## State Variables

### _factory

```solidity
IStakingPoolContractsFactory internal _factory;
```

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

|Name|Type|Description|
|----|----|-----------|
|`pubkey`|`bytes`|The pubkey of the validator.|
|`pubkeyProof`|`bytes32[]`|The proof of the pubkey.|
|`balance`|`uint64`|The new balance of the validator in GWei.|
|`balancesLeaf`|`bytes32`|The leaf of the balances.|
|`balanceProof`|`bytes32[]`|The proof of the balance.|
|`validatorIndex`|`uint64`|The index of the validator.|
|`timestamp`|`uint64`|The timestamp of the beacon block.|
