---
head:
  - - meta
    - property: og:title
      content: Build a Frontend
  - - meta
    - name: description
      content: Learn How to Build a Frontend That Interacts With Berachain
  - - meta
    - property: og:description
      content: Learn How to Build a Frontend That Interacts With Berachain
---

# Build a Frontend

In order to make sure that you can connect to the Berachain blockchain, make sure you have your browser wallet configured with to allow you to [Connect to Berachain](/developers/).

This walkthrough will show you how to build a frontend that allows for a wallet connection and makes and RPC request to Berachain for the current block number as defined by [JSON-RPC endpoints](https://geth.ethereum.org/docs/interacting-with-geth/rpc).

The goal of this project is use **Vanilla JavaScript** to interact with Berachain and understand the very basics or JSON-RPC requests.

## Requirements

Before beginning, made sure you have the following setup on your computer:

- VSCode IDE (Recommended)
- NVM or Node `v18.18.2`
- `pnpm`, `yarn`, or `npm`

## Code Setup

Let's start by creating our project folder.

```bash
mkdir frontend-berachain;
cd frontend-berachain;
```

From here we'll instance some dependencies that will allow us to server an HTTP server to view our HTML and JS in a web page.

```bash
# FROM: ./frontend-berachain;

pnpm init;

# [Expected Output]:
# {
#   "name": "frontend-berachain",
#   "version": "1.0.0",
#   "description": "",
#   "main": "index.js",
#   "scripts": {
#     "test": "echo \"Error: no test specified\" && exit 1"
#   },
#   "keywords": [],
#   "author": "",
#   "license": "ISC"
# }
```

Install the dependencies, which will allow us to live reload our page and create an http server.

```bash
# FROM: ./frontend-berachain;

pnpm add -D live-server;
```

Next, we'll create new folder called `app` and create both an `index.html` and `scripts.js` file in it.

```bash
# FROM: ./frontend-berachain;

mkdir app;
touch app/index.html;
touch app/scripts.js;
echo "node_modules" > .gitignore;
git init;
```

Let's modify out index.html to show something in the meantime.

**File:** `./app/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Berachain Frontend</title>
  </head>
  <body>
    <h1>Berachain Frontend</h1>
  </body>
</html>
```

Now let's make it so that we can see these changes by adding a run command to our `package.json`

**File:** `./package.json`

```json
{
  "name": "frontend-berachain",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "./node_modules/.bin/live-server --port=3001 --watch=app --mount=/:./app",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "live-server": "^1.2.2"
  }
}
```

Run our server by running the following command:

```bash
# FROM: ./frontend-berachain;

pnpm dev;

# [Expected Output]:
# Mapping / to "/path/to/frontend-berachain/app"
# Serving "/path/to/frontend-berachain" at http://127.0.0.1:3001
# Ready for changes
```

![Developer Quickstart - Berachain Frontend Initial Page](/assets/berachain-frontend-01.png)

## Creating Our UI

In order to make our UI a bit easier to make, we'll take advantage of [Tailwind](https://tailwindcss.com) from a CDN to adopt its classes for html elements.

To that, we'll modify out `index.html` file by adding a script tag for CDN to Tailwind and adding our `scripts.js` file.

> <b>NOTE:</b> This is optional but makes the overall page look a bit better.

**File:** `./app/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="scripts.js"></script>
    <title>Berachain Frontend</title>
  </head>
  <body class="bg-zinc-900 pt-24 lg:pt-0">
    <main class="p-8">
      <h1 class="text-2xl text-white mb-4">Berachain Frontend</h1>

      <p class="text-zinc-400 mb-4">Must use MetaMask for wallet connection.</p>

      <!-- START: Main interaction to connect our wallet -->
      <div class="mb-6">
        <button
          type="button"
          disabled
          id="button-connect"
          class="h-10 bg-zinc-200 text-zinc-800 px-5 rounded-full font-medium disabled:bg-opacity-30"
        >
          Connect Wallet (Unsupported)
        </button>
        <div
          id="div-error-connect"
          class="mt-4 bg-red-300 rounded p-6 text-red-800 hidden"
        ></div>
      </div>
      <!-- END -->

      <hr class="border-zinc-700 mb-8" />

      <!-- START: Main section that will appear when our wallet is connected -->
      <section id="section-connected" class="hidden">
        <h2 id="wallet-connection" class="text-xl text-zinc-200 mb-4">
          Wallet Connection
        </h2>

        <p class="text-zinc-400 mb-4">
          If you're seeing this then your wallet is connected.
        </p>

        <div class="mb-4">
          <button
            type="button"
            id="button-disconnect"
            class="h-10 mb-2 bg-zinc-200 text-zinc-800 px-5 rounded-full font-medium disabled:bg-opacity-30"
          >
            Disconnect*
          </button>
          <p class="text-sm text-zinc-300">
            <small
              >*Remember you're not really disconnecting unless the wallet
              removes the website from Connected Sites.</small
            >
          </p>
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-zinc-600">Wallet Connected</label>
          <code class="block bg-zinc-500 p-6 rounded bg-zinc-800 text-zinc-200">
            <pre id="pre-wallet-address"></pre>
          </code>
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-zinc-600">Network</label>
          <code class="block bg-zinc-500 p-6 rounded bg-zinc-800 text-zinc-200">
            <pre id="pre-wallet-network"></pre>
          </code>
        </div>

        <hr class="border-zinc-700 mb-8" />

        <h2 id="eth-blocknumber" class="text-xl text-zinc-100 mb-4">
          Get Berachain Block Number
        </h2>

        <p class="text-zinc-400 mb-4">
          Will make a JSON-RPC request to Berachain to retrieve the current
          block number with
          <span class="bg-zinc-700 text-zinc-200 py-1 px-1.5 rounded"
            >eth_blockNumber</span
          >.
        </p>

        <form id="form-eth-blocknumber">
          <div class="mb-4">
            <button
              type="submit"
              class="h-10 mb-2 bg-zinc-200 text-zinc-800 px-5 rounded-full font-medium disabled:bg-opacity-30"
            >
              Get Block Number
            </button>
          </div>

          <!-- Where the results are displayed -->
          <div class="mb-4">
            <label class="block mb-2 text-zinc-600">Response</label>
            <code
              class="block bg-zinc-500 p-6 rounded bg-zinc-800 text-zinc-200"
            >
              <pre id="pre-eth-blocknumber"></pre>
            </code>
          </div>
        </form>
      </section>
      <!-- END -->
    </main>
  </body>
</html>
```

![Developer Quickstart - Berachain Frontend Tailwind](/assets/berachain-frontend-02.png)

## JavaScript Functionality

Now that we have our HTML structure setup, let's add the functionality that would allow us to connect our wallet to the browser.

This will be quite a bit of code, but look through the comments to get a better idea of all the functionality.

**File:** `./app/scripts.js`

```js
// Main Function
// ========================================================
/**
 * Main wallet connection interaction
 */
const connect = async () => {
  console.group("connect");

  // Hide errors when trying to connect
  const devErrorConnect = document.getElementById("div-error-connect");
  devErrorConnect.innerHTML = "";
  devErrorConnect.classList = devErrorConnect.classList.value.includes("hidden")
    ? devErrorConnect.classList.value
    : `${devErrorConnect.classList.value} hidden`;

  // Attempt to connect to wallet with JSON-RPC request
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const chainId = await ethereum.request({ method: "eth_chainId" });

    // Disable connect button
    const buttonConnect = document.getElementById("button-connect");
    buttonConnect.setAttribute("disabled", true);
    buttonConnect.innerHTML = "Connected";

    // Show connected section
    const sectionConnected = document.getElementById("section-connected");
    sectionConnected.classList = "";

    // Display wallet connected
    const preWalletAddress = document.getElementById("pre-wallet-address");
    preWalletAddress.innerHTML = accounts[0];

    // Display current network connected
    const preWalletNetwork = document.getElementById("pre-wallet-network");
    preWalletNetwork.innerHTML = `${chainId}`;
  } catch (error) {
    console.log({ error });
    devErrorConnect.innerHTML =
      error?.message ?? "Unknown wallet connection error.";
    devErrorConnect.classList = devErrorConnect.classList.value.replaceAll(
      "hidden",
      "",
    );
  }
  console.groupEnd();
};

/**
 * Main function that disconnects from the browser
 */
const disconnect = () => {
  console.group("disconnect");

  // Hide connected section
  const sectionConnected = document.getElementById("section-connected");
  sectionConnected.classList = "hidden";

  // Enabled connect button
  const buttonConnect = document.getElementById("button-connect");
  buttonConnect.removeAttribute("disabled");
  buttonConnect.innerHTML = "Connect Wallet";

  console.groupEnd();
};

/**
 * Main function that handles the form request for a read JSON-RPC request
 * @param {*} event
 */
const onSubmitEthBlockNumber = async (event) => {
  event.preventDefault();
  console.group("onSubmitEthBlockNumber");

  // Reset & Set Loading State
  const preEthBlockNumber = document.getElementById("pre-eth-blocknumber");
  const button = document.querySelector(`#${event.currentTarget.id} button`);
  button.setAttribute("disabled", true);
  button.innerHTML = `${button.innerHTML} (Loading...)`;

  // Attempt request for block number
  try {
    const result = await window.ethereum.request({
      method: "eth_blockNumber",
    });

    console.log({ result });

    preEthBlockNumber.innerHTML = `${result}\n\n// Block Number:\n// ${parseInt(
      result,
      16,
    )}`;
  } catch (error) {
    console.log({ error });
    preEthBlockNumber.innerHTML = error?.message ?? "Unknown JSON-RPC error.";
  }

  button.removeAttribute("disabled");
  button.innerHTML = "Get Block Number";
};

