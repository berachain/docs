---
head:
  - - meta
    - property: og:title
      content: Proof of Liquidity and BeraSwap
  - - meta
    - name: description
      content: How to use BeraSwap liquidity in Proof of Liquidity
  - - meta
    - property: og:description
      content: How to use BeraSwap liquidity in Proof of Liquidity
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Proof of Liquidity

Proof of liquidity (PoL) is a mechanism that rewards users for their liquidity contributions to the Berachain ecosystem through native chain rewards, `$BGT`. As the native dApp powering trading liquidity in the Berachain ecosystem, a number of BeraSwap pools will be eligible for `$BGT` rewards.

## Earning $BGT

<video src="../../../public/assets/videos/lpandstake.mp4" controls></video>

The process for earning `$BGT` through BeraSwap involves three simple steps:

1. **Provide Liquidity**: First, deposit liquidity into your chosen BeraSwap pool

2. **Stake LP Tokens in Reward Vault**: After providing liquidity, you'll receive LP tokens. Stake these tokens in the pool's staking contract


You can view and manage your staked positions in the reward vaults here:
{{config.mainnet.dapps.hub.url}}vault

## Whitelisting Pools for PoL Rewards

If you are a project that uses BeraSwap for your tokens' liquidity, you can apply to have your pool(s) whitelisted for `$BGT` rewards. This process is conducted through Berachain governance, requiring a proposal to be submitted and voted on by `$BGT` holders. More information will be provided on how to submit a proposal for whitelisting in the near future.
