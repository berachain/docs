---
head:
  - - meta
    - property: og:title
      content: $Honey Stablecoin
  - - meta
    - name: description
      content: What Is $Honey Stablecoin
  - - meta
    - property: og:description
      content: What Is $Honey Stablecoin
---

<script setup>
  import Token from '@berachain/ui/Token';
  import config from '@berachain/config/constants.json';
</script>

# $HONEY

> <a target="_blank" :href="config.testnet.dapps.beratrail.url + '/address/' + config.contracts.honey.address">{{config.contracts.honey.address}}</a>

<ClientOnly>
  <Token title="$HONEY" image="/assets/HONEY.png" />
</ClientOnly>

Stability is a desirable property in a medium of exchange, in contrast to transacting with volatile crypto assets. `$HONEY` is Berachain's native stablecoin, designed to provide a stable and reliable means of exchange within the Berachain ecosystem and beyond. `$HONEY` aims to maintain a peg to 1 USD through a robust multi-collateral system.

## What is $HONEY?

`$HONEY` is a fully collateralized stablecoin which is soft-pegged to the US Dollar. `$HONEY` can be backed by (and minted from) a diverse range of whitelisted stablecoin collateral. This multi-collateral approach enhances `$HONEY`'s stability and resilience while incorporating sophisticated risk management mechanisms.

## How to Get $HONEY?

There are two primary ways to obtain `$HONEY`:

1. **Minting**: Users can mint `$HONEY` by depositing whitelisted collateral into specialized vaults. The minting process maintains price stability through dynamic rates and collateral management.

2. **Trading**: `$HONEY` can be obtained by trading other assets on BeraSwap

## Collateral Management

### Collateral Selection
Governance determines which assets can be used to mint `$HONEY`. Each collateral type must maintain its peg within a specified range (approximately ±0.21%) to be eligible for minting. This ensures the stability of the system.

### Risk Management
`$HONEY` implements several risk management features:

1. **Collateral Caps**: Each collateral type has both:
   - A global cap limiting its percentage of total collateral
   - A relative cap against a reference collateral

2. **Basket Mode**: In cases where one or more collaterals deviate from their peg, `$HONEY` enters "Basket Mode":
   - Minting: Users must provide a proportional basket of all collaterals
   - Redemption: Users receive a proportional share of all collateral assets

3. **Blacklist Protection**: If a collateral asset is blacklisted:
   - The asset can be liquidated through a specialized procedure
   - Users can redeem the blacklisted collateral by providing good collateral
   - A spread incentivizes the disposal of blacklisted assets

## How is $HONEY Used?

`$HONEY` serves multiple purposes within the Berachain ecosystem:

### Lending - Bend

Bend uses `$HONEY` as its primary lending asset:

- Users can supply `$HONEY` to earn interest
- Suppliers receive `$aHONEY` tokens representing their deposit
- `$HONEY` is the only asset that Bend accepts for interest earning

### Borrowing - Bend

`$HONEY` serves as the base borrowing token in Bend:
- Users can borrow `$HONEY` against their provided collateral
- Interest rates are dynamically adjusted based on market conditions

### Perpetual Futures - Berps

Berps integrates `$HONEY` as its core settlement token:

- All trading collateral and payouts use `$HONEY`
- Users can provide liquidity to the `$bHONEY` vault to earn trading fees
- Liquidated positions distribute `$HONEY` to `$bHONEY` vault stakers

## Minting $HONEY

A flow diagram of the `$HONEY` minting process is shown below:
![HONEY Minting](/assets/honey-minting.png)

### $HONEY Vaults

Each collateral type has its own specialized vault with unique parameters:
- Mint and redemption rates
- Collateral caps and limits
- Price stability thresholds

### Vault Router

The Vault Router contract serves as the central hub for all `$HONEY` operations:
- Routes deposits to appropriate vaults
- Manages minting and redemption processes
- Handles collateral share distribution

### Fees

Fees from minting and redeeming `$HONEY` are distributed to `$BGT` holders:
- Mint fees: Approximately 0.2% (configurable per vault)
- Redemption fees: Approximately 0.2% (configurable per vault)
- Fees are calculated based on the mint and redemption rates of each vault

#### Example

Let's consider an example with the following parameters:

- User deposits `1,000 $USDC`
- Mint rate is `0.998` (`99.8%`)

The minting process works as follows:

1. User deposits `1,000 $USDC` into the VaultRouter
2. VaultRouter transfers `1,000 $USDC` to the USDC Vault and receives `1,000` vault shares
3. VaultRouter calculates `$HONEY` to mint:
   - Amount = Vault shares × Mint rate
   - Amount = `1,000` × `0.998` = `998 $HONEY`
4. VaultRouter mints `998 $HONEY` to the user's address
5. Fee calculation and distribution:
   - Fee shares = `1,000 - 998 = 2 shares`
   - VaultRouter transfers 2 vault shares to the fee receiver
