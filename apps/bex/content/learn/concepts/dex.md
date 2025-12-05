---
head:
  - - meta
    - property: og:title
      content: Decentralized Exchanges
  - - meta
    - name: description
      content: Learn about decentralized exchanges (DEXs) and automated market makers (AMMs) that power BEX
  - - meta
    - property: og:description
      content: Learn about decentralized exchanges (DEXs) and automated market makers (AMMs) that power BEX
---

# Decentralized Exchanges (DEXs)

A **decentralized exchange (DEX)** is a cryptocurrency exchange that operates without a central authority or intermediary. Unlike centralized exchanges (CEXs) where a company controls user funds and order matching, DEXs enable peer-to-peer trading directly on the blockchain through smart contracts.

Most DEXs today use an **automated market maker (AMM)** model, where pricing and liquidity are managed algorithmically rather than through traditional order books. While some DEXs may use other models like order book aggregation, AMMs have become the dominant architecture for decentralized exchanges due to their simplicity, efficiency, and continuous liquidity provision.

## Automated Market Makers (AMMs)

**Automated Market Makers (AMMs)** are a type of decentralized exchange protocol that uses mathematical formulas to determine asset prices, rather than traditional order books where buyers and sellers place orders.

In an AMM, liquidity is provided by **liquidity providers (LPs)** who deposit pairs of tokens into pools. Swaps occur against these pools using a pricing algorithm, typically based on a constant product formula or similar mathematical model. This removes the need for order matching and enables continuous, automated trading 24/7.

### How AMMs Work

Unlike traditional limit order books where traders place specific buy/sell orders, AMMs:

- **Use liquidity pools**: LPs deposit token pairs that collectively form the trading liquidity
- **Price automatically**: Asset prices are determined by the ratio of tokens in the pool using mathematical formulas
- **Enable continuous trading**: Swaps can occur at any time as long as liquidity exists
- **Reward LPs**: Liquidity providers earn fees from trading activity

When someone swaps tokens, they interact with the pool, the algorithm calculates the output amount based on current pool balances, and the swap executes immediately.

## BEX and Balancer V2 Architecture

BEX uses an AMM mechanism inspired by **Balancer V2**, which introduces several innovations to the AMM model:

- **Unified Vault architecture**: All pools share a single [Vault](/learn/concepts/vault) contract for token accounting and transfers, while individual pools focus on swap math and liquidity management. This separation of concerns enables gas-efficient swaps through consolidated liquidity, improved security through independent pool balances, and flexibility in pool design.
- **Gas optimization**: Centralized accounting in the Vault reduces gas costs for multi-hop swaps and batch operations
- **Flexible pool types**: BEX supports multiple pool types optimized for different trading scenarios:
  - **[Weighted Pools](/learn/concepts/pools/weighted-pools)**: Support 2-8 tokens with customizable weights (e.g., 80/20 HONEY/WETH or 33/33/33 HONEY/WETH/WBTC), unlike fixed 50/50 pairs
  - **[Stable Pools](/learn/concepts/pools/stable-pools)**: Optimized for tokens that trade at or near parity (e.g., stablecoins) or with predictable exchange rates

For detailed information about pool mechanics, see the [Pools](/learn/concepts/pools) overview and individual pool type pages.
