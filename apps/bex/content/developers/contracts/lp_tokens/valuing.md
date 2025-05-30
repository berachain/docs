---
head:
  - - meta
    - property: og:title
      content: Valuing BEX LP Tokens
  - - meta
    - name: description
      content: Learn how to calculate the value of BEX LP tokens, including both informational and on-chain methods.
  - - meta
    - property: og:description
      content: Learn how to calculate the value of BEX LP tokens, including both informational and on-chain methods.
---

# Valuing BEX LP Tokens

## Overview

It's common to want to know the value of a BEX LP token. This generally comes down to its Net Asset Value (NAV), i.e., the value of the underlying tokens. There are two main approaches to valuing LP tokens:

1. **Informational/Off-chain**: For displaying prices in UIs or general information
2. **On-chain**: For critical operations like liquidation checks or collateral valuation

## ⚠️ Important Warnings

### On-chain Usage

When evaluating LP token values on-chain (e.g., for liquidation checks or collateral valuation):

- **DO NOT** use the simple NAV calculation method shown below
- **DO** use pool-specific methods that are manipulation resistant
- **ALWAYS** check for Vault re-entrancy using `ensureNotInVaultContext(vault)`
- **VERIFY** you're using the correct supply function for your pool type

### Supply Functions

Different pool types use different functions to get the total supply:

- **Weighted Pools**: Use `getActualSupply()`
- **Stable Pools**: Use `getActualSupply()`
- **Linear Pools**: Use `getVirtualSupply()`
- **Legacy Pools**: May use `totalSupply()`

## NAV Calculation (Informational Only)

::: warning
This calculation is for informational purposes only and should NOT be used on-chain as it can be easily manipulated.
:::

### Equation

The Net Asset Value (NAV) of an LP token is calculated as:

$$Price_{LP\ token} = \frac{\sum_i(Balance_i \times Price_i)}{Supply_{LP\ Tokens}}$$

Where:

- Balance₍ᵢ₎ is the balance of token i in the pool
- Price₍ᵢ₎ is the market price of token i (e.g., from an oracle or price feed)
- Supply₍ₗₚ₎ is the total supply of LP tokens

### Pseudocode

```solidity
(tokens, balances, lastChangeBlock) = vault.getPoolTokens(poolId);
prices = fetchPricesFromPriceProvider(tokens); // e.g., from an oracle
poolValueUsd = sum(balances[i] * price[i]);
lpTokenPriceUsd = poolValueUsd / lpToken.totalSupply();
```

## On-chain Price Evaluation

For on-chain operations, use pool-specific methods:

### Weighted Pools

Use the invariant-based calculation that is manipulation resistant:

```solidity
// Get the invariant V
uint256 invariant = WeightedMath.calculateInvariant(weights, balances);
// Calculate price using invariant and weights
```

### Stable Pools

Use the pool's `getRate()` function which returns the exchange rate relative to the base asset:

```solidity
uint256 rate = pool.getRate();
```

### Linear Pools

Use the pool's `getRate()` function which returns the exchange rate to the main token:

```solidity
uint256 rate = pool.getRate();
```

## Special Considerations

### Stable Pools

For stable pools, they have pre-minted LP tokens. In such cases:

- Use `getActualSupply()` instead of `totalSupply()` to get the correct pool supply

### Calculating Value for a Specific Address

To calculate the value of LP tokens held by a specific address:

```solidity
myLpTokenValueUsd = lpToken.balanceOf(myAddress) * lpTokenPriceUsd;
```

If LP tokens are staked, include staked balance:

```solidity
myLpTokens = lpToken.balanceOf(myAddress) + lpStakingContract.balanceOf(myAddress);
myLpTokenValueUsd = myLpTokens * lpTokenPriceUsd;
```

## Example: Valuing `$BERA/$HONEY` LP Tokens

Let's value LP tokens for a `$BERA/$HONEY` pool:

| Step | Action                   | Result                                                            |
| ---- | ------------------------ | ----------------------------------------------------------------- |
| 1    | Query BEX                | tokens = [`$BERA`, `$HONEY`], balances = [1000 BERA, 10000 HONEY] |
| 2    | Fetch prices             | prices = [$10 (BERA), $1 (HONEY)]                                 |
| 3    | Calculate pool value     | poolValueUsd = (1000 _ $10) + (10000 _ $1) = $20,000              |
| 4    | Get total LP supply      | totalLpSupply = 1000                                              |
| 5    | Calculate LP token price | lpTokenPriceUsd = $20,000 / 1000 = $20                            |

In this example, each LP token is worth $20.

::: warning
Remember: This example uses the informational calculation method. For on-chain operations, use the pool-specific methods described above.
:::

## Weighted Pool Pricing Formula

::: details Weighted Pool Invariant and LP Token Pricing (Advanced)

For weighted pools, the value of LP tokens can be calculated using the Balancer-style weighted constant product invariant. This approach is more manipulation-resistant and is recommended for on-chain or robust off-chain pricing.

**Balancer invariant (weighted constant product) for an n-token pool:**

