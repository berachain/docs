# Contributing to Berachain Documentation

Thank you for considering contributing. This guide will help you get set up and submit changes.

For environment setup and local tooling commands, use [README.md](README.md). `CONTRIBUTING.md` focuses on contribution workflow and review expectations.

## Code of Conduct

Berachain has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct. We expect everyone to follow it. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Open Development

All work happens on GitHub. Core team and community contributors both submit pull requests to the same `main` branch and go through the same review process. We do not use long-lived feature branches; everything targets `main`.

## How to Get in Touch

- [Discord](https://discord.gg/berachain)
- [Telegram](https://t.me/BerachainPortal)

---

## Reporting Bugs and Suggesting Changes

### Issues

We use [GitHub Issues](https://github.com/berachain/docs/issues) for bugs and documentation suggestions. Before opening a new issue, search existing issues to avoid duplicates.

When reporting a problem, please include:

- What you expected vs what you saw
- Where in the docs (URL or path) it occurs
- Your environment if relevant (e.g. browser, OS)

For small fixes (typos, single-sentence clarifications), you can open a PR directly; for larger changes, opening an issue first helps us align before you invest time.

### Security

Please do **not** report security vulnerabilities in public issues. Report them privately (e.g. via Discord to the team or through a private channel the project provides). We’ll acknowledge and work with you on a fix before any public disclosure.

### Proposing Larger Changes

If you want to change structure, add a new section, or rework a big part of the docs, we recommend opening an issue first. That way we can agree on the approach before you do a lot of work. For typos and small fixes, a direct PR is fine.

---

## Your First Pull Request

New to open source or to this repo?

1. Find an [open issue](https://github.com/berachain/docs/issues) (or open one if your idea isn’t listed).
2. Comment that you’d like to work on it so others don’t duplicate effort.
3. Follow the [Development Workflow](#development-workflow) below and open a PR.

You can also learn from this free series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

---

## Development Workflow

### 1. Fork and Clone

- Fork the repo on GitHub: [berachain/docs](https://github.com/berachain/docs).
- Clone your fork and add upstream:

```bash
git clone https://github.com/YOUR_USERNAME/docs
cd docs
git remote add upstream https://github.com/berachain/docs
```

Use the setup and local run instructions in [README.md](README.md).

### 2. Create a Branch

Work on a branch (do not commit directly to `main`):

```bash
git checkout -b fix/your-change   # or feature/your-feature
```

### 3. Add or Edit Content

- **Editing:** Open the relevant `.mdx` file under `general/`, `bex/`, `bend/`, `build/`, or `nodes/` and edit.
- **New page:** Create the `.mdx` file in the right folder, then add it to `docs.json` (see [Adding or moving pages](#adding-or-moving-pages)).

Classify new and substantially rewritten pages with [STRUCTURE.md](STRUCTURE.md). Resolve behavior claims to their implementation with [SOURCE_MAP.md](SOURCE_MAP.md).

### 4. Adding or Moving Pages

Navigation is defined in `docs.json` under `navigation.tabs`. Each tab has `groups`; each group has a `group` name and a `pages` array of file paths (without `.mdx`).

To add a new page:

1. Create the file, e.g. `build/bex/guides/my-new-guide.mdx`.
2. In `docs.json`, find the right tab and group and add the path to `pages`:

```json
"pages": [
  "build/bex/guides/pool-creation",
  "build/bex/guides/my-new-guide"
]
```

To move or rename a page, update the file path, every reference in `docs.json`, and links from other pages. Add a redirect from the previous live URL as required by `AGENTS.md`.

### 5. Content Guidelines

- Describe shipped behavior as it exists now. Do not present planned behavior as current. Put product intent in an explicitly labeled roadmap or proposal, not normative instructions. Time-ordered deltas belong in changelog pages when the repo has them.
- Read the owning implementation from [SOURCE_MAP.md](SOURCE_MAP.md) before stating behavior. Confirm every named function, event, error, role, and constant with `rg`.
- Use one content type per page. Follow [STRUCTURE.md](STRUCTURE.md) for placement.
- State values as values rather than Solidity constant names.
- Separate confirmed behavior from product intent and inference. Do not present an inference as shipped behavior.
- Use US English spelling in prose (`color`, `behavior`, `favor`, `labeled`).
- Use Mintlify/MDX components where appropriate, e.g. `<Card>`, `<Steps>`, `<Note>`, `<Tip>`, `<Warning>`.
- Use fenced code blocks with a language tag where you show code.
- Prefer colons, commas, and periods over em dashes in new prose. Do not create punctuation-only cleanup diffs across unrelated pages.
- Use [UBIQUITOUS_LANGUAGE.md](UBIQUITOUS_LANGUAGE.md) for project terms. Add real project terms to `vale/config/vocabularies/Berachain/accept.txt` instead of rephrasing around the linter.
- Validate your changes locally (see [README.md](README.md) for commands).

### 6. Validation Before PR

Install Vale once with `brew install vale`. Start `make dev` in another terminal, then run `make check`.

The gate covers validation, broken links, assets, accessibility, Vale, redirects, and POL address sync when the private source checkout is available. Fix every error before opening a PR. If the POL source is unavailable, `make check` prints a loud warning and continues; it does not prove address sync.

Format only files in your change (`prettier --write <paths>`). `make contracts-generate` does not reformat hand-authored pages.

When vale flags a project term as misspelled, add it to `vale/config/vocabularies/Berachain/accept.txt` rather than rephrasing — the file is the single source of truth for terminology vale will accept.

### 7. Contract address source of truth

Classify the contract family before editing data. The source and verification differ.

#### Proof of Liquidity addresses

Published POL contract addresses flow through four layers (field names must match exactly):

1. `contracts-internal/script/pol/POLAddresses.sol` — struct + per-network literals (mainnet, bepolia)
2. `data/pol-addresses-mapping.json` — whether each field is published and its `contractsPath`
3. `data/contracts.json` — addresses shown on the docs site
4. Generated pages/snippets from `make contracts-generate`

Only PoL-owned fields belong under `pol` in `data/contracts.json`. Do not place staking-pool singletons in this section.

Do not manually edit generated canonical address pages. After changing `data/contracts.json`, regenerate:

```bash
make contracts-generate
```

This regenerates exactly these files:

- `snippets/contracts/generated/core-contracts-table.mdx`
- `snippets/contracts/generated/bex-contracts-table.mdx`
- `snippets/contracts/generated/bend-contracts-table.mdx`
- `snippets/contracts/generated/bend-markets-table.mdx`
- `snippets/contracts/generated/staking-pools-singletons-table.mdx`
- `build/getting-started/deployed-contracts.mdx`
- `build/bex/deployed-contracts.mdx`
- `build/bend/deployed-contracts.mdx`
- `build/bend/deployed-markets.mdx`
- `nodes/staking-pools/contracts.mdx`

Check in generated outputs with your `data/contracts.json` changes in the same PR.

If this list and the `write(` calls in `scripts/contracts/generate-pages.mjs` disagree, the generator is authoritative and this list must change in the same PR.

#### POL address hygiene check

`make check-pol-addresses` compares `POLAddresses.sol`, the mapping file, and `contracts.json`. It prints summary counts (`ok`, `not_ok`, `not_published`) and fails when `not_ok > 0` or the source file is missing.

Maintainers can clone `contracts-internal` alongside the primary docs checkout so the verifier can read `script/pol/POLAddresses.sol`. `make check` tolerates a missing private checkout for cloud and public contributors, but prints an explicit warning that POL addresses were not verified.

```bash
make check-pol-addresses              # summary; fails if anything needs action
make list-pol-addresses-not-ok        # list every not_ok row (field, network, reason)
```

Typical fixes:

- `address_changed` or `missing_in_contracts_json` — update `data/contracts.json`, then `make contracts-generate`
- `publish_undecided` — add or fix mapping rows (`published` + `contractsPath`) or mark `published: false` when docs should omit the address
- `stale_mapping_field` / `missing_pol_literal` — align struct, literals, and mapping in `POLAddresses.sol`

Full status taxonomy: header comment in `scripts/contracts/verify-pol-addresses.mjs`.

Generation and POL sync checks are local Makefile targets, not separate CI jobs. Run them whenever contract data or `POLAddresses.sol` changes.

The Makefile finds `contracts-internal` beside the primary docs checkout, including when you run it from a git worktree. Set `POL_ADDRESSES_SOL` only for a nonstandard checkout layout:

```bash
make check-pol-addresses POL_ADDRESSES_SOL=/path/to/contracts-internal/script/pol/POLAddresses.sol
```

#### Staking pool addresses

Staking pool singleton addresses flow through three layers:

1. `contracts-staking-pools/script/StakingPoolAddresses.sol`
2. `data/contracts.json` under `stakingPools`
3. `nodes/staking-pools/contracts.mdx` and the generated snippets listed above

Only staking-pool singleton fields belong under `stakingPools` in `data/contracts.json`. There is no automated source-to-data verifier for this pipeline. Compare each published mainnet and testnet address to the same-named field in `StakingPoolAddresses.sol`, confirm the corresponding ABI exists in `berachain/abis`, run `make contracts-generate`, run `node scripts/contracts/generate-pages.mjs --check`, and inspect the generated diff.

#### Other contract families

Use `SOURCE_MAP.md` to find the implementation and deployment source. BEX is deprecated and should not receive new behavior. For a correction to existing BEX or Bend contract data, cite the owning deployment source in the pull request. No automated source-to-data verifier covers these sections.

### 8. Commit and Push

- Commit with a clear message, e.g. `Fix typo in BEX swap guide` or `Add section on pool exits`.
- Keep the scope of each PR focused (one topic or one section is ideal).

```bash
git add .
git commit -m "Your message"
git push origin fix/your-change
```

### 9. Open a Pull Request

- Open a PR from your branch to `berachain/docs` **main**.
- Fill in the PR template (description, checklist).
- If your PR fixes an issue, add “Closes #123” in the description.
- Allow maintainers to edit your branch (checkbox on the PR).
- Ensure your fork is up to date with `upstream/main` before or during review (e.g. `git fetch upstream && git merge upstream/main`).

Maintainers will review and either merge, request changes, or close with an explanation. We’ll do our best to respond in a timely way.

---

## After Your PR Is Merged

- You can delete your branch and pull the latest `main` from upstream.
- Thank you for contributing; it helps the whole community.

---

## License

By contributing, you agree that your contributions will be licensed under the same [MIT License](LICENSE) as this project.
