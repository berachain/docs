#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const contracts = JSON.parse(fs.readFileSync(path.join(repoRoot, "data/contracts.json"), "utf8"));
const generatedSnippetDir = "snippets/contracts/generated";
const checkMode = process.argv.includes("--check");
const missingValue = "🤓";
let changedCount = 0;
let wroteCount = 0;
let unchangedCount = 0;

function write(relPath, content) {
  const abs = path.join(repoRoot, relPath);
  const next = `${content.trimEnd()}\n`;
  const prev = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
  if (prev === next) {
    unchangedCount += 1;
    if (!checkMode) {
      console.log(`Unchanged ${relPath}`);
    }
    return;
  }

  changedCount += 1;
  if (checkMode) {
    console.log(`Would generate ${relPath}`);
    return;
  }

  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, next);
  wroteCount += 1;
  console.log(`Generated ${relPath}`);
}

function berascanLink(address, network) {
  if (!address) return missingValue;
  const host = network === "berachainBepolia" ? "https://testnet.berascan.com" : "https://berascan.com";
  return `[\`${address}\`](${host}/address/${address})`;
}

function addressFor(item, network) {
  return item?.address?.[network] ?? "";
}

function hasAnyDeployment(items, network) {
  return items.some((item) => Boolean(addressFor(item, network)));
}

function linkFor(item, key, network) {
  const value = item?.[key];
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[network] ?? "";
}

function linkCell(item, key, network, label) {
  const href = linkFor(item, key, network);
  return href ? `[${label}](${href})` : missingValue;
}

function resourcesCell(item, network, abiLabel = "ABI") {
  const resources = [
    ["abi", abiLabel],
    ["source", "Source"],
    ["reference", "Reference"]
  ]
    .map(([key, label]) => {
      const href = linkFor(item, key, network);
      return href ? `[${label}](${href})` : "";
    })
    .filter(Boolean);

  return resources.length ? resources.join(" · ") : missingValue;
}

function berascanUrl(address, network) {
  if (!address) return "";
  const host = network === "berachainBepolia" ? "https://testnet.berascan.com" : "https://berascan.com";
  return `${host}/address/${address}`;
}

function resourceLinks(item, network, abiLabel = "ABI") {
  const address = addressFor(item, network);
  const links = [
    address ? `[Berascan](${berascanUrl(address, network)})` : "",
    linkFor(item, "abi", network) ? `[${abiLabel}](${linkFor(item, "abi", network)})` : "",
    linkFor(item, "source", network) ? `[Source](${linkFor(item, "source", network)})` : "",
    linkFor(item, "reference", network) ? `[Reference](${linkFor(item, "reference", network)})` : ""
  ].filter(Boolean);

  return links.length ? links.join(" · ") : missingValue;
}

function codeBlock(value) {
  return `\`\`\`text
${value}
\`\`\``;
}

function contractCard(item, network, abiLabel = "ABI") {
  const address = addressFor(item, network);
  if (!address) return "";
  return `<Card title="${item.name}">

${codeBlock(address)}

${resourceLinks(item, network, abiLabel)}

</Card>`;
}

function renderCardCategory(title, items, network, abiLabel = "ABI") {
  const cards = items.map((item) => contractCard(item, network, abiLabel)).filter(Boolean);
  if (!cards.length) return "";
  return `### ${title}

<CardGroup cols={2}>
${cards.join("\n")}
</CardGroup>`;
}

function contractCell(item, network, boldName = false) {
  const address = berascanLink(addressFor(item, network), network);
  const name = boldName ? `**${item.name}**` : item.name;
  return `${name}<br />${address}`;
}

function networkRow(item, network, options = {}) {
  const {
    includeAbi = false,
    includeSource = false,
    includeResources = false,
    combineNameAddress = false,
    boldName = false,
    abiLabel = "ABI"
  } = options;
  const columns = combineNameAddress
    ? [contractCell(item, network, boldName)]
    : [boldName ? `**${item.name}**` : item.name, berascanLink(addressFor(item, network), network)];
  if (includeResources) columns.push(resourcesCell(item, network, abiLabel));
  if (includeAbi) columns.push(linkCell(item, "abi", network, abiLabel));
  if (includeSource) columns.push(linkCell(item, "source", network, "Source"));
  return `| ${columns.join(" | ")} |`;
}

