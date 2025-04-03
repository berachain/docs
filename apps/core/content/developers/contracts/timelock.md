<script setup>
  import config from '@berachain/config/constants.json';
</script>

# TimeLock

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.feeCollector.address">{{config.mainnet.contracts.feeCollector.address}}</a><span v-if="config.mainnet.contracts.feeCollector.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.mainnet.contracts.feeCollector.abi">ABI JSON</a></span></small>

The TimeLock contract is in charge of introducing a delay between a proposal and its execution.

This contract is from [OpenZeppelin Governance](https://docs.openzeppelin.com/contracts/4.x/api/governance).

## State Variables

### PROPOSER_ROLE

```solidity
bytes32 public constant PROPOSER_ROLE = keccak256("PROPOSER_ROLE");
```

### EXECUTOR_ROLE

```solidity
bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");
```

### CANCELLER_ROLE

```solidity
bytes32 public constant CANCELLER_ROLE = keccak256("CANCELLER_ROLE");
```

## Functions

### getMinDelay

Returns the minimum delay in seconds for an operation to become valid.
This value can be changed by executing an operation that calls `updateDelay`.

```solidity
function getMinDelay() public view virtual returns (uint256);
```

### getOperationState

Returns operation state.

```solidity
function getOperationState(bytes32 id) public view virtual returns (OperationState)
```

**Parameters**

| Name | Type      | Description      |
| ---- | --------- | ---------------- |
| `id` | `bytes32` | The operationId. |

### getTimestamp

Returns the timestamp at which an operation becomes ready (0 for unset operations, 1 for done operations).

```solidity
function getTimestamp(bytes32 id) public view virtual returns (uint256);
```

**Parameters**

| Name | Type      | Description      |
| ---- | --------- | ---------------- |
| `id` | `bytes32` | The operationId. |

### isOperation

Returns whether an id corresponds to a registered operation. This includes both Waiting, Ready, and Done operations.

```solidity
function isOperation(bytes32 id) public view returns (bool);
```

**Parameters**

| Name | Type      | Description      |
| ---- | --------- | ---------------- |
| `id` | `bytes32` | The operationId. |

### isOperationPending

Returns whether an operation is pending or not. Note that a "pending" operation may also be "ready".

```solidity
function isOperationPending(bytes32 id) public view returns (bool);
```

**Parameters**

| Name | Type      | Description      |
| ---- | --------- | ---------------- |
| `id` | `bytes32` | The operationId. |

### isOperationReady

Returns whether an operation is ready for execution. Note that a "ready" operation is also "pending".

```solidity
function isOperationReady(bytes32 id) public view returns (bool);
```

**Parameters**

| Name | Type      | Description      |
| ---- | --------- | ---------------- |
| `id` | `bytes32` | The operationId. |

### isOperationDone

Returns whether an operation is done or not.

```solidity
function isOperationDone(bytes32 id) public view returns (bool);
```

**Parameters**

| Name | Type      | Description      |
| ---- | --------- | ---------------- |
| `id` | `bytes32` | The operationId. |

## Events

### TimelockInvalidOperationLength

Mismatch between the parameters length for an operation call.

```solidity
error TimelockInvalidOperationLength(uint256 targets, uint256 payloads, uint256 values);
```

**Parameters**

| Name       | Type      | Description         |
| ---------- | --------- | ------------------- |
| `targets`  | `uint256` | Number of targets.  |
| `payloads` | `uint256` | Number of payloads. |
| `values`   | `uint256` | Number of values.   |

### TimelockInsufficientDelay

The schedule operation doesn't meet the minimum delay.

```solidity
error TimelockInsufficientDelay(uint256 delay, uint256 minDelay);
```

**Parameters**

| Name       | Type      | Description     |
| ---------- | --------- | --------------- |
| `delay`    | `uint256` | Provided delay. |
| `minDelay` | `uint256` | Minimum delay.  |

### TimelockUnexpectedOperationState

The current state of an operation is not as required.
The `expectedStates` is a bitmap with the bits enabled for each OperationState enum position
counting from right to left.
See {\_encodeStateBitmap}.

```solidity
error TimelockUnexpectedOperationState(bytes32 operationId, bytes32 expectedStates);
```

**Parameters**

| Name             | Type      | Description               |
| ---------------- | --------- | ------------------------- |
| `operationId`    | `bytes32` | The operation identifier. |
| `expectedStates` | `bytes32` | Bitmap of OperationState. |

### TimelockUnexecutedPredecessor

The predecessor to an operation not yet done.

```solidity
error TimelockUnexecutedPredecessor(bytes32 predecessorId);
```

**Parameters**

| Name            | Type      | Description                     |
| --------------- | --------- | ------------------------------- |
| `predecessorId` | `bytes32` | Previous operation operationId. |

### TimelockUnauthorizedCaller

The caller account is not authorized.

```solidity
error TimelockUnauthorizedCaller(address caller);
```

**Parameters**

| Name     | Type      | Description     |
| -------- | --------- | --------------- |
| `caller` | `address` | Caller address. |

### CallScheduled

Emitted when a call is scheduled as part of operation `id`.

```solidity
event CallScheduled(
    bytes32 indexed id,
    uint256 indexed index,
    address target,
    uint256 value,
    bytes data,
    bytes32 predecessor,
    uint256 delay
);
```

**Parameters**

| Name          | Type      | Description                     |
| ------------- | --------- | ------------------------------- |
| `id`          | `bytes32` | Call associated id.             |
| `index`       | `uint256` | Call index.                     |
| `target`      | `address` | Target address.                 |
| `value`       | `uint256` | Amount of BERA sent with call.  |
| `data`        | `bytes`   | Data sent with call.            |
| `predecessor` | `bytes32` | Previous operation operationId. |
| `delay`       | `uint256` | Execution delay.                |

### CallExecuted

Emitted when a call is performed as part of operation `id`.

```solidity
event CallExecuted(bytes32 indexed id, uint256 indexed index, address target, uint256 value, bytes data);
```

**Parameters**

| Name     | Type      | Description                    |
| -------- | --------- | ------------------------------ |
| `id`     | `bytes32` | Call associated id.            |
| `index`  | `uint256` | Call index.                    |
| `target` | `address` | Target address.                |
| `value`  | `uint256` | Amount of BERA sent with call. |
| `data`   | `bytes`   | Data sent with call.           |

### CallSalt

Emitted when new proposal is scheduled with non-zero salt.

```solidity
event CallSalt(bytes32 indexed id, bytes32 salt);
```

**Parameters**

| Name   | Type      | Description           |
| ------ | --------- | --------------------- |
| `id`   | `bytes32` | Call associated id.   |
| `salt` | `bytes32` | Call associated salt. |

### Cancelled

Emitted when operation `id` is cancelled.

```solidity
event Cancelled(bytes32 indexed id);
```

**Parameters**

| Name | Type      | Description         |
| ---- | --------- | ------------------- |
| `id` | `bytes32` | Call associated id. |

### MinDelayChange

Emitted when the minimum delay for future operations is modified.

```solidity
event MinDelayChange(uint256 oldDuration, uint256 newDuration);
```

**Parameters**

| Name          | Type      | Description         |
| ------------- | --------- | ------------------- |
| `oldDuration` | `uint256` | Old delay duration. |
| `newDuration` | `uint256` | New delay duration. |