// Initial Script Loaded On Window Loaded
// ========================================================
/**
 * Init
 */
window.onload = async () => {
  console.log("WINDOW ONLOAD!");

  // Get All Elements
  const buttonConnect = document.getElementById("button-connect");
  const buttonDisconnect = document.getElementById("button-disconnect");
  const formEthBlockNumber = document.getElementById("form-eth-blocknumber");

  // Add Interactions
  buttonConnect.addEventListener("click", connect);
  buttonDisconnect.addEventListener("click", disconnect);
  formEthBlockNumber.addEventListener("submit", onSubmitEthBlockNumber);

  // Check if browser has wallet integration
  if (typeof window?.ethereum !== "undefined") {
    // Activate elements
    buttonConnect.removeAttribute("disabled");
    buttonConnect.innerHTML = "Connect Wallet";
  }
};
```

Now if we connect with our browser that has a MetaMask setup on it, we can see the following interactions.

> <b>NOTE:</b> Make sure you are set to the Berachain Network in your wallet.

We can connect to the site and see our current wallet address and current chain id.

![Developer Quickstart - Berachain Frontend Wallet Connection](/assets/berachain-frontend-03.png)

If we submit the form and peform an RPC request, we can see the result shown.

![Developer Quickstart - Berachain Frontend JSON-RPC Request Eth Block Bumber](/assets/berachain-frontend-04.png)

## Next Steps

There are quite a few libraries and frameworks that help speed up building dApps, from React, NextJS, Svelte, Wagmi, Ethers, Viem, WalletConnect, and RainbowKit to name a few. See [Developer Tools](/developers/developer-tools) for more.

Now that you understand how to interact with Berachain through a frontend, go through some of the [Developer Guides](/developers/guides/community-guides) to start building out contracts or building other frontend applications.
