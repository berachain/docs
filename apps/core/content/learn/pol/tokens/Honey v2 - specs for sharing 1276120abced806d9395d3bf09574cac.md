# Honey v2 - specs for sharing

Person: Bearlusconi Bera
dApp: HONEY
Type: Knowledge, Specs
Contains file: No
Date: October 22, 2024 8:04 AM

## INDEX

## **HONEY V2**

### Premise: video walkthrough for QuantStamp

https://drive.google.com/file/d/1Sf7DJ1mU9W9jd0iBNzXtpML8YTJLbug-/view?usp=sharing

### **Overview**

Honey v2 focuses on solving Honey v1 issues ([**HONEY V1**](Honey%20v2%20-%20specs%20for%20sharing%201276120abced806d9395d3bf09574cac.md) ) to enable multiple collaterals.

Technically the codebase remains the same with limited changes.

NOTE: for Honey v1 specs please refer to: https://docs.berachain.com/learn/pol/tokens/honey

### **Fix for: mint & redeem with multi collaterals**

 **For reference: [**Issue 1: mint & redeem with multi collaterals**](Honey%20v2%20-%20specs%20for%20sharing%201276120abced806d9395d3bf09574cac.md)**

- Mint:
    - when one or more collaterals depeg, they can no longer be used for minting (the same as for blacklisted assets)
    - if all assets are de-pegged or blacklisted, mint enters **Basket Mode** (more details below).
    NOTE: this is an edga case, very unlikely
- Redeem:
    - when one or more collaterals depeg, Honey automatically enters the **Basket Mode**
    - in Basket Mode users can only redeem for the entire basket of collaterals:
        - Exemple: redeem 1 Honey
            
            User provides:
            
            - 1 Honey
            
            User receives:
            
            - Amount of USDC = 1 * weight of USDC in basket = 1 * USDC.BalanceOf(vault)/ [USDC.BalanceOf(vault) + pyUSD.BalanceOf(vault)]
            - Amount of pyUSD =  1 * weight of pyUSD in basket = 1 * pyUSD.BalanceOf(vault)/ [USDC.BalanceOf(vault) + pyUSD.BalanceOf(vault)]
    - Note: Basket Mode for mint (residual case described) applies in reverse: provides the basket of collateral to mint 1 honey
- Depeg identification process:
    - Every time mint & redeem are called, Oracle price of collaterals is checked
        - NOTE: Oracle is simply used indirectly as trigger, pricing of the assets do NOT depend on it (way safer choice)
    - If any collateral deviates from 1 more than the a pre-defined “depeg range” mint is limited and redeem switches to basket mode
    - To avoid arbitrage, depeg range is: mint or redeem fee (depending on the direction) + swap fee → assuming:
        - 10 or 20bps mint & redeem fee
        - 1bps swap fee for stable coin pools
        
        We have range = +- 21bps 
        
    - This seems reasonable to avoid Honey entering depeg condition too many times
    For reference:
        - USDC vs pyUSD price 1 month:
        
        ![image.png](Honey%20v2%20-%20specs%20for%20sharing%201276120abced806d9395d3bf09574cac/image.png)
        
        - USDC vs pyUSD price 1 year:
        
        ![image.png](Honey%20v2%20-%20specs%20for%20sharing%201276120abced806d9395d3bf09574cac/image%201.png)
        
    - Trend noticed: pyUSD was unstable initially (closer to launch) but it has been way more stable recently
    - Source: https://coinmarketcap.com/currencies/usd-coin/
- UX for users:
    - In Basket mode redeeming is similar to redeeming an LP on a DEX
    - To simplify UX we will embed a zap function into the frontend

### **Fix for: Blacklisted assets removal**

**For reference: [**Issue 2: Blacklisted assets removal**](Honey%20v2%20-%20specs%20for%20sharing%201276120abced806d9395d3bf09574cac.md)**

Introduction of a Liquidation Procedure:

- Functioning:
    - When an asset is blacklisted a new function is activated: user can redeem the blacklisted collateral providing a not blacklisted one
    - The liquidation price is defined as: Oracle price - spread
    - The *spread* is used to incentivise users to dispose the blacklisted asset and it is set by Governance
