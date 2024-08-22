---
head:
  - - meta
    - property: og:title
      content: Surplus Collateral
  - - meta
    - name: description
      content: BEX allows users to deposit tokens directly into the DEX contract as surplus collateral
  - - meta
    - property: og:description
      content: BEX allows users to deposit tokens directly into the DEX contract as surplus collateral
---

# Surplus Collateral

BEX provides the ability for users to directly deposit tokens in the DEX contract in the form of _surplus collateral_. Unlike collateral provided to support LP positions, surplus collateral sits idle and is not tied to any specific liquidity pool. At this point, surplus collateral provides no yield and merely represents a stable balance of users' deposited tokens.

Surplus collateral can be thought of as a form of lightweight working capital that's significantly more flexible and efficient than the traditional model of holding tokens outside the DEX. In _instant settlement mode_, a BEX swap, mint, or burn operation will directly pay or collect tokens from the user's wallet.

Surplus collateral allows for debits or credits to be paid to the user's balance held inside the DEX contract. This avoids any token transfer associated with the swap, mint, or burn, and instead involves a simple update of a single counter inside the DEX contract.

## Key Benefits

- Simplifies the user experience for active traders by allowing for net settlement of multiple trades, reducing the number of token transfers
- Provides a secure and efficient way to manage working capital directly within the DEX contract

## Usage

Settlement flags are a lightweight way to indicate two-sided trade settlement. For example, to use surplus collateral in [swap](/developers/contracts/dex#swap) calls, the `reserveFlags` parameter can be configured. Following are the available settlement flags:

| reserveFlags | Description                                     |
| ------------ | ----------------------------------------------- |
| `0x0`        | Surplus collateral not used                     |
| `0x1`        | Use surplus collateral for settling base token  |
| `0x2`        | Use surplus collateral for settling quote token |
| `0x3`        | Use surplus collateral for settling both tokens |
