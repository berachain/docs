---
head:
  - - meta
    - property: og:title
      content: BlockRewardController Contract Reference
  - - meta
    - name: description
      content: Developer reference for the BlockRewardController contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the BlockRewardController contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BlockRewardController

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.blockRewardController['mainnet-address']">{{config.contracts.pol.blockRewardController['mainnet-address']}}</a><span v-if="config.contracts.pol.blockRewardController.abi && config.contracts.pol.blockRewardController.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.blockRewardController.abi">ABI JSON</a></span></small>

The BlockRewardController contract manages validator block rewards, including BGT distribution and inflation control.

**Inherits:**
[IBlockRewardController](/src/pol/interfaces/IBlockRewardController.sol/interface.IBlockRewardController.md), OwnableUpgradeable, UUPSUpgradeable

*This contract is responsible for computing and distributing block rewards to validators based on their voting power.*

## Constants

### PERCENTAGE_PRECISION
Precision factor for percentage calculations.

```solidity
uint256 public constant PERCENTAGE_PRECISION = 1e4;
```

## State Variables

### bgt
The BGT token contract.

```solidity
IBGT public bgt;
```

### distributor
The distributor contract address.

```solidity
address public distributor;
```

### inflation
Current inflation rate for BGT.

```solidity
uint256 public inflation;
```

### totalSupply
Total supply of BGT tokens.

```solidity
uint256 public totalSupply;
```

## View Functions

### getCurrentInflation

Returns the current inflation rate.

```solidity
function getCurrentInflation() external view returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current inflation rate|

### getBlockReward

Calculates the block reward for the given block.

```solidity
function getBlockReward(uint256 blockNumber) external view returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`blockNumber`|`uint256`|The block number|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The block reward amount|

### owner

```solidity
function owner() public view virtual override returns (address);
```

### proxiableUUID

```solidity
function proxiableUUID() external view virtual override notDelegated returns (bytes32);
```

## Functions

### initialize

Initializes the BlockRewardController contract.

```solidity
function initialize(
    address _owner,
    address _bgt,
    address _distributor,
    uint256 _initialInflation
) external initializer;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The owner of the contract|
|`_bgt`|`address`|The BGT token contract address|
|`_distributor`|`address`|The distributor contract address|
|`_initialInflation`|`uint256`|The initial inflation rate|

### processBlockReward

Processes the block reward for the current block.

*This function is called by the consensus layer to distribute block rewards.*

**Emits:**
- [BlockRewardProcessed](#event-blockrewardprocessed)

```solidity
function processBlockReward() external payable;
```

### setDistributor

Sets the distributor contract address.

**Emits:**
- [DistributorSet](#event-distributorset)

```solidity
function setDistributor(address _distributor) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_distributor`|`address`|The new distributor address|

### setInflation

Sets the inflation rate for BGT minting.

**Emits:**
- [InflationSet](#event-inflationset)

```solidity
function setInflation(uint256 _inflation) external onlyOwner;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_inflation`|`uint256`|The new inflation rate|

### upgradeToAndCall

```solidity
function upgradeToAndCall(address newImplementation, bytes memory data) public payable virtual override onlyOwner;
```

## Events

### BlockRewardProcessed {#event-blockrewardprocessed}
Emitted when a block reward is processed.

```solidity
event BlockRewardProcessed(uint256 indexed blockNumber, uint256 reward, address indexed distributor);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`blockNumber`|`uint256`|The block number|
|`reward`|`uint256`|The reward amount|
|`distributor`|`address`|The distributor address|

### DistributorSet {#event-distributorset}
Emitted when the distributor is set.

```solidity
event DistributorSet(address indexed oldDistributor, address indexed newDistributor);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oldDistributor`|`address`|The previous distributor address|
|`newDistributor`|`address`|The new distributor address|

### InflationSet {#event-inflationset}
Emitted when the inflation rate is set.

```solidity
event InflationSet(uint256 oldInflation, uint256 newInflation);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`oldInflation`|`uint256`|The previous inflation rate|
|`newInflation`|`uint256`|The new inflation rate|

### Initialized {#event-initialized}
Emitted when the contract is initialized.

```solidity
event Initialized(uint64 version);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`version`|`uint64`|The initialization version|

### OwnershipTransferred {#event-ownershiptransferred}
Emitted when ownership is transferred.

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`previousOwner`|`address`|The previous owner|
|`newOwner`|`address`|The new owner|

### Upgraded {#event-upgraded}
Emitted when the implementation is upgraded.

```solidity
event Upgraded(address indexed implementation);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`implementation`|`address`|The new implementation address|
