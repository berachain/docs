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

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Using The MultiSwap Router

The `BeraCrocMultiSwap` contract is a periphery contract which serves as a router for conveniently performing a series of swaps between one or more pools. This contract abstracts many of the more advanced parameters from the `swap()` and `userCmd()` DEX functions.

It is anticipated that the MultiSwap router be used in conjunction with some form of off-chain router as the input arguments assume the user already knows the exact sequence of swaps to perform.

The contract is deployed at

bArtio Testnet: `{{config.contracts.beraCrocMultiSwap.address}}`

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
| poolIdx  | uint256 | The index of the pool to use for the swap                                                                                           |
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

```solidity-vue
address ROUTER = {{config.contracts.beraCrocMultiSwap.address}};
address HONEY = {{config.contracts.honey.address}};
address WBERA = {{config.contracts.wbera.address}};
address WETH = {{config.contracts.weth.address}};

MultiSwap.SwapStep[] memory swap = new MultiSwap.SwapStep[](2);
swap[0] = MultiSwap.SwapStep(36000, HONEY, WBERA, true);
swap[1] = MultiSwap.SwapStep(36001, WETH, WBERA, false);

MultiSwap(ROUTER).multiSwap(swap, 1 ether, 0);
```

### JavaScript Example

```js-vue
const { ethers } = require("ethers");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(...);

  const multiSwapABI = ... // see below

  const routerAddress = "{{config.contracts.beraCrocMultiSwap.address}}";
  const multiSwap = new ethers.Contract(routerAddress, multiSwapABI, provider);

  const HONEY = "{{config.contracts.honey.address}}";
  const WBERA = "{{config.contracts.wbera.address}}";
  const WETH = "{{config.contracts.weth.address}}";

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
