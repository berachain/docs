---
head:
  - - meta
    - property: og:title
      content: BGT Token Contract Reference
  - - meta
    - name: description
      content: Developer reference for the BGT governance token contract
  - - meta
    - property: og:description
      content: Developer reference for the BGT governance token contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BGT

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.tokens.bgt.address.berachainMainnet">{{config.contracts.tokens.bgt.address.berachainMainnet}}</a><span v-if="config.contracts.tokens.bgt.abi && config.contracts.tokens.bgt.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.tokens.bgt.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/pol/BGT.sol)

The Berachain Governance Token ($BGT) is a soulbound ERC20 token, which cannot be transferred, only earned through Reward Vaults, used for governance proposals and voting, and can be redeemed for $BERA.

**Inherits:**
IBGT, ERC20VotesUpgradeable, OwnableUpgradeable, Multicallable

## Structs

### QueuedBoost

The queued boost struct for validator boosting.

```solidity
struct QueuedBoost {
    uint32 blockNumberLast;
    uint128 balance;
}
```

**Properties**

| Name              | Type      | Description                                    |
| ----------------- | --------- | ---------------------------------------------- |
| `blockNumberLast` | `uint32`  | The last block number boost balance was queued |
| `balance`         | `uint128` | The queued BGT balance to boost with           |

### QueuedDropBoost

The queued drop boost struct for validator boosting.

```solidity
struct QueuedDropBoost {
    uint32 blockNumberLast;
    uint128 balance;
}
```

**Properties**

| Name              | Type      | Description                                                 |
| ----------------- | --------- | ----------------------------------------------------------- |
| `blockNumberLast` | `uint32`  | The last block number boost balance was queued for dropping |
| `balance`         | `uint128` | The boosted BGT balance to drop boost with                  |

### UserBoost

The user boost struct for tracking validator boosts.

```solidity
struct UserBoost {
    uint128 boost;
    uint128 queuedBoost;
}
```

**Properties**

| Name          | Type      | Description                                     |
| ------------- | --------- | ----------------------------------------------- |
| `boost`       | `uint128` | The boost balance being used by the user        |
| `queuedBoost` | `uint128` | The queued boost balance to be used by the user |

## State Variables

### activateBoostDelay

The block delay for activating boosts.

```solidity
uint32 public activateBoostDelay;
```

### bgtTermsAndConditions

The BGT terms and conditions.

```solidity
string public bgtTermsAndConditions;
```

### boosted

The mapping of balances used to boost validator rewards by an account

```solidity
mapping(address account => mapping(bytes pubkey => uint128)) public boosted;
```

### boostedQueue

The mapping of queued boosts on a validator by an account

```solidity
mapping(address account => mapping(bytes pubkey => QueuedBoost)) public boostedQueue;
```

### boostees

The mapping of boost balances for a validator

```solidity
mapping(bytes pubkey => uint128) public boostees;
```

### dropBoostDelay

The block delay for dropping boosts.

```solidity
uint32 public dropBoostDelay;
```

### dropBoostQueue

The mapping of queued drop boosts on a validator by an account

```solidity
mapping(address account => mapping(bytes pubkey => QueuedDropBoost)) public dropBoostQueue;
```

### isWhitelistedSender

The mapping of approved senders.

```solidity
mapping(address sender => bool) public isWhitelistedSender;
```

### staker

The BGTStaker contract address that we are using to stake and withdraw BGT.

_This contract is used to distribute dapp fees to BGT delegators._

```solidity
address public staker;
```

### totalBoosts

Total amount of BGT used for validator boosts

```solidity
uint128 public totalBoosts;
```

### userBoosts

The mapping of user boosts

```solidity
mapping(address account => UserBoost) public userBoosts;
```

## View Functions

### minter

```solidity
function minter() external view returns (address);
```

## Functions

### activateBoost

Activates a queued boost on a validator.

**Emits:**

