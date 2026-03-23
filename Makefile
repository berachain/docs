.PHONY: help dev check check-validate check-links check-assets check-a11y check-redirects contracts-generate mint-install

help:
	@echo "Common docs tasks:"
	@echo "  make dev                # Run local Mintlify server (http://localhost:3000)"
	@echo "  make check              # Run all checks (validate, links, assets, a11y, redirects)"
	@echo "  make check-validate     # Validate docs build"
	@echo "  make check-links        # Check for broken links"
	@echo "  make check-assets       # Check /images for orphaned + missing refs"
	@echo "  make check-a11y         # Run accessibility checks"
	@echo "  make check-redirects    # Verify all redirects land on HTTP 200 (needs running server)"
	@echo "                          # Override port: BASE_URL=http://localhost:3335 make check-redirects"
	@echo "  make contracts-generate # Regenerate contract pages/snippets from data/contracts.json"
	@echo "  make mint-install       # Install Mintlify CLI globally via npm"

dev:
	mint dev

check: check-validate check-links check-assets check-a11y check-redirects

check-validate:
	mint validate

check-links:
	mint broken-links

check-a11y:
	mint a11y

check-redirects:
	bash scripts/check-redirects.sh $${BASE_URL:-http://localhost:3000}

check-assets:
	@assets_file_list="$$(mktemp)"; \
	assets_ref_list="$$(mktemp)"; \
	rg --files images | sed 's#^images#/images#' | sort -u > "$$assets_file_list"; \
	rg -o --no-filename '/images/[A-Za-z0-9._/-]+' . --glob '*.mdx' --glob '*.md' --glob '*.json' | sort -u > "$$assets_ref_list"; \
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

contracts-generate:
	node scripts/contracts/generate-pages.mjs

mint-install:
	npm i -g mint
