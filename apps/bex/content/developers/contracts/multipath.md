---
head:
  - - meta
    - property: og:title
      content: MultiPath Contract Interface
  - - meta
    - name: description
      content: Technical reference of BEX multipath contract interface
  - - meta
    - property: og:description
      content: Technical reference of BEX multipath contract interface
---

# MultiPath Calls

# MultiPath

The `MultiPath.sol` contract provides a callpath that enables users to sequence arbitrary commands across multiple callpaths into a single `userCmd` call.

MultiPath operations use callpath index 6:

```solidity
userCmd(6, abi.encode(
    cmdCode,      // uint8
    code1,        // uint8
    cmd1,         // bytes
    code2         // uint8
    cmd2,         // bytes
    ...
))
```

**Parameters**

| Name      | Type  | Description                              |
| --------- | ----- | ---------------------------------------- |
| cmdCode   | uint8 | The number of `userCmds` to make         |
| code_x    | uint8 | The callpath of the x'th command         |
| command_x | bytes | The encoded calldata of the x'th command |

## Usage

Through the main [DEX contract](/developers/contracts/dex), users can interact with MultiPath by calling the `userCmd` function with the following two arguments:

- `callpath` set to `6`, which routes
- the `cmd` to MultiPath for further processing.

The `cmd` argument is a bytestring that encodes the sequence of commands to execute across multiple callpaths. MultiPath supports 2-5 sequential calls, and they are encoded in the following manner, depending on the number of calls:

- 2 calls: `abi.encode(2, callpath1, cmd1, callpath2, cmd2)`
- 3 calls: `abi.encode(3, callpath1, cmd1, callpath2, cmd2, callpath3, cmd3)`
- etc...
