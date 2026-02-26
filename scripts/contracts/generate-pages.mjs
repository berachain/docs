#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const contracts = JSON.parse(fs.readFileSync(path.join(repoRoot, "data/contracts.json"), "utf8"));
const generatedSnippetDir = "snippets/contracts/generated";
const checkMode = process.argv.includes("--check");
let changedCount = 0;

function write(relPath, content) {
  const abs = path.join(repoRoot, relPath);
  const next = `${content.trimEnd()}\n`;
  const prev = fs.existsSync(abs) ? fs.readFileSync(abs, "utf8") : null;
  if (prev === next) return;

  changedCount += 1;
  if (checkMode) {
    console.log(`Would generate ${relPath}`);
    return;
  }

  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, next);
  console.log(`Generated ${relPath}`);
}

function berascanLink(address, network) {
  if (!address) return "N/A";
  const host = network === "berachainBepolia" ? "https://testnet.berascan.com" : "https://berascan.com";
  return `[\`${address}\`](${host}/address/${address})`;
}

function addressFor(item, network) {
  return item?.address?.[network] ?? "";
}

function hasAnyDeployment(items, network) {
  return items.some((item) => Boolean(addressFor(item, network)));
}

function networkRow(item, network, includeAbi = false, boldName = false) {
  const address = berascanLink(addressFor(item, network), network);
  const name = boldName ? `**${item.name}**` : item.name;
  if (includeAbi) {
    const abi = item.abi ? `[ABI](${item.abi})` : "N/A";
    return `| ${name} | ${address} | ${abi} |`;
  }
  return `| ${name} | ${address} |`;
}

function renderAddressCategory(title, items, network) {
  if (!hasAnyDeployment(items, network)) return "";
  const rows = items.map((item) => networkRow(item, network)).join("\n");
  return `### ${title}

| Name | Address |
|------|---------|
${rows}`;
}

function renderAbiCategory(title, items, network, boldName = false) {
  if (!hasAnyDeployment(items, network)) return "";
  const rows = items.map((item) => networkRow(item, network, true, boldName)).join("\n");
  return `### ${title}

| Name | Address | ABI |
| --- | ------- | --- |
${rows}`;
}

function renderGettingStartedSnippet() {
  const polItems = Object.values(contracts.pol);
  const tokenItems = Object.values(contracts.tokens);
  const otherItems = Object.values(contracts.other);
  const mainSections = [
    renderAddressCategory("Proof of Liquidity", polItems, "berachainMainnet"),
    renderAddressCategory("Tokens", tokenItems, "berachainMainnet"),
    renderAddressCategory("Other", otherItems, "berachainMainnet")
  ]
    .filter(Boolean)
    .join("\n\n");
  const bepSections = [
    renderAddressCategory("Proof of Liquidity", polItems, "berachainBepolia"),
    renderAddressCategory("Tokens", tokenItems, "berachainBepolia"),
    renderAddressCategory("Other", otherItems, "berachainBepolia")
  ]
    .filter(Boolean)
    .join("\n\n");

  const nftRows = Object.values(contracts.nfts)
    .map((item) => `| ${item.name} | \`${item.address.ethereumMainnet}\` | \`${item.address.berachainMainnet}\` |`)
    .join("\n");

  return `## Mainnet contracts

${mainSections}${bepSections ? `\n\n## Bepolia testnet contracts\n\n${bepSections}` : ""}

### NFT contracts

Berachain NFT contract addresses on both Ethereum (via LayerZero adapters) and Berachain mainnet.

| Collection | Ethereum Adapter | Berachain Address |
|------------|------------------|-------------------|
${nftRows}
`;
}

function renderBexSnippet() {
  const items = Object.values(contracts.bex);
  const mainSection = hasAnyDeployment(items, "berachainMainnet")
    ? `## Mainnet contracts

| Name | Address | ABI |
| ---- | ------- | --- |
${items.map((item) => networkRow(item, "berachainMainnet", true)).join("\n")}`
    : "";
  const bepSection = hasAnyDeployment(items, "berachainBepolia")
    ? `## Bepolia testnet contracts

| Name | Address | ABI |
| ---- | ------- | --- |
${items.map((item) => networkRow(item, "berachainBepolia", true)).join("\n")}`
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

| Name | Address | ABI |
|------|---------|-----|
${items
  .map((item) => `| **${item.name}** | ${berascanLink(item.address.berachainMainnet, "berachainMainnet")} | [ABI JSON](${item.abi}) |`)
  .join("\n")}`
    : "";
  const bepSection = hasAnyDeployment(items, "berachainBepolia")
    ? `#### Bepolia

| Name | Address | ABI |
|------|---------|-----|
${items
  .map((item) => `| **${item.name}** | ${berascanLink(item.address.berachainBepolia, "berachainBepolia")} | [ABI JSON](${item.abi}) |`)
  .join("\n")}`
    : "";

  return [mainSection, bepSection].filter(Boolean).join("\n\n");
}

