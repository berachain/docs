---
head:
  - - meta
    - property: og:title
      content: Bundler3 Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Bundler3 contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Bundler3 contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Bundler3

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.bundler3.address.berachainMainnet + '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.bundler3.address.berachainMainnet}}</a> | [Git Source](https://github.com/morpho-org/bundler3/blob/main/src/Bundler3.sol)</small>

**Inherits:** [IBundler3](https://github.com/morpho-org/bundler3/blob/main/src/interfaces/IBundler3.sol)

Enables batching multiple calls in a single one.

Transiently stores the initiator of the multicall.

Can be reentered by the last unreturned callee with known data.

Anybody can do arbitrary calls with this contract, so it should not be approved/authorized anywhere.

## State Variables

### initiator

The initiator of the multicall transaction.

```solidity
address public transient initiator
```

### reenterHash

Hash of the concatenation of the sender and the hash of the calldata of the next call to `reenter`.

```solidity
bytes32 public transient reenterHash
```

## Functions

### multicall

Executes a sequence of calls.

Locks the initiator so that the sender can be identified by other contracts.

```solidity
function multicall(Call[] calldata bundle) external payable;
```

**Parameters**

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| `bundle` | `Call[]` | The ordered array of calldata to execute. |

### reenter

Executes a sequence of calls.

Useful during callbacks.

Can only be called by the last unreturned callee with known data.

```solidity
function reenter(Call[] calldata bundle) external;
```

**Parameters**

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| `bundle` | `Call[]` | The ordered array of calldata to execute. |

### \_multicall

Executes a sequence of calls.

```solidity
function _multicall(Call[] calldata bundle) internal;
```
