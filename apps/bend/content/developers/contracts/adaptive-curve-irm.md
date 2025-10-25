---
head:
  - - meta
    - property: og:title
      content: Adaptive Curve IRM Contract Reference
  - - meta
    - name: description
      content: Developer reference for the Adaptive Curve IRM contract in Bend
  - - meta
    - property: og:description
      content: Developer reference for the Adaptive Curve IRM contract in Bend
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# AdaptiveCurveIrm

> <small><a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bend.adaptiveCurveIrm.address + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.contracts.bend.adaptiveCurveIrm.address}}</a> | [Git Source](https://github.com/morpho-org/morpho-blue-irm/blob/main/src/adaptive-curve-irm/AdaptiveCurveIrm.sol)</small>

**Inherits:** [IAdaptiveCurveIrm](https://github.com/morpho-org/morpho-blue-irm/blob/main/src/adaptive-curve-irm/interfaces/IAdaptiveCurveIrm.sol)

## State Variables

### MORPHO

Address of Morpho.

```solidity
address public immutable MORPHO
```

### rateAtTarget

```solidity
mapping(Id => int256) public rateAtTarget
```

## Functions

### constructor

Constructor.

```solidity
constructor(address morpho) ;
```

**Parameters**

| Name     | Type      | Description            |
| -------- | --------- | ---------------------- |
| `morpho` | `address` | The address of Morpho. |

### borrowRateView

Returns the borrow rate per second (scaled by WAD) of the market `marketParams` without modifying any
storage.

Assumes that `market` corresponds to `marketParams`.

```solidity
function borrowRateView(MarketParams memory marketParams, Market memory market) external view returns (uint256);
```

### borrowRate

Returns the borrow rate per second (scaled by WAD) of the market `marketParams`.

Assumes that `market` corresponds to `marketParams`.

```solidity
function borrowRate(MarketParams memory marketParams, Market memory market) external returns (uint256);
```

### \_borrowRate

Returns avgRate and endRateAtTarget.

Assumes that the inputs `marketParams` and `id` match.

```solidity
function _borrowRate(Id id, Market memory market) private view returns (uint256, int256);
```

### \_curve

Returns the rate for a given `_rateAtTarget` and an `err`.
The formula of the curve is the following:
r = ((1-1/C)_err + 1) _ rateAtTarget if err < 0
((C-1)_err + 1) _ rateAtTarget else.

```solidity
function _curve(int256 _rateAtTarget, int256 err) private pure returns (int256);
```

### \_newRateAtTarget

Returns the new rate at target, for a given `startRateAtTarget` and a given `linearAdaptation`.
The formula is: max(min(startRateAtTarget \* exp(linearAdaptation), maxRateAtTarget), minRateAtTarget).

```solidity
function _newRateAtTarget(int256 startRateAtTarget, int256 linearAdaptation) private pure returns (int256);
```

## Events

### BorrowRateUpdate

Emitted when a borrow rate is updated.

```solidity
event BorrowRateUpdate(Id indexed id, uint256 avgBorrowRate, uint256 rateAtTarget);
```