function renderAddressCategory(title, items, network, options = {}) {
  if (!hasAnyDeployment(items, network)) return "";
  const rows = items.map((item) => networkRow(item, network, options)).join("\n");
  const header = options.combineNameAddress ? ["Contract"] : ["Name", "Address"];
  if (options.includeResources) header.push("Resources");
  if (options.includeAbi) header.push("ABI");
  if (options.includeSource) header.push("Source");
  return `### ${title}

| ${header.join(" | ")} |
| ${header.map(() => "---").join(" | ")} |
${rows}`;
}

function renderAbiCategory(title, items, network, boldName = false) {
  if (!hasAnyDeployment(items, network)) return "";
  void boldName;
  const cards = items.map((item) => contractCard(item, network)).filter(Boolean);
  return `### ${title}

<CardGroup cols={2}>
${cards.join("\n")}
</CardGroup>`;
}

function renderGettingStartedSnippet() {
  const polItems = Object.values(contracts.pol);
  const tokenItems = Object.values(contracts.tokens);
  const governanceItems = Object.values(contracts.governance ?? {});
  const otherItems = Object.values(contracts.other);
  const stakingPoolItems = Object.values(contracts.stakingPools);
  const linkedColumns = { combineNameAddress: true, includeResources: true };
  const mainSections = [
    renderAddressCategory("Proof of Liquidity", polItems, "berachainMainnet", linkedColumns),
    renderAddressCategory("Tokens", tokenItems, "berachainMainnet", linkedColumns),
    renderAddressCategory("Governance", governanceItems, "berachainMainnet", linkedColumns),
    renderAddressCategory("Staking pools", stakingPoolItems, "berachainMainnet", {
      ...linkedColumns,
      abiLabel: "ABI JSON"
    }),
    renderAddressCategory("Other", otherItems, "berachainMainnet", linkedColumns)
  ]
    .filter(Boolean)
    .join("\n\n");
  const bepSections = [
    renderAddressCategory("Proof of Liquidity", polItems, "berachainBepolia", linkedColumns),
    renderAddressCategory("Tokens", tokenItems, "berachainBepolia", linkedColumns),
    renderAddressCategory("Governance", governanceItems, "berachainBepolia", linkedColumns),
    renderAddressCategory("Staking pools", stakingPoolItems, "berachainBepolia", {
      ...linkedColumns,
      abiLabel: "ABI JSON"
    }),
    renderAddressCategory("Other", otherItems, "berachainBepolia", linkedColumns)
  ]
    .filter(Boolean)
    .join("\n\n");

  const nftRows = Object.values(contracts.nfts)
    .map((item) => `| ${item.name} | \`${item.address.ethereumMainnet}\` | \`${item.address.berachainMainnet}\` |`)
    .join("\n");

  const nftSection = `### NFT contracts

Berachain NFT contract addresses on both Ethereum (via LayerZero adapters) and Berachain mainnet.

| Collection | Ethereum Adapter | Berachain Address |
|------------|------------------|-------------------|
${nftRows}`;

  return `## Mainnet contracts

${mainSections}

${nftSection}${bepSections ? `\n\n## Bepolia testnet contracts\n\n${bepSections}` : ""}
`;
}

function renderBexSnippet() {
  const items = Object.values(contracts.bex);
  const mainSection = hasAnyDeployment(items, "berachainMainnet")
    ? `## Mainnet contracts

<CardGroup cols={2}>
${items
  .map((item) => contractCard(item, "berachainMainnet"))
  .filter(Boolean)
  .join("\n")}
</CardGroup>`
    : "";
  const bepSection = hasAnyDeployment(items, "berachainBepolia")
    ? `## Bepolia testnet contracts

<CardGroup cols={2}>
${items
  .map((item) => contractCard(item, "berachainBepolia"))
  .filter(Boolean)
  .join("\n")}
</CardGroup>`
    : "";

  return [mainSection, bepSection].filter(Boolean).join("\n\n");
}

function renderBendContractsSnippet() {
  const bendCore = Object.entries(contracts.bend)
    .filter(([k]) => !["vaults", "marketIds"].includes(k))
    .map(([, v]) => v);
  const vaultItems = Object.values(contracts.bend.vaults);

  function renderBendNetworkSection(label, network) {
    const parts = [];
    const morpho = renderAbiCategory("Morpho", bendCore, network, true);
    if (morpho) parts.push(morpho);

    const vaults = renderAbiCategory("Vaults", vaultItems, network, true);
    if (vaults) {
      parts.push(`<Note>
More vaults may be deployed, please check [https://bend.berachain.com/lend](https://bend.berachain.com/lend) for the latest deployed vaults.
</Note>

${vaults}`);
    }

    if (!parts.length) return "";
    return `## ${label}

${parts.join("\n\n")}`;
  }

  return [
    renderBendNetworkSection("Mainnet contracts", "berachainMainnet"),
    renderBendNetworkSection("Bepolia testnet contracts", "berachainBepolia")
  ]
    .filter(Boolean)
    .join("\n\n");
}

function renderBendMarketsSnippet() {
  const rows = Object.values(contracts.bend.marketIds)
    .map((item) => `| **${item.name}** | \`${item.id}\` |`)
    .join("\n");
  return `| Market | ID |
| --- | --- |
${rows}
`;
}

