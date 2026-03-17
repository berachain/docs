.PHONY: help dev validate broken-links a11y check contracts-generate mint-install broken-assets

help:
	@echo "Common docs tasks:"
	@echo "  make dev                # Run local Mintlify server (http://localhost:3000)"
	@echo "  make validate           # Validate docs build"
	@echo "  make broken-links       # Check for broken links"
	@echo "  make broken-assets      # Check /assets for orphaned + missing refs"
	@echo "  make a11y               # Run accessibility checks"
	@echo "  make check              # Run validate + broken-links + a11y"
	@echo "  make contracts-generate # Regenerate contract pages/snippets from data/contracts.json"
	@echo "  make mint-install       # Install Mintlify CLI globally via npm"

dev:
	mint dev

validate:
	mint validate

broken-links:
	mint broken-links

a11y:
	mint a11y

check: validate broken-links a11y

contracts-generate:
	node scripts/contracts/generate-pages.mjs

mint-install:
	npm i -g mint

broken-assets:
	@assets_file_list="$$(mktemp)"; \
	assets_ref_list="$$(mktemp)"; \
	rg --files assets | sed 's#^assets#/assets#' | sort -u > "$$assets_file_list"; \
	rg -o --no-filename '/assets/[A-Za-z0-9._/-]+' . --glob '*.mdx' --glob '*.md' --glob '*.json' | sort -u > "$$assets_ref_list"; \
	orphans="$$(comm -23 "$$assets_file_list" "$$assets_ref_list")"; \
	missing="$$(comm -23 "$$assets_ref_list" "$$assets_file_list")"; \
	rm -f "$$assets_file_list" "$$assets_ref_list"; \
	if [ -n "$$orphans" ]; then \
		echo "❌ Orphaned assets found:"; \
		printf '%s\n' "$$orphans"; \
		failed=1; \
	fi; \
	if [ -n "$$missing" ]; then \
		echo "❌ Missing asset references found:"; \
		printf '%s\n' "$$missing"; \
		failed=1; \
	fi; \
	if [ -n "$$failed" ]; then \
		exit 1; \
	fi; \
	echo "✅ No orphaned or missing asset references found."
