---
head:
  - - meta
    - property: og:title
      content: DEX Contract Interface
  - - meta
    - name: description
      content: Technical reference of main BEX contract interface.
  - - meta
    - property: og:description
      content: Technical reference of main BEX contract interface.
---

# DEX Contract Interface

The DEX contract (`CrocSwapDex`) is the main entrypoint for interacting with BEX. It acts as a proxy to the various sidecar contracts that implement the different functionalities.

The contract is deployed on bArtio Testnet at: [0xAB827b1Cc3535A9e549EE387A6E9C3F02F481B49](https://bartio.beratrail.io/address/0xAB827b1Cc3535A9e549EE387A6E9C3F02F481B49)

The `CrocSwapDex` ABI exposes six Solidity methods:

### swap

```solidity
function swap(
    address base,
    address quote,
    uint256 poolIdx,
    bool isBuy,
    bool inBaseQty,
    uint128 qty,
    uint16 tip,
    uint128 limitPrice,
    uint128 minOut,
    uint8 reserveFlags
) public payable returns (int128 baseQuote, int128 quoteFlow)
```

The primary "vanilla" Solidity method that accepts standard argument types. Because swaps are the most common operation, this method runs purely in the "hot-path" without any calls to proxy sidecar contracts.

**Parameters**

| Name         | Type    | Description                                                                                                                          |
| ------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| base         | address | The base token in the swap pair.                                                                                                     |
| quote        | address | The quote token in the swap pair.                                                                                                    |
| poolIdx      | uint256 | The index of the pool to swap in.                                                                                                    |
| isBuy        | bool    | True if the user wants to pay base token and receive quote token. False if the user wants to receive base token and pay quote token. |
| inBaseQty    | bool    | If true, the qty parameter is denominated in base tokens. If false, it's denominated in quote tokens.                                |
| qty          | uint128 | The quantity of tokens to swap.                                                                                                      |
| tip          | uint16  | The tip amount for the relayer executing the swap.                                                                                   |
| limitPrice   | uint128 | Represents the worse possible price the user is willing to accept. If buying this represents an upper bound.                         |
| minOut       | uint128 | The minimum amount of output tokens the user is willing to receive.                                                                  |
| reserveFlags | uint8   | Flags indicating whether to use the user's surplus collateral balance for the base and/or quote token.                               |

**Returns**

| Name      | Type   | Description                                                                                         |
| --------- | ------ | --------------------------------------------------------------------------------------------------- |
| baseQuote | int128 | The net flow of base tokens. Negative if paid from the pool to the user, positive if the opposite.  |
| quoteFlow | int128 | The net flow of quote tokens. Negative if paid from the pool to the user, positive if the opposite. |

### userCmd

```solidity
function userCmd(
    uint16 callpath,
    bytes cmd
) public payable returns (bytes)
```

Single point of entry for all possible user commands. Accepts a callpath index which maps to the specific proxy sidecar contract and an arbitrary byte string which is specifically structured for that specific sidecar.

**Parameters**

| Name     | Type   | Description                                                                                                   |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| callpath | uint16 | The callpath index that maps to the specific proxy sidecar contract.                                          |
| cmd      | bytes  | The arbitrary byte string containing the command data, structured specifically for the corresponding sidecar. |

**Returns**

| Type  | Description                                       |
| ----- | ------------------------------------------------- |
| bytes | The output data returned by the executed command. |

### userCmdRelayer

```solidity
function userCmdRelayer(
    uint16 callpath,
    bytes cmd,
    bytes conds,
    bytes relayerTip,
    bytes signature
) public payable returns (bytes output)
```

Identical to userCmd() but executes a command signed by a user off-chain using the EIP-712 standard.

**Parameters**

| Name       | Type   | Description                                                                                                   |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| callpath   | uint16 | The callpath index that maps to the specific proxy sidecar contract.                                          |
| cmd        | bytes  | The arbitrary byte string containing the command data, structured specifically for the corresponding sidecar. |
| conds      | bytes  | The conditions for executing the relayed command.                                                             |
| relayerTip | bytes  | The tip for the relayer executing the command.                                                                |
| signature  | bytes  | The EIP-712 signature of the user authorizing the relayed command.                                            |

**Returns**

| Name   | Type  | Description                                       |
| ------ | ----- | ------------------------------------------------- |
| output | bytes | The output data returned by the executed command. |

### userCmdRouter

```solidity
function userCmdRouter(
    uint16 callpath,
    bytes cmd,
    address client
) public payable returns (bytes)
```

Identical to userCmd() but called by an external router contract on behalf of an end user. The user must have previously approved the router contract.

**Parameters**

| Name     | Type    | Description                                                                                                   |
| -------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| callpath | uint16  | The callpath index that maps to the specific proxy sidecar contract.                                          |
| cmd      | bytes   | The arbitrary byte string containing the command data, structured specifically for the corresponding sidecar. |
| client   | address | The address of the end user on whose behalf the router is executing the command.                              |

**Returns**

| Type  | Description                                       |
| ----- | ------------------------------------------------- |
| bytes | The output data returned by the executed command. |

### protocolCmd

```solidity
function protocolCmd(
    uint16 callpath,
    bytes cmd,
    bool sudo
) public payable
```

Executes a protocol administrative command. This call can only be made by the protocol authority contract.

**Parameters**

| Name     | Type   | Description                                                                                                   |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| callpath | uint16 | The callpath index that maps to the specific proxy sidecar contract.                                          |
| cmd      | bytes  | The arbitrary byte string containing the command data, structured specifically for the corresponding sidecar. |
| sudo     | bool   | Indicates if the command should be executed with superuser privileges.                                        |

### readSlot

```solidity
function readSlot(uint256 slot) public view returns (uint256 data)
```

Low-level view method for reading an arbitrary slot location in the BEX contract storage. This method only accepts the raw slot location. In most cases, ordinary users are better off using the higher-level [Query](/developers/query-contracts/query) contract to query information.

**Parameters**

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| slot | uint256 | The raw storage slot location to read from. |

**Returns**

| Name | Type    | Description                                             |
| ---- | ------- | ------------------------------------------------------- |
| data | uint256 | The data stored at the specified storage slot location. |
