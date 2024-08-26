---
head:
  - - meta
    - property: og:title
      content: Proof of Liquidity and BEX
  - - meta
    - name: description
      content: How to use BEX liquidity in Proof of Liquidity
  - - meta
    - property: og:description
      content: How to use BEX liquidity in Proof of Liquidity
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Proof of Liquidity

Proof of liquidity (PoL) is a mechanism that rewards users for their liquidity contributions to the Berachain ecosystem through native chain rewards, `$BGT`. As the native dApp powering trading liquidity in the Berachain ecosystem, a number of BEX pools will be eligible for `$BGT` rewards.

## Earning $BGT

The process for earning `$BGT` through BEX is as follows:

1. Review the list of PoL-eligible BEX pools and select a desired pool
   ![Bex Reward Vault](/assets/bex-gauge.png)
2. [Deposit liquidity](/learn/guides/liquidity/intro) into the desired pool on Bex
3. Stake the LP token returned from step 2 in the appropriate PoL reward vault

The list of reward vaults for earning `$BGT` rewards can be seen here:

{{config.testnet.dapps.bgtStation.url}}gauge

## Whitelisting Pools for PoL Rewards

If you are a project that uses BEX for for your tokens' liquidity, you can apply to have your pool(s) whitelisted for `$BGT` rewards. This process is conducted through Berachain governance, requiring a proposal to be submitted and voted on by `$BGT` holders. More information will be provided on how to submit a proposal for whitelisting in the near future.
