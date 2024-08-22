<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Depositing & Withdrawing $HONEY

Users can contribute `$HONEY` to the Berps Vault by going to <a target="_blank" :href="config.testnet.dapps.berps.url + 'vault/'">Berachain bHoney Vault</a> and depositing any amount of `$HONEY`.

![Interacting With Berps Vault](/assets/berps-vault-instructions.png)

> <small><a target="_blank" :href="config.testnet.dapps.berps.url + 'vault/'">{{config.testnet.dapps.berps.url}}vault/</a></small>

## Depositing $HONEY

![Berps Vault Depositing $HONEY](/assets/berps-vault-deposit.png)

Any user can deposit any amount of `$HONEY` to the vault.

When `$HONEY` is depositted, `$bHONEY` is minted and given to the user in the place of the `$HONEY` depositted.

Learn more here about [`$bHONEY`](/learn/tokens/bhoney).

## Withdrawing $HONEY

![Berps Vault Withdrawing $HONEY](/assets/berps-vault-withdraw.png)

Once `$HONEY` is depositted, a user cannot withdraw their `$HONEY` until 1-3 epochs have past.

When the epoch threshold has been met, a user can request a withdrawal which will burn the equivalent in `$bHONEY` for the `$HONEY` deposited and any gains.

:::warning
`$HONEY` can only be withdrawn during the exact unlock epoch. If you are unable to withdraw during that unlock epoch, please make another request.
:::

## Staking $bHONEY

When a user has `$bHONEY`, they can stake their `$bHONEY` into a Rewards Vault to be elligible to earn `$BGT` from emissions directed to the Berps `$bHoney` Vault.
