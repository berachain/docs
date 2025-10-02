# Berachain Documentation Style Guide

## 1. Introduction

This style guide provides conventions and best practices for creating and maintaining documentation for the Berachain ecosystem. Adhering to this guide will ensure consistency, clarity, and ease of use for our readers and contributors.

The documentation is built using [VitePress](https://vitepress.dev/). Familiarity with VitePress and Markdown is recommended.

## 2. Directory Structure & File Naming

- **Main Content:** All documentation content resides primarily within `bcdocs/apps/core/content/` and `bcdocs/apps/bex/content/`.
- **Subdirectories:** Organize content into logical subdirectories based on topics (e.g., `learn/`, `developers/`, `nodes/`, `beacon-kit/`).
- **File Naming:**
  - Use lowercase, hyphenated filenames (kebab-case). E.g., `proof-of-liquidity.md`.
  - `index.md` is the default file for a directory, serving as its landing page.
- **Assets:** Static assets like images should be placed in the `public/assets/` directory (e.g., `bcdocs/apps/core/public/assets/`). Reference them in markdown using root-relative paths (e.g., `/assets/my-image.png`).

Files must be formatted by running `pnpm format` before being checked in. The CI/CD process checks for potential format fixes (with `pnpm format:check`) and fails the build if there are any.

## 3. Markdown & Content Formatting

#### Metadata

Whenever possible, each page should have meta tags defined.

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
<a :href="config.mainnet.dapps.bex.url + 'vault'" target="_blank" rel="no-referrer">{{config.mainnet.dapps.bex.name}}</a>
```

### Headings

- **`# (H1)`:** Reserved for the main title of the page. This is often automatically generated from the frontmatter `title` or is the first line of the file.
  - For special landing pages (like `index.md`), H1 might be part of a custom Vue component structure (e.g., `<h1 class="title">`).
- **`## (H2)`:** Use for major sections within a page. These often correspond to main topics covered in the `sidebar.ts`.
- **`### (H3)`:** Use for sub-sections of an H2.
- **`#### (H4)` and deeper:** Use sparingly for further nested sub-sections.
- **Sentence Case:** Use sentence case for headings (capitalize the first word and proper nouns).

### Frontmatter

All markdown files should start with YAML frontmatter:

```yaml
---
head:
  - - meta
    - property: og:title
      content: Page Title for Social Sharing
  - - meta
    - name: description
      content: Brief description of the page content (for SEO).
  - - meta
    - property: og:description
      content: Brief description of the page content (for social sharing).
---
```

- For the main `index.md` landing pages, `layout: page` is used.

### Code Blocks

Code snippets should start with 3 ticks (\`) followed by the programming language, the code, and wrapped by an additional 3 ticks (\`).

_Example:_

```bash
ˋˋˋjs
const hello = "there";
ˋˋˋ
```

If you'd like to use variables in code snippets, add a suffix of `-vue`

_Example:_

```
ˋˋˋjs-vue
const hello = "{{config.mainnet.dapps.berascan.name}}";
ˋˋˋ
```

For shell commands:

- Indicate the context or directory if necessary, e.g., `# FROM: ~/devnet` or `# FROM: project-root/directory`.
- Show the command and its expected output clearly.
- Use comments (`# [Expected Output]:` or similar) to delineate commands from output.

**Example (Bash):**

```
ˋˋˋbash
# Build the Docker images
./build.sh;

# [Expected Result]:
# ...
# *** Build complete
ˋˋˋ
```

**Example (JSON):**

```
ˋˋˋjson
{
  "status": "success",
  "data": {
    "message": "Hello World"
  }
}
ˋˋˋ
```

### Callouts (Tips, Warnings, Dangers)

Use VitePress callouts to emphasize information:

- **`:::tip` / `:::info`**: For helpful tips or neutral information.
- **`:::warning`**: For important information that users should be aware of to avoid minor issues.
- **`:::danger`**: For critical information that, if ignored, could lead to significant problems (e.g., loss of funds, security risks).

**Example:**

```md
ˋˋˋ
:::danger
Modifying signed data before sending it can result in a loss of funds. Do not proceed if you see signature errors.
:::
ˋˋˋ
```

### Links

- **Internal Links:**
  - Link to other documentation pages using relative paths from the current file, or site-root relative paths.
  - E.g., `[Our Quickstart Guide](../quickstart.md)` or `[Proof of Liquidity](/learn/pol/)`.
  - Omit the `.md` extension for links that `sidebar.ts` will resolve.
- **External Links:**
  - Use the full URL. E.g., `[Berachain Website](https://www.berachain.com)`.
  - Consider if `target="_blank"` is appropriate (usually for links leaving the docs site).

### Lists

- Use bullet points (`-`, `*`) for unordered lists.
- Use numbered lists (`1.`, `2.`) for ordered steps.

### Tables

Use markdown tables for structured data. Keep them concise and readable.

```md
ˋˋˋ
| Feature | Supported | Notes |
|-----------------|-----------|-------------------------------------|
| Proof of Stake | Yes | Via BGT delegation |
| Smart Contracts | Yes | EVM Compatible |
ˋˋˋ
```

## 4. Navigation & Sidebar (`sidebar.ts`)

The main navigation is controlled by `bcdocs/apps/core/.vitepress/sidebar.ts` (and similar files for other apps like `bex`).

- **Structure:** The `SIDEBAR` constant contains objects for major sections like `LEARN`, `DEVELOPERS`, `NODES`.
- **Items:** Each navigational item is an object:
  - `text`: The displayed text in the sidebar.
  - `link`: The path to the markdown file (e.g., `/learn/what-is-proof-of-liquidity`). The `.md` extension is omitted.
  - `items`: An array of nested item objects for collapsible sub-sections.
  - `target: '_blank'`: For external links.
  - `rel: 'no-referrer'`: Often used with `target: '_blank'`.
- **Adding New Pages:**
  1. Create your `.md` file in the appropriate content directory.
  2. Add a corresponding entry in `sidebar.ts` in the correct section and nesting level.

## 5. Homepage (`index.md`) Structure

The `index.md` files (e.g., `bcdocs/apps/core/content/index.md`) serve as the main landing pages for a documentation set.

- **Layout:** Uses `layout: page` in the frontmatter.
- **Custom Components:** Heavily relies on custom Vue components, particularly:
  - `<Feature>`: To create visually distinct links to key sections or resources. Takes props like `title`, `description`, `link`, `icon`, `image`, `type`.
- **`<script setup>`:** Used to import components (`Feature`, icons from `@tabler/icons-vue`, configuration constants).
- **Structure:** Typically includes a hero section followed by multiple `<section class="features">` containing `<Feature>` components.
- **Styling:** May include page-specific CSS within `<style>` tags.

## 6. Documenting Console Interactions

Refer to `bcdocs/apps/core/content/nodes/guides/docker-devnet.md` as a primary example.

- **Clear Steps:** Break down procedures into numbered steps using H2 or H3 headings (e.g., "### Step 1 - Obtain & Build Source").
- **Command Presentation:**
  - Use `bash` (or relevant shell type) code blocks.
  - Prefix commands with context if helpful: `# FROM: ~/devnet`.
  - Use `<CopyToClipboard>` component (imported via `<script setup>`) for easy copying of complex commands if appropriate, though direct markdown code blocks are standard.
- **Output Presentation:**
  - Clearly indicate expected output using comments within the code block or separate blocks.
  - E.g., `# [Expected Output]:` or a descriptive comment.
  - For logs, use `docker logs -f cl-node-rpc-0 | egrep '(Commit|deposit|withdraw|exit)';` and show representative output.
- **Placeholders:** Use clear placeholders for user-specific values (e.g., `YOUR_VALIDATOR_ADDRESS`) and instruct the user on how to obtain them.
- **Callouts:** Use `:::tip`, `:::warning`, `:::danger` extensively to guide the user and prevent common errors.

**Example Snippet Structure (Conceptual):**

```markdown
### Step X: Perform Action

Run the following command:

ˋˋˋbash

# FROM: /path/to/your/project

your-command --with-options

# [Expected Output]:

Processing complete.
Result: SUCCESS
ˋˋˋ

:::tip
You can verify the outcome by checking the log file at `/var/log/app.log`.
:::
```

## 7. Documenting APIs

Refer to [claim-api.md](https://github.com/berachain/docs/blob/main/apps/core/content/developers/claim-api.md?plain=1) as an example.

### Endpoint Structure

Each API endpoint should be documented with:

1.  **Heading (H3):** A descriptive name for the endpoint, followed by a unique HTML ID for deep linking.
    - Example: `### Get Block Headers {#ethv1beaconheaders}`
2.  **HTTP Method and Path:** Clearly display the method (GET, POST, etc.) and the request path.
    - Example:
    ```
      ˋˋˋhttp
      GET /eth/v1/beacon/headers
      ˋˋˋ
    ```
3.  **Description:** A brief explanation of what the endpoint does.
4.  **Parameters:** (If applicable)
    - Path Parameters
    - Query Parameters
    - Request Body (for POST/PUT)
    - Detail the name, type, if it's required, and a description.
5.  **Responses:**
    - Success responses (e.g., 200 OK) with example bodies.
    - Error responses with example bodies.
6.  **Interactive Tester:** Use the `<ApiTester>` component.

### Using `<ApiTester>`

The `<ApiTester>` Vue component provides an interactive way for users to try out API calls.

- **Import:** Import it in the `<script setup>` block: `import ApiTester from '../../.vitepress/theme/components/ApiTester.vue';`
- **Usage:**
  ```vue
  <ApiTester endpoint="/eth/v1/beacon/headers/{block_id}" method="GET" :pathParams="[{
  name: 'block_id', description: 'Block identifier (head, genesis, finalized, justified,
  or slot number)' }]" :queryParams="[{ name: 'slot', description: 'Slot number',
  required: false }, { name: 'parent_root', description: 'Parent root hash', required:
  false }]" :networks="networks" // Define 'networks' array in script setup :examples="{
  custom: { block_id: 'head' } }" // Provide example values />
  ```
- **`networks` variable:** Define a `networks` array in your `<script setup>` to provide base URLs for different environments (Testnet, Mainnet, Custom).

  ```javascript
  const networks = [
    {
      name: "Testnet (Bepolia)",
      url: "https://bepolia.api-claim.berachain.com",
      id: "bepolia"
    },
    {
      name: "Mainnet",
      url: "https://api-claim.berachain.com",
      id: "mainnet"
    },
    {
      name: "Custom URL",
      url: "", // User can input their own
      id: "custom",
      allowCustomUrl: true
    }
  ];
  ```

### Common Informational Sections

Include general information relevant to the API set:

- **Enabling the API:** If steps are needed to use it.
- **Base URLs:** For different networks/environments.
- **Authentication:** How to authenticate requests.
- **Rate Limiting & Pagination:** Explain any limits or pagination mechanisms.
- **API Values / Data Types:** Explain common data types, statuses, or ID formats (e.g., "All balance values are returned in Gwei").
- **Error Handling:** General error response structure and common error codes.
- **Key Concepts:** Explain any domain-specific concepts crucial for understanding the API (e.g., "Merkle Proofs" in `claim-api.md`).

## 8. Using Custom Vue Components

The documentation utilizes several custom Vue components to enhance presentation and interactivity.

- **Import:** Components are imported in the `<script setup>` block at the top of a markdown file.

```
  ˋˋˋjavascript
  <script setup>
    import Feature from '@berachain/ui/Feature';
    import { IconVocabulary } from '@tabler/icons-vue';
    // ... other imports
  </script>
  ˋˋˋ
```

- **Usage:** Components are used directly in the markdown body with Vue syntax (e.g., `<Feature title="..." />`).
- **Common Components:**
  - `@berachain/ui/Feature`: For feature cards on landing pages.
  - `@berachain/ui/CopyToClipboard`: For copy-to-clipboard functionality.
  - `@berachain/ui/AddNetwork`: (Purpose to be confirmed by usage context).
  - `@tabler/icons-vue`: For iconography.
  - `ApiTester`: For API endpoint interaction.
- When introducing new widely-used custom components, document their props and typical usage in this style guide or a dedicated components guide.

---

This style guide is a living document and will evolve. Please refer back to it and suggest improvements.

## 9. Managing Configuration with `constants.json`

A central configuration file, `constants.json`, located at `bcdocs/packages/config/constants.json`, is used to store values that are shared across multiple documentation pages or are subject to change. This practice ensures consistency and simplifies updates.

### Purpose

- **Single Source of Truth:** Provides a centralized location for common data points such as URLs, dApp names, network parameters (Chain IDs, RPC URLs), contract addresses, and other reusable constants.
- **Maintainability:** When a value changes (e.g., an API endpoint or a dApp URL), it only needs to be updated in `constants.json`, and the change will propagate throughout the documentation.
- **Consistency:** Reduces the risk of typos or outdated information by ensuring all parts of the documentation refer to the same values.

### Location

The file is located at: `bcdocs/packages/config/constants.json`

### Usage in Markdown (`.md` files)

In Markdown files, `constants.json` can be imported and used within `<script setup>` blocks, making its values available to Vue expressions in your page.

1.  **Import the configuration:**

    ```javascript
    <script setup>
      import config from '@berachain/config/constants.json'; // Other imports...
    </script>
    ```

2.  **Use in Vue expressions:**
    You can then access the constants in your template, for example, when using custom components like `<Feature>` or binding to attributes:

    ```vue
    <Feature
      title="Berascan Block Explorer"
      description="Explore Berachain Mainnet transactions and blocks."
      :link="config.mainnet.dapps.berascan.url"
      target="_blank"
    />

    <p>The minimum effective balance is {{ config.mainnet.minEffectiveBalance }} BERA.</p>
    ```

### Usage in TypeScript (`.ts` files)

In TypeScript files, such as `sidebar.ts` or other configuration files within `.vitepress/`, the constants can be imported directly.

1.  **Import the constants:**
    The path alias `@berachain/config/constants` typically resolves to the `constants.json` file.

    ```typescript
    import { constants } from "@berachain/config/constants";
    // Or, depending on TS/Vite config for JSON imports:
    // import constants from '@berachain/config/constants.json';
    ```

2.  **Access values:**
    Use the imported object to access configuration values:

    ```typescript
    {
      text: `${constants.mainnet.dapps.berascan.name}`,
      link: `${constants.mainnet.dapps.berascan.url}`,
      target: "_blank",
      rel: "no-referrer",
    }
    ```

### Benefits

- **Reduced Redundancy:** Avoids hardcoding the same values in multiple places.
- **Simplified Updates:** Makes global changes quick and reliable.
- **Improved Accuracy:** Decreases the likelihood of outdated or inconsistent information.

When adding new reusable links, names, or other constant data points that might be used in more than one place, consider adding them to `constants.json`.
