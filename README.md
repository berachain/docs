# Berachain Documentation

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/berachain/docs/blob/main/CONTRIBUTING.md)
[![Contributors](https://img.shields.io/github/contributors/berachain/docs)](https://github.com/berachain/docs/graphs/contributors)
[![Docs](https://img.shields.io/badge/docs-docs.berachain.com-8B5CF6)](https://docs.berachain.com)
[![Mintlify](https://img.shields.io/badge/docs-Mintlify-00DF80)](https://mintlify.com)

Unified documentation for [Berachain](https://www.berachain.com/) and its native protocols: **BEX** (DEX) and **Bend** (lending). Built with [Mintlify](https://mintlify.com).

We welcome contributions from the community. Whether you're fixing a typo, clarifying a section, or adding a new guide, your help makes our docs better for everyone.

---

## What’s in this repo

- **Berachain (General)** — L1 overview, Proof-of-Liquidity, tokens, governance  
- **Build** — Getting started, BEX, Bend, nodes, validators  
- **Reference** — APIs, contracts, and technical reference

Content is in MDX. Navigation and branding are configured in `docs.json`.

---

## Quick start

### Prerequisites

- **Node.js** v20.17.0+ (LTS recommended)
- **Git**
- **npm** or **pnpm**

### Install Mintlify CLI

```bash
npm i -g mint
```

### Run locally

```bash
mint dev
```

Open [http://localhost:3000](http://localhost:3000).

### Validate before pushing

Check that the docs build with no warnings or errors (recommended for CI and before opening a PR):

```bash
mint validate
```

---

## Contributing

We use a single **main** branch. All changes come in via pull requests and go through the same review process, whether from the core team or the community.

- **[CONTRIBUTING.md](https://github.com/berachain/docs/blob/main/CONTRIBUTING.md)** — How to set up your environment, add or edit content, and open a PR  
- **[CODE_OF_CONDUCT.md](https://github.com/berachain/docs/blob/main/CODE_OF_CONDUCT.md)** — How we work together and what we expect from everyone

### Ways to contribute

- Fix typos or unclear wording  
- Add or improve guides and examples  
- Report missing or incorrect docs via [GitHub Issues](https://github.com/berachain/docs/issues)  
- Suggest improvements in issues before larger changes  

If you’re new to open source, see [Your first pull request](https://github.com/berachain/docs/blob/main/CONTRIBUTING.md#your-first-pull-request) in CONTRIBUTING.

---

## Project layout

```
docs/
├── docs.json          # Site config, navigation, theme
├── general/           # Berachain core docs
├── build/             # BEX, Bend, nodes, validators
├── reference/         # APIs, contracts
├── logo/
└── images/
```

New pages are added under the right folder and registered in `docs.json` under the right tab/group. See [CONTRIBUTING.md](https://github.com/berachain/docs/blob/main/CONTRIBUTING.md#adding-or-moving-pages) for the exact steps.

---

## Links

| Resource | Link |
|----------|------|
| Website | [berachain.com](https://berachain.com) |
| Docs (live) | [docs.berachain.com](https://docs.berachain.com) |
| GitHub | [github.com/berachain](https://github.com/berachain) |
| Discord | [discord.gg/berachain](https://discord.gg/berachain) |
| BEX | [bex.berachain.com](https://bex.berachain.com) |
| Bend | [bend.berachain.com](https://bend.berachain.com) |

---

## Support

- **Docs bugs or suggestions** — [Open an issue](https://github.com/berachain/docs/issues)  
- **Technical or protocol questions** — [Discord](https://discord.gg/berachain)  
- **Security** — Do not report security issues in public; see [CONTRIBUTING.md](https://github.com/berachain/docs/blob/main/CONTRIBUTING.md#security) for how to report them safely  

---

## License

This documentation is licensed under the [MIT License](LICENSE).
