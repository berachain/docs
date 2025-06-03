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

BEX LP tokens represent a share of a liquidity pool. Accurately valuing these tokens is essential for displaying user balances, calculating rewards, and for on-chain operations like collateralization and liquidation. There are several methods to value LP tokens, each suited to different use cases.

## Methods of Valuation

### Informational (Sum of Balances)

::: warning
This calculation is for informational purposes only and should NOT be used on-chain as it can be easily manipulated.
:::

This method is suitable for off-chain, informational, or UI purposes. It is **not manipulation-resistant** and should not be used for on-chain or critical financial operations.

**Formula:**

$$
Price_{LP\ token} = \frac{\sum_i (Balance_i \times Price_i)}{Supply_{LP\ Tokens}}
$$

**Where:**

- **Balance<sub>i</sub>**: balance of token $i$ in the pool
- **Price<sub>i</sub>**: market price of token $i$
- **Supply<sub>LP\ Tokens</sub>**: total supply of LP tokens

**Example:**

Suppose a \$BERA/\$HONEY pool contains the following:

| Token                | Balance   | Price (USD) | Value (USD) |
| -------------------- | --------- | ----------- | ----------- |
| $BERA                | 1,000     | $10         | $10,000     |
| $HONEY               | 10,000    | $1          | $10,000     |
| **Total Pool Value** |           |             | **$20,000** |
| **LP Token Supply**  | **1,000** |             |             |

- **Pool Value:** 1000 \$BERA $\times$ 10 USD + 10000 \$HONEY $\times$ 1 USD = 20000 USD
- **LP Token Price:** 20000 USD $/$ 1000 \$LPTOKEN = 20 USD

---

### Weighted Pools

Weighted pools use a constant product invariant with custom weights. This method is **manipulation-resistant** and is recommended for on-chain or robust off-chain use.

| Calculation Steps                                                 | Formula                                                                                       |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Step 1: Pool Invariant** where $\sum_i w_i = 1$                 | $x_1^{w_1} x_2^{w_2} \cdots x_n^{w_n} = k$                                                    |
| **Step 2: Token Weighted Values**                                 | $\frac{p_1 x_1}{w_1} = \cdots = \frac{p_n x_n}{w_n} = \hat{k}$                                |
| **Step 3: Calculate $\hat{k}$**                                   | $\hat{k} = k \cdot \prod_i \left( \frac{p_i}{w_i} \right)^{w_i}$                              |
| **Step 4: Final LP Token Price** where $s$ is the LP token supply | $p_{LP} = \frac{\hat{k}}{s} = \frac{k}{s} \cdot \prod_i \left( \frac{p_i}{w_i} \right)^{w_i}$ |

**Example**

Imagine an 80 \$BAL/20 \$WETH Pool with the following:

| Calculation Steps                | Values                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Step 1: Token Weights**        | $w_1 = 0.8$ (\$BAL)<br>$w_2 = 0.2$ (\$WETH)                                                                  |
| **Step 2: Oracle Prices**        | $p_1 \approx \$4.53$ (\$BAL)<br>$p_2 \approx \$1090.82$ (\$WETH)                                             |
| **Step 3: Pool Parameters**      | $k \approx 2,852,257.5$ (from `pool.getInvariant()`)<br>$s \approx 5,628,392.26$ (from `pool.totalSupply()`) |
| **Step 4: Final LP Token Price** | $p_{LP} = \frac{k}{s} \cdot \prod_i \left( \frac{p_i}{w_i} \right)^{w_i} \approx \$11.34$                    |

---

### Stable Pools

Stable pools are optimized for assets that trade at or near parity (e.g., stablecoins). They use the StableSwap invariant and often expose a `getRate()` function.

**StableSwap Invariant:**

$$
A \cdot n^n \cdot \sum_i x_i + D = A \cdot D \cdot n^n + \frac{D^{n+1}}{n^n \cdot \prod_i x_i}
$$

Where:

- $A$ is the amplification parameter
- $n$ is the number of tokens
- $x_i$ are token balances
- $D$ is the invariant

**LP Token Price (using getRate):**

Most stable pools expose a `getRate()` function, which returns the value of 1 LP token in terms of the pool's base asset (e.g., USD or a stablecoin):

$$
p_{LP} = \text{getRate()} \times \text{(price of base asset)}
$$

**Manual Calculation (if needed):**

$$
p_{LP} = \frac{\sum_i x_i \cdot p_i}{S}
$$

Where $S$ is the actual supply (use `getActualSupply()` for pre-minted pools).

**Example:**

Suppose a USDC/DAI/USDT pool with $getRate() = 1.01$ and USD as the base asset:

- **LP token price:** $p_{LP} = 1.01 \times 1 = 1.01$ USD per LP token

---

### Linear Pools

Linear pools are designed for pairs where one token is a yield-bearing or wrapped version of the other. They use a simple linear invariant and expose a `getRate()` function.

**Linear Pool Invariant:**

$$
x_{main} + r \cdot x_{wrapped} = k
$$

Where $r$ is the rate between the wrapped and main token.

**LP Token Price (using getRate):**

$$
p_{LP} = \text{getRate()} \times \text{(price of main token)}
$$

**Manual Calculation (if needed):**

$$
p_{LP} = \frac{x_{main} \cdot p_{main} + x_{wrapped} \cdot p_{wrapped}}{S}
$$

Where $S$ is the virtual supply (use `getVirtualSupply()`).

**Example:**

Suppose a wstETH/ETH pool with $getRate() = 1.05$ and ETH at $2000$:

- **LP token price:** $p_{LP} = 1.05 \times 2000 = 2100$ USD per LP token

## Special Considerations

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
