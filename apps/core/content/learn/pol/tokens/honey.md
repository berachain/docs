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
<!-- <a target="_blank" :href="config.mainnet.dapps.berascan.url + '/address/' + config.contracts.honey.address">{{config.contracts.honey.address}}</a>-->

<ClientOnly>
  <Token title="$HONEY" image="/assets/HONEY.png" />
</ClientOnly>

Stability is a desirable property in a medium of exchange, in contrast to transacting with volatile crypto assets. `$HONEY` is Berachain's native stablecoin, designed to provide a stable and reliable means of exchange within the Berachain ecosystem and beyond. `$HONEY` aims to maintain a soft peg 1 USD.

## What is $HONEY?

`$HONEY` is a fully collateralized stablecoin which is soft-pegged to the US Dollar. `$HONEY` can be backed by (and minted from) stgUSDC and Bee (PYUSD), and in the future governance could approve other assets.

## How to Get $HONEY?

`$HONEY` can be minted by depositing whitelisted collateral into a vault, and minting `$HONEY` against that collateral. The minting rates of `$HONEY` are configurable by `$BGT` governance for each different collateral.

Alternatively, `$HONEY` can be obtained by trading other assets on the Berachain BeraSwap, or borrowed on Bend.

## What determines which assets collateralize $HONEY?

The initial collateral options will be `stgUSDC` and `BEE` (`$pyUSD`). New assets used to mint `$HONEY` can be added via governance.

## How is $HONEY Used?

`$HONEY` shares the same uses as other stablecoins, such as for payments/remittances, and as a hedge against market volatility. `$HONEY` could be used within the Berachain ecosystem via native and ecosystem apps.

## Minting $HONEY

A flow diagram of the `$HONEY` minting process is shown below:
![HONEY Minting](/assets/honey-minting.png)

### $HONEY Vaults

`$HONEY` is minted by depositing eligible collateral into specialized smart contracts called `$HONEY` vaults. Each vault is specific to a particular collateral type, with its own unique mint and redemption rate.

In the above example, the user deposits `$USDC` to mint `$HONEY`. Only the `$USDC` vault in interacted with, and not the `$pyUSD` vault.

### HoneyFactory

At the heart of the `$HONEY` minting process is the HoneyFactory contract. This contract acts as a central hub, connecting all the different `$HONEY` Vaults and is responsible for minting new `$HONEY` tokens.

As shown in the diagram, users' deposits are routed through the HoneyFactory contract to the appropriate vault. The HoneyFactory custodies the shares minted by the vault (corresponding to users' deposit) and mints `$HONEY` tokens to the user.

## Depegging and Basket Mode

Basket Mode is a safety mechanism that activates when when collateral assets become unstable. It affects both minting and redemption of Honey tokens in specific ways:

**For Redemption:**

- When any collateral asset depegs, Basket Mode automatically activates.
- In this mode, users can't choose which asset they want to redeem their `$HONEY` for.
- Instead, they must redeem for a proportional share of ALL collateral assets in the basket
- For example, if you redeem 1 Honey token, you'll get:
  - Some USDC based on its proportion in the vault
  - Some pyUSD based on its proportion in the vault
  - The proportions are calculated based on the current balance of each asset in the vault

**For Minting:**

- Basket Mode for minting is considered an edge case which only occurs if ALL collateral assets are either depegged or blacklisted
- In this situation, to mint `$HONEY`, users must provide proportional amounts of all collateral assets in the basket, rather than choosing a single asset
- If one asset is depegged you can mint only with the other asset 

### Fees

Fees collected from minting and redeeming `$HONEY` are distributed to `$BGT` holders. Fees are determined based on the mint and redemption rates of each vault. For example, if the mint rate of the `$USDC` vault is 0.995 (1 `$USDC` for 0.995 `$HONEY`), then a fee of 0.005 or 0.1% is collected for every `$USDC` deposited.

#### Example

Let's consider an example with the following parameters:

- User wishes to deposit `1,000 $stgUSD`
- Mint rate for `$stgUSD` is set at `0.995` (`99.5%`)

Here's how the minting process would work:

1. The user deposits `1,000 $stgUSD` into the VaultRouter contract
2. The VaultRouter transfers `1,000 $stgUSD` to the $stgUSD Vault and receives `1,000` vault shares in return
3. The VaultRouter calculates the amount of $HONEY to mint:

- `$HONEY` to mint = Vault shares × Mint rate
- `$HONEY` to mint = `1,000` × `0.995` = `995 $HONEY`

4. The VaultRouter mints `995 $HONEY` to the user's address.
5. The VaultRouter calculates and distributes the fee:

- Fee shares = Vault shares - `$HONEY` to mint
- Fee shares = `1,000 - 995 = 5 shares`
- The VaultRouter transfers 5 vault shares to the fee receiver.
