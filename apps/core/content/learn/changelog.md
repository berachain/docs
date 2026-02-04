# Berachain Changelog

Berachain Improvement Proposals (BRIPs) are welcome from anyone, by [contributing to the BRIP repository at GitHub](https://github.com/berachain/BRIPs/tree/main) and then posting to the [Berachain Forum](https://hub.forum.berachain.com/c/brips/9).

Below are important changes shipped to Berachain.

## February 2025

**Honey basket mode clarifications** – Added [proportional redemption rationale](/learn/pol/tokens/honey#why-proportional-redemptions) and [collateral caps behaviour](/learn/pol/tokens/honey#collateral-caps) to HONEY documentation. Documented paused vault treatment in cap calculations, weight changes via minting with other collaterals, and liquidate's filtered weight check. Updated [HoneyFactory](/developers/contracts/honey-factory#liquidate) liquidate reference.

## December 2025

**Reward allocation documentation updates** – Updated [BeraChef reward allocation documentation](/learn/pol/blockrewards#berachef-reward-allocation-management) to clarify the automated cutting board mechanism.

**Beacon Kit API updates** – Added new proof endpoints and enhanced existing endpoints in the [Beacon Kit API](/beacon-kit/api) with [Beacon-Kit v1.3.5][/nodes/evm-execution].

## November 2025

**Balancer Exploit Remediation** – Shipped [multiple upgrades to Bera-Geth and Bera-Reth](/nodes/evm-execution) to deal with the Balancer exploit.

## October 2025

**[Hub API documentation](/developers/hub-api)** – Added reference documentation for the Hub GraphQL API that powers hub.berachain.com. Includes 50+ queries for pools, tokens, validators, reward vaults, and smart order routing with tested examples and schema reference.

**[Bend documentation](https://docs.bend.berachain.com)** – Launched dedicated documentation site for Bend, Berachain's borrowing and lending protocol. Includes market mechanics, developer guides, and contract references.

**[Smart contract verification guide](/developers/guides/verify-smart-contracts)** – Added guide for verifying smart contracts on Berascan using Foundry, Hardhat, and manual verification methods with constructor parameter encoding examples.

**[Safe contracts](/developers/deployed-contracts)** – Added Safe v1.4.1 contract addresses for multi-signature wallet deployments including SafeProxyFactory, MultiSend, and related contracts.

**[PoL integration quickstart](/developers/quickstart/pol-integration)** – Updated the [Incentivize Anything playground](https://playground.bepolia.berachain.com) examples.

**[BEX documentation updates](http://docs.bex.berachain.com/)** – Updated swap guides with enhanced price impact information and standardized terminology across all BEX documentation.

**[Bridge to Berachain quickstart guide](/developers/quickstart/bridge-to-berachain)** – Vor bridging assets to Berachain, including LayerZero OFT integration patterns and token team deployment workflows. Updated with [Berachain Bridge dApp](/learn/dapps/berachain-bridge) documentation.

**[sWBERA token documentation](/learn/pol/tokens/swbera)** – Including 7-day unstaking period details, integration patterns, and contract reference information.


## September 2025

**Bepto hardfork** [upgrade instructions](/nodes/guides/bepto) are posted.  Based on further community feedback, this upgrade removes the minimum base fee set as part of BRIP-0002. However, the base fee rate of change will remain the same as introduced in BRIP-0002.

**Node operator updates** – Updated [validator lifecycle guide](/nodes/validator-lifecycle) with enhanced details and improved voluntary exit documentation.

**Honey token documentation** – Updated [HONEY token documentation](/learn/pol/tokens/honey) with improved precision and added [Berascan token update guide](/learn/guides/berascan-token-update).

## August 2025

**Reward Vault enhanced functionality** – Added two new functions to enhance staking and reward management capabilities:

- **`stakeOnBehalf`** – Allows any account to stake tokens directly for another account without requiring delegation permissions. This enables new integration patterns for protocol-to-protocol interactions, automated staking services, and custodial solutions while giving the beneficiary full control over their staked balance. See the [Staking for Other Accounts guide](/developers/guides/staking-for-other-accounts) for implementation details.

- **`getPartialReward`** – Enables claiming specific amounts of BGT rewards instead of all accumulated rewards at once. This supports streaming rewards, vesting strategies, dollar-cost averaging patterns, and gas optimization for large reward balances. See the [Partial Reward Claims guide](/developers/guides/partial-reward-claims) for advanced examples.



**Contract documentation refresh** – Updated all contract reference documentation to follow the standard autodocs pattern with proper organization by function type (Constants → State Variables → Structs → View Functions → Functions → Events → Errors). All PoL contracts now follow consistent documentation standards including **[BGTStaker](/developers/contracts/bgt-staker)**, **[Reward Vault](/developers/contracts/reward-vault)**, **[BeraChef](/developers/contracts/berachef)**, **[BGT Token](/developers/contracts/bgt-token)**, **[BGT Incentive Distributor](/developers/contracts/bgtincentivedistributor)**, **[Block Reward Controller](/developers/contracts/block-reward-controller)**, **[Fee Collector](/developers/contracts/fee-collector)**, **[Governance](/developers/contracts/governance)**, **[Honey Factory](/developers/contracts/honey-factory)**, **[Honey Factory Reader](/developers/contracts/honey-factory-reader)**, **[WBERA Staker Vault](/developers/contracts/wbera-staker-vault)**, **[BeaconDeposit](/developers/contracts/beacondeposit)**, **[Create2](/developers/contracts/create2)**, **[Multicall3](/developers/contracts/multicall3)**, **[Permit2](/developers/contracts/permit2)**, **[Reward Vault Factory](/developers/contracts/reward-vault-factory)**, **[Timelock](/developers/contracts/timelock)**, and **[WBERA Token](/developers/contracts/wbera-token)**.
- Updated [BGT claiming guide](/learn/guides/claim-bgt) with protocol claiming information
- Enhanced [PoL integration quickstart](/developers/quickstart/pol-integration) highlighting new staking options

---

Launched the August 2025 hardfork, which delivers:
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
