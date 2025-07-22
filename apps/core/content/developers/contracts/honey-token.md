<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Honey

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.tokens.honey['mainnet-address']">{{config.contracts.tokens.honey['mainnet-address']}}</a><span v-if="config.contracts.tokens.honey.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.tokens.honey.abi">ABI JSON</a></span></small>

This is the ERC20 token representation of Berachain's native stablecoin, HONEY.

## Functions

### mint

Mint Honey to the receiver.

_Only the factory can call this function._

```solidity
function mint(address to, uint256 amount) external onlyFactory;
```

**Parameters**

| Name     | Type      | Description                  |
| -------- | --------- | ---------------------------- |
| `to`     | `address` | The receiver address.        |
| `amount` | `uint256` | The amount of Honey to mint. |

### burn

Burn Honey from an account.

_Only the factory can call this function._

```solidity
function burn(address from, uint256 amount) external onlyFactory;
```

**Parameters**

| Name     | Type      | Description                     |
| -------- | --------- | ------------------------------- |
| `from`   | `address` | The account to burn Honey from. |
| `amount` | `uint256` | The amount of Honey to burn.    |

### name

```solidity
function name() public pure override returns (string memory);
```

### symbol

```solidity
function symbol() public pure override returns (string memory);
```

### decimals

Returns the number of decimals used to get its user representation.

For example, if `decimals` equals `2`, a balance of `505` tokens should
be displayed to a user as `5,05` (`505 / 10 ** 2`).

```solidity
function decimals() public view returns (uint8);
```

### totalSupply

Returns the amount of tokens in existence.

```solidity
function totalSupply() public view override returns (uint256);
```

### balanceOf

Returns the amount of tokens owned by `owner`.

```solidity
function balanceOf(address account) public view override returns (uint256);
```

### transfer

Transfer `amount` tokens from the caller to `to`.

- the caller must have a balance of at least `amount`

```solidity
function transfer(address recipient, uint256 amount) public virtual override returns (bool);
```

### allowance

Returns the amount of tokens that `spender` can spend on behalf of `owner`.

```solidity
function allowance(address owner, address spender) public view virtual override returns (uint256);
```

### approve

Sets `amount` as the allowance of `spender` over the caller's tokens.

```solidity
function approve(address spender, uint256 amount) public virtual override returns (bool);
```

### transferFrom

Transfers `amount` tokens from `from` to `to`.

- `sender` must have a balance of at least `amount`
- the caller must have allowance for `sender`'s tokens of at least
  `amount`

```solidity
function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool);
```
