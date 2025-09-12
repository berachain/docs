---
head:
  - - meta
    - property: og:title
      content: FeeCollector Contract Reference
  - - meta
    - name: description
      content: Developer reference for the FeeCollector contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the FeeCollector contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# FeeCollector

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.feeCollector['mainnet-address']">{{config.contracts.pol.feeCollector['mainnet-address']}}</a><span v-if="config.contracts.pol.feeCollector.abi && config.contracts.pol.feeCollector.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.feeCollector.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/pol/FeeCollector.sol)

The Fee Collector contract is responsible for collecting fees from Berachain Dapps and auctioning them for a Payout token, which then is distributed among the BGT stakers.

**Inherits:** IFeeCollector, PausableUpgradeable, AccessControlUpgradeable, UUPSUpgradeable

## Constants

### MANAGER_ROLE

The MANAGER role.

```solidity
bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
```

### PAUSER_ROLE

The PAUSER role.

```solidity
bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
```

## State Variables

### payoutAmount

The amount of payout token that is required to claim dapp fees of a particular token.

_This works as first come first serve basis. whoever pays this much amount of the payout amount first will get the fees._

```solidity
uint256 public payoutAmount;
```

### payoutToken

The ERC-20 token which must be used to pay for fees when claiming dapp fees.

```solidity
address public payoutToken;
```

### queuedPayoutAmount

The amount of payout token that is queued to be set as the payout amount.

_It becomes the payout amount after the next claim._

```solidity
uint256 public queuedPayoutAmount;
```

### rewardReceiver

The contract that receives the payout and is notified via method call, when dapp fees are claimed.

```solidity
address public rewardReceiver;
```

## View Functions

### payoutAmount

The amount of payout token that is required to claim dapp fees of a particular token.

_This works as first come first serve basis. whoever pays this much amount of the payout amount first will get the fees._

```solidity
function payoutAmount() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description                                       |
| -------- | --------- | ------------------------------------------------- |
| `<none>` | `uint256` | The amount of payout token required to claim fees |

### payoutToken

The ERC-20 token which must be used to pay for fees when claiming dapp fees.

```solidity
function payoutToken() external view returns (address);
```

**Returns**

| Name     | Type      | Description                       |
| -------- | --------- | --------------------------------- |
| `<none>` | `address` | The payout token contract address |

### queuedPayoutAmount

The amount of payout token that is queued to be set as the payout amount.

_It becomes the payout amount after the next claim._

```solidity
function queuedPayoutAmount() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description              |
| -------- | --------- | ------------------------ |
| `<none>` | `uint256` | The queued payout amount |

### rewardReceiver

The contract that receives the payout and is notified via method call, when dapp fees are claimed.

```solidity
function rewardReceiver() external view returns (address);
```

**Returns**

| Name     | Type      | Description                          |
| -------- | --------- | ------------------------------------ |
| `<none>` | `address` | The reward receiver contract address |

## Functions

### claimFees

Claim collected dapp fees and transfer them to the recipient.

_Caller needs to pay the PAYMENT_AMOUNT of PAYOUT_TOKEN tokens. This function is NOT implementing slippage protection. Caller has to check that received amounts match the minimum expected._

**Emits:**

