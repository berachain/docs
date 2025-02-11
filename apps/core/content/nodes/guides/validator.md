---
head:
  - - meta
    - property: og:title
      content: Become a Validator on Berachain
  - - meta
    - name: description
      content: How to become a validator node on Berachain
  - - meta
    - property: og:description
      content: How to run a validator node on Berachain
---

# Become a Validator on Berachain

This guide will walk you through the process of running a validator node on Berachain.

## Requirements

- Run Full Node & Fully Synced - See [Quickstart](/nodes/quickstart)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- Berachain Wallet Address with a minimum of 250,000 $BERA (or the current minimum to meet the Active Set) + gas to process the transaction

:::warning
You must have a node that is fully synced prior to running these steps.
:::

:::warning
Make absolutely sure you have safely backed up your validator key in `priv_validator_key.json`. If you proceed with staking and later lose this file, it's going to be a bad day.
:::

This document explains in detail how to deposit the stake for a validator, and **become** a validator on Berachain.

If you haven't, please read through the [overview](https://hackmd.io/@berachain/HJLXWhZwJe) that explains the lifecycle of a validator.

## Preliminaries

**Create a new ETH account** that will become your **operator address** on the execution layer. This is used to interact with contracts such as [BeraChef](https://docs.berachain.com/developers/contracts/berachef). Put that private key in the same safekeeping spot as your beacond private key.

## Step 1: Configure Beacond & Confirm Genesis Validator Root

A point of reassurance about `beacond`: it _cannot_ transact on your behalf on either the execution or consensus layers. By invoking `beacond` on the command line you are not playing with TNT strapped to your money.

You can ask `beacond help` for a list of commands, then `beacond help command` for help on a certain command. Have a look at `beacond help deposit create-validator`.

`beacond` wants a `--home` option specifying the data directory. This should be provided every time you use this command. In this guide, we will use an environment variable we set up and refer to with `--home $BEACOND_HOME`, which will hopefully be directly supported by beacond soon.

Below is an example of setting up and verifying the environment and establishing that you are operating with a properly-configured beacond installation. It's okay, even encouraged, that when comissioning your validator, you do so on your validator's full node.

```bash
# !/bin/bash

export BEACOND_HOME=/full/path/to/beacond-data;
alias beacond="/path/to/beacond --home $BEACOND_HOME";
beacond genesis validator-root $BEACOND_HOME/config/genesis.json;

# [Expected Output - MUST BE THIS EXACTLY]
# 0xdf609e3b062842c6425ff716aec2d2092c46455d9b2e1a2c9e32c6ba63ff0bda
```

The `0xdf6..0bda` address confirms that you have the right mainnet genesis file.

**Our goal here** is to deposit your stake, and establish a connection between your **validator identity** on the consensus layer and your **operator identity** on the execution layer.

Your identity on the consensus layer was created by beacond when you initialized your node, and is held in the `priv_validator_key.json` file. You can view the public key for this identity with

```bash
# !/bin/bash

beacond deposit validator-keys;

# [Example Output]:
# ...
# Eth/Beacon Pubkey (Compressed 48-byte Hex):
# 0x9308360bb1e8c237c2a4b6734782426e6e42bc7a43008ba5e3d9f3c70143227ea1fb2a08b21cbbedf87cebf27e81669d
```

This is your **beacon chain public key**.

## Step 2: Prepare registration transaction

The first registration transaction is the most important. It establishes the assocation between your validator key and your presence in the consensus layer. Mistakes in this step can result in a permanent loss of funds.

Set up and fund your funding account on Berachain. You should be equipped so that you can use metamask or `cast` to send transactions from the funding account.

Have `beacond` calculate the parameters for the transaction you will send: `./beacond deposit create-validator <widthdrawal-addr> 10000000000000 <genesis-root>`

Parameters:

- **withdrawal-addr** is where your stake is returned when you stop being a validator (state 'Exited' on the [lifecycle](https://hackmd.io/@berachain/HJLXWhZwJe)). This can be your funding account address.
- **10000000000000** this means 10,000 BERA. We recommend this as the initial amount to stake.
- **genesis-root**: for mainnet, this must be `0xdf609e3b062842c6425ff716aec2d2092c46455d9b2e1a2c9e32c6ba63ff0bda` - the value produced by `genesis validator-root` above; you can also provide `$BEACOND_HOME/config/genesis.json`.

Example:

```bash
WITHDRAW_ADDRESS="<YOUR_WITHDRAW_ADDRESS>";

beacond deposit create-validator \
"$WITHDRAW_ADDRESS" \
10000000000000 \
$BEACOND_HOME/config/genesis.json  | jq .;

# [Expected Output]:
#{
#  "pubkey": "0x9308360bb1e8c237c2a4b6734782426e6e42bc7a43008ba5e3d9f3c70143227ea1fb2a08b21cbbedf87cebf27e81669d",
#  "credentials": "0x010000000000000000000000<WITHDRAW_ADDRESS>",
#  "amount": "0x9184e72a000",
#  "signature": "0x94349ab199b87f464ae32641e6ae4315dbb21f2df510756809c9169ee93b9c1f6238511d90c88e38c1c49dfdfa916a880087e04d074f985571146445ed919f564cb1ce9c205dd1c31c3ff1d9ec1eb52d20524ae89c9d4977abd551cb9fb4b1d6",
#  "index": 0
#}
```

You can verify that beacond will accept this signature with `beacond deposit validate <pubkey> <credentials> <amount> <signature> $BEACOND_HOME/config/genesis.json` which should produce no error message.

```bash
VAL_PUB_KEY="<YOUR_VAL_PUB_KEY>";
DEPOSIT_SIGNATURE="<YOUR_DEPOSIT_SIGNATURE>";
VAL_WITHDRAW_CREDENTIAL="<YOUR_VAL_WITHDRAW_CREDENTIAL>";

beacond deposit validate \
$VAL_PUB_KEY \
$VAL_WITHDRAW_CREDENTIAL \
10000000000000 \
$DEPOSIT_SIGNATURE \
$BEACOND_HOME/config/genesis.json;

echo $?;

# [Expected Output]:
# 0
```

You now have eveything needed to deposit the initial 10,000 BERA.

## Step 3: Send registration transaction

> **NOTE:** Ensure you have the latest foundry installed with `foundryup`

You will now send the above transaction onto the chain. Use Metamask on the block explorer, or use cast to interact with [BeaconDeposit](https://docs.berachain.com/developers/contracts/beacondeposit).

```
function deposit(
    bytes calldata pubkey,
    bytes calldata credentials,
    bytes calldata signature,
    address operator
)
    external
    payable
```

- **pubkey**, **credentials**, **signature** are the values generated by `beacond` in the previous step.
- **operator** is the address you created in Step 1.

```bash
VAL_PUB_KEY="<YOUR_VAL_PUB_KEY>";
VAL_WITHDRAW_CREDENTIAL="<YOUR_VAL_WITHDRAW_CREDENTIAL>";
DEPOSIT_SIGNATURE="<YOUR_DEPOSIT_SIGNATURE>";
VALIDATOR_OPERATOR_ADDRESS="<YOUR_VALIDATOR_OPERATOR_ADDRESS>";
RPC_URL="http://localhost:8545";

# Non-Ledger Version
cast send 0x4242424242424242424242424242424242424242 \
'deposit(bytes,bytes,bytes,address)' \
"$VAL_PUB_KEY" \
"$VAL_WITHDRAW_CREDENTIAL" \
"$DEPOSIT_SIGNATURE" \
"$VALIDATOR_OPERATOR_ADDRESS" \
--private-key  \
--value 10000ether \
-r $RPC_URL;

# Ledger Version
cast send 0x4242424242424242424242424242424242424242 \
'deposit(bytes,bytes,bytes,address)' \
"$VAL_PUB_KEY" \
"$VAL_WITHDRAW_CREDENTIAL" \
"$DEPOSIT_SIGNATURE" \
"$VALIDATOR_OPERATOR_ADDRESS" \
--ledger \
--value 10000ether \
-r $RPC_URL;
```

## Step 4: Confirm successful registration

There are several checks that can be done to establish this was successful:

1. the cast to `deposit` was successful (check block explorer)
2. the funding account decreased by 10,000 BERA
3. the beacon state:
4. `curl http://localhost:3500/eth/v2/debug/beacon/states/head | jq .data.validators` will show your validator's public key, likely at the end of the list.
5. call the `getOperator` function of [BeaconDeposit](https://docs.berachain.com/developers/contracts/beacondeposit), providing your beacon identity public key. This should return your selected operator address.

## Step 5: Activation or top-up

Having completed the registration, you can now deposit additional $BERA. As of February 2025, the floor for becoming a validator is 250,000 BERA, and you must be among the top 69 validators, ordered by $BERA staked.

These subsequent deposits are done by calling the same `deposit` function, only the **pubkey, credential, and signature** are not required and should be 0.

When your validator passes the threshold necessary to become an activator, it passes into the **Activation** part of the lifecycle. At the conclusion of **second epoch** after you pass the threshold -- in other words, no sooner than 13 minutes -- you become eligible for minting blocks.

## Post-activation checks

After 2+ epochs after your activation deposit, do the following checks:

1. `beacond status`. Verify that the voting power is equal to the effective balance. If voting power is 0, the node is NOT active.
1. your operator address received $BGT when it produces blocks.
1. The comet API on the node will confirm your validator's presence in the set:

```bash
$ curl  http://localhost:26657/validators?page=1&per_page=100 | jq .

# [Example Output]:
# {
#   "jsonrpc": "2.0",
#   "id": -1,
#   "result": {
#     "block_height": "477021",
#     "validators": [
#       {
#         "address": "5951C4349AB792BFB3A63956512663CC3B733D6E",
#         "pub_key": {
#           "type": "cometbft/PubKeyBls12_381",
#           "value": "A/1TcQt1whFb0KrBKLc565+p4mJgPazfg0Awq7G/TIpsALtysxTBI9d/T/QM1NSaCgz/u+e0aLH/zEKYQWYVBMJAky+Kn4V3JX6562r5yJbCh0BqLLKStdeAXwGO0j+n"
#         },
#         "voting_power": "10000000000000000",
#         "proposer_priority": "12250000000000000"
#       },
#       {
#         "address": "9DB42D740B0D0C6A08543D679BF50CED94CA8E3C",
#         "pub_key": {
#           "type": "cometbft/PubKeyBls12_381",
#           "value": "A9D5DN7arBRQyNwIz6ZErgL1kYVyBBwvyn34tVM2aCy17bzK3W53Ep3kJYROFH0CBYU5e8fS/pywwNjC9RqT+Pz/2yGRQA1Dy5mGRXivGiRggXVWcFQzFpHk7upct4tt"
#         },
#         "voting_power": "10000000000000000",
#         "proposer_priority": "12250000000000000"
#       },
#       ...
#     ],
#     "count": "69",
#     "total": "69"
# }
```

## Steps After Becoming A Validator

Perform the following steps after becoming a validator.

### Step 1 - Add To Default Validator List

Make a PR to the following Github repository to add your validator to the default validator list.

[https://github.com/berachain/default-lists](https://github.com/berachain/default-lists)

```json
{
  "id": "<YOUR_VALIDATOR_PUBKEY>",
  "logoURI": "<PNG_OR_JPG_URL_OF_YOUR_VALIDATOR>",
  "name": "<VALIDATOR_NAME>",
  "description": "<VALIDATOR_DESCRIPTION>",
  "website": "<VALIDATOR_WEBSITE_URL>",
  "twitter": "<VALIDATOR_TWITTER_URL>"
}
```

### Step 2 - Send Berachain Team Wallet Addresses

Reach out to the Berachain team with your `YOUR_VALIDATOR_OPERATOR_ADDRESS` and `YOUR_VALIDATOR_WITHDRAW_CRED_ADDRESS` to aid with better metrics.

### Step 3 - Send Berachain Your CometBFT Address

Reach out to the Berachain team with your CometBFT address found in your `priv_validator_key.json` file.

This is the 40 character address found in your `priv_validator_key.json` file.

You can get this by looking at the file or running the following:

```bash
# FROM: /

# OR /path/to/$HOME/config/priv_validator_key.json
cat ./.beacond/config/priv_validator_key.json | jq -r ".address";

# [Expected Similat Address]
# A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0
```
