# Cursor Rules for Berachain Documentation

## No Emoji Use

Do not use emojis in any content. This applies to:
- Documentation (MDX, Markdown)
- Card titles and descriptions on the home page
- Scripts, README, and all project files

Use plain text only. Replace emoji emphasis with clear wording.

## Reference Documentation

The `berachain-docs` directory is a git submodule containing the official Berachain documentation repository from https://github.com/berachain/docs. This submodule serves as the primary reference for creating new documentation.

### Submodule Structure

The `berachain-docs` submodule contains:
- `apps/core/` - Main Berachain documentation (docs.berachain.com)
- `apps/bex/` - BEX (Berachain Exchange) documentation (docs.bex.berachain.com)
- `apps/bend/` - Bend (lending protocol) documentation (docs.bend.berachain.com)
- `packages/ui/` - Shared Vue components
- `packages/config/` - Shared configuration constants

### Documentation Standards

When creating new documentation, refer to the following files in `berachain-docs/`:

1. **Style Guide**: `berachain-docs/STYLE_GUIDE.md`
   - Markdown formatting conventions
   - Frontmatter structure
   - Code block formatting
   - Callout usage (tips, warnings, dangers)
   - Heading hierarchy
   - Link conventions

2. **Contributing Guide**: `berachain-docs/CONTRIBUTING.md`
   - Development workflow
   - Component creation guidelines
   - Constants management
   - Versioning practices

3. **Example Documentation**: Reference actual documentation files in:
   - `berachain-docs/apps/core/content/` - Core Berachain docs
   - `berachain-docs/apps/bex/content/` - BEX docs
   - `berachain-docs/apps/bend/content/` - Bend docs

### Key Documentation Patterns

#### Markdown Structure
- Use YAML frontmatter with meta tags for SEO
- Follow sentence case for headings
- Use proper heading hierarchy (H1 for page title, H2 for major sections, etc.)
- Include code examples with appropriate language tags
- Use callouts (:::tip, :::warning, :::danger) for important information

#### Code Examples
- Prefix shell commands with context: `# FROM: ./directory`
- Show expected output with comments: `# [Expected Output]:`
- Use proper language tags for code blocks
- Include placeholders for user-specific values (e.g., `YOUR_VALIDATOR_ADDRESS`)

#### API Documentation
- Structure endpoints with clear headings and HTML IDs for deep linking
- Include HTTP method, path, parameters, and responses
- Provide example requests and responses
- Document error cases

### Current Project Context

This project uses **Mintlify** for documentation (not VitePress like the submodule). Key differences:
- Navigation is defined in `docs.json` (not `sidebar.ts`)
- Files use `.mdx` extension (not `.md`)
- Mintlify has its own component system and conventions

### When Creating New Documentation

1. **Reference the submodule**: Check `berachain-docs/` for similar content or examples
2. **Follow style guide**: Adhere to conventions in `berachain-docs/STYLE_GUIDE.md`
3. **Adapt to Mintlify**: Convert VitePress-specific syntax to Mintlify equivalents
4. **Maintain consistency**: Match the tone, structure, and formatting of existing docs
5. **Use examples**: Reference actual documentation files in the submodule as templates

### Important Paths

- Submodule root: `berachain-docs/`
- Core docs content: `berachain-docs/apps/core/content/`
- BEX docs content: `berachain-docs/apps/bex/content/`
- Bend docs content: `berachain-docs/apps/bend/content/`
- Style guide: `berachain-docs/STYLE_GUIDE.md`
- Contributing guide: `berachain-docs/CONTRIBUTING.md`
- Constants config: `berachain-docs/packages/config/constants.json`

### Best Practices

1. Always check the submodule first for existing documentation on a topic
2. Use the style guide as the authoritative source for formatting
3. When adapting VitePress docs to Mintlify, preserve the content structure and adapt the syntax
4. Maintain consistency with existing documentation in this repository
5. Reference specific files in the submodule when asking for help or examples

## EVM execution page — Beacon Kit genesis (`nodes/architecture/evm-execution.mdx`)

When editing this page (execution client versions and network genesis downloads):

**If the intent is to bump** the recommended Beacon Kit and/or Bera-Reth version numbers, you can read candidate tags from GitHub `releases/latest` (still choose the pairing you intend to document; it may lag `latest` on purpose):

```sh
# Candidate: latest Beacon Kit release tag
BEACON_KIT_TAG=$(curl -s https://api.github.com/repos/berachain/beacon-kit/releases/latest | jq -r .tag_name)

# Candidate: latest Bera-Reth release tag
BERA_RETH_TAG=$(curl -s https://api.github.com/repos/berachain/bera-reth/releases/latest | jq -r .tag_name)
```

After any bump, apply rules 1–3 for the tags actually written on the page.

1. **Raw genesis URLs** must use the **same Beacon Kit git tag** as the release linked in the page copy (for example, page cites v1.3.9 → `https://raw.githubusercontent.com/berachain/beacon-kit/v1.3.9/testing/networks/<chainId>/eth-genesis.json`). **Do not** use `refs/heads/main` or a moving release branch for these downloads: operators need the exact tree that shipped with that Beacon Kit version.

2. **MD5 values** in the table must match the **exact bytes** returned by the linked raw URL. After any URL or tag change, re-verify (for example `curl -fsSL '<url>' | md5`).

3. **Coherence**: Keep the Beacon Kit **release tag** link, the Bera-Reth version row, and the **tag** embedded in genesis URLs aligned. When bumping Beacon Kit, update the tag in all genesis URLs, update Bera-Reth if required, recompute MD5s, and adjust the “Updated” column when the artifact at that URL meaningfully changes for operators.

