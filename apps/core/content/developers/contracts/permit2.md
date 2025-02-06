<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Permit2

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.permit2.address">{{config.mainnet.contracts.permit2.address}}</a><span v-if="config.mainnet.contracts.permit2.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.mainnet.contracts.permit2.abi">ABI JSON</a></span></small>

Permit2 handles signature-based transfers in SignatureTransfer and allowance-based transfers in AllowanceTransfer.

_Users must approve Permit2 before calling any of the transfer functions._

## State Variables

### allowance

Maps users to tokens to spender addresses and information about the approval on the token

_Indexed in the order of token owner address, token address, spender address_

_The stored word saves the allowed amount, expiration on the allowance, and nonce_

```solidity
mapping(address => mapping(address => mapping(address => PackedAllowance))) public allowance;
```

### nonceBitmap

A map from token owner address and a caller specified word index to a bitmap. Used to set bits in the bitmap to prevent against signature replay protection

_Uses unordered nonces so that permit messages do not need to be spent in a certain order_

```solidity
mapping(address => mapping(uint256 => uint256)) public nonceBitmap;
```

## Functions

### permitTransferFrom

Transfers a token using a signed permit message

_Reverts if the requested amount is greater than the permitted signed amount_

```solidity
function permitTransferFrom(
    PermitTransferFrom memory permit,
    SignatureTransferDetails calldata transferDetails,
    address owner,
    bytes calldata signature
) external;
```

**Parameters**

| Name              | Type                       | Description                                                      |
| ----------------- | -------------------------- | ---------------------------------------------------------------- |
| `permit`          | `PermitTransferFrom`       | The permit data signed over by the owner                         |
| `transferDetails` | `SignatureTransferDetails` | The spender's requested transfer details for the permitted token |
| `owner`           | `address`                  | The owner of the tokens to transfer                              |
| `signature`       | `bytes`                    | The signature to verify                                          |

### permitWitnessTransferFrom

Transfers a token using a signed permit message

_The witness type string must follow EIP712 ordering of nested structs and must include the TokenPermissions type definition_

```solidity
function permitWitnessTransferFrom(
    PermitTransferFrom memory permit,
    SignatureTransferDetails calldata transferDetails,
    address owner,
    bytes32 witness,
    string calldata witnessTypeString,
    bytes calldata signature
) external;
```

**Parameters**

| Name                | Type                       | Description                                                           |
| ------------------- | -------------------------- | --------------------------------------------------------------------- |
| `permit`            | `PermitTransferFrom`       | The permit data signed over by the owner                              |
| `transferDetails`   | `SignatureTransferDetails` | The spender's requested transfer details for the permitted token      |
| `owner`             | `address`                  | The owner of the tokens to transfer                                   |
| `witness`           | `bytes32`                  | Extra data to include when checking the user signature                |
| `witnessTypeString` | `string`                   | The EIP-712 type definition for remaining string stub of the typehash |
| `signature`         | `bytes`                    | The signature to verify                                               |

### \_permitTransferFrom

Transfers a token using a signed permit message.

```solidity
function _permitTransferFrom(
    PermitTransferFrom memory permit,
    SignatureTransferDetails calldata transferDetails,
    address owner,
    bytes32 dataHash,
    bytes calldata signature
) private;
```

**Parameters**

| Name              | Type                       | Description                                                        |
| ----------------- | -------------------------- | ------------------------------------------------------------------ |
| `permit`          | `PermitTransferFrom`       | The permit data signed over by the owner                           |
| `transferDetails` | `SignatureTransferDetails` | The spender's requested transfer details for the permitted token   |
| `owner`           | `address`                  | The owner of the tokens to transfer                                |
| `dataHash`        | `bytes32`                  | The EIP-712 hash of permit data to include when checking signature |
| `signature`       | `bytes`                    | The signature to verify                                            |

### permitTransferFrom

Transfers a token using a signed permit message

_Reverts if the requested amount is greater than the permitted signed amount_

```solidity
function permitTransferFrom(
    PermitBatchTransferFrom memory permit,
    SignatureTransferDetails[] calldata transferDetails,
    address owner,
    bytes calldata signature
) external;
```

**Parameters**

