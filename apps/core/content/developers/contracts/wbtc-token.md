<script setup>
  import config from '@berachain/config/constants.json';
</script>

# WBTC

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.wbtc.address">{{config.contracts.wbtc.address}}</a><span v-if="config.contracts.wbtc.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.wbtc.abi">ABI JSON</a></span></small>

## State Variables

### EIP712_REVISION

```solidity
bytes public constant EIP712_REVISION = bytes("1");
```

### EIP712_DOMAIN

```solidity
bytes32 internal constant EIP712_DOMAIN =
    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
```

### PERMIT_TYPEHASH

```solidity
bytes32 public constant PERMIT_TYPEHASH =
    keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
```

### \_nonces

```solidity
mapping(address => uint256) internal _nonces;
```

### DOMAIN_SEPARATOR

```solidity
bytes32 public DOMAIN_SEPARATOR;
```

## Functions

### constructor

```solidity
constructor(string memory name, string memory symbol, uint8 decimals, address owner)
    ERC20(name, symbol);
```

### permit

Allow passing a signed message to approve spending

_implements the permit function as for
https://github.com/ethereum/EIPs/blob/8a34d644aacf0f9f8f00815307fd7dd5da07655f/EIPS/eip-2612.md_

```solidity
function permit(
    address owner,
    address spender,
    uint256 value,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
) external override;
```

**Parameters**

| Name       | Type      | Description                                                |
| ---------- | --------- | ---------------------------------------------------------- |
| `owner`    | `address` | The owner of the funds                                     |
| `spender`  | `address` | The spender                                                |
| `value`    | `uint256` | The amount                                                 |
| `deadline` | `uint256` | The deadline timestamp, type(uint256).max for max deadline |
| `v`        | `uint8`   | Signature param                                            |
| `r`        | `bytes32` | Signature param                                            |
| `s`        | `bytes32` | Signature param                                            |

### mint

_Function to mint tokens_

```solidity
function mint(uint256 value) public virtual onlyOwner returns (bool);
```

**Parameters**

| Name    | Type      | Description                   |
| ------- | --------- | ----------------------------- |
| `value` | `uint256` | The amount of tokens to mint. |

**Returns**

| Name     | Type   | Description                                               |
| -------- | ------ | --------------------------------------------------------- |
| `<none>` | `bool` | A boolean that indicates if the operation was successful. |

### mint

_Function to mint tokens to address_

```solidity
function mint(address account, uint256 value) public virtual onlyOwner returns (bool);
```

**Parameters**

| Name      | Type      | Description                   |
| --------- | --------- | ----------------------------- |
| `account` | `address` | The account to mint tokens.   |
| `value`   | `uint256` | The amount of tokens to mint. |

**Returns**

| Name     | Type   | Description                                               |
| -------- | ------ | --------------------------------------------------------- |
| `<none>` | `bool` | A boolean that indicates if the operation was successful. |

### nonces

```solidity
function nonces(address owner) public view returns (uint256);
```
