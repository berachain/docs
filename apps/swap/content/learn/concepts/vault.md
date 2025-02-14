---
head:
  - - meta
    - property: og:title
      content: Vault
  - - meta
    - name: description
      content: The Vault is a smart contract that holds and manages all tokens in each BeraSwap pool. It is also the portal through which most BeraSwap operations take place
  - - meta
    - property: og:description
      content: The Vault is a smart contract that holds and manages all tokens in each BeraSwap pool. It is also the portal through which most BeraSwap operations take place
---

# Vault

The Vault contract is a central component of BeraSwap (not to be confused with Reward Vaults in Proof-of-Liquidity), acting as a unified smart contract that manages all tokens across liquidity pools. It serves as the primary interface for most protocol operations, including swaps, joins, and exits.

## Separating Token Accounting and Pool Logic

BeraSwap's Vault and Pool architecture separates the token accounting and management from the pool logic and AMM math . The responsibility for calculating amounts for swaps, joins and exits is delegated to the pool contracts, while the Vault holds all of the tokens within the various pools (which can even be of different types!).

![BeraSwap Vault](/assets/vault.png)

As a simplified example, a swap transaction might involve the following steps:

1. A user sends a swap request to the Vault, specifying the poolId to swap through, and the amount to swap
2. The Vault looks up the pool contract for the specified poolId
3. The pool contract calculates the balance changes from the swap, returning those amounts to the Vault
4. The Vault updates the token balances in the Vault based on the pool contract's calculations, and sends the output tokens to the user

The Vault is designed to keep pool balances strictly independent. This is critical for maintaining a permissionless system where tokens and pools can be created. Even though the Vault holds consolidated balances, the pool contracts are responsible for managing the balances within their pools. That is, the depth of combined liquidity does not change the price impact of individual pools.

## Gas Efficient Swaps

Storing all tokens in the same Vault contract confers greater gas efficiency. For example, in the case of a multi-hop swap (a trade routing through multiple pools), there is no need to transfer tokens at each step. Rather, the Vault keeps track of net balance changes and sends only what is needed at the end, saving on gas costs.
