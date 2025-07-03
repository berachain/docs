# Berachain Changelog

Berachain Improvement Proposals (BRIPs) are welcome from anyone, by [contributing to the BRIP repository at GitHub](https://github.com/berachain/BRIPs/tree/main) and then posting to the the [Berachain Forum](https://hub.forum.berachain.com/c/brips/9).

Below are important changes shipped to Berachain.

## 2025-JUL-03

* **[Reward Vault upgrades](/developers/contracts/reward-vault)**
  * Introduced _rate-based_ incentive distribution via `targetRewardsPerSecond`, with automatic duration clamping between `MIN_REWARD_DURATION` (3 days) and `MAX_REWARD_DURATION` (7 days).
  * Added `setRewardsDuration`, `setRewardDurationManager`, and related state (`pendingRewardsDuration`, `minRewardDurationForTargetRate`).
* **Validator commission cap** – [`BeraChef`](/developers/contracts/berachef) now enforces a hard upper-limit of **20 %** on incentive-token commission (`MAX_COMMISSION_RATE = 0.2e4`). 
* **Documentation refresh** – contract references, guides, and the [rate-based distribution section](/learn/pol/incentives#rate-based-reward-distribution-target-rate) were updated to reflect these mechanics.

## 2025-JUNE-17

The delay for reward allocation changes has been reduced from 8,191 blocks to 500.

## 2025-JUNE-04: Bectra Hardfork (Bera + Prague + Electra)

**Beacon Kit 1.2.0** adds support for [Validator Stake withdrawals](https://docs.berachain.com/nodes/guides/withdraw-stake) and [EIP 7702](/developers/guides/eip7702-basics), among a few other EIPs. The release candidate upgrades Bepolia, and the final release upgrades mainnet.

This is a *hardfork* activated on Berachain Mainnet on June 4 2025.
Beacon Kit 1.2.0 is required to continue following Berachain Mainnet after that time.

Since this is a minor version release (`major.minor.0`), there are breaking changes.

**What's new**

**The `CHAIN_SPEC` environment variable is no longer used.** There are new [options](/beacon-kit/configuration#beaconkit-configuration) in [app.toml](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80069/app.toml#L117) for controlling the desired chain to follow. Though defaulted to mainnet so that money machines don't stop working, for Bepolia this configuration must be added:

  ```app.toml
  [beacon-kit] 
  chain-spec = "testnet"
  ```

During `beacond init`, for new installations, `beacond` accepts the new [command line option](beacon-kit/cli#flags) `--beacon-kit.chain-spec`.

**New Required EL Versions.** We have updated our [Execution Layer recommended versions](/nodes/evm-execution) to show new versions required for the post-Bectra upgrade. New deployments should use those recommended versions.

**Support for new EIPs.** 

This release adds support for:
* **EIP-2537** Precompile for BLS12-381 curve operations
* **EIP-2935** Serve historical block hashes from state
* **EIP-7002** Execution layer triggerable withdrawals
* **EIP-7623** Increase calldata cost
* **EIP-7685** General purpose EL requests
* **EIP-7702** Set code for EOA 
* **EIP-7840** Add blob schedule to EL config files

## 2025-MAY

The [Claim API](/developers/claim-api) is now released.

## 2025-APR-24

1. New Maximum of 3 incentives per reward vault
2. Block Reward Emissions have been modified in line with the targeted inflation rate of 10%. Updated constants are found on-chain via [BlockRewardController](https://berascan.com/address/0x1AE7dD7AE06F6C58B4524d9c1f816094B1bcCD8e) and described in [Block Rewards](/learn/pol/blockrewards).
3. Auto-Incentivizer: fees from default cutting board BEX Reward Vaults will use the fees to automatically offer incentives.

![Berachain Auto-Incentivizer](/assets/auto-incentivizer.png)

## 2025-APR-18

Reward Allocations limit any one reward vault to 30% share of emissions.

## 2025-APR: Beacon Kit v1.1.4

Improves `beacond` handling of transient conditions (which solve themselves) such as a slow execution layer. It will still exit if the execution layer is shut down.

Also, on startup, beacond now issues warnings about deprecated settings, or settings that could be improved.

* ```WARN Automatically raising RPCTimeout ... minimum=2000```

  Set your RPC timeout to at least 2 seconds:

  **FILE:** `app.toml`
  ```
  rpc-timeout = "2s"
  ```

* `ignoring deprecated setting rpc-retries`