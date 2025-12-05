---
head:
  - - meta
    - property: og:title
      content: Staking Pools Installation Guide
  - - meta
    - name: description
      content: Install and activate staking pools using the helper scripts (validator-focused)
  - - meta
    - property: og:description
      content: Install and activate staking pools using the helper scripts (validator-focused)
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Staking Pools Installation Guide

This guide walks validator operators through installing and activating a staking pool using the helper scripts.

## What you’ll use

The helper scripts are available through github:

```
$ git clone https://github.com/berachain/guides/
$ cd guides/apps/staking-pools
$ ls -F
frontend/   install-helpers/
```

There are many useful scripts under `install-helpers/` which wrap multi-step operations into safe, review-first commands:

- `activate.sh`: Deploys a new pool (when needed) and generates the activation command once the validator is registered
- `status.sh`: Verifies deployment, registration, and activation status
- `stake.sh`: Generates a staking transaction to add BERA to your pool

All scripts write ready-to-run `cast` commands to files for you to review and execute. They do not send transactions without your confirmation.

## Requirements

- beacond (validator client) running and synced with your validator keys **backed up somewhere safe**.
- Foundry `cast` (`https://getfoundry.sh/`)
- `jq`, `bc`, `curl`,
- Ledger hardware wallet (default) or a private key set via `PRIVATE_KEY`
- Funds: at least 10,000 BERA for the initial deposit; additional stake as desired (Bepolia typically targets 250,000 BERA total)

## 1) Configure environment

In `install-helpers/`:

```bash
cp env.sh.template env.sh
# Edit env.sh and set at minimum:
#   BEACOND_HOME="/path/to/your/beacond/home"
#   NODE_API_ADDRESS="127.0.0.1:3500"  # If not auto-detected from app.toml
# Optionally set:
#   PRIVATE_KEY="0x..."            # Defaults to Ledger if unset
```

Ensure the beacon node API is enabled in your `app.toml` (`[beacon-kit.node-api]`) or provide `NODE_API_ADDRESS` in `env.sh`. The scripts will auto-detect when possible and verify connectivity before proceeding.

## 2) Deploy and activate (validator-only)

Run `activate.sh` with your addresses:

```bash
./activate.sh --sr 0xSHARES_RECIPIENT --op 0xOPERATOR
```

1. The chain (mainnet or bepolia) is auto-detected from your beacond configuration.
2. If your validator is not yet registered on the beacon chain, the script writes `deployment-command.sh` (includes the 10,000 BERA deposit). Review it. Simulate it if you want. Then run it. This should dump a successful transaction receipt.
3. Wait 192 blocks for the validator to be registered. Then run `activate.sh` again.
4. The script writes `activation-command.sh` with fresh proofs and a timestamp. Execute it within ~10 minutes.
5. The script also predicts and shows your staking pool contract addresses ahead of time.

## 3) Verify installation

Use `status.sh` to check deployment, registration, and activation:

```bash
./status.sh
```

You should see the SmartOperator, StakingPool, StakingRewardsVault, and IncentiveCollector addresses, confirmation that the beacon deposit operator matches your SmartOperator, the pool's active status, and various telemetry.

## 4) Set minimum effective balance

**Critical Step:** The `minEffectiveBalance` parameter determines when your staking pool activates its validator on the consensus layer. The consensus layer has a floor of {{ config.mainnet.minEffectiveBalance }} BERA, but when the validator set is full (all {{ config.mainnet.validatorActiveSetSize }} validator slots occupied), the minimum stake required increases in {{ config.mainnet.stakeMinimumIncrement }} BERA increments.

If you don't set this value correctly, your pool may accumulate deposits without ever activating. **You must set `minEffectiveBalance` to match the current minimum stake required if it exceeds {{ config.mainnet.minEffectiveBalance }} BERA.**

To determine the current minimum stake requirement:

1. Check [Berachain Hub](https://hub.berachain.com/boost/) to see the current number of active validators
2. If the validator set is full ({{ config.mainnet.validatorActiveSetSize }} validators), identify the lowest stake amount among active validators
3. Calculate the minimum required stake (lowest active stake, rounded up to the nearest {{ config.mainnet.stakeMinimumIncrement }} BERA increment)

Set the value using your SmartOperator contract:

```bash
cast send $SMART_OPERATOR_ADDRESS \
  "setMinEffectiveBalance(uint256)" $CALCULATED_MIN_STAKE \
  --ledger  # or --private-key $PRIVATE_KEY
```

Replace `$SMART_OPERATOR_ADDRESS` with your SmartOperator address and `$CALCULATED_MIN_STAKE` with the calculated minimum stake amount in wei (multiply BERA amount by 10^18).

For more details on why this matters, see the [Setting Minimum Effective Balance](/nodes/staking-pools/operators#setting-minimum-effective-balance) section in the operator guide.

## 5) (Optional) Stake additional BERA

Add stake to your pool and send stBERA to a receiver address:

```bash
# With BEACOND_HOME configured (pool auto-detected):
./stake.sh --amount 100 --receiver 0xRECEIVER

# Or specify an explicit pool address:
./stake.sh --amount 100 --receiver 0xRECEIVER --staking-pool 0xPOOL
```

The script writes `stake-command.sh`. Review and execute the command to submit your stake.

## Troubleshooting (quick)

- Node API not reachable: enable `[beacon-kit.node-api]` and confirm the address/port; or set `NODE_API_ADDRESS` in `env.sh`. The script will examine your files and tell you how to activate the API if it isn't enabled yet.
- Missing tools: install Foundry (`cast`), `jq`, `bc`, and `curl` and ensure they are on your PATH.
- Signing: by default the scripts use Ledger; set `PRIVATE_KEY` in `env.sh` if you prefer a local key.

## What’s next

- [Contract reference](/nodes/staking-pools/contracts.md) explains what you've deployed
- [Delegation guide](/nodes/staking-pools/delegators) explains how to receive a Foundation delegation, which is very similar to this flow.
