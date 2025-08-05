---
head:
  - - meta
    - property: og:title
      content: Timelock Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Timelock contract
  - - meta
    - property: og:description
      content: Developer reference for the Timelock contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Timelock

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.timelock['mainnet-address']">{{config.contracts.pol.timelock['mainnet-address']}}</a><span v-if="config.contracts.pol.timelock.abi && config.contracts.pol.timelock.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.timelock.abi">ABI JSON</a></span></small>

The Timelock contract introduces a mandatory delay between proposal scheduling and execution in the governance system. It ensures that all governance actions are publicly visible for a minimum time before they can take effect.

**Inherits:**
AccessControl, IERC721Receiver, IERC1155Receiver

## State Variables

### minDelay

The minimum delay required between scheduling and executing an operation.

```solidity
uint256 public minDelay;
```

## View Functions

### isOperation

Returns whether an operation has been scheduled.

```solidity
function isOperation(bytes32 id) public view virtual returns (bool registered);
```

### isOperationPending

Returns whether an operation is pending (scheduled but not yet executed or cancelled).

```solidity
function isOperationPending(bytes32 id) public view virtual returns (bool pending);
```

### isOperationReady

Returns whether an operation is ready for execution (delay has passed).

```solidity
function isOperationReady(bytes32 id) public view virtual returns (bool ready);
```

### isOperationDone

Returns whether an operation has been executed.

```solidity
function isOperationDone(bytes32 id) public view virtual returns (bool done);
```

### getMinDelay

Returns the minimum delay required for operations.

```solidity
function getMinDelay() external view returns (uint256 duration);
```

### hashOperation

Computes the operation hash for a single operation. Useful for tracking operation status.

```solidity
function hashOperation(
    address target,
    uint256 value,
    bytes calldata data,
    bytes32 predecessor,
    bytes32 salt
) public pure virtual returns (bytes32 hash);
```

### hashOperationBatch

Computes the operation hash for a batch operation. Useful for tracking operation status.

```solidity
function hashOperationBatch(
    address[] calldata targets,
    uint256[] calldata values,
    bytes[] calldata payloads,
    bytes32 predecessor,
    bytes32 salt
) public pure virtual returns (bytes32 hash);
```

## Events

### CallScheduled {#event-callscheduled}

Emitted when an operation is scheduled.

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

### CallExecuted {#event-callexecuted}

Emitted when an operation is executed.

```solidity
event CallExecuted(
    bytes32 indexed id,
    uint256 indexed index,
    address target,
    uint256 value,
    bytes data
);
```

### Cancelled {#event-cancelled}

Emitted when an operation is cancelled.

```solidity
event Cancelled(bytes32 indexed id);
```

### MinDelayChange {#event-mindelaychange}

Emitted when the minimum delay is changed.

```solidity
event MinDelayChange(uint256 oldDuration, uint256 newDuration);
```
