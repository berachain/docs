---
head:
  - - meta
    - property: og:title
      content: Withdraw Validator Stake
---

# Withdraw a Validator $BERA Stake

New with the Bectra release, we have added support for withdrawing $BERA stake from a Validator.

:::warning
Withdrawing your $BERA stake will reduce the probability your validator
is selected to produce a block, and therefore reduce your $BGT emissions.
:::

## Withdrawal Rules & Process

Withdrawals occur at the end of the 42nd epoch after the epoch in which you perform the withdrawal.
  The block number can be calculated as follows:
  
$\text{withdrawal\_block} = \lceil\frac{\text{transaction\_block}}{192} + 42\rceil \times 192$

Where `transaction_block` is the block number where your withdrawal transaction was included, and `192` is the number of blocks in an epoch.

Every withdrawal requires a fee, which will go up if the withdrawal service experiences an unusual volume of requests. 

The withdrawal transaction must originate from the Withdrawal Address for the Validator that wants to withdraw.

If you withdraw enough of your Validator's stake, then as described by and subject to
the rules in [the lifecycle overview](/nodes/validator-lifecycle), your Validator will exit the active set and no longer produce blocks. Once a Validator is removed from the active set, the complete stake is returned to the Withdrawal Address.

:::danger
If you are removed from the Active Set, **future deposits to your CometBFT public key will be burnt**. If you want to [activate as a validator](/nodes/guides/validator) again, you must do so with a new CometBFT identity.
:::

## How to withdraw $BERA stake

1. Set up environment. You are going to need the private key of your Withdrawal Address, or to have it on an attached ledger.  To obtain your cometbft public key, you can invoke `beacond --home path/to/beacond/data deposit validator-keys`.

```bash
export RPC=https://bepolia.rpc.berachain.com/
export WITHDRAW_CONTRACT=0x00000961Ef480Eb55e80D19ad83579A64c007002
export WITHDRAW_AMOUNT_ETH=10000
export WITHDRAW_AMOUNT_GWEI=${WITHDRAW_AMOUNT_ETH}000000000

export COMETBFT_PUB_KEY=your-cometbft-public-key
export WITHDRAW_PRIVKEY=withdrawal-address-private-key
```

1. Determine withdrawal fee
```bash
WITHDRAW_FEE=$(cast call -r $RPC $WITHDRAW_CONTRACT)
echo $WITHDRAW_FEE

# [ TYPICAL OUTPUT, MAY VERY ]
# 0x0000000000000000000000000000000000000000000000000000000000000001
```

2. Package the desired withdrawal amount with the Validator's identity

```bash
WITHDRAW_REQUEST=$(cast abi-encode --packed '(bytes,uint64)' $COMETBFT_PUB_KEY $WITHDRAW_AMOUNT_GWEI)
echo $WITHDRAW_REQUEST

# [ TYPICAL OUTPUT, WILL VARY ]
# 0xacaf2e8ec309513...0009184E72A000
```

3. Send the withdraw request to the contract, from the Validator's withdraw address.
```bash
cast send $WITHDRAW_CONTRACT $WITHDRAW_REQUEST --rpc-url $RPC --private-key $WITHDRAW_PRIVKEY --value $WITHDRAW_FEE 
```

Substitute `--ledger` for the `--private-key` if your key is kept on a hardware module.

