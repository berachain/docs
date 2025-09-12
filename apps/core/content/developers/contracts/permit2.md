---
head:
  - - meta
    - property: og:title
      content: Permit2 Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Permit2 contract
  - - meta
    - property: og:description
      content: Developer reference for the Permit2 contract
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Permit2

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.other.permit2['mainnet-address']">{{config.contracts.other.permit2['mainnet-address']}}</a><span v-if="config.contracts.other.permit2.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.other.permit2.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/Uniswap/permit2/blob/main/src/Permit2.sol)

Permit2 enables advanced token approval patterns, allowing for more flexible and secure token transfers through signatures.

## State Variables

### allowance

Maps users to tokens to spender addresses and information about the approval on the token.

```solidity
mapping(address => mapping(address => mapping(address => PackedAllowance))) public allowance
```

### nonceBitmap

A map from token owner address and a caller specified word index to a bitmap. Used to set bits in the bitmap to prevent against signature replay protection.

```solidity
mapping(address => mapping(uint256 => uint256)) public nonceBitmap
```

## Functions

### approve

Approves the spender to use up to amount of the specified token up until the expiration.

```solidity
function approve(address token, address spender, uint160 amount, uint48 expiration) external
```

### invalidateNonces

Invalidate nonces for a given (token, spender) pair.

```solidity
function invalidateNonces(address token, address spender, uint48 newNonce) external
```

### invalidateUnorderedNonces

Invalidates the bits specified in mask for the bitmap at the word position.

```solidity
function invalidateUnorderedNonces(uint256 wordPos, uint256 mask) external
```

### lockdown

Enables performing a "lockdown" of the sender's Permit2 identity by batch revoking approvals.

```solidity
function lockdown(TokenSpenderPair[] calldata approvals) external
```

### permit

Permit a spender to a given amount of the owners token via the owner's EIP-712 signature.

```solidity
function permit(address owner, PermitSingle memory permitSingle, bytes calldata signature) external
```

### permit

Permit a spender to a given amount of the owners token via the owner's EIP-712 signature.

```solidity
function permit(address owner, PermitBatch memory permitBatch, bytes calldata signature) external
```

### permitTransferFrom

Transfers a token using a signed permit message.

```solidity
function permitTransferFrom(
    PermitTransferFrom memory permit,
    SignatureTransferDetails calldata transferDetails,
    address owner,
    bytes calldata signature
) external
```

### permitTransferFrom

Transfers a token using a signed permit message.

```solidity
function permitTransferFrom(
    PermitBatchTransferFrom memory permit,
    SignatureTransferDetails[] calldata transferDetails,
    address owner,
    bytes calldata signature
) external
```

### permitWitnessTransferFrom

Transfers a token using a signed permit message.

```solidity
function permitWitnessTransferFrom(
    PermitTransferFrom memory permit,
    SignatureTransferDetails calldata transferDetails,
    address owner,
    bytes32 witness,
    string calldata witnessTypeString,
    bytes calldata signature
) external
```

### permitWitnessTransferFrom

Transfers a token using a signed permit message.

```solidity
function permitWitnessTransferFrom(
    PermitBatchTransferFrom memory permit,
    SignatureTransferDetails[] calldata transferDetails,
    address owner,
    bytes32 witness,
    string calldata witnessTypeString,
    bytes calldata signature
) external
```

### transferFrom

Transfer approved tokens from one address to another.

```solidity
function transferFrom(address from, address to, uint160 amount, address token) external
```

### transferFrom

Transfer approved tokens from one address to another.

```solidity
function transferFrom(AllowanceTransferDetails[] calldata transferDetails) external
```
