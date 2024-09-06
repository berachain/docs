<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Frequently Asked Questions

## General - FAQs

### How do I acquire testnet `$HONEY`?

To acquire `$HONEY`, you can visit the decentralized exchange at <a target="_blank" :href="config.testnet.dapps.bex.url">BEX</a>, or mint it at <a target="_blank" :href="config.testnet.dapps.honeySwap.url">Honey Swap</a>.

If you require funds, you can acquire testnet `$BERA` through the <a target="_blank" :href="config.testnet.faucetUrl">Berachain Testnet Faucet</a>.

### How can I test Bend?

To supply `$HONEY` and earn interest:

1. Acquire `$BERA` tokens via official faucet.

2. Trade the `$BERA` token for `$HONEY` tokens via BEX dApp.

3. Supply `$HONEY` on Bend.

To test borrowing `$HONEY`, see [this guide](/learn/guides/borrowing-and-repaying-honey).

### How do I connect to Berachain's Testnet?

Instructions for connecting your wallet to the bArtio Testnet can be found here: https://docs.berachain.com/learn/connect-to-berachain

### Are flash loans available?

No, flash loans are not available on Bend.

### What are the costs of interacting with Bend?

Interacting with Bend requires on-chain transactions and therefore transaction (gas) fees for Berachain Blockchain usage, paid in `$BERA` tokens.

### Where are my supplied funds stored?

Your funds are allocated in [smart contracts](/developers/deployed-contracts). The code of the smart contract is public, open source, formally verified and audited by third party auditors. You can withdraw your funds from the pool on-demand or export a tokenized (`aTokens`) version of your lending positions. `aTokens` can be moved and traded as any other ERC20 asset on Berachain.

### Is there any risk?

No platform can be considered entirely risk free. The risks related to Bend are smart contract risk (risk of a bug within the protocol code) and (risk on the collateral liquidation process). Every possible step has been taken to minimize the risk as much as possible-- the protocol code is built on top of the battle-tested Aave v3 protocol, which is open source.

More specifically, different categories of risk include:

- **Oracle risks**: oracles are used to price assets on Bend. If the oracle is manipulated or is otherwise incorrect, accounting errors in the protocol can occur.
- **Smart contract risks**: despite the codebase being battle-tested, there is always a risk that a bug in the code can lead to a loss of funds.
- **Governance risks**: `$BGT` governance has a wide scope of powers.
- **Liquidation risks**: users' positions can be liquidated if there are large price fluctuations.
- **Solvency risks**: If liquidations do not occur in a timely manner, the protocol may be left undercollateralized, and lenders may not be able to fully withdraw their collateral.

### Scams

Be careful where you try interacting with Bend. Bend doesn't have any downloadable mobile applications available, and if you find one, it is a scam. Bend would not ask for your seed passphrase ever. Bend never advertises on any social media or search engine. If you see any advertisement, those are scams and phishing sites.

The only UI for accessing Bend is at <a target="_blank" :href="config.testnet.dapps.bend.url">{{config.testnet.dapps.bend.url}}</a>.

## Borrowing - FAQs

### Why would I borrow instead of selling my assets?

Selling requires exiting your position and reducing exposure that particular asset, potentially carrying taxable events or tax implications. Bend helps those users who wish to maintain long exposure to a crypto-asset (leaving potential for upside gains) but wanted stablecoin capital to work with. Borrowing provides a means to access liquidity without liquidating your assets. Users typically borrow for unforeseen expenses, leverage their holdings, or explore new investment opportunities.

### How much I can borrow?

There are two factors that may limit how much you can borrow:

1. Borrow caps define the maximum amount of an asset that can be borrowed. If an asset hits the maximum number of loans allowed for it, that specific asset becomes unavailable for borrowing.
2. A user's health factor (determined by the ratio of what you have borrowed to the collateral value you supplied) limits how much that user can borrow.

![How Much Can I Borrow](/assets/how_much_can_borrow.png)

### What asset do I need to repay?

You repay your loan in the same asset you borrowed (i.e. `$HONEY`).

### How much would I pay in interest?

The interest rate applicable to your borrowed assets is determined by the borrowing rate, which is influenced by the supply and demand dynamics of the asset. Additionally, the interest rate for a variable rate undergoes constant fluctuations. You can check your current borrowing rate at any time within the "Your Borrows" section of your dashboard. Read more about [Interest Rates](/learn/lending-protocol/interest-rates).

### What is the health factor?

The health factor (HF) is a numerical representation of the security of your deposited assets in relation to the borrowed assets and their underlying value. Once the HF reaches 1, your loan becomes susceptible to liquidation. With a HF of 2 (HF=2), the collateral value compared to the borrowed amount can decrease by half, or 50%. The HF is influenced by the liquidation threshold of your collateral relative to the value of your borrowed funds. See the [health factor formula](/learn/lending-protocol/liquidations#health-factor).

### What happens when my health factor is reduced?

The HF adjusts based on the fluctuation in the value of your collateral. An increase in your HF reduces the likelihood of reaching the liquidation threshold. Conversely, if the value of your collateralized assets decreases, the HF decreases as well, increasing the risk of liquidation.

### How do I pay back the loan?

In order to pay back the loan you simply go to the "Your Borrows" section of your dashboard and click on the "Repay" button for the asset you borrowed and want to repay. Select the amount to pay back and confirm the transaction.

![How To Payback Loan](/assets/how_to_payback_loan.png)

For a more detailed guide check [Repaying](/learn/guides/borrowing-and-repaying-honey#how-do-i-repay) guide.

### How do I avoid liquidation?

You can increase your HF to avoid liquidation by either 1) repaying the loan or 2) depositing more collateral. Out of these two available options, repaying the loan would increase your HF more.

## Supply - FAQs

### How much do I earn for supplying `$HONEY`?

`$HONEY` suppliers earn a fluctuating interest rate based on how much is being borrowed, relative to what is supplied. The higher the borrow utilization, the higher the yield for suppliers.

The `Earn APY` figure on the UI shows the instantaneous APY that suppliers are earning.

### Is there a minimum or maximum amount to supply?

There is no minimum or maximum amount set right now.

### How do I withdraw?

To withdraw you need to go to the "Dashboard" section and click on “Withdraw”. ![How To Withdraw 1/4](/assets/how_to_withdraw_1.png)

## Liquidations - FAQs

### How much is the liquidation penalty?

The liquidation penalty (or bonus for liquidators) is specific to a particular collateral market. Developers can query this with the `getReserveConfigurationData()` function on the [PoolDataProvider](/developers/contracts/pooldataprovider#getreserveconfigurationdata) contract.

### Is there an example of what a liquidation looks like?

See this [Liquidation Example](/learn/lending-protocol/liquidations#example).

### How can I avoid getting liquidated?

You can increase your health factor to avoid liquidation by either 1) repaying the loan or 2) depositing more collateral. Out of these two available options, repaying the loan would increase your HF more.

### Can I participate in the liquidations ecosystem?

Yes, liquidations are open to anyone, but there is a lot of competition. Normally liquidators develop their own solutions and bots to be the first ones liquidating loans to get the liquidation bonus.
