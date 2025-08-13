---
head:
  - - meta
    - property: og:title
      content: Multicall3 Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Multicall3 contract
  - - meta
    - property: og:description
      content: Developer reference for the Multicall3 contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Multicall3

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.other.multicall3['mainnet-address']">{{config.contracts.other.multicall3['mainnet-address']}}</a><span v-if="config.contracts.other.multicall3.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.other.multicall3.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/base/Multicall3.sol)

Multicall3 enables batching multiple function calls into a single transaction, reducing gas costs and improving efficiency.

## Structs

### Call

Basic call struct.

```solidity
struct Call {
    address target;
    bytes callData;
}
```

### Call3

Call struct with allowFailure flag.

```solidity
struct Call3 {
    address target;
    bool allowFailure;
    bytes callData;
}
```

### Call3Value

Call struct with value and allowFailure flag.

```solidity
struct Call3Value {
    address target;
    bool allowFailure;
    uint256 value;
    bytes callData;
}
```

### Result

Result struct for call returns.

```solidity
struct Result {
    bool success;
    bytes returnData;
}
```

## View Functions

### getBasefee

Returns the current base fee.

```solidity
function getBasefee() external view returns (uint256 basefee)
```

### getBlockHash

Returns the hash of a specific block.

```solidity
function getBlockHash(uint256 blockNumber) external view returns (bytes32 blockHash)
```

### getBlockNumber

Returns the current block number.

```solidity
function getBlockNumber() external view returns (uint256 blockNumber)
```

### getChainId

Returns the current chain ID.

```solidity
function getChainId() external view returns (uint256 chainid)
```

### getCurrentBlockCoinbase

Returns the current block coinbase.

```solidity
function getCurrentBlockCoinbase() external view returns (address coinbase)
```

### getCurrentBlockDifficulty

Returns the current block difficulty.

```solidity
function getCurrentBlockDifficulty() external view returns (uint256 difficulty)
```

### getCurrentBlockGasLimit

Returns the current block gas limit.

```solidity
function getCurrentBlockGasLimit() external view returns (uint256 gaslimit)
```

### getCurrentBlockTimestamp

Returns the current block timestamp.

```solidity
function getCurrentBlockTimestamp() external view returns (uint256 timestamp)
```

### getEthBalance

Returns the ETH balance of an address.

```solidity
function getEthBalance(address addr) external view returns (uint256 balance)
```

### getLastBlockHash

Returns the last block hash.

```solidity
function getLastBlockHash() external view returns (bytes32 blockhash)
```

## Functions

### aggregate

Aggregate multiple calls in a single transaction.

```solidity
function aggregate(Call[] calldata calls) external payable returns (uint256 blockNumber, bytes[] memory returnData)
```

### aggregate3

Aggregate multiple calls with optional failure handling.

```solidity
function aggregate3(Call3[] calldata calls) external payable returns (Result[] memory returnData)
```

### aggregate3Value

Aggregate multiple calls with value and optional failure handling.

```solidity
function aggregate3Value(Call3Value[] calldata calls) external payable returns (Result[] memory returnData)
```

### blockAndAggregate

Aggregate calls and return block information.

```solidity
function blockAndAggregate(Call[] calldata calls) external payable returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData)
```

### tryAggregate

Try to aggregate calls with failure tolerance.

```solidity
function tryAggregate(bool requireSuccess, Call[] calldata calls) external payable returns (Result[] memory returnData)
```

### tryBlockAndAggregate

Try to aggregate calls with block information and failure tolerance.

```solidity
function tryBlockAndAggregate(bool requireSuccess, Call[] calldata calls) external payable returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData)
```
