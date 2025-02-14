---
head:
  - - meta
    - property: og:title
      content: Stable Pools
  - - meta
    - name: description
      content: Learn how to create and manage stable pools on BeraSwap
  - - meta
    - property: og:description
      content: Learn how to create and manage stable pools on BeraSwap
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Stable Pools

Stable pools are designed specifically for tokens that are expected to maintain similar prices (like stablecoins or different versions of the same asset). These pools use specialized math to provide much better pricing and lower slippage than weighted pools when trading between assets of similar value.

## When to Use Stable Pools

Ideal use cases for stable pools include:

- Stablecoin pairs (USDC/USDT/DAI)
- Liquid staking tokens (stETH/ETH)
- Synthetic/wrapped asset pairs (WBTC/renBTC)

## Creating a Stable Pool

### 1. Select Pool Type

From the pool creation interface, select "Stable" as your pool type. This type is specifically optimized for tokens that maintain similar prices.

### 2. Choose Tokens

Select the tokens you want to include in your stable pool. Remember:

- All tokens should have similar prices
- Maximum of 5 tokens per stable pool
- All tokens must have the same decimals

![Stable Pool Token Selection](/assets/stable_select_tokens.png)

### 3. Set Initial Liquidity

Provide the initial liquidity amounts for each token. For stable pools, it's recommended to:

- Add similar amounts of each token
- Ensure proper price alignment
- Consider market demand

![Set Initial Liquidity](/assets/stable_set_liquidity.png)

If the values are significantly different, you may see an error warning about price impact:

![Liquidity Error Warning](/assets/stable_set_liq_error.png)

### 4. Set Pool Parameters

Configure your pool settings:

- **Swap Fee**: Choose between 0.01% to 0.1% (lower fees are typical for stable pools)
- **Amplification Parameter**: Determines how stable the pool remains around the ideal price
  - Higher values (100-5000) = better price stability but lower flexibility
  - Lower values (20-100) = more flexibility but potentially higher slippage

## Best Practices

1. **Initial Liquidity**: Start with balanced amounts of each token to ensure proper price stability
2. **Fee Selection**: Use lower fees (0.01%-0.04%) for highly stable pairs
3. **Monitoring**: Regularly check that token prices remain aligned
4. **Amplification**: Start with standard values (100-200) and adjust based on observed trading patterns

## Important Notes

- Stable pools are not suitable for tokens with different decimals or expected price variations
- Adding tokens with significantly different values can lead to poor trading performance
- The amplification parameter cannot be changed after pool creation
