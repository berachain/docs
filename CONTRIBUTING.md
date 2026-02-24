# Contributing to Berachain Documentation

Thank you for considering contributing. This guide will help you get set up and submit changes.

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

We use [GitHub Issues](https://github.com/berachain/mintlify-docs/issues) for bugs and documentation suggestions. Before opening a new issue, search existing issues to avoid duplicates.

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

1. Find an [open issue](https://github.com/berachain/mintlify-docs/issues) (or open one if your idea isn’t listed).
2. Comment that you’d like to work on it so others don’t duplicate effort.
3. Follow the [Development Workflow](#development-workflow) below and open a PR.

You can also learn from this free series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

---

## Development Workflow

### 1. Fork and Clone

- Fork the repo on GitHub: [berachain/mintlify-docs](https://github.com/berachain/mintlify-docs).
- Clone your fork and add upstream:

```bash
git clone https://github.com/YOUR_USERNAME/mintlify-docs
cd mintlify-docs
git remote add upstream https://github.com/berachain/mintlify-docs
```

### 2. Prerequisites

- **Node.js** 16 or newer
- **npm** or **yarn**

### 3. Install Mintlify CLI

```bash
npm i -g mint
```

### 4. Create a Branch

Work on a branch (do not commit directly to `main`):

```bash
git checkout -b fix/your-change   # or feature/your-feature
```

### 5. Run the Docs Locally

From the repo root:

```bash
mint dev
```

Open [http://localhost:3000](http://localhost:3000). Check that your changes look correct and that existing pages still work.

### 6. Add or Edit Content

- **Editing:** Open the relevant `.mdx` file under `general/`, `build/`, or `reference/` and edit.
- **New page:** Create the `.mdx` file in the right folder, then add it to `docs.json` (see [Adding or moving pages](#adding-or-moving-pages)).

Use existing pages as a style reference. Prefer clear, concise language and short paragraphs. Use MDX components where they add value (see [Content guidelines](#content-guidelines)).

### 7. Adding or Moving Pages

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

To move or rename a page, update both the file path and every reference in `docs.json` and in other docs (links).

### 8. Content Guidelines

- Follow the structure and tone of existing docs.
- Use Mintlify/MDX components where appropriate, e.g. `<Card>`, `<Steps>`, `<Note>`, `<Tip>`, `<Warning>`.
- Use fenced code blocks with a language tag where you show code.
- Link to related pages when it helps the reader.
- After editing, run `mint dev` and click through to confirm links and formatting.

### 9. Build Check

Before submitting, run a production build to catch broken links or invalid config:

```bash
mint build
```

Fix any errors before opening your PR.

### 10. Commit and Push

- Commit with a clear message, e.g. `Fix typo in BEX swap guide` or `Add section on pool exits`.
- Keep the scope of each PR focused (one topic or one section is ideal).

```bash
git add .
git commit -m "Your message"
git push origin fix/your-change
```

### 11. Open a Pull Request

- Open a PR from your branch to `berachain/mintlify-docs` **main**.
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
