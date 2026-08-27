import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../..");
const contributingPath = path.join(repoRoot, "CONTRIBUTING.md");

test("TP-12: CONTRIBUTING.md lists nodes/staking-pools/contracts.mdx as generated", () => {
  const text = fs.readFileSync(contributingPath, "utf8");
  assert.match(text, /nodes\/staking-pools\/contracts\.mdx/);
  assert.match(text, /must not|Do not manually edit generated/i);
});
