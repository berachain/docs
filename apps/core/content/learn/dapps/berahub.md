---
head:
  - - meta
    - property: og:title
      content: Berachain's BeraHub
  - - meta
    - name: description
      content: Berachain's BeraHub is the place to manage all things $BGT
  - - meta
    - property: og:description
      content: Berachain's BeraHub is the place to manage all things $BGT
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berachain's BeraHub 🐻⛓️

BeraHub is the place to manage all things `$BGT` and access Berachain liquidity through BEX.

<a target="_blank" :href="config.mainnet.dapps.hub.url">

![Berachain BeraHub dApp](/assets/berahub.png)

</a>

> <a target="_blank" :href="config.mainnet.dapps.hub.url">{{config.mainnet.dapps.hub.url}}</a>

On BeraHub, users can:

1. Review active <a target="_blank" :href="config.mainnet.dapps.hub.url + 'vaults'">Reward Vaults</a>
2. Review active <a target="_blank" :href="config.mainnet.dapps.hub.url + 'validators'">Validators</a>
3. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'validators'">Boost</a> validators with `$BGT`
4. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'redeem'">Redeem</a> `$BGT` for `$BERA`
5. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'rewards'">Claim</a> earned `$BGT` rewards
6. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'swap'">Swap</a> assets
7. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'pools'">Provide</a> BEX liquidity
8. <a target="_blank" :href="config.mainnet.dapps.hub.url + 'governance'">Participate</a> in Governance

## Account Overriding

BeraHub includes an account overriding feature that allows users to send transactions on behalf of other accounts for specific permissionless operations. This feature is accessible through the settings toggle on BeraHub.

![Account Override Settings](/assets/account-override.png)

### Purpose

The account overriding feature is designed to facilitate permissionless transactions such as incentive claims, enabling users to manage transactions for accounts that may not have direct access to the interface.

### How to Use Account Override

To use the account override feature:

1. Navigate to <a target="_blank" :href="config.mainnet.dapps.hub.url">BeraHub</a>
2. Access the settings toggle to enable account override
3. Enter the target address you want to perform transactions for
4. Follow the same process as you would for your own account

### Limitations

**Important:** This feature is restricted to permissionless transactions only. The following operations are **not** supported through account overriding:

- Swapping assets
- Staking operations
- Boosting validators

The account overriding feature maintains security by limiting its scope to operations that do not require special permissions or pose significant risk to user funds.
