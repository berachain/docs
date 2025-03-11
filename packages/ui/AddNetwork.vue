<!-- 
Scripts 
========================================================
-->
<script setup>
    import { ref } from 'vue';

    var wallet = ref(false);
    if (typeof window?.ethereum !== 'undefined') {
      wallet = ref(true)
    }

    const props = defineProps({
      testnet: Boolean,
      chainName: String,
      chainId: Number,
      nativeCurrencyName: String,
      nativeCurrencySymbol: String,
      nativeCurrencyDecimals: {
        type: Number,
        default: 18
      },
      rpcUrl: String,
      blockExplorerUrl: String
    });

    /**
     * Main function that adds wallet configuration
     */
    const addNetwork = () => {
      if (!wallet) {
        return;
      }
      window?.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: "0x" + (props?.chainId ?? 0).toString(16),
            chainName: props?.chainName,
            nativeCurrency: {
              name: props.nativeCurrencyName,
              symbol: props.nativeCurrencySymbol,
              decimals: props?.nativeCurrencyDecimals
            },
            rpcUrls: [props.rpcUrl],
            blockExplorerUrls: [props.blockExplorerUrl]
          }
        ]
      })
    }
</script>

<!-- 
Template 
========================================================
-->
<template>
  <button
    class="type-primaryw-iconresting-type-primaryw-iconresting" 
    v-if="wallet" v-on:click="addNetwork">
    <span>Add {{ props?.chainName }}</span>
  </button>
  <button
    class="type-primaryw-iconresting-type-primaryw-iconresting" 
    disabled
    v-else>
    Wallet Not Supported
  </button>
</template>

<!-- 
Styles 
========================================================
-->
<style>
  .type-primaryw-iconresting-type-primaryw-iconresting {
    font-weight: 600;
    text-align: left;
    color: rgb(44, 26, 22);
    border-radius: 8px;
    height: 44px;
    width: auto;
    align-items: center;
    justify-content: center;
    display: inline-flex;
    gap: 4px;
    box-shadow: 0px 0px 0px 1px #dbb180f5 inset;
    background: var(--vp-c-brand-2);
    padding-right: 16px;
    padding-left: 16px;
    padding-bottom: 8px;
    padding-top: 8px;
    box-sizing: border-box;
    font-size: 18px;
    line-height: 28px;
  }

  .type-primaryw-iconresting-type-primaryw-iconresting[disabled] {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .type-primaryw-iconresting-type-primaryw-iconresting[disabled]:hover {
    background: var(--vp-c-brand-3);
  }

  .type-primaryw-iconresting-type-primaryw-iconresting:hover {
    background-image: -webkit-linear-gradient(117deg,#FF8A00F5 25%,#FFC738);
  }
</style>