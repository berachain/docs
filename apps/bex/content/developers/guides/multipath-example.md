---
head:
  - - meta
    - property: og:title
      content: MultiPath Guide
  - - meta
    - name: description
      content: How to understand the MultiPath callpath
  - - meta
    - property: og:description
      content: How to understand the MultiPath callpath
---

# Understanding the MultiPath Callpath

The [MultiPath](/developers/contracts/multipath) callpath provides a callpath enabling users to sequence arbitrary commands in a single transaction.

We walk through an example BEX transaction to see how MultiPath performs the multiple actions of:

1. Creating a new pool.
2. Adding liquidity to this pool.

https://bartio.beratrail.io/tx/0x113c50e59148c06aeac42a91ab11df4436a2c9b1b0febaebad93f9d905ff9256

In particular, we make sense of the input calldata of this transaction.

![userCmd Input](/assets/usercmd-input.png)

## Invocation

Following is a simplified TypeScript example of how this MultiPath call would be invoked:

```typescript
const multiPathArgs = [2, 3, initPoolCalldata, 128, mintCalldata];

const multiCmd = encodeAbiParameters(
  parseAbiParameters("uint8, uint8, bytes, uint8, bytes"),
  multiPathArgs as any[5],
);
write({
  address: crocDexAddress,
  abi: bexAbi,
  functionName: "userCmd",
  params: [6, multiCmd],
});
```

## Step 1 - MultiPath

At the highest level, `userCmd` is called with the arguments `[6, multiCmd]`. `6` corresponds to MultiPath callpath.

