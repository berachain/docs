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

- `register.sh`: Deploys (registers) staking pool contracts and generates the deployment transaction
- `activate.sh`: Activates a deployed pool using validator proofs from the beacon chain
- `status.sh`: Verifies deployment, registration, and activation status
- `stake.sh`: Generates a staking transaction to add BERA to your pool

**Important:** All scripts write ready-to-run `cast` commands to files for you to review and execute. They do not send transactions without your confirmation. By default, scripts use Ledger for signing; set `PRIVATE_KEY` in `env.sh` if you prefer a local key.

## Requirements

- beacond (validator client) running and synced with your validator keys **backed up somewhere safe**.
- Foundry `cast` (`https://getfoundry.sh/`)
- `jq`, `bc`, `curl`,
- Ledger hardware wallet (default) or a private key set via `PRIVATE_KEY`
- Funds: at least 10,000 BERA for the initial deposit; additional stake as desired

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

## 2) Register (deploy contracts)

Run `register.sh` with your addresses to deploy the staking pool contracts:

```bash
./register.sh --sr 0xSHARES_RECIPIENT --op 0xOPERATOR
```

1. The chain (mainnet or Bepolia) is auto-detected from your beacond configuration.
2. The initial stake is 10,000 BERA (fixed by the consensus layer). The script writes `deployment-command.sh` with this deposit. Review it. Simulate it if you want. Then run it. This should dump a successful transaction receipt.
3. The script also predicts and shows your staking pool contract addresses ahead of time.

## 3) Wait for validator registration

After deploying the contracts, wait for your validator to be registered on the beacon chain. You can check registration status with:

```bash
./status.sh
```

The validator must appear on the beacon chain before you can activate the pool.

## 4) Activate the pool

Once your validator is registered, run `activate.sh` to activate the pool:

```bash
./activate.sh --sr 0xSHARES_RECIPIENT --op 0xOPERATOR
```

1. The script validates that the pool contract exists (error if not deployed).
2. The script verifies that the validator is registered on the beacon chain (error if not registered).
3. The script writes `activation-command.sh` with fresh proofs and a timestamp. Execute it within ~10 minutes.

## 5) Verify installation

Use `status.sh` to check deployment, registration, and activation:

```bash
./status.sh
```

You should see the SmartOperator, StakingPool, StakingRewardsVault, and IncentiveCollector addresses, confirmation that the beacon deposit operator matches your SmartOperator, the pool's active status, and various telemetry.

## 6) Set minimum effective balance

**Critical Step:** The `minEffectiveBalance` parameter determines when your staking pool activates its validator on the consensus layer. If you don't set this value correctly, your pool may accumulate deposits without ever activating.

Set the value using your SmartOperator contract:

```bash
cast send $SMART_OPERATOR_ADDRESS \
  "setMinEffectiveBalance(uint256)" $CALCULATED_MIN_STAKE \
  --ledger  # or --private-key $PRIVATE_KEY
```

Replace `$SMART_OPERATOR_ADDRESS` with your SmartOperator address and `$CALCULATED_MIN_STAKE` with the calculated minimum stake amount in wei (multiply BERA amount by 10^18).

For details on why this matters, how to determine the correct value, and how the consensus layer minimum works, see the [Setting Minimum Effective Balance](/nodes/staking-pools/operators#setting-minimum-effective-balance) section in the operator guide.

## 7) (Optional) Stake additional BERA

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

## What’s next

- [Contract reference](/nodes/staking-pools/contracts.md) explains what you've deployed
- [Delegation guide](/nodes/staking-pools/delegators) explains how to receive a Foundation delegation, which is very similar to this flow.
