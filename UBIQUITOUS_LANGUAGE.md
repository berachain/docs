# Ubiquitous Language — Proof of Liquidity

## Tokens

| Term       | Definition                                                                                                                                                                                                         | Aliases to avoid                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| **BERA**   | Native gas and staking token. Validators stake BERA for consensus; block rewards are emitted as WBERA.                                                                                                             | —                                                             |
| **WBERA**  | Wrapped BERA (1:1). The Reward Vault emission token and the payout token for the Incentive Auction.                                                                                                                | "different from BERA" — they are the same value               |
| **sWBERA** | Yield-bearing token issued by `WBERAStakerVault` when a user deposits BERA or WBERA. Earns Incentive Auction yield.                                                                                                | —                                                             |
| **LST**    | A transferable ERC-20 token representing staked BERA, issued by an LST protocol. Can be staked into an `LSTStakerVault` for Incentive Auction yield. On mainnet, only **iBERA** (Infrared) has a registered vault. | stBERA (non-transferable pool shares are not LSTs)            |
| **iBERA**  | Infrared's liquid staking token (`0x9b67…`). Transferable ERC-20. The only LST with a registered `LSTStakerVault` on mainnet.                                                                                      | —                                                             |
| **stBERA** | Non-transferable pool shares issued by Berachain Staking Pools. No `transfer()`, `transferFrom()`, or `approve()`. Cannot be staked into an `LSTStakerVault`.                                                      | LST (stBERA is not liquid — it is soulbound to the depositor) |
| **BGT**    | Deprecated governance token from the pre-Next model. Can be redeemed 1:1 for BERA. No role in current PoL.                                                                                                         | —                                                             |

## Actors

| Term                       | Definition                                                                                                                        | Aliases to avoid                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Validator**              | A node in the active set (top 69 by BERA stake) that produces blocks and routes WBERA emissions via BeraChef.                     | Node, miner                                                         |
| **Validator operator**     | The address registered via `BeaconDeposit.getOperator(pubkey)` that receives base rate and incentive commission.                  | Validator (when discussing payouts)                                 |
| **BERA staker**            | Anyone who deposits BERA to a validator via `BeaconDeposit.deposit()` (direct, 10k min) or `StakingPool.submit()` (pool, no min). | Delegator (no `delegate()` exists for validator staking)            |
| **Vault staker**           | A user who stakes PoL-eligible receipt tokens in a Reward Vault to earn allocated WBERA emissions.                                | LP staker (vault tokens include more than LP shares)                |
| **sWBERA staker**          | A user who deposits BERA or WBERA into `WBERAStakerVault` and holds sWBERA. Earns Incentive Auction yield.                        | BERA staker (ambiguous with validator stakers)                      |
| **LST staker**             | A user who stakes a transferable LST (e.g., iBERA) into a registered `LSTStakerVault`. Earns Incentive Auction yield.             | Staking pool staker (pool shares cannot be staked here)             |
| **Staking pool depositor** | A user who deposits BERA into a Staking Pool and receives non-transferable stBERA. Earns pool-level yield only.                   | LST holder (stBERA is not an LST)                                   |
| **LST protocol**           | An entity that issues transferable LST tokens (e.g., Infrared issues iBERA).                                                      | Staking pool (the pool is the contract, the protocol is the issuer) |
| **Protocol**               | A project that creates Reward Vaults, funds incentive tokens, and competes for validator reward allocation.                       | dApp, project                                                       |

## Contracts

