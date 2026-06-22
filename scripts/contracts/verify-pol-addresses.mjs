#!/usr/bin/env node

/**
 * POLAddresses.sol ↔ data/contracts.json verifier
 *
 * Inputs (defaults relative to docs repo):
 *   ../contracts-internal/script/pol/POLAddresses.sol
 *   data/contracts.json
 *   data/pol-addresses-mapping.json
 *
 * Networks: mainnet + bepolia only (_getMainnetPOLAddresses / _getTestnetPOLAddresses).
 *
 * ── Four layers (field names must match exactly, e.g. oogaBooga) ──
 *
 *   1. struct POLAddresses { address foo; … }     — canonical field list
 *   2. return POLAddresses({ foo: 0x…, … })       — per-network addresses
 *   3. pol-addresses-mapping.json entries         — published + contractsPath
 *   4. contracts.json                             — drives docs site: used in make contracts-generate
 *
 * Walk order: struct fields × networks → classify via mapping vs contracts.json.
 * Orphan literals (in layer 2 but not layer 1) → publish_undecided.
 * Mapping rows with no struct field → stale_mapping_field (not_ok, no network).
 *
 * ── Rollup statuses (human report) ──
 *
 *   ok              Published proxy; POL address matches contracts.json for that network.
 *   not_ok          Action needed — see detailStatus on each row (rollup of below).
 *   not_published   mapping says published:false. Determination to not publish something.
 * 
 * ── not_ok detail statuses (summary lists only non-zero counts) ──
 *
 *   address_changed
 *     published:true and contractsPath set; POL ≠ contracts.json for that network.
 *     Example: update dedicatedEmissionStreamManager address
 *
 *   missing_in_contracts_json
 *     published:true but contracts.json has no row at contractsPath, or network address empty.
 *     Example: decided you wanted to publish something, but forgot to update docs
 *
 *   publish_undecided
 *     Mapping/struct incomplete — decide published true (+ contractsPath + json) or false.
 *     Triggers:
 *       - struct field with no mapping entry
 *       - mapping missing published boolean, or published:true without contractsPath
 *       - literal in network function not declared on struct (orphan)
 *     Example: oogaBooga in literals only; or struct+literals without mapping row.
 *
 *   stale_mapping_field (mapping_errors → not_ok, polNetwork null)
 *   missing_pol_literal (mapping_errors → not_ok)
 *     these suggest errors in POLAddresses.sol
 *
 * ── Exit code ──
 *
 *   0  not_ok === 0 (ok + not_published only)
 *   1  any not_ok row 
 *
 * ── Typical fix loop ──
 *
 *   address_changed / missing_in_contracts_json → edit contracts.json → make contracts-generate
 *   publish_undecided / stale_mapping_field     → fix struct, literals, mapping together
 *   not_published                               → no docs change (unless you flip published)
 */

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");

const STATUS = {
  OK: "ok",
  NOT_OK: "not_ok",
  ADDRESS_CHANGED: "address_changed",
  MISSING_IN_CONTRACTS_JSON: "missing_in_contracts_json",
  NOT_PUBLISHED: "not_published",
  PUBLISH_UNDECIDED: "publish_undecided"
};

const NOT_OK_DETAIL_STATUSES = [
  STATUS.ADDRESS_CHANGED,
  STATUS.MISSING_IN_CONTRACTS_JSON,
  STATUS.PUBLISH_UNDECIDED
];

function printHelp() {
  console.log(`Usage: node scripts/contracts/verify-pol-addresses.mjs [options]

Compare POLAddresses.sol (mainnet + bepolia) to contracts.json via pol-addresses-mapping.json.
See file header for status taxonomy (ok / not_ok / not_published and detail types).

Options:
  --pol-path <path>         POLAddresses.sol (default: ../contracts-internal/...)
  --contracts-path <path>   contracts.json (default: data/contracts.json)
  --mapping-path <path>     pol-addresses-mapping.json
  --json                    Machine-readable report
  --summary                 Summary line only (ok / not_ok); exit 1 if not_ok > 0
  --list-not-ok             List not_ok rows only; exit 1 if not_ok > 0
  -h, --help                Show this help

Exit 1 when not_ok > 0 (address_changed, missing_in_contracts_json, publish_undecided,
mapping/parse errors, orphan literals not on struct POLAddresses).
`);
}

