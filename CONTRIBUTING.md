# Contributing to Berachain Docs

Want to contribute to Berachain Docs? There are a few things you need to know.

## Code of Conduct

Berachain Foundation has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it. Please read [the full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Open Development

All work on Berachain Docs happens directly on [GitHub](https://github.com/berachain/docs). Both core team members and external contributors send pull requests which go through the same review process.

## Semantic Versioning

Berachain Docs follows [semantic versioning](https://semver.org). We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance. Learn more about our commitment to stability and incremental migration in our versioning policy.

### TL;DR SemVer

**Typical Version Bump Scenarios**

- Changes to components `./packages/ui`
- Changes to constatns `./packages/config`
- Changes to docs structure via sidebar, theme, images, vercel configs, etc
  - `./apps/*/.vitepress/*`
  - `./apps/*/content/public/*`

**_Minor_ Version Bump Scenario**

- Text and typo changes in markdown files (\*.md)

## Branch Organization

Submit all changes as a pull request directly to the [main branch](https://github.com/berachain/docs/tree/main). We don't use separate branches for development or for upcoming releases. We do our best to keep main in good shape. Please always make sure to fork the repository for external contributions.

Code that lands in main must be compatible with all apps and packages. It may contain additional features, but no breaking changes. We should be able to release a new minor version from the tip of main at any time.

## Bugs / Issues

### Where to Find Known Issues

We are using GitHub Issues for our public bugs. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn't already exist.

### Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. Please provide reproducible steps, such as Operating System, Browser and version, steps to recreate, etc.

### Security Bugs

Berachain Foundation has a process for the safe disclosure of security bugs. With that in mind, please do not file public issues; go through the process outlined on that page.

## How to Get in Touch

- [Telegram](https://t.me/BerachainPortal)
- [Discord](https://discord.com/invite/berachain)

## Proposing a Change

If you intend to change the core frontend, or make any non-trivial changes to the implementation, we recommend [filing an issue](https://github.com/berachain/docs/issues/new/choose). This lets us reach an agreement on your proposal before you put significant effort into it.

If you're only fixing a bug or a typo, it's fine to submit a pull request right away but we still recommend to file an issue detailing what you're fixing. This is helpful in case we don't accept that specific fix but want to keep track of the issue.

## Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To help you get familiar with our contribution process, we have a list of good first issues that contain bugs that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up for more than two weeks, it's fine to take it over but you should still leave a comment.

## Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. We'll do our best to provide updates and feedback throughout the process.

**Before submitting a pull request**, please make sure to see [Development Workflow](#development-workflow).

## Contribution Prerequisites

- You have [Node](https://nodejs.org/) installed at LTS and [Pnpm](https://pnpm.io) at v8.15.0+.
- You are familiar with Git.

## Development Workflow

This guide is intended to help you get started with contributing. By following these steps, you will understand the development process and workflow.

1. Fork and clone the repository
2. Installing Node.js and Pnpm
3. Installing dependencies
4. Running different sites
5. Writing documentation
6. Writing components
7. Writing constants
8. Creating redirects
9. Prettier formatting
10. Check successful building
11. Git commit format (recommended)
12. Submitting a pull request
13. Versioning

### Fork and clone the repository

Start by forking the repository:

[https://github.com/berachain/docs/fork](https://github.com/berachain/docs/fork)

Clone your repository

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/docs;
cd docs;
```

### Installing Node.js and Pnpm

Berachain docs uses Pnpm workspaces to manage multiple projects. You need to install Node.js v20 or higher and Pnpm v8.15.0 or higher.

You can run the following commands in your terminal to check your local Node.js and Pnpm versions:

```bash
node -v;
pnpm -v;
```

If the versions are not correct or you don't have Node.js or Pnpm installed, download and follow their setup instructions:

- Install Node.js using [fnm](https://github.com/Schniz/fnm) or from the [official website](https://nodejs.org/)
- Install [Pnpm](https://pnpm.io/installation)

To install the required Node.js version use `nvm` or `fnm`:

```bash
# FROM: ./docs

nvm install;
# or fnm install;
```

### Installing dependencies

This will install all dependencies in all `./apps` and `./packages` folders.

```bash
# FROM: ./docs

pnpm install;
```

> **NOTE:** Alternatively if you have `node_modules` conflicts, you can run `pnpm clean` which will remove all node modules, caching, and turbo folders, for a fresh install.

### Running different sites

To run all sites at once, you can simply run the following command.

```bash
# FROM: ./docs

pnpm dev;

# [Expected Output]:
# @berachain/core:dev:   vitepress v1.3.2
# @berachain/core:dev:
# @berachain/core:dev:   ➜  Local:   http://localhost:5173/
# @berachain/core:dev:   ➜  Network: use --host to expose
# @berachain/core:dev:   ➜  press h to show help
#
# @berachain/bex:dev:   vitepress v1.3.2
# @berachain/bex:dev:
# @berachain/bex:dev:   ➜  Local:   http://localhost:5174/
# @berachain/bex:dev:   ➜  Network: use --host to expose
# @berachain/bex:dev:   ➜  press h to show help
#
# @berachain/berps:dev:   vitepress v1.3.2
# @berachain/berps:dev:
# @berachain/berps:dev:   ➜  Local:   http://localhost:5175/
# @berachain/berps:dev:   ➜  Network: use --host to expose
# @berachain/berps:dev:   ➜  press h to show help
#
# @berachain/bend:dev:   vitepress v1.3.2
# @berachain/bend:dev:
# @berachain/bend:dev:   ➜  Local:   http://localhost:5176/
# @berachain/bend:dev:   ➜  Network: use --host to expose
# @berachain/bend:dev:   ➜  press h to show help
```

To run individual sites, run the following:

```bash
# FROM: ./docs

pnpm dev --filter @berachain/core;
# pnpm dev --filter @berachain/(core|berps|bend|bex)

# [Expected Output]:
# @berachain/core:dev:   vitepress v1.3.2
# @berachain/core:dev:
# @berachain/core:dev:   ➜  Local:   http://localhost:5173/
# @berachain/core:dev:   ➜  Network: use --host to expose
# @berachain/core:dev:   ➜  press h to show help
```

### Writing documentation

All documentation modifications can be found in markdown files `.md` in `apps/(bend|berps|bend|core)/content/*`.

#### Metatags

Whenever possible, each page should have proper metatags defined.

```md
---
head:
  - - meta
    - property: og:title
      content: What is Berachain?
  - - meta
    - name: description
      content: Berachain Is a High-Performance EVM-Compatible Blockchain Built on Proof-of-Liquidity Consensus
  - - meta
    - property: og:description
      content: Berachain Is a High-Performance EVM-Identical blockchain built on Proof-of-Liquidity, and supported by the BeaconKit framework.
---

# What is Berachain?
```

#### Imports

If you need to import constants or components, do so after the metatags and before the main header tag.

```md
---
head:
  - - meta
    - property: og:title
      content: What is Berachain?
---

<!-- Add here -->
<script setup>
  import config from '@berachain/config/constants.json';
</script>
<!-- end add -->

# What is Berachain?
```

#### Variables

Most variables defined by the constants can be done through curly braces `{{}}`.

Example:

```md
<script setup>
  import config from '@berachain/config/constants.json';
</script>

{{config.websites.foundation.name}}

<p>{{config.websites.foundation.url}}</p>
```

In some cases, links cannot be setup with traditional markdown, and here is the work around:

```md
<script setup>
  import config from '@berachain/config/constants.json';
</script>

<!--
❌ Does not work
[{{config.websites.foundation.name}}]({{config.websites.foundation.url}})
-->

✅ Correct way
<a :href="config.websites.foundation.url" target="_blank" rel="no-referrer">{{config.websites.foundation.name}}</a>

✅ Correct way combining variables
<a :href="config.testnet.dapps.berps.url + 'vault'" target="_blank" rel="no-referrer">{{config.testnet.dapps.berps.name}}</a>
```

#### Code Snippets

Code snippets should start with 3 ticks (\`), followed by the programming language, the code, and wrapped by an additional 3 ticks (\`).

_Example:_

````bash
# remove \
\```js
const hello = "there";
\```
````

If you'd like to use variables in code snippets, add a suffix of `-vue`

_Example:_

````bash
# remove \
\```js-vue
const hello = "{{config.testnet.dapps.beratrail.name}}";
\```
````

### Writing components

All components are shared with all sites via `./packages/ui` and are written in [Vuejs](https://vuejs.org).

To create a new component, please follow these guidelines.

#### 1 - Create Component

```bash
# FROM: ./packages/ui

touch MyNewComponent.vue; # Pascal Case
```

#### 2 - Format & Organize Component

**File:** `./apps/ui/MyNewComponent.vue`

```vue
<!-- 
Scripts 
========================================================
-->
<script setup lang="ts">
// <YOUR_TS_SCRIPT_HERE>
</script>

<!-- 
Template 
========================================================
-->
<template>
  <!-- <YOUR_VUE_TEMPLATE_TAGS_HERE> -->
</template>

<!-- 
Styles 
========================================================
-->
<style scoped>
/* `scoped` is that the styles only apply to this component and not system-wide */
/* <YOUR_CSS_HERE> */
</style>
```

#### 3 - Expose Component

Once your component is created, make sure to expose the component via `package.json`

**File:** `./packages/ui/package.json`

```json
{
  "name": "@berachain/ui",
  "version": "1.0.0",
  "description": "",
  "main": "./index.ts",
  "types": "./index.ts",
  "exports": {
    ".": "./",
    "./MyNewComponent": "./MyNewComponent.vue"
  }
}
```

#### 4 - Importing Component

In one of the websites, import your component as follows:

```md
<script setup>
  import MyNewComponent from '@berachain/ui/MyNewComponent';
  import config from '@berachain/config/constants.json';
</script>

<!-- ClientOnly Optional -->
<ClientOnly>
  <MyNewComponent />
</ClientOnly>
```

### Writing constants

All constants can be found in `./packages/config/constants.json`.

If you are removing or adding any values, make sure to run a `pnpm build` to make sure that all links are working and building correctly.

### Creating redirects

If removing or renaming a link / url, modify the `vercel.json` file in the respective website folder to have catch if the link is still used.

If there is no replacement and the link is simply removed, place a redirect to the root website url.

If no `vercel.json` is present, create one.

_Example:_

File: `./apps/core/vercel.json`

```json
{
  "github": {
    "silent": true
  },
  "cleanUrls": true,
  "redirects": [
    {
      "source": "/before-page-root-directory/",
      "destination": "/new-page-root-directory"
    },
    {
      "source": "/before-page",
      "destination": "/new-page"
    },
    {
      "source": "/before-page-which-no-longer-exists",
      "destination": "/"
    }
  ]
}
```

### Prettier formatting

Whenever you think your code is ready, run the following to format all your code.

```bash
# FROM: ./docs

pnpm format;
```

### Check successful building

Whenever new changes are made, and after formatting, run a build to make sure there aren't any broken links and things are being formatted correctly.

```bash
# FROM: ./docs

pnpm build;

# [Expected Output]:
# @berachain/bex:build:   vitepress v1.3.2
# @berachain/bex:build:
# ✓ building client + server bundles...
# ✓ rendering pages...
# ✓ generating sitemap...
# @berachain/bex:build: build complete in 6.58s.
# @berachain/bex:build:
# ✓ building client + server bundles...
# ✓ rendering pages...
# ✓ generating sitemap...
# @berachain/bend:build: build complete in 8.02s.
# @berachain/bend:build:
# ✓ building client + server bundles...
# ✓ rendering pages...
# ✓ generating sitemap...
# @berachain/berps:build: build complete in 8.63s.
# @berachain/berps:build:
# ✓ building client + server bundles...
# ✓ rendering pages...
# ✓ generating sitemap...
# @berachain/core:build: build complete in 10.43s.
# @berachain/core:build:
```

### Git commit format (recommended)

Whenver you're ready to create a commit, stage the file, and then run the following [commitzen](https://commitizen-tools.github.io/commitizen/) commands to make it easier to run through commit formatting.

```bash
# FROM: ./docs

# make sure you're on a new branch and not committing to `main`
git add .
pnpm dlx git-cz;
# Follow instructions
# git push origin your-branch
```

### Submitting a pull request

Whenver submitting a pull request, make sure that it's from a forked repository and create a pull request to `main`.

[New Pull Request](https://github.com/berachain/docs/compare)

### Versioning

See [semantic versioning section](#semantic-versioning) to see when to update versioning.

> **NOTE:** Make sure to commit your changes prior to doing the version bump.

If the versioning criteria is met, run the following in the respective `apps` or `packages` folder.

When adding new features or fixing bugs, we'll need to bump the package versions. We use [Changesets](https://github.com/changesets/changesets) to do this.

Steps for running changeset.

#### 1 - Run Changeset

```bash
# FROM: ./docs

pnpm changeset;

# [Expected Prompt]:
# 🦋  Which packages would you like to include? …
# ◯ changed packages
#   ◉ @berachain/config
#   ◯ @berachain/ui
#   ◯ @berachain/berps
#   ◯ @berachain/bend
#   ◯ @berachain/core
#   ◯ @berachain/bex
# 
# NOTE: REMEMBER major is for breaking changes, minor is for new features/sections, and patch is for small text changes
# If not a major change don't select anything and press `Enter`
# 
# 🦋  Which packages should have a major bump? …
# ◉ all packages
#   ◉ @berachain/config@0.0.0
#
# (Continue if not a major bump)
#
# WARNING: Releasing a major version for @berachain/config will be its first major release.
# 🦋  If you are unsure if this is correct, contact the package's maintainers before committing # this changeset.
# 🦋  Are you sure you want to release the first major version of @berachain/config? (Y/n) › true
#
# 🦋  Please enter a summary for this change (this will be in the changelogs).
# 🦋    (submit empty line to open external editor)
# 🦋  Summary › Initial version for the berachain constants
#
# 🦋  === Summary of changesets ===
# 🦋  major:  @berachain/config
# 🦋
# 🦋  Note: All dependents of these packages that will be incompatible with
# 🦋  the new version will be patch bumped when this changeset is applied.
# 🦋
# 🦋  Is this your desired changeset? (Y/n) › true
```

#### 2 - Update Version

```bash
# FROM: ./docs

pnpm changeset version;
```

#### 3 - Confirm CHANGELOG.md

You should now see an updated `CHANGELOG.md` the package directory.

```bash
# FROM: ./docs

tree package/config;

# [Expected Output]:
# packages/config
# ├── CHANGELOG.md <----- NEW
# ├── README.md
# ├── constants.js
# ├── constants.json
# └── package.json
```

Seeing as `packages/config` is a dependency, you will see an `minor` update in the CHANGELOG.md for `apps/(bend|berps|bex|core)` as well, but not in `packages/ui`.

#### 4 - Commit Changes

Once the version changes are done, make a commit with a chore-like commit.

## License

By contributing to Berachain Foundation Docs, you agree that your contributions will be licensed under its MIT license.
