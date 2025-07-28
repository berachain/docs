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

The Timelock contract enforces a delay on the execution of governance proposals, providing time for the community to review changes before they take effect.

**Inherits:**
AccessControl, IERC721Receiver, IERC1155Receiver

*This contract is a standard OpenZeppelin TimelockController that works with the governance system.*

## Constants

### CANCELLER_ROLE

```solidity
bytes32 public constant CANCELLER_ROLE = keccak256("CANCELLER_ROLE");
```

### EXECUTOR_ROLE

```solidity
bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");
```

### PROPOSER_ROLE

```solidity
bytes32 public constant PROPOSER_ROLE = keccak256("PROPOSER_ROLE");
```

### TIMELOCK_ADMIN_ROLE

```solidity
bytes32 public constant TIMELOCK_ADMIN_ROLE = keccak256("TIMELOCK_ADMIN_ROLE");
```

## State Variables

### minDelay
The minimum delay before a proposal can be executed.

```solidity
uint256 public minDelay;
```

## View Functions

### getMinDelay

Returns the minimum delay for operations.

```solidity
function getMinDelay() external view returns (uint256 duration);
```

### getRoleAdmin

```solidity
function getRoleAdmin(bytes32 role) public view virtual override returns (bytes32);
```

### hasRole

```solidity
function hasRole(bytes32 role, address account) public view virtual override returns (bool);
```

### hashOperation

Returns the hash of an operation.

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

Returns the hash of a batch operation.

```solidity
function hashOperationBatch(
    address[] calldata targets,
    uint256[] calldata values,
    bytes[] calldata payloads,
    bytes32 predecessor,
    bytes32 salt
) public pure virtual returns (bytes32 hash);
```

### isOperation

Returns true if the operation is pending.

```solidity
function isOperation(bytes32 id) public view virtual returns (bool registered);
```

### isOperationDone

Returns true if the operation is done.

```solidity
function isOperationDone(bytes32 id) public view virtual returns (bool done);
```

### isOperationPending

Returns true if the operation is pending.

```solidity
function isOperationPending(bytes32 id) public view virtual returns (bool pending);
```

### isOperationReady

Returns true if the operation is ready for execution.

```solidity
function isOperationReady(bytes32 id) public view virtual returns (bool ready);
```

## Functions

### cancel

Cancels an operation.

**Emits:**
- [Cancelled](#event-cancelled)

```solidity
function cancel(bytes32 id) external virtual;
```

### execute

Executes an operation.

**Emits:**
- [CallExecuted](#event-callexecuted)

```solidity
function execute(
    address target,
    uint256 value,
    bytes calldata data,
    bytes32 predecessor,
    bytes32 salt
) external payable virtual;
```

### executeBatch

Executes a batch of operations.

**Emits:**
- [CallExecuted](#event-callexecuted)

```solidity
function executeBatch(
    address[] calldata targets,
    uint256[] calldata values,
    bytes[] calldata payloads,
    bytes32 predecessor,
    bytes32 salt
) external payable virtual;
```

### onERC1155Received

```solidity
function onERC1155Received(address, address, uint256, uint256, bytes memory)
    public
    virtual
    override
    returns (bytes4);
```

### schedule

Schedules an operation.

**Emits:**
- [CallScheduled](#event-callscheduled)

```solidity
function schedule(
    address target,
    uint256 value,
    bytes calldata data,
    bytes32 predecessor,
    bytes32 salt,
    uint256 delay
) external virtual;
```

### scheduleBatch

Schedules a batch of operations.

**Emits:**
- [CallScheduled](#event-callscheduled)

```solidity
function scheduleBatch(
    address[] calldata targets,
    uint256[] calldata values,
    bytes[] calldata payloads,
    bytes32 predecessor,
    bytes32 salt,
    uint256 delay
) external virtual;
```

### updateDelay

Updates the minimum delay.

**Emits:**
- [MinDelayChange](#event-mindelaychange)

```solidity
function updateDelay(uint256 newDelay) external virtual;
```

## Events

### CallExecuted {#event-callexecuted}
Emitted when a call is executed.

```solidity
event CallExecuted(bytes32 indexed id, uint256 indexed index, address target, uint256 value, bytes data);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id`|`bytes32`|The operation ID|
|`index`|`uint256`|The call index|
|`target`|`address`|The target address|
|`value`|`uint256`|The value sent|
|`data`|`bytes`|The call data|

### CallScheduled {#event-callscheduled}
Emitted when a call is scheduled.

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

|Name|Type|Description|
|----|----|-----------|
|`id`|`bytes32`|The operation ID|
|`index`|`uint256`|The call index|
|`target`|`address`|The target address|
|`value`|`uint256`|The value to send|
|`data`|`bytes`|The call data|
|`predecessor`|`bytes32`|The predecessor operation|
|`delay`|`uint256`|The delay before execution|

### Cancelled {#event-cancelled}
Emitted when an operation is cancelled.

```solidity
event Cancelled(bytes32 indexed id);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`id`|`bytes32`|The cancelled operation ID|

### MinDelayChange {#event-mindelaychange}
Emitted when the minimum delay is changed.

```solidity
event MinDelayChange(uint256 oldDuration, uint256 newDuration);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oldDuration`|`uint256`|The previous minimum delay|
|`newDuration`|`uint256`|The new minimum delay|

### RoleAdminChanged {#event-roleadminchanged}
Emitted when a role's admin is changed.

```solidity
event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`role`|`bytes32`|The role that was changed|
|`previousAdminRole`|`bytes32`|The previous admin role|
|`newAdminRole`|`bytes32`|The new admin role|

### RoleGranted {#event-rolegranted}
Emitted when a role is granted.

```solidity
event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`role`|`bytes32`|The role that was granted|
|`account`|`address`|The account that received the role|
|`sender`|`address`|The account that granted the role|

### RoleRevoked {#event-rolerevoked}
Emitted when a role is revoked.

```solidity
event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`role`|`bytes32`|The role that was revoked|
|`account`|`address`|The account that lost the role|
|`sender`|`address`|The account that revoked the role|
