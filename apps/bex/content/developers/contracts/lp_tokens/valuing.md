# Valuing BeraSwap LP Tokens

## Overview

It's common to want to know the value of a BeraSwap LP token. This generally comes down to its Net Asset Value (NAV), i.e., the value of the underlying tokens.

## NAV Calculation

### Equation

The Net Asset Value (NAV) of an LP token is calculated as:

![LP Token Price Equation](/assets/equation.png)

Where:
- Balance₍ᵢ₎ is the balance of token i in the pool
- Price₍ᵢ₎ is the market price of token i (e.g., from an oracle or price feed)
- Supply₍ₗₚ₎ is the total supply of LP tokens

### Pseudocode

```solidity
(tokens, balances, lastChangeBlock) = beraswap.getPoolTokens(poolId);
prices = fetchPricesFromPriceProvider(tokens); // e.g., from an oracle
poolValueUsd = sum(balances[i] * price[i]);
lpTokenPriceUsd = poolValueUsd / lpToken.totalSupply();
```

## Special Considerations

### Pre-minted LP Tokens

Some pools in BeraSwap might have pre-minted LP tokens. In such cases:

- Use `lpToken.getVirtualSupply()` instead of `lpToken.totalSupply()`

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

| Step | Action | Result |
|------|--------|--------|
| 1 | Query BeraSwap | tokens = [`$BERA`, `$HONEY`], balances = [1000 BERA, 10000 HONEY] |
| 2 | Fetch prices | prices = [$10 (BERA), $1 (HONEY)] |
| 3 | Calculate pool value | poolValueUsd = (1000 * $10) + (10000 * $1) = $20,000 |
| 4 | Get total LP supply | totalLpSupply = 1000 |
| 5 | Calculate LP token price | lpTokenPriceUsd = $20,000 / 1000 = $20 |

In this example, each LP token is worth $20.