function renderGettingStartedPage() {
  return `---
title: "Deployed Contract Addresses"
description: "Berachain core contract addresses by network."
---

import CoreContractsTable from "/snippets/contracts/generated/core-contracts-table.mdx";

This is a list of addresses where you can read from or write to these contracts.

> A full list of Contract ABIs can be found at https://github.com/berachain/doc-abis

<Info>
Various parties have audited the deployed contracts.
All audit reports are publicly available on [Github](https://github.com/berachain/security-audits).
</Info>

<CoreContractsTable />
`;
}

function renderBexPage() {
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

<Tip>
A full list of contract ABIs can be found at [github.com/berachain/doc-abis](https://github.com/berachain/doc-abis).
</Tip>

<BexContractsTable />
`;
}

function renderBendContractsPage() {
  return `---
title: "Deployed Contracts"
description: "Bend smart contract addresses on Berachain; Morpho, IRM, oracles, URD, and related contracts."
---

import BendContractsTable from "/snippets/contracts/generated/bend-contracts-table.mdx";

Addresses for reading from or writing to Bend contracts. ABIs are in [berachain/doc-abis](https://github.com/berachain/doc-abis).

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

function renderStakingPoolsPage() {
  return `---
title: "Staking Pool Contracts"
description: "Addresses and ABIs for StakingPoolContractsFactory, WithdrawalVault, and per-pool proxies (StakingPool, SmartOperator, etc.)."
---

import StakingPoolSingletonsTable from "/snippets/contracts/generated/staking-pools-singletons-table.mdx";

This reference provides contract addresses and links to detailed documentation for each contract in the staking pools system. For an overview of how the contracts work together, see the [Staking Pools Overview](/validators/staking-pools/overview).

## Contract addresses

### Singleton contracts

Singleton contracts are deployed once and shared across all staking pools. The **StakingPoolContractsFactory** is the entry point for deploying a staking pool: you call it to create and register your pool's contracts. The other singletons below are shared infrastructure.

<StakingPoolSingletonsTable />

### Deployed contracts (per pool)

When you deploy a staking pool through the StakingPoolContractsFactory, the factory creates proxy contracts for your validator. These proxy contracts are what you and your stakers interact with directly. Each validator receives unique proxy addresses for these contracts when deploying their staking pool.

The factory returns these proxy addresses when you call \`deployStakingPoolContracts\`. Store these addresses for your operations and provide the StakingPool address to your stakers for deposits.

**Proxy contracts deployed with your pool:**

- **StakingPool**: Main staking functionality and staker interactions. This is the contract address your stakers use to deposit BERA and receive stBERA shares.
- **SmartOperator**: Validator operations and Proof of Liquidity integration. Use this contract to manage BGT operations, commission rates, reward allocations, and protocol fees.
- **IncentiveCollector**: Incentive token collection and conversion. Handles the incentive auction mechanism where accumulated tokens can be claimed.
- **StakingRewardsVault**: Reward collection and automatic reinvestment. Automatically compounds rewards from the consensus layer.
- **DelegationHandler**: Delegation handling for capital providers. Only deployed if you're using delegated funds from the Berachain Foundation.

For detailed technical documentation of each contract's functions and behavior, see the [Berachain guides repository](https://github.com/berachain/guides/tree/main/apps/staking-pools) and the [install-helpers README](https://github.com/berachain/guides/blob/main/apps/staking-pools/install-helpers/README.md).
`;
}

write(`${generatedSnippetDir}/core-contracts-table.mdx`, renderGettingStartedSnippet());
write(`${generatedSnippetDir}/bex-contracts-table.mdx`, renderBexSnippet());
write(`${generatedSnippetDir}/bend-contracts-table.mdx`, renderBendContractsSnippet());
write(`${generatedSnippetDir}/bend-markets-table.mdx`, renderBendMarketsSnippet());
write(`${generatedSnippetDir}/staking-pools-singletons-table.mdx`, renderStakingPoolsSnippet());

write("build/getting-started/deployed-contracts.mdx", renderGettingStartedPage());
write("build/bex/deployed-contracts.mdx", renderBexPage());
write("build/bend/deployed-contracts.mdx", renderBendContractsPage());
write("build/bend/deployed-markets.mdx", renderBendMarketsPage());
write("validators/staking-pools/contracts.mdx", renderStakingPoolsPage());

if (checkMode) {
  if (changedCount > 0) {
    console.error(
      `Generated contract docs are stale (${changedCount} file(s) would change). Run node scripts/contracts/generate-pages.mjs and commit the outputs.`
    );
    process.exit(1);
  }
  console.log("Generated contract docs are up to date.");
}
