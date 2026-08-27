const missingValue = "🤓";

export function addressFor(item, network) {
  return item?.address?.[network] ?? "";
}

export function hasAnyDeployment(items, network) {
  return items.some((item) => Boolean(addressFor(item, network)));
}

export function linkFor(item, key, network) {
  const value = item?.[key];
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[network] ?? "";
}

export function berascanUrl(address, network) {
  if (!address) return "";
  const host = network === "berachainBepolia" ? "https://testnet.berascan.com" : "https://berascan.com";
  return `${host}/address/${address}`;
}

export function resourceLinks(item, network, abiLabel = "ABI") {
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

export function contractCard(item, network, abiLabel = "ABI") {
  const address = addressFor(item, network);
  if (!address) return "";
  return `<Card title="${item.name}">

${codeBlock(address)}

${resourceLinks(item, network, abiLabel)}

</Card>`;
}
