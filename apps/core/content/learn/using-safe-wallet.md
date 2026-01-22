<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Using Safe{Wallet} on Berachain

[Safe{Wallet}](https://safe.global) (formerly Gnosis Safe) is a smart contract-based multi-signature wallet that provides enhanced security and flexibility for managing digital assets on Berachain. Safe is the most battle-tested smart account infrastructure in web3, securing over $100 billion in assets since 2018.

## Why Use Safe?

Traditional Ethereum wallets (EOAs - Externally Owned Accounts) rely on a single private key. If you lose control of that key, and your funds are gone. Safe transforms asset security by replacing this single point of failure with flexible, programmable access control.

Safe is particularly valuable for:

- **Individuals** seeking enhanced security for their assets
- **Teams** requiring multiple approvals for transactions
- **Projects** needing to coordinate on-chain actions like adding incentives to reward vaults
- **Anyone** managing significant funds or important contracts

On Berachain, Safe is fully integrated with direct support from the Safe team. Access Safe{Wallet} at <a :href="config.mainnet.dapps.safe.url" target="_blank">{{config.mainnet.dapps.safe.url}}</a>.

## How Safe Works

### Smart Accounts vs EOAs

Unlike EOAs that are controlled by a single private key, Safe is a **smart account**—a smart contract deployed on Berachain that defines its own logic for authorizing transactions. This architecture enables features impossible with traditional wallets.

### Multi-Signature Security

At its core, Safe uses **multi-signature** (multisig) functionality. When creating a Safe, you:

1. **Define owners**: Add multiple Ethereum addresses as owners of the Safe
2. **Set a threshold**: Specify how many owners must approve a transaction before execution

For example, a 3-of-5 Safe requires 3 out of 5 owners to approve any transaction. This means:

- No single compromised key can drain the Safe
- Owners can be distributed geographically or across different security models
- Lost keys don't mean lost funds (as long as you maintain threshold access)

### Transaction Flow

Executing a transaction through Safe follows this pattern:

1. **Propose**: One owner creates a transaction (sending tokens, calling a contract function, etc.)
2. **Collect signatures**: Other owners review and sign the transaction off-chain
3. **Execute**: Once the threshold is reached, any owner can submit the transaction to Berachain
4. **Verification**: The Safe smart contract verifies all signatures before executing the transaction

This process happens seamlessly through the Safe{Wallet} interface, which tracks pending transactions and notifies owners when their approval is needed.

## Trustless by Design

Safe's architecture achieves both security and efficiency through a proxy pattern:

### Singleton + Proxy Pattern

Rather than deploying the full Safe logic for each wallet, Safe uses:

- **Safe Singleton**: The core contract logic, deployed once on Berachain
- **Safe Proxy**: A lightweight proxy contract unique to each Safe that delegates calls to the Singleton

This reduces deployment costs dramatically while ensuring all Safes benefit from the same thoroughly audited code.

The Safe proxy contract itself is immutable once deployed—its address never changes, and its core proxy logic cannot be modified. However, owners can point the proxy to different singleton versions through an upgrade transaction requiring threshold signatures. Existing Safes remain on their current version when new singletons are deployed. Upgrades are opt-in and entirely under owner control.

### On-Chain Security and Logic

A critical aspect of Safe's design is that **the Safe smart account doesn't transact for you**. The Safe infrastructure and Safe{Wallet} help coordinate and track proposed transactions, but all authorization logic and security enforcement happens entirely on-chain in the Safe smart contract itself.

When you interact with a Safe through Safe{Wallet} at <a target="_blank" href="https://app.safe.global">app.safe.global</a>, Safe{Wallet} is merely proposing transactions and facilitating signature collection. The web app cannot execute anything without valid signatures from the required threshold of owners. Even if Safe{Wallet} were compromised, an attacker could not drain funds or execute unauthorized transactions—the on-chain contract enforces all security rules.

The Safe smart contract is composed of several components that provide trustless multi-signature functionality:

**Owner Management** controls who can sign transactions and the threshold required for execution. Only existing owners can modify the owner list. Changes require threshold approval. All owner information lives on-chain.

**Transaction Execution** verifies signatures before executing any calls. The contract performs cryptographic signature verification on-chain. No off-chain service can forge approvals.

**Module Management** lets the Safe delegate specific permissions to auxiliary contracts. Modules must be explicitly enabled by owner consensus. Common uses include recovery mechanisms and spending allowances.

**Guard Management** enforces additional checks before and after transaction execution. Guards implement policies like spending limits. They can only revert transactions that violate predefined rules, not block owner-approved actions.

**Fallback Management** routes certain function calls to handler contracts. This supports token standards requiring callbacks (like ERC-721 and ERC-1155).

All components execute deterministically on Berachain. There is no reliance on external services for security—the Safe contract itself is the source of truth.

## Safe Infrastructure Services

Safe provides optional backend services that index and organize on-chain data for convenience. These services are **not security-critical**—they exist solely to improve the user experience by making it easier to track transaction history, coordinate signatures, and discover Safe-related information.

The trustless security model remains unchanged: all authorization happens on-chain in the Safe smart contract. The infrastructure services cannot execute transactions, forge signatures, or override the on-chain security rules. They simply read blockchain state and help coordinate off-chain activities like collecting signatures.

### What is Indexed Information?

When a Safe executes a transaction on Berachain, that transaction is recorded in the blockchain like any other. However, understanding a Safe's full history means scanning blocks, decoding transaction data, and tracking signatures. That's tedious.

**Indexed information** is blockchain data that has been read, organized, and made easily queryable. Safe's Transaction Service monitors Berachain, indexes all Safe-related activity, and provides APIs to query this information efficiently.

### Transaction Service

The Safe Transaction Service monitors Berachain and indexes all activity related to Safe contracts. It tracks:

- Executed transaction history for each Safe
- Pending transactions awaiting additional signatures
- Which owners have signed which pending transactions
- Transaction metadata like gas estimates and confirmation counts

The Transaction Service also facilitates off-chain signature collection by storing proposed transactions and their associated signatures. Owners can review and sign transactions asynchronously without tracking pending proposals themselves.

### Client Gateway

For developers building integrations with Safe, the **Client Gateway** provides the recommended API endpoint. The Client Gateway aggregates data from the Transaction Service and Config Service, transforming and caching responses for efficient consumption.

The Client Gateway API is available at `https://safe-client.safe.global` and provides endpoints for:

- Querying Safe account balances and transaction history
- Retrieving pending transactions and their signatures
- Submitting new transaction proposals
- Accessing Safe configuration and metadata

These services are convenience infrastructure—they make building on Safe dramatically easier, but they are not required for the security model. A Safe can execute transactions without ever touching these services, as long as owners can independently collect the required signatures and submit them on-chain.

## Using Safe on Berachain

Safe is fully deployed on Berachain mainnet and integrated with Berachain-specific features:

### Adding Incentives to Reward Vaults

One common use case is using Safe to manage reward vault incentives as part of Berachain's Proof-of-Liquidity system. The multisig security ensures that incentive allocations require consensus from multiple stakeholders.

See the guide [Add Incentives via SAFE](/learn/guides/safe-add-incentives-for-reward-vault) for step-by-step instructions.

### Managing Protocol Treasuries

Protocols building on Berachain often use Safe to manage treasuries that hold BERA, BGT, and other tokens. The multisig structure provides both security and transparency for community-managed funds.

### Coordinating Team Operations

Development teams use Safe for collaborative on-chain activities like:

- Deploying and upgrading smart contracts
- Managing protocol parameters
- Distributing funds to contributors
- Interacting with PoL contracts

## Getting Started

To start using Safe on Berachain:

1. Visit <a :href="config.mainnet.dapps.safe.url" target="_blank">{{config.mainnet.dapps.safe.url}}</a>
2. Connect your wallet to Berachain mainnet
3. Create a new Safe by selecting owners and a threshold
4. Fund your Safe with BERA or other tokens
5. Propose and execute your first transaction

For developers looking to integrate Safe programmatically, the Safe\{Core\} SDK provides TypeScript libraries, and [Safe's documentation](https://docs.safe.global) offers detailed technical guides and API references.
