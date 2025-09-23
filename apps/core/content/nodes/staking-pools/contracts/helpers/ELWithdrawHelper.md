# ELWithdrawHelper

[Git Source](https://github.com/berachain/contracts-staking-pools/blob/b7f6d4823d9636f498243ce334a1458550330535/src/helpers/ELWithdrawHelper.sol)

SPDX-License-Identifier: BUSL-1.1

## State Variables

### EIP_7002

```solidity
address public constant EIP_7002 = 0x00000961Ef480Eb55e80D19ad83579A64c007002;
```

### \_gap

_Storage gap for future upgrades._

```solidity
uint256[50] private _gap;
```

## Functions

### getWithdrawalRequestFee

Returns the fee required for withdrawal requests.

```solidity
function getWithdrawalRequestFee() external view returns (uint256);
```

**Returns**

| Name     | Type      | Description            |
| -------- | --------- | ---------------------- |
| `<none>` | `uint256` | The fee amount in wei. |

### \_getWithdrawalRequestFee

```solidity
function _getWithdrawalRequestFee() internal view returns (uint256);
```

### \_triggerExecutionLayerWithdrawal

```solidity
function _triggerExecutionLayerWithdrawal(bytes memory pubkey, uint64 amount, uint256 fee) internal;
```

### \_refundOverpaidFee

```solidity
function _refundOverpaidFee(uint256 fee, address receiver) internal;
```

## Events

### ELWithdrawalTriggered

Emitted when a withdrawal is triggered.

```solidity
event ELWithdrawalTriggered(bytes pubkey, uint64 amount, uint256 fee);
```

**Parameters**

| Name     | Type      | Description                                       |
| -------- | --------- | ------------------------------------------------- |
| `pubkey` | `bytes`   | The public key of the validator to withdraw from. |
| `amount` | `uint64`  | The amount of assets to withdraw in gwei.         |
| `fee`    | `uint256` | The fee paid for the withdrawal.                  |

### OverpaidFeeRefunded

Emitted when fee passed for withdrawal exceeds necessary amount.

```solidity
event OverpaidFeeRefunded(address receiver, uint256 amount);
```

**Parameters**

| Name       | Type      | Description                      |
| ---------- | --------- | -------------------------------- |
| `receiver` | `address` | The wallet receiving the refund. |
| `amount`   | `uint256` | The refunded amount.             |

## Errors

### ELWithdrawalTriggerFailed

```solidity
error ELWithdrawalTriggerFailed();
```

### FeeRequestFailed

```solidity
error FeeRequestFailed();
```

### RefundFailed

```solidity
error RefundFailed();
```
