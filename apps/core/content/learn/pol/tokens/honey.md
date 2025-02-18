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

<a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.honey.address">{{config.mainnet.contracts.honey.address}}</a>

<ClientOnly>
  <Token title="$HONEY" image="/assets/HONEY.png" />
</ClientOnly>

`$HONEY` is Berachain's native stablecoin, designed to provide a stable and reliable means of exchange within the Berachain ecosystem and beyond. `$HONEY` is fully collateralized and soft-pegged to the US Dollar.

## How to Get $HONEY

`$HONEY` can be minted by depositing whitelisted collateral into a vault and minting `$HONEY` against that collateral through the <a :href="config.mainnet.dapps.honeySwap.url">HoneySwap dApp</a>. The minting rates of `$HONEY` are configurable by `$BGT` governance for each different collateral asset.

Alternatively, `$HONEY` can be obtained by swapping from other assets on [BEX](/learn/dapps/bex) or another decentralized exchange.

### Collateral Assets

The initial collateral options will be `$USDC` and `$BYUSD` (`$pyUSD`). New assets used to mint `$HONEY` can be added through governance.

## How is $HONEY Used?

`$HONEY` shares the same uses as other stablecoins, such as for payments/remittances and as a hedge against market volatility. `$HONEY` can also be used within the Berachain DeFi ecosystem.

## $HONEY Architecture

A flow diagram of the `$HONEY` minting process and associated contracts is shown below:
![HONEY Minting](/assets/honey-minting.png)

### $HONEY Vaults

`$HONEY` is minted by depositing eligible collateral into specialized vault contracts. Each vault is specific to a particular collateral type, with its own unique mint and redemption rate.

In the top flow of the above example, the user deposits `$USDC` to mint `$HONEY`. Only the `$USDC` vault is interacted with, not the `$pyUSD` vault.

### HoneyFactory

At the heart of the `$HONEY` minting process is the HoneyFactory contract. This contract acts as a central hub, connecting all the different `$HONEY` Vaults and is responsible for minting new `$HONEY` tokens.

As shown in the diagram, users' deposits are routed through the `HoneyFactory` contract to the appropriate vault. The `HoneyFactory` custodies the shares minted by the vault (corresponding to users' deposits) and mints `$HONEY` tokens to the user.

## Depegging and Basket Mode

Basket Mode is a safety mechanism that activates when collateral assets become unstable. It affects both minting and redemption of `$HONEY` in specific ways:

**Redemption:**

- When ANY collateral asset depegs, Basket Mode automatically activates
- In this mode, users can't choose which asset they redeem their `$HONEY` for
- Instead, users redeem for a proportional share of ALL collateral assets in the basket
- For example, if you redeem 1 `$HONEY` token with Basket Mode active, you'll get:
  - Some `$USDC` based on its relative proportion as collateral
  - Some `$pyUSD` based on its relative proportion as collateral

**Minting:**

- Basket Mode for minting is considered an edge case that only occurs if ALL collateral assets are either depegged or blacklisted. Depegged assets cannot be used to mint `$HONEY`
- In this situation, to mint `$HONEY`, users must provide proportional amounts of all collateral assets in the basket, rather than choosing a single asset
- If one asset is depegged, you can mint only with the other asset

## Fees

Fees collected from minting and redeeming `$HONEY` are distributed to `$BGT` holders. Fees are determined based on the mint and redemption rates of each vault. For example, if the mint rate of the USDC vault is 0.999 (1 `$USDC` for 0.999 $HONEY), then a fee of 0.001 or 0.1% is collected for every `$USDC` deposited.

### Example

Let's consider an example with the following parameters:

- User wishes to deposit `1,000 $USDC`
- Mint rate for `$USDC` is set at `0.999` (`99.9%`)

Here's how the minting process would work:

1. The user deposits `1,000 $USDC` into the HoneyFactory contract
2. The HoneyFactory calculates the amount of `$HONEY` to mint:

- `$HONEY` to mint = Vault shares × Mint rate
- `$HONEY` to mint = `1,000` × `0.999` = `999 $HONEY`

3. The HoneyFactory transfers 999 `$USDC` to the USDC vault and receives 999 vault shares in return

- Fee shares = Vault shares - `$HONEY` to mint
- Fee shares = `1,000 - 999 = 1 share`
- The HoneyFactory transfers 1 vault share to the fee receiver
