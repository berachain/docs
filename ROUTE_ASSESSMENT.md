# Route assessment: old docs → new Mintlify docs

This document summarizes the review of routes from the old docs (old docs `DOCS_ROUTES.md`) against the new Mintlify documentation.

## Summary

- **Redirects added:** All old Core, BEX, and Bend routes that have a clear equivalent in the new docs now have permanent redirects in `docs.json`.
- **Page migrated:** Reward Vault Guidelines (old `/learn/help/reward-vault-guidelines`) was missing as dedicated content; it has been migrated to `/general/help/reward-vault-guidelines` and linked from [Reward Vaults](/general/proof-of-liquidity/reward-vaults) and [Reward Vault Governance](/general/governance/reward-vault-governance).
- **Routes with no dedicated new page:** Redirects point to the closest existing page (e.g. FAQs, overview, or deployed contracts).

## 1. Do we have this page?

| Old route (Core) | New route / action |
|------------------|---------------------|
| `/`, `/learn` | Yes → `/`, `/general/introduction/what-is-berachain` |
| `/learn/what-is-proof-of-liquidity`, `connect-to-berachain`, `how-to-get-bera` | Yes → `general/introduction/*` |
| `/learn/berachain-nfts` | No dedicated page → redirect to `/general/help/faqs` |
| `/learn/changelog` | No dedicated page → redirect to `/general/introduction/what-is-berachain` |
| `/learn/pol/*`, `/learn/governance/*` | Yes → `general/proof-of-liquidity/*`, `general/governance/*` |
| `/learn/guides/*` | Yes → `validators/guides/*` or `general/*` as appropriate |
| `/learn/dapps/*` | No dedicated dApp pages → redirect to BEX overview, connect, or intro |
| `/learn/using-safe-wallet` | No dedicated page → redirect to `/general/help/faqs` |
| `/learn/help/*` | Yes; **reward-vault-guidelines** migrated to `general/help/reward-vault-guidelines` |
| `/developers/*` | Yes → `build/getting-started/*`, `build/guides/*` |
| `/developers/contracts/*` | Consolidated → redirect to `/build/getting-started/deployed-contracts` |
| `/nodes/*` | Yes → `validators/*` |
| `/beacon-kit/*` | Yes → `validators/beaconkit/overview` |

BEX and Bend old routes (from their respective apps) are redirected to the unified paths under `/bex/*`, `/build/bex/*`, `/bend/*`, and `/build/bend/*` as applicable.

## 2. Route differences and redirects

All assessed routes that differ from the new structure have a **permanent redirect** in `docs.json`. Examples:

- `/learn` → `/general/introduction/what-is-berachain`
- `/learn/pol/blockrewards` → `/general/proof-of-liquidity/block-rewards`
- `/developers/quickstart` → `/build/getting-started/overview`
- `/developers/contracts/beacondeposit` (and other contract refs) → `/build/getting-started/deployed-contracts`
- `/nodes` → `/validators/overview/index`
- `/nodes/self-hosted` → `/validators/operations/self-hosted-rpc`
- BEX: `/learn/concepts/pools` → `/bex/learn/pools`, `/developers/sdk` → `/build/bex/sdk/overview`, etc.
- Bend: `/learn/concepts/market` → `/bend/learn/market`, `/developers/onchain/bundlers` → `/build/bend/onchain-bundlers`, etc.

Conflict note: Old BEX and Bend both had `/learn/concepts/vault`. Only one redirect is possible on a single domain; **`/learn/concepts/vault` redirects to `/bex/learn/vault`**. Users from the old Bend site would have used that path on the Bend subdomain; on the unified site, Bend vault content lives at `/bend/learn/vault`.

## 3. Migrated content and standards

### Reward Vault Guidelines

- **Source:** Old Core `learn/help/reward-vault-guidelines.md`
- **New location:** `general/help/reward-vault-guidelines.mdx`
- **Changes applied:**
  - Mintlify frontmatter (`title`, `description`)
  - Sentence case and clear headings; no emoji (per project rules)
  - Internal links updated to new paths (e.g. Reward Vault Governance)
  - Submission forms and process linked to [Reward Vault Governance](/general/governance/reward-vault-governance) to avoid duplicate URLs
  - Second person and active voice; concise, scannable structure
- **Images:** None in the original; no asset migration needed.
- **Navigation:** Added under General → Help in `docs.json`.
- **Redirect:** `/learn/help/reward-vault-guidelines` → `/general/help/reward-vault-guidelines` (permanent).
- **Cross-links:** [Reward Vaults](/general/proof-of-liquidity/reward-vaults) and governance page now link to this guide.

### Optional future migrations

- **Berachain NFTs** (`/learn/berachain-nfts`): Short overview of official NFT collections; currently redirects to FAQs. Could be migrated to e.g. `general/introduction/berachain-nfts.mdx` if you want a dedicated page.
- **Changelog** (`/learn/changelog`): BRIP/release history; currently redirects to intro. Could be a dedicated changelog page or left as redirect if maintained elsewhere (e.g. BRIPs repo).
- **Using Safe Wallet** (`/learn/using-safe-wallet`): Safe{Wallet} usage; currently redirects to FAQs. Could be a short guide under Build or General if desired.

## 4. Images and asset strategy

- **Existing convention:** Images live under `/images/` with subfolders by section, e.g.:
  - `/images/general/` (e.g. `proof-of-liquidity-steps.png`, `pol-stakeholders-overview.png`)
  - `/images/bex/` (e.g. `bex-swaps-modal-route.png`, `bex-all-pools-overview.png`)
  - `/images/validators/` (e.g. `berachain-change-validator-commission-rate-process.png`)
  - `/images/bend/` (e.g. `interest-rates-irm-01.png`)
  - `/images/tokens/` (e.g. `bera-inflation.png`)
- **Naming:** Lowercase, hyphenated, descriptive (e.g. `emission-scale-bgt-delegation-chart.png`).
- **Usage in MDX:** Wrapped in `<Frame>` when appropriate; alt text is descriptive.
- **Migrated pages:** Reward Vault Guidelines had no images; no new assets were added.

For any future migration from the old VitePress repo, copy images into the correct `/images/<section>/` folder, use the naming above, and reference them as `/images/<section>/<filename>` in MDX.

## 5. Mintlify writing standards

Migrated and new content follows:

- **`.cursor/rules.md`** (Mintlify technical writing): second person, active voice, present tense, clear headings, Steps/Tabs/CodeGroup/callouts as needed, frontmatter on every page.
- **`.cursor/rules`** (project): no emoji; reference `berachain-docs` submodule and style guide when adapting VitePress content.
- **STRUCTURE.md:** kebab-case file names, logical grouping under General/Build/BEX/Bend/Nodes.

All new or touched MDX has been checked for these conventions.
