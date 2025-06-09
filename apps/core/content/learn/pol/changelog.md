# Proof of Liquidity Updates

### 2025-MAY

The [Claim API](/developers/claim-api) is now released.

The Bectra release adds support for a number of improvements for PoL participants. 

* **EIP-7002** introduces execution layer triggerable withdrawals
* **EIP-7702** introduces a new transaction type that allows EOAs to include ephemeral smart contract code during a transaction, allowing complex, PoL-specific logic to be executed atomically, securely, and more flexibly—without requiring permanent infrastructure changes or full migration to smart contract wallets. See our [EIP 7702 guide](https://docs.berachain.com/developers/guides/eip7702-basics).  

### 2025-APR-24

1. New Maximum of 3 incentives per reward vault
2. Block Reward Emissions have been modified in line with the targeted inflation rate of 10%. Updated constants are found on-chain via [BlockRewardController](https://berascan.com/address/0x1AE7dD7AE06F6C58B4524d9c1f816094B1bcCD8e) and described in [Block Rewards](/learn/pol/blockrewards).
3. Auto-Incentivizer: fees from default cutting board BEX Reward Vaults will use the fees to automatically offer incentives.

![Berachain Auto-Incentivizer](/assets/auto-incentivizer.png)

### 2025-APR-18

Reward Allocations limit any one reward vault to 30% share of emissions.

### 2025-JAN-20

We launched Proof of Liquidity 1.0 with public release of the [Honey Paper](https://honeypaper.berachain.com/) and Berachain Mainnet.
