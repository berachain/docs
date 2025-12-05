---
head:
  - - meta
    - property: og:title
      content: Public Allocator Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Public Allocator contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Public Allocator contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# PublicAllocator

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.bend.publicAllocator.address.berachainMainnet+ '?utm_source=' + config.websites.docsBend.utmSource">{{config.contracts.bend.publicAllocator.address.berachainMainnet}}</a> | [Git Source](https://github.com/morpho-org/public-allocator/blob/main/src/PublicAllocator.sol)</small>

**Inherits:** [IPublicAllocatorStaticTyping](https://github.com/morpho-org/public-allocator/blob/main/src/interfaces/IPublicAllocator.sol)

Publicly callable allocator for MetaMorpho vaults.

## State Variables

### MORPHO

The Morpho contract.

```solidity
IMorpho public immutable MORPHO
```

### admin

```solidity
mapping(address => address) public admin
```

### fee

```solidity
mapping(address => uint256) public fee
```

### accruedFee

```solidity
mapping(address => uint256) public accruedFee
```

### flowCaps

```solidity
mapping(address => mapping(Id => FlowCaps)) public flowCaps
```

## Functions

### onlyAdminOrVaultOwner

Reverts if the caller is not the admin nor the owner of this vault.

```solidity
modifier onlyAdminOrVaultOwner(address vault) ;
```

### constructor

Initializes the contract.

```solidity
constructor(address morpho) ;
```

### setAdmin

Sets the admin for a given vault.

```solidity
function setAdmin(address vault, address newAdmin) external onlyAdminOrVaultOwner(vault);
```

### setFee

Sets the fee for a given vault.

```solidity
function setFee(address vault, uint256 newFee) external onlyAdminOrVaultOwner(vault);
```

### setFlowCaps

Sets the maximum inflow and outflow through public allocation for some markets for a given vault.

Max allowed inflow/outflow is MAX_SETTABLE_FLOW_CAP.

```solidity
function setFlowCaps(address vault, FlowCapsConfig[] calldata config) external onlyAdminOrVaultOwner(vault);
```

### transferFee

Transfers the current balance to `feeRecipient` for a given vault.

```solidity
function transferFee(address vault, address payable feeRecipient) external onlyAdminOrVaultOwner(vault);
```

### reallocateTo

Reallocates from a list of markets to one market.

Will call MetaMorpho's `reallocate`.

```solidity
function reallocateTo(address vault, Withdrawal[] calldata withdrawals, MarketParams calldata supplyMarketParams)
    external
    payable;
```

**Parameters**

| Name                 | Type           | Description                                               |
| -------------------- | -------------- | --------------------------------------------------------- |
| `vault`              | `address`      | The MetaMorpho vault to reallocate.                       |
| `withdrawals`        | `Withdrawal[]` | The markets to withdraw from,and the amounts to withdraw. |
| `supplyMarketParams` | `MarketParams` | The market receiving total withdrawn to.                  |
