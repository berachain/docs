---
head:
  - - meta
    - property: og:title
      content: Initializing Pools
  - - meta
    - name: description
      content: Learn how to create new liquidity pools on BEX.
  - - meta
    - property: og:description
      content: Learn how to create new liquidity pools on BEX.
---

# Initializing Pools

On BEX, any user can initialize a liquidity pool for an arbitrary pair of tokens. The user who initializes the pool has the ability to select the starting price ratio between the two tokens.

Users can create new BEX liquidity pools here: https://bartio.bex.berachain.com/pools/create

To prevent spam and ensure the creation of meaningful pools, BEX requires users to permanently burn a small, economically insignificant quantity of both tokens when initializing a new pool.

## Pool Initialization Steps

1. Navigate to the "Pool" section of the BEX app and select "Create a Pool"
2. Select the two tokens you wish to create a pool for
3. Specify the pool fees, collected on each swap
4. Set initial pool token ratios and amount of liquidity to add
5. Confirm the pool creation transaction

![BEX Pool Creation](/assets/bex-set-prices.png)

## Selecting the Ratio

During pool creation, the price/ratio of the tokens is set based on amount of "quote" tokens per "base" token. Using the above scenario as an example, and assuming that the price of `$WETH` is $3000, the initial price of `$HONEY`is set from the initial`3000` ratio, that is:

- Each `$WETH` is worth `3000` `$HONEY`
- Each `$HONEY` is worth `0.000333` `$WETH`
- The initial price of `$HONEY` is `$3000 * 0.000333 = $1`

If there is a known price to both tokens, pool creators should endeavour to set the initial price ratio to match the known prices. If the price ratio is set too high or too low, arbitrageurs will quickly correct the price to match the market.
