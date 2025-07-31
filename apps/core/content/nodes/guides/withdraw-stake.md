---
head:
  - - meta
    - property: og:title
      content: Withdraw Validator BERA Stake
  - - meta
    - name: description
      content: How to withdraw a validator's BERA stake
  - - meta
    - property: og:description
      content: How to withdraw a validator's BERA stake
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Withdraw Validator $BERA Stake

The holder of the withdrawal credential, set during the initial deposit, can trigger partial or complete withdrawal of `$BERA` stake from a Validator. This process is demonstrated in the [Docker Devnet's final steps](/nodes/guides/docker-devnet#launch-local-devnet).

:::warning
Withdrawing your $BERA stake will reduce the probability that your validator
is selected to produce a block and therefore reduce your $BGT emissions. Withdrawing all stake will exit your validator from the Active Set.
:::

## Requirements

- A fully-synced full node
- [Foundry](https://book.getfoundry.sh/getting-started/installation) v1.0.0 or greater
- Validator Withdrawal Credential Address Private Key or Ledger

## Withdrawal Rules & Process

Withdrawals occur at the end of the 256th epoch (~27 hours) after the epoch in which you perform the withdrawal.

The block number can be calculated as follows:

$$ withdrawalBlock = \lceil\frac{\text{transactionBlock}}{192} + 256\rceil \times 192 $$

Where `transactionBlock` is the block number where your withdrawal transaction was included, and `192` is the number of blocks in an epoch.

Every withdrawal requires a fee, which will increase if the withdrawal service experiences an unusual volume of requests.

The withdrawal transaction must originate from the Withdrawal Credential Address for the validator to perform a withdrawal.

The withdrawal API will silently adjust the withdrawal amount to **maintain a minimum stake of {{ config.mainnet.minEffectiveBalance }} $BERA**. For instance, a validator with 350,000 $BERA staked that requests a withdrawal of 300,000 $BERA will only withdraw 100,000 $BERA.

To exit your validator from the Active Set and return the entire stake, use the special withdrawal amount of `0`. Then, as described in [the lifecycle overview](/nodes/validator-lifecycle), your validator will immediately be queued to exit the active set and no longer produce blocks. The stake will be returned by the consensus layer on the above schedule.

:::danger
If you are removed from the Active Set, **future deposits to your CometBFT public key will be burnt**. If you want to [activate as a validator](/nodes/guides/validator) again, you must do so with a new CometBFT identity.
:::

## How To Withdraw $BERA Stake

The following will walk you through how to withdraw a portion of a validator's $BERA stake with the validator withdrawal credentials on Berachain Bepolia.

### Step 1 - Configurations

Set up your environment. You will need the private key of your Withdrawal Credential Address, or to have it on an attached ledger. To obtain your CometBFT public key, you can invoke `beacond --home path/to/beacond/data deposit validator-keys`.

```bash-vue
export RPC_URL=https://bepolia.rpc.berachain.com/
export WITHDRAW_CONTRACT=0x00000961Ef480Eb55e80D19ad83579A64c007002
export WITHDRAW_AMOUNT_ETH=10000
# Alternatively
export WITHDRAW_AMOUNT_GWEI=${WITHDRAW_AMOUNT_ETH}000000000

export COMETBFT_PUB_KEY=<0xYOUR_COMETBFT_PUBLIC_KEY>
export WITHDRAW_CREDENTIAL_PRIVATE_KEY=<YOUR_WITHDRAW_CREDENTIAL_PRIVATE_KEY>
```

Use the special amount of `0` to withdraw the Validator's entire stake.

### Step 2 - Determine Withdrawal Fee

In addition to the desired amount to withdrawal, a withdrawal fee must be sent with the transation.

```bash
WITHDRAW_FEE_HEX=$(cast call -r $RPC_URL $WITHDRAW_CONTRACT);
WITHDRAW_FEE=$(cast to-dec $WITHDRAW_FEE_HEX);
echo $WITHDRAW_FEE;

# [ TYPICAL OUTPUT, MAY VERY ]
# 1
```

### Step 3 - Create Withdrawal Request

Package the desired withdrawal amount with the Validator's identity as an encoded request.

```bash
WITHDRAW_REQUEST=$(cast abi-encode --packed '(bytes,uint64)' $COMETBFT_PUB_KEY $WITHDRAW_AMOUNT_GWEI);
echo $WITHDRAW_REQUEST;

# [ TYPICAL OUTPUT, WILL VARY ]
# 0xacaf2e8ec309513...0009184E72A000
```

### Step 4 - Send Withdrawal Request

Send the withdrawal request to the contract, from the Validator's Withdraw Credential Address.

:::tip
Remember to send it from the Withdrawal Credential Address, otherwise the transaction will fail.
:::

```bash
cast send $WITHDRAW_CONTRACT $WITHDRAW_REQUEST --rpc-url $RPC_URL --private-key $WITHDRAW_CREDENTIAL_PRIVATE_KEY --value ${WITHDRAW_FEE}wei;
```

Substitute `--ledger` for the `--private-key` if your key is kept on a hardware module.

### Step 5 - Monitor Beacon Kit API

To ensure the withdrawal request succeeded, monitor the Beacon Kit Validator API to observe your stake's change.

:::tip
The beacon API must be enabled on your node (in `app.toml` : `[beacon-kit.node-api]`).
:::

The beacon state is available from your node’s beacon API via:

```bash
curl http://localhost:3500/eth/v1/beacon/states/head/validators | jq '.[] | select(type == "object" and .validator? and .validator.pubkey ==  "$COMETBFT_PUB_KEY")'`);
```

This request should show your validator's status.
