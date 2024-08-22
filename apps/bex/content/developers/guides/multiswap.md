---
head:
  - - meta
    - property: og:title
      content: Multiswap Guide
  - - meta
    - name: description
      content: Example showing use of the MultiSwap router for multihop swaps
  - - meta
    - property: og:description
      content: Example showing use of the MultiSwap router for multihop swaps
---

# Using The MultiSwap Router

The `BeraCrocMultiSwap` contract is a periphery contract which serves as a router for conveniently performing a series of swaps between one or more pools. This contract abstracts many of the more advanced parameters from the `swap()` and `userCmd()` DEX functions.

It is anticipated that the MultiSwap router be used in conjunction with some form of off-chain router as the input arguments assume the user already knows the exact sequence of swaps to perform.

The contract is deployed at

bArtio: `0x21e2C0AFd058A89FCf7caf3aEA3cB84Ae977B73D`

### multiSwap

```solidity
function multiSwap (
    SwapStep[] memory _steps,
    uint128 _amount,
    uint128 _minOut
) public payable returns (uint128 out)

struct SwapStep {
    uint256 poolIdx;
    address base;
    address quote;
    bool isBuy;
}
```

**Parameters**

| Name     | Type    | Description                                                                                                                         |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| poolIdx  | uin256  | The index of the pool to use for the swap                                                                                           |
| base     | address | The token to swap from                                                                                                              |
| quote    | address | The token to swap to                                                                                                                |
| isBuy    | bool    | True if the user wants to pay base token and receive quote token. False if the user wants to receive base token and pay quote token |
| \_amount | uint128 | The quantity of input tokens to swap                                                                                                |
| \_minOut | uint128 | The minimum amount of output tokens the user is willing to receive                                                                  |

**Returns**

| Name | Type    | Description                                 |
| ---- | ------- | ------------------------------------------- |
| out  | uint128 | The quantity of tokens received by the user |

### Solidity Example

Multihop swap of `HONEY -> WBERA -> WETH` using testnet addresses

```solidity
address ROUTER = 0x21e2C0AFd058A89FCf7caf3aEA3cB84Ae977B73D;
address HONEY = 0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03;
address WBERA = 0x7507c1dc16935B82698e4C63f2746A2fCf994dF8;
address WETH = 0x6E1E9896e93F7A71ECB33d4386b49DeeD67a231A;

MultiSwap.SwapStep[] memory swap = new MultiSwap.SwapStep[](2);
swap[0] = MultiSwap.SwapStep(36000, HONEY, WBERA, true);
swap[1] = MultiSwap.SwapStep(36001, WETH, WBERA, false);

MultiSwap(ROUTER).multiSwap(swap, 1 ether, 0);
```

### JavaScript Example

```js
const { ethers } = require("ethers");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(...);

  const multiSwapABI = ... // see below

  const routerAddress = "0x21e2C0AFd058A89FCf7caf3aEA3cB84Ae977B73D";
  const multiSwap = new ethers.Contract(routerAddress, multiSwapABI, provider);

  const HONEY = "0x0E4aaF1351de4c0264C5c7056Ef3777b41BD8e03";
  const WBERA = "0x7507c1dc16935B82698e4C63f2746A2fCf994dF8";
  const WETH = "0x6E1E9896e93F7A71ECB33d4386b49DeeD67a231A";

  const swapSteps = [
    {
      poolIdx: 36000,
      base: HONEY,
      quote: WBERA,
      isBuy: true,
    },
    {
      poolIdx: 36001,
      base: WETH,
      quote: WBERA,
      isBuy: false,
    },
  ];

  const amount = ethers.utils.parseEther("1"); // 1 ether
  const minOut = 0;

  const tx = await multiSwap.multiSwap(swapSteps, amount, minOut);
  await tx.wait();
}

main();
```

#### MultiSwap ABI

```json
[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "poolIdx",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "base",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "quote",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isBuy",
            "type": "bool"
          }
        ],
        "internalType": "struct MultiSwap.SwapStep[]",
        "name": "_steps",
        "type": "tuple[]"
      },
      {
        "internalType": "uint128",
        "name": "_amount",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "_minOut",
        "type": "uint128"
      }
    ],
    "name": "multiSwap",
    "outputs": [
      {
        "internalType": "uint128",
        "name": "out",
        "type": "uint128"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
]
```