- Liquidation Procedure Trigger:
    - It activates automatically when governance blacklists an asset
- Re-capitalization:
    - We will add a method to re-capitalise Honey vaults (now missing) to allow governance using resources to cover depeg losses and/ or cost related to disposal (aka spread component)

### **Additional fix: cap on collaterals**

Introduction of caps on collaterals to improve risk management:

- Functioning:
    - We will add a global cap and a relative cap
    - Global cap: each collateral cannot be more than x% of total collaterals
        - Formula: USDC.BalanceOf(vault)/ [USDC.BalanceOf(vault) + pyUSD.BalanceOf(vault)] < Global_Cap
        - Global cap is OPTIONAL and set by Governance
    - Relative cap: for each collateral we can set a relative cap against a reference collateral
        - Formula: pyUSD.BalanceOf(vault)/ USDC.BalanceOf(vault) < Relative_Cap
        - Relative cap is OPTIONAL and set by Governance
    - When a collateral reaches cap it can no longer be used to MINT
    - NOTE: caps do not apply in Basket Mode

## **HONEY V1**

### Functioning - core elements

**Mint & Redeem**

At the moment users can:

- mint any time at 1:1 minus mint fees (0.10% TBC) with any asset accepted
- redeem any time at 1:1 minus fees (0.25% TBC) with any asset accepted

**Asset Blacklisting & Pausing**

At the moment the only two “emergency” procedures are:

- Blacklisting an asset
    - Assets blacklisted can only be redeemed
- Pausing
    - Each asset vault

### **Issue 1: mint & redeem with multi collaterals**

An user can always enter with one asset and exit with the other.

As a result, any depeg creates an arbitrage opportunity: 

- buy depegged asset
- mint at 1:1 honey
- redeem not-depegged assets

The result of this is that Honey ends up backed 100% by the depeg assets.

It works basically the same as DAI Peg Stab. Module (and we saw what happened when USDC depegged).

### **Issue 2: Blacklisted assets removal**

There is no liquidation/ disposal procedure for blacklisted assets.

As a result the only way to dispose a blacklisted assets is through users redeeming it. Users can be (at least partially) incentivised to redeem the asset by setting redeem fees to zero.

Nonetheless:

1. The incentive is limited and thus Honey can remain backed by blacklisted assets for long (not good for compliance / risk management) 
2. Even worse so, in case the blacklisted asset is depegged (for instance because we decide to dispose a depegged assets), the arbitrage opportunity at Issue 1 translates into Honey ending up 100% backed by the blacklisted assets

# Honey v2 - detailed specs of the codebase

| Symbol | Definition | Description |
| --- | --- | --- |
| $a_i$ | $1≤i≤N$ | Collateral asset |
| $A$ | $\{a_i\ |\ i:=1..N\}$ | The set of all the collateral assets |
| $v(a_i)$ |  | USD value of collateral asset |
| $b(a_i, W)$ |  | Balance of wallet $W$ for collateral asset $a_i$ |
| $b_C(a_i)$ | $b(a_i, W_F)-fees(a_i)$ | Portfolio (factory $W_F$) balance of collateral asset, without collected fees. |
| $w(a_i, A)$ | $b_C(a_i)\ / \sum_{a_j\in A}b_C(a_j)$ | Portfolio (factory $W_F$) weight of collateral asset |
| $r_M(a_i)$ | $0.98≤x≤1$ | Mint rate of collateral asset
Default value of 0.998 (99.8%). |
| $r_R(a_i)$ | $0.98≤x≤1$ | Redeem rate of collateral asset
Default value of 0.998 (99.8%). |
| $\epsilon_U(a_i)$ |  | Upper offset of collateral asset value for USD peg.
Default value of 0.002 USD. |
| $\epsilon_L(a_i)$ |  | Lower offset of collateral asset value for USD peg.
Default value of 0.002 USD. |
| $peg(a_i)$ | $True$ if $[1-\epsilon_L(a_i)] ≤ v(a_i) ≤ [1+\epsilon_U(a_i)]$ | Collateral asset pegged to USD |
| $f_B$ |  | Flag raised for forcing the basket mode |
| $bad(a_i)$ |  | Flag raised for assets that should be liquidated |
| $A_{BL}$ | $\{a_i\ |\ a_i\in A\ \land\ bad(a_i)=True\ \land\ b_C(a_i)=0\}$ | The set of all the liquidated bad collaterals. |
| $M_B$ | $True$ if $f_B=True$
Otherwise:

