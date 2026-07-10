#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsConfigPath = path.join(repoRoot, "docs.json");
const outputPath = path.join(repoRoot, "llms.txt");
const checkMode = process.argv.includes("--check");

const docsConfig = JSON.parse(fs.readFileSync(docsConfigPath, "utf8"));
const siteName = normalizeInlineText(docsConfig.name || "Documentation");
const siteDescription = normalizeInlineText(docsConfig.description || "");
const siteUrl = normalizeSiteUrl(docsConfig.logo?.href || "https://docs.berachain.com");

const pagePaths = collectPagePaths(docsConfig.navigation?.tabs || []);
const lines = pagePaths.map(renderPageLine).filter(Boolean);
const nextContent = `${[`# ${siteName}`, siteDescription ? `> ${siteDescription}` : "", "## Docs", lines.join("\n")]
  .filter(Boolean)
  .join("\n\n")}\n`;
const prevContent = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : null;

if (prevContent === nextContent) {
  console.log(`Unchanged ${path.relative(repoRoot, outputPath)}`);
  process.exit(0);
}

if (checkMode) {
  console.error("llms.txt is stale. Run: node scripts/generate-llms.mjs");
  process.exit(1);
}

fs.writeFileSync(outputPath, nextContent);
console.log(`Generated ${path.relative(repoRoot, outputPath)}`);

function collectPagePaths(tabs) {
  const seen = new Set();

  function addPagePath(pagePath) {
    if (typeof pagePath !== "string" || !pagePath.trim()) {
      return;
    }
    seen.add(pagePath);
  }

  function visitPage(entry) {
    if (typeof entry === "string") {
      addPagePath(entry);
      return;
    }

    if (!entry || typeof entry !== "object") {
      return;
    }

    addPagePath(entry.root);

    if (Array.isArray(entry.pages)) {
      entry.pages.forEach(visitPage);
    }
  }

  for (const tab of tabs) {
    for (const group of tab.groups || []) {
      for (const page of group.pages || []) {
        visitPage(page);
      }
    }
  }

  return Array.from(seen).sort((left, right) => left.localeCompare(right));
}

function renderPageLine(pagePath) {
  const meta = readPageMeta(pagePath);
  if (!meta) {
    console.warn(`Skipping ${pagePath}; missing source file`);
    return "";
  }

  const label = meta.title || slugToTitle(pagePath);
  const description = meta.description ? `: ${meta.description}` : "";
  return `- [${label}](${siteUrl}/${pagePath}.md)${description}`;
}

function readPageMeta(pagePath) {
  const filePath = resolvePageFile(pagePath);
  if (!filePath) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);

  const title =
    extractFrontmatterValue(frontmatter, "title") ||
    extractHeadMetaContent(frontmatter, "og:title") ||
    extractFirstHeading(body) ||
    slugToTitle(pagePath);
  const description =
    extractFrontmatterValue(frontmatter, "description") ||
    extractHeadDescription(frontmatter) ||
    extractFirstParagraph(body);

  return {
    title: normalizeInlineText(title),
    description: normalizeInlineText(description)
  };
}

function resolvePageFile(pagePath) {
  for (const extension of [".mdx", ".md"]) {
    const absolutePath = path.join(repoRoot, `${pagePath}${extension}`);
    if (fs.existsSync(absolutePath)) {
      return absolutePath;
    }
  }

  return null;
}

function splitFrontmatter(raw) {
  if (!raw.startsWith("---\n")) {
    return { frontmatter: "", body: raw };
  }

  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) {
    return { frontmatter: "", body: raw };
  }

  return {
    frontmatter: raw.slice(4, end),
    body: raw.slice(end + 5)
  };
}

function extractFrontmatterValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return match ? stripWrappingQuotes(match[1].trim()) : "";
}

function extractHeadMetaContent(frontmatter, property) {
  const lines = frontmatter.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].includes(property)) {
      continue;
    }

    for (let nextIndex = index + 1; nextIndex < Math.min(index + 4, lines.length); nextIndex += 1) {
      const match = lines[nextIndex].match(/^\s*content:\s*(.+)$/);
      if (match) {
        return stripWrappingQuotes(match[1].trim());
      }
    }
  }

  return "";
}

function extractHeadDescription(frontmatter) {
  const lines = frontmatter.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    if (!lines[index].match(/^\s*-?\s*name:\s*description\s*$/)) {
      continue;
    }

    for (let nextIndex = index + 1; nextIndex < Math.min(index + 4, lines.length); nextIndex += 1) {
      const match = lines[nextIndex].match(/^\s*content:\s*(.+)$/);
      if (match) {
        return stripWrappingQuotes(match[1].trim());
      }
    }
  }

  return "";
}

function extractFirstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "";
}

function extractFirstParagraph(body) {
  const lines = body.split("\n");
  const paragraph = [];
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    if (!paragraph.length && trimmed.startsWith("## ")) {
      return "";
    }

    if (!trimmed) {
      if (paragraph.length) {
        break;
      }
      continue;
    }

    if (!paragraph.length && shouldSkipParagraphLine(trimmed)) {
      continue;
    }

    paragraph.push(trimmed);
  }

  return paragraph.join(" ");
}

function shouldSkipParagraphLine(line) {
  return (
    line.startsWith("#") ||
    line.startsWith("<") ||
    line.startsWith("import ") ||
    line.startsWith("export ") ||
    line.startsWith(":::") ||
    line.startsWith("|") ||
    /^[-*+]\s/.test(line) ||
    /^\d+\.\s/.test(line)
  );
}

function normalizeInlineText(value) {
  return String(value || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\\\$/g, "$")
    .replace(/\s+/g, " ")
    .trim();
}

function stripWrappingQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function slugToTitle(pagePath) {
  const slug = pagePath.split("/").at(-1) || pagePath;
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeSiteUrl(url) {
  return String(url || "https://docs.berachain.com").replace(/\/+$/, "");
}
