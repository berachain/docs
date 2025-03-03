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

<script setup>
    import config from '@berachain/config/constants.json';
</script>


# Become a Validator on Berachain

This guide walks you through the process of becoming a validator node on Berachain.

## Requirements

- A fully-synced full node - See [Quickstart](/nodes/quickstart)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- Berachain Wallet with a minimum of 250,000 $BERA (or the current minimum to meet the Active Set) + gas to process the transaction

If you haven't, please read through the [overview](/nodes/validator-lifecycle) that explains the lifecycle of a validator.

**Our goal** is to deposit your stake and establish a connection between your **validator identity** on the consensus layer, your **operator identity** on the execution layer, and the **withdrawal address** where your stake is returned when you stop being a validator.

## Step 1: Check beacond and Set Up Environment

A point of reassurance about `beacond`: it _cannot_ transact on your behalf on either the execution or consensus layers. By invoking `beacond` on the command line you are not playing with TNT strapped to your stake. 

You can ask `beacond help` for a list of commands, then `beacond help command` for help on a certain command. Have a look at `beacond help deposit create-validator`.

`beacond` wants a `--home` option specifying the data directory. This should be provided every time you use this command. In this guide, we will use an environment variable we set up and refer to with `--home $BEACOND_HOME`.

Below is an example of setting up and verifying the environment and establishing that you are operating with a properly-configured beacond installation. It's okay, even encouraged, that when depositing your stake you do so on your validator's full node, so that you have the CometBFT private keys available to you.

```bash
# !/bin/bash

export BEACOND_HOME=/full/path/to/beacond-data;
export RPC_URL="https://rpc.berachain.com"; # mainnet 
export DEPOSIT_ADDR="0x4242424242424242424242424242424242424242"; # mainnet 
export VAL_PUB_KEY="<YOUR_VAL_PUB_KEY>";
export VAL_OPERATOR_ADDRESS="<YOUR_VAL_OPERATOR_ADDRESS>";
export WITHDRAW_ADDRESS="<YOUR_WITHDRAW_ADDRESS>";

alias beacond="/path/to/beacond --home $BEACOND_HOME";
beacond genesis validator-root $BEACOND_HOME/config/genesis.json;

# [Expected Output - MUST BE THIS EXACTLY]
# DO NOT PROCEED UNLESS THIS OUTPUT MATCHES
# 0xdf609e3b062842c6425ff716aec2d2092c46455d9b2e1a2c9e32c6ba63ff0bda

export GENESIS_ROOT=0xdf609e3b062842c6425ff716aec2d2092c46455d9b2e1a2c9e32c6ba63ff0bda # mainnet
```

The `0xdf6..0bda` hash output confirms that you have the right mainnet genesis file. 

