---
head:
  - - meta
    - property: og:title
      content: WBERA Token Contract Reference
  - - meta
    - name: description
      content: Developer reference for the WBERA wrapped token contract
  - - meta
    - property: og:description
      content: Developer reference for the WBERA wrapped token contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# WBERA

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.tokens.wbera['mainnet-address']">{{config.contracts.tokens.wbera['mainnet-address']}}</a><span v-if="config.contracts.tokens.wbera.abi && config.contracts.tokens.wbera.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.tokens.wbera.abi">ABI JSON</a></span></small>

An ERC20 token that wraps the native BERA token, allowing it to be used in smart contracts that expect ERC20 tokens. Users can deposit BERA to receive WBERA and withdraw BERA by burning WBERA. The contract can receive BERA directly, which will automatically wrap it into WBERA for the sender.

**Inherits:**
WETH (which inherits ERC20)

## View Functions

### name

Returns the name of the token: "Wrapped Bera". Overrides WETH implementation.

```solidity
function name() public pure override returns (string memory);
```

### symbol

Returns the symbol of the token: "WBERA". Overrides WETH implementation.

```solidity
function symbol() public pure override returns (string memory);
```

### allowance

Returns the remaining number of tokens that `spender` is allowed to spend on behalf of `owner`. Inherited from ERC20.

```solidity
function allowance(address owner, address spender) public view virtual returns (uint256);
```

### balanceOf

Returns the amount of tokens owned by an account. Inherited from ERC20.

```solidity
function balanceOf(address account) public view virtual returns (uint256);
```

### decimals

Returns the number of decimals used for token amounts. Always returns 18 for compatibility with BERA. Inherited from ERC20.

```solidity
function decimals() public view virtual returns (uint8);
```

### totalSupply

Returns the total amount of tokens in existence. Inherited from ERC20.

```solidity
function totalSupply() public view virtual returns (uint256);
```

## Functions

### deposit

Deposits BERA and mints WBERA tokens to the sender. Can also be triggered by sending BERA directly to the contract. Inherited from WETH.

```solidity
function deposit() public payable;
```

### withdraw

Burns WBERA tokens from the sender and sends the equivalent amount of BERA back. Inherited from WETH.

**Errors:**

- `ETHTransferFailed`: If the BERA transfer back to the sender fails

```solidity
function withdraw(uint256 amount) public;
```

### receive

Allows the contract to receive BERA directly, automatically wrapping it into WBERA for the sender. Inherited from WETH.

```solidity
receive() external payable;
```

## Events

### Transfer {#event-transfer}

Emitted when tokens are transferred between accounts. Inherited from ERC20.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

### Approval {#event-approval}

Emitted when an account approves another account to spend tokens on their behalf. Inherited from ERC20.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

## Errors

### ETHTransferFailed

```solidity
error ETHTransferFailed();
```

Thrown when the BERA transfer fails during withdrawal. Inherited from WETH.