| Term                     | Definition                                                                                                                                             | Aliases to avoid                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| **Incentive commission** | Validator operator's share of incentive tokens: `(amount * commissionRate) / 1e4`. Max 20%, default 5%.                                                | Validator commission (acceptable shorthand)                |
| **Incentive Auction**    | Settlement where a buyer pays WBERA to `IncentivesCollector` and receives accumulated redirected incentive tokens.                                     | Fee collection                                             |
| **IncentivesCollector**  | Installed as `RewardVaultFactory.incentiveTokensCollector`. Splits auction WBERA pro-rata between `WBERAStakerVault` and registered `LSTStakerVault`s. | FeeCollector (different contract — pays BGTStaker, legacy) |
| **IncentiveCollector**   | Pool-level contract that auctions operator commission incentive tokens for BERA, flowing to `StakingRewardsVault`.                                     | Not the same as IncentivesCollector                        |
| **WBERAStakerVault**     | Issues sWBERA. Receives WBERA from the Incentive Auction.                                                                                              | Staking Vault (acceptable in user-facing docs)             |
| **LSTStakerVault**       | Governance-registered vault that receives Incentive Auction WBERA (converted to LST via adapter).                                                      | Pool vault (these are not staking pool contracts)          |
| **Staking Pool**         | Contract where users deposit BERA via `submit()` and receive non-transferable stBERA shares. Managed by a SmartOperator.                               | —                                                          |

## Yield paths

| Recipient                  | Source                                       | Path                                                                   |
| -------------------------- | -------------------------------------------- | ---------------------------------------------------------------------- |
| **Validator operator**     | Base rate (0.4 WBERA/block)                  | BlockRewardController → operator                                       |
| **Validator operator**     | Incentive commission                         | RewardVault → operator                                                 |
| **Vault staker**           | Allocated WBERA emissions                    | Distributor → RewardVault → claim                                      |
| **sWBERA staker**          | Incentive Auction WBERA                      | IncentivesCollector → WBERAStakerVault                                 |
| **LST staker**             | Incentive Auction WBERA → LST                | IncentivesCollector → LSTAdapter → LSTStakerVault                      |
| **Staking pool depositor** | Operator WBERA + pool incentive auction BERA | SmartOperator + IncentiveCollector → StakingRewardsVault → pool rebase |

## Key relationships

- **stBERA is not an LST.** Pool shares have no transfer surface. A staking pool depositor cannot stake stBERA anywhere.
- **iBERA is an LST.** Infrared issues iBERA as a transferable ERC-20. Users stake iBERA into the registered LSTStakerVault (siBERA, `0xA350…`) to earn Incentive Auction yield.
- **The core Incentive Auction does not pay staking pools.** IncentivesCollector sends WBERA to WBERAStakerVault and LSTStakerVaults only. Staking pools have their own IncentiveCollector — a separate auction system.
- **sWBERA and LST staker yields come from the same auction.** IncentivesCollector splits WBERA pro-rata by WBERA-denominated totalAssets across both vault types.

## Example dialogue

> **Dev:** "Is stBERA an LST?"
>
> **Domain expert:** "No. stBERA is a non-transferable pool share — it has no transfer() or approve(). iBERA from Infrared is an LST: a transferable ERC-20 backed by staked BERA."
>
> **Dev:** "So how does a staking pool depositor earn auction yield?"
>
> **Domain expert:** "They don't — at least not from the core Incentive Auction. Pool depositors earn from the pool's own IncentiveCollector and operator WBERA. If someone wants core auction yield, they hold sWBERA or stake an LST like iBERA into a registered LSTStakerVault."
>
> **Dev:** "What about gBERA?"
>
> **Domain expert:** "gBERA exists as a token but has no registered LSTStakerVault on the IncentivesCollector. It doesn't earn auction yield until governance registers a vault for it."

## Flagged ambiguities

- **"Delegator"**: No `delegate()` for BERA staking. Use **BERA staker**. `DelegationHandler` in contracts-staking-pools is Foundation capital management. `RewardVault.delegateStake()` is custodial receipt-token staking.
- **"Staking pool staker" vs "LST staker"**: Distinct roles. Never hyphenate as one group. Pool depositors hold soulbound stBERA. LST stakers hold transferable tokens like iBERA.
- **"FeeCollector" vs "IncentivesCollector"**: Different contracts. FeeCollector pays BGTStaker (legacy). IncentivesCollector splits to sWBERA + LST vaults. Use "incentive tokens collector" as the generic role name.
