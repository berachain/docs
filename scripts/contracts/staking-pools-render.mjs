import { berascanUrl, contractCard, hasAnyDeployment } from "./contract-render-utils.mjs";

export function renderStakingPoolsSnippet(contracts) {
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