On mint:
$True$ if $\forall i\ peg(a_i)=False \lor  a_i\notin A_G$
On redeem:
$True$ if $\exists i\ |\ peg(a_i)=False\ \land\ a_i\notin A_{BL}$ | Basket mode enabled |
| $\hat a$ |  | Reference asset for collateral cap limit |
| $c_R(a_i)$ |  | Collateral cap limit relative to the reference one |
| $c_G$ |  | Collateral cap limit relative to all the portfolio.
Default value of 100%. |
| $cap_R(a_i)$ | $True$ if $[b_C(a_i)\ /\ b_C(\hat a)]≤c_R(a_i)$ | Collateral asset capped relative to the reference one |
| $A_G$ | $\{a_i\ |\ a_i\in A\ \land\ bad(a_i)=False\}$ | The set of all the good collateral assets |
| $w_G(a_i)$ | $0$ if $a_i\notin A_G$
$w(a_i,A_G)$ otherwise | Portfolio weight of good collateral asset |
| $cap_G$ | $True$ if $\forall i\ w_G(a_i)≤c_G$ | Collateral assets capped globally |
| $r_L(a_i)$ |  | Premium rate of bad collateral asset upon liquidation |
| $b_R(a_i)$ |  | Target balance of collateral asset that must be reached with the recapitalization |
| $x_R(a_i)$ |  | Minimum amount of collateral asset that can be accepted for recapitalization.
Default value of 1 USD. |

<aside>
ℹ️

In order to keep the limits disabled until someone defines such values:

- The global limit has to be initialized at 100%.
- The first collateral asset has to be defined as the reference one.
- The relative limit has to be initialized at 100% for each created vault.
</aside>

<aside>
⚠️

Beware of difference on decimals for number representation.

</aside>

<aside>
⚠️

Here the assumption is that the feed data from the price oracle is always working in the right way.

For practical reasons, the implementation MUST:

- Consider an asset depegged when the feed data is not fresh enough.
- Revert the liquidation when the feed data is not fresh enough.

Right now we are assuming that the feed data for a stable coin is not fresh enough if it was stale for at least the last 4 seconds (about two blocks).
To avoid misuse, we do not allow such amount to be changed with a value greater than one minute.

</aside>

## Mint

User $u$ specifies the amount $x_u$ of collateral asset $a_u$ that he wants to provide.

1. Compute $M_B$
2. If $M_B$ is not enabled:
    1. Revert if $a_u\notin A_G$.
    2. Revert if $peg(a_u)=False$.
    3. Get $x_u$ amount of $a_u$ from user.
    4. Deposit $x_u$ into the vault of $a_u$.
    5. Compute Honey amount $h_u:=x_u\cdot r_M(a_u)$.
    6. Compute fees $f_u:=x_u\cdot (1-r_M(a_u))=x_u-h_u$.
    7. Account fees $f_u$ as collateral vault shares owned by the factory.
    8. Revert if $cap_R(a_u)=False\ \land\ M_B=False$ (see later).
    9. Mint $h_u$ Honey to user.
3. If $M_B$ is enabled:
    1. Compute $w(a_i, A)$ for each collateral asset $a_i$.
    2. For each collateral asset $a_i$:
        1. Get $x_i:=x_u\cdot w(a_i, A)/w(a_u, A)$ amount of $a_i$ from user.
        2. Handle liquidity $x_i$ as when $M_B$ is not enabled.
4. Revert if $cap_G=False$ and $M_B=False$.

<aside>
⚠️

The user must own and approve the needed collateral assets when the basket mode is enabled.

On the frontend, the user has to see the mode status and the weights.

