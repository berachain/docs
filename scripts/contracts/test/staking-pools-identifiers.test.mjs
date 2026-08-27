import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { extractSolidityIdentifiers } from "../extract-solidity-identifiers.mjs";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const mdxDir = path.join(repoRoot, "nodes/staking-pools");
const contractsCheckout = "/Users/camembearbera/src/documentation/contracts-staking-pools";
const pinnedSha = "417554e";

function listSoliditySources(root) {
  const out = [];
  for (const rel of fs.readdirSync(root, { withFileTypes: true })) {
    const abs = path.join(root, rel.name);
    if (rel.isDirectory()) {
      out.push(...listSoliditySources(abs));
    } else if (rel.name.endsWith(".sol")) {
      out.push(abs);
    }
  }
  return out;
}

function buildIdentifierIndex(srcRoot) {
  const names = new Set();
  for (const file of listSoliditySources(srcRoot)) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(/\b(function|event|error|modifier)\s+([A-Za-z_][A-Za-z0-9_]*)\b/g)) {
      names.add(match[2]);
    }
    for (const match of text.matchAll(/\bconstant\s+([A-Z][A-Z0-9_]+)\b/g)) {
      names.add(match[1]);
    }
    for (const match of text.matchAll(/\b(?:onlyRole|_grantRole|_checkRole)\s*\(\s*([A-Z][A-Z0-9_]+)/g)) {
      names.add(match[1]);
    }
    for (const match of text.matchAll(
      /\b(?:bool|uint\d*|address|bytes32)\s+public\s+([A-Za-z_][A-Za-z0-9_]*)\b/g
    )) {
      names.add(match[1]);
    }
  }
  return names;
}

test("TP-9: cited staking-pools identifiers resolve in contracts-staking-pools src", () => {
  if (!fs.existsSync(contractsCheckout)) {
    console.log(
      `skip: contracts checkout missing at ${contractsCheckout}; AC-7 not attested by this run`
    );
    return;
  }

  let head = "";
  try {
    head = execSync("git rev-parse HEAD", { cwd: contractsCheckout, encoding: "utf8" }).trim();
  } catch {
    console.log(`skip: cannot read HEAD at ${contractsCheckout}; AC-7 not attested by this run`);
    return;
  }

  if (!head.startsWith(pinnedSha)) {
    console.log(
      `skip: contracts checkout at ${head}, need ${pinnedSha}; AC-7 not attested by this run`
    );
    return;
  }

  const index = buildIdentifierIndex(path.join(contractsCheckout, "src"));
  const missing = new Set();

  for (const name of fs.readdirSync(mdxDir)) {
    if (!name.endsWith(".mdx")) continue;
    const text = fs.readFileSync(path.join(mdxDir, name), "utf8");
    for (const id of extractSolidityIdentifiers(text)) {
      if (!index.has(id)) missing.add(id);
    }
  }

  assert.deepEqual(
    [...missing].sort(),
    [],
    `identifiers missing from contracts-staking-pools/src: ${[...missing].sort().join(", ")}`
  );
});