| Name              | Type                         | Description                                                      |
| ----------------- | ---------------------------- | ---------------------------------------------------------------- |
| `permit`          | `PermitBatchTransferFrom`    | The permit data signed over by the owner                         |
| `transferDetails` | `SignatureTransferDetails[]` | The spender's requested transfer details for the permitted token |
| `owner`           | `address`                    | The owner of the tokens to transfer                              |
| `signature`       | `bytes`                      | The signature to verify                                          |

### permitWitnessTransferFrom

Transfers a token using a signed permit message

_The witness type string must follow EIP712 ordering of nested structs and must include the TokenPermissions type definition_

```solidity
function permitWitnessTransferFrom(
    PermitBatchTransferFrom memory permit,
    SignatureTransferDetails[] calldata transferDetails,
    address owner,
    bytes32 witness,
    string calldata witnessTypeString,
    bytes calldata signature
) external;
```

**Parameters**

| Name                | Type                         | Description                                                           |
| ------------------- | ---------------------------- | --------------------------------------------------------------------- |
| `permit`            | `PermitBatchTransferFrom`    | The permit data signed over by the owner                              |
| `transferDetails`   | `SignatureTransferDetails[]` | The spender's requested transfer details for the permitted token      |
| `owner`             | `address`                    | The owner of the tokens to transfer                                   |
| `witness`           | `bytes32`                    | Extra data to include when checking the user signature                |
| `witnessTypeString` | `string`                     | The EIP-712 type definition for remaining string stub of the typehash |
| `signature`         | `bytes`                      | The signature to verify                                               |

### \_permitTransferFrom

Transfers tokens using a signed permit messages

```solidity
function _permitTransferFrom(
    PermitBatchTransferFrom memory permit,
    SignatureTransferDetails[] calldata transferDetails,
    address owner,
    bytes32 dataHash,
    bytes calldata signature
) private;
```

**Parameters**

| Name              | Type                         | Description                                                        |
| ----------------- | ---------------------------- | ------------------------------------------------------------------ |
| `permit`          | `PermitBatchTransferFrom`    | The permit data signed over by the owner                           |
| `transferDetails` | `SignatureTransferDetails[]` |                                                                    |
| `owner`           | `address`                    | The owner of the tokens to transfer                                |
| `dataHash`        | `bytes32`                    | The EIP-712 hash of permit data to include when checking signature |
| `signature`       | `bytes`                      | The signature to verify                                            |

### invalidateUnorderedNonces

Invalidates the bits specified in mask for the bitmap at the word position

_The wordPos is maxed at type(uint248).max_

```solidity
function invalidateUnorderedNonces(uint256 wordPos, uint256 mask) external;
```

**Parameters**

| Name      | Type      | Description                                                              |
| --------- | --------- | ------------------------------------------------------------------------ |
| `wordPos` | `uint256` | A number to index the nonceBitmap at                                     |
| `mask`    | `uint256` | A bitmap masked against msg.sender's current bitmap at the word position |

### bitmapPositions

Returns the index of the bitmap and the bit position within the bitmap. Used for unordered nonces

_The first 248 bits of the nonce value is the index of the desired bitmap_

_The last 8 bits of the nonce value is the position of the bit in the bitmap_

```solidity
function bitmapPositions(uint256 nonce) private pure returns (uint256 wordPos, uint256 bitPos);
```

**Parameters**

| Name    | Type      | Description                                            |
| ------- | --------- | ------------------------------------------------------ |
| `nonce` | `uint256` | The nonce to get the associated word and bit positions |

**Returns**

| Name      | Type      | Description                                     |
| --------- | --------- | ----------------------------------------------- |
| `wordPos` | `uint256` | The word position or index into the nonceBitmap |
| `bitPos`  | `uint256` | The bit position                                |

### \_useUnorderedNonce

Checks whether a nonce is taken and sets the bit at the bit position in the bitmap at the word position

```solidity
function _useUnorderedNonce(address from, uint256 nonce) internal;
```

**Parameters**

| Name    | Type      | Description                     |
| ------- | --------- | ------------------------------- |
| `from`  | `address` | The address to use the nonce at |
| `nonce` | `uint256` | The nonce to spend              |

