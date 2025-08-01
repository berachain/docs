# Berachain Changelog

Berachain Improvement Proposals (BRIPs) are welcome from anyone, by [contributing to the BRIP repository at GitHub](https://github.com/berachain/BRIPs/tree/main) and then posting to the [Berachain Forum](https://hub.forum.berachain.com/c/brips/9).

Below are important changes shipped to Berachain.

## August 2025

**Reward Vault enhanced functionality** – Added two new functions to enhance staking and reward management capabilities:

- **`stakeOnBehalf`** – Allows any account to stake tokens directly for another account without requiring delegation permissions. This enables new integration patterns for protocol-to-protocol interactions, automated staking services, and custodial solutions while giving the beneficiary full control over their staked balance. See the [Staking for Other Accounts guide](/developers/guides/staking-for-other-accounts) for implementation details.

- **`getPartialReward`** – Enables claiming specific amounts of BGT rewards instead of all accumulated rewards at once. This supports streaming rewards, vesting strategies, dollar-cost averaging patterns, and gas optimization for large reward balances. See the [Partial Reward Claims guide](/developers/guides/partial-reward-claims) for advanced examples.

**New developer guides and documentation:**
- Updated [BGT claiming guide](/learn/guides/claim-bgt) with protocol claiming information
- Enhanced [PoL integration quickstart](/developers/quickstart/pol-integration) highlighting new staking options

**Updated contract references** generated from the latest implementation with complete API documentation for the new functions. See the [Reward Vault contract reference](/developers/contracts/reward-vault) for technical details.

[Upgrade instructions are posted](/nodes/guides/august-2025-upgrade) for our next hardfork, which delivers:
* [BRIP 0001](https://github.com/berachain/brips/blob/main/meta/BRIP-0001.md) - Forked Execution Clients.
* [BRIP 0002](https://github.com/berachain/brips/blob/main/meta/BRIP-0002.md) - Gas Price Stablization. We now adjust gas prices at the same rate as Ethereum, and have raised the minimum for gas prices to reduce spam. 
* [BRIP 0003](https://github.com/berachain/brips/blob/main/meta/BRIP-0003.md) - Stable Block Time. Now fixed at 2 seconds.
* [BRIP 0004](https://github.com/berachain/brips/blob/main/meta/BRIP-0004.md) - Enshrine PoL. Each block automatically includes transaction to generate the previous block's rewards.

## July 2025

**Launched [BERA Staking](https://docs.berachain.com/learn/guides/bera-staking).**  Earn yield on BERA via [the Hub](http://hub.berachain.com/stake/). For developers, we introduced the [WBeraStakeVault](https://docs.berachain.com/developers/contracts/wbera-staker-vault) and [Incentive Fee Collector](https://docs.berachain.com/developers/contracts/bgt-incentive-fee-collector) contracts.

**[Reward Vault upgrades](/developers/contracts/reward-vault)** – Introduced _rate-based_ BGT emission timing via [`targetRewardsPerSecond`](/developers/contracts/reward-vault#targetrewardspersecond), with automatic duration calculation based on reward amounts and target rates. Added [`setRewardsDuration`](/developers/contracts/reward-vault#setrewardsduration), [`setTargetRewardsPerSecond`](/developers/contracts/reward-vault#settargetrewardspersecond), and related state management. See [BGT Emission Modes](/learn/pol/rewardvaults#bgt-emission-modes) for an overview and [Reward Vault contract reference](/developers/contracts/reward-vault) for implementation details.

**Validator commission cap** – [`BeraChef`](/developers/contracts/berachef) now enforces a hard upper-limit of **20%** on incentive-token commission (`MAX_COMMISSION_RATE = 0.2e4`). Existing validators with rates above 20% are automatically capped.

## June 2025

The delay for reward allocation changes has been reduced from 8,191 blocks to 500.

**Beacon Kit 1.2.0** adds support for [Validator Stake withdrawals](https://docs.berachain.com/nodes/guides/withdraw-stake) and [EIP 7702](/developers/guides/eip7702-basics), among a few other EIPs. The release candidate upgrades Bepolia, and the final release upgrades mainnet.

This is a *hardfork* activated on Berachain Mainnet on June 4 2025. Beacon Kit 1.2.0 is required to continue following Berachain Mainnet after that time.

The `CHAIN_SPEC` environment variable is no longer used. There are new [options](/beacon-kit/configuration#beaconkit-configuration) in [app.toml](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80069/app.toml#L117) for controlling the desired chain to follow. 

We have updated our [Execution Layer recommended versions](/nodes/evm-execution) to show new versions required for the post-Bectra upgrade. New deployments should use those recommended versions.

This release adds support for:
* **EIP-2537** Precompile for BLS12-381 curve operations
* **EIP-2935** Serve historical block hashes from state
* **EIP-7002** Execution layer triggerable withdrawals
* **EIP-7623** Increase calldata cost
* **EIP-7685** General purpose EL requests
* **EIP-7702** Set code for EOA 
* **EIP-7840** Add blob schedule to EL config files

## May 2025

The [Claim API](/developers/claim-api) is now released.

## April 2025

**Updates to POL.**
1. New Maximum of 3 incentives per reward vault
2. Block Reward Emissions have been modified in line with the targeted inflation rate of 10%. Updated constants are found on-chain via [BlockRewardController](https://berascan.com/address/0x1AE7dD7AE06F6C58B4524d9c1f816094B1bcCD8e) and described in [Block Rewards](/learn/pol/blockrewards).
3. Auto-Incentivizer: fees from default cutting board BEX Reward Vaults will use the fees to automatically offer incentives.
4. Reward Allocations limit any one reward vault to 30% share of emissions.

![Berachain Auto-Incentivizer](/assets/auto-incentivizer.png)

**Beacon Kit v1.1.4** improves `beacond` handling of transient conditions (which solve themselves) such as a slow execution layer. It will still exit if the execution layer is shut down.

Also, on startup, beacond now issues warnings about deprecated settings, or settings that could be improved.

## March 2025

**Beacon Kit v1.1.3** Restructures Consensus Layer and Execution Layer communication to keep them in lock-step. Now, every RPC communication issue among them will result in a BeaconKit termination *but* keeps their states in sync so you can easily restart any time and keep going. You don't need to keep these once the node has completed sync, but they make resuming syncing, or syncing from genesis, more robust.

## February 2025

**BEacon Kit v1.1.2** is a security-focused update:
* Harden timestamp validation of EL payload
* Prevent potential panics and node halts while decoding data

## January 2025

We launched Proof of Liquidity with the public release of the [Honey Paper](https://honeypaper.berachain.com/) and Berachain Mainnet.

**BeaconKit 1.1.1** fixes ASA-2025-001 and ASA-2025-002, which could lead to a network halt. Moreover it hardens some checks around deposit and blob processing.

**BeaconKit v1.1.0** unlocks minting of tokens towards the BGT contract.
