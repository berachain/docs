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

The helper scripts live in the contracts-staking-pools repository under `script/install-helpers/` and wrap multi-step operations into safe, review-first commands:

- `activate.sh`: Deploys a new pool (when needed) and generates the activation command once the validator is registered
- `status.sh`: Verifies deployment, registration, and activation status
- `stake.sh`: Generates a staking transaction to add BERA to your pool

All scripts write ready-to-run `cast` commands to files for you to review and execute. They do not send transactions without your confirmation.

## Requirements

- beacond (validator client) running with your validator keys
- Foundry `cast` (`https://book.getfoundry.sh/`)
- `jq`, `bc`, `curl`
- Ledger hardware wallet (default) or a private key set via `PRIVATE_KEY`
- Funds: at least 10,000 BERA for the initial deposit; additional stake as desired (Bepolia typically targets 250,000 BERA total)

## 1) Configure environment

In `contracts-staking-pools/script/install-helpers/`:

```bash
cp env.sh.template env.sh
# Edit env.sh and set at minimum:
#   BEACOND_HOME="/path/to/your/beacond/home"
# Optionally set:
#   PRIVATE_KEY="0x..."            # Defaults to Ledger if unset
#   NODE_API_ADDRESS="127.0.0.1:3500"  # If not auto-detected from app.toml
```

Ensure the beacon node API is enabled in your `app.toml` (`[beacon-kit.node-api]`) or provide `NODE_API_ADDRESS` in `env.sh`. The scripts will auto-detect when possible and verify connectivity before proceeding.

## 2) Deploy and activate (validator-only)

Run `activate.sh` with your addresses:

```bash
./activate.sh --sr 0xSHARES_RECIPIENT --op 0xOPERATOR
```

- If your validator is not yet registered on the beacon chain, the script writes `deployment-command.sh` (includes the 10,000 BERA deposit). Run it and wait for confirmation, then run `activate.sh` again.
- Once registered, the script writes `activation-command.sh` with fresh proofs and a timestamp. Execute it within ~10 minutes.

The script also predicts and shows your core contract addresses ahead of time.

## 3) Verify installation

Use `status.sh` to check deployment, registration, and activation:

```bash
./status.sh
```

You should see the SmartOperator, StakingPool, StakingRewardsVault, and IncentiveCollector addresses, confirmation that the beacon deposit operator matches your SmartOperator, and the pool’s active status. If the pool isn’t active yet, follow the prompt to run the activation step.

## 4) (Optional) Stake additional BERA

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

For capital delegation flows and operator workflows that use delegated funds, see the Delegation guide. It builds on the same tooling but is out of scope for installation.

- [Delegation guide](/nodes/staking-pools/delegators) explains how to receive a Foundation delegation
- [Contract reference](/nodes/staking-pools/contracts.md) explains what you've deployed