</aside>

<aside>
ℹ️

Of course the operation must be avoided if either the factory or the collateral vault has been paused.

</aside>

## Redeem

User $u$ specifies the amount $h_u$ of Honey that he wants to provide and the collateral asset $a_u$ that he wants in return.

1. Compute $M_B$
2. If $M_B$ is not enabled:
    1. Compute collateral asset amount $x_u=h_u\cdot r_R(a_u)$
    2. Compute fees $f_u:=h_u\cdot (1-r_R(a_u))=h_u-x_u$.
    3. Account fees $f_u$ as collateral vault shares owned by the factory.
    4. Burn $h_u$ Honey from the user.
    5. Transfer $x_u$ amount of $a_u$ to the user.
3. If $M_B$ is enabled:
    1. Compute $w(a_i)$ for each collateral asset $a_i$.
    2. For each collateral asset $a_i$:
        1. Compute $h_i:=h_u\cdot w(a_i)$.
        2. Handle liquidity $h_i$ as when $M_B$ is not enabled.
4. If $M_B$ is not enabled:
    1. If $a_u=\hat a$:
        1. For each collateral asset $a_i\not =\hat a$:
            1. Revert if $cap_R(a_i)=False$
    2. Revert if $cap_G=False$

## Liquidate

User specifies the amount $x_G$ of good collateral asset $a_G$ that he wants to provide and the bad collateral asset $a_B$ that he’s willing to obtain.

1. Revert if liquidation is disabled.
2. Revert if collateral asset $a_G$ is marked as bad.
3. Revert if collateral asset $a_B$ is not marked as bad.
4. Refert if collateral asset $a_B=\hat a$.
5. Retrieve $v(a_G)$ and $v(a_B)$ from the oracle.
    1. Revert if fresh values are not available.
6. Get $x_G$ amount of $a_G$ from user.
7. Deposit $x_G$ into the vault of $a_G$.
8. Compute $x_B:=x_G\cdot [v(a_G)\ /\ v(a_B)]\cdot[1+r_L(a_B)]$.
9. If $x_B>b_C(a_B)$:
    1. Reassign $x_B:=b_C(a_B)$.
    2. Compute $x'_G:=b_C(a_B)\ /\ ([v(a_G)\ /\ v(a_B)]\cdot[1+r_L(a_B)])$
    3. Transfer $x_G-x'_G$ amount of $a_G$ back to the user.
10. Revert if $cap_R(a_G)=False$.
11. Revert if $cap_G=False$.
12. Transfer $x_B$ amount of $a_B$ to the user.

<aside>
ℹ️

If the bad collateral asset is the reference one:

- Revert until the reference asset is changed (because it will block the other assets on mint).

Otherwise:

- Cap relative to the bad collateral asset:
    - It should be checked, but can be ignored as the liquidation procedure only allows to reduce the bad collateral asset.
- Cap relative to the good collateral asset (when different from the reference one):
    - It must be checked.
- Global cap:
    - It must be checked, by taking care of excluding the bad collateral assets from it.
</aside>

<aside>
ℹ️

Should a user call liquidate even when $b_C(a_B)=0$, there seems to be no issue and the transaction happens to just consume gas.

</aside>

<aside>
⚠️

Liquidation can be activated or deactivated.

It is a global variable (ie., it applies to all the collaterals blacklisted). 

By Default Liquidation is activated → as soon as an asset is blacklisted it can be liquidated.

</aside>

## Recapitalization

User $u$ specifies the amount $x_u$ of good collateral asset $a_u$ that he wants to provide.

1. Revert if $x_u<x_R(a_u)$.
2. Revert if $b_C(a_u)+x_u>b_R(a_u)$.
3. Get $x_u$ amount of $a_u$ from user.
4. Deposit $x_u$ into the vault of $a_u$.
5. Revert if $cap_R(a_u)=False$.
6. Revert if $cap_G=False$.

# Known issues

- The cap limits must be lowered below 100% after an initial amount of collateral has been used, otherwise it won’t be possible to mint.
- Collateral vaults created when in basket mode cannot be used as their weight is zero.