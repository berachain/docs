---
head:
  - - meta
    - property: og:title
      content: Migration Guide
  - - meta
    - name: description
      content: Proof of Liquidity Migration Guide for bArtio to Mainnet
  - - meta
    - property: og:description
      content: Proof of Liquidity Migration Guide for bArtio to Mainnet
---

# Migration Guide

Significant changes have been made to the Proof of Liquidity (PoL) contracts between the bArtio testnet and the upcoming Berachain mainnet. This guide will help you migrate your code to the new version.

## Contents

- [RewardVault.sol](#rewardvault-sol)
- [BeraChef.sol](#berachef-sol)
- [BeaconDeposit.sol](#beacondeposit-sol)

## Validator and Operator Relationship

- The Validator and Operator relationship has been moved out of [BeraChef](/developers/contracts/berachef) and is now managed in the [BeaconDeposit](/developers/contracts/beacondeposit) contract
- Validators are defined by a 48-byte public key (`pubKey` in contracts), and have a corresponding `operator` address that is responsible for managing the PoL contract interactions and receiving rewards

## Contract Renaming

The following contracts have been renamed:

```diff
- BerachainRewardsVault.sol
+ RewardVault.sol

- BeaconDepositContract.sol
+ BeaconDeposit.sol
```

## RewardVault.sol

Summary of changes made to the `RewardVault.sol` contract:

- `notifyRewardAmount` now requires a `pubkey` instead of an `address`
- `getReward` now requires a `recipient` parameter
- `Incentive` tokens have a `manager` address. Only this address can add incentives.

### Reward Management

#### getReward

The `getReward` function has been updated to include a `recipient` parameter, which enables BGT rewards to be claimed directly to a different address than the account holder.

```diff
- function getReward(address account)
+ function getReward(address account, address recipient)
```

#### notifyRewardAmount

```diff
- function notifyRewardAmount(address coinbase, uint256 reward)
+ function notifyRewardAmount(bytes calldata pubkey, uint256 reward)
```

### Incentive Management

#### Incentive Struct

The `Incentive` struct has been expanded to include a dedicated manager for each incentive token:

```diff
struct Incentive {
    uint256 minIncentiveRate;
    uint256 incentiveRate;
    uint256 amountRemaining;
+   address manager;
}
```

#### Incentive Whitelisting

The whitelist function now requires a `manager` address to be specified. Only this address can call the `addIncentive` function for the token.

```diff
function whitelistIncentiveToken(
    address token,
    uint256 minIncentiveRate,
+   address manager
)
```

The `manager` address can be changed through governance:

```solidity
function updateIncentiveManager(
    address token,
    address newManager
) external onlyFactoryOwner onlyWhitelistedToken(token)
```

#### Events

Updated events include manager information:

```diff
event IncentiveTokenWhitelisted(
    address token,
    uint256 minIncentiveRate,
+   address manager
);

+ event IncentiveManagerChanged(
+   address token,
+   address newManager,
+   address oldManager
);
```

## BeraChef.sol

Summary of changes made to the `BeraChef.sol` contract:

- Renamed `CuttingBoard` to `RewardAllocation` for clarity
- Replaced `FriendOfTheChef` with `WhitelistedVault`

### Reward Allocation Management

```diff
- function queueNewCuttingBoard(
+ function queueNewRewardAllocation(
-   address valCoinbase,
+   bytes calldata valPubkey,
    uint64 startBlock,
    Weight[] calldata weights
)
```

### Reward Vault Whitelisting

Function signatures changed from `FriendOfTheChef` to `WhitelistedVault`, with addition of metadata:

```diff
- function updateFriendsOfTheChef(address receiver, bool isFriend);
+ function setVaultWhitelistedStatus(address receiver, bool isWhitelisted, string memory metadata);

+ function updateWhitelistedVaultMetadata(address vault, string memory metadata);
```

### Storage Changes

```diff
- mapping(address valCoinbase => CuttingBoard) internal activeCuttingBoards;
+ mapping(bytes valPubkey => RewardAllocation) internal activeRewardAllocations;

- mapping(address valCoinbase => CuttingBoard) internal queuedCuttingBoards;
+ mapping(bytes valPubkey => RewardAllocation) internal queuedRewardAllocations;

- mapping(address valCoinbase => address operator) internal validatorOperator;
// Removed - now uses BeaconDeposit for operator management

- mapping(address receiver => bool) public isFriendOfTheChef;
+ mapping(address receiver => bool) public isWhitelistedVault;
```

## BeaconDeposit.sol

Summary of changes made to the `BeaconDeposit.sol` contract:

- Added operator management functionality including queueing and acceptance delays
- Removed dependency on deposit authorization
- Simplified deposit process with operator assignment on first deposit
- Added genesis deposits root storage

### Deposits

The `deposit` function has been updated to manage operator assignment on initial deposit. Subsequent deposits must have the operator address as `address(0)`:

```diff
function deposit(
    bytes calldata pubkey,
    bytes calldata credentials,
-   uint64 amount,
    bytes calldata signature,
+   address operator
)
```

### Operator Management

New functions are provided for validators to manage their `operator` address. The process for changing operators is to first request the change, then accept the change, or cancel the change.

```solidity
function requestOperatorChange(bytes calldata pubkey, address newOperator);

function cancelOperatorChange(bytes calldata pubkey);

function acceptOperatorChange(bytes calldata pubkey);
```
