<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BeaconDeposit

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.beaconDeposit.address">{{config.contracts.beaconDeposit.address}}</a><span v-if="config.contracts.beaconDeposit.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.beaconDeposit.abi">ABI JSON</a></span></small>

The contract handling validators deposits. Its events are used by the beacon chain to manage the staking process.

## Functions

### getOperator

Get the operator address for a given pubkey.

_Returns zero address if the pubkey is not registered._

```solidity
function getOperator(bytes calldata pubkey) external view returns (address);
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

**Returns**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `<none>` | `address` | The operator address for the given pubkey. |

### deposit

Submit a deposit message to the Beaconchain.

This will be used to create a new validator or to top up an existing one, increasing stake.

_emits the Deposit event upon successful deposit._

_Reverts if the operator is already set and caller passed non-zero operator._

```solidity
function deposit(
    bytes calldata pubkey,
    bytes calldata credentials,
    bytes calldata signature,
    address operator
)
    external
    payable;
```

**Parameters**

| Name          | Type      | Description                                                                                                                                                            |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pubkey`      | `bytes`   | is the consensus public key of the validator. If subsequent deposit, its ignored.                                                                                      |
| `credentials` | `bytes`   | is the staking credentials of the validator. If this is the first deposit it is validator operator public key, if subsequent deposit it is the depositor's public key. |
| `signature`   | `bytes`   | is the signature used only on the first deposit.                                                                                                                       |
| `operator`    | `address` | is the address of the operator.                                                                                                                                        |

### requestOperatorChange

Request to change the operator of a validator.

_Only the current operator can request a change._

```solidity
function requestOperatorChange(bytes calldata pubkey, address newOperator) external;
```

**Parameters**

| Name          | Type      | Description                  |
| ------------- | --------- | ---------------------------- |
| `pubkey`      | `bytes`   | The pubkey of the validator. |
| `newOperator` | `address` | The new operator address.    |

### cancelOperatorChange

Cancel the operator change of a validator.

_Only the current operator can cancel the change._

```solidity
function cancelOperatorChange(bytes calldata pubkey) external;
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

### acceptOperatorChange

Accept the operator change of a validator.

_Only the new operator can accept the change._

_Reverts if the queue delay has not passed._

```solidity
function acceptOperatorChange(bytes calldata pubkey) external;
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

## Events

### Deposit

_Emitted when a deposit is made, which could mean a new validator or a top up of an existing one._

```solidity
event Deposit(bytes pubkey, bytes credentials, uint64 amount, bytes signature, uint64 index);
```

**Parameters**

| Name          | Type     | Description                                                                        |
| ------------- | -------- | ---------------------------------------------------------------------------------- |
| `pubkey`      | `bytes`  | the public key of the validator who is being deposited for if not a new validator. |
| `credentials` | `bytes`  | the public key of the operator if new validator or the depositor if top up.        |
| `amount`      | `uint64` | the amount of stake being deposited, in Gwei.                                      |
| `signature`   | `bytes`  | the signature of the deposit message, only checked when creating a new validator.  |
| `index`       | `uint64` | the index of the deposit.                                                          |

### OperatorChangeQueued

Emitted when the operator change of a validator is queued.

```solidity
event OperatorChangeQueued(
    bytes indexed pubkey, address queuedOperator, address currentOperator, uint256 queuedTimestamp
);
```

**Parameters**

| Name              | Type      | Description                               |
| ----------------- | --------- | ----------------------------------------- |
| `pubkey`          | `bytes`   | The pubkey of the validator.              |
| `queuedOperator`  | `address` | The new queued operator address.          |
| `currentOperator` | `address` | The current operator address.             |
| `queuedTimestamp` | `uint256` | The timestamp when the change was queued. |

### OperatorChangeCancelled

Emitted when the operator change of a validator is cancelled.

```solidity
event OperatorChangeCancelled(bytes indexed pubkey);
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

### OperatorUpdated

Emitted when the operator of a validator is updated.

```solidity
event OperatorUpdated(bytes indexed pubkey, address newOperator, address previousOperator);
```

**Parameters**

| Name               | Type      | Description                    |
| ------------------ | --------- | ------------------------------ |
| `pubkey`           | `bytes`   | The pubkey of the validator.   |
| `newOperator`      | `address` | The new operator address.      |
| `previousOperator` | `address` | The previous operator address. |
