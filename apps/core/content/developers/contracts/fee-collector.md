<script setup>
  import config from '@berachain/config/constants.json';
</script>

# FeeCollector

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.feeCollector['mainnet-address']">{{config.contracts.pol.feeCollector['mainnet-address']}}</a><span v-if="config.contracts.pol.feeCollector.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.feeCollector.abi">ABI JSON</a></span></small>

The Fee Collector contract is responsible for collecting fees from Berachain Dapps and
auctioning them for a Payout token which then is distributed among the BGT stakers.

This contract is inspired by the [Uniswap V3 Factory Owner contract](https://github.com/uniswapfoundation/UniStaker/blob/main/src/V3FactoryOwner.sol).

## Functions

### queuePayoutAmountChange

Queues a new payout amount. Must be called by admin.

Update the payout amount to a new value. Must be called by admin.

```solidity
function queuePayoutAmountChange(uint256 _newPayoutAmount) external;
```

**Parameters**

| Name               | Type      | Description                                   |
| ------------------ | --------- | --------------------------------------------- |
| `_newPayoutAmount` | `uint256` | The value that will be the new payout amount. |

### payoutToken

The ERC-20 token which must be used to pay for fees when claiming dapp fees.

```solidity
function payoutToken() external view returns (address);
```

### queuedPayoutAmount

The amount of payout token that is queued to be set as the payout amount.

_It becomes the payout amount after the next claim._

```solidity
function queuedPayoutAmount() external view returns (uint256);
```

### payoutAmount

The amount of payout token that is required to claim dapp fees of a particular token.

_This works as first come first serve basis. whoever pays this much amount of the payout amount first will
get the fees._

```solidity
function payoutAmount() external view returns (uint256);
```

### rewardReceiver

The contract that receives the payout and is notified via method call, when dapp fees are claimed.

```solidity
function rewardReceiver() external view returns (address);
```

### claimFees

Claim collected dapp fees and transfer them to the recipient.

_Caller needs to pay the PAYMENT_AMOUNT of PAYOUT_TOKEN tokens._

_This function is NOT implementing slippage protection. Caller has to check that received amounts match the
minimum expected._

```solidity
function claimFees(address recipient, address[] calldata feeTokens) external;
```

**Parameters**

| Name        | Type        | Description                                                   |
| ----------- | ----------- | ------------------------------------------------------------- |
| `recipient` | `address`   | The address to which collected dapp fees will be transferred. |
| `feeTokens` | `address[]` | The addresses of the fee token to collect to the recipient.   |

### donate

directly sends dapp fees from msg.sender to the BGTStaker reward receiver.

_The dapp fee ERC20 token MUST be the payoutToken._

_The amount must be at least payoutAmount to notify the reward receiver._

```solidity
function donate(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                                                      |
| -------- | --------- | ---------------------------------------------------------------- |
| `amount` | `uint256` | the amount of fee token to directly send to the reward receiver. |

### pause

Allows the owner to pause the collector.

```solidity
function pause() external;
```

### unpause

Allows the owner to unpause the collector.

```solidity
function unpause() external;
```

## Events

### QueuedPayoutAmount

Emitted when the admin queues the payout amount.

```solidity
event QueuedPayoutAmount(uint256 queuedPayoutAmount, uint256 currentPayoutAmount);
```

### PayoutAmountSet

Emitted when the payout amount is updated.

Emitted when the admin updates the payout amount.

```solidity
event PayoutAmountSet(uint256 indexed oldPayoutAmount, uint256 indexed newPayoutAmount);
```

### FeesClaimed

Emitted when the dapp fees are claimed.

```solidity
event FeesClaimed(address indexed caller, address indexed recipient);
```

**Parameters**

| Name        | Type      | Description                                                   |
| ----------- | --------- | ------------------------------------------------------------- |
| `caller`    | `address` | Caller of the `claimFees` function.                           |
| `recipient` | `address` | The address to which collected dapp fees will be transferred. |

### PayoutDonated

Emitted when the `PayoutToken` is donated.

```solidity
event PayoutDonated(address indexed caller, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                                    |
| -------- | --------- | ---------------------------------------------- |
| `caller` | `address` | Caller of the `donate` function.               |
| `amount` | `uint256` | The amount of payout token that is transfered. |

### FeesClaimed

Emitted when the fees are claimed.

```solidity
event FeesClaimed(address indexed caller, address indexed recipient, address indexed feeToken, uint256 amount);
```

**Parameters**

| Name        | Type      | Description                                                   |
| ----------- | --------- | ------------------------------------------------------------- |
| `caller`    | `address` | Caller of the `claimFees` function.                           |
| `recipient` | `address` | The address to which collected dapp fees will be transferred. |
| `feeToken`  | `address` | The address of the fee token to collect.                      |
| `amount`    | `uint256` | The amount of fee token to transfer.                          |
