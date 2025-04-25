# Beacon Kit Changelog

## v1.2.0-rc: Bectra

**Beacon Kit 1.2.0** adds support for [Validator Stake withdrawals](https://docs.berachain.com/nodes/guides/withdraw-stake) and EIP-7702.  

**[Upgrade instructions are posted](/nodes/guides/bectra)**. 

**What's new**

Since this is a .0 release, that means breaking changes.

This is a *hardfork* planned to release onto Bepolia on May 7 2025 at 10 AM EST.
Beacon Kit 1.2.0-rc is required to communicate on Bepolia after that time.

The -rc will be initially rc0, but there may be more RC releases. Click "Watch" on the [Beacon Kit repository home](https://github.com/berachain/beacon-kit), and monitor the #dev-resources channel on [Discord](https://discord.gg/berachain).

**The `CHAIN_SPEC` environment variable is no longer used.** There are new [options](/beacon-kit/configuration#beaconkit-configuration) in [app.toml](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80069/app.toml#L117) for controlling the desired chain. Though defaulted to mainnet so that money machines don't stop working, for Bepolia this line must be added.

  ```app.toml
  [beacon-kit] 
  chain-spec = "testnet"
  ```


**New Required EL Versions.** We have updated our [Execution Layer recommended versions](/nodes/evm-execution) to show new versions required for the post-Bectra upgrade.  New deployments should use those recommended versions.

To emphasize, **do not change anything on mainnet nodes yet**.
These are for **Bepolia only**.
Mainnet upgrades will be confirmed/announced after Beacon Kit 1.2.0 is out of "release candidate" testing.


## v1.1.4: configuration advice

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

  Setting `beacond` to disable state pruning, in which previous states are kept, dramatically increases memory usage. Simple RPC nodes can use `everything`, and validator nodes should use `everything`.  The only exception is if your node is being used to [calculate block reward claims](https://docs.berachain.com/nodes/guides/distribute-block-rewards), in which case the `default` setting is a good choice, but this **should not** be done on the validator itself.
  
  **FILE:** `app.toml`
  ```
  pruning = "everything"      # typical
  pruning = "default"         # needed for calculating block reward proofs
  ```

## v1.1.3: fix `deposit mismatch`

This release restructures Consensus Layer and Execution Layer communication to keep them in lock-step.

Now, every RPC communication issue among them will result in a BeaconKit termination *but* keeps their states in sync so you can easily restart any time and keep going.

To that end, configure Reth to not forget blocks on exit with these command line options:

```bash
# Reth execution client required flags
--engine.persistence-threshold 0
--engine.memory-block-buffer-target 0
```

You don’t need to keep these once the node has completed sync, but they make resuming syncing, or syncing from genesis, more robust.


## v1.1.2: security improvements

This is a security-focused update:
* Harden timestamp validation of EL payload
* Prevent potential panics and node halts while decoding data

## v1.1.1: fixes potential halt

BeaconKit 1.1.1 fixes ASA-2025-001 and ASA-2025-002, which could lead to a network halt. Moreover it hardens some checks around deposit and blob processing.

## v1.1.0: BGT minting

BeaconKit v1.1.0 unlocks minting of tokens towards the BGT contract.