function parseArgs(argv) {
  const args = {
    json: false,
    summary: false,
    listNotOk: false,
    polPath: null,
    contractsPath: null,
    mappingPath: null,
    help: false
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--json") args.json = true;
    else if (arg === "--summary") args.summary = true;
    else if (arg === "--list-not-ok") args.listNotOk = true;
    else if (arg === "--help" || arg === "-h") args.help = true;
    else if (arg === "--pol-path") args.polPath = argv[++i];
    else if (arg === "--contracts-path") args.contractsPath = argv[++i];
    else if (arg === "--mapping-path") args.mappingPath = argv[++i];
    else {
      console.error(`Unknown argument: ${arg}`);
      console.error("Run with --help for usage.");
      process.exit(2);
    }
  }

  return args;
}

function readJson(absPath) {
  return JSON.parse(fs.readFileSync(absPath, "utf8"));
}

function getByPath(root, dottedPath) {
  let cur = root;
  for (const part of dottedPath.split(".")) {
    if (cur == null) return undefined;
    cur = cur[part];
  }
  return cur;
}

function normalizeAddress(address) {
  if (!address) return "";
  return address.toLowerCase();
}

function checksumHint(address) {
  return address ?? "(missing)";
}

function parsePolStructFields(content) {
  const structMatch = content.match(/struct POLAddresses\s*\{([^}]+)\}/s);
  if (!structMatch) {
    throw new Error("Could not find struct POLAddresses in POLAddresses.sol");
  }
  return [...structMatch[1].matchAll(/address\s+(\w+);/g)].map((m) => m[1]);
}

function parseNetworkAddresses(content, functionName) {
  const marker = `function ${functionName}`;
  const start = content.indexOf(marker);
  if (start === -1) {
    throw new Error(`Could not find function ${functionName} in POLAddresses.sol`);
  }

  const returnIdx = content.indexOf("return POLAddresses({", start);
  if (returnIdx === -1) {
    throw new Error(`Could not find return POLAddresses({ in ${functionName}`);
  }

  const openBrace = content.indexOf("{", returnIdx);
  let depth = 0;
  let closeBrace = -1;
  for (let i = openBrace; i < content.length; i += 1) {
    const ch = content[i];
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) {
        closeBrace = i;
        break;
      }
    }
  }

  if (closeBrace === -1) {
    throw new Error(`Could not parse brace block for ${functionName}`);
  }

  const block = content.slice(openBrace + 1, closeBrace);
  const addresses = {};
  for (const match of block.matchAll(/(\w+):\s*(0x[a-fA-F0-9]{40})/g)) {
    addresses[match[1]] = match[2];
  }
  return addresses;
}

function parsePolAddressesFile(absPath, mapping) {
  const content = fs.readFileSync(absPath, "utf8");
  const structFields = parsePolStructFields(content);
  const networks = {};

  for (const [polNetwork, functionName] of Object.entries(mapping.metadata.polFunctionNames)) {
    networks[polNetwork] = parseNetworkAddresses(content, functionName);
  }

  return { structFields, networks };
}

function classifyPolField(polField, entry, polNetwork, docsNetwork, polAddress, contracts) {
  if (!entry) {
    return {
      status: STATUS.PUBLISH_UNDECIDED,
      message: "No mapping entry — add to pol-addresses-mapping.json; set published true (with contractsPath) or false."
    };
  }

  if (typeof entry.published !== "boolean") {
    return {
      status: STATUS.PUBLISH_UNDECIDED,
      message: "Mapping entry missing published boolean — decide whether this address appears on deployed-contracts."
    };
  }

  if (!entry.published) {
    return {
      status: STATUS.NOT_PUBLISHED,
      message: entry.note ?? "Marked not_published in mapping."
    };
  }

  if (!entry.contractsPath) {
    return {
      status: STATUS.PUBLISH_UNDECIDED,
      message: "published is true but contractsPath is missing — set the contracts.json home path."
    };
  }

  const contractsEntry = getByPath(contracts, entry.contractsPath);
  if (!contractsEntry) {
    return {
      status: STATUS.MISSING_IN_CONTRACTS_JSON,
      message: `contracts.json has no entry at ${entry.contractsPath}`
    };
  }

  const docsAddress = contractsEntry?.address?.[docsNetwork] ?? "";
  if (!docsAddress) {
    return {
      status: STATUS.MISSING_IN_CONTRACTS_JSON,
      message: `${entry.contractsPath} has no ${docsNetwork} address`
    };
  }

  if (normalizeAddress(polAddress) !== normalizeAddress(docsAddress)) {
    return {
      status: STATUS.ADDRESS_CHANGED,
      message: `POLAddresses differs from contracts.json at ${entry.contractsPath}`
    };
  }

  return {
    status: STATUS.OK,
    message: `Matches contracts.json at ${entry.contractsPath}`
  };
}

