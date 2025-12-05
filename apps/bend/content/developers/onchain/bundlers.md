---
head:
  - - meta
    - property: og:title
      content: Bend Onchain Tools - Bundlers
  - - meta
    - name: description
      content: Bend Onchain Tools - Bundlers
  - - meta
    - property: og:description
      content: Bend Onchain Tools - Bundlers
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Bundlers

Bundlers are smart contracts designed to let developers group several onchain operations into a single, atomic transaction. Rather than requiring users to complete multiple steps—such as approvals, wrapping, supplying, or borrowing—each as a separate transaction, bundlers allow these actions to be executed together in one go. This approach streamlines the process and helps reduce gas costs.

For building user-facing applications on Morpho, using a bundler is the preferred method.

:::info
To see more details, see the [Bundler3 contract reference](/developers/contracts/bundler3) section.
:::

## Why Use Bundlers

- **Enhanced Simplicity:** Bundlers hide the underlying steps of DeFi operations, letting users perform complex actions—such as opening leveraged positions or making vault deposits—in a single, straightforward transaction.
- **Lower Gas Costs:** By executing several operations together, bundlers help minimize total gas expenditure compared to running each step separately.
- **Transactional Integrity:** Bundled transactions are all-or-nothing; if any part fails, the whole process is reverted. This ensures users never end up in incomplete or undesirable states (for example, with tokens approved but not deposited).

## Key Features & Capabilities

Bundlers support a broad set of operations, such as:

- **Managing tokens:** Set ERC20 approvals (including via permit or permit2), wrap or unwrap native assets (like ETH to WETH), and transfer tokens.
- **Bend market interactions**: Perform supply, supplyCollateral, borrow, repay, and withdraw actions.
- **Bend vault operations**: Deposit into or withdraw from any vault that follows the ERC4626 standard.
- **Public Allocator**: Initiate reallocateTo to shift liquidity as needed.
- **Claiming rewards**: Collect rewards from the Universal Rewards Distributor (URD).
- **Swapping on DEXs:** Carry out swaps using built-in DEX aggregators.

:::warning
If Bundler3 is granted token approval, it is capable of executing any transaction on your behalf.

For this reason, you should avoid granting Bundler3 approval—whether through a standard approval or a permit.
:::
