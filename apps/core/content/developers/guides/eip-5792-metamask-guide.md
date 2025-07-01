---
head:
  - - meta
    - property: og:title
      content: EIP-5792 MetaMask User Walkthrough
  - - meta
    - name: description
      content: Step-by-step visual guide to using the Berachain EIP-5792 MetaMask demo app
  - - meta
    - property: og:description
      content: Step-by-step visual guide to using the Berachain EIP-5792 MetaMask demo app
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# EIP-5792 MetaMask User Walkthrough

This guide walks you through using the Berachain EIP-5792 demo app for batch token approvals. **This guide requires MetaMask. Other wallets are not supported.**

## Step 1: Landing Page

When you first visit the app, you'll see a welcome screen. Click **Connect Wallet** to begin.

## Step 2: Connect MetaMask

MetaMask will prompt you to connect your wallet. Approve the connection in MetaMask by clicking **Connect** in the popup.

![EIP-5792 Step 2: MetaMask Connect Popup](/assets/eip5792-step2-metamask-connect.jpg)

## Step 3: Set Spender Approvals for HONEY and WBERA

After connecting, you'll see options to set spender approvals for HONEY and WBERA tokens. You can configure the spender address and approval amounts as you wish. This allows you to batch set approvals for multiple tokens in a single transaction.

![EIP-5792 Step 3: Set Approvals](/assets/eip5792-step3-approvals.jpg)

## Step 4: Review Approvals

Before confirming, review the approvals you have set up for HONEY and WBERA. You should see both tokens listed and a prompt at the bottom of the page to approve 2 tokens in a single batch transaction.

![EIP-5792 Step 4: Review Approvals](/assets/eip5792-step4-approvals-review.jpg)

## Step 5: Enable Smart Account (If Prompted)

Before confirming the batch approval, you may be prompted to enable the smart account feature in MetaMask. **This step is required if you have not already enabled the smart account.**

![EIP-5792 Step 5: Enable Smart Account](/assets/eip5792-step5-enable-smart-account.jpg)

:::danger
If you do **not** accept this prompt, you will **not** be prompted again and will not be able to use batch approvals. It is **incredibly important** to accept this step to proceed with EIP-5792 batch transactions.
:::

## Step 6: Confirm in MetaMask

MetaMask will show a confirmation for the batch transaction. In the confirmation popup, you should see multiple token approvals (for HONEY and WBERA) listed in the **Estimated changes** section. Review these details and confirm the transaction in MetaMask.

![EIP-5792 Step 6: MetaMask Confirmation](/assets/eip5792-step6-metamask-confirm.jpg)

## Step 7: Success

After confirming the transaction, you'll see a success message in the app. You can also view your transaction on Berascan to verify the approvals were processed.

![EIP-5792 Step 7: Success](/assets/eip5792-step7-success.jpg)

[View example transaction on Berascan](https://testnet.berascan.com/tx/0x87c43caa62aa2996928a297d379375437bc681c33795fde96264f0557359c936#eventlog)

---

## Troubleshooting & Tips

- **Only MetaMask is supported.**
- If you don't see the MetaMask popup, check your browser or MetaMask extension.
- Make sure you're on the correct network (e.g., Berachain testnet).
- If you encounter issues, try refreshing the page and reconnecting your wallet.

## Want to see how it works under the hood?

[View the full demo app source code](https://github.com/berachain/guides/tree/main/apps/eip-5792).
