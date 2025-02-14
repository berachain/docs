<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BGT

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bgt.address">{{config.mainnet.contracts.bgt.address}}</a><span v-if="config.mainnet.contracts.bgt.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.mainnet.contracts.bgt.abi">ABI JSON</a></span></small>

The Berachain Governance Token (`$BGT`) is a soulbound ERC20 token, which cannot be transferred, only earned through Reward Vaults, used for governance proposals and voting, and can be redeemed for `$BERA`.

### whitelistSender

Approve an address to send BGT or approve another address to transfer BGT from it.

_This can only be called by the governance module._

_BGT should be soul bound to EOAs and only transferable by approved senders._

```solidity
function whitelistSender(address sender, bool approved) external;
```

**Parameters**

| Name       | Type      | Description                            |
| ---------- | --------- | -------------------------------------- |
| `sender`   | `address` | The address of the sender.             |
| `approved` | `bool`    | Whether the sender is approved or not. |

### mint

Mint BGT to the distributor.

_This can only be called by the minter address, which is set by governance._

```solidity
function mint(address distributor, uint256 amount) external;
```

**Parameters**

| Name          | Type      | Description                     |
| ------------- | --------- | ------------------------------- |
| `distributor` | `address` | The address of the distributor. |
| `amount`      | `uint256` | The amount of BGT to mint.      |

### queueBoost

Queues a new boost of the validator with an amount of BGT from `msg.sender`.

_Reverts if `msg.sender` does not have enough unboosted balance to cover amount._

```solidity
function queueBoost(bytes calldata pubkey, uint128 amount) external;
```

**Parameters**

| Name     | Type      | Description                                    |
| -------- | --------- | ---------------------------------------------- |
| `pubkey` | `bytes`   | The pubkey of the validator to be boosted.     |
| `amount` | `uint128` | The amount of BGT to use for the queued boost. |

### cancelBoost

Cancels a queued boost of the validator removing an amount of BGT for `msg.sender`.

_Reverts if `msg.sender` does not have enough queued balance to cover amount._

```solidity
function cancelBoost(bytes calldata pubkey, uint128 amount) external;
```

**Parameters**

| Name     | Type      | Description                                        |
| -------- | --------- | -------------------------------------------------- |
| `pubkey` | `bytes`   | The pubkey of the validator to cancel boost for.   |
| `amount` | `uint128` | The amount of BGT to remove from the queued boost. |

### activateBoost

Boost the validator with an amount of BGT from `user`.

```solidity
function activateBoost(address user, bytes calldata pubkey) external returns (bool);
```

**Parameters**

| Name     | Type      | Description                                |
| -------- | --------- | ------------------------------------------ |
| `user`   | `address` | The address of the user boosting.          |
| `pubkey` | `bytes`   | The pubkey of the validator to be boosted. |

**Returns**

| Name     | Type   | Description                                                                    |
| -------- | ------ | ------------------------------------------------------------------------------ |
| `<none>` | `bool` | bool False if amount is zero or if enough time has not passed, otherwise true. |

### queueDropBoost

Queues a drop boost of the validator removing an amount of BGT for sender.

_Reverts if `user` does not have enough boosted balance to cover amount._

```solidity
function queueDropBoost(bytes calldata pubkey, uint128 amount) external;
```

**Parameters**

| Name     | Type      | Description                                       |
| -------- | --------- | ------------------------------------------------- |
| `pubkey` | `bytes`   | The pubkey of the validator to remove boost from. |
| `amount` | `uint128` | The amount of BGT to remove from the boost.       |

### cancelDropBoost

Cancels a queued drop boost of the validator removing an amount of BGT for sender.

```solidity
function cancelDropBoost(bytes calldata pubkey, uint128 amount) external;
```

**Parameters**

| Name     | Type      | Description                                             |
| -------- | --------- | ------------------------------------------------------- |
| `pubkey` | `bytes`   | The pubkey of the validator to cancel drop boost for.   |
| `amount` | `uint128` | The amount of BGT to remove from the queued drop boost. |

### dropBoost

Drops an amount of BGT from an existing boost of validator by user.

```solidity
function dropBoost(address user, bytes calldata pubkey) external returns (bool);
```

**Parameters**

| Name     | Type      | Description                                       |
| -------- | --------- | ------------------------------------------------- |
| `user`   | `address` | The address of the user to drop boost from.       |
| `pubkey` | `bytes`   | The pubkey of the validator to remove boost from. |

**Returns**

| Name     | Type   | Description                                                                    |
| -------- | ------ | ------------------------------------------------------------------------------ |
| `<none>` | `bool` | bool False if amount is zero or if enough time has not passed, otherwise true. |

