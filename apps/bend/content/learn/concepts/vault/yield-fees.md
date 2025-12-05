# Yield & Fees

Understanding how yield is generated and fees are applied in Bend vaults is crucial for building accurate earn products and setting proper user expectations.

## Yield Generation

Bend vaults generate yield through capital allocation to various lending markets on Berachain.

### Where does the yield come from?

#### Borrower Interest

Borrowers in underlying lending markets pay interest on their loans.

#### Market Distribution

Interest flows to lenders in each market based on their supplied assets.

#### Vault Collection

Vaults collect interest as lenders across multiple markets.

#### Share Price Increase

Vault's total assets increase, raising the share price for depositors.

#### Depositor Interest

Depositors earn the interest paid by borrowers as their position's share value increases in token terms.

## Fee Mechanism

BEND vaults implement performance fees and platform fees. Both are taken as a cut on the native yield earned by lenders.

:::info
**NOTE:** The yield coming from Proof-of-Liquidity $BGT is not subject to any fee.
:::

### Platform Fee

Platform fee is charged at the market level and retained by Berachain foundation.

### Performance Fee

Performance fee is charged at the vault level and split between the foundation (0%)\* and the curator (100%)\*.

> \*Values are subject to change.
