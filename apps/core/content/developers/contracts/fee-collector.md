<script setup>
  import config from '@berachain/config/constants.json';
</script>

# FeeCollector

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.feeCollector.address">{{config.contracts.feeCollector.address}}</a><span v-if="config.contracts.feeCollector.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.feeCollector.abi">ABI JSON</a></span></small>

The Fee Collector contract is responsible for collecting fees from Berachain Dapps and
auctioning them for a Payout token which then is distributed among the BGT stakers.

This contract is inspired by the [Uniswap V3 Factory Owner contract](https://github.com/uniswapfoundation/UniStaker/blob/main/src/V3FactoryOwner.sol).

## State Variables

### payoutToken

The ERC-20 token which must be used to pay for fees when claiming dapp fees.

```solidity
address public payoutToken;
```

### payoutAmount

The amount of payout token that is required to claim dapp fees of a particular token.

_This works as first come first serve basis. whoever pays this much amount of the payout amount first will
get the fees._

```solidity
uint256 public payoutAmount;
```

### rewardReceiver

The contract that receives the payout and is notified via method call, when dapp fees are claimed.

```solidity
address public rewardReceiver;
```

## Functions

### constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(
    address governance,
    address _payoutToken,
    address _rewardReceiver,
    uint256 _payoutAmount
)
    external
    initializer;
```

### \_authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyOwner;
```

### setPayoutAmount

Update the payout amount to a new value. Must be called by admin.

```solidity
function setPayoutAmount(uint256 _newPayoutAmount) external onlyOwner;
```

**Parameters**

| Name               | Type      | Description                                   |
| ------------------ | --------- | --------------------------------------------- |
| `_newPayoutAmount` | `uint256` | The value that will be the new payout amount. |

### setPayoutToken

Set the ERC-20 token which must be used to pay for fees when claiming dapp fees.

```solidity
function setPayoutToken(address _newPayoutToken) external onlyOwner;
```

**Parameters**

| Name              | Type      | Description                          |
| ----------------- | --------- | ------------------------------------ |
| `_newPayoutToken` | `address` | The address of the new payout token. |

### claimFees

Claim collected dapp fees and transfer them to the recipient.

_Caller need to pay the PAYMENT_AMOUNT of PAYOUT_TOKEN tokens._

```solidity
function claimFees(address _recipient, address[] calldata _feeTokens) external;
```

**Parameters**

| Name         | Type        | Description |
| ------------ | ----------- | ----------- |
| `_recipient` | `address`   |             |
| `_feeTokens` | `address[]` |             |

### donate

directly sends dapp fees from msg.sender to the BGTStaker reward receiver.

_The dapp fee ERC20 token MUST be the payoutToken._

```solidity
function donate(uint256 amount) external;
```

**Parameters**

| Name     | Type      | Description                                                      |
| -------- | --------- | ---------------------------------------------------------------- |
| `amount` | `uint256` | the amount of fee token to directly send to the reward receiver. |
