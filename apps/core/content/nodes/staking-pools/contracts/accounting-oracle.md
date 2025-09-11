<script setup>
  import config from '@berachain/config/constants.json';
</script>

# AccountingOracle

The AccountingOracle provides off-chain data validation to ensure the staking pools system operates with accurate consensus layer information.

## Functions

### updateTotalDeposits

```solidity
function updateTotalDeposits(bytes memory pubkey, uint256 newTotalDeposits) external;
```

Updates the total deposits for a specific validator.

**Parameters:**
- `pubkey`: The validator's public key
- `newTotalDeposits`: The new total deposits amount

### updateValidatorData

```solidity
function updateValidatorData(
    bytes memory pubkey,
    uint256 totalStakedBalance,
    uint256 effectiveBalance,
    uint256 withdrawalAmount,
    uint256 bgtToUnboostAndBurn
) external;
```

Updates comprehensive validator data.

**Parameters:**
- `pubkey`: The validator's public key
- `totalStakedBalance`: The total staked balance
- `effectiveBalance`: The effective balance
- `withdrawalAmount`: The withdrawal amount
- `bgtToUnboostAndBurn`: The BGT amount to unboost and burn

### triggerFundsManagement

```solidity
function triggerFundsManagement(bytes memory pubkey) external;
```

Triggers funds management for a specific validator.

**Parameters:**
- `pubkey`: The validator's public key

## View Functions

### getTotalDeposits

```solidity
function getTotalDeposits(bytes memory pubkey) external view returns (uint256);
```

Returns the total deposits for a specific validator.

**Parameters:**
- `pubkey`: The validator's public key

**Returns:**
- `uint256`: The total deposits amount

### getValidatorData

```solidity
function getValidatorData(bytes memory pubkey) external view returns (
    uint256 totalStakedBalance,
    uint256 effectiveBalance,
    uint256 withdrawalAmount,
    uint256 bgtToUnboostAndBurn
);
```

Returns comprehensive validator data.

**Parameters:**
- `pubkey`: The validator's public key

**Returns:**
- `totalStakedBalance`: The total staked balance
- `effectiveBalance`: The effective balance
- `withdrawalAmount`: The withdrawal amount
- `bgtToUnboostAndBurn`: The BGT amount to unboost and burn

## Events

### TotalDepositsUpdated

```solidity
event TotalDepositsUpdated(bytes indexed pubkey, uint256 newTotalDeposits);
```

Emitted when total deposits are updated for a validator.

### ValidatorDataUpdated

```solidity
event ValidatorDataUpdated(
    bytes indexed pubkey,
    uint256 totalStakedBalance,
    uint256 effectiveBalance,
    uint256 withdrawalAmount,
    uint256 bgtToUnboostAndBurn
);
```

Emitted when validator data is updated.

### FundsManagementTriggered

```solidity
event FundsManagementTriggered(bytes indexed pubkey);
```

Emitted when funds management is triggered for a validator.

## Errors

### InvalidPubkey

```solidity
error InvalidPubkey();
```

Thrown when an invalid public key is provided.

### Unauthorized

```solidity
error Unauthorized();
```

Thrown when the caller is not authorized to perform the operation.

### InvalidData

```solidity
error InvalidData();
```

Thrown when invalid data is provided.
