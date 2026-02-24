import { useState, useEffect } from "react";

const LOG_PREFIX = "[AddNetwork]";

export const AddNetwork = (props) => {
  const {
    chainId = 80094,
    chainName = "Berachain",
    nativeCurrencyName = "BERA Token",
    nativeCurrencySymbol = "BERA",
    nativeCurrencyDecimals = 18,
    rpcUrl = "https://rpc.berachain.com/",
    blockExplorerUrl = "https://berascan.com/",
    isTestnet = false,
  } = props || {};

  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    const hasEthereum = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
    setHasWallet(!!hasEthereum);
    if (typeof console !== "undefined" && console.log) {
      console.log(LOG_PREFIX + " wallet detected:", !!hasEthereum);
    }
  }, []);

  const addNetwork = () => {
    if (!hasWallet || typeof window === "undefined" || !window.ethereum) {
      if (typeof console !== "undefined" && console.warn) {
        console.warn(LOG_PREFIX + " addNetwork called but no wallet available");
      }
      return;
    }
    const hexChainId = "0x" + Number(chainId).toString(16);
    const params = {
      chainId: hexChainId,
      chainName: String(chainName),
      nativeCurrency: {
        name: String(nativeCurrencyName),
        symbol: String(nativeCurrencySymbol),
        decimals: Number(nativeCurrencyDecimals),
      },
      rpcUrls: [String(rpcUrl)],
      blockExplorerUrls: [String(blockExplorerUrl)],
    };
    if (typeof console !== "undefined" && console.log) {
      console.log(LOG_PREFIX + " addNetwork click", { chainName, isTestnet, chainId: hexChainId, rpcUrl, blockExplorerUrl, fullParams: params });
    }
    window.ethereum
      .request({ method: "wallet_addEthereumChain", params: [params] })
      .then(function (result) {
        if (typeof console !== "undefined" && console.log) {
          console.log(LOG_PREFIX + " wallet_addEthereumChain result:", result);
        }
      })
      .catch(function (err) {
        if (typeof console !== "undefined" && console.error) {
          console.error(LOG_PREFIX + " wallet_addEthereumChain error:", err);
        }
      });
  };

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "140px",
    height: "44px",
    padding: "0 16px",
    borderRadius: "8px",
    borderWidth: "2px",
    fontWeight: 600,
    cursor: "pointer",
  };

  if (!hasWallet) {
    return (
      <button
        type="button"
        disabled
        style={{
          ...baseStyle,
          backgroundColor: "#4b5563",
          color: "#d1d5db",
          borderColor: "#6b7280",
          cursor: "not-allowed",
          opacity: 0.8,
        }}
      >
        Wallet not detected
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={addNetwork}
      style={{
        ...baseStyle,
        backgroundColor: "#E17726",
        color: "#1a1a1a",
        borderColor: "#c96516",
        boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
      }}
    >
      Add {chainName}
    </button>
  );
};
