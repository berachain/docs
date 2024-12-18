<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Multicall3

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.multicall3.address">{{config.contracts.multicall3.address}}</a><span v-if="config.contracts.honey.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.multicall3.abi">ABI JSON</a></span></small>

The Multicall3 contract is a Solidity contract implemented by the MakerDAO team. Its primary purpose is to aggregate results from multiple function calls in a single transaction, which can help reduce gas costs and improve efficiency when interacting with multiple contracts or making multiple calls to the same contracts.

The contract is backwards-compatible with [Multicall](https://github.com/makerdao/multicall/blob/master/src/Multicall.sol) and [Multicall2](https://github.com/makerdao/multicall/blob/master/src/Multicall2.sol) contracts, and it provides several functions for aggregating calls, such as `aggregate`, `tryAggregate`, `blockAndAggregate`, `aggregate3`, and `aggregate3Value`. These functions accept arrays of `Call`, `Call3`, or `Call3Value` structs, which contain the target contract address, call data, and other optional parameters like whether to allow failures and the value to be sent with the call.

The contract also provides utility functions to retrieve information about the current block, such as block number, block hash, block coinbase, block difficulty, block gas limit, block timestamp, and the balance of a given address.

Use of Multicall3 is particularly useful when working with decentralized applications that require multiple contract interactions or when batching multiple calls to save on gas costs.

Aggregate results from multiple function calls

_Multicall & Multicall2 backwards-compatible_

_Aggregate methods are marked `payable` to save 24 gas per call_

## Functions

### aggregate

Backwards-compatible call aggregation with Multicall

```solidity
function aggregate(Call[] calldata calls) public payable returns (uint256 blockNumber, bytes[] memory returnData);
```

**Parameters**

| Name    | Type     | Description              |
| ------- | -------- | ------------------------ |
| `calls` | `Call[]` | An array of Call structs |

**Returns**

| Name          | Type      | Description                                    |
| ------------- | --------- | ---------------------------------------------- |
| `blockNumber` | `uint256` | The block number where the calls were executed |
| `returnData`  | `bytes[]` | An array of bytes containing the responses     |

### tryAggregate

Backwards-compatible with Multicall2

Aggregate calls without requiring success

```solidity
function tryAggregate(bool requireSuccess, Call[] calldata calls) public payable returns (Result[] memory returnData);
```

**Parameters**

| Name             | Type     | Description                           |
| ---------------- | -------- | ------------------------------------- |
| `requireSuccess` | `bool`   | If true, require all calls to succeed |
| `calls`          | `Call[]` | An array of Call structs              |

**Returns**

| Name         | Type       | Description                |
| ------------ | ---------- | -------------------------- |
| `returnData` | `Result[]` | An array of Result structs |

### tryBlockAndAggregate

Backwards-compatible with Multicall2

Aggregate calls and allow failures using tryAggregate

```solidity
function tryBlockAndAggregate(bool requireSuccess, Call[] calldata calls)
    public
    payable
    returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData);
```

**Parameters**

| Name             | Type     | Description              |
| ---------------- | -------- | ------------------------ |
| `requireSuccess` | `bool`   |                          |
| `calls`          | `Call[]` | An array of Call structs |

**Returns**

| Name          | Type       | Description                                         |
| ------------- | ---------- | --------------------------------------------------- |
| `blockNumber` | `uint256`  | The block number where the calls were executed      |
| `blockHash`   | `bytes32`  | The hash of the block where the calls were executed |
| `returnData`  | `Result[]` | An array of Result structs                          |

### blockAndAggregate

Backwards-compatible with Multicall2

Aggregate calls and allow failures using tryAggregate

```solidity
function blockAndAggregate(Call[] calldata calls)
    public
    payable
    returns (uint256 blockNumber, bytes32 blockHash, Result[] memory returnData);
```

**Parameters**

| Name    | Type     | Description              |
| ------- | -------- | ------------------------ |
| `calls` | `Call[]` | An array of Call structs |

**Returns**

| Name          | Type       | Description                                         |
| ------------- | ---------- | --------------------------------------------------- |
| `blockNumber` | `uint256`  | The block number where the calls were executed      |
| `blockHash`   | `bytes32`  | The hash of the block where the calls were executed |
| `returnData`  | `Result[]` | An array of Result structs                          |

### aggregate3

Aggregate calls, ensuring each returns success if required

```solidity
function aggregate3(Call3[] calldata calls) public payable returns (Result[] memory returnData);
```

**Parameters**

| Name    | Type      | Description               |
| ------- | --------- | ------------------------- |
| `calls` | `Call3[]` | An array of Call3 structs |

**Returns**

| Name         | Type       | Description                |
| ------------ | ---------- | -------------------------- |
| `returnData` | `Result[]` | An array of Result structs |

### aggregate3Value

Aggregate calls with a msg value

Reverts if msg.value is less than the sum of the call values

```solidity
function aggregate3Value(Call3Value[] calldata calls) public payable returns (Result[] memory returnData);
```

**Parameters**

| Name    | Type           | Description                    |
| ------- | -------------- | ------------------------------ |
| `calls` | `Call3Value[]` | An array of Call3Value structs |

**Returns**

| Name         | Type       | Description                |
| ------------ | ---------- | -------------------------- |
| `returnData` | `Result[]` | An array of Result structs |

### getBlockHash

Returns the block hash for the given block number

```solidity
function getBlockHash(uint256 blockNumber) public view returns (bytes32 blockHash);
```

**Parameters**

| Name          | Type      | Description      |
| ------------- | --------- | ---------------- |
| `blockNumber` | `uint256` | The block number |

### getBlockNumber

Returns the block number

```solidity
function getBlockNumber() public view returns (uint256 blockNumber);
```

### getCurrentBlockCoinbase

Returns the block coinbase

```solidity
function getCurrentBlockCoinbase() public view returns (address coinbase);
```

### getCurrentBlockDifficulty

Returns the block difficulty

```solidity
function getCurrentBlockDifficulty() public view returns (uint256 difficulty);
```

### getCurrentBlockGasLimit

Returns the block gas limit

```solidity
function getCurrentBlockGasLimit() public view returns (uint256 gaslimit);
```

### getCurrentBlockTimestamp

Returns the block timestamp

```solidity
function getCurrentBlockTimestamp() public view returns (uint256 timestamp);
```

### getEthBalance

Returns the (ETH) balance of a given address

```solidity
function getEthBalance(address addr) public view returns (uint256 balance);
```

### getLastBlockHash

Returns the block hash of the last block

```solidity
function getLastBlockHash() public view returns (bytes32 blockHash);
```

### getBasefee

Gets the base fee of the given block

Can revert if the BASEFEE opcode is not implemented by the given chain

```solidity
function getBasefee() public view returns (uint256 basefee);
```

### getChainId

Returns the chain id

```solidity
function getChainId() public view returns (uint256 chainid);
```

## Structs

### Call

```solidity
struct Call {
    address target;
    bytes callData;
}
```

### Call3

```solidity
struct Call3 {
    address target;
    bool allowFailure;
    bytes callData;
}
```

### Call3Value

```solidity
struct Call3Value {
    address target;
    bool allowFailure;
    uint256 value;
    bytes callData;
}
```

### Result

```solidity
struct Result {
    bool success;
    bytes returnData;
}
```
