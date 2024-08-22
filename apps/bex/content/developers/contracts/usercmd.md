---
head:
  - - meta
    - property: og:title
      content: userCmd Callpaths
  - - meta
    - name: description
      content: Reference for calling userCmd with different callpaths
  - - meta
    - property: og:description
      content: Reference for calling userCmd with different callpaths
---

# userCmd Callpaths

The standard entry-point to the DEX contract is through `userCmd()`, following the format below:

```solidity
function userCmd(
    uint16 callpath,
    bytes cmd
) public payable returns (bytes)
```

`callpath` is a 16-bit index that identifies the specific proxy contract the command call is forwarded to through `DELEGATECALL`.

Following are some commonly used callpath indices:

| callpath | Description            |
| -------- | ---------------------- |
| 1        | Vanilla swaps          |
| 3        | Policy implementations |
| 4        | Long form orders       |
| 5        | Microcall orders       |
| 6        | Multicall orders       |
| 128      | LP operations          |

`cmd` is the raw bytestring that's passed unmodified to the specific callpath. The format of this bytestring is dependent on the specific callpath.

Every call returns the raw bytestring returned by the raw callpath, which may or may not be empty.
