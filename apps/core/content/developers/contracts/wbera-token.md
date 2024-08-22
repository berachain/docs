<script setup>
  import config from '@berachain/config/constants.json';
</script>

# WBERA

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.wbera.address">{{config.contracts.wbera.address}}</a><span v-if="config.contracts.wbera.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.wbera.abi">ABI JSON</a></span></small>

**Inherits:** [Solady WETH](https://github.com/vectorized/solady/blob/main/src/tokens/WETH.sol)

## State Variables

### \_TRANSFER_EVENT_SIGNATURE

_`keccak256(bytes("Transfer(address,address,uint256)"))`._

```solidity
uint256 private constant _TRANSFER_EVENT_SIGNATURE =
    0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef;
```

### \_APPROVAL_EVENT_SIGNATURE

_`keccak256(bytes("Approval(address,address,uint256)"))`._

```solidity
uint256 private constant _APPROVAL_EVENT_SIGNATURE =
    0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925;
```

### \_TOTAL_SUPPLY_SLOT

_The storage slot for the total supply._

```solidity
uint256 private constant _TOTAL_SUPPLY_SLOT = 0x05345cdf77eb68f44c;
```

### \_BALANCE_SLOT_SEED

\*The balance slot of `owner` is given by:

````
mstore(0x0c, _BALANCE_SLOT_SEED)
mstore(0x00, owner)
let balanceSlot := keccak256(0x0c, 0x20)
```*


```solidity
uint256 private constant _BALANCE_SLOT_SEED = 0x87a211a2;
````

### \_ALLOWANCE_SLOT_SEED

\*The allowance slot of (`owner`, `spender`) is given by:

````
mstore(0x20, spender)
mstore(0x0c, _ALLOWANCE_SLOT_SEED)
mstore(0x00, owner)
let allowanceSlot := keccak256(0x0c, 0x34)
```*


```solidity
uint256 private constant _ALLOWANCE_SLOT_SEED = 0x7f5e9f20;
````

### \_NONCES_SLOT_SEED

\*The nonce slot of `owner` is given by:

````
mstore(0x0c, _NONCES_SLOT_SEED)
mstore(0x00, owner)
let nonceSlot := keccak256(0x0c, 0x20)
```*


```solidity
uint256 private constant _NONCES_SLOT_SEED = 0x38377508;
````

### \_NONCES_SLOT_SEED_WITH_SIGNATURE_PREFIX

_`(_NONCES_SLOT_SEED << 16) | 0x1901`._

```solidity
uint256 private constant _NONCES_SLOT_SEED_WITH_SIGNATURE_PREFIX = 0x383775081901;
```

### \_DOMAIN_TYPEHASH

_`keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")`._

```solidity
bytes32 private constant _DOMAIN_TYPEHASH =
    0x8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f;
```

### \_VERSION_HASH

_`keccak256("1")`._

```solidity
bytes32 private constant _VERSION_HASH =
    0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6;
```

### \_PERMIT_TYPEHASH

_`keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)")`._

```solidity
bytes32 private constant _PERMIT_TYPEHASH =
    0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

## Functions

### name

_Returns the name of the token._

```solidity
function name() public view virtual returns (string memory);
```

### symbol

_Returns the symbol of the token._

```solidity
function symbol() public view virtual returns (string memory);
```

### decimals

_Returns the decimals places of the token._

```solidity
function decimals() public view virtual returns (uint8);
```

### totalSupply

_Returns the amount of tokens in existence._

```solidity
function totalSupply() public view virtual returns (uint256 result);
```

### balanceOf

_Returns the amount of tokens owned by `owner`._

```solidity
function balanceOf(address owner) public view virtual returns (uint256 result);
```

### allowance

_Returns the amount of tokens that `spender` can spend on behalf of `owner`._

```solidity
function allowance(address owner, address spender) public view virtual returns (uint256 result);
```

### approve

_Sets `amount` as the allowance of `spender` over the caller's tokens.
Emits a `Approval` event._

```solidity
function approve(address spender, uint256 amount) public virtual returns (bool);
```

### transfer

\*Transfer `amount` tokens from the caller to `to`.
Requirements:

- `from` must at least have `amount`.
  Emits a `Transfer` event.\*

```solidity
function transfer(address to, uint256 amount) public virtual returns (bool);
```

### transferFrom

\*Transfers `amount` tokens from `from` to `to`.
Note: Does not update the allowance if it is the maximum uint256 value.
Requirements:

- `from` must at least have `amount`.
- The caller must have at least `amount` of allowance to transfer the tokens of `from`.
  Emits a `Transfer` event.\*

```solidity
function transferFrom(address from, address to, uint256 amount) public virtual returns (bool);
```

### \_constantNameHash

_For more performance, override to return the constant value
of `keccak256(bytes(name()))` if `name()` will never change._

```solidity
function _constantNameHash() internal view virtual returns (bytes32 result);
```

### nonces

_Returns the current nonce for `owner`.
This value is used to compute the signature for EIP-2612 permit._

```solidity
function nonces(address owner) public view virtual returns (uint256 result);
```

### permit

_Sets `value` as the allowance of `spender` over the tokens of `owner`,
authorized by a signed approval by `owner`.
Emits a `Approval` event._

```solidity
function permit(
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
) public virtual;
```

### DOMAIN_SEPARATOR

_Returns the EIP-712 domain separator for the EIP-2612 permit._

```solidity
function DOMAIN_SEPARATOR() public view virtual returns (bytes32 result);
```

### \_mint

_Mints `amount` tokens to `to`, increasing the total supply.
Emits a `Transfer` event._

```solidity
function _mint(address to, uint256 amount) internal virtual;
```

### \_burn

_Burns `amount` tokens from `from`, reducing the total supply.
Emits a `Transfer` event._

```solidity
function _burn(address from, uint256 amount) internal virtual;
```

### \_transfer

_Moves `amount` of tokens from `from` to `to`._

```solidity
function _transfer(address from, address to, uint256 amount) internal virtual;
```

### \_spendAllowance

_Updates the allowance of `owner` for `spender` based on spent `amount`._

```solidity
function _spendAllowance(address owner, address spender, uint256 amount) internal virtual;
```

### \_approve

_Sets `amount` as the allowance of `spender` over the tokens of `owner`.
Emits a `Approval` event._

```solidity
function _approve(address owner, address spender, uint256 amount) internal virtual;
```

### \_beforeTokenTransfer

_Hook that is called before any transfer of tokens.
This includes minting and burning._

```solidity
function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual;
```

### \_afterTokenTransfer

_Hook that is called after any transfer of tokens.
This includes minting and burning._

```solidity
function _afterTokenTransfer(address from, address to, uint256 amount) internal virtual;
```

## Events

### Transfer

_Emitted when `amount` tokens is transferred from `from` to `to`._

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);
```

### Approval

_Emitted when `amount` tokens is approved by `owner` to be used by `spender`._

```solidity
event Approval(address indexed owner, address indexed spender, uint256 amount);
```

## Errors

### TotalSupplyOverflow

_The total supply has overflowed._

```solidity
error TotalSupplyOverflow();
```

### AllowanceOverflow

_The allowance has overflowed._

```solidity
error AllowanceOverflow();
```

### AllowanceUnderflow

_The allowance has underflowed._

```solidity
error AllowanceUnderflow();
```

### InsufficientBalance

_Insufficient balance._

```solidity
error InsufficientBalance();
```

### InsufficientAllowance

_Insufficient allowance._

```solidity
error InsufficientAllowance();
```

### InvalidPermit

_The permit is invalid._

```solidity
error InvalidPermit();
```

### PermitExpired

_The permit has expired._

```solidity
error PermitExpired();
```