### boostedQueue

Returns the amount of BGT queued up to be used by an account to boost a validator.

```solidity
function boostedQueue(
    address account,
    bytes calldata pubkey
)
    external
    view
    returns (uint32 blockNumberLast, uint128 balance);
```

**Parameters**

| Name      | Type      | Description                                |
| --------- | --------- | ------------------------------------------ |
| `account` | `address` | The address of the account boosting.       |
| `pubkey`  | `bytes`   | The pubkey of the validator being boosted. |

### queuedBoost

Returns the amount of BGT queued up to be used by an account for boosts.

```solidity
function queuedBoost(address account) external view returns (uint128);
```

**Parameters**

| Name      | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `account` | `address` | The address of the account boosting. |

### boosted

Returns the amount of BGT used by an account to boost a validator.

```solidity
function boosted(address account, bytes calldata pubkey) external view returns (uint128);
```

**Parameters**

| Name      | Type      | Description                                |
| --------- | --------- | ------------------------------------------ |
| `account` | `address` | The address of the account boosting.       |
| `pubkey`  | `bytes`   | The pubkey of the validator being boosted. |

### boosts

Returns the amount of BGT used by an account for boosts.

```solidity
function boosts(address account) external view returns (uint128);
```

**Parameters**

| Name      | Type      | Description                          |
| --------- | --------- | ------------------------------------ |
| `account` | `address` | The address of the account boosting. |

### boostees

Returns the amount of BGT attributed to the validator for boosts.

```solidity
function boostees(bytes calldata pubkey) external view returns (uint128);
```

**Parameters**

| Name     | Type    | Description                                |
| -------- | ------- | ------------------------------------------ |
| `pubkey` | `bytes` | The pubkey of the validator being boosted. |

### totalBoosts

Returns the total boosts for all validators.

```solidity
function totalBoosts() external view returns (uint128);
```

### normalizedBoost

Returns the normalized boost power for the validator given outstanding boosts.

_Used by distributor get validator boost power._

```solidity
function normalizedBoost(bytes calldata pubkey) external view returns (uint256);
```

**Parameters**

| Name     | Type    | Description                          |
| -------- | ------- | ------------------------------------ |
| `pubkey` | `bytes` | The pubkey of the boosted validator. |

### minter

Public variable that represents the caller of the mint method.

_This is going to be the BlockRewardController contract at first._

```solidity
function minter() external view returns (address);
```

### setMinter

Set the minter address.

_This can only be called by the governance module._

```solidity
function setMinter(address _minter) external;
```

**Parameters**

| Name      | Type      | Description                |
| --------- | --------- | -------------------------- |
| `_minter` | `address` | The address of the minter. |

### setStaker

Set the BGT staker contract address.

```solidity
function setStaker(address _staker) external;
```

**Parameters**

| Name      | Type      | Description                |
| --------- | --------- | -------------------------- |
| `_staker` | `address` | The address of the staker. |

### setActivateBoostDelay

Set the activate boost delay.

```solidity
function setActivateBoostDelay(uint32 _activateBoostDelay) external;
```

**Parameters**

| Name                  | Type     | Description                          |
| --------------------- | -------- | ------------------------------------ |
| `_activateBoostDelay` | `uint32` | The new delay for activating boosts. |

### setDropBoostDelay

Set the drop boost delay.

```solidity
function setDropBoostDelay(uint32 _dropBoostDelay) external;
```

**Parameters**

| Name              | Type     | Description                        |
| ----------------- | -------- | ---------------------------------- |
| `_dropBoostDelay` | `uint32` | The new delay for dropping boosts. |

### redeem

Redeem the BGT token for the native token at a 1:1 rate.

```solidity
function redeem(address receiver, uint256 amount) external;
```

**Parameters**

| Name       | Type      | Description                                               |
| ---------- | --------- | --------------------------------------------------------- |
| `receiver` | `address` | The receiver's address who will receive the native token. |
| `amount`   | `uint256` | The amount of BGT to redeem.                              |

### unboostedBalanceOf

Returns the unboosted balance of an account.

```solidity
function unboostedBalanceOf(address account) external view returns (uint256);
```

**Parameters**

| Name      | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `account` | `address` | The address of the account. |

## Events

### MinterChanged

Emitted when the minter address is changed.

```solidity
event MinterChanged(address indexed previous, address indexed current);
```

**Parameters**

| Name       | Type      | Description                         |
| ---------- | --------- | ----------------------------------- |
| `previous` | `address` | The address of the previous minter. |
| `current`  | `address` | The address of the current minter.  |

### StakerChanged

Emitted when the Staker address is changed.

