---
head:
  - - meta
    - property: og:title
      content: BeaconDeposit Contract Reference
  - - meta
    - name: description
      content: Developer reference for the BeaconDeposit contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the BeaconDeposit contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BeaconDeposit

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.beaconDeposit['mainnet-address']">{{config.contracts.pol.beaconDeposit['mainnet-address']}}</a><span v-if="config.contracts.pol.beaconDeposit.abi && config.contracts.pol.beaconDeposit.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.beaconDeposit.abi">ABI JSON</a></span></small>

The contract handling validators deposits. Its events are used by the beacon chain to manage the staking process.

**Inherits:**
[IBeaconDeposit](/src/pol/interfaces/IBeaconDeposit.sol/interface.IBeaconDeposit.md), [ERC165](/src/pol/interfaces/IERC165.sol/interface.ERC165.md)

## Constants

### CREDENTIALS_LENGTH

The length of the credentials, 1 byte prefix + 11 bytes padding + 20 bytes address = 32 bytes.

```solidity
uint8 public constant CREDENTIALS_LENGTH = 32;
```

### MIN_DEPOSIT_AMOUNT_IN_GWEI

The minimum amount of `BERA` to deposit i.e 10_000 ether.

```solidity
uint64 public constant MIN_DEPOSIT_AMOUNT_IN_GWEI = 10_000 gwei;
```

### PUBLIC_KEY_LENGTH

The length of the public key, PUBLIC_KEY_LENGTH bytes.

```solidity
uint8 public constant PUBLIC_KEY_LENGTH = 48;
```

### SIGNATURE_LENGTH

The length of the signature, SIGNATURE_LENGTH bytes.

```solidity
uint8 public constant SIGNATURE_LENGTH = 96;
```

## Structs

### QueuedOperator

QueuedOperator is a struct that represents an operator address change request.

```solidity
struct QueuedOperator {
    uint96 queuedTimestamp;
    address newOperator;
}
```

**Properties**

| Name              | Type      | Description                                       |
| ----------------- | --------- | ------------------------------------------------- |
| `queuedTimestamp` | `uint96`  | The timestamp when the operator change was queued |
| `newOperator`     | `address` | The new operator address                          |

## State Variables

### depositCount

The number of deposits that have been made to the contract.

```solidity
uint64 public depositCount;
```

### genesisDepositsRoot

The hash tree root of the genesis deposits.

_Should be set in deployment (predeploy state or constructor)._

```solidity
bytes32 public genesisDepositsRoot;
```

### queuedOperator

The mapping of public keys to operator change requests.

```solidity
mapping(bytes => QueuedOperator) public queuedOperator;
```

## View Functions

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

## Functions

### acceptOperatorChange

Accept the operator change of a validator.

_Only the new operator can accept the change._

**Emits:**

- [OperatorAcceptChange](#event-operatoracceptchange)

```solidity
function acceptOperatorChange(bytes calldata pubkey) external;
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

### cancelOperatorChange

Cancel the operator change of a validator.

_Only the current operator can cancel the change._

**Emits:**

- [OperatorCancelChange](#event-operatorcancelchange)

```solidity
function cancelOperatorChange(bytes calldata pubkey) external;
```

**Parameters**

| Name     | Type    | Description                  |
| -------- | ------- | ---------------------------- |
| `pubkey` | `bytes` | The pubkey of the validator. |

### deposit

Submit a deposit message to the Beaconchain.

_emits the Deposit event upon successful deposit._

**Emits:**

- [Deposit](#event-deposit)

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

| Name          | Type      | Description                                              |
| ------------- | --------- | -------------------------------------------------------- |
| `pubkey`      | `bytes`   | is the consensus public key of the validator.            |
| `credentials` | `bytes`   | is the withdrawal credentials of the validator.          |
| `signature`   | `bytes`   | is the signature used only on the first deposit.         |
| `operator`    | `address` | is the address of the operator used for `POL` mechanics. |

### requestOperatorChange

Request to change the operator of a validator.

_Only the current operator can request a change._

**Emits:**

- [OperatorRequestChange](#event-operatorrequestchange)

```solidity
function requestOperatorChange(bytes calldata pubkey, address newOperator) external;
```

**Parameters**

| Name          | Type      | Description                  |
| ------------- | --------- | ---------------------------- |
| `pubkey`      | `bytes`   | The pubkey of the validator. |
| `newOperator` | `address` | The new operator address.    |

## Events

### Deposit {#event-deposit}

Emitted when a deposit is made.

```solidity
event Deposit(bytes pubkey, bytes credentials, uint64 amount, bytes signature, uint64 index);
```

**Parameters**

| Name          | Type     | Description                                  |
| ------------- | -------- | -------------------------------------------- |
| `pubkey`      | `bytes`  | The consensus public key of the validator    |
| `credentials` | `bytes`  | The withdrawal credentials of the validator  |
| `amount`      | `uint64` | The amount deposited in Gwei                 |
| `signature`   | `bytes`  | The signature used only on the first deposit |
| `index`       | `uint64` | The deposit index                            |

### OperatorAcceptChange {#event-operatoracceptchange}

Emitted when an operator change is accepted.

```solidity
event OperatorAcceptChange(bytes indexed pubkey, address indexed oldOperator, address indexed newOperator);
```

**Parameters**

| Name          | Type      | Description                   |
| ------------- | --------- | ----------------------------- |
| `pubkey`      | `bytes`   | The pubkey of the validator   |
| `oldOperator` | `address` | The previous operator address |
| `newOperator` | `address` | The new operator address      |

### OperatorCancelChange {#event-operatorcancelchange}

Emitted when an operator change is cancelled.

```solidity
event OperatorCancelChange(bytes indexed pubkey, address indexed operator);
```

**Parameters**

| Name       | Type      | Description                                    |
| ---------- | --------- | ---------------------------------------------- |
| `pubkey`   | `bytes`   | The pubkey of the validator                    |
| `operator` | `address` | The operator address that cancelled the change |

### OperatorRequestChange {#event-operatorrequestchange}

Emitted when an operator change is requested.

```solidity
event OperatorRequestChange(bytes indexed pubkey, address indexed operator, address indexed newOperator);
```

**Parameters**

| Name          | Type      | Description                        |
| ------------- | --------- | ---------------------------------- |
| `pubkey`      | `bytes`   | The pubkey of the validator        |
| `operator`    | `address` | The current operator address       |
| `newOperator` | `address` | The requested new operator address |
