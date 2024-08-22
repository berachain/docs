<script setup>
  import config from '@berachain/config/constants.json';
</script>

# IBGT

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.bgt.address">{{config.contracts.bgt.address}}</a><span v-if="config.contracts.bgt.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.bgt.abi">ABI JSON</a></span></small>

Interface of the Berachain Governance Token (`$BGT`), which is a soulbound ERC20, which cannot be transferred, only earned through Reward Vaults, used for governance proposals and voting, and can be redeems for `$BERA`.

## Functions

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
function queueBoost(address validator, uint128 amount) external;
```

**Parameters**

| Name        | Type      | Description                                    |
| ----------- | --------- | ---------------------------------------------- |
| `validator` | `address` | The address of the validator to be boosted.    |
| `amount`    | `uint128` | The amount of BGT to use for the queued boost. |

### cancelBoost

Cancels a queued boost of the validator removing an amount of BGT for `msg.sender`.

_Reverts if `msg.sender` does not have enough queued balance to cover amount._

```solidity
function cancelBoost(address validator, uint128 amount) external;
```

**Parameters**

| Name        | Type      | Description                                        |
| ----------- | --------- | -------------------------------------------------- |
| `validator` | `address` | The address of the validator to cancel boost for.  |
| `amount`    | `uint128` | The amount of BGT to remove from the queued boost. |

### activateBoost

Boost the validator with an amount of BGT from `msg.sender`.

_Reverts if `msg.sender` does not have enough unboosted balance to cover amount._

```solidity
function activateBoost(address validator) external;
```

**Parameters**

| Name        | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| `validator` | `address` | The address of the validator to boost. |

### dropBoost

Drops an amount of BGT from an existing boost of validator by `msg.sender`.

```solidity
function dropBoost(address validator, uint128 amount) external;
```

**Parameters**

| Name        | Type      | Description                                        |
| ----------- | --------- | -------------------------------------------------- |
| `validator` | `address` | The address of the validator to remove boost from. |
| `amount`    | `uint128` | The amount of BGT to remove from the boost.        |

### setCommission

Sets the commission rate on block rewards to be charged by validator.

_Reverts if not called by either validator or operator of validator._

```solidity
function setCommission(address validator, uint256 reward) external;
```

**Parameters**

| Name        | Type      | Description                                                  |
| ----------- | --------- | ------------------------------------------------------------ |
| `validator` | `address` | The address of the validator to set the commission rate for. |
| `reward`    | `uint256` | The new reward rate to charge as commission.                 |

### boostedQueue

Returns the amount of BGT queued up to be used by an account to boost a validator.

```solidity
function boostedQueue(
    address account,
    address validator
)
    external
    view
    returns (uint32 blockNumberLast, uint128 balance);
```

**Parameters**

| Name        | Type      | Description                                 |
| ----------- | --------- | ------------------------------------------- |
| `account`   | `address` | The address of the account boosting.        |
| `validator` | `address` | The address of the validator being boosted. |

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
function boosted(address account, address validator) external view returns (uint128);
```

**Parameters**

