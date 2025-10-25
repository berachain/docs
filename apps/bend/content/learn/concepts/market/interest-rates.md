---
head:
  - - meta
    - property: og:title
      content: Bend Concepts - Market - Interest Rates
  - - meta
    - name: description
      content: What are Bend Interest Rates
  - - meta
    - property: og:description
      content: What are Bend Interest Rates
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Interest Rates

Understanding how interest rates are determined and how they affect a borrower's position is fundamental to building a safe and transparent borrow integration. In Bend, the interest a borrower pays is dictated by the market's **Interest Rate Model (IRM)**.

## The Role of the Interest Rate Model (IRM)

Each Bend Market is created with a specific, immutable IRM. This smart contract contains the logic that dynamically calculates the borrow interest rate based on market conditions, primarily the **utilization rate**.

- **Utilization Rate:** The ratio of total borrowed assets to total supplied assets in a market.  
  Utilization = Total Borrows / Total Supply
- **Approved IRMs:** Only IRMs that have been approved by Bend Governance can be used to create new markets. Currently, the primary model is the `AdaptiveCurveIRM`.

### The AdaptiveCurveIRM

The `AdaptiveCurveIRM` is designed to maintain market utilization around a target of **90%**.

- **When utilization < 90%:** The borrow rate gradually decreases to incentivize more borrowing.
- **When utilization > 90%:** The borrow rate rapidly increases to encourage repayments and attract more supply.

This mechanism ensures that markets remain capital-efficient while having enough liquidity for withdrawals.

For a deeper dive into the mathematical formulas and adaptive mechanics, see the [**IRM Concept Page**](/learn/concepts/irm).

### Determine Market AdaptiveCurveIRM

To find the rate at target utilization for each market you will need to check 2 contracts:

- **Morpho Contract** - To retrieve IRM for market
- **IRM Contract** - Query rate at utilization point (e.g. 80%)

With the assumption that we'll use one of the following markets:

| Market                                                   | MarketId                                                    |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| {{config.mainnet.dapps.bend.marketIds.wsrusdhoney.name}} | {{config.mainnet.dapps.bend.marketIds.wsrusdhoney.address}} |
| {{config.mainnet.dapps.bend.marketIds.wbtchoney.name}}   | {{config.mainnet.dapps.bend.marketIds.wbtchoney.address}}   |
| {{config.mainnet.dapps.bend.marketIds.susdehoney.name}}  | {{config.mainnet.dapps.bend.marketIds.susdehoney.address}}  |
| {{config.mainnet.dapps.bend.marketIds.wgberahoney.name}} | {{config.mainnet.dapps.bend.marketIds.wgberahoney.address}} |
| {{config.mainnet.dapps.bend.marketIds.wethhoney.name}}   | {{config.mainnet.dapps.bend.marketIds.wethhoney.address}}   |
| {{config.mainnet.dapps.bend.marketIds.wberahoney.name}}  | {{config.mainnet.dapps.bend.marketIds.wberahoney.address}}  |
| {{config.mainnet.dapps.bend.marketIds.iberahoney.name}}  | {{config.mainnet.dapps.bend.marketIds.iberahoney.address}}  |

#### Step 1 - Determined IRM Contract

Go to <a target="_blank" :href="config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bend.morpho.address + '?utm_source=' + config.websites.docsBend.utmSource + '#readContract'">{{config.mainnet.dapps.berascan.url + 'address/' + config.mainnet.contracts.bend.morpho.address + '#readContract'}}</a> and enter one of the **MarketIds** from above in the `idToMarketParams` field.

![Berascan - Determine IRM Contract Address](/assets/learn-concepts-market-interestrates-adaptivecurveirm-01.png)

Returned should provide something similar to the following:

| Name            | Type    | Value                                      |
| --------------- | ------- | ------------------------------------------ |
| loanToken       | address | 0x0dE23153BC280dD95BE914ddafb5591aE877e067 |
| collateralToken | address | 0xC3aD1095c231bb5D25E7EB1Aa23de7A9439EA12c |
| oracle          | address | 0xc76A0E60016dFd4B18Db71b6DaEF769bc8057a3d |
| irm             | address | 0x1d5376e532CcF25b740270624111D665830E5dB9 |
| lltv            | uint256 | 945000000000000000                         |

Take note of the `irm` address and go to that address on <a target="_blank" :href="config.mainnet.dapps.berascan.url + '?utm_source=' + config.websites.docsBend.utmSource">{{config.mainnet.dapps.berascan.url}}</a>.

#### Step 2 - Determine Market Rate Target Utilization

Enter one of the **MarketIds** from above into the `rateAtTarget` field.

![Berascan - Determine Market Rate Target Utilization](/assets/learn-concepts-market-interestrates-adaptivecurveirm-02.png)

## How Interest Accrues on Debt

For a borrower, the most important takeaway is that **interest is constantly accruing**, increasing their total debt over time. This directly impacts their position's health.

The process is as follows:

#### 1. Rate Calculation

The IRM calculates the instantaneous `borrowRate` based on the market's current utilization.

#### 2. Interest Accrual

This rate is applied to the borrower's debt continuously. The amount of interest accrued increases the `totalBorrowAssets` in the market and, proportionally, the asset value of each borrower's `borrowShares`.

#### 3. Impact on Health Factor

As the debt value increases due to accrued interest, the user's **LTV rises** and their **Health Factor falls**, even if collateral and asset prices remain stable.

Health Factor = (Collateral Value × LLTV) / (Initial Debt + Accrued Interest)

This is a critical concept to communicate to users: their position can become riskier over time simply from interest accrual.

## Onchain State and `accrueInterest`

The Bend contract does not update interest for every block to save gas. Instead, interest is calculated and applied only when a market interaction occurs via the `_accrueInterest` internal function. This function is triggered by actions like `borrow`, `repay`, `supply`, and `withdraw`.

**What this means for your integration:**

When you fetch a user's position from the contract, the `totalBorrowAssets` value reflects the state at the _last interaction_. To get the up-to-the-second debt value, you must account for the interest accrued since the `lastUpdate` timestamp.
