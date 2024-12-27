---
head:
  - - meta
    - property: og:title
      content: Managing Validator Reward Allocations
  - - meta
    - name: description
      content: Learn how to manage validator reward allocations using BeraChef
  - - meta
    - property: og:description
      content: Learn how to manage validator reward allocations using BeraChef
---

<script setup>
  import config from "@berachain/config/constants.json";
</script>

# Managing Validator Reward Allocations 🧑‍🍳

This guide will walk you through managing your validator's reward allocations using [BeraChef](/developers/contracts/berachef) via Foundry `cast` and the BeraHub UI.

## Requirements

- Active Validator Node
- Validator Operator Wallet Address & Private Key
- Validator PubKey
- [Foundry](https://book.getfoundry.sh/getting-started/installation) using `cast`

## Understanding Reward Allocations

Each validator can customize how their rewards are distributed across different reward vaults. If no custom allocation is set, a default allocation is used.

**Key concepts:**

- Reward allocations must total 100% (10000 basis points)
- Only whitelisted vaults can receive allocations
- Changes require queuing and a delay period before activation
- Current delay: {{config.mainnet.rewardAllocationBlockDelay}} blocks

## Option A - Using Foundry CLI

### Step 1 - Check Active Allocation

Start by checking your validator's current reward allocation:

```bash-vue
cast call {{config.contracts.berachef.address}} \
"getActiveRewardAllocation(bytes)" \
"<YOUR_VALIDATOR_PUBKEY>" \
--rpc-url {{config.mainnet.rpcUrl}};

# [Expected Similar Output]:
# 0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000001b68ee000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000cc03066a3a06f3ac68d3a0d36610f52f7c208770000000000000000000000000000000000000000000000000000000000000686000000000000000000000000842c6cc319de7af0cd43f55009b5c1519cb06800000000000000000000000000000000000000000000000000000000000000068200000000000000000000000067993fc90a8ec45625447ad2ff454cfd3fbe9d7900000000000000000000000000000000000000000000000000000000000006820000000000000000000000007d949a79259d55da7da18ef947468b6e0b34f5cf0000000000000000000000000000000000000000000000000000000000000682000000000000000000000000b930dcbfb60b5599836f7ab4b7053fb4d881940e000000000000000000000000000000000000000000000000000000000000068200000000000000000000000079dc1bd33e5f6437e103ba321395c4d4629d580e0000000000000000000000000000000000000000000000000000000000000682
```

Example decoded output:

```bash-vue
cast --abi-decode "getActiveRewardAllocation(bytes)((uint64,(address,uint96)[]))" \
"0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000001b68ee000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000cc03066a3a06f3ac68d3a0d36610f52f7c208770000000000000000000000000000000000000000000000000000000000000686000000000000000000000000842c6cc319de7af0cd43f55009b5c1519cb06800000000000000000000000000000000000000000000000000000000000000068200000000000000000000000067993fc90a8ec45625447ad2ff454cfd3fbe9d7900000000000000000000000000000000000000000000000000000000000006820000000000000000000000007d949a79259d55da7da18ef947468b6e0b34f5cf0000000000000000000000000000000000000000000000000000000000000682000000000000000000000000b930dcbfb60b5599836f7ab4b7053fb4d881940e000000000000000000000000000000000000000000000000000000000000068200000000000000000000000079dc1bd33e5f6437e103ba321395c4d4629d580e0000000000000000000000000000000000000000000000000000000000000682"

# (1796334,
# [(0x0cc03066a3a06F3AC68D3A0D36610F52f7C20877, 1670),
# (0x842c6CC319De7aF0cd43F55009B5c1519CB06800, 1666),
# (0x67993Fc90A8EC45625447Ad2ff454cfD3fbE9d79, 1666),
# (0x7D949A79259d55Da7da18EF947468B6E0b34f5cf, 1666),
# (0xb930dCBfB60B5599836f7aB4B7053fB4D881940E, 1666),
# (0x79DC1bd33e5F6437e103ba321395C4d4629d580e, 1666)])
```

The output is your validator's `RewardAllocation` struct, a tuple containing:

1. The allocation start block
2. An array of tuples, each containing the vault address and the percentage numerator (adding up to `10000`)

### Step 2 - Queue New Allocation

An example command to queue a new allocation resembles the following:

```bash-vue
cast send {{config.contracts.berachef.address}} \
"queueNewRewardAllocation(bytes,uint64,tuple(address,uint96)[])" \
"<YOUR_VALIDATOR_PUBKEY>" \
"$START_BLOCK" \
"[(0x12345...,5000),(0x56789...,5000)]" \
--private-key <YOUR_VALIDATOR_OPERATOR_ADDRESS_PRIVATE_KEY> \
--rpc-url {{config.mainnet.rpcUrl}}
```

:::info
Remember that your `START_BLOCK` must be greater than the current block number + the block delay
:::

### Step 3 - Check Your Queued Allocation

Check your new pending allocation:

```bash-vue
cast call {{config.contracts.berachef.address}} \
"getQueuedRewardAllocation(bytes)" \
"<YOUR_VALIDATOR_PUBKEY>" \
--rpc-url {{config.mainnet.rpcUrl}};
```

Once the `startBlock` is reached, the new allocation will be automatically activated the next time rewards are distributed for your validator.

## Option B - Using BeraHub UI

You can also manage your reward allocations through the Berachain Dashboard:
![Reward Allocation](/assets/reward-allocation.png)

1. Navigate to <a target="_blank" :href="config.mainnet.dapps.hub.url + 'validators'">Validator Dashboard</a> on {{config.mainnet.dapps.hub.name}}
2. Connect your validator operator wallet
3. Click **Manage as a validator**
4. Click the **Configuration** tab
5. Select your vaults and choose desired allocation percentages (ensuring they add up to 100%)
6. Click **Queue** and submit the transaction
