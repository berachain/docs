---
head:
  - - meta
    - property: og:title
      content: Query Contracts
  - - meta
    - name: description
      content: Stateless query contracts to access contract data
  - - meta
    - property: og:description
      content: Stateless query contracts to access contract data
---

# Query Contracts

BEX has additional stateless query contracts to provide easy and convenient access to contract data. Because all methods in these contracts are view type, they can be called either on-chain or off-chain.

The two available query contracts are:

- CrocSwapQuery - Suite of methods to query liquidity positions, curve liquidity and prices, and user dex balances
- CrocImpact - Calculates price impact of a given swap operation
