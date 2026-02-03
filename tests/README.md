# Documentation Tests

Tests for verifying rendered documentation output.

## Setup

Install test dependencies:

```bash
cd docs
pip install -r tests/requirements.txt
```

Or use the workspace virtual environment:

```bash
source ~/src/.venv/bin/activate
pip install -r tests/requirements.txt
```

## Usage

### Build Mode (Recommended for CI)

Build the docs first, then run tests against static HTML:

```bash
pnpm build
pytest tests/test_abi_references.py
```

The build output is located in:

- `apps/core/.vitepress/dist/` - Core docs HTML
- `apps/bex/.vitepress/dist/` - BEX docs HTML
- `apps/bend/.vitepress/dist/` - Bend docs HTML

Tests will automatically find the built HTML files in these directories.

### Dev Server Mode (For Local Testing)

Start the dev server in one terminal:

```bash
pnpm dev
# Server runs on http://localhost:55173 (core)
# Other apps may run on different ports
```

In another terminal, run tests:

```bash
pytest tests/test_abi_references.py --dev-server http://localhost:55173
```

Note: VitePress uses clean URLs (no `.html` extension), so the test handles both formats.

## Test Coverage

- Verifies ABI references are present on all deployed contracts pages
- Checks that mainnet and testnet ABI links are present and correct
- Validates that links are accessible
- Ensures mainnet and testnet ABIs are clearly distinguished
