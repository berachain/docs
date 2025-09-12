---
head:
  - - meta
    - property: og:title
      content: Distribute Block Rewards on Berachain
  - - meta
    - name: description
      content: How to distribute block rewards on Berachain
  - - meta
    - property: og:description
      content: How to distribute block rewards on Berachain
---

<script setup>
    import config from '@berachain/config/constants.json';
</script>

# Distribute Block Rewards

:::tip
With the [August 2025 Upgrade](/nodes/guides/august-2025-upgrade), distributing your own block rewards is no longer necessary.
Thanks to [BRIP-0004](https://github.com/berachain/brips/blob/main/meta/BRIP-0004.md), the process is built into the protocol.
:::

The following steps will guide you through the process of distributing block rewards on Berachain for both Validators and Reward Vaults.

## How Block Rewards Are Distributed

Block rewards are distributed to both a Validator and Reward Vaults defined by the respective Validator's Reward Allocation.

Reward distribution does not happen automatically and requires that the `distributeFor` function be called in the <a :href="config.mainnet.dapps.berascan.url + 'address/' + config.contracts.pol.distributor['mainnet-address']" target="_blank">Distributor</a> contract.

## Who Can Distribute Block Rewards?

Anyone can trigger this function, as long as they have access to the proof generation endpoint provided by `beacond`. Anyone can also execute the `distributeFor` function for past blocks.

## Distribution Considerations

There are a few points to consider with distribution:

1. **Distribute At Block N-1** - The Distributor contract can only distribute block rewards for the block that was last created and not the current block.
2. **Block Rewards Expiration** - If rewards are not distributed within `{{config.mainnet.rewardDistributionTimeExpiration}}` seconds, the rewards are lost.
3. **Foundation Trigger Fallback** - The Berachain foundation has set up a service to call the `distributeFor` function periodically, including sometimes in a `multicall` to ensure that block rewards are distributed. However, this fallback should be considered a last resort, and Validators should plan to set up a service to handle triggering the distribution themselves.
4. **Block Reward Tracking** - It is recommended that node operators track the block rewards they have distributed to ensure that they are not missing any rewards.

## Requirements

Before you begin, ensure you have the following:

- A full node synced to the latest block with `beacond` and an execution client
- `$BERA` to process the transaction
- [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Steps To Distribute Block Rewards Via Foundry

The following is a single bash command that can be run to distribute block rewards.

:::info
**NOTE:** If the transaction fails, it is possible that these block rewards have already been distributed.
:::

```bash-vue
# FROM: /

# STEP 1 - Get Block(s) To Be Distributed
# ----------------------------------------------------
# Get recent finalized block's number from Exec Layer -> Get timestamp of its parent block
# Example: 1730756547

cast block finalized --rpc-url http://localhost:8545;

# [Expected Similar Output]:
# baseFeePerGas        7
# difficulty           0
# extraData            0xd883010e05846765746888676f312e32322e34856c696e7578
# gasLimit             30000000
# gasUsed              1362987
# hash                 0xb576213ebb325ca33e9ceb47f2d1a813b193fb87aa46f82a31111e19bfafc130
# logsBloom            0x0000020000000000000000000000000010008002420000040000000020010400004000000000000000000001000000000004128000000000000000000028810104000008000000200020200800000001000040240000000000000c0001800000001001000200000000000040000408000402000800900080000000100000000000c40080010000000404040500a010000000000000000100200080400000000002042000040208400000200000000000180000000001000008200000008000000008000200000000000000000000000000000b010010080a00800000000020000010040000003800210000082000400088008000081000000000204110800001
# miner                0x0000000000000000000000000000000000000000
# mixHash              0x768a48d830a60995602bf4c788feeeb73dcb033f860a5f5fbd310dcc66f2da2b
# nonce                0x0000000000000000
# number               2340989 <---- WE NEED THIS
# ...

TARGET_BLOCK=`cast block finalized --rpc-url http://localhost:8545 | grep number | awk '{print $2}'`;
PARENT_BLOCK=`expr $TARGET_BLOCK + 1`;

# Get the next timestamp - we will generate the rewards by referencing the parent block
# Each second identifies a specific block; use the next second to reference the parent block.
TIMESTAMP=`cast block $PARENT_BLOCK --rpc-url http://localhost:8545 | grep timestamp | awk '{print $2}'`;
echo $TIMESTAMP;

# [Expected Similar Output]:
# 1734598728

# STEP 2 - Generate Proofs For Block
# ----------------------------------------------------
# Sanity check - isTimestampActionable? Returns true if rewards have not yet been distributed for this block.

# NOTE: Distribute contract may differ
cast call "{{config.contracts.pol.distributor['mainnet-address']}}" "isTimestampActionable(uint64 timestamp) returns (bool success)" "$TIMESTAMP" --rpc-url http://localhost:8545;

# [Expected Output]:
# true

# This is in the scenario where `beacond` is running locally.
PROOF_JSON=`curl http://localhost:3500/bkit/v1/proof/block_proposer/t$TIMESTAMP`
echo $PROOF_JSON;

# STEP 3 - Distribute Block Rewards
# ----------------------------------------------------
# Retrieve needed data
PROPOSER_INDEX=`echo $PROOF_JSON|jq -r '.beacon_block_header.proposer_index'`;
VAL_PUBKEY=`echo $PROOF_JSON|jq -r '.validator_pubkey'`;
PROPOSER_PROOF=`echo $PROOF_JSON|jq -j '.proposer_index_proof'|sed 's/"//g'|tr -d '\\n'`;
VAL_PUBKEY_PROOF=`echo $PROOF_JSON|jq -j '.validator_pubkey_proof'|sed 's/"//g'|tr -d '\\n'`;

# Execute tx after setting PK of wallet sending tx (or use --ledger if not using raw PK)
# Example: Transaction successfully executed. Gas used: 104467
WALLET_PRIVATE_KEY=<0xYOUR_WALLET_PRIVATE_KEY>;

cast send "{{config.contracts.pol.distributor['mainnet-address']}}" \
"distributeFor(uint64 nextTimestamp, uint64 proposerIndex, bytes calldata pubkey, bytes32[] calldata proposerIndexProof, bytes32[] calldata pubkeyProof)" \
"$TIMESTAMP" \
"$PROPOSER_INDEX" \
"$VAL_PUBKEY" \
"$PROPOSER_PROOF" \
"$VAL_PUBKEY_PROOF" \
--private-key $WALLET_PRIVATE_KEY \
--rpc-url http://localhost:8545;
```