function runVerification(options) {
  const mappingPath = options.mappingPath ?? path.join(repoRoot, "data/pol-addresses-mapping.json");
  const mapping = readJson(mappingPath);
  const contractsPath = options.contractsPath ?? path.join(repoRoot, "data/contracts.json");
  const polPath =
    options.polPath ??
    path.resolve(
      repoRoot,
      "..",
      "contracts-internal",
      mapping.metadata?.polAddressesRelativePath ?? "script/pol/POLAddresses.sol"
    );
  const contracts = readJson(contractsPath);

  if (!fs.existsSync(polPath)) {
    throw new Error(`POLAddresses.sol not found at ${polPath}`);
  }

  const pol = parsePolAddressesFile(polPath, mapping);
  const mappingByField = new Map(mapping.entries.map((e) => [e.polField, e]));
  const structFieldSet = new Set(pol.structFields);

  const report = {
    paths: { polPath, contractsPath, mappingPath },
    summary: {
      ok: 0,
      not_ok: 0,
      address_changed: 0,
      missing_in_contracts_json: 0,
      not_published: 0,
      publish_undecided: 0,
      mapping_errors: 0
    },
    byStatus: {
      ok: [],
      not_ok: [],
      address_changed: [],
      missing_in_contracts_json: [],
      not_published: [],
      publish_undecided: []
    },
    mappingErrors: [],
    contractsWithoutPolSource: mapping.contractsWithoutPolSource ?? [],
    entries: []
  };

  for (const entry of mapping.entries) {
    if (!structFieldSet.has(entry.polField)) {
      report.mappingErrors.push({
        kind: "stale_mapping_field",
        polField: entry.polField,
        message: "Mapping entry is not present in POLAddresses struct"
      });
    }
  }

  // Literals in network functions that are not declared on struct POLAddresses.
  for (const [polNetwork, addresses] of Object.entries(pol.networks)) {
    const functionName = mapping.metadata.polFunctionNames[polNetwork];
    const docsNetwork = mapping.metadata.polNetworks[polNetwork];
    for (const [field, polAddress] of Object.entries(addresses)) {
      if (!structFieldSet.has(field)) {
        const row = {
          polField: field,
          polNetwork,
          docsNetwork,
          polAddress,
          status: STATUS.PUBLISH_UNDECIDED,
          message: `Literal in ${functionName} is not on struct POLAddresses — add to struct, literals, and mapping; then set published true or false`,
          kind: null,
          published: null,
          contractsPath: null,
          docsAddress: ""
        };
        report.entries.push(row);
        report.byStatus.publish_undecided.push(row);
        report.summary.publish_undecided += 1;
      }
    }
  }

  for (const polField of pol.structFields) {
    const entry = mappingByField.get(polField);

    for (const [polNetwork, docsNetwork] of Object.entries(mapping.metadata.polNetworks)) {
      const polAddress = pol.networks[polNetwork]?.[polField];
      if (!polAddress) {
        report.mappingErrors.push({
          kind: "missing_pol_literal",
          polField,
          polNetwork,
          message: `Struct field ${polField} has no address in ${mapping.metadata.polFunctionNames[polNetwork]}`
        });
        continue;
      }

      const { status, message } = classifyPolField(polField, entry, polNetwork, docsNetwork, polAddress, contracts);
      const row = {
        polField,
        polNetwork,
        docsNetwork,
        polAddress,
        status,
        message,
        kind: entry?.kind ?? null,
        published: entry?.published ?? null,
        contractsPath: entry?.contractsPath ?? null,
        docsAddress:
          entry?.published && entry?.contractsPath
            ? (getByPath(contracts, entry.contractsPath)?.address?.[docsNetwork] ?? "")
            : ""
      };

      report.entries.push(row);
      report.byStatus[status].push(row);
      report.summary[status] += 1;
    }
  }

  report.summary.mapping_errors = report.mappingErrors.length;
  finalizeNotOk(report, mapping.metadata.polNetworks);

  const fail = report.summary.not_ok > 0;

  return { report, fail };
}

function finalizeNotOk(report, polNetworks) {
  report.byStatus.not_ok = [];

  for (const detailStatus of NOT_OK_DETAIL_STATUSES) {
    for (const row of report.byStatus[detailStatus]) {
      report.byStatus.not_ok.push({ ...row, detailStatus });
    }
  }

  for (const err of report.mappingErrors) {
    report.byStatus.not_ok.push({
      polField: err.polField ?? null,
      polNetwork: err.polNetwork ?? null,
      docsNetwork: err.polNetwork ? polNetworks[err.polNetwork] : null,
      polAddress: err.polAddress ?? null,
      status: STATUS.NOT_OK,
      detailStatus: err.kind,
      message: err.message,
      kind: null,
      published: null,
      contractsPath: null,
      docsAddress: ""
    });
  }

  report.summary.not_ok = report.byStatus.not_ok.length;
}