function renderStakingPoolsSnippet() {
  const items = Object.values(contracts.stakingPools);
  const mainSection = hasAnyDeployment(items, "berachainMainnet")
    ? `#### Mainnet

<CardGroup cols={2}>
${items
  .map((item) => contractCard(item, "berachainMainnet", "ABI JSON"))
  .filter(Boolean)
  .join("\n")}
</CardGroup>`
    : "";
  const bepSection = hasAnyDeployment(items, "berachainBepolia")
    ? `#### Bepolia

<CardGroup cols={2}>
${items
  .map((item) => contractCard(item, "berachainBepolia", "ABI JSON"))
  .filter(Boolean)
  .join("\n")}
</CardGroup>`
    : "";

  return [mainSection, bepSection].filter(Boolean).join("\n\n");
}

function renderGettingStartedPage() {
  return `---
title: "Deployed Contract Addresses"
description: "Berachain core and staking-pool contract addresses by network."
---

import CoreContractsTable from "/snippets/contracts/generated/core-contracts-table.mdx";

For **BEX** (DEX) addresses, see [BEX deployed contracts](/build/bex/deployed-contracts). For **Bend** (lending) addresses, see [Bend deployed contracts](/build/bend/deployed-contracts).

All contracts are verified at the [block explorer](https://berascan.com).
* ABI files: [berachain/abis](https://github.com/berachain/abis).
* Core protocol: [berachain/contracts](https://github.com/berachain/contracts).

<Info>
All audit reports are publicly available on [Github](https://github.com/berachain/security-audits).
</Info>

<CoreContractsTable />
`;
}

function renderBexDeployedContractsPage() {
  return `---
title: "Deployed Contracts"
description: "Registry of deployed BEX contract addresses by network."
---

import BexContractsTable from "/snippets/contracts/generated/bex-contracts-table.mdx";

<Warning>
On January 21st, 2025, Balancer disclosed a long-standing vulnerability in their V2 Vault implementation. BEX incorporates contract logic from Balancer V2 and shares the same vulnerability. Exercise additional caution when creating new pools, particularly when including **untrusted or newly-created tokens**.

**Funds currently deposited in BEX are safe, and no action from LPs is needed.** The issue only potentially affects tokens that are not live on-chain today. Frontend warnings are displayed on BEX for potentially vulnerable tokens.

Future plans include integrating the Balancer V3 codebase, which mitigates this vulnerability and is cross-compatible with current BEX pools.

For more information, see the [Balancer disclosure](https://forum.balancer.fi/t/balancer-v2-token-frontrun-vulnerability-disclosure/6309).
</Warning>

The following is a list of contract addresses for interacting with Berachain BEX.

<BexContractsTable />
`;
}

