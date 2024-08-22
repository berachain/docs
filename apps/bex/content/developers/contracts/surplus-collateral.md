---
head:
  - - meta
    - property: og:title
      content: Surplus Collateral on BEX
  - - meta
    - name: description
      content: BEX allows users to deposit, withdraw, and transfer surplus collateral directly, in addition to paying and receiving surplus collateral in swap, mint, and burn calls.
  - - meta
    - property: og:description
      content: BEX allows users to deposit, withdraw, and transfer surplus collateral directly, in addition to paying and receiving surplus collateral in swap, mint, and burn calls.
---

# Surplus Collateral on BEX

BEX allows users to directly deposit, withdraw, or transfer their surplus collateral balance, in addition to paying and receiving surplus collateral in the input/output of swap, mint, and burn calls.

All surplus collateral operations use callpath `3` with specific sub-command codes.

## Deposits

To deposit surplus collateral, users should call the following user command:

```solidity
userCmd(3, abi.encode(
    73,     // Fixed sub-command code
    recv,   // address
    value,  // uint128
    token   // address
))
```

**Parameters**

| Name  | Type    | Description                                                                   |
| ----- | ------- | ----------------------------------------------------------------------------- |
| recv  | address | The address to which the surplus collateral will be credited                  |
| value | uint128 | The total amount to be deposited                                              |
| token | address | The address of the ERC20 token being deposited, or address(0) for native BERA |

Note that this will use `transferFrom()` to deposit the surplus collateral, so users must approve or permit at least the value amount of the token. For native BERA deposits, the deposit is collected from msg.value, so users must attach at least the amount matching the value parameter to the transaction.

For EIP-2612 compliant tokens, users can deposit using an off-chain permit signature, avoiding the need to approve the DEX contract:

```solidity
userCmd(3, abi.encode(
    83,         // Fixed sub-command code
    recv,       // address
    value,      // uint128
    token,      // address
    deadline,   // uint256
    v,          // uint8
    r,          // bytes32
    s           // bytes32
))
```

| Name     | Type    | Description                                                                   |
| -------- | ------- | ----------------------------------------------------------------------------- |
| recv     | address | The address to which the surplus collateral will be credited                  |
| value    | uint128 | The total amount to be deposited                                              |
| token    | address | The address of the ERC20 token being deposited, or address(0) for native BERA |
| deadline | uint256 | The deadline for the permit call                                              |
| v,r,s    |         | The EIP-712 signature to be passed directly to the token contract             |

## Withdraw

To withdraw surplus collateral, users should call the following user command:

```solidity
userCmd(3, abi.encode(
    74,     // Fixed sub-command code
    recv,   // address
    value,  // uint128
    token   // address
))
```

**Parameters**

| Name  | Type    | Description                                                                   |
| ----- | ------- | ----------------------------------------------------------------------------- |
| recv  | address | The address to which the surplus collateral will be credited                  |
| value | uint128 | The total amount to be deposited                                              |
| token | address | The address of the ERC20 token being deposited, or address(0) for native BERA |

## Transfer

Users can also bilaterally transfer surplus liquidity between owner addresses:

```solidity
userCmd(3, abi.encode(
    75,     // Fixed sub-command code
    recv,   // address
    value,  // uint128
    token   // address
))
```

**Parameters**

| Name  | Type    | Description                                                                   |
| ----- | ------- | ----------------------------------------------------------------------------- |
| recv  | address | The address to which the surplus collateral will be credited                  |
| value | uint128 | The total amount to be deposited                                              |
| token | address | The address of the ERC20 token being deposited, or address(0) for native BERA |