### approve

Approves the spender to use up to amount of the specified token up until the expiration

_The packed allowance also holds a nonce, which will stay unchanged in approve_

```solidity
function approve(address token, address spender, uint160 amount, uint48 expiration) external;
```

**Parameters**

| Name         | Type      | Description                                            |
| ------------ | --------- | ------------------------------------------------------ |
| `token`      | `address` | The token to approve                                   |
| `spender`    | `address` | The spender address to approve                         |
| `amount`     | `uint160` | The approved amount of the token                       |
| `expiration` | `uint48`  | The timestamp at which the approval is no longer valid |

### permit

Permit a spender to a given amount of the owners token via the owner's EIP-712 signature

_May fail if the owner's nonce was invalidated in-flight by invalidateNonce_

```solidity
function permit(address owner, PermitSingle memory permitSingle, bytes calldata signature)
    external;
```

**Parameters**

| Name           | Type           | Description                                                    |
| -------------- | -------------- | -------------------------------------------------------------- |
| `owner`        | `address`      | The owner of the tokens being approved                         |
| `permitSingle` | `PermitSingle` | Data signed over by the owner specifying the terms of approval |
| `signature`    | `bytes`        | The owner's signature over the permit data                     |

### permit

Permit a spender to a given amount of the owners token via the owner's EIP-712 signature

_May fail if the owner's nonce was invalidated in-flight by invalidateNonce_

```solidity
function permit(address owner, PermitBatch memory permitBatch, bytes calldata signature) external;
```

**Parameters**

| Name          | Type          | Description                                |
| ------------- | ------------- | ------------------------------------------ |
| `owner`       | `address`     | The owner of the tokens being approved     |
| `permitBatch` | `PermitBatch` |                                            |
| `signature`   | `bytes`       | The owner's signature over the permit data |

### transferFrom

Transfer approved tokens from one address to another

_Requires the from address to have approved at least the desired amount
of tokens to msg.sender._

```solidity
function transferFrom(address from, address to, uint160 amount, address token) external;
```

**Parameters**

| Name     | Type      | Description                         |
| -------- | --------- | ----------------------------------- |
| `from`   | `address` | The address to transfer from        |
| `to`     | `address` | The address of the recipient        |
| `amount` | `uint160` | The amount of the token to transfer |
| `token`  | `address` | The token address to transfer       |

### transferFrom

Transfer approved tokens from one address to another

_Requires the from address to have approved at least the desired amount
of tokens to msg.sender._

```solidity
function transferFrom(AllowanceTransferDetails[] calldata transferDetails) external;
```

**Parameters**

| Name              | Type                         | Description |
| ----------------- | ---------------------------- | ----------- |
| `transferDetails` | `AllowanceTransferDetails[]` |             |

### \_transfer

Internal function for transferring tokens using stored allowances

_Will fail if the allowed timeframe has passed_

```solidity
function _transfer(address from, address to, uint160 amount, address token) private;
```

### lockdown

Enables performing a "lockdown" of the sender's Permit2 identity
by batch revoking approvals

```solidity
function lockdown(TokenSpenderPair[] calldata approvals) external;
```

**Parameters**

| Name        | Type                 | Description                   |
| ----------- | -------------------- | ----------------------------- |
| `approvals` | `TokenSpenderPair[]` | Array of approvals to revoke. |

### invalidateNonces

Invalidate nonces for a given (token, spender) pair

_Can't invalidate more than 2\*\*16 nonces per transaction._

```solidity
function invalidateNonces(address token, address spender, uint48 newNonce) external;
```

**Parameters**

| Name       | Type      | Description                                                |
| ---------- | --------- | ---------------------------------------------------------- |
| `token`    | `address` | The token to invalidate nonces for                         |
| `spender`  | `address` | The spender to invalidate nonces for                       |
| `newNonce` | `uint48`  | The new nonce to set. Invalidates all nonces less than it. |

### \_updateApproval

Sets the new values for amount, expiration, and nonce.

_Will check that the signed nonce is equal to the current nonce and then incrememnt the nonce value by 1._

_Emits a Permit event._

```solidity
function _updateApproval(PermitDetails memory details, address owner, address spender) private;
```
