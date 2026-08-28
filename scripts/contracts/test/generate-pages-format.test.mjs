import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");

const generatedOutputs = [
  "snippets/contracts/generated/core-contracts-table.mdx",
  "snippets/contracts/generated/bex-contracts-table.mdx",
  "snippets/contracts/generated/bend-contracts-table.mdx",
  "snippets/contracts/generated/bend-markets-table.mdx",
  "snippets/contracts/generated/staking-pools-singletons-table.mdx",
  "build/getting-started/deployed-contracts.mdx",
  "build/bex/deployed-contracts.mdx",
  "build/bend/deployed-contracts.mdx",
  "build/bend/deployed-markets.mdx",
  "nodes/staking-pools/contracts.mdx",
];

test("TP-14: prettier --check passes on every generator-written file", () => {
  const result = spawnSync("npx", ["prettier", "--check", ...generatedOutputs], {
    cwd: repoRoot,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
});

test("TP-14: generate-pages.mjs has no noTrailingNewlineOutputs exemption", () => {
  const src = fs.readFileSync(path.join(repoRoot, "scripts/contracts/generate-pages.mjs"), "utf8");
  assert.doesNotMatch(src, /noTrailingNewlineOutputs/);
});
