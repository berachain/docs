---
head:
  - - meta
    - property: og:title
      content: Configuring Pools
  - - meta
    - name: description
      content: Learn how to configure different types of liquidity pools on BeraSwap.
  - - meta
    - property: og:description
      content: Learn how to configure different types of liquidity pools on BeraSwap.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Configuring Pools

BeraSwap offers two main types of pools, each optimized for different trading scenarios: Stable Pools and Weighted Composable Pools. This guide will help you understand how to configure each type effectively.

## Stable Pool Configuration

Stable pools are specifically designed for tokens that maintain similar values, such as stablecoins or wrapped versions of the same asset. They use specialized mathematics to provide optimal pricing and minimal slippage.

![Stable Pool Token Selection](/assets/stable_select_tokens.png)

### Configuration Parameters

1. **Token Selection**
   - Maximum of 5 tokens per pool
   - All tokens must have identical decimals
   - Tokens should maintain similar prices (e.g., USDC/USDT/DAI)

2. **Swap Fees**
   - Range: 0.01% to 0.1%
   - Recommended: 0.01% - 0.05% for highly stable pairs
   - Higher fees may be suitable for less stable pairs

### Initial Liquidity Guidelines

- Add similar amounts of each token
- Maintain balanced ratios (e.g., 1:1 for stablecoin pairs)

![Set Initial Liquidity](/assets/stable_set_liquidity.png)

If the values are significantly different, you may see an error warning about price impact:

![Liquidity Error Warning](/assets/stable_set_liq_error.png)

## Weighted Composable Pool Configuration

Weighted pools offer more flexibility and are suitable for tokens with different values and volatility profiles. They allow precise control over token weights and support up to 8 tokens.

![Weighted Pool Creation](/assets/weighted_set_liquidity.png)

### Key Configuration Parameters

1. **Token Selection**
   - Maximum of 8 tokens per pool
   - No decimal restrictions
   - Can mix different types of tokens

2. **Weight Distribution**
   - Range: 1% to 99% per token
   - Total weights must equal 100%

3. **Swap Fees**
   - 0.3%: Standard fee (recommended for most pairs)
   - 0.5%: Medium fee (less liquid tokens)
   - 1.0%: High fee (exotic or volatile pairs)

### Pool Naming Convention

Pool names and symbols are automatically generated based on:
- Included tokens
- Weight distribution
- Pool type

Example: "33WBERA-33STGUSDC-33WETH-WEIGHTED"

But you can also customize the name and symbol

## Common Configuration Scenarios

### Stablecoin Pool Example
- Pool Type: Stable
- Tokens: USDC, USDT, DAI
- Fee: 0.02%
- Initial Liquidity: Equal amounts (e.g., $10,000 each)

### Weighted Pool Example
- Pool Type: Weighted
- Tokens: WETH (40%), WBTC (40%), HONEY (20%)
- Fee: 0.5%
- Initial Liquidity: Proportional to weights