The decoded MultiPath `cmdCode` is `2`, corresponding to the instruction to execute [two commands](https://github.com/berachain/CrocSwap-protocol/blob/mainL2/contracts/callpaths/MultiPath.sol#L29).

## Step 2 - Pool Creation

The first `userCmd` is called with the following in MultiPath:

`callUserCmdMem(3, initPoolCalldata)`

Let's break this down:

- The callpath of `3`, corresponds to the [ColdProxy](https://github.com/berachain/CrocSwap-protocol/blob/mainL2/contracts/mixins/StorageLayout.sol#L197)
- within ColdProxy, the `cmdCode` of `initPoolCalldata` is `71`, corresponding to the code for [initializing a pool](https://github.com/berachain/CrocSwap-protocol/blob/mainL2/contracts/callpaths/ColdPath.sol#L91)

Execution then flows to the `initPool` method, where the remaining parameters are extracted for creating a new pool:

```solidity
(, address base, address quote, uint256 poolIdx, uint128 price) =
  abi.decode(initPoolCalldata, (uint8, address,address,uint256,uint128));
```

## Step 3 - Liquidity Provision

Things should be more straightforward at this point. The second MultiPath code is `128`, corresponding to the liquidity provision command [here](https://github.com/berachain/CrocSwap-protocol/blob/mainL2/contracts/callpaths/WarmPath.sol#L49).

This command is routed through `WarmPath.sol` and decoded as follows:

```solidity
(uint8 code, address base, address quote, uint256 poolIdx,
int24 bidTick, int24 askTick, uint128 liq, uint128,limitLower, uint128 limitHigher,
uint8 reserveFlags, address lpConduit) =
  abi.decode(input, (uint8,address,address,uint256,int24,int24,uint128,uint128,uint128,uint8,address));
```

The `code` here is `31`, representing the `MINT_AMBIENT_BASE_LP` command.

## Transaction Summary

### 1. Initialize Pool

The first command (code 3) calls the ColdPath contract to initialize the pool:

```
- Base token: 0x4dc594ce9752af1290402d2d9fd8eb0b6c863bd6
- Quote token: 0xb2292e4b23b21bf44455b3ffeca9d25eacc07a7c
- Pool ID: 36000
- Initial price: 1.600000000000000000
```

### 2. Add Liquidity

The second command (code 128) calls the WarmPath contract to mint liquidity (the sub-code 31 is for minting full-range liquidity):

```
- Code: 31
- Base token: 0x4dc594ce9752af1290402d2d9fd8eb0b6c863bd6
- Quote token: 0xb2292e4b23b21bf44455b3ffeca9d25eacc07a7c
- Pool ID: 36000
- Bid tick: 0
- Ask tick: 0
- Liquidity: 8223039985483627371447
- Lower limit: 1.600000000000000000
- Upper limit: 1.600000000000000000
- Reserve flags: 0
- LP Conduit: 0x2b15c8526162163a12fcda6d75f4dab13d02da5f
```

## Appendix - Calldata Decoded

We provide the decoded calldata shown in the [example transaction](https://bartio.beratrail.io/tx/0x113c50e59148c06aeac42a91ab11df4436a2c9b1b0febaebad93f9d905ff9256):

```
Function: userCmd(uint16, bytes)
MethodID: 0xa15112f9

[0]: 0000000000000000000000000000000000000000000000000000000000000006
// callpath (6 for MultiPath)

[1]: 0000000000000000000000000000000000000000000000000000000000000040
// Offset to the cmd data

[2]: 00000000000000000000000000000000000000000000000000000000000002e0
// Length of the cmd data

[3]: 0000000000000000000000000000000000000000000000000000000000000002
// Number of commands (2)

[4]: 0000000000000000000000000000000000000000000000000000000000000003
// First command code (3 for ColdPath)

[5]: 00000000000000000000000000000000000000000000000000000000000000a0
// Offset to first command data

[6]: 0000000000000000000000000000000000000000000000000000000000000080
// Length of first command data

[7]: 0000000000000000000000000000000000000000000000000000000000000160
// Offset to second command data

[8]: 00000000000000000000000000000000000000000000000000000000000000a0
// Length of second command data

[9]: 0000000000000000000000000000000000000000000000000000000000000047
// Command code for initPool (71 in decimal, which is 0x47 in hex)

[10]: 0000000000000000000000004dc594ce9752af1290402d2d9fd8eb0b6c863bd6
// Base token address for pool initialization

[11]: 000000000000000000000000b2292e4b23b21bf44455b3ffeca9d25eacc07a7c
// Quote token address for pool initialization

[12]: 0000000000000000000000000000000000000000000000000000000000008ca0
// Pool index (36000) for pool initialization

[13]: 0000000000000000000000000000000000000000000000016a09e667f3bd0000
// Initial price (1.600000000000000000 in fixed-point representation) for pool initialization

[14]: 0000000000000000000000000000000000000000000000000000000000000160
// Offset to second command data

[15]: 000000000000000000000000000000000000000000000000000000000000001f
// Second command code (31 for MINT_AMBIENT_BASE_LP in WarmPath)

[16]: 0000000000000000000000004dc594ce9752af1290402d2d9fd8eb0b6c863bd6
// Base token address for liquidity addition

[17]: 000000000000000000000000b2292e4b23b21bf44455b3ffeca9d25eacc07a7c
// Quote token address for liquidity addition

[18]: 0000000000000000000000000000000000000000000000000000000000008ca0
// Pool index (36000) for liquidity addition

[19]: 0000000000000000000000000000000000000000000000000000000000000000
// Bid tick (0) for liquidity addition

[20]: 0000000000000000000000000000000000000000000000000000000000000000
// Ask tick (0) for liquidity addition

[21]: 0000000000000000000000000000000000000000019d2d3d4200d9a7a37fb727
// Amount of liquidity to add

[22]: 0000000000000000000000000000000000000000000000016a09e667f3bd0000

// Lower price limit (1.6) for liquidity addition

[23]: 0000000000000000000000000000000000000000000000016a09e667f3bd0000
// Upper price limit (1.6) for liquidity addition

[24]: 0000000000000000000000000000000000000000000000000000000000000000

// Reserve flags (0) for liquidity addition

[25]: 0000000000000000000000002b15c8526162163a12fcda6d75f4dab13d02da5f
// LP conduit address for liquidity addition
```
