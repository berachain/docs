# Berachain documentation structure

`docs.json` is the navigation authority. This file explains how to choose a content type and placement; if a listed path and `docs.json` disagree, fix this file.

## Tabs

The site has five top-level tabs:

| Tab     | Primary paths             | Purpose                                                                             |
| ------- | ------------------------- | ----------------------------------------------------------------------------------- |
| General | `index.mdx`, `general/**` | Berachain concepts, tokens, governance, and help                                    |
| BEX     | `bex/**`                  | Deprecated BEX user documentation; correct existing pages, do not add new behavior  |
| Bend    | `bend/**`                 | Bend concepts and user guides                                                       |
| Build   | `build/**`                | Developer guides, protocol integration, contract reference, and SDK material        |
| Nodes   | `nodes/**`                | Node architecture, setup, operations, staking pools, Beacon Kit reference, and help |

## Content types

Classify before drafting. One page answers one kind of reader question.

| Type                   | Reader question                                                 | Existing locations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Concept / explanation  | How does this work, and why?                                    | `general/introduction/{what-is-berachain,what-is-proof-of-liquidity}.mdx`, `general/proof-of-liquidity/**`, `general/tokens/**`, `general/governance/**`, `bex/learn/**`, `bend/learn/**`, `build/protocol/{overview,eip5792-overview}.mdx`, `build/bex/concepts/**`, `nodes/overview/node-architecture.mdx`, `nodes/architecture/**`, `nodes/beaconkit/overview.mdx`, `nodes/staking-pools/overview.mdx`                                                                                                |
| How-to guide           | How do I complete a task?                                       | `general/introduction/{connect-to-berachain,how-to-get-bera}.mdx`, `bex/guides/**`, `bend/guides/**`, `build/guides/**`, `build/pol/**`, `build/protocol/{eip7702-basics,eip7702-batch-transactions,eip7702-gas-sponsorship}.mdx`, `build/bex/guides/**`, `build/bex/sdk/{swap,add-liquidity,remove-liquidity,sor}.mdx`, `build/bend/onchain-*.mdx`, `nodes/guides/**`, `nodes/operations/**`, `nodes/staking-pools/{installation,operators,delegators}.mdx`, `general/help/reward-vault-guidelines.mdx` |
| Reference              | What is the exact value, signature, address, command, or field? | Generated contract files in `CONTRIBUTING.md`, `build/getting-started/{developer-tools,common-resources}.mdx`, `build/bex/sdk/reference.mdx`, `nodes/beaconkit/{api,cli,configuration}.mdx`, `general/help/{glossary,honeypaper}.mdx`                                                                                                                                                                                                                                                                    |
| Troubleshooting / help | What failed, and how do I recover?                              | `general/help/faqs.mdx`, `nodes/help/faq.mdx`, `build/bex/help/error-codes.mdx`                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Landing / navigation   | Where should I go next?                                         | `index.mdx`, `build/getting-started/overview.mdx`, `build/guides/community/overview.mdx`, `build/bex/{overview,sdk/overview}.mdx`, `build/bend/overview.mdx`, `nodes/overview/index.mdx`, and tab-level `*/learn/overview.mdx` files                                                                                                                                                                                                                                                                     |
| Changelog              | What shipped, and when?                                         | `general/proof-of-liquidity/changelog.mdx`                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

An `overview.mdx` can explain a concept or route readers to other pages. Read the page and its group in `docs.json` before classifying it.

Generated reference is not hand-authored. Follow `CONTRIBUTING.md` § Contract address source of truth.

If a feature needs both exact reference data and a procedure, create separate reference and how-to changes. Do not put walkthroughs in generated address pages or contract tables in a guide.

## Placement

1. Find sibling pages of the same content type in the table above.
2. Read the target tab and group in `docs.json`.
3. Add the page path to `docs.json` without the `.mdx` suffix.
4. If no group fits, propose the information-architecture change before creating a new group.
5. For a move or rename, add the redirect required by `AGENTS.md`.

Use kebab-case filenames. Frontmatter supplies `title` and `description`; the file body starts with page content, not a second H1.
