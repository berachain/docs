#!/usr/bin/env python3
"""
Test script to verify ABI references in rendered documentation.

This script can work in two modes:
1. Build mode: Builds the docs and checks the static HTML output
2. Dev server mode: Starts dev server and fetches pages (requires manual server start)

Usage:
    # Build mode (recommended for CI)
    pnpm build
    pytest tests/test_abi_references.py

    # Dev server mode (for local testing)
    pnpm dev &  # Start in background
    pytest tests/test_abi_references.py --dev-server http://localhost:55173
"""

import pytest
import requests
from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse


class TestABIReferences:
    """Test that ABI references are present and correct in rendered docs."""

    @pytest.fixture
    def base_url(self, request):
        """Get base URL from pytest option or default to build output."""
        dev_url = request.config.getoption("--dev-server", default=None)
        if dev_url:
            return dev_url.rstrip("/")
        
        # Default to build output - check if at least one dist directory exists
        docs_root = Path(__file__).parent.parent
        build_dirs = [
            docs_root / "apps" / "core" / ".vitepress" / "dist",
            docs_root / "apps" / "bex" / ".vitepress" / "dist",
            docs_root / "apps" / "bend" / ".vitepress" / "dist"
        ]
        if not any(d.exists() for d in build_dirs):
            pytest.skip("Build output not found. Run 'pnpm build' first or use --dev-server")
        return None  # Will use file paths instead

    @pytest.fixture
    def pages_to_test(self):
        """List of pages that should contain ABI references."""
        docs_root = Path(__file__).parent.parent
        return [
            {
                "path": "/developers/deployed-contracts",
                "file": docs_root / "apps/core/.vitepress/dist/developers/deployed-contracts.html",
                "name": "Core deployed contracts"
            },
            {
                "path": "/developers/index",
                "file": docs_root / "apps/bex/.vitepress/dist/developers/index.html",
                "name": "BEX deployed contracts"
            },
            {
                "path": "/developers/deployed-contracts",
                "file": docs_root / "apps/bend/.vitepress/dist/developers/deployed-contracts.html",
                "name": "Bend deployed contracts"
            }
        ]

    def get_html(self, base_url, page_info):
        """Get HTML content from either dev server or build output."""
        if base_url:
            # Dev server mode - VitePress uses clean URLs (no .html extension)
            url = urljoin(base_url, page_info["path"])
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            return response.text
        else:
            # Build output mode - files are .html in dist folder
            file_path = page_info["file"]
            if not file_path.exists():
                pytest.skip(f"Build output not found: {file_path}. Run 'pnpm build' first.")
            return file_path.read_text(encoding="utf-8")

    def test_abi_references_present(self, base_url, pages_to_test):
        """Test that ABI references are present on all deployed contracts pages."""
        for page_info in pages_to_test:
            html = self.get_html(base_url, page_info)
            soup = BeautifulSoup(html, "html.parser")
            
            # Find the blockquote containing ABI references
            blockquotes = soup.find_all("blockquote")
            abi_blockquote = None
            
            for bq in blockquotes:
                text = bq.get_text()
                if "Contract ABIs" in text and "Mainnet ABIs" in text:
                    abi_blockquote = bq
                    break
            
            assert abi_blockquote is not None, \
                f"ABI references blockquote not found on {page_info['name']}"

    def test_mainnet_abi_link(self, base_url, pages_to_test):
        """Test that mainnet ABI link is present and correct."""
        expected_url = "https://github.com/berachain/abis/tree/main/mainnet/contracts"
        
        for page_info in pages_to_test:
            html = self.get_html(base_url, page_info)
            soup = BeautifulSoup(html, "html.parser")
            
            # Find link to mainnet ABIs
            links = soup.find_all("a", href=True)
            mainnet_link = None
            
            for link in links:
                if expected_url in link.get("href", ""):
                    mainnet_link = link
                    break
            
            assert mainnet_link is not None, \
                f"Mainnet ABI link not found on {page_info['name']}"
            
            # Verify link text is descriptive
            link_text = mainnet_link.get_text(strip=True)
            assert "abis" in link_text.lower() or "mainnet" in link_text.lower(), \
                f"Mainnet ABI link text should be descriptive on {page_info['name']}"

    def test_testnet_abi_link(self, base_url, pages_to_test):
        """Test that testnet/documentation ABI link is present and correct."""
        expected_url = "https://github.com/berachain/doc-abis"
        
        for page_info in pages_to_test:
            html = self.get_html(base_url, page_info)
            soup = BeautifulSoup(html, "html.parser")
            
            # Find link to testnet/doc-abis
            links = soup.find_all("a", href=True)
            testnet_link = None
            
            for link in links:
                if expected_url in link.get("href", ""):
                    testnet_link = link
                    break
            
            assert testnet_link is not None, \
                f"Testnet/Documentation ABI link not found on {page_info['name']}"

    def test_abi_links_accessible(self):
        """Test that ABI repository links are accessible."""
        urls = [
            "https://github.com/berachain/abis/tree/main/mainnet/contracts",
            "https://github.com/berachain/doc-abis"
        ]
        
        for url in urls:
            response = requests.head(url, timeout=10, allow_redirects=True)
            assert response.status_code == 200, \
                f"ABI repository link not accessible: {url} (status: {response.status_code})"

    def test_abi_references_distinction(self, base_url, pages_to_test):
        """Test that mainnet and testnet ABIs are clearly distinguished."""
        for page_info in pages_to_test:
            html = self.get_html(base_url, page_info)
            soup = BeautifulSoup(html, "html.parser")
            
            # Get all text content
            text = soup.get_text()
            
            # Should contain both labels
            assert "Mainnet ABIs" in text, \
                f"'Mainnet ABIs' label not found on {page_info['name']}"
            assert "Testnet" in text or "Documentation" in text, \
                f"Testnet/Documentation label not found on {page_info['name']}"


def pytest_addoption(parser):
    """Add command-line option for dev server URL."""
    parser.addoption(
        "--dev-server",
        action="store",
        default=None,
        help="Base URL of dev server (e.g., http://localhost:55173). If not provided, uses build output."
    )
