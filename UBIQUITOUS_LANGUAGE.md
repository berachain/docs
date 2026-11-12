# Ubiquitous Language — Proof of Liquidity

## Tokens

| Term       | Definition                                                                                                                                                                                                         | Aliases to avoid                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| **BERA**   | Native gas and staking token. Validators stake BERA for consensus; block rewards are emitted as WBERA.                                                                                                             | —                                                             |
| **WBERA**  | Wrapped BERA (1:1). The Reward Vault emission token and the payout token for the Incentive Auction.                                                                                                                | "different from BERA" — they are the same value               |
| **sWBERA** | Yield-bearing token issued by `WBERAStakerVault` when a user deposits BERA or WBERA. Earns Incentive Auction yield.                                                                                                | —                                                             |
| **BUSD**   | Berachain's native stablecoin. Contract and ABI paths can still use `Honey` names.                                                                                                                                 | HONEY in user-facing prose                                    |
| **LST**    | A transferable ERC-20 token representing staked BERA, issued by an LST protocol. Can be staked into an `LSTStakerVault` for Incentive Auction yield. On mainnet, only **iBERA** (Infrared) has a registered vault. | — |
| **iBERA**  | Infrared's liquid staking token. Transferable ERC-20. The only LST with a registered `LSTStakerVault` on mainnet.                                                                                                  | —                                                             |
| **BGT**    | Deprecated governance token from the pre-Next model. Can be redeemed 1:1 for BERA. No role in current PoL.                                                                                                         | —                                                             |

## Actors

| Term                       | Definition                                                                                                                        | Aliases to avoid                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Validator**              | A node in the active set (top 69 by BERA stake) that produces blocks and routes WBERA emissions via BeraChef.                     | Node, miner                                                         |
| **Validator operator**     | The address registered via `BeaconDeposit.getOperator(pubkey)` that receives base rate and incentive commission.                  | Validator (when discussing payouts)                                 |
| **BERA staker**            | Anyone who deposits BERA to a validator via `BeaconDeposit.deposit()` (direct, 10k min). | Delegator (no `delegate()` exists for validator staking)            |
| **Vault staker**           | A user who stakes PoL-eligible receipt tokens in a Reward Vault to earn allocated WBERA emissions.                                | LP staker (vault tokens include more than LP shares)                |
| **sWBERA staker**          | A user who deposits BERA or WBERA into `WBERAStakerVault` and holds sWBERA. Earns Incentive Auction yield.                        | BERA staker (ambiguous with validator stakers)                      |
| **LST staker**             | A user who stakes a transferable LST (e.g., iBERA) into a registered `LSTStakerVault`. Earns Incentive Auction yield.             | — |
| **LST protocol**           | An entity that issues transferable LST tokens (e.g., Infrared issues iBERA).                                                      | — |
| **Protocol**               | A project that creates Reward Vaults, funds incentive tokens, and competes for validator reward allocation.                       | dApp, project                                                       |

## Contracts

| Term                     | Definition                                                                                                                                             | Aliases to avoid                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Incentive commission** | Validator operator's share of incentive tokens: `(amount * commissionRate) / 1e4`. Max 20%, default 5%.                                                | Validator commission (acceptable shorthand)                      |
| **Incentive Auction**    | Settlement where a buyer pays WBERA to `IncentivesCollector` and receives accumulated redirected incentive tokens.                                     | Fee collection                                                   |
| **IncentivesCollector**  | Installed as `RewardVaultFactory.incentiveTokensCollector`. Splits auction WBERA pro-rata between `WBERAStakerVault` and registered `LSTStakerVault`s. | FeeCollector (different contract; pays the deprecated BGTStaker) |
| **WBERAStakerVault**     | Issues sWBERA. Receives WBERA from the Incentive Auction.                                                                                              | Staking Vault (acceptable in user-facing docs)                   |
| **LSTStakerVault**       | Governance-registered vault that receives Incentive Auction WBERA (converted to LST via adapter).                                                      | — |

## Yield paths

| Recipient                  | Source                                       | Path                                                                   |
| -------------------------- | -------------------------------------------- | ---------------------------------------------------------------------- |
| **Validator operator**     | Base rate (0.4 WBERA/block)                  | BlockRewardController → operator                                       |
| **Validator operator**     | Incentive commission                         | RewardVault → operator                                                 |
| **Vault staker**           | Allocated WBERA emissions                    | Distributor → RewardVault → claim                                      |
| **sWBERA staker**          | Incentive Auction WBERA                      | IncentivesCollector → WBERAStakerVault                                 |
| **LST staker**             | Incentive Auction WBERA → LST                | IncentivesCollector → LSTAdapter → LSTStakerVault |

## Key relationships

- **iBERA is an LST.** Infrared issues iBERA as a transferable ERC-20. Users stake iBERA into the registered LSTStakerVault (siBERA) to earn Incentive Auction yield.
- **sWBERA and LST staker yields come from the same auction.** IncentivesCollector splits WBERA pro-rata by WBERA-denominated totalAssets across both vault types.

## Flagged ambiguities

- **"Delegator"**: No `delegate()` for BERA staking. Use **BERA staker**. `RewardVault.delegateStake()` is custodial receipt-token staking.
- **"FeeCollector" vs "IncentivesCollector"**: Different contracts. FeeCollector pays BGTStaker (legacy). IncentivesCollector splits to sWBERA + LST vaults. Use "incentive tokens collector" as the generic role name.