| Name        | Type      | Description                                 |
| ----------- | --------- | ------------------------------------------- |
| `account`   | `address` | The address of the account boosting.        |
| `validator` | `address` | The address of the validator being boosted. |

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
function boostees(address validator) external view returns (uint128);
```

**Parameters**

| Name        | Type      | Description                                 |
| ----------- | --------- | ------------------------------------------- |
| `validator` | `address` | The address of the validator being boosted. |

### totalBoosts

Returns the total boosts for all validators.

```solidity
function totalBoosts() external view returns (uint128);
```

### commissions

Returns the commission rate charged by the validator on new block rewards.

```solidity
function commissions(address validator) external view returns (uint32 blockTimestampLast, uint224 rate);
```

**Parameters**

| Name        | Type      | Description                                                |
| ----------- | --------- | ---------------------------------------------------------- |
| `validator` | `address` | The address of the validator charging the commission rate. |

### boostedRewardRate

Returns the scaled reward rate for the validator given outstanding boosts.

_Used by distributor to distribute BGT rewards._

```solidity
function boostedRewardRate(address validator, uint256 rewardRate) external view returns (uint256);
```

**Parameters**

| Name         | Type      | Description                             |
| ------------ | --------- | --------------------------------------- |
| `validator`  | `address` | The address of the boosted validator.   |
| `rewardRate` | `uint256` | The unscaled reward rate for the block. |

### commissionRewardRate

Returns the amount of the reward rate to be dedicated to commissions for the given validator.

_Used by distributor to distribute BGT rewards._

```solidity
function commissionRewardRate(address validator, uint256 rewardRate) external view returns (uint256);
```

**Parameters**

| Name         | Type      | Description                                            |
| ------------ | --------- | ------------------------------------------------------ |
| `validator`  | `address` | The address of the validator charging commission.      |
| `rewardRate` | `uint256` | The reward rate to take commission from for the block. |

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

### setBeraChef

Set the BeraChef address.

_OnlyOwner can call._

```solidity
function setBeraChef(address _beraChef) external;
```

**Parameters**

| Name        | Type      | Description                           |
| ----------- | --------- | ------------------------------------- |
| `_beraChef` | `address` | The address of the BeraChef contract. |

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

### BeraChefChanged

Emitted when the BeraChef address is changed.

```solidity
event BeraChefChanged(address indexed previous, address indexed current);
```

**Parameters**

| Name       | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `previous` | `address` | The address of the previous BeraChef. |
| `current`  | `address` | The address of the current BeraChef.  |

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
event QueueBoost(address indexed sender, address indexed validator, uint128 amount);
```

**Parameters**

| Name        | Type      | Description                                 |
| ----------- | --------- | ------------------------------------------- |
| `sender`    | `address` | The address of the sender.                  |
| `validator` | `address` | The address of the validator to be boosted. |
| `amount`    | `uint128` | The amount of BGT to boost with.            |

### CancelBoost

Emitted when sender cancels a queued boost for a validator with an amount of BGT

```solidity
event CancelBoost(address indexed sender, address indexed validator, uint128 amount);
```

**Parameters**

| Name        | Type      | Description                                     |
| ----------- | --------- | ----------------------------------------------- |
| `sender`    | `address` | The address of the sender.                      |
| `validator` | `address` | The address of the validator to be boosted.     |
| `amount`    | `uint128` | The amount of BGT to cancel from queued boosts. |

### ActivateBoost

Emitted when sender activates a new boost for a validator

```solidity
event ActivateBoost(address indexed sender, address indexed validator, uint128 amount);
```

**Parameters**

| Name        | Type      | Description                            |
| ----------- | --------- | -------------------------------------- |
| `sender`    | `address` | The address of the sender.             |
| `validator` | `address` | The address of the validator to boost. |
| `amount`    | `uint128` | The amount of BGT to boost with.       |

### DropBoost

Emitted when sender removes an amount of BGT boost from a validator

```solidity
event DropBoost(address indexed sender, address indexed validator, uint128 amount);
```

**Parameters**

| Name        | Type      | Description                                        |
| ----------- | --------- | -------------------------------------------------- |
| `sender`    | `address` | The address of the sender.                         |
| `validator` | `address` | The address of the validator to remove boost from. |
| `amount`    | `uint128` | The amount of BGT boost to remove.                 |

### Redeem

Emitted when the BGT token is redeemed for the native token.

```solidity
event Redeem(address indexed from, address indexed receiver, uint256 amount);
```

### UpdateCommission

Emitted when validator sets their commission rate charged on block reward distribution

```solidity
event UpdateCommission(address indexed validator, uint256 oldRate, uint256 newRate);
```

**Parameters**

| Name        | Type      | Description                                           |
| ----------- | --------- | ----------------------------------------------------- |
| `validator` | `address` | The address of the validator charging the commission. |
| `oldRate`   | `uint256` | The old commission rate charged by the validator.     |
| `newRate`   | `uint256` | The new commission rate charged by the validator.     |
