---
head:
  - - meta
    - property: og:title
      content: Manage Validator Incentives Commission Rate On Berachain
  - - meta
    - name: description
      content: How to manage validator incentives commission rates on Berachain
  - - meta
    - property: og:description
      content: How to manage validator incentives commission rates on Berachain
---

<script setup>
    import config from '@berachain/config/constants.json';
</script>

# Manage Validator Incentives Commission Rate

A validator has the option to manage what percentage of Incentives they can claim as a commission and what amount is claimable by user's who boost the validator with $BGT. In this guide, we'll walk through the process of changing a validator's commission.

![Berachain Change Valiadtor Commission Rate Process](/assets/berachain-change-validator-commission-rate-process.png)

## Requirements

Before you begin, ensure you have the following:

- An RPC endpoint to Berachain
- `$BERA` to process the transaction\
- `Operator Address` of the validator wanting to change their commission
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- BeraChef Contract Address - <a :href="config.mainnet.contracts.berachef.docsUrl">`{{config.mainnet.contracts.berachef.address}}`</a>

## How Validator Commissions Are Updated

At the time that Incentives have been activated, all commission rates for Validator Incentives have been defaulted to 5% - Validators receive 5% of all Incentives. This is defined by `DEFAULT_COMMISSION_RATE` in `BeraChef.sol`.

In order for a validator to change their commission rate, they will first need to queue the change, wait the `MAX_COMMISSION_CHANGE_DELAY` of (16,382 Blocks) and then active then the new commission. If a commission rate is already queued, it must be activated before a new commission rate can be proposed as a queue again.

:::tip
**Anyone** can activate a queued commission rate, not just the validator.
:::

## Option A - Change Validator Commission Using Foundry

The following will walk you through updating the Validator Commission rate via Foundry's CLI `cast`.

### Step 1 - Get Current Validator Commission Rate

```bash-vue
# Env Vars
BERACHEF_CONTRACT_ADDRESS={{config.mainnet.contracts.berachef.address}}
RPC_URL={{config.mainnet.rpcUrl}}
VALIDATOR_PUBKEY_KEY=<0xYOUR_VALIDATOR_PUBKEY>

# Command
cast call $BERACHEF_CONTRACT_ADDRESS \
    "getValCommissionOnIncentiveTokens(bytes)(uint96)" \
    $VALIDATOR_PUBKEY_KEY \
    --rpc-url $RPC_URL;
```

### Step 2 - Queue New Validator Commission Rate

The first step will be to determine the amount you will like to queue:

```bash-vue
# Env Vars
BERACHEF_CONTRACT_ADDRESS={{config.mainnet.contracts.berachef.address}}
RPC_URL={{config.mainnet.rpcUrl}}
OPERATOR_WALLET_PRIVATE_KEY=<0xYOUR_OPERATOR_WALLET_PRIVATE_KEY>
VALIDATOR_PUBKEY_KEY=<0xYOUR_VALIDATOR_PUBKEY>
COMMISSION_RATE=0.05e4 # 5% = 0.05e4 or 500, 100% 1e4 or 10000

# Command
cast send $BERACHEF_CONTRACT_ADDRESS \
    "queueValCommission(bytes,uint96)" \
    $VALIDATOR_PUBKEY_KEY \
    $COMMISSION_RATE \
    --private-key $OPERATOR_WALLET_PRIVATE_KEY \
    --rpc-url $RPC_URL;
```

### Step 3 - Verify Queued Validator Commission Rate

```bash-vue
# Env Vars
BERACHEF_CONTRACT_ADDRESS={{config.mainnet.contracts.berachef.address}}
RPC_URL={{config.mainnet.rpcUrl}}
VALIDATOR_PUBKEY_KEY=<0xYOUR_VALIDATOR_PUBKEY>

# Command
cast call $BERACHEF_CONTRACT_ADDRESS \
    "getValQueuedCommissionOnIncentiveTokens(bytes)((uint96,uint64))" \ \
    $VALIDATOR_PUBKEY_KEY \
    --rpc-url $RPC_URL;
```

### Step 4 - Active Queud Validator Commission Rate

:::tip
This can only be done after `16,382 Blocks` have passed, and this **_can be executed by anyone_**.
:::

```bash-vue
# Env Vars
BERACHEF_CONTRACT_ADDRESS={{config.mainnet.contracts.berachef.address}}
RPC_URL={{config.mainnet.rpcUrl}}
WALLET_PRIVATE_KEY=<0xYOUR_WALLET_PRIVATE_KEY>
VALIDATOR_PUBKEY_KEY=<0xVALIDATOR_PUBKEY>
COMMISSION_RATE=0.05e4 # 5% = 0.05e4 or 500, 100% 1e4 or 10000

# Command
cast send $BERACHEF_CONTRACT_ADDRESS \
    "activateQueuedValCommission(bytes)" \
    $VALIDATOR_PUBKEY_KEY \
    --private-key $WALLET_PRIVATE_KEY \
    --rpc-url $RPC_URL;
```