* **BEACOND_HOME**: The path to your beacond data directory.
* **RPC_URL**: The URL of the RPC endpoint you are using. You can use your own if you want.
* **DEPOSIT_ADDR**: The address of the deposit contract. 
* **VAL_PUB_KEY**: The public key of your validator from CometBFT (see below).
* **VAL_OPERATOR_ADDRESS**: The address of the ETH account (EOA) that will become your **operator address** on the execution layer. This is used to interact with contracts such as [BeraChef](https://docs.berachain.com/developers/contracts/berachef). 
* **WITHDRAW_ADDRESS**: The address where your deposit stake is returned when you stop being a validator (state 'Exited' on the [lifecycle](/nodes/validator-lifecycle)). This can be an address of your choice, or if you are staking money from investors, they will require a specific address.

Your **CometBFT identity** was created by beacond when you did `beacond init`, and is held in the `priv_validator_key.json` file. 
You can view the corresponding public key for this identity with `beacond deposit validator-keys`:

```bash
# !/bin/bash

beacond deposit validator-keys;

# [Example Output]:
# ...
# Eth/Beacon Pubkey (Compressed 48-byte Hex):
# 0x9308360bb1e8c237c2a4b6734782426e6e42bc7a43008ba5e3d9f3c70143227ea1fb2a08b21cbbedf87cebf27e81669d
```

This is your **beacon chain public key**, and in this tutorial is placed in the `VAL_PUB_KEY` environment variable.




## Step 2: Prepare registration transaction

:::warning
1. Ensure you calculate a signature for the parameters *and deposit amount* you are going to send to the deposit contract. If you change anything
after calculating the signature, **the deposit will fail and the funds will be burnt**.
:::

The first registration transaction is the most important. It establishes the association between your validator key and your presence in the consensus layer. **Mistakes in this step can result in a permanent loss of funds.**


1. **Set up and fund your funding account on Berachain.** You should be equipped so that you can use metamask or `cast` to send transactions from the funding account.

2. **Confirm your CometBFT identity has not been used before.**  If your validator has exited the active set or failed a deposit transaction, you will need to create a new identity.  Check for previous use of your identity with the following command. If this returns non-zero, start over with a new beacond identity (as described in the Quickstart).

   ```bash
   cast call $DEPOSIT_ADDR 'getOperator(bytes)' $VAL_PUB_KEY -r $RPC_URL;
   ```

3. **Have `beacond` calculate the parameters** for the transaction you will send with `./beacond deposit create-validator`.
   - **withdrawal-addr** is described in Step 1
   - **stake-amount** is the initial stake amount. We strongly recommend the minimum -- 10,000 BERA.
   - **genesis-root**: as confirmed in Step 1.

   ```bash
   STAKE_AMOUNT=10000000000000;

   beacond deposit create-validator \
     $WITHDRAW_ADDRESS              \
     $STAKE_AMOUNT                  \
     $GENESIS_ROOT;

   # [Expected Output]:
   #  "pubkey": "<VAL_PUB_KEY>",
   #  "credentials": "0x010000000000000000000000<WITHDRAW_ADDRESS>",
   #  "amount": "0x9184e72a000",
   #  "signature": "0x94349ab1...fb4b1d6",

   DEPOSIT_SIGNATURE="0x9434...";  # from the above output
   VAL_WITHDRAW_CREDENTIAL="0x01000..."; # from the above output
   ```

   The credentials should contain the withdrawal address verbatim, and the public key confirms the public key matching the private key used to generate the signature. In the above, we have placed the signature and withdraw credentials in variables for the next step.


4. Finally, **verify that beacond will accept this signature** with `beacond deposit validate <pubkey> <credentials> <amount> <signature> $BEACOND_HOME/config/genesis.json` which should produce no error message.

   ```bash
   beacond deposit validate   \
     $VAL_PUB_KEY             \
     $VAL_WITHDRAW_CREDENTIAL \
     $STAKE_AMOUNT            \
     $DEPOSIT_SIGNATURE       \
     $GENESIS_ROOT;
   echo $?;

   # [Expected Output]:
   # 0
   ```

You now have everything needed to deposit the initial {{ config.mainnet.registrationMinimum }} BERA.

## Step 3: Send registration transaction

You will now send the above transaction onto the chain. We are calling the `deposit` function on the [BeaconDeposit](https://docs.berachain.com/developers/contracts/beacondeposit) contract:

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

- **pubkey** is the CometBFT public key.
- **credentials** and **signature** are the values generated by `beacond` in the previous step.
- **operator** is the EOA address you created in the "Preliminaries" step.

```bash
# Non-Ledger Version
cast send $DEPOSIT_ADDR \
'deposit(bytes,bytes,bytes,address)' \
"$VAL_PUB_KEY" \
"$VAL_WITHDRAW_CREDENTIAL" \
"$DEPOSIT_SIGNATURE" \
"$VALIDATOR_OPERATOR_ADDRESS" \
--private-key  \
--value $STAKE_AMOUNT \
-r $RPC_URL;

# Ledger Version
cast send $DEPOSIT_ADDR \
'deposit(bytes,bytes,bytes,address)' \
"$VAL_PUB_KEY" \
"$VAL_WITHDRAW_CREDENTIAL" \
"$DEPOSIT_SIGNATURE" \
"$VALIDATOR_OPERATOR_ADDRESS" \
--ledger \
--value $STAKE_AMOUNT \
-r $RPC_URL;
```

## Step 4: Confirm successful registration

The following traits denote a successful registration:

1. The deposit contract tx was successful (check block explorer or observe the cast command’s output).
2. The balance in the funding account (wallet that sent the deposit contract tx) decreased by 10,000 BERA
3. **Most importantly,** the validator's public key is present in the beacon state.
The beacon state (available from your node’s beacon API at `curl http://localhost:3500/eth/v2/debug/beacon/states/head | jq .data.validators`) should show your validator’s public key, likely at the end of the list. This change will be reflected in the CL 2 slots after the deposit contract tx was finalized. NOTE: the beacon API must be enabled on your node (in `app.toml` : `[beacon-kit.node-api]`).

## Step 5: Activation or top-up

Having completed the registration, you can now deposit additional $BERA. The floor for becoming a validator is `{{ config.mainnet.minEffectiveBalance }} $BERA`, and you must be among the top `{{ config.mainnet.validatorActiveSetSize }}` validators, ordered by $BERA staked.

These subsequent deposits are done by calling the same `deposit` function, with only the **public key** required; the other elements may be zero, but must still be the right length.

When your validator passes the threshold necessary to become active, it passes into the **Activation** part of the lifecycle. At the conclusion of **second epoch** after you pass the threshold -- in other words, no sooner than 13 minutes -- you become eligible for minting blocks.

```bash
STAKE_AMOUNT=240000ether;

cast send "0x4242424242424242424242424242424242424242" \
'deposit(bytes,bytes,bytes,address)' \
"$VAL_PUB_KEY" \
"0x0000000000000000000000000000000000000000000000000000000000000000" \
"0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" \
"0x0000000000000000000000000000000000000000" \
--ledger \
--value $STAKE_AMOUNT \    
-r $RPC_URL;
```


## Post-activation checks

After 2+ epochs after your activation deposit, do the following checks:

1. `beacond status`. Verify that the voting power is equal to the effective balance. If voting power is 0, the node is NOT active.
1. your operator address received $BGT when it produces blocks (this will take a few hours).
1. The comet API on the node will confirm your validator's presence in the set. Look for your validator's public key in the list of validators:

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
