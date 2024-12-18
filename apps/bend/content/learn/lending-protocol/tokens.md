<script setup>
  import config from '@berachain/config/constants.json';
  import Token from '@berachain/ui/Token';
</script>

# Tokens

In the Bend protocol, we're typically dealing with three main categories of tokens:

1. **aTokens**
2. **Variable Debt Tokens**
3. **`$HONEY`**

## aTokens

<p>
  <Token title="$aHONEY" image="/assets/ahoney.png" />
</p>

aTokens are tokens minted and burnt upon supply and withdraw of assets to a Bend market.

Users receive a corresponding amount of aTokens in return when depositing a token, e.g. deposit `$HONEY` and get `$aHONEY`. These aTokens accrue interest over time through an increasing (rebasing) token balance.

aTokens are pegged to the value of the corresponding supplied asset at a 1:1 ratio. For example, a user deposits 100 `$HONEY`, receiving 100 `$aHONEY`. Over time, the position appreciates to 102 `$aHONEY`, which is redeemable for 102 `$HONEY`.

Where no borrowing market exists for an asset (e.g., `$WETH`), users' corresponding aToken balances remain static (because no interest accrues).

### Transfers

aTokens can be freely transferred or traded, with exceptions. Before each transfer, safety checks are performed to ensure that the user's borrowing positions remain healthy. An aToken transfer will be unsuccessful if the resulting [Health Factor](/learn/lending-protocol/liquidations#liquidation-triggers) of the user would fall below 1.

## Variable Debt Tokens

Debt tokens are issued when users borrow assets. These tokens represent users' debt obligations to the protocol, and must be repaid to unlock their collateral.

Because Bend only currently supports variable lending rates and `$HONEY` as a borrowable asset, the only debt tokens issued by Bend are `$vdHONEY`.

Like `aTokens`, debt tokens also increase in balance over time, reflecting the need for users to pay back more `$HONEY` than they initially borrowed due to accrued interest. Read more about [Interest Rates](/learn/lending-protocol/interest-rates).

Unlike `aTokens`, debt tokens are non-transferable.

## $HONEY

<p>
  <Token title="$HONEY" image="/assets/honey.png" />
</p>

`$HONEY` is Berachain's native stablecoin, and also serves as the base token for Bend. `$HONEY` suppliers earn interest from users borrowing it. It's the only asset on Bend that can earn interest by supplying.

### How can I get $HONEY?

To acquire `$HONEY`, you can visit the decentralized exchange at <a target="_blank" :href="config.mainnet.dapps.swap.url">BEX</a>, or mint it at <a target="_blank" :href="config.mainnet.dapps.honeySwap.url">Honey Swap</a>.

If you require funds, you can acquire testnet `$BERA` through the <a target="_blank" :href="config.mainnet.faucetUrl">Berachain Testnet Faucet</a>.
