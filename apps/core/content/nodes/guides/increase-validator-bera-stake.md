---
head:
  - - meta
    - property: og:title
      content: Increase Validator $BERA Stake
  - - meta
    - name: description
      content: How to increase a Validator's $BERA stake in Berachain
  - - meta
    - property: og:description
      content: How to increase a Validator's $BERA stake in Berachain
---

<script setup>
    import config from '@berachain/config/constants.json';
</script>

# Increase A Validator's $BERA Stake

The following steps will guide you through the process of increasing a Validator's `$BERA` stake to increase their stake weight and increase the probability of proposing blocks.

This guide assumes that a Validator is already in the Active Set.

If you would like to test this out locally, consult our guide to a [local Kurtosis-based devnet](/nodes/guides/kurtosis), which includes instructions on testing deposits.

## Active Set & $BERA Stake

Currently, the Active Set consists of `{{config.mainnet.validatorActiveSetSize}}` Validators, which is the number of Validators that can propose blocks.

The Active Set is determined by the amount of `$BERA` staked, where the top stakers are included in the Active Set. To be included in the Active Set, a Validator must stake at least {{config.mainnet.stakeMinimumIncrease}} `$BERA` or 1 `$BERA` more than the lowest staker in the Active Set (whichever is greater).

If a Validator is removed from the Active Set, all `$BERA` staked to that Validator will be returned to the Validator's Withdrawal Credentials Address.

## Staking Considerations

There are a few points to consider with staking:

- **Stake Returned To Single Address** - All `$BERA` staked to a Validator is returned to the Validator's Withdrawal Credentials Address. If there are multiple stakers, an agreement must be put in place with the Validator to ensure that the `$BERA` is returned to the correct addresses.
- **Liquid Staking Protocols** - Managing multiple stakers with a single Validator can be difficult. As an alternative, Liquid Staking Protocols are an option.

## Requirements

Before you begin, ensure you have the following:

- A Validator that is already in the Active Set
- A Validator's `pubkey` - PubKeys can be found at <a :href="config.mainnet.dapps.url + '/validators'" target="_blank">{{config.mainnet.dapps.hub.name}} Validators</a>
- A minimum of {{config.mainnet.stakeMinimumIncrease}} `$BERA` or 1 `$BERA` more than the lowest staker in the Active Set (whichever is greater)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)

## Steps To Increase A Validator's $BERA Stake

:::info
**ERROR CODE DEFINITIONS:** See the following for more information about specific hex error codes: [https://docs.berachain.com/berachain-docs/error-codes](https://docs.berachain.com/berachain-docs/error-codes)
:::

```bash-vue
# FROM: /

VALIDATOR_PUB_KEY=<VALIDATOR_PUB_KEY_98CHARS_WITH_0x>;
YOUR_ETH_WALLET_PRIVATE_KEY=<YOUR_ETH_WALLET_PRIVATE_KEY>;
YOUR_ETH_RPC_URL=<YOUR_ETH_RPC_URL>;
YOUR_STAKED_AMOUNT=<NUMBER>ether;

# The 0x0.. are NOT typos
cast send "{{config.mainnet.contracts.beaconDeposit.address}}" \
'deposit(bytes,bytes,bytes,address)' \
"$VALIDATOR_PUB_KEY" \
"0x0000000000000000000000000000000000000000000000000000000000000000" \
"0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" \
"0x0000000000000000000000000000000000000000" \
--private-key "$YOUR_ETH_WALLET_PRIVATE_KEY" \
--value $YOUR_STAKED_AMOUNT \
-r $YOUR_ETH_RPC_URL;
```
