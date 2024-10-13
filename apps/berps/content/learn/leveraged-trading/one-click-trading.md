# One-Click Trading (1CT)

One-Click Trading or 1CT is a way expedite trades by improving the user experience for traders on Berps.

It allows for traders to create a generated EOA wallet within Berps which can be funded and used to execute trades without the need for an EOA wallet to approve every transaction (approvals, confirmations, etc).

## Benefits & Caveats

The main benefits are user-experience and speed of executing trades.

The main caveat is that the EOA wallet is generated within the browser client. It is recommended that once trading is complete the funds are withdrawn.

:::warning
It is highly recommended to copy the generated _Private Keys_ generated to avoid any potential losses of assets.
:::

## How To Activate 1CT?

To activatge One-Click Trading:

1. Start by clicking **Approve One-Click Trade Wallet**

![Berps 1CT Step1](/assets/berps-1ct-01.png)

2. Select the trading mode for 1CT

![Berps 1CT Step2](/assets/berps-1ct-02.png)

3. Click **Setup One-Click Trading** and click **Sign to Generate 1-CT Wallet**

![Berps 1CT Step3](/assets/berps-1ct-03.png)

4. **Approve** the wallet transactions in the modal

> **NOTE:** Make sure to copy the _Private Key_ and store securely for backup.

![Berps 1CT Step4](/assets/berps-1ct-04.png)

5. Click the **Fund** tab, specify an amount, and click **Fundt** button to add `$BERA` to the wallet

![Berps 1CT Step5](/assets/berps-1ct-05.png)

## How Do I Withdraw My Funds?

To withdraw funds from your 1CT wallet to your connected EOA:

1. Start by clicking **Manage One-Click Trade Wallet**

![Berps 1CT Manage 1CT Wallet](/assets/berps-1ct-06.png)

2. In the modal, click the **withdraw** tab, specify the amount (or max), and click **withdraw**.

![Berps 1CT Withdraw](/assets/berps-1ct-07.png)

## How To Deactivate 1CT?

To deactive the 1CT:

1. Start by clicking **Manage One-Click Trade Wallet**

![Berps 1CT Manage 1CT Wallet](/assets/berps-1ct-06.png)

2. In the modal, click **Revoke** and confirm the transaction

![Berps 1CT Revoke](/assets/berps-1ct-08.png)
