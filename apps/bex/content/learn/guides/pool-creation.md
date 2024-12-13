---
head:
  - - meta
    - property: og:title
      content: Initializing Pools
  - - meta
    - name: description
      content: Learn how to create new liquidity pools on BeraSwap.
  - - meta
    - property: og:description
      content: Learn how to create new liquidity pools on BeraSwap.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Initializing Pools

On BeraSwap, any user can initialize a liquidity pool. BeraSwap offers two main types of pools: Weighted Pools and Stable Pools, each optimized for different trading scenarios.

Create a new BeraSwap liquidity pool <a href="{{config.testnet.dapps.bex.url}}/pools/create" target="_blank">here</a>.

To prevent spam and ensure the creation of meaningful pools, BEX requires users to 
permanently burn a small, economically insignificant quantity of both tokens when 
initializing a new pool.
## Pool Types

### Weighted Pools
- Support up to 8 different tokens
- Customizable weight distribution for each token
- Suitable for most token pairs
- Common fee tiers: 0.3%, 0.5%, and 1%

### Stable Pools
- Designed for tokens that maintain similar prices
- Optimal for stablecoin pairs (like USDC/USDT)
- Lower fees and better pricing for similar-value assets
- Typical fee range: 0.01% to 0.1%

## Creating a Pool

1. Navigate to the "Pool" section and click "Create a Pool"
2. Select your pool type based on your tokens:
   - Weighted Pool for standard token pairs
   - Stable Pool for similar-valued tokens

![Pool Type Selection](/assets/create_pool_stable.png)

In this example we're creating a Stable Pool.
3. Choose the tokens you want to include:
   - For Stable pools: Select tokens with similar values (e.g., USDT/STGUSDC)
   - For Weighted pools: Add tokens and set custom weights (e.g., 25% WBERA / 75% STGUSDC)

4. Set your pool parameters:
   - For Stable pools: Choose swap fees between 0.01% to 0.1%, optimal for stablecoin pairs
   - For Weighted pools: Select from 0.3%, 0.5%, or 1% fees based on token volatility

5. Add initial liquidity for each token
6. Review and confirm the pool creation

## Setting Initial Prices

When adding initial liquidity, the ratio between tokens determines their starting price:

For Weighted Pools:
- If you add 160 WBERA and 10000 STGUSDC (as shown in the image)
- The initial price will reflect this ratio along with the weights (25%/75%)

For Stable Pools:
- Add similar amounts in terms of value (e.g., 10000 USDT and 10000 STGUSDC)
- The pool assumes these tokens should maintain roughly equal prices

It's important to set prices close to market rates to prevent immediate arbitrage.