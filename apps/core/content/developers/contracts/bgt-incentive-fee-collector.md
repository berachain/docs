---
head:
  - - meta
    - property: og:title
      content: BGTIncentiveFeeCollector Contract Reference
  - - meta
    - name: description
      content: Developer reference for the BGTIncentiveFeeCollector contract in PoL
  - - meta
    - property: og:description
      content: Developer reference for the BGTIncentiveFeeCollector contract in PoL
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# BGTIncentiveFeeCollector

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.bgtIncentiveFeeCollector['mainnet-address']">{{config.contracts.pol.bgtIncentiveFeeCollector['mainnet-address']}}</a><span v-if="config.contracts.pol.bgtIncentiveFeeCollector.abi && config.contracts.pol.bgtIncentiveFeeCollector.abi.length > 0">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.pol.bgtIncentiveFeeCollector.abi">ABI JSON</a></span></small>

[Git Source](https://github.com/berachain/contracts/blob/main/src/pol/BGTIncentiveFeeCollector.sol)

Collects the fees on the incentives posted on reward vaults and auction them for WBERA. Accrued WBERA serves as a payout for the stakers of `WBERAStakerVault.sol`.

**Inherits:**
IBGTIncentiveFeeCollector, UUPSUpgradeable, OwnableUpgradeable, PausableUpgradeable

## Constants

### MANAGER_ROLE

```solidity
bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
```

### PAUSER_ROLE

```solidity
bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
```

### WBERA

The WBERA token address, serves as payout token.

```solidity
address public constant WBERA = 0x6969696969696969696969696969696969696969;
```

## State Variables

### payoutAmount

The amount of WBERA required to claim fees.

```solidity
uint256 public payoutAmount;
```

### queuedPayoutAmount

The queued payout amount that will be activated on next claim.

```solidity
uint256 public queuedPayoutAmount;
```

### wberaStakerVault

The address of the WBERA staker vault.

```solidity
address public wberaStakerVault;
```

## View Functions

### hasRole

```solidity
function hasRole(bytes32 role, address account) public view virtual override returns (bool);
```

### owner

```solidity
function owner() public view virtual override returns (address);
```

### paused

```solidity
function paused() public view virtual override returns (bool);
```

### proxiableUUID

```solidity
function proxiableUUID() external view virtual override notDelegated returns (bytes32);
```

### queuedPayoutAmount

```solidity
function queuedPayoutAmount() external view returns (uint256);
```

## Functions

### claimFees

Claims the accumulated fees for the given tokens.

_The caller must transfer the payout amount to the staking vault._

**Emits:**

- [IncentiveFeesClaimed](#event-incentivefeesclaimed)

```solidity
function claimFees(address _recipient, address[] calldata _feeTokens) external whenNotPaused;
```

**Parameters**

| Name         | Type        | Description                                |
| ------------ | ----------- | ------------------------------------------ |
| `_recipient` | `address`   | The address to receive the claimed tokens. |
| `_feeTokens` | `address[]` | The array of fee token addresses to claim. |

### initialize

Initializes the contract.

**Emits:**

- [Initialized](#event-initialized)
- [PayoutAmountSet](#event-payoutamountset)

```solidity
function initialize(address governance, uint256 _payoutAmount, address _wberaStakerVault) external initializer;
```

**Parameters**

| Name                | Type      | Description                                        |
| ------------------- | --------- | -------------------------------------------------- |
| `governance`        | `address` | The address that will have the DEFAULT_ADMIN_ROLE. |
| `_payoutAmount`     | `uint256` | The amount of WBERA required to claim fees.        |
| `_wberaStakerVault` | `address` | The address of the WBERA staker vault.             |

### pause

Pauses the contract.

**Emits:**

- [Paused](#event-paused)

```solidity
function pause() external onlyRole(PAUSER_ROLE);
```

### queuePayoutAmountChange

Queues a change to the payout amount.

**Emits:**

- [QueuedPayoutAmount](#event-queuedpayoutamount)

```solidity
function queuePayoutAmountChange(uint256 _newPayoutAmount) external onlyRole(DEFAULT_ADMIN_ROLE);
```

**Parameters**

| Name               | Type      | Description            |
| ------------------ | --------- | ---------------------- |
| `_newPayoutAmount` | `uint256` | The new payout amount. |

### unpause

Unpauses the contract.

**Emits:**

- [Unpaused](#event-unpaused)

```solidity
function unpause() external onlyRole(MANAGER_ROLE);
```

### upgradeToAndCall

```solidity
function upgradeToAndCall(address newImplementation, bytes memory data) public payable virtual override onlyRole(DEFAULT_ADMIN_ROLE);
```

### wberaStakerVault

```solidity
function wberaStakerVault() external view returns (address);
```

## Events

### IncentiveFeesClaimed {#event-incentivefeesclaimed}

Emitted when incentive fees are claimed.

```solidity
event IncentiveFeesClaimed(address indexed caller, address indexed recipient);
```

**Parameters**

| Name        | Type      | Description                                 |
| ----------- | --------- | ------------------------------------------- |
| `caller`    | `address` | The address that called the claim function. |
| `recipient` | `address` | The address that received the tokens.       |

### IncentiveFeeTokenClaimed {#event-incentivefeetokenclaimed}

Emitted when a specific incentive fee token is claimed.

```solidity
event IncentiveFeeTokenClaimed(
    address indexed caller, address indexed recipient, address indexed token, uint256 amount
);
```

**Parameters**

| Name        | Type      | Description                                 |
| ----------- | --------- | ------------------------------------------- |
| `caller`    | `address` | The address that called the claim function. |
| `recipient` | `address` | The address that received the tokens.       |
| `token`     | `address` | The token that was claimed.                 |
| `amount`    | `uint256` | The amount of tokens claimed.               |

### Initialized {#event-initialized}

Emitted when the contract is initialized.

```solidity
event Initialized(uint64 version);
```

**Parameters**

| Name      | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `version` | `uint64` | The initialization version. |

### OwnershipTransferred {#event-ownershiptransferred}

Emitted when ownership is transferred.

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
```

**Parameters**

| Name            | Type      | Description         |
| --------------- | --------- | ------------------- |
| `previousOwner` | `address` | The previous owner. |
| `newOwner`      | `address` | The new owner.      |

### Paused {#event-paused}

Emitted when the contract is paused.

```solidity
event Paused(address account);
```

**Parameters**

| Name      | Type      | Description                           |
| --------- | --------- | ------------------------------------- |
| `account` | `address` | The account that paused the contract. |

### PayoutAmountSet {#event-payoutamountset}

Emitted when the payout amount is set.

```solidity
event PayoutAmountSet(uint256 oldAmount, uint256 newAmount);
```

**Parameters**

| Name        | Type      | Description                 |
| ----------- | --------- | --------------------------- |
| `oldAmount` | `uint256` | The previous payout amount. |
| `newAmount` | `uint256` | The new payout amount.      |

### QueuedPayoutAmount {#event-queuedpayoutamount}

Emitted when a payout amount change is queued.

```solidity
event QueuedPayoutAmount(uint256 newAmount, uint256 currentAmount);
```

**Parameters**

| Name            | Type      | Description                   |
| --------------- | --------- | ----------------------------- |
| `newAmount`     | `uint256` | The new queued payout amount. |
| `currentAmount` | `uint256` | The current payout amount.    |

### RoleAdminChanged {#event-roleadminchanged}

Emitted when the admin role for a role is changed.

```solidity
event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);
```

**Parameters**

| Name                | Type      | Description                       |
| ------------------- | --------- | --------------------------------- |
| `role`              | `bytes32` | The role whose admin was changed. |
| `previousAdminRole` | `bytes32` | The previous admin role.          |
| `newAdminRole`      | `bytes32` | The new admin role.               |

### RoleGranted {#event-rolegranted}

Emitted when a role is granted to an account.

```solidity
event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
```

**Parameters**

| Name      | Type      | Description                         |
| --------- | --------- | ----------------------------------- |
| `role`    | `bytes32` | The role that was granted.          |
| `account` | `address` | The account that received the role. |
| `sender`  | `address` | The account that granted the role.  |

### RoleRevoked {#event-rolerevoked}

Emitted when a role is revoked from an account.

```solidity
event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);
```

**Parameters**

| Name      | Type      | Description                        |
| --------- | --------- | ---------------------------------- |
| `role`    | `bytes32` | The role that was revoked.         |
| `account` | `address` | The account that lost the role.    |
| `sender`  | `address` | The account that revoked the role. |

### Unpaused {#event-unpaused}

Emitted when the contract is unpaused.

```solidity
event Unpaused(address account);
```

**Parameters**

| Name      | Type      | Description                             |
| --------- | --------- | --------------------------------------- |
| `account` | `address` | The account that unpaused the contract. |

### Upgraded {#event-upgraded}

Emitted when the implementation is upgraded.

```solidity
event Upgraded(address indexed implementation);
```

**Parameters**

| Name             | Type      | Description                     |
| ---------------- | --------- | ------------------------------- |
| `implementation` | `address` | The new implementation address. |
