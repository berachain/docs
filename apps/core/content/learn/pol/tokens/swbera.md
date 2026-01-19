---
head:
  - - meta
    - property: og:title
      content: $sWBERA Token
  - - meta
    - name: description
      content: What Is the $sWBERA Token & How Does It Work
  - - meta
    - property: og:description
      content: What Is the $sWBERA Token & How Does It Work
---

<script setup>
  import Token from '@berachain/ui/Token';
  import config from '@berachain/config/constants.json';
</script>

# $sWBERA

> <small><a target="_blank" :href="config.websites.berascan.url + 'address/' + config.contracts.pol.wberaStakerVault['mainnet-address']">{{config.contracts.pol.wberaStakerVault['mainnet-address']}}</a></small>

<ClientOnly>
  <Token title="$sWBERA" image="https://res.cloudinary.com/duv0g402y/image/upload/v1752588172/brand/swbera.png" />
</ClientOnly>

`$swBERA` (Staked `$WBERA`) is a yield-bearing token that represents your staked `$BERA` position in the Staking Vault. It provides non-dilutive yield through Proof of Liquidity incentive redirection.

## How to Get $sWBERA

`$sWBERA` tokens are issued when you stake `$BERA` or `$WBERA` in the Staking Vault. For detailed instructions on how to stake BERA and receive `$sWBERA` tokens, see the [`$BERA` Staking Guide](/learn/guides/bera-staking).

You can stake either native `$BERA` (which the system automatically wraps to `$WBERA`) or `$WBERA` directly if you already have wrapped `$BERA` tokens. Both methods result in receiving `$sWBERA` tokens representing your staked position.

## How $sWBERA Works

### Non-Dilutive Yield Mechanism

`$sWBERA` earns yield through a **non-dilutive mechanism** that doesn't inflate the token supply. Instead, the underlying value of each `$sWBERA` token increases as the vault accumulates more WBERA from incentive redirection.

### Proof of Liquidity Incentive Redirection

The yield comes from the **33% incentive redirection** from PoL protocols. When protocols pay incentives to validators for directing `$BGT` emissions, 33% is redirected during incentive distribution and sent to the Incentive Collector. These redirected incentives are then auctioned for `$WBERA` through automated market mechanisms, and the `$WBERA` is distributed to Staking Vault stakers, increasing the value of `$sWBERA` tokens.

### Auto-Compounding

Your rewards automatically compound without any manual intervention. No claiming is required as rewards are automatically reinvested, causing your `$sWBERA` tokens to increase in value over time.

## Unstaking sWBERA

### 7-Day Unbonding Period

To convert your `$sWBERA` tokens back to `$BERA` or `$WBERA`, you'll need to unstake through the Staking Vault. The unstaking process has a **7-day unbonding period**:

1. **Initiate withdrawal**: Queue a withdrawal request through the [Staking Vault interface](https://hub.berachain.com/stake/)
2. **Wait 7 days**: Your withdrawal request enters a 7-day cooldown period
3. **Complete withdrawal**: After the unbonding period ends, return to the interface to complete the withdrawal and receive your `$WBERA` tokens

### Important Considerations

- **No rewards earned** during the unbonding period
- **Withdrawal requests expire** after 7 days if not completed
- **Multiple requests**: You can have multiple withdrawal requests active simultaneously
- **Cancellation**: Withdrawal requests can be cancelled before completion

For detailed instructions on the unstaking process, see the [$BERA Staking Guide](/learn/guides/bera-staking#withdrawal-process).
