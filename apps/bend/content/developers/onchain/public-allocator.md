---
head:
  - - meta
    - property: og:title
      content: Bend Offchain Tools - Public Allocator
  - - meta
    - name: description
      content: Bend Offchain Tools - Public Allocator
  - - meta
    - property: og:description
      content: Bend Offchain Tools - Public Allocator
---

# Public Allocator

The Public Allocator is an onchain utility designed to address liquidity fragmentation across Bend’s isolated markets. It enables developers to programmatically reallocate liquidity between markets as needed, so that user borrow transactions can proceed even if the destination market does not initially have enough available funds.

This approach delivers the convenience of a unified, deep liquidity pool, while preserving the risk isolation that is central to Bend’s market architecture.

:::info
To see more details, see the [Public Allocator contract reference](/developers/contracts/public-allocator) section.
:::

:::tip
Before getting started, we recommend reading the [Public Allocator Concepts](/learn/concepts/public-allocator) page for a comprehensive overview of how the Public Allocator works and the benefits it provides.
:::

## Core Integration: `reallocateTo`

The main entry point for using the Public Allocator is the `reallocateTo` function. This function enables you to move assets from several source markets within a vault and supply them to a single destination market, all within a single atomic transaction.

### `reallocateTo` Function Signature

```solidity
function reallocateTo(
    address vault,
    Withdrawal[] calldata withdrawals,
    MarketParams calldata supplyMarketParams
) external payable;
```

### `reallocateTo` Parameters

struct MarketParams {
address loanToken;
address collateralToken;
address oracle;
address irm;
uint256 lltv;
}

- `vault`: The MetaMorpho vault address from which liquidity will be sourced.
- `withdrawals`: An array of `Withdrawal` structs, each indicating a specific source market and the amount to withdraw from it.
  - `Withdrawal` - Struct
    - `MarketParams marketParams` - The market from which to withdraw.
      - `address loanToken`
      - `address collateralToken`
      - `address oracle`
      - `address irm`
      - `uint256 lltv`
    - `uint128 amount` - The amount to withdraw
- `supplyMarketParams`: A `MarketParams` struct that specifies the single destination market to receive the total withdrawn funds.
  - `MarketParams` - (See above)

### `reallocateTo` Important Requirements

To ensure a successful call to `reallocateTo`, please observe the following requirements:

- **Withdrawals Must Be Sorted:** The `withdrawals` array must be ordered in ascending order by market ID.
- **Fee Payment:** The transaction must include the appropriate ETH fee as `msg.value`. You can determine the required fee by calling the `fee(vaultAddress)` view function on the Public Allocator contract.
- **Flow Cap Compliance:** Withdrawal and supply amounts must not exceed the `maxOut` and `maxIn` flow caps set by the vault curator for each market.
- **Market Validity:** All source and destination markets must be enabled in the vault’s configuration.
- **No Self-Supply:** The destination market specified in `supplyMarketParams` cannot also appear in the `withdrawals` array.

### `reallocateTo` Example: Solidity Integration

Below is a basic example demonstrating how to prepare and invoke `reallocateTo` from within a smart contract.

```solidity
// Example assumes IPublicAllocator and IMetaMorpho interfaces are imported and available
IPublicAllocator publicAllocator = IPublicAllocator(PA_ADDRESS);
IMetaMorpho vault = IMetaMorpho(VAULT_ADDRESS);

// Step 1: Confirm the allocator is registered with the vault and determine the required fee
require(vault.isAllocator(address(publicAllocator)), "PA: Not an allocator");
uint256 requiredFee = publicAllocator.fee(address(vault));

// Step 2: Construct the withdrawals array (ensure it is sorted by market ID in ascending order)
Withdrawal[] memory withdrawals = new Withdrawal[](2);

// Withdraw from Market A (for example, an Idle Market)
withdrawals[0] = Withdrawal({
    marketParams: marketAParams, // Parameters for Market A
    amount: 70 * 1e18
});

// Withdraw from Market B (for example, a wETH Market)
// Note: Market B's ID must be greater than Market A's ID
withdrawals[1] = Withdrawal({
    marketParams: marketBParams, // Parameters for Market B
    amount: 800 * 1e18
});

// Step 3: Specify the destination market for the reallocated liquidity
MarketParams memory supplyMarketParams = wBERAMarketParams; // Parameters for wBERA Market

// Step 4: Call reallocateTo on the Public Allocator contract, sending the required fee
publicAllocator.reallocateTo{value: requiredFee}(
    address(vault),
    withdrawals,
    supplyMarketParams
);
```
