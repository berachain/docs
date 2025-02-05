---
head:
  - - meta
    - property: og:title
      content: Change Your Node Operator Address
  - - meta
    - name: description
      content: How to change your node operator address in Berachain
  - - meta
    - property: og:description
      content: How to change your node operator address in Berachain
---

<script setup>
    import config from '@berachain/config/constants.json';
</script>

# Change Your Validator Operator Address Programmatically

The following will walk you through the process of changing your operator address utilizing Foundry `cast`.

## What Is An Operator Address?

The Operator Address is the BERA wallet address that is associated with a validator node.

It is responsible for receiving block rewards and is the sole address that has permission to change the Reward Allocation to distribute `$BGT` emissions to Reward Vaults.

## Requirements

Before you begin, ensure you have the following:

- Operator Address Private Key
- Your Validator Withdraw Credential Address (If Different Than Operator Address)
- [BeaconKit Binary](https://github.com/berachain/beacon-kit/releases) (For Validator PubKey)
- `$BERA` to process the transaction
- [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Steps To Change Your Operator Address Via Foundry

:::warning
This process revokes the current operator's permissions to receive block rewards and change the validator's Reward Allocation.
:::

### Step 1 - Get Your Validator PubKey

```bash-vue
# FROM: /path/to/beacond

# BeaconKit Configuration - Example `$HOME/.beacond` or `/.beacond`
YOUR_BEACOND_HOME_DIR="<YOUR_BEACOND_HOME_DIRECTORY>";

# Withdraw Credential Address - Can be the same as the Operator Address
YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS="<0xYOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS>";

# Genesis Configurations - DO NOT CHANGE THESE
GENESIS_VALIDATORS_ROOT="{{config.testnet.genesisRoot}}";
GENESIS_FORK_VERSION="{{config.testnet.genesisForkVersion}}";
VAL_DEPOSIT_GWEI_AMOUNT="{{config.testnet.validatorDepositGweiAmount}}";
DEPOSIT_CONTRACT_ADDRESS="{{config.mainnet.contracts.beaconDeposit.address}}";

DEPOSIT_OUTPUT=$(./beacond deposit create-validator $YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS $VAL_DEPOSIT_GWEI_AMOUNT $GENESIS_FORK_VERSION $GENESIS_VALIDATORS_ROOT --home $YOUR_BEACOND_HOME_DIR);
echo $DEPOSIT_OUTPUT;

# [Expected Similar Output]:
# 7:00AM INF Deposit Message CallData amount=0x773594000
# pubkey=0xYOUR_VALIDATOR_PUBKEY
# signature=0x...
#withdrawal credentials=0x010000000000000000000000YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS...

YOUR_VALIDATOR_PUBKEY=$(echo "$DEPOSIT_OUTPUT" | grep "pubkey=" | awk -F'pubkey=' '{print $2}' | awk -F' ' '{print $1}');
echo $YOUR_VALIDATOR_PUBKEY;

# [Expected Similar Output]:
# 0xYOUR_VALIDATOR_PUBKEY_92CHARS_INCLUDING_0X
```

### Step 2 - Check Your Current Operator Address

This will double check your current operator address.

```bash-vue
# RPC URL assumed to be local but can use {{config.mainnet.rpcUrl}}
cast call {{config.mainnet.contracts.beaconDeposit.address}} "getOperator(bytes)" <0xYOUR_VALIDATOR_PUBKEY> --rpc-url http://localhost:8545;

# [Expected Similar Output]:
# 0x000000000000000000000000YOUR_CURRENT_OPERATOR_ADDRESS
```

### Step 3 - Change Your Operator Address

This will change your operator address.

```bash-vue
# RPC URL assumed to be local but can use {{config.mainnet.rpcUrl}}
cast send {{config.mainnet.contracts.beaconDeposit.address}} "requestOperatorChange(bytes,address)" <0xYOUR_VALIDATOR_PUBKEY> <0xYOUR_NEW_OPERATOR_ADDRESS> --rpc-url [<rpc_url>](http://localhost:8545) --private-key <0xYOUR_CURRENT_OPERATOR_PRIVATE_KEY>;
```
