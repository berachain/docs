---
head:
  - - meta
    - property: og:title
      content: Berascan Token Update Guide
  - - meta
    - name: description
      content: Learn how to update token information on Berascan, the Berachain block explorer
  - - meta
    - property: og:description
      content: Learn how to update token information on Berascan, the Berachain block explorer
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Berascan Token Update Guide

This guide explains how to update token information on Berascan, Berachain's official block explorer.

## Overview

Token information on Berascan includes details like:

- Basic project information (name, website, email)
- Social media profiles and links
- Price data sources (CoinMarketCap, CoinGecko)
- Token sale details (ICO/IEO information)
- Project documentation and resources

## How to Update Token Information

### Step 1: Create an Account

If you don't have a Berascan account:

1. **Visit the registration page**: [https://berascan.com/register](https://berascan.com/register)
2. **Sign up** with your email address
3. **Verify your email** to activate your account

### Step 2: Verify Token Ownership

Before you can update token information, you need to verify that you own the token contract:

1. **Access the owner verification tool**: [https://berascan.com/verifyAddress/](https://berascan.com/verifyAddress/)
2. **Follow the verification process** to prove ownership of the token contract

![Berascan Owner Verification Process](/assets/berascan-owner-verification.png)

3. **Create the signature** as prompted by the verification tool
4. **Submit the verification** - After creating the signature, you will be prompted to submit the verification

![Berascan Verification Submission](/assets/berascan-verification-submission.png)

5. **Complete the verification** to gain access to token update features

:::tip Owner Verification Process
The owner verification process involves proving that you control the private key for the token contract address. This ensures that only authorized token creators can update token information on Berascan.
:::

### Step 3: Access the Token Update Page

1. **Log in** to your Berascan account
2. **Navigate to the token update page**: [https://berascan.com/tokenupdate](https://berascan.com/tokenupdate)

:::warning Important Notice
Before submitting your token information, please review Berascan's requirements carefully. Your submission may not receive a reply if any requirements are not met.
:::

**Mandatory Information Required:**

- Website: Official project website
- Email: Contact email matching your website domain (e.g., contact@yourdomain.com)
- Logo: 32x32 SVG format logo

**Website Requirements:**
Your official website must be accessible and safe to visit, have all working links and updated content, and contain clear information about your project/token.

**Contract Requirements:**

- Must adhere to ERC-20 specifications
- Must be valid and correctly deployed on Berachain
- Must be the correct contract address for your project

**Project Requirements:**

- Name, symbol, and branding must not infringe on existing brands
- Must not be fraudulent or misrepresent other entities
- Team members must be clearly presented with professional profile links
- Must be deployed and operating on the Berachain blockchain

:::warning Submission Policy
These requirements do not guarantee approval. Berascan reserves the right to remove or update information if false details or discrepancies are found.
:::

### Step 4: Update Your Token Information

On the token update page, you can:

- **Request Type**: Choose between new/first-time updates or other categories
- **Basic Information**: Project name, website, email addresses, and logo

![Berascan Basic Information Form](/assets/berascan-basic-information-form.png)

- **Social Profiles**: Links to official social media pages (GitHub, Telegram, Discord, etc.)

![Berascan Social Profiles Form](/assets/berascan-social-profiles-form.png)

- **Price Data**: CoinMarketCap and CoinGecko ticker links
- **Token Sale Details**: ICO/IEO information, pricing, allocation, and vesting periods

### Step 5: Submit Changes

1. **Review your changes** to ensure accuracy
2. **Submit the update request**
3. **Wait for approval** from the Berascan team
4. **Changes will be reflected** on the token page once approved