\[
x_1^{w_1} x_2^{w_2} \cdots x_n^{w_n} = k
\]

where \(\sum_i w_i = 1\).

Given prices \(p_1, \ldots, p_n\) in some base currency and invariant \(k\), the weighted value of each token in the pool should be the same:

\[
\frac{p_1 x_1}{w_1} = \cdots = \frac{p_n x_n}{w_n} = \hat{k}
\]

Solving for \(\hat{k}\) by substituting \(x_i\) in the invariant equation, we get:

\[
\hat{k} = k \cdot \left( \frac{p_1}{w_1} \right)^{w_1} \cdots \left( \frac{p_n}{w_n} \right)^{w_n} = k \cdot \prod_i \left( \frac{p_i}{w_i} \right)^{w_i}
\]

Assuming LP token supply is \(s\), the price of each LP token \(p\_{LP}\) in the base currency can be calculated as:

\[
p\_{LP} = \frac{p_1 x_1 + \cdots + p_n x_n}{s} = \frac{\hat{k}}{s} = \frac{k}{s} \cdot \prod_i \left( \frac{p_i}{w_i} \right)^{w_i}
\]

This formula is especially important for on-chain price evaluation of weighted pools, as it is more resistant to manipulation than simply summing token values.

:::

## Stable Pool Pricing Formula

::: details Stable Pool Invariant and LP Token Pricing (Advanced)

Stable pools are optimized for assets that trade at or near parity (e.g., stablecoins). They use a different invariant (the "StableSwap" invariant) and often expose a `getRate()` function for pricing.

**StableSwap Invariant:**

The stable pool invariant is more complex than the weighted pool. For a pool with balances \(x_1, x_2, \ldots, x_n\), amplification parameter \(A\), and invariant \(D\):

\[
A \cdot n^n \cdot \sum_i x_i + D = A \cdot D \cdot n^n + D^{n+1} / (n^n \cdot \prod_i x_i)
\]

(For full details, see [Balancer Stable Math](https://docs-v2.balancer.fi/concepts/math/stable-math.html))

**LP Token Price (Stable Pools):**

Most stable pools expose a `getRate()` function, which returns the value of 1 LP token in terms of the pool's base asset (e.g., USD or a stablecoin):

\[
p\_{LP} = \text{getRate()} \times \text{(price of base asset)}
\]

If the pool is meta-stable (uses rate providers for underlying tokens), the rate is a weighted average of the underlying assets' rates.

**Example:**

- For a USDC/DAI/USDT pool, `getRate()` returns the value in USD.
- For a wstETH/WETH pool, `getRate()` returns the value in WETH.

**Manual Calculation (if needed):**

If you must calculate manually:
\[
p\_{LP} = \frac{\sum_i x_i \cdot p_i}{S}
\]
where \(x_i\) is the balance of token \(i\), \(p_i\) is its price, and \(S\) is the actual supply (use `getActualSupply()` for pre-minted pools).

:::

## Linear Pool Pricing Formula

::: details Linear Pool Invariant and LP Token Pricing (Advanced)

Linear pools are designed for pairs where one token is a yield-bearing or wrapped version of the other (e.g., staked ETH/ETH). They use a simpler invariant and expose a `getRate()` function.

**Linear Pool Invariant:**

The invariant is based on the main token and wrapped token balances:

\[
x*{main} + r \cdot x*{wrapped} = k
\]
where \(r\) is the rate between the wrapped and main token.

**LP Token Price (Linear Pools):**

\[
p\_{LP} = \text{getRate()} \times \text{(price of main token)}
\]

- `getRate()` returns the value of 1 LP token in terms of the main token.
- For example, in a wstETH/ETH pool, `getRate()` gives the value in ETH.

**Manual Calculation (if needed):**
\[
p*{LP} = \frac{x*{main} \cdot p*{main} + x*{wrapped} \cdot p\_{wrapped}}{S}
\]
where \(S\) is the virtual supply (use `getVirtualSupply()`).

:::

## Special Notes and Technical Details

- **Pre-minted Supply:** Some pools (especially stable pools) pre-mint the maximum possible LP tokens. Always use `getActualSupply()` or `getVirtualSupply()` as appropriate.
- **Protocol Fees:** Some pools accrue protocol fees, which may affect the actual value of LP tokens. Weighted and stable pools account for these in their supply functions.
- **Manipulation Resistance:** For on-chain or critical use, always use invariant-based or rate-based pricing, not simple sum-of-balances.
- **Re-entrancy Protection:** When evaluating on-chain, always check for Vault re-entrancy using `ensureNotInVaultContext(vault)`.
- **Staked LP Tokens:** If LP tokens are staked, include both wallet and staked balances in your calculations.

## References

- [Balancer: Valuing BPT](https://docs-v2.balancer.fi/concepts/advanced/valuing-bpt/valuing-bpt.html#overview)
- [Balancer: Stable Math](https://docs-v2.balancer.fi/concepts/math/stable-math.html)
- [BEX Vault Contract](/developers/contracts/vault)
- [BEX Pool Types](/learn/concepts/pools)
- [BEX SDK](/developers/sdk)
