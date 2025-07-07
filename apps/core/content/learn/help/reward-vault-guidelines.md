# Berachain Reward Vault Requirements & Guidelines

Reward Vaults drive meaningful economic activity on Berachain. To qualify for **BGT emissions**, your vault must show that it **supports ecosystem goals and creates real user value.**

This guide captures all essential requirements.

## Ecosystem Value Requirements

### Adds Ecosystem Utility

- The vault must boost use or value of BERA or other major assets.
  - Eg. Enhancing yield across "Major" assets (as defined below) to encourage looping activity, or utilization of yield-bearing collateral across more exotic trading pairs, or other revenue generating use cases.
- This can happen through:
  - Liquidity pools (e.g., paired with BERA or majors)
  - Vault structures which carry out more complex multi-step operations
- Proposals should clearly explain how Rewards Vault will help scale your existing product. How does this vault become more than a simple farm?
- The best barometer for ecosystem utility is often correlation to some tangible, empirical metric of interest. PoL doesn’t work if it solely subsidizes idle capital. PoL works if it’s helping to encourage economic activity, which often represents itself in the form of application revenue, volume, fee generation, user growth etc.
- The above guidelines require some nuance, as there is value in experiments, whether that be in memecoins, token launchers, RWAs, consumer applications, and everything in between. However, for tried and true DeFi applications or adjacent vault products, there should be a path towards sustainable economic activity and growth.

### Reasonable Emission Fees

- Fees taken on yield **must not be excessive** or used mainly to recycle incentives.

### Yield Stacking Restrictions

- If a vault (e.g., ERC-4626) generates yield from **BGT farming**, the majority of that yield must be **passed through to stakers**, not recycled.

- Yield from **non-BGT sources** can be recycled into incentives.

- This prevents **double-dipping BGT rewards** without adding utility.

## Technical Requirements

**Aligned behavior and effective value creation.** All Reward Vaults must meet these expectations:

### Open Access

- The staking token must be **accessible to everyone**, with **no special permissions or barriers.**
- **Special exceptions may apply** for certain real-world asset (RWA) protocols that require **permissioned or compliance-specific applications.**

### Standard ERC20 Token

- The staking token must be a **standard ERC20 token**.

### Rebasing Tokens

- Rebasing staking tokens **must use a wrapper**.
- This does **not apply** if the rebasing rate is **0%** (e.g., OHM).

### Verified Contract

- The token's smart contract must be **verified on-chain**, and publicly viewable on tools like **Berascan**.

### Audits

- The protocol must have **at least one audit** and **no recent exploits**.
- If an exploit occurred, the proposer must provide **clear evidence that the issue has been resolved.**

### Staking and Incentive Token Liquidity Requirements

The tokens must have sufficient liquidity to support sustainable participation:

- The token should have at least **$100,000 in Total Value Locked (TVL).**
- If the token represents a **decentralized exchange (DEX) liquidity pool**, it must meet the following criteria:
  - At least **$50,000 in TVL paired with a "Major" asset**, defined as:
    - BERA, HONEY, BYUSD, USDC, wETH, wBTC, Stablecoins
    - **or other widely recognized, large-cap tokens**
      _(e.g., SOL, or comparable assets reasonably within the top 10 by market capitalization; note that only established tokens are eligible—purely speculative or memecoin assets do not qualify)_
    - An asset that is a **wrapper of a major asset** listed above.
    - An asset that is **minted using a major asset as collateral.**
- The token must be **deployed and verified on-chain.**
- Why focus on majors?
  - Boosts fee generation: Major-token pairs attract higher trading volumes, increasing fees for liquidity providers, and making Berachain into a home for desirable assets.
  - Reduces volatility risk: Major tokens are more stable, lowering impermanent loss for liquidity providers.
  - Democratized access: Requiring a major token in every liquidity pair lowers barriers to entry, making it easier for new users to participate without needing to acquire obscure or illiquid tokens
- Why enforce a minimum TVL requirement?
  - Serves as a filter for teams which might look to directly extract from the system, and demonstrates some degree of capital at risk, and ideally multiple participants from the community, indicating broader interest and trading potential for the pair
  - The simplest playbook for "extracting" would involve deploying and pairing a low-liq coin against a major, getting a Reward Vault approved, pumping the price of said low-liq coin to inflate incentive values, while owning the majority of the LP and pocketing all of the yields.

### Contracts Must Be Live

- All contracts being incentivized must be **already deployed and fully live on-chain.**
- **No rewards for theoretical, unlaunched, or coming-soon contracts.**

### Protocol Must Be Live

- The protocol itself must be **live on-chain and actively operating** prior to applying for Rewards Vault.

### Gas Efficiency

- Transfers must **not exceed 500,000 gas units per transaction**, to keep fees reasonable.

## Minimum Program Viability

### Sufficient Duration

- Incentives must **run at least 2 months** to sustain engagement.

### Sustainable Incentives

- Must target **$10,000+ per month in incentives.**
- Incentive levels must be **reasonably priced** relative to market conditions. Resources like [https://furthermore.app/](https://furthermore.app/) are recommended for understanding current market incentive rates.

## Governance & Compliance

### Proposal Requirements

- Submission of **Typeform:**
  - Complete the relevant Typeform to start your submission process.
  - **New Reward Vault Applications:** [Submit New Proposal](https://ufdx3v8g7qg.typeform.com/to/yqOvlUrV)
  - **Amendments to Existing Whitelisted Pools:** [Submit Amendment Request](https://ufdx3v8g7qg.typeform.com/to/vYCg8Gc7)
    - **Amendment requests** are intended only for **updating incentive token detail**s (e.g., changing the reward token) or **changing any management wallet addresses.**
  - Any changes to the **staking token itself** will require **submission of a new proposal**, not an amendment.
- Post Proposal on **BeraHub Forum**:
  - Publish your proposal on the [BeraHub governance forum](https://hub.forum.berachain.com) for community awareness and discussion.
  - If you would like to gather all required materials in advance, you can use this preparation form [here](https://docs.google.com/document/d/1omUTBug2w2DqGH5_oQIHROAWFQrZnO5iHkoyuJPseHE/edit?tab=t.0#heading=h.wjxouew5sjyw).

### Three-Week Maximum Rollover Policy

- All unapproved applications will **automatically roll over and remain in the review pipeline for up to three weeks.**

- **After the three-week period**, your team must **comment under your forum post or submit a new application** if you wish to have the proposal reactivated and put up for consideration again.

### BGT Use Clarity

- When applying, be specific about exactly what BGT will be used for.

### Deployment

- Reward vaults must be **deployed at time of submission.**
- Any changes require a **new proposal and vote.**

**To protect the system from value-extractive incentives, systemic risk, and abuse, the following measures may be exercised at any time:**

#### Time-Limited Whitelisting

- All whitelisted vaults are subject to periodic reevaluation and must continue to meet eligibility criteria to maintain active status.

#### Emergency Veto

- In the event of security vulnerabilities, critical protocol risks, or evidence of abuse, an emergency veto may be activated to suspend or revoke emissions immediately.

#### Post-Approval Disqualification

- Any vault that no longer meets the required standards may be disqualified or have emissions removed, even after prior approval.

**_Teams at risk of being delisted will be directly contacted._**

## Submission Deadlines

**All proposals for each new batch must be submitted by:**

**🕛 Wednesday 11:59 PM EST every week**

Proposals received after this deadline will be reviewed in the **next batch.**

## References

- [Governance Phase One Details](https://hub.forum.berachain.com/t/governance-phase-one-is-here/30)
