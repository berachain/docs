# Underlying Tokens in BEX

## Overview

It's common to want to know what underlying tokens a BEX LP token represents. This documentation explains how to query this information directly from the BEX contract and LP tokens.

## Querying the BEX Contract and LP Tokens

The BEX contract can provide the exact number of tokens in a pool. By querying this information and calculating your share of the pool, you can determine your underlying token balances.

### Step-by-Step Process

1. Query the BEX contract for pool tokens and balances
2. Calculate your pool share
3. Calculate your underlying token balances

### Pseudocode

```solidity
(tokens, balances, lastChangeBlock) = vault.getPoolTokens(poolId);
yourPoolShare = lpToken.balanceOf(yourAddress) / lpToken.totalSupply();
uint256[] yourUnderlyingBalances = new uint256[](balances.length);
for (i = 0; i < balances.length; i++) {
    yourUnderlyingBalances[i] = balances[i] * yourPoolShare;
}
return (tokens, yourUnderlyingBalances);
```

## Special Considerations

### Stable Pools

For stable pools in BEX:

1. Use `getActualSupply()` instead of `totalSupply()` to get the correct pool supply
2. If you've staked your LP tokens, calculate your total LP token balance as:
   ```solidity
   myLpTokens = lpToken.balanceOf(yourAddress) + lpStakingContract.balanceOf(yourAddress);
   ```

## Example: Querying BERA/HONEY Pool

Let's say you want to know your underlying BERA and HONEY balances for a BERA/HONEY pool:

| Step | Action               | Result                                                      |
| ---- | -------------------- | ----------------------------------------------------------- |
| 1    | Query BEX            | tokens = [BERA, HONEY], balances = [1000 BERA, 10000 HONEY] |
| 2    | Get LP token balance | yourLpTokens = 100                                          |
| 3    | Get total LP supply  | actualSupply = getActualSupply() = 1000                     |
| 4    | Calculate pool share | yourPoolShare = 100 / 1000 = 0.1 (10%)                      |
| 5    | Calculate underlying | yourBera = 1000 \* 0.1 = 100 BERA                           |
| 6    | Calculate underlying | yourHoney = 10000 \* 0.1 = 1000 HONEY                       |

In this example, your 100 LP tokens represent 100 BERA and 1000 HONEY.