```solidity
event StakerChanged(address indexed previous, address indexed current);
```

**Parameters**

| Name       | Type      | Description                         |
| ---------- | --------- | ----------------------------------- |
| `previous` | `address` | The address of the previous Staker. |
| `current`  | `address` | The address of the current Staker.  |

### SenderWhitelisted

Emitted when an address is approved to send BGT.

```solidity
event SenderWhitelisted(address indexed sender, bool approved);
```

**Parameters**

| Name       | Type      | Description                            |
| ---------- | --------- | -------------------------------------- |
| `sender`   | `address` | The address of the sender.             |
| `approved` | `bool`    | Whether the sender is approved or not. |

### QueueBoost

Emitted when sender queues a new boost for a validator with an amount of BGT

```solidity
event QueueBoost(address indexed sender, bytes indexed pubkey, uint128 amount);
```

**Parameters**

| Name     | Type      | Description                                         |
| -------- | --------- | --------------------------------------------------- |
| `sender` | `address` | The address of the sender.                          |
| `pubkey` | `bytes`   | The pubkey of the validator to be queued for boost. |
| `amount` | `uint128` | The amount of BGT to boost with.                    |

### CancelBoost

Emitted when sender cancels a queued boost for a validator with an amount of BGT

```solidity
event CancelBoost(address indexed sender, bytes indexed pubkey, uint128 amount);
```

**Parameters**

| Name     | Type      | Description                                                    |
| -------- | --------- | -------------------------------------------------------------- |
| `sender` | `address` | The address of the sender.                                     |
| `pubkey` | `bytes`   | The pubkey of the validator to be canceled from queued boosts. |
| `amount` | `uint128` | The amount of BGT to cancel from queued boosts.                |

### ActivateBoost

Emitted when sender activates a new boost for a validator

```solidity
event ActivateBoost(address indexed sender, address indexed user, bytes indexed pubkey, uint128 amount);
```

**Parameters**

| Name     | Type      | Description                                                        |
| -------- | --------- | ------------------------------------------------------------------ |
| `sender` | `address` | The address of the sender.                                         |
| `user`   | `address` | The address of the user boosting.                                  |
| `pubkey` | `bytes`   | The pubkey of the validator to be activated for the queued boosts. |
| `amount` | `uint128` | The amount of BGT to boost with.                                   |

### QueueDropBoost

Emitted when an user queues a drop boost for a validator.

```solidity
event QueueDropBoost(address indexed user, bytes indexed pubkey, uint128 amount);
```

**Parameters**

| Name     | Type      | Description                                       |
| -------- | --------- | ------------------------------------------------- |
| `user`   | `address` | The address of the user.                          |
| `pubkey` | `bytes`   | The pubkey of the validator to remove boost from. |
| `amount` | `uint128` | The amount of BGT boost to remove.                |

### CancelDropBoost

Emitted when an user cancels a queued drop boost for a validator.

```solidity
event CancelDropBoost(address indexed user, bytes indexed pubkey, uint128 amount);
```

**Parameters**

| Name     | Type      | Description                                           |
| -------- | --------- | ----------------------------------------------------- |
| `user`   | `address` | The address of the user.                              |
| `pubkey` | `bytes`   | The pubkey of the validator to cancel drop boost for. |
| `amount` | `uint128` | The amount of BGT boost to cancel.                    |

### DropBoost

Emitted when sender removes an amount of BGT boost from a validator

```solidity
event DropBoost(address indexed sender, bytes indexed pubkey, uint128 amount);
```

**Parameters**

| Name     | Type      | Description                                       |
| -------- | --------- | ------------------------------------------------- |
| `sender` | `address` | The address of the sender.                        |
| `pubkey` | `bytes`   | The pubkey of the validator to remove boost from. |
| `amount` | `uint128` | The amount of BGT boost to remove.                |

### Redeem

Emitted when the BGT token is redeemed for the native token.

```solidity
event Redeem(address indexed from, address indexed receiver, uint256 amount);
```

### ActivateBoostDelayChanged

Emitted when the activate boost delay is changed.

```solidity
event ActivateBoostDelayChanged(uint32 newDelay);
```

**Parameters**

| Name       | Type     | Description                          |
| ---------- | -------- | ------------------------------------ |
| `newDelay` | `uint32` | The new delay for activating boosts. |

### DropBoostDelayChanged

Emitted when the drop boost delay is changed.

```solidity
event DropBoostDelayChanged(uint32 newDelay);
```

**Parameters**

| Name       | Type     | Description                        |
| ---------- | -------- | ---------------------------------- |
| `newDelay` | `uint32` | The new delay for dropping boosts. |
