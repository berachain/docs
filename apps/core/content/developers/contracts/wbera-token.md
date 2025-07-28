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

WBERA is the wrapped version of BERA, Berachain's native token, enabling ERC20 functionality.

**Inherits:**
IWETH, ERC20, ERC20Permit

_This contract wraps BERA into an ERC20 token that can be used in smart contracts._

## View Functions

### allowance

```solidity
function allowance(address owner, address spender) public view virtual override returns (uint256);
```

### balanceOf

```solidity
function balanceOf(address account) public view virtual override returns (uint256);
```

### decimals

```solidity
function decimals() public view virtual override returns (uint8);
```

### name

```solidity
function name() public view virtual override returns (string memory);
```

### symbol

```solidity
function symbol() public view virtual override returns (string memory);
```

### totalSupply

```solidity
function totalSupply() public view virtual override returns (uint256);
```

## Functions

### deposit

Wraps BERA into WBERA tokens.

**Emits:**

- [Deposit](#event-deposit)

```solidity
function deposit() public payable;
```

### withdraw

Unwraps WBERA tokens back to BERA.

**Emits:**

- [Withdrawal](#event-withdrawal)

```solidity
function withdraw(uint256 amount) external;
```

## Events

### Approval {#event-approval}

Emitted when an approval is made.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

### Deposit {#event-deposit}

Emitted when BERA is deposited and WBERA is minted.

```solidity
event Deposit(address indexed account, uint256 amount);
```

### Transfer {#event-transfer}

Emitted when tokens are transferred.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

### Withdrawal {#event-withdrawal}

Emitted when WBERA is burned and BERA is withdrawn.

```solidity
event Withdrawal(address indexed account, uint256 amount);
```