- [ActivateBoost](#event-activateboost)

```solidity
function activateBoost(address account, bytes calldata pubkey) external;
```

**Parameters**

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `account` | `address` | The account to activate boost for |
| `pubkey`  | `bytes`   | The validator public key          |

### burn

Burns BGT tokens from the caller.

```solidity
function burn(uint256 amount) external;
```

### cancelQueuedBoost

Cancels a queued boost on a validator.

**Emits:**

- [CancelQueuedBoost](#event-cancelqueuedboost)

```solidity
function cancelQueuedBoost(bytes calldata pubkey) external;
```

**Parameters**

| Name     | Type    | Description              |
| -------- | ------- | ------------------------ |
| `pubkey` | `bytes` | The validator public key |

### cancelQueuedDropBoost

Cancels a queued drop boost on a validator.

**Emits:**

- [CancelQueuedDropBoost](#event-cancelqueueddropboost)

```solidity
function cancelQueuedDropBoost(bytes calldata pubkey) external;
```

**Parameters**

| Name     | Type    | Description              |
| -------- | ------- | ------------------------ |
| `pubkey` | `bytes` | The validator public key |

### dropBoost

Drops a boost on a validator.

**Emits:**

- [DropBoost](#event-dropboost)

```solidity
function dropBoost(bytes calldata pubkey, uint128 amount) external;
```

**Parameters**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `pubkey` | `bytes`   | The validator public key |
| `amount` | `uint128` | The amount to drop boost |

### initialize

Initializes the BGT contract.

```solidity
function initialize(address _governance, address _staker) external initializer;
```

### mint

Mints BGT tokens to the specified address.

_Only the minter can call this function._

```solidity
function mint(address to, uint256 amount) external;
```

### queueBoost

Queues a boost on a validator.

**Emits:**

- [QueueBoost](#event-queueboost)

```solidity
function queueBoost(bytes calldata pubkey, uint128 amount) external;
```

**Parameters**

| Name     | Type      | Description                   |
| -------- | --------- | ----------------------------- |
| `pubkey` | `bytes`   | The validator public key      |
| `amount` | `uint128` | The amount to queue for boost |

### queueDropBoost

Queues a drop boost on a validator.

**Emits:**

- [QueueDropBoost](#event-queuedropboost)

```solidity
function queueDropBoost(bytes calldata pubkey, uint128 amount) external;
```

**Parameters**

| Name     | Type      | Description                        |
| -------- | --------- | ---------------------------------- |
| `pubkey` | `bytes`   | The validator public key           |
| `amount` | `uint128` | The amount to queue for drop boost |

### redeem

Redeems native tokens for BGT.

**Emits:**

- [Redeem](#event-redeem)

```solidity
function redeem(address receiver, uint256 amount) external payable;
```

**Parameters**

| Name       | Type      | Description                          |
| ---------- | --------- | ------------------------------------ |
| `receiver` | `address` | The address to receive native tokens |
| `amount`   | `uint256` | The amount of BGT to redeem          |

### setActivateBoostDelay

Sets the delay for activating boosts.

**Emits:**

- [SetActivateBoostDelay](#event-setactivateboostdelay)

```solidity
function setActivateBoostDelay(uint32 _activateBoostDelay) external onlyOwner;
```

**Parameters**

| Name                  | Type     | Description                  |
| --------------------- | -------- | ---------------------------- |
| `_activateBoostDelay` | `uint32` | The new activate boost delay |

### setBgtTermsAndConditions

Sets the BGT terms and conditions.

**Emits:**

- [SetBgtTermsAndConditions](#event-setbgttermsandconditions)

```solidity
function setBgtTermsAndConditions(string calldata _bgtTermsAndConditions) external onlyOwner;
```

**Parameters**

| Name                     | Type     | Description                  |
| ------------------------ | -------- | ---------------------------- |
| `_bgtTermsAndConditions` | `string` | The new terms and conditions |

### setDropBoostDelay

Sets the delay for dropping boosts.

**Emits:**

- [SetDropBoostDelay](#event-setdropboostdelay)

```solidity
function setDropBoostDelay(uint32 _dropBoostDelay) external onlyOwner;
```

**Parameters**

| Name              | Type     | Description              |
| ----------------- | -------- | ------------------------ |
| `_dropBoostDelay` | `uint32` | The new drop boost delay |

### setMinter

Sets the minter address.

**Emits:**

- [SetMinter](#event-setminter)

```solidity
function setMinter(address _minter) external onlyOwner;
```

**Parameters**

| Name      | Type      | Description            |
| --------- | --------- | ---------------------- |
| `_minter` | `address` | The new minter address |

### setStaker

Sets the staker contract address.

**Emits:**

- [SetStaker](#event-setstaker)

```solidity
function setStaker(address _staker) external onlyOwner;
```

**Parameters**

| Name      | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| `_staker` | `address` | The new staker contract address |

### whitelistSender

Whitelists or removes a sender.

**Emits:**

- [WhitelistSender](#event-whitelistsender)

```solidity
function whitelistSender(address sender, bool approved) external onlyOwner;
```

**Parameters**

| Name       | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| `sender`   | `address` | The sender address             |
| `approved` | `bool`    | Whether to whitelist or remove |

## Events

### ActivateBoost {#event-activateboost}

Emitted when a boost is activated.

```solidity
event ActivateBoost(address indexed account, bytes pubkey, uint128 amount);
```

**Parameters**

| Name      | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `account` | `address` | The account that activated the boost |
| `pubkey`  | `bytes`   | The validator public key             |
| `amount`  | `uint128` | The amount of boost activated        |

### Approval {#event-approval}

Emitted when an approval is made.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

**Parameters**

| Name      | Type      | Description          |
| --------- | --------- | -------------------- |
| `owner`   | `address` | The token owner      |
| `spender` | `address` | The approved spender |
| `value`   | `uint256` | The approved amount  |

### CancelQueuedBoost {#event-cancelqueuedboost}

Emitted when a queued boost is cancelled.

```solidity
event CancelQueuedBoost(address indexed account, bytes pubkey, uint128 amount);
```

**Parameters**

| Name      | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `account` | `address` | The account that cancelled the boost |
| `pubkey`  | `bytes`   | The validator public key             |
| `amount`  | `uint128` | The amount of boost cancelled        |

### CancelQueuedDropBoost {#event-cancelqueueddropboost}

Emitted when a queued drop boost is cancelled.

```solidity
event CancelQueuedDropBoost(address indexed account, bytes pubkey, uint128 amount);
```

**Parameters**

| Name      | Type      | Description                               |
| --------- | --------- | ----------------------------------------- |
| `account` | `address` | The account that cancelled the drop boost |
| `pubkey`  | `bytes`   | The validator public key                  |
| `amount`  | `uint128` | The amount of drop boost cancelled        |

### DelegateChanged {#event-delegatechanged}

Emitted when a delegate is changed.

```solidity
event DelegateChanged(address indexed delegator, address indexed fromDelegate, address indexed toDelegate);
```

**Parameters**

| Name           | Type      | Description           |
| -------------- | --------- | --------------------- |
| `delegator`    | `address` | The delegator address |
| `fromDelegate` | `address` | The previous delegate |
| `toDelegate`   | `address` | The new delegate      |

### DelegateVotesChanged {#event-delegatevoteschanged}

Emitted when delegate votes change.

```solidity
event DelegateVotesChanged(address indexed delegate, uint256 previousVotes, uint256 newVotes);
```

**Parameters**

| Name            | Type      | Description             |
| --------------- | --------- | ----------------------- |
| `delegate`      | `address` | The delegate address    |
| `previousVotes` | `uint256` | The previous vote count |
| `newVotes`      | `uint256` | The new vote count      |

### DropBoost {#event-dropboost}

Emitted when a boost is dropped.

```solidity
event DropBoost(address indexed account, bytes pubkey, uint128 amount);
```

**Parameters**

| Name      | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| `account` | `address` | The account that dropped the boost |
| `pubkey`  | `bytes`   | The validator public key           |
| `amount`  | `uint128` | The amount of boost dropped        |

### EIP712DomainChanged {#event-eip712domainchanged}

Emitted when the EIP712 domain changes.

```solidity
event EIP712DomainChanged();
```

### Initialized {#event-initialized}

Emitted when the contract is initialized.

```solidity
event Initialized(uint64 version);
```

**Parameters**

| Name      | Type     | Description                |
| --------- | -------- | -------------------------- |
| `version` | `uint64` | The initialization version |

### OwnershipTransferred {#event-ownershiptransferred}

Emitted when ownership is transferred.

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

**Parameters**

| Name            | Type      | Description        |
| --------------- | --------- | ------------------ |
| `previousOwner` | `address` | The previous owner |
| `newOwner`      | `address` | The new owner      |

### QueueBoost {#event-queueboost}

Emitted when a boost is queued.

```solidity
event QueueBoost(address indexed account, bytes pubkey, uint128 amount);
```

**Parameters**

| Name      | Type      | Description                       |
| --------- | --------- | --------------------------------- |
| `account` | `address` | The account that queued the boost |
| `pubkey`  | `bytes`   | The validator public key          |
| `amount`  | `uint128` | The amount of boost queued        |

### QueueDropBoost {#event-queuedropboost}

Emitted when a drop boost is queued.

```solidity
event QueueDropBoost(address indexed account, bytes pubkey, uint128 amount);
```

**Parameters**

| Name      | Type      | Description                            |
| --------- | --------- | -------------------------------------- |
| `account` | `address` | The account that queued the drop boost |
| `pubkey`  | `bytes`   | The validator public key               |
| `amount`  | `uint128` | The amount of drop boost queued        |

### Redeem {#event-redeem}

Emitted when BGT is redeemed for native tokens.

```solidity
event Redeem(address indexed account, address indexed receiver, uint256 amount);
```

**Parameters**

| Name       | Type      | Description                   |
| ---------- | --------- | ----------------------------- |
| `account`  | `address` | The account that redeemed     |
| `receiver` | `address` | The receiver of native tokens |
| `amount`   | `uint256` | The amount redeemed           |

### SetActivateBoostDelay {#event-setactivateboostdelay}

Emitted when the activate boost delay is set.

```solidity
event SetActivateBoostDelay(uint32 activateBoostDelay);
```

**Parameters**

| Name                 | Type     | Description                  |
| -------------------- | -------- | ---------------------------- |
| `activateBoostDelay` | `uint32` | The new activate boost delay |

### SetBgtTermsAndConditions {#event-setbgttermsandconditions}

Emitted when BGT terms and conditions are set.

```solidity
event SetBgtTermsAndConditions(string bgtTermsAndConditions);
```

**Parameters**

| Name                    | Type     | Description                  |
| ----------------------- | -------- | ---------------------------- |
| `bgtTermsAndConditions` | `string` | The new terms and conditions |

### SetDropBoostDelay {#event-setdropboostdelay}

Emitted when the drop boost delay is set.

```solidity
event SetDropBoostDelay(uint32 dropBoostDelay);
```

**Parameters**

| Name             | Type     | Description              |
| ---------------- | -------- | ------------------------ |
| `dropBoostDelay` | `uint32` | The new drop boost delay |

### SetMinter {#event-setminter}

Emitted when the minter is set.

```solidity
event SetMinter(address indexed minter);
```

**Parameters**

| Name     | Type      | Description            |
| -------- | --------- | ---------------------- |
| `minter` | `address` | The new minter address |

### SetStaker {#event-setstaker}

Emitted when the staker is set.

```solidity
event SetStaker(address indexed staker);
```

**Parameters**

| Name     | Type      | Description            |
| -------- | --------- | ---------------------- |
| `staker` | `address` | The new staker address |

### Transfer {#event-transfer}

Emitted when tokens are transferred.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

**Parameters**

| Name    | Type      | Description            |
| ------- | --------- | ---------------------- |
| `from`  | `address` | The sender address     |
| `to`    | `address` | The recipient address  |
| `value` | `uint256` | The amount transferred |

### WhitelistSender {#event-whitelistsender}

Emitted when a sender is whitelisted or removed.

```solidity
event WhitelistSender(address indexed sender, bool approved);
```

**Parameters**

| Name       | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| `sender`   | `address` | The sender address             |
| `approved` | `bool`    | Whether whitelisted or removed |

## Errors

### ZeroAddress

```solidity
error ZeroAddress();
```

Thrown when attempting to initialize with a zero address.

### UnauthorizedETHTransfer

```solidity
error UnauthorizedETHTransfer();
```

Thrown when attempting an unauthorized ETH transfer.

### VotesExpiredSignature

```solidity
error VotesExpiredSignature(uint256 expiry);
```

Thrown when attempting to use an expired signature for voting.

**Parameters**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `expiry` | `uint256` | The expiry timestamp of the signature |
