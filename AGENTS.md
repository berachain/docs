# Agent instructions for Berachain documentation

Read these files before changing documentation:

- `CONTRIBUTING.md` for prose, validation, generated content, and pull request workflow
- `STRUCTURE.md` for content type and placement
- `SOURCE_MAP.md` for the repository that owns each behavior claim
- `UBIQUITOUS_LANGUAGE.md` for project terms and relationships, after source verification
- `docs.json` for current navigation

Do not use a neighboring page as the source of a behavior claim. Read the owning implementation from `SOURCE_MAP.md`.

Before handing off a change, start `make dev` and run the full `make check` gate from `CONTRIBUTING.md`.

## No emoji

Do not use emoji in documentation, card titles, descriptions, scripts, READMEs, or other project files. Use words to communicate emphasis or status.

## Navigation and redirects

`docs.json` is the navigation authority. Do not infer current navigation from old links, screenshots, or git history.

- Add every new page to the appropriate `docs.json` group.
- When a live URL would otherwise return `404`, add a redirect in `docs.json`.
- When moving a page, redirect the old URL to the new location.
- When removing a page without a direct replacement, choose the closest substitute and get maintainer approval for the redirect destination.
- Do not leave a previously live URL returning `404` without explicit maintainer agreement.
- After changing redirects, run `make dev` and then `make check-redirects`.

## Generated contract documentation

Do not hand-edit generated contract pages or snippets. Follow `CONTRIBUTING.md` § Contract address source of truth and verify the output list against the `write(` calls in `scripts/contracts/generate-pages.mjs`.

## EVM execution page: Beacon Kit genesis

These rules apply when editing `nodes/architecture/evm-execution.mdx`.

If the change bumps recommended Beacon Kit or Bera-Reth versions, use GitHub `releases/latest` only to find candidate tags. The documented pairing can intentionally lag the latest release.

```sh
BEACON_KIT_TAG=$(curl -s https://api.github.com/repos/berachain/beacon-kit/releases/latest | jq -r .tag_name)
BERA_RETH_TAG=$(curl -s https://api.github.com/repos/berachain/bera-reth/releases/latest | jq -r .tag_name)
```

After choosing the versions:

1. Use the same Beacon Kit git tag in the release link and every raw genesis URL. Never use `refs/heads/main` or a moving release branch.
2. Recompute each MD5 from the exact bytes at its raw URL, for example `curl -fsSL '<url>' | md5`.
3. Keep the Beacon Kit release, Bera-Reth version, genesis URL tags, checksums, and Updated column coherent.
