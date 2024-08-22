---
head:
  - - meta
    - property: og:title
      content: Relayer Calls on BEX
  - - meta
    - name: description
      content: Relayer calls on BEX allow end-users to sign commands using an off-chain EIP-712 signature, which can then be executed inside an Ethereum transaction sent by a third-party relayer, with the option to "tip" the relayer for the gas cost.
  - - meta
    - property: og:description
      content: Relayer calls on BEX allow end-users to sign commands using an off-chain EIP-712 signature, which can then be executed inside an Ethereum transaction sent by a third-party relayer, with the option to "tip" the relayer for the gas cost.
---

# Relayer Calls on BEX

Relayer calls allow an end-user to sign a BEX command using an off-chain EIP-712 signature. This signed command can then be executed inside an Ethereum transaction sent by a third-party relayer. The user can optionally "tip" the relayer to compensate for the gas cost.

```solidity
function userCmdRelayer(
    uint16 callpathIdx,
    bytes cmd,
    bytes conds,
    bytes tip,
    bytes signature
) returns (bytes memory)
```

**Parameters**

| Parameter   | Type   | Description                                                                                                      |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| callpathIdx | uint16 | The same parameter in standard `userCmd` and will behave identically                                             |
| cmd         | bytes  | The same parameter in standard `userCmd` and will behave identically                                             |
| conds       | bytes  | A bytestring encoded in a fixed format that governs the conditions of the relayer call (explained below)         |
| tip         | bytes  | A bytestring that can be empty or set using a fixed encoding scheme to specify the relayer tip (explained below) |
| signature   | bytes  | The EIP-712 signature of the command and conditions (explained below)                                            |

### Conds

The conds bytestring is encoded as follows:

```solidity
conds = abi.encode(
    deadline, // uint48
    alive,    // uint48
    salt,     // bytes32
    nonce,    // uint32
    relayer   // address
)
```

**Parameters**
| Parameter | Type | Description |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| deadline | uint48| The timestamp **before** which the transaction must occur, otherwise it will fail|
|alive| uint48| The timestamp **after** which the transaction must occur, otherwise it will fail|
|salt| bytes32| A unique value that defines a unique nonce tracking (starting at 0), allowing for multidimensional nonces|
|nonce| uint32| A user-specific relayer nonce that increments by one on every relayer call, preventing replay attacks|
|relayer| address| The address of the relayer that can execute the command; if set to address(0), the condition is unenforced|

### Tip

The tip bytestring can either be empty (no tip paid) or set using the following fixed encoding scheme:

```solidity
tip = abi.encode(
    token,  // address
    amount, // uint128
    recv    // address
)
```

**Parameters**
| Parameter | Type | Description |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token | address | The address of the token in which the tip is being paid |
| amount | uint128 | The total amount of the token being paid as a tip to the relayer |
| recv | address | The recipient of the relayer tip, which can be a specific address or a magic value (`address(256)` for `msg.sender` or `address(512)` for `tx.origin`) |

Tips are always paid from the surplus collateral balance of the end-user. If the end-user has insufficient surplus collateral, the contract call will revert.

## signature

The signature is the EIP-712 signature of the command and conditions, constructed from the standard v, r, and s recovery signature:

```solidity
signature = abi.encode(
    v, // uint8
    r, // uint256
    s  // uint256
)
```

The EIP-712 domain hash is constructed as:

```javascript
const domain = {
    name: "CrocSwap",
    chainId: [chain ID],
    verifyingContract: [BEXSwapDex contract address],
    version: "1.0"
};
```

The typed content hash is constructed as:

```javascript
CrocRelayerCall: [
  { name: "callpath", type: "uint8" },
  { name: "cmd", type: "bytes" },
  { name: "conds", type: "bytes" },
  { name: "tip", type: "bytes" },
];
```

### Example Signature Construction in Javascript/Ethersjs

```typescript
const { ethers } = require("ethers");

const signer = new ethers.Wallet("0x... private key ...");

const domain = {
  name: "CrocSwap",
  version: "1.0",
  chainId: 31337,
  verifyingContract: BEX_DEX_CONTRACT_ADDRESS,
};

const types = {
  CrocRelayerCall: [
    { name: "callpath", type: "uint8" },
    { name: "cmd", type: "bytes" },
    { name: "conds", type: "bytes" },
    { name: "tip", type: "bytes" },
  ],
};

const value = {
  callpath: callpath,
  cmd: cmd,
  conds: conds,
  tip: tip,
};

const signature = (await signer._signTypedData(domain, types, value)).substring(
  2
);

const r = "0x" + signature.substring(0, 64);
const s = "0x" + signature.substring(64, 128);
const v = parseInt(signature.substring(128, 130), 16);

const abiCoder = new ethers.utils.AbiCoder();
const encodedSignature = abiCoder.encode(
  ["uint8", "bytes32", "bytes32"],
  [v, r, s]
);
```