function renderStakingPoolsPage() {
  return `---
title: "Staking Pool Contracts"
description: "Addresses and ABIs for StakingPoolContractsFactory, DelegationHandlerFactory, WithdrawalVault, and per-pool proxies (StakingPool, SmartOperator, etc.)."
---

import StakingPoolSingletonsTable from "/snippets/contracts/generated/staking-pools-singletons-table.mdx";

This reference provides contract addresses and links to detailed documentation for each contract in the staking pools system. For an overview of how the contracts work together, see the [Staking Pools Overview](/nodes/staking-pools/overview).

## Contract addresses

### Singleton contracts

Singleton contracts are deployed once and shared across all staking pools. The **StakingPoolContractsFactory** is the entry point for deploying a staking pool: you call it to create and register your pool's contracts. The **DelegationHandlerFactory** deploys per-validator delegation handler proxies when using foundation delegation. The other singletons below are shared infrastructure.

<StakingPoolSingletonsTable />

### Deployed contracts (per pool)

When you deploy a staking pool through the StakingPoolContractsFactory, the factory creates proxy contracts for your validator. These proxy contracts are what you and your stakers interact with directly. Each validator receives unique proxy addresses for these contracts when deploying their staking pool.

The factory returns these proxy addresses when you call \`deployStakingPoolContracts\`. Store these addresses for your operations and provide the StakingPool address to your stakers for deposits.

**Proxy contracts deployed with your pool:**

- **StakingPool**: Main staking functionality and staker interactions. This is the contract address your stakers use to deposit BERA and receive stBERA shares.
- **SmartOperator**: Validator operations and Proof of Liquidity integration.
- **IncentiveCollector**: Incentive token collection and conversion. Handles the incentive auction mechanism where accumulated tokens can be claimed.
- **StakingRewardsVault**: Reward collection and automatic reinvestment. Automatically compounds rewards from the consensus layer.
- **DelegationHandler**: Delegation handling for capital providers. Only deployed if you're using delegated funds from the Berachain Foundation.

For detailed technical documentation of each contract's functions and behavior, see the [Berachain guides repository](https://github.com/berachain/guides/tree/main/apps/staking-pools) and the [install-helpers README](https://github.com/berachain/guides/blob/main/apps/staking-pools/install-helpers/README.md).
`;
}

function renderBendContractsPage() {
  return `---
title: "Deployed Contracts"
description: "Bend smart contract addresses on Berachain; Morpho, IRM, oracles, URD, and related contracts."
---

import BendContractsTable from "/snippets/contracts/generated/bend-contracts-table.mdx";

Addresses for reading from or writing to Bend contracts.

<Note>
Deployed contracts have been audited by multiple parties. Reports are on [GitHub](https://github.com/berachain/security-audits).
</Note>

<BendContractsTable />
`;
}

function renderBendMarketsPage() {
  return `---
title: "Deployed Markets"
description: "Market IDs and parameters for deployed Bend lending markets on Berachain."
---

import BendMarketsTable from "/snippets/contracts/generated/bend-markets-table.mdx";

Market IDs deployed on Bend. For the latest whitelisted markets, see [bend.berachain.com/borrow](https://bend.berachain.com/borrow).

## Market IDs

<BendMarketsTable />

To find a market ID, open [bend.berachain.com/borrow](https://bend.berachain.com/borrow) and read the Market ID from the URL.

<Frame>
  <img src="/images/bend/deployed-markets-market-id.png" alt="Bend - How to find Market ID" />
</Frame>
`;
}

write(`${generatedSnippetDir}/core-contracts-table.mdx`, renderGettingStartedSnippet());
write(`${generatedSnippetDir}/bex-contracts-table.mdx`, renderBexSnippet());
write(`${generatedSnippetDir}/bend-contracts-table.mdx`, renderBendContractsSnippet());
write(`${generatedSnippetDir}/bend-markets-table.mdx`, renderBendMarketsSnippet());
write(`${generatedSnippetDir}/staking-pools-singletons-table.mdx`, renderStakingPoolsSnippet());

write("build/getting-started/deployed-contracts.mdx", renderGettingStartedPage());
write("build/bex/deployed-contracts.mdx", renderBexDeployedContractsPage());
write("build/bend/deployed-contracts.mdx", renderBendContractsPage());
write("build/bend/deployed-markets.mdx", renderBendMarketsPage());
write("nodes/staking-pools/contracts.mdx", renderStakingPoolsPage());

if (!checkMode) {
  console.log(`contracts-generate: wrote ${wroteCount} file(s), ${unchangedCount} unchanged.`);
}

if (checkMode) {
  if (changedCount > 0) {
    console.error(
      `Generated contract docs are stale (${changedCount} file(s) would change). Run node scripts/contracts/generate-pages.mjs and commit the outputs.`
    );
    process.exit(1);
  }
  console.log(`Generated contract docs are up to date (${unchangedCount} file(s) unchanged).`);
}
