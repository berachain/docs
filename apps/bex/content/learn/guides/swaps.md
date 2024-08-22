---
head:
  - - meta
    - property: og:title
      content: Swaps
  - - meta
    - name: description
      content: Learn about swapping tokens on BEX, including single-hop and multi-hop swaps, and intermediate tokens.
  - - meta
    - property: og:description
      content: Learn about swapping tokens on BEX, including single-hop and multi-hop swaps, and intermediate tokens.
---

# Swaps

The core functionality of BEX is to allow users to exchange one type of token for another. If liquidity exists for a given pair in the DEX contract, users will be able to swap between tokens. The BEX web app provides an interface for general-purpose swaps.

![BEX Swaps Modal](/assets/bex-swap.png)

Users can swap tokens on BEX on bArtio here: https://bartio.bex.berachain.com/swap

## Single-Hop and Multi-Hop Swaps

If adequate liquidity exists in a given pair, a swap will most likely be executed as a _single hop_. Single-hop swaps incur less exchange and gas fees, making them the preferred method.

However, When a trade between the input and output token does not provide the best overall price (or the trading pair does not exist as a single pool), BEX can perform a _multi-hop swap_. Multi-hop swaps involve chaining swaps across multiple pools to find the best overall price. The process of finding a cost-efficient multi-hop path is called _routing_.

BEX provides an off-chain API for approximately optimal routing. See an [example here](https://bartio-bex-router.berachain-devnet.com/dex/route?fromAsset=0x7507c1dc16935B82698e4C63f2746A2fCf994dF8&toAsset=0xd6D83aF58a19Cd14eF3CF6fe848C9A4d21e5727c&amount=1000000000000000000).

### Intermediate Tokens

In a multi-hop swap, _intermediate tokens_ are the tokens held temporarily when swapping through a sequence of pairs. Intermediate tokens in BEX are never transferred because settlement occurs based on the net debit against the entire BEX protocol.

## Swap Parameters

When initiating a swap, users can define the following parameters (sensible defaults are chosen by the BEX app):

- **Quantity**: The amount of tokens to swap, which can be specified as either a fixed input quantity or a fixed output quantity.
- **Slippage**: The maximum acceptable difference between the expected and actual price of the trade. Slippage is expressed as a percentage and represents the worst-case price impact the user is willing to accept. If the actual price impact exceeds this threshold, the swap transaction will revert. Slippage can be specified by selecting the gear icon on the swap page:
  ![BEX Swaps Modal](/assets/bex-slippage.png)

- **Settlement**: Advanced users interacting with the BEX contract can settle swaps directly with ERC20 token transfers or using their surplus collateral balance. A mix-and-match approach is possible, such as paying the input as an ERC20 token transfer and receiving the output as surplus collateral.