function printHumanReport(report) {
  const hr = "─".repeat(72);
  console.log("POLAddresses ↔ contracts.json verification");
  console.log(hr);
  console.log(`POLAddresses: ${report.paths.polPath}`);
  console.log(`contracts.json: ${report.paths.contractsPath}`);
  console.log(`mapping: ${report.paths.mappingPath}`);
  console.log(hr);

  const notOk = report.byStatus.not_ok;
  console.log(`\n## Not ok (${notOk.length})\n${notOk.length ? "" : "None."}`);
  for (const r of notOk) {
    const net = r.polNetwork ? ` [${r.polNetwork}]` : "";
    const addr = r.polAddress ? ` POL=${checksumHint(r.polAddress)}` : "";
    const docs =
      r.docsAddress && r.detailStatus === STATUS.ADDRESS_CHANGED
        ? ` docs=${checksumHint(r.docsAddress)}`
        : "";
    const home = r.contractsPath ? ` home=${r.contractsPath}` : "";
    console.log(`- ${r.polField ?? "?"}${net} (${r.detailStatus})${home}${addr}${docs} — ${r.message}`);
  }

  const notPublished = report.byStatus.not_published;
  console.log(`\n## Not published (${notPublished.length})\n${notPublished.length ? "" : "None."}`);
  for (const r of notPublished) {
    console.log(`- ${r.polField} [${r.polNetwork}] POL=${checksumHint(r.polAddress)} kind=${r.kind}`);
  }

  if (report.byStatus.ok.length) {
    console.log(`\n## Ok (${report.byStatus.ok.length})\n`);
    for (const r of report.byStatus.ok) {
      console.log(`- ${r.polField} [${r.polNetwork}] ${r.contractsPath}`);
    }
  }

  if (report.contractsWithoutPolSource.length) {
    console.log("\n## contracts.json without POLAddresses source\n");
    for (const item of report.contractsWithoutPolSource) {
      console.log(`- ${item.contractsPath}: ${item.note}`);
    }
  }

  console.log("\n## Summary");
  console.log(formatSummaryLine(report.summary));
}

function formatSummaryLine(summary) {
  const head = `ok=${summary.ok} not_ok=${summary.not_ok} not_published=${summary.not_published}`;
  const detailParts = [
    ["address_changed", summary.address_changed],
    ["missing_in_contracts_json", summary.missing_in_contracts_json],
    ["publish_undecided", summary.publish_undecided],
    ["mapping_errors", summary.mapping_errors]
  ]
    .filter(([, count]) => count > 0)
    .map(([key, count]) => `${key}=${count}`);

  if (!detailParts.length) return head;
  return `${head} (detail: ${detailParts.join(" ")})`;
}

function formatNotOkRow(r) {
  const net = r.polNetwork ? ` [${r.polNetwork}]` : "";
  const addr = r.polAddress ? ` POL=${checksumHint(r.polAddress)}` : "";
  const docs =
    r.docsAddress && r.detailStatus === STATUS.ADDRESS_CHANGED
      ? ` docs=${checksumHint(r.docsAddress)}`
      : "";
  const home = r.contractsPath ? ` home=${r.contractsPath}` : "";
  return `- ${r.polField ?? "?"}${net} (${r.detailStatus})${home}${addr}${docs} — ${r.message}`;
}

function printNotOkList(report) {
  const rows = report.byStatus.not_ok;
  if (!rows.length) {
    console.log("No not_ok rows.");
    return;
  }
  for (const row of rows) console.log(formatNotOkRow(row));
}

const args = parseArgs(process.argv);
if (args.help) {
  printHelp();
  process.exit(0);
}

const mappingPath = args.mappingPath ?? path.join(repoRoot, "data/pol-addresses-mapping.json");
const mappingForDefaultPol = readJson(mappingPath);
const defaultPolPath =
  args.polPath ??
  path.resolve(repoRoot, "..", "contracts-internal", mappingForDefaultPol.metadata.polAddressesRelativePath);

const { report, fail } = runVerification({
  polPath: defaultPolPath,
  contractsPath: args.contractsPath ?? path.join(repoRoot, "data/contracts.json"),
  mappingPath
});

if (args.json) {
  console.log(JSON.stringify(report, null, 2));
} else if (args.summary) {
  console.log(formatSummaryLine(report.summary));
} else if (args.listNotOk) {
  printNotOkList(report);
} else {
  printHumanReport(report);
}

if (fail) {
  if (!args.json && !args.summary && !args.listNotOk) console.error("\nVerification failed.");
  process.exit(1);
}

if (!args.json && !args.summary && !args.listNotOk) console.log("\nVerification passed.");
