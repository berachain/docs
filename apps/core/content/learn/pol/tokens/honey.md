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

Stability is a desirable property in a medium of exchange, in contrast to transacting with volatile crypto assets. `$HONEY` is Berachain's native stablecoin, designed to provide a stable and reliable means of exchange within the Berachain ecosystem and beyond. `$HONEY` aims to maintain a peg 1 USD.

## What is $HONEY?

`$HONEY` is a fully collateralized stablecoin which is soft-pegged to the US Dollar. `$HONEY` can be backed by (and minted from) a diverse range of crypto collateral. This multi-collateral approach to `$HONEY`'s backing enhances its stability and resilience.

## How to Get $HONEY?

`$HONEY` can minted by depositing whitelisted collateral into a vault, and minting `$HONEY` against that collateral. Different assets eligible as `$HONEY` collateral are stored in different vault contracts. The minting rates of `$HONEY` are configurable by `$BGT` governance for each different collateral.

Alternatively, `$HONEY` can be obtained by trading other assets on the [Berachain Bex](https://artio.bex.berachain.com).

## Who decides what assets can collateralize HONEY?

Governance decides what assets can be used to mint HONEY. 

## How is $HONEY Used?

$HONEY shares the same uses as other stablecoins, such as for payments/remittances, and as a hedge against market volatility. However, `$HONEY` also has a number of unique use cases within the Berachain ecosystem, including:

### Lending - Bend

Bend uses `$HONEY` by letting users add to the bend's `$HONEY` liquidity pool and it earns interest on it by supplying.

For users that supply their `$HONEY`, they receive an equivalent token as <a target="_blank" rel="no-referrer" :href="config.websites.docsBend.url + '/learn/lending-protocol/tokens#atokens'">`$aHONEY`</a>.

`$HONEY` is the only asset that Bend accepts to earn an interest on.

### Borrowing - Bend

Bend also uses `$HONEY` as the base token that users can borrow against assets they provide as collateral.

### Perpetual Futures - Berps

Berps uses `$HONEY` as the base token for all trading collateral, payouts, and deposits. For example, in order to enter a levered long position in ETH, they must first deposit an appropriate amount of `$HONEY`.

Alternatively, `$HONEY` holders can passively earn by providing trading liquidity in the `$bHONEY` vault. `$bHONEY` vault depositors earn trading fees generated from Berps and serve as the counterparty to traders' positions. For example, if a trader gets liquidated, the `$HONEY` collateral of that position is distributed to those staking in the `$bHONEY` vault.

## Minting $HONEY

A flow diagram of the `$HONEY` minting process is shown below:
![HONEY Minting](/assets/honey-minting.png)

### $HONEY Vaults

`$HONEY` is minted by depositing eligible collateral into specialized smart contracts called `$HONEY` vaults. Each vault is specific to a particular collateral type, with its own unique mint and redemption rate.

In the above example, the user deposits `$USDC` to mint `$HONEY`. Only the `$USDC` vault in interacted with, and not the `$USDT` vault.

### Vault Router

At the heart of the `$HONEY` minting process is the Vault Router contract. This contract acts as a central hub, connecting all the different `$HONEY` Vaults and is responsible for minting new `$HONEY` tokens.

As shown in the diagram, users' deposits are routed through the Vault Router contract to the appropriate vault. The Vault Router custodies the shares minted by the vault (corresponding to users' deposit) and mints `$HONEY` tokens to the user.

### Fees

Fees collected from minting and redeeming `$HONEY` are distributed to `$BGT` holders. Fees are determined based on the mint and redemption rates of each vault. For example, if the mint rate of the `$USDC` vault is 0.995 (1 `$USDC` for 0.995 `$HONEY`), then a fee of 0.005 or 0.5% is collected for every `$USDC` deposited.

#### Example

Let's consider an example with the following parameters:

- User wishes to deposit `1,000 $USDC`
- Mint rate for `$USDC` is set at `0.995` (`99.5%`)

Here's how the minting process would work:

1. The user deposits `1,000 $USDC` into the VaultRouter contract
2. The VaultRouter transfers `1,000 $USDC` to the $USDC Vault and receives `1,000` vault shares in return
3. The VaultRouter calculates the amount of $HONEY to mint:

- `$HONEY` to mint = Vault shares × Mint rate
- `$HONEY` to mint = `1,000` × `0.995` = `995 $HONEY`

4. The VaultRouter mints `995 $HONEY` to the user's address.
5. The VaultRouter calculates and distributes the fee:

- Fee shares = Vault shares - `$HONEY` to mint
- Fee shares = `1,000 - 995 = 5 shares`
- The VaultRouter transfers 5 vault shares to the fee receiver.
