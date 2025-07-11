# Berachain Changelog

Berachain Improvement Proposals (BRIPs) are welcome from anyone, by [contributing to the BRIP repository at GitHub](https://github.com/berachain/BRIPs/tree/main) and then posting to the the [Berachain Forum](https://hub.forum.berachain.com/c/brips/9).

Below are important changes shipped to Berachain.

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

  This setting is no longer used and should be removed.

  **FILE:** `app.toml`
  ```
  rpc-retries = 10
  ```

* `excessive peering`

  We recommend that most node operators, including validators, set their maximum inbound peers to 40, and maximum outbound peers to 10.
  We previously shipped considerably higher default values for this, which can cause excessive memory and CPU consumption.

  **FILE:** `config.toml`
  ```
  max_num_inbound_peers = 40
  max_num_outbound_peers = 10
  ```
  
* `State pruning disabled. This may increase memory footprint considerably`

  Setting `beacond` to disable state pruning, in which previous states are kept, dramatically increases memory usage. Simple RPC nodes can use `everything`, and validator nodes should use `everything`. The only exception is if your node is being used to [calculate block reward claims](https://docs.berachain.com/nodes/guides/distribute-block-rewards), in which case the `default` setting is a good choice, but this **should not** be done on the validator itself.
  
  **FILE:** `app.toml`
  ```
  pruning = "everything"      # typical
  pruning = "default"         # needed for calculating block reward proofs
  ```

## 2025-MAR: Beacon Kit v1.1.3

This release restructures Consensus Layer and Execution Layer communication to keep them in lock-step.

Now, every RPC communication issue among them will result in a BeaconKit termination *but* keeps their states in sync so you can easily restart any time and keep going.

To that end, configure Reth to not forget blocks on exit with these command line options:

```bash
# Reth execution client required flags
--engine.persistence-threshold 0
--engine.memory-block-buffer-target 0
```

You don't need to keep these once the node has completed sync, but they make resuming syncing, or syncing from genesis, more robust.

## 2025-FEB: Beacon Kit v1.1.2

This is a security-focused update:
* Harden timestamp validation of EL payload
* Prevent potential panics and node halts while decoding data

## 2025-JAN-20

We launched Proof of Liquidity 1.0 with public release of the [Honey Paper](https://honeypaper.berachain.com/) and Berachain Mainnet.

## 2025-JAN: Beacon Kit v1.1.1

BeaconKit 1.1.1 fixes ASA-2025-001 and ASA-2025-002, which could lead to a network halt. Moreover it hardens some checks around deposit and blob processing.

## 2025-JAN: Beacon Kit v1.1.0

BeaconKit v1.1.0 unlocks minting of tokens towards the BGT contract.