- [FeesClaimed](#event-feesclaimed-dapp)
- [FeesClaimed](#event-feesclaimed-token)

```solidity
function claimFees(address _recipient, address[] calldata _feeTokens) external whenNotPaused;
```

**Parameters**

| Name         | Type        | Description                                                  |
| ------------ | ----------- | ------------------------------------------------------------ |
| `_recipient` | `address`   | The address to which collected dapp fees will be transferred |
| `_feeTokens` | `address[]` | The addresses of the fee token to collect to the recipient   |

### donate

Directly sends dapp fees from msg.sender to the BGTStaker reward receiver.

_The dapp fee ERC20 token MUST be the payoutToken. The amount must be at least payoutAmount to notify the reward receiver._

**Emits:**

- [PayoutDonated](#event-payoutdonated)

```solidity
function donate(uint256 amount) external whenNotPaused;
```

**Parameters**

| Name     | Type      | Description                                                     |
| -------- | --------- | --------------------------------------------------------------- |
| `amount` | `uint256` | The amount of fee token to directly send to the reward receiver |

### initialize

Initializes the FeeCollector contract.

```solidity
function initialize(
    address governance,
    address _payoutToken,
    address _rewardReceiver,
    uint256 _payoutAmount
) external initializer;
```

**Parameters**

| Name              | Type      | Description                          |
| ----------------- | --------- | ------------------------------------ |
| `governance`      | `address` | The governance address               |
| `_payoutToken`    | `address` | The payout token contract address    |
| `_rewardReceiver` | `address` | The reward receiver contract address |
| `_payoutAmount`   | `uint256` | The initial payout amount            |

### pause

Allows the pauser to pause the collector.

```solidity
function pause() external onlyRole(PAUSER_ROLE);
```

### queuePayoutAmountChange

Queues a new payout amount. Must be called by admin.

**Emits:**

- [QueuedPayoutAmount](#event-queuedpayoutamount)

```solidity
function queuePayoutAmountChange(uint256 _newPayoutAmount) external onlyRole(DEFAULT_ADMIN_ROLE);
```

**Parameters**

| Name               | Type      | Description                                  |
| ------------------ | --------- | -------------------------------------------- |
| `_newPayoutAmount` | `uint256` | The value that will be the new payout amount |

### unpause

Allows the manager to unpause the collector.

```solidity
function unpause() external onlyRole(MANAGER_ROLE);
```

## Events

### FeesClaimed {#event-feesclaimed-dapp}

Emitted when the dapp fees are claimed.

```solidity
event FeesClaimed(address indexed caller, address indexed recipient);
```

**Parameters**

| Name        | Type      | Description                                                  |
| ----------- | --------- | ------------------------------------------------------------ |
| `caller`    | `address` | Caller of the `claimFees` function                           |
| `recipient` | `address` | The address to which collected dapp fees will be transferred |

### FeesClaimed {#event-feesclaimed-token}

Emitted when the fees are claimed.

```solidity
event FeesClaimed(address indexed caller, address indexed recipient, address indexed feeToken, uint256 amount);
```

**Parameters**

| Name        | Type      | Description                                                  |
| ----------- | --------- | ------------------------------------------------------------ |
| `caller`    | `address` | Caller of the `claimFees` function                           |
| `recipient` | `address` | The address to which collected dapp fees will be transferred |
| `feeToken`  | `address` | The address of the fee token to collect                      |
| `amount`    | `uint256` | The amount of fee token to transfer                          |

### PayoutAmountSet {#event-payoutamountset}

Emitted when the payout amount is updated.

```solidity
event PayoutAmountSet(uint256 indexed oldPayoutAmount, uint256 indexed newPayoutAmount);
```

**Parameters**

| Name              | Type      | Description                |
| ----------------- | --------- | -------------------------- |
| `oldPayoutAmount` | `uint256` | The previous payout amount |
| `newPayoutAmount` | `uint256` | The new payout amount      |

### PayoutDonated {#event-payoutdonated}

Emitted when the `PayoutToken` is donated.

```solidity
event PayoutDonated(address indexed caller, uint256 amount);
```

**Parameters**

| Name     | Type      | Description                                    |
| -------- | --------- | ---------------------------------------------- |
| `caller` | `address` | Caller of the `donate` function                |
| `amount` | `uint256` | The amount of payout token that is transferred |

### QueuedPayoutAmount {#event-queuedpayoutamount}

Emitted when the admin queues the payout amount.

```solidity
event QueuedPayoutAmount(uint256 queuedPayoutAmount, uint256 currentPayoutAmount);
```

**Parameters**

| Name                  | Type      | Description               |
| --------------------- | --------- | ------------------------- |
| `queuedPayoutAmount`  | `uint256` | The queued payout amount  |
| `currentPayoutAmount` | `uint256` | The current payout amount |

## Errors

### DonateAmountLessThanPayoutAmount

Thrown when the donated amount is less than the required payout amount.

```solidity
error DonateAmountLessThanPayoutAmount();
```

### PayoutAmountIsZero

Thrown when the payout amount is zero.

```solidity
error PayoutAmountIsZero();
```

### ZeroAddress

Thrown when a zero address is provided where a valid address is required.

```solidity
error ZeroAddress();
```
