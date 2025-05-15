# Proof of Liquidity Updates

### 2025-MAY

The Bectra release adds support for:
* **EIP-2537** Precompile for BLS12-381 curve operations
* **EIP-2935** Serve historical block hashes from state
* **EIP-7002** Execution layer triggerable withdrawals
* **EIP-7623** Increase calldata cost
* **EIP-7685** General purpose EL requests
* **EIP-7702** Set code for EOA 
* **EIP-7840** Add blob schedule to EL config files

The [Claim API](/developer/claim-api) is now released.

### 2025-APR-24

1. New Maximum of 3 incentives per reward vault
2. Block Reward Emissions have been modified in line with the targeted inflation rate of 10%. Updated constants are found on-chain via [BlockRewardController](https://berascan.com/address/0x1AE7dD7AE06F6C58B4524d9c1f816094B1bcCD8e) and described in [Block Rewards](/learn/pol/blockrewards).
3. Auto-Incentivizer: fees from default cutting board BEX Reward Vaults will use the fees to automatically offer incentives.

![Berachain Auto-Incentivizer](/assets/auto-incentivizer.png)

### 2025-APR-18

Reward Allocations limit any one reward vault to 30% share of emissions.

### 2025-JAN-20

We launched Proof of Liquidity 1.0 with public release of the [Honey Paper](https://honeypaper.berachain.com/) and Berachain Mainnet.
