# Vaults

Vaults are yield-generating investment vehicles that allow users to deposit assets and earn returns through automated strategies. On Berachain, vaults provide a simplified way for users to access complex DeFi protocols while maintaining full control over their assets.

## What Are Vaults?

Vaults are smart contracts that pool user deposits and automatically allocate them across various yield-generating strategies. Users receive vault shares (ERC-4626 tokens) representing their proportional ownership of the underlying assets and accrued yield.

## Key Benefits of Vaults

### 1. **Curated Risk Profiles**

Unlike traditional lending platforms where users are exposed to all assets in a pool, vaults allow selective exposure to specific strategies based on risk preferences. Users can choose vaults that align with their investment goals and risk tolerance.

### 2. **Permissionless Infrastructure**

Any entity (individual, DAO, or protocol) can create and manage vaults with different risk parameters and allocation strategies. This creates a diverse ecosystem of investment options for users.

### 3. **Non-Custodial Architecture**

All positions remain fully controlled by the user with transparent on-chain verification of allocations and immutable vault logic. Users maintain ownership of their assets while benefiting from professional management.

### 4. **Automated Yield Generation**

Vaults automatically reinvest yields and optimize strategies to maximize returns, eliminating the need for users to manually manage their positions.

## How Vaults Work

### 1. Curation and Market Selection

The `Curator` handles risk curation for the vault. The Curator chooses which Morpho V1 markets fit the vault’s strategy and sets an absolute supply cap for each selected market. This cap ensures the vault cannot exceed a certain level of exposure to any given market. All actions that alter risk settings are protected by a **timelock**.

### 2. Capital Allocation

The `Allocator` oversees optimizing yield within the vault. They maintain two primary queues:

- **Supply Queue:** Specifies the sequence in which newly deposited capital is allocated to the enabled markets.
- **Withdraw Queue:** Specifies the order in which capital is withdrawn from markets to satisfy user redemption requests. In addition, the allocator has the ability to `reallocate` funds between enabled markets to further enhance utilization and yield.

### 3. User Deposits and Withdrawals

When users deposit, the vault directs assets into markets according to the `supplyQueue`, respecting each market's cap. For withdrawals, the vault sources liquidity from markets following the order specified in the `withdrawQueue`.

## Roles and Responsibilities

Morpho Vaults V1 organize control using a distinct set of roles, each with specific powers and responsibilities:

- **Owner:** Holds the highest authority and may appoint the Curator and Allocators, as well as configure vault-wide settings such as fees.
- **Curator:** Serves as the primary risk curator. The Curator selects which Morpho Markets V1 the vault can access and sets the supply cap for each market. All such changes are secured by a timelock for added safety.
- **Allocator:** Acts as the portfolio allocator. The Allocator manages the supply and withdraw queues, and may also reallocate capital among approved markets to enhance yield and liquidity.
- **Guardian:** Provides a safety function, empowered to revoke pending timelocked actions initiated by the Owner or Curator as a safeguard against potentially harmful or unintended changes.

## Risk Considerations

A complete vault integration should help users understand:

### 1. Smart Contract Risk

- **Vault Contract Risk:** Bugs in the vault smart contract could result in financial losses.
- **Underlying Protocol Risk:** Morpho Markets that receive allocations from the vault could be susceptible to their own vulnerabilities.
- **Upgradeability Risk:** Modifications to the vault or underlying protocol contracts may introduce new risks.

### 2. Market Risk

- **Asset Price Risk:** The price of the underlying asset could decrease in value.
- **Interest Rate Risk:** Returns may vary as market-driven yield rates change.
- **Liquidity Risk:** During times of high demand, it may be temporarily difficult to withdraw funds.

### 3. Curator Risk

- **Strategy Risk:** Suboptimal vault curator allocation choices could negatively impact performance.
- **Concentration Risk:** Excessive allocation of assets to high-risk markets may expose users to greater losses.
- **Governance Risk:** Vault curators acting incompetently or maliciously can introduce operational vulnerabilities.

### 4. Operational Risk

- **Oracle Risk:** There is a possibility of price feed manipulation or outages impacting vault operations.
- **Liquidation Risk:** Leveraged strategies may be exposed to risks of liquidation within the underlying markets.
- **Regulatory Risk:** Evolving regulations could impact the operation or availability of DeFi protocols.
