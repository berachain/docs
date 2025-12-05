# Public Allocator: Just-in-Time Liquidity

Morpho's design of isolated markets provides unparalleled risk containment. However, it can also lead to **fragmented liquidity**, where capital is spread across multiple markets instead of being concentrated in a single pool. For a borrower, this could mean a market they want to use doesn't have enough liquidity for their desired loan size.

The **Public Allocator** is the elegant solution to this problem. It is a smart contract that functions as a liquidity router, providing **just-in-time liquidity** by reallocating assets between markets on demand.

:::info
**NOTE:** Public Allocator (PA) requires that the Vault Owner whitelist the PA contract in order for it to work.
:::

## What is the Public Allocator?

The Public Allocator is a publicly callable contract that can move a vault's idle or under-utilized assets into a market where a borrower needs them, right at the moment they need them.

From a borrower's perspective, this transforms a series of isolated, smaller pools into a single, deep source of liquidity, combining the safety of isolated risk with the convenience of a pooled lending model.

## How It Works for a Borrower

Imagine a user wants to borrow 1,000 WETH from the `wstETH/WETH` market, but that specific market only has 200 WETH available.

#### 1. Liquidity Request

The user (or your application on their behalf) initiates the borrow. The system detects the 800 WETH shortfall.

#### 2. Public Allocator Triggered

Instead of failing, a call is made to the `Public Allocator`. It instantly finds the 800 WETH from other markets where the same lending vault has capital (e.g., from an idle pool or an under-utilized `rETH/WETH` market).

#### 3. Liquidity Reallocated

The Public Allocator executes a `reallocate` function, moving the 800 WETH into the target `wstETH/WETH` market.

#### 4. Borrow Executed

The `wstETH/WETH` market now has 1,000 WETH available. The user's borrow transaction succeeds seamlessly.

When integrated with a **Bundler**, this entire process—reallocation and borrowing—happens **atomically within a single transaction**. The user experience is simple: they see deep liquidity and execute one transaction.

## Curator Controls: Flow Caps

This on-demand reallocation is not a free-for-all. Vault curators retain full control over how their liquidity can be moved by setting **Flow Caps** on the Public Allocator for each market.

- `maxIn`: The maximum amount of assets that can be moved _into_ a market by the Public Allocator.
- `maxOut`: The maximum amount that can be moved _out of_ a market.

These guardrails ensure that while liquidity is flexible, it always operates within the risk parameters defined by the vault's curator.
