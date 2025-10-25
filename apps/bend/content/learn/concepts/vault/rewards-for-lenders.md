---
head:
  - - meta
    - property: og:title
      content: Berachain Bend - Rewards For Lenders
  - - meta
    - name: description
      content: Berachain Bend - Rewards For Lenders
  - - meta
    - property: og:description
      content: Berachain Bend - Rewards For Lenders
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Rewards For Lenders

Bend offers a great place for additional yields on Berachain's native stablecoin <a target="_blank" :href="config.websites.docsCore.url + 'learn/pol/tokens/honey?utm_source=' + config.websites.docsBend.utmSource">$HONEY</a>. Each [Vautl](/learn/concepts/vault) is managed by [Curators](/learn/concepts/curator), who decide which [Markets](/learn/concepts/market) they want to offer \$HONEY as a loan for specific collateral (\$WETH, \$WBERA, \$WBTC, etc).

![Berachain Bend - Vaults](/assets/learn-concepts-rewardslenders-vaults.png)

## Vault APY Yields

Depending on the Vault, it may offer an APY of one or both of the following:

1. [Native APY](#native-apy) - Yield that is captured from lending out $HONEY to different markets.
2. [$BGT Yield](#bgt-yield) - Yield that is captured for staking Vault shares into an eligible <a target="_blank" :href="config.websites.docsCore.url + 'learn/pol/rewardvaults?utm_source=' + config.websites.docsBend.utmSource">Proof-of-Liquidity Reward Vault</a> in the form of $BGT.

Check out the [Deposit & Withdraw Guide](/guides/deposit-withdraw) to see how to make a deposit.

![Berachain Bend - Vault Yield Types](/assets/learn-concepts-rewardslenders-yieldtypes.png)

### Native APY

The native Annual Percentage Yield (APY) from Vaults comes from offering $HONEY as a loan to various eligible collateral assets chosen by the Curator of the Vault. The APY depends on both the borrow rates set by the Curator and the utilization of the supplied $HONEY—that is, how much has been borrowed relative to how much is available.

![Berachain Bend - Vault Native Yield](/assets/learn-concepts-rewardslenders-nativeyield.png)

Each Vault has a breakdown of its allocation and its Supply Yield.

![Berachain Bend - Vault Rates](/assets/learn-concepts-rewardslenders-vaultrates.png)

### \$BGT Yield

$BGT yield comes from <a target="_blank" :href="config.websites.docsCore.url + 'learn/pol?utm_souce=' + config.websites.docsBend.utmSource">Validators directing \$BGT emission / block rewards</a> to a Bend Vaults' whitelisted Reward Vault (eligible PoL Reward Vault that can receive $BGT emission). When a lender contributes \$HONEY into a Vault, they receive shares for their contribution (Receipt Tokens). These Receipt Tokens can be staked into an whitelisted Reward Vault, which now makes their stake eligible to receive additional yields in the form of \$BGT.

![Berachain Bend - $BGT Yield](/assets/learn-concepts-rewardslenders-bgtyield.png)

It should be noted that to be eligible for $BGT yields, the lender must stake the Receipt Token and claim the $BGT.

![Berachain Bend - Stake & Claim Required](/assets/learn-concepts-rewardslenders-stakeclaim.png)
