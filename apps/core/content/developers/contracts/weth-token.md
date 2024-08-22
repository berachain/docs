<script setup>
  import config from '@berachain/config/constants.json';
</script>

# WETH

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.weth.address">{{config.contracts.weth.address}}</a><span v-if="config.contracts.weth.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.weth.abi">ABI JSON</a></span></small>

Simple Wrapped Ether implementation.

## State Variables

### \_DEPOSIT_EVENT_SIGNATURE

_`keccak256(bytes("Deposit(address,uint256)"))`._

```solidity
uint256 private constant _DEPOSIT_EVENT_SIGNATURE =
    0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c;
```

### \_WITHDRAWAL_EVENT_SIGNATURE

_`keccak256(bytes("Withdrawal(address,uint256)"))`._

```solidity
uint256 private constant _WITHDRAWAL_EVENT_SIGNATURE =
    0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65;
```

## Functions

### name

_Returns the name of the token._

```solidity
function name() public view virtual override returns (string memory);
```

### symbol

_Returns the symbol of the token._

```solidity
function symbol() public view virtual override returns (string memory);
```

### deposit

_Deposits `amount` ETH of the caller and mints `amount` WETH to the caller.
Emits a `Deposit` event._

```solidity
function deposit() public payable virtual;
```

### withdraw

_Burns `amount` WETH of the caller and sends `amount` ETH to the caller.
Emits a `Withdrawal` event._

```solidity
function withdraw(uint256 amount) public virtual;
```

### receive

_Equivalent to `deposit()`._

```solidity
receive() external payable virtual;
```

## Events

### Deposit

_Emitted when `amount` is deposited from `from`._

```solidity
event Deposit(address indexed from, uint256 amount);
```

### Withdrawal

_Emitted when `amount` is withdrawn to `to`._

```solidity
event Withdrawal(address indexed to, uint256 amount);
```

## Errors

### ETHTransferFailed

_The ETH transfer has failed._

```solidity
error ETHTransferFailed();
```
