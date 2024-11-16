---
head:
  - - meta
    - property: og:title
      content: Type Conventions
  - - meta
    - name: description
      content: Learn about the standard conventions used in BEX for representing tokens, pool types, token quantities, prices, ticks, settlement flags, and pool liquidity fees.
  - - meta
    - property: og:description
      content: Learn about the standard conventions used in BEX for representing tokens, pool types, token quantities, prices, ticks, settlement flags, and pool liquidity fees.
---

# Type Conventions

BEX employs a series of standard conventions when representing various parameters, regardless of the command type or call path.

### Tokens

Tokens are represented as standard 40-character Ethereum addresses (without the preceding `0x`). For ERC20 tokens, this is the address of the token contract.

For the native currency of the chain (e.g., BERA for Berachain), the token is always represented as the `0x0` address. BEX does not use wrapped versions of the chain's native token (`$BERA`). Users should always use the zero address for the native token. Liquidity, however, is provided in the form of `$WBERA`, and supports trades for both wrapped and native versions.

Virtual tokens are represented as the trailing 40 characters of the keccak256 hash of the virtual token tracker address and the virtual token salt. Virtual token addresses will always be empty.

Pairs are represented as the combination of a base token and a quote token. For a given pair, the lower address must always be used as the base token. As a result, the chain's native token (e.g., BERA) will always be the base token in a pair.

### Pool Type Index

BEX supports an unlimited number of pools for any given pair. Pool types map to specific properties of a pool, such as fee rate and whether the pool is permissioned. Pool type indexes apply consistently across all pairs.

The pool index is a 256-bit number chosen arbitrarily by protocol governance and is fixed for the lifetime of any given pool. For permissioned pools, the leading 160 bits of the pool index represent the address of the permission oracle.

#### bArtio Testnet Pool Indices

| Pool Index | Fee Tier | Liquidity Type | Description                                       |
| ---------- | -------- | -------------- | ------------------------------------------------- |
| 36000      | 0.05%    | Full-range     | Low fee tier for highly liquid pairs              |
| 36001      | 0.3%     | Full-range     | Medium fee tier for average liquidity pairs       |
| 36002      | 1%       | Full-range     | High fee tier for low liquidity or volatile pairs |

### Token Quantities

Token quantities are represented as either signed or unsigned 128-bit integers. These values are raw and do not account for the ERC20 token decimal value.

Signed token quantities indicate the direction of the flow relative to the pool:

- Negative values indicate a credit received by the user from the pool
- Positive values indicate a debit paid to the pool by the user

### Prices

All curve prices are represented on-chain as fixed-point Q64.64 representations of the square root. Curve prices always represent the instantaneous exchange rate between the raw tokens and do not account for ERC20 token decimals.

A [TypeScript Library](https://github.com/CrocSwap/sdk/blob/main/src/utils/price.ts) is available for converting between Q64.64 and human-readable prices.

### Pool Liquidity Fees

Pool liquidity fees (or "swap fees") are represented as unsigned 16-bit integers, denominated in units of 0.0001%.
