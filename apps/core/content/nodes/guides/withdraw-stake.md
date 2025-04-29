---
head:
  - - meta
    - property: og:title
      content: Withdraw Validator Stake
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Withdraw a Validator $BERA Stake

New with the Bectra release, we have added support for withdrawing $BERA stake from a Validator. This process is demonstrated 
with the [Docker Devnet's final steps]()

:::warning
Withdrawing your $BERA stake will reduce the probability your validator
is selected to produce a block, and therefore reduce your $BGT emissions.
:::

## Withdrawal Rules & Process

Withdrawals occur at the end of the 256th epoch after the epoch in which you perform the withdrawal.
The block number can be calculated as follows:

$\text{withdrawal\_block} = \lceil\frac{\text{transaction\_block}}{192} + 256\rceil \times 192$

Where `transaction_block` is the block number where your withdrawal transaction was included, and `192` is the number of blocks in an epoch.

Every withdrawal requires a fee, which will go up if the withdrawal service experiences an unusual volume of requests.

The withdrawal transaction must originate from the Withdrawal Address for the Validator that wants to withdraw.

The withdrawal API will silently adjust the withdrawal amount so as to **maintain a minimum stake of {{ config.mainnet.minEffectiveBalance }} $BERA**. For instance, a validator with 350,000 $BERA staked that requests a withdrawal of 300,000 $BERA will only withdraw 50,000 $BERA.

To exit your Validator from the Active Set and return the entire stake, use the special withdrawal amount of `0`. Then, as described in [the lifecycle overview](/nodes/validator-lifecycle), your Validator will immediately be queued to exit the active set and no longer produce blocks. The stake will be returned by the consensus layer on the above schedule.

:::danger
If you are removed from the Active Set, **future deposits to your CometBFT public key will be burnt**. If you want to [activate as a validator](/nodes/guides/validator) again, you must do so with a new CometBFT identity.
:::

## How to withdraw $BERA stake

1. Set up environment. You are going to need the private key of your Withdrawal Address, or to have it on an attached ledger. To obtain your cometbft public key, you can invoke `beacond --home path/to/beacond/data deposit validator-keys`.

```bash
export RPC=https://bepolia.rpc.berachain.com/
export WITHDRAW_CONTRACT=0x00000961Ef480Eb55e80D19ad83579A64c007002
export WITHDRAW_AMOUNT_ETH=10000
export WITHDRAW_AMOUNT_GWEI=${WITHDRAW_AMOUNT_ETH}000000000

export COMETBFT_PUB_KEY=your-cometbft-public-key
export WITHDRAW_PRIVKEY=withdrawal-address-private-key
```

Use the special amount of `0` to withdraw the Validator's entire stake.

1. Determine withdrawal fee

```bash
WITHDRAW_FEE_HEX=$(cast call -r $RPC $WITHDRAW_CONTRACT)
WITHDRAW_FEE=$(cast to-dec $WITHDRAW_FEE_HEX)
echo $WITHDRAW_FEE

# [ TYPICAL OUTPUT, MAY VERY ]
# 1
```

2. Package the desired withdrawal amount with the Validator's identity

```bash
WITHDRAW_REQUEST=$(cast abi-encode --packed '(bytes,uint64)' $COMETBFT_PUB_KEY $WITHDRAW_AMOUNT_GWEI)
echo $WITHDRAW_REQUEST

# [ TYPICAL OUTPUT, WILL VARY ]
# 0xacaf2e8ec309513...0009184E72A000
```

3. Send the withdrawal request to the contract, from the Validator's withdraw address.

  ```bash
  cast send $WITHDRAW_CONTRACT $WITHDRAW_REQUEST --rpc-url $RPC --private-key $WITHDRAW_PRIVKEY --value ${WITHDRAW_FEE}wei
  ```

  Substitute `--ledger` for the `--private-key` if your key is kept on a hardware module.

4. Monitor the Beacon Kit Validator API to observe your stake's change.
   The beacon state (available from your node’s beacon API at `curl http://localhost:3500/eth/v1/beacon/states/head/validators | jq '.[] | select(type == "object" and .validator? and .validator.pubkey ==  "$COMETBFT_PUB_KEY")'`) should show your validator’s status. NOTE: the beacon API must be enabled on your node (in `app.toml` : `[beacon-kit.node-api]`).
