---
head:
  - - meta
    - property: og:title
      content: Weighted Composable Pools
  - - meta
    - name: description
      content: Learn how to create and manage weighted composable pools on BeraSwap
  - - meta
    - property: og:description
      content: Learn how to create and manage weighted composable pools on BeraSwap
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Weighted Composable Pools

Weighted composable pools are the most flexible pool type on BeraSwap, allowing you to create pools with up to 8 different tokens. These pools enable you to create custom token indexes or manage diversified portfolios with precise weight allocations.

## Creating a Weighted Pool

### 1. Select Pool Type
From the pool creation interface, select "Weighted" as your pool type. This allows you to:
- Add up to 8 different tokens
- Set custom weights for each token
- Choose from multiple fee tiers

![Weighted Pool Creation](/assets/weighted_pool.png)

### 2. Set Initial Liquidity
For each token in your pool:
- Input the desired token amounts
- Balance the values according to your target weights
- Review USD values to ensure proper ratios

![Initial Liquidity](/assets/weighted_intial_liquidity.png)

### 3. Configure Pool Settings

#### Swap Fees
Choose between three fee tiers:
- 0.3%: Standard fee for most token pairs
- 0.5%: Medium fee for less liquid tokens
- 1.0%: High fee for exotic tokens or volatile pairs

An additional 0.1% protocol fee is automatically added to each swap and directed to BGT stakers.

#### Pool Name and Symbol
- Pool Name: Automatically generated based on included tokens
- Pool Symbol: Generated with weights (e.g., "33WBERA-33STGUSDC-33WETH-WEIGHTED")

## Best Practices

1. **Token Selection**
   - Include tokens with reliable price feeds
   - Consider market liquidity of each token
   - Ensure complementary token relationships

2. **Weight Distribution**
   - Consider market capitalization
   - Account for token volatility

3. **Fee Selection**
   - Higher fees (1%) for volatile or low-liquidity tokens
   - Lower fees (0.3%) for stable or high-volume pairs
   - Medium fees (0.5%) for balanced risk/reward

## Important Notes

- Pool parameters cannot be changed after creation
- Initial liquidity should be proportional to weights
- Consider gas costs when adding multiple tokens
- Monitor pool performance after launch for potential rebalancing needs