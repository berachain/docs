---
head:
  - - meta
    - property: og:title
      content: Meta Morpho V1.1 Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Meta Morpho V1.1 contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Meta Morpho V1.1 contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# MetaMorphoFactoryV1_1

> <small>[Git Source](https://github.com/berachain/contracts-metamorpho-v1.1/blob/main/src/MetaMorphoV1_1.sol)</small>

**Inherits:**
ERC4626, ERC20Permit, Ownable2Step, Multicall, [IMetaMorphoV1_1StaticTyping](https://github.com/berachain/contracts-metamorpho-v1.1/blob/main/src/interfaces/IMetaMorphoV1_1.sol)

ERC4626 compliant vault allowing users to deposit assets to Morpho.

## State Variables

### MORPHO

The address of the Morpho contract.

```solidity
IMorpho public immutable MORPHO
```

### DECIMALS_OFFSET

OpenZeppelin decimals offset used by the ERC4626 implementation.

Calculated to be max(0, 18 - underlyingDecimals).

```solidity
uint8 public immutable DECIMALS_OFFSET
```

### FEE_PARTITIONER

The fee partitioner.

Internal due to contract size limit in the factory.

```solidity
IMetaFeePartitioner internal immutable FEE_PARTITIONER
```

### curator

The address of the curator.

```solidity
address public curator
```

### isAllocator

```solidity
mapping(address => bool) public isAllocator
```

### guardian

The current guardian. Can be set even without the timelock set.

```solidity
address public guardian
```

### config

```solidity
mapping(Id => MarketConfig) public config
```

### timelock

The current timelock.

```solidity
uint256 public timelock
```

### pendingGuardian

Returns the pending guardian.

```solidity
PendingAddress public pendingGuardian
```

### pendingCap

```solidity
mapping(Id => PendingUint192) public pendingCap
```

### pendingTimelock

Returns the pending timelock.

```solidity
PendingUint192 public pendingTimelock
```

### fee

The current fee.

```solidity
uint96 public fee
```

### feeRecipient

The fee recipient.

```solidity
address public feeRecipient
```

### skimRecipient

The skim recipient.

```solidity
address public skimRecipient
```

### supplyQueue

```solidity
Id[] public supplyQueue
```

### withdrawQueue

```solidity
Id[] public withdrawQueue
```

### lastTotalAssets

Stores the total assets managed by this vault when the fee was last accrued.

```solidity
uint256 public lastTotalAssets
```

### lostAssets

Stores the missing assets due to realized bad debt or forced market removal.

In order to cover those lost assets, it is advised to supply on behalf of address(1) on the vault
(canonical method).

```solidity
uint256 public lostAssets
```

### \_name

"Overrides" the ERC20's storage variable to be able to modify it.

```solidity
string private _name
```

### \_symbol

"Overrides" the ERC20's storage variable to be able to modify it.

```solidity
string private _symbol
```

## Functions

### constructor

Initializes the contract.

We pass "" as name and symbol to the ERC20 because these are overriden in this contract.
This means that the contract deviates slightly from the ERC2612 standard.

```solidity
constructor(
    address owner,
    address morpho,
    address feePartitioner,
    uint256 initialTimelock,
    address _asset,
    string memory __name,
    string memory __symbol
) ERC4626(IERC20(_asset)) ERC20Permit("") ERC20("", "") Ownable(owner);
```

**Parameters**

| Name              | Type      | Description                                  |
| ----------------- | --------- | -------------------------------------------- |
| `owner`           | `address` | The owner of the contract.                   |
| `morpho`          | `address` | The address of the Morpho contract.          |
| `feePartitioner`  | `address` | The address of the fee partitioner contract. |
| `initialTimelock` | `uint256` | The initial timelock.                        |
| `_asset`          | `address` | The address of the underlying asset.         |
| `__name`          | `string`  | The name of the vault.                       |
| `__symbol`        | `string`  | The symbol of the vault.                     |

### onlyCuratorRole

Reverts if the caller doesn't have the curator role.

```solidity
modifier onlyCuratorRole() ;
```

### onlyAllocatorRole

Reverts if the caller doesn't have the allocator role.

```solidity
modifier onlyAllocatorRole() ;
```

### onlyGuardianRole

Reverts if the caller doesn't have the guardian role.

```solidity
modifier onlyGuardianRole() ;
```

### onlyCuratorOrGuardianRole

Reverts if the caller doesn't have the curator nor the guardian role.

```solidity
modifier onlyCuratorOrGuardianRole() ;
```

### afterTimelock

Makes sure conditions are met to accept a pending value.

Reverts if:

- there's no pending value;
- the timelock has not elapsed since the pending value has been submitted.

```solidity
modifier afterTimelock(uint256 validAt) ;
```

### \_onlyCurator

```solidity
function _onlyCurator() internal view;
```

### \_onlyCuratorOrGuardian

```solidity
function _onlyCuratorOrGuardian() internal view;
```

### \_onlyGuardian

```solidity
function _onlyGuardian() internal view;
```

### \_onlyAllocator

```solidity
function _onlyAllocator() internal view;
```

### setName

```solidity
function setName(string memory newName) external onlyOwner;
```

### setSymbol

```solidity
function setSymbol(string memory newSymbol) external onlyOwner;
```

### setCurator

Sets `curator` to `newCurator`.

```solidity
function setCurator(address newCurator) external onlyOwner;
```

### setIsAllocator

Sets `newAllocator` as an allocator or not (`newIsAllocator`).

```solidity
function setIsAllocator(address newAllocator, bool newIsAllocator) external onlyOwner;
```

### setSkimRecipient

Sets `skimRecipient` to `newSkimRecipient`.

```solidity
function setSkimRecipient(address newSkimRecipient) external onlyOwner;
```

### submitTimelock

Submits a `newTimelock`.

Warning: Reverts if a timelock is already pending. Revoke the pending timelock to overwrite it.

```solidity
function submitTimelock(uint256 newTimelock) external onlyOwner;
```

### setFee

Sets the `fee` to `newFee`.

```solidity
function setFee(uint256 newFee) external onlyOwner;
```

### setFeeRecipient

Sets `feeRecipient` to `newFeeRecipient`.

```solidity
function setFeeRecipient(address newFeeRecipient) external onlyOwner;
```

### submitGuardian

Submits a `newGuardian`.

In case there is no guardian, the guardian is set immediately.

```solidity
function submitGuardian(address newGuardian) external onlyOwner;
```

### submitCap

Submits a `newSupplyCap` for the market defined by `marketParams`.

Warning: Reverts if a cap is already pending. Revoke the pending cap to overwrite it.

```solidity
function submitCap(MarketParams memory marketParams, uint256 newSupplyCap) external onlyCuratorRole;
```

### submitMarketRemoval

Submits a forced market removal from the vault, eventually losing all funds supplied to the market.

Warning: Reverts for non-zero cap or if there is a pending cap. Successfully submitting a zero cap will
prevent such reverts.

```solidity
function submitMarketRemoval(MarketParams memory marketParams) external onlyCuratorRole;
```

### setSupplyQueue

Sets `supplyQueue` to `newSupplyQueue`.

```solidity
function setSupplyQueue(Id[] calldata newSupplyQueue) external onlyAllocatorRole;
```

**Parameters**

| Name             | Type   | Description                                                                                                                        |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `newSupplyQueue` | `Id[]` | is an array of enabled markets, and can contain duplicate markets, but it would only increase the cost of depositing to the vault. |

### updateWithdrawQueue

Updates the withdraw queue. Some markets can be removed, but no market can be added.

Warning: Removing a market with supply will decrease the fee accrued until one of the functions updating
`lastTotalAssets` is triggered (deposit/mint/withdraw/redeem/setFee/setFeeRecipient).

```solidity
function updateWithdrawQueue(uint256[] calldata indexes) external onlyAllocatorRole;
```

**Parameters**

| Name      | Type        | Description                                                                                   |
| --------- | ----------- | --------------------------------------------------------------------------------------------- |
| `indexes` | `uint256[]` | The indexes of each market in the previous withdraw queue, in the new withdraw queue's order. |

### reallocate

Reallocates the vault's liquidity so as to reach a given allocation of assets on each given market.

The behavior of the reallocation can be altered by state changes, including:

- Deposits on the vault that supplies to markets that are expected to be supplied to during reallocation.
- Withdrawals from the vault that withdraws from markets that are expected to be withdrawn from during
  reallocation.
- Donations to the vault on markets that are expected to be supplied to during reallocation.
- Withdrawals from markets that are expected to be withdrawn from during reallocation.

```solidity
function reallocate(MarketAllocation[] calldata allocations) external onlyAllocatorRole;
```

### revokePendingTimelock

Revokes the pending timelock.

Does not revert if there is no pending timelock.

```solidity
function revokePendingTimelock() external onlyGuardianRole;
```

### revokePendingGuardian

Revokes the pending guardian.

```solidity
function revokePendingGuardian() external onlyGuardianRole;
```

### revokePendingCap

Revokes the pending cap of the market defined by `id`.

Does not revert if there is no pending cap.

```solidity
function revokePendingCap(Id id) external onlyCuratorOrGuardianRole;
```

### revokePendingMarketRemoval

Revokes the pending removal of the market defined by `id`.

Does not revert if there is no pending market removal.

```solidity
function revokePendingMarketRemoval(Id id) external onlyCuratorOrGuardianRole;
```

### supplyQueueLength

Returns the length of the supply queue.

```solidity
function supplyQueueLength() external view returns (uint256);
```

### withdrawQueueLength

Returns the length of the withdraw queue.

```solidity
function withdrawQueueLength() external view returns (uint256);
```

### acceptTimelock

Accepts the pending timelock.

```solidity
function acceptTimelock() external afterTimelock(pendingTimelock.validAt);
```

### acceptGuardian

Accepts the pending guardian.

```solidity
function acceptGuardian() external afterTimelock(pendingGuardian.validAt);
```

### acceptCap

Accepts the pending cap of the market defined by `marketParams`.

```solidity
function acceptCap(MarketParams memory marketParams) external afterTimelock(pendingCap[marketParams.id()].validAt);
```

### skim

Skims the vault `token` balance to `skimRecipient`.

```solidity
function skim(address token) external;
```

### decimals

Returns the decimals places of the token.

```solidity
function decimals() public view override(ERC20, ERC4626) returns (uint8);
```

### name

```solidity
function name() public view override(IERC20Metadata, ERC20) returns (string memory);
```

### symbol

```solidity
function symbol() public view override(IERC20Metadata, ERC20) returns (string memory);
```

### maxDeposit

Warning: May be higher than the actual max deposit due to duplicate markets in the supplyQueue.

```solidity
function maxDeposit(address) public view override returns (uint256);
```

### maxMint

Warning: May be higher than the actual max mint due to duplicate markets in the supplyQueue.

```solidity
function maxMint(address) public view override returns (uint256);
```

### maxWithdraw

Warning: May be lower than the actual amount of assets that can be withdrawn by `owner` due to conversion
roundings between shares and assets.

```solidity
function maxWithdraw(address owner) public view override returns (uint256 assets);
```

### maxRedeem

Warning: May be lower than the actual amount of shares that can be redeemed by `owner` due to conversion
roundings between shares and assets.

```solidity
function maxRedeem(address owner) public view override returns (uint256);
```

### deposit

For tokens with 18 decimals, the protection against the inflation front-running attack is low. To
protect against this attack, vault deployers should make an initial deposit of a non-trivial amount in the vault
or depositors should check that the share price does not exceed a certain limit.

```solidity
function deposit(uint256 assets, address receiver) public override returns (uint256 shares);
```

### mint

```solidity
function mint(uint256 shares, address receiver) public override returns (uint256 assets);
```

### withdraw

```solidity
function withdraw(uint256 assets, address receiver, address owner) public override returns (uint256 shares);
```

### redeem

```solidity
function redeem(uint256 shares, address receiver, address owner) public override returns (uint256 assets);
```

### totalAssets

totalAssets is the sum of the vault's assets on the Morpho markets plus the lost assets (see corresponding
docs in IMetaMorphoV1_1.sol).

```solidity
function totalAssets() public view override returns (uint256);
```

### \_decimalsOffset

```solidity
function _decimalsOffset() internal view override returns (uint8);
```

### \_maxWithdraw

Returns the maximum amount of asset (`assets`) that the `owner` can withdraw from the vault, as well as the
new vault's total supply (`newTotalSupply`) and total assets (`newTotalAssets`).

```solidity
function _maxWithdraw(address owner)
    internal
    view
    returns (uint256 assets, uint256 newTotalSupply, uint256 newTotalAssets);
```

### \_maxDeposit

Returns the maximum amount of assets that the vault can supply on Morpho.

```solidity
function _maxDeposit() internal view returns (uint256 totalSuppliable);
```

### \_convertToShares

The accrual of performance fees is taken into account in the conversion.

```solidity
function _convertToShares(uint256 assets, Math.Rounding rounding) internal view override returns (uint256);
```

### \_convertToAssets

The accrual of performance fees is taken into account in the conversion.

```solidity
function _convertToAssets(uint256 shares, Math.Rounding rounding) internal view override returns (uint256);
```

### \_convertToSharesWithTotals

Returns the amount of shares that the vault would exchange for the amount of `assets` provided.

It assumes that the arguments `newTotalSupply` and `newTotalAssets` are up to date.

```solidity
function _convertToSharesWithTotals(
    uint256 assets,
    uint256 newTotalSupply,
    uint256 newTotalAssets,
    Math.Rounding rounding
) internal view returns (uint256);
```

### \_convertToAssetsWithTotals

Returns the amount of assets that the vault would exchange for the amount of `shares` provided.

It assumes that the arguments `newTotalSupply` and `newTotalAssets` are up to date.

```solidity
function _convertToAssetsWithTotals(
    uint256 shares,
    uint256 newTotalSupply,
    uint256 newTotalAssets,
    Math.Rounding rounding
) internal view returns (uint256);
```

### \_deposit

Used in mint or deposit to deposit the underlying asset to Morpho markets.

```solidity
function _deposit(address caller, address receiver, uint256 assets, uint256 shares) internal override;
```

### \_withdraw

Used in redeem or withdraw to withdraw the underlying asset from Morpho markets.

Depending on 3 cases, reverts when withdrawing "too much" with:

1. NotEnoughLiquidity when withdrawing more than available liquidity.
2. ERC20InsufficientAllowance when withdrawing more than `caller`'s allowance.
3. ERC20InsufficientBalance when withdrawing more than `owner`'s balance.

```solidity
function _withdraw(address caller, address receiver, address owner, uint256 assets, uint256 shares)
    internal
    override;
```

### \_marketParams

Returns the market params of the market defined by `id`.

```solidity
function _marketParams(Id id) internal view returns (MarketParams memory);
```

### \_accruedSupplyBalance

Accrues interest on Morpho Blue and returns the vault's assets & corresponding shares supplied on the
market defined by `marketParams`, as well as the market's state.

Assumes that the inputs `marketParams` and `id` match.

```solidity
function _accruedSupplyBalance(MarketParams memory marketParams, Id id)
    internal
    returns (uint256 assets, uint256 shares, Market memory market);
```

### \_checkTimelockBounds

Reverts if `newTimelock` is not within the bounds.

```solidity
function _checkTimelockBounds(uint256 newTimelock) internal pure;
```

### \_setTimelock

Sets `timelock` to `newTimelock`.

```solidity
function _setTimelock(uint256 newTimelock) internal;
```

### \_setGuardian

Sets `guardian` to `newGuardian`.

```solidity
function _setGuardian(address newGuardian) internal;
```

### \_setCap

Sets the cap of the market defined by `id` to `supplyCap`.

Assumes that the inputs `marketParams` and `id` match.

```solidity
function _setCap(MarketParams memory marketParams, Id id, uint184 supplyCap) internal;
```

### \_supplyMorpho

Supplies `assets` to Morpho.

```solidity
function _supplyMorpho(uint256 assets) internal;
```

### \_withdrawMorpho

Withdraws `assets` from Morpho.

```solidity
function _withdrawMorpho(uint256 assets) internal;
```

### \_simulateWithdrawMorpho

Simulates a withdraw of `assets` from Morpho.

```solidity
function _simulateWithdrawMorpho(uint256 assets) internal view returns (uint256);
```

**Returns**

| Name     | Type      | Description                           |
| -------- | --------- | ------------------------------------- |
| `<none>` | `uint256` | The remaining assets to be withdrawn. |

### \_withdrawable

Returns the withdrawable amount of assets from the market defined by `marketParams`, given the market's
total supply and borrow assets and the vault's assets supplied.

```solidity
function _withdrawable(
    MarketParams memory marketParams,
    uint256 totalSupplyAssets,
    uint256 totalBorrowAssets,
    uint256 supplyAssets
) internal view returns (uint256);
```

### \_updateLastTotalAssets

Updates `lastTotalAssets` to `updatedTotalAssets`.

```solidity
function _updateLastTotalAssets(uint256 updatedTotalAssets) internal;
```

### \_accrueInterest

Accrues `lastTotalAssets`, `lostAssets` and mints the fee shares to the fee recipient.

```solidity
function _accrueInterest() internal;
```

### \_accruedFeeAndAssets

Computes and returns the `feeShares` to mint, the new `totalAssets` and the new `lostAssets`.

```solidity
function _accruedFeeAndAssets()
    internal
    view
    returns (uint256 feeShares, uint256 newTotalAssets, uint256 newLostAssets);
```

**Returns**

| Name             | Type      | Description                           |
| ---------------- | --------- | ------------------------------------- |
| `feeShares`      | `uint256` | the shares to mint to `feeRecipient`. |
| `newTotalAssets` | `uint256` | the new `totalAssets`.                |
| `newLostAssets`  | `uint256` | the new lostAssets.                   |
