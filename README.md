# 🐻 Berachain Monorepo Docs

This is a monolithic repository that contains all the documentation for [Berachain](https://www.berachain.com/) and BEX.

## Requirements

- NVM or Node `v20.11.0` or greater
- [pnpm](https://pnpm.io/) (recommended)

## Turborepo Folder Structure

This Turborepo includes the following packages/apps:

### Docs

All docs are built with [Vitepress](https://vitepress.dev) - Vite & Vue Powered Static Site Generator.

- `apps/bex`- Main docs repository for [https://docs.bex.berachain.com](https://docs.bex.berachain.com)
- `apps/core`- Main docs repository for [https://docs.berachain.com](https://docs.berachain.com)

### Packages

A series of packages that are shared with various `apps` (doc sites).

- `packages/ui`: All Vitepress vue components used by the different doc apps.
- `packages/config`: All configurations and constants

## Quick Start

Install dependencies for all apps and packages.

```bash
# FROM: ./

pnpm install;
```

If you'd like to run all apps at the same time, run the following:

```bash
# FROM:  ./

pnpm dev;

# @berachain/bex:dev - http://localhost:5173
# @berachain/core:dev - http://localhost:5176
```

If you'd like to run an individual app, run the following:

```bash
# FROM: ./

pnpm dev --filter @berachain/core;
```

## Contributing

### Code Of Conduct

Please see [Code of Conduct](CODE_OF_CONDUCT.md).

### Contributing Guide

Please see [CONTRIBUTING.md](CONTRIBUTING.md) on how to contribute and also see the [development workflow](CONTRIBUTING.md#development-workflow).

## License

Berachain Docs [License](LICENSE)
