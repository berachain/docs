---
head:
  - - meta
    - property: og:title
      content: Berachain Local Devnet With Kurtosis
  - - meta
    - name: description
      content: Setup a local Berachain devnet with Kurtosis
  - - meta
    - property: og:description
      content: Setup a local Berachain devnet with Kurtosis acti
---

<script setup>
    import config from '@berachain/config/constants.json';
    import AddNetwork from '@berachain/ui/AddNetwork';
    import CopyToClipboard from '@berachain/ui/CopyToClipboard';
</script>

# Berachain Local Devnet With Kurtosis

The following guide will walk you through setting up a local Berachain devnet.

:::warning
Some features like native dApps, contracts, and more may still be a work in progress.
:::

## Requirements

Before starting, ensure that you have the following installed on your computer.

- [Docker](https://docs.docker.com/get-docker/) `version 25.0.2` or greater
- [Kurtosis](https://docs.kurtosis.com/install) `v0.90.1` or greater
- [Foundry](https://book.getfoundry.sh/getting-started/installation) `v0.2.0` or greater - (For testing purposes)

## Kurtosis Local Devnet

Going through this process will set up and run multiple services, execution clients, block explorers, databases, and more.

:::warning
This may require a decent amount of resources to run, and if you run into limits, modify the yaml configuration file to limit the number of services.
:::

If you run the default Kurtosis configuration, it will run the following:

- 5 validator nodes
- 3 full nodes
- 6 additional services

You can modify the [beaconkit-local.yaml](https://github.com/berachain/beacon-kit/blob/main/kurtosis/beaconkit-local.yaml) to fit your system requirements.

### Step 1 - Clone Repository & Run Nodes

The first step is to clone the Beacon-Kit repository.

```bash
git clone https://github.com/berachain/beacon-kit;
cd beacon-kit;
```

After cloning the repository, run `make start-devnet`.

:::tip
If you encounter issues, please see [Debugging Issues](#debugging-issues).
:::

```bash
# FROM: ./beacon-kit

make start-devnet;

# [Expected Output]:
# Checking for Kurtosis installation...
# Kurtosis is already installed
# /Applications/Xcode.app/Contents/Developer/usr/bin/make build-docker VERSION=kurtosis-local start-devnet-no-build
# Build a release docker image for the Cosmos SDK chain...
# docker build \
# 	--platform linux/arm64 \
# 	--build-arg GIT_COMMIT=f3738205bcd8c91f3c262618b078eeefb48a67f3 \
# 	--build-arg GIT_VERSION=kurtosis-local \
# 	--build-arg GIT_BRANCH=main \
# 	--build-arg GOOS=linux \
# 	--build-arg GOARCH=arm64 \
# 	-f ./Dockerfile \
# 	-t beacond:kurtosis-local \
# 	.
# [+] Building 26.0s (33/41)
# ...
# Starlark code successfully run. No output was returned.
#
# ⭐ us on GitHub - https://github.com/kurtosis-tech/kurtosis
# INFO[2024-06-27T00:16:11-04:00] ========================================================
# INFO[2024-06-27T00:16:11-04:00] ||          Created enclave: my-local-devnet          ||
# INFO[2024-06-27T00:16:11-04:00] ========================================================
# Name:            my-local-devnet
# UUID:            3c23eccb8c64
# Status:          RUNNING
# Creation Time:   Thu, 27 Jun 2024 00:14:55 EDT
# Flags:
#
# ========================================= Files Artifacts =========================================
# UUID           Name
# b5aae73c6271   ancient-butterfly
# 601914df8eea   cosmos-genesis-final
# 2c8346b3df40   el_cl_genesis_data
# 38571b521297   genesis_file
# 978405cf0e0f   geth-config
# 46c4a6d9988e   jwt_file
# 39ab7b9e6b01   kzg_trusted_setup
# 0f6148946b08   multiple-premined-deposits
# c59bf8b35b60   nether_genesis_file
# 0c84ab86dd73   nethermind-config
# e965d7a7faa0   node-beacond-config-0
# 030b600e169c   node-beacond-config-1
# 8d644e614430   node-beacond-config-2
# 618d91e2218d   node-beacond-config-3
# 447d51638f49   node-beacond-config-4
# 7d656edde80a   prometheus-config
# 9d93c25b6424   reth-config
# 3e7411b9e325   vast-storm
#
# ========================================== User Services ==========================================
# UUID           Name                        Ports                                                  Status
# 79f7561b4b43   blockscout                  http: 4000/tcp -> http://127.0.0.1:53414               RUNNING
# 26c02bed0a42   blockscout-postgres         postgresql: 5432/tcp -> postgresql://127.0.0.1:53306   RUNNING
# fd16c170438f   blockscout-verif            http: 8050/tcp -> http://127.0.0.1:53345               RUNNING
# f545ea9b37d9   blutgang                    admin: 5715/tcp -> http://127.0.0.1:52505              RUNNING
#                                            http: 3000/tcp -> http://127.0.0.1:52506
# b018cf002dc9   cl-full-beaconkit-0         cometbft-grpc: 9090/tcp -> 127.0.0.1:51243             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:51245
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:51244
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:51246
#                                            metrics: 26660/tcp -> 127.0.0.1:51247
# e2e1c5b99640   cl-full-beaconkit-1         cometbft-grpc: 9090/tcp -> 127.0.0.1:51235             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:51237
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:51236
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:51233
#                                            metrics: 26660/tcp -> 127.0.0.1:51234
# 85954427d8ed   cl-full-beaconkit-2         cometbft-grpc: 9090/tcp -> 127.0.0.1:51239             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:51241
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:51240
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:51242
#                                            metrics: 26660/tcp -> 127.0.0.1:51238
# 01c06ac63cdf   cl-seed-beaconkit-0         cometbft-grpc: 9090/tcp -> 127.0.0.1:51194             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:51191
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:51195
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:51192
#                                            metrics: 26660/tcp -> 127.0.0.1:51193
# 0f4df1fc5824   cl-validator-beaconkit-0    cometbft-grpc: 9090/tcp -> 127.0.0.1:52318             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:52315
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:52314
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:52316
#                                            metrics: 26660/tcp -> 127.0.0.1:52317
# 81d2e6091425   cl-validator-beaconkit-1    cometbft-grpc: 9090/tcp -> 127.0.0.1:52321             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:52323
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:52322
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:52319
#                                            metrics: 26660/tcp -> 127.0.0.1:52320
# 31ac5a4a8367   cl-validator-beaconkit-2    cometbft-grpc: 9090/tcp -> 127.0.0.1:52342             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:52339
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:52338
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:52340
#                                            metrics: 26660/tcp -> 127.0.0.1:52341
# 16a9f7c56f2c   cl-validator-beaconkit-3    cometbft-grpc: 9090/tcp -> 127.0.0.1:52332             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:52329
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:52328
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:52330
#                                            metrics: 26660/tcp -> 127.0.0.1:52331
# 350ad296d808   cl-validator-beaconkit-4    cometbft-grpc: 9090/tcp -> 127.0.0.1:52337             RUNNING
#                                            cometbft-p2p: 26656/tcp -> 127.0.0.1:52334
#                                            cometbft-rest: 1317/tcp -> 127.0.0.1:52333
#                                            cometbft-rpc: 26657/tcp -> 127.0.0.1:52335
#                                            metrics: 26660/tcp -> 127.0.0.1:52336
# 6e118e6069ea   el-full-geth-2              engine-rpc: 8551/tcp -> 127.0.0.1:51205                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51208
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51204
#                                            metrics: 9001/tcp -> 127.0.0.1:51206
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51207
#                                            udp-discovery: 30303/udp -> 127.0.0.1:62535
# a02f6e9ffb57   el-full-reth-0              engine-rpc: 8551/tcp -> 127.0.0.1:51216                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51214
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51215
#                                            metrics: 9001/tcp -> 127.0.0.1:51217
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51218
#                                            udp-discovery: 30303/udp -> 127.0.0.1:63859
# 66ec4f86f9a8   el-full-reth-1              engine-rpc: 8551/tcp -> 127.0.0.1:51211                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51209
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51210
#                                            metrics: 9001/tcp -> 127.0.0.1:51212
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51213
#                                            udp-discovery: 30303/udp -> 127.0.0.1:52493
# 985f34bb632c   el-seed-reth-0              engine-rpc: 8551/tcp -> 127.0.0.1:51178                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51181
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51182
#                                            metrics: 9001/tcp -> 127.0.0.1:51179
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51180
#                                            udp-discovery: 30303/udp -> 127.0.0.1:64586
# ff5d4880de7e   el-validator-besu-0         engine-rpc: 8551/tcp -> 127.0.0.1:51449                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51452
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51453
#                                            metrics: 9001/tcp -> 127.0.0.1:51450
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51451
#                                            udp-discovery: 30303/udp -> 127.0.0.1:55464
# 3677d9c2ab08   el-validator-erigon-4       engine-rpc: 8551/tcp -> 127.0.0.1:51416                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51419
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51415
#                                            metrics: 9001/tcp -> 127.0.0.1:51417
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51418
#                                            udp-discovery: 30303/udp -> 127.0.0.1:52140
# 8a8d0605d110   el-validator-geth-3         engine-rpc: 8551/tcp -> 127.0.0.1:51456                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51454
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51455
#                                            metrics: 9001/tcp -> 127.0.0.1:51457
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51458
#                                            udp-discovery: 30303/udp -> 127.0.0.1:57790
# 27c61431bf07   el-validator-nethermind-1   engine-rpc: 8551/tcp -> 127.0.0.1:51440                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51443
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51444
#                                            metrics: 9001/tcp -> 127.0.0.1:51441
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51442
#                                            udp-discovery: 30303/udp -> 127.0.0.1:60619
# bb829e4f06e5   el-validator-reth-2         engine-rpc: 8551/tcp -> 127.0.0.1:51423                RUNNING
#                                            eth-json-rpc: 8545/tcp -> 127.0.0.1:51421
#                                            eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:51422
#                                            metrics: 9001/tcp -> 127.0.0.1:51424
#                                            tcp-discovery: 30303/tcp -> 127.0.0.1:51420
#                                            udp-discovery: 30303/udp -> 127.0.0.1:52707
# cc6bfe221c4e   goomy-blob-spammer          <none>                                                 RUNNING
# 6e417d31c1dd   grafana                     dashboards: 3000/tcp -> http://127.0.0.1:52841         RUNNING
# 5c5b3c300c71   prometheus                  http: 9090/tcp -> http://127.0.0.1:52746               RUNNING
# e5d817a7ff20   pyroscope                   pyroscope: 4040/tcp -> http://127.0.0.1:53224          RUNNING
# fc84cfef2319   tx-fuzz-0                   <none>                                                 RUNNING
# 1dd2fece619b   tx-fuzz-1                   <none>                                                 RUNNING
# 26df503b9a05   tx-fuzz-10                  <none>                                                 RUNNING
# 9e979dffa8f3   tx-fuzz-11                  <none>                                                 RUNNING
# e6bf3df68ab5   tx-fuzz-12                  <none>                                                 RUNNING
# caf8e90eb636   tx-fuzz-13                  <none>                                                 RUNNING
# b37cfe191eba   tx-fuzz-14                  <none>                                                 RUNNING
# ac0a401c2e31   tx-fuzz-15                  <none>                                                 RUNNING
# c7877a3e9efa   tx-fuzz-2                   <none>                                                 RUNNING
# c13b0dd16da6   tx-fuzz-3                   <none>                                                 RUNNING
# f92b5661000c   tx-fuzz-4                   <none>                                                 RUNNING
# 6afbb7c0a215   tx-fuzz-5                   <none>                                                 RUNNING
# d6cc564bf8fd   tx-fuzz-6                   <none>                                                 RUNNING
# d6f6ac4fcba1   tx-fuzz-7                   <none>                                                 RUNNING
# 00dc8cdbb379   tx-fuzz-8                   <none>                                                 RUNNING
# 78f3100e7ce8   tx-fuzz-9                   <none>                                                 RUNNING
```

### Step 2 - Test Devnet

To verify that the local devnet is working, you can use the local Blockscout block explorer, which runs alongside the network.

```bash
open http://127.0.0.1:53414; # NOTE: Use the port number for Blockscout from the above output
```

![Berachain Devnet Block Explorer](/assets/berachain-devnet-kurtosis-blockexplorer.png)

### Step 3 - Configure Wallet

If you want to see a list of all defined wallet addresses and private keys, refer to [constants.star](https://github.com/berachain/beacon-kit/blob/main/kurtosis/src/constants.star).

Start by adding the network to your MetaMask wallet.

:::tip
**NOTE:** Your port number will be different. Use the port number from the list of services output in Step 1.
:::

| Key                | Value                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------ |
| Network            | <ClientOnly><CopyToClipboard :text="config.devnet.chainName" /></ClientOnly>               |
| RPC URL            | <ClientOnly><CopyToClipboard :text="config.devnet.rpcUrl" /></ClientOnly>                  |
| Chain ID           | <ClientOnly><CopyToClipboard :text="config.devnet.chainId" /></ClientOnly>                 |
| Currency symbol    | <ClientOnly><CopyToClipboard :text="config.devnet.currencySymbol" /></ClientOnly>          |
| Block explorer URL | <ClientOnly><CopyToClipboard :text="config.devnet.dapps.blockExplorer.url" /></ClientOnly> |

Next import one of the private keys defined in [constants.star](https://github.com/berachain/beacon-kit/blob/main/kurtosis/src/constants.star).

**File:** `./kurtosis/src/constants.star`

```python
# ...

PRE_FUNDED_ACCOUNTS = [
    new_prefunded_account(
        "0x20f33ce90a13a4b5e7697e3544c3083b8f8a51d4",
        # Import this ↓ // [!code focus]
        "fffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306", # // [!code focus]
    ),

# ...
```

If successful, you should see the account address `0x20f33ce90a13a4b5e7697e3544c3083b8f8a51d4` added with the following balance.

![Berachain Local Devnet Metamask Wallet Configuration](/assets/berachain-local-devnet-metamask-configuration.png)

### Step 4 - Deploy Contract

To demonstrate deploying a contract to the local devnet, we will use the [Berachain Guides HelloWorld.sol](https://github.com/berachain/guides/blob/main/apps/hardhat-viem-helloworld/contracts/HelloWorld.sol).

```bash
# FROM: ./beacon-kit;

mkdir tmp;
touch tmp/HelloWorld.sol;
```

**File:** `./tmp/HelloWorld.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract HelloWorld {
    // Events that allows for emitting a message
    event NewGreeting(address sender, string message);

    // Variables
    string greeting;

    // Main constructor run at deployment
    constructor(string memory _greeting) {
        greeting = _greeting;
        emit NewGreeting(msg.sender, _greeting);
    }

    // Get function
    function getGreeting() public view returns (string memory) {
        return greeting;
    }

    // Set function
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
        emit NewGreeting(msg.sender, _greeting);
    }
}
```

We will use a `cast` request to deploy the bytecode.

```bash-vue
# FROM: ./

forge create --rpc-url {{config.devnet.rpcUrl}} --private-key fffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306 tmp/HelloWorld.sol:HelloWorld --constructor-args "Initial greeting message" --legacy;

# [Expected Output]:
# [⠊] Compiling...
# No files changed, compilation skipped
# Deployer: 0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4
# Deployed to: 0x4d31F9761DEe0132A17794018143360113575cFE
# Transaction hash: 0xf18d36b5aeb9b5acc6711b65944a392fd659f34966156e475c5d15cb733677d9
```

You should be able to see this in the block explorer.

```bash
# NOTE: The block explorer will take time to index everything so it might not show up right away
open http://127.0.0.1:53414/tx/0xf18d36b5aeb9b5acc6711b65944a392fd659f34966156e475c5d15cb733677d9;
```

### Step 5 - Read Contract

Next, we will read from the contract to verify that the contract was deployed and the initial message was set.

```bash-vue
cast call 0x4d31F9761DEe0132A17794018143360113575cFE "getGreeting()" --rpc-url {{config.devnet.rpcUrl}} | xxd -r -p;

# [Expected Output]:
# Initial greeting message
```

### Step 6 - Write Contract

Next, we will write to the contract then read from it again with an updated message.

Writing to the contract:

```bash-vue
cast send 0x4d31F9761DEe0132A17794018143360113575cFE "setGreeting(string)" "Hello From Devnet" --rpc-url {{config.devnet.rpcUrl}} --private-key fffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306 --legacy;

# [Expected Output]:
# blockHash               0xa47a10872a0b162d7f95f2339a246b3be2fa0b5df262bc0ccb9ebd50bcc20269
# blockNumber             1783
# contractAddress
# cumulativeGasUsed       29746
# effectiveGasPrice       258831769
# from                    0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4
# gasUsed                 29746
# logs                    [{"address":"0x4d31f9761dee0132a17794018143360113575cfe","topics":["0xcbc299eeb7a1a982d3674880645107c4fe48c3227163794e48540a7522722354"],"data":"0x00000000000000000000000020f33ce90a13a4b5e7697e3544c3083b8f8a51d40000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001148656c6c6f2046726f6d204465766e6574000000000000000000000000000000","blockHash":"0xa47a10872a0b162d7f95f2339a246b3be2fa0b5df262bc0ccb9ebd50bcc20269","blockNumber":"0x6f7","transactionHash":"0xc7ef2bbd80866be88cbd83abddeeaeab10af5263bc1ef86ce683cafbd52d8a16","transactionIndex":"0x0","logIndex":"0x0","removed":false}]
# logsBloom               0x00000000000000000000000000000000008000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000080000000100040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
# root
# status                  1 (success)
# transactionHash         0xc7ef2bbd80866be88cbd83abddeeaeab10af5263bc1ef86ce683cafbd52d8a16
# transactionIndex        0
# type                    0
# blobGasPrice
# blobGasUsed
# to                      0x4d31F9761DEe0132A17794018143360113575cFE
```

Reading from the contract:

```bash-vue
cast call 0x4d31F9761DEe0132A17794018143360113575cFE "getGreeting()" --rpc-url {{config.devnet.rpcUrl}} | xxd -r -p;

# [Expected Output]:
# Hello From Devnet
```

## Testing Deposits

In this section, we will upgrade one of the full nodes from the default Kurtosis deployment to a full validator.
We will be following the process laid out in the [Become a Validator](/nodes/guides/validator) guide. 

Revise `beaconkit-local.yml` to **remove any `tx-fuzz` or `spamoor` instances**:
```beaconkit-local.yml - to be removed
...
additional_services:
  - name: "spamoor"    // [!code --]
  - name: "tx-fuzz"    // [!code --]
...
```

Then, clean and re-launch:

```bash
kurtosis clean -a ; docker rm -f $(docker ps -aq);
make start-devnet
```

Identify a full node from the list of activated containers in the output of `make start-devnet`. These mappings can be shown again by using `kurtosis enclave inspect my-local-devnet`.

```bash
kurtosis enclave inspect my-local-devnet

# [Expected Similar Output]
21913e697c20   cl-full-beaconkit-0        cometbft-p2p: 26656/tcp -> 127.0.0.1:50479             RUNNING
                                          cometbft-pprof: 6060/tcp -> 127.0.0.1:50483
                                          cometbft-rpc: 26657/tcp -> 127.0.0.1:50480
                                          metrics: 26660/tcp -> 127.0.0.1:50481
                                          node-api: 3500/tcp -> 127.0.0.1:50482

2d0220dbce46   el-full-reth-0             engine-rpc: 8551/tcp -> 127.0.0.1:50467                RUNNING
                                          eth-json-rpc: 8545/tcp -> 127.0.0.1:50465
                                          eth-json-rpc-ws: 8546/tcp -> 127.0.0.1:50466
                                          metrics: 9001/tcp -> 127.0.0.1:50468
                                          tcp-discovery: 30303/tcp -> 127.0.0.1:50469
                                          udp-discovery: 30303/udp -> 127.0.0.1:49255
```

Start a log watcher that will report deposit activity:
```bash
kurtosis service logs my-local-devnet cl-full-beaconkit-0 -f | egrep '(slot|deposit)'
```

Log into the beaconkit container:

```bash
kurtosis service shell my-local-devnet cl-full-beaconkit-0
```

Obtain the validator keys. The last one is the important one:

```bash
> beacond deposit validator-keys
...

Eth/Beacon Pubkey (Compressed 48-byte Hex):
0x80b2d75cfb977199f7474dd5bf3b039e11e4a10a01b57e922f14d3eb9df448e65e27ff356fe4082cc34c9bad8b9f0d07
```

Obtain the genesis root hash used to calculate the deposit signature:

```bash
> beacond genesis validator-root ~/.beacond/config/genesis.json
0x18373bec1ac58937e25a52ce91622864a7c6ed468440a2d5ad8c617795c507d8
```

Load those two values into environment variables along with a couple of other important ones we are going to use:

```bash
COMETBFT_PUB_KEY=$(beacond deposit validator-keys|tail -1)
GENESIS_ROOT=$(beacond genesis validator-root ~/.beacond/config/genesis.json)

DEPOSIT_ADDR=0x4242424242424242424242424242424242424242
OPERATOR_ADDRESS=0x9BcaA41DC32627776b1A4D714Eef627E640b3EF5  
WITHDRAW_ADDRESS=$OPERATOR_ADDRESS
STAKE_AMOUNT_GWEI=9000000000
PK=fffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306
RPC_URL=http://127.0.0.1:8547    # port number for a json-rpc in kurtosis
```

Notes:
* **DEPOSIT_ADDR** is the address of the BeaconDeposit contract. It's the same on mainnet.
* **OPERATOR_ADDRESS** is an example value which you can use for this tutorial.
* **WITHDRAW_ADDRESS** is an example value which you can use for this tutorial.
* **STAKE_AMOUNT_GWEI** is the amount to be deposited in the depost transactions. This is `9 $BERA`.  In the devnet, a validator is activated above `18 $BERA`.  After depositing this amount a second time, the validator will be activated.
* **PK** is the wallet address we are going to transact from. This is a private key selected from the [list seeded with the Kurtosis deployment](https://github.com/berachain/beacon-kit/blob/main/kurtosis/src/constants.star).
* **RPC_URL** is the `eth-json-rpc` port exposed by Kurtosis for the `reth-0` container, shown above. Yours will be different.


Confirm that our CometBFT client is not currently a validator:

```bash
apk add jq
curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq .data | grep $COMETBFT_PUB_KEY
```


Calculate the deposit signature, then load the calculated credential and signature to variables:

```bash
> beacond deposit create-validator $WITHDRAW_ADDRESS $STAKE_AMOUNT_GWEI -g $GENESIS_ROOT
✅ Deposit message created successfully!

pubkey: 0x80b2d75cfb977199f7474dd5bf3b039e11e4a10a01b57e922f14d3eb9df448e65e27ff356fe4082cc34c9bad8b9f0d07
credentials: 0x0100000000000000000000009bcaa41dc32627776b1a4d714eef627e640b3ef5
amount: 9000000000
signature: 0x91fabc1d5ea3074ce85c3e2cab7bda0b667311d409eb4d5857171ba8309fa71be6e5e80d2d2d5d5558b43ca706efde7c013f0c6613038546b64c11c1959eaf80163fe40966c43fc7cb2baf2dd6c79837064c5de1d0203753dd7867650ca1ec4e

> WITHDRAW_CREDENTIAL=$(beacond deposit create-validator $WITHDRAW_ADDRESS $STAKE_AMOUNT_GWEI -g $GENESIS_ROOT | sed -n 's/credentials: //p')
> DEPOSIT_SIGNATURE=$(beacond deposit create-validator $WITHDRAW_ADDRESS $STAKE_AMOUNT_GWEI -g $GENESIS_ROOT | sed -n 's/signature: //p')
> echo $DEPOSIT_SIGNATURE
0x91fa....ec4e
> echo $WITHDRAW_CREDENTIAL
0x0100....3ef5
```

Verify the calculated signature:

```bash
> beacond deposit  validate $COMETBFT_PUB_KEY $WITHDRAW_CREDENTIAL $STAKE_AMOUNT_GWEI $DEPOSIT_SIGNATURE -g $GENESIS_ROOT
✅ Deposit message is valid!
```

Generate the command to send the registration transaction. This an initial deposit of `10,000 $BERA` to create the association to the CometBFT public key, the selected operator address, and the selected withdrawal address.
Note you are **printing** the command in the beacond container, then will copy and paste it to the host operating system:

```bash{14}
> echo cast send $DEPOSIT_ADDR \'deposit\(bytes,bytes,bytes,address\)\'      \
    $COMETBFT_PUB_KEY $WITHDRAW_CREDENTIAL $DEPOSIT_SIGNATURE $OPERATOR_ADDRESS \
    --value "${STAKE_AMOUNT_GWEI}gwei" \
    --private-key $PK                  \
    --rpc-url $RPC_URL
# [EXAMPLE OUTPUT]
# cast send 0x4242....

> [paste above 'cast' line into the host OS]
# [EXAMPLE OUTPUT, SIMPLIFIED]
# blockHash            0xe2157a842f2a793a5adeafa5782db29b8d691f94453ffb10f567f096e4536700
# from                 0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4
# to                   0x4242424242424242424242424242424242424242
# status               1 (success)
# transactionHash      0xca28463117cb8e9f04c3b47b886ab49e95fd9a3f44271de8f2e2c5fce14002a2

```

At this point, you should be able to confirm in beacond that your validator is in state `pending_initialized`:

```bash{6}
> curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq .data
...
  {
    "index": "5",
    "balance": "9000000000",
    "status": "pending_initialized",
    "validator": {
      "pubkey": "0x80b2d75cfb977199f7474dd5bf3b039e11e4a10a01b57e922f14d3eb9df448e65e27ff356fe4082cc34c9bad8b9f0d07",
      "withdrawal_credentials": "0x0100000000000000000000009bcaa41dc32627776b1a4d714eef627e640b3ef5",
      "effective_balance": "9000000000",
      "slashed": false,
      "activation_eligibility_epoch": "18446744073709551615",
      "activation_epoch": "18446744073709551615",
      "exit_epoch": "18446744073709551615",
      "withdrawable_epoch": "18446744073709551615"
    }
  }
```

Now we submit a transaction for the same amount to complete the activation of the validator:

```bash{17}
> echo cast send $DEPOSIT_ADDR \'deposit\(bytes,bytes,bytes,address\)\'      \
    "$COMETBFT_PUB_KEY" \
    "0x0000000000000000000000000000000000000000000000000000000000000000" \
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" \
    "0x0000000000000000000000000000000000000000" \
    --private-key $PK \
    --value "${STAKE_AMOUNT_GWEI}gwei" \
    --rpc-url $RPC_URL;
# [EXAMPLE OUTPUT]
# cast send 0x4242....

> [paste above 'cast' line into the host OS]
# [EXAMPLE OUTPUT, SIMPLIFIED]
# blockHash            0x923c626ec44aea46426580ae5e8010f239f37a612c90b35ebc4299d8b75b8383
# from                 0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4
# to                   0x4242424242424242424242424242424242424242
# status               1 (success)
```

**The activation process will proceed over the next 2 complete epochs.**  The devnet has 32 blocks per epoch, so watch the log output for it to roll from "sloft=...f to ...0" twice.

You will see it first showing in the activation queue:
```bash{5}
> curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq . | tail -n20
  {
    "index": "5",
    "balance": "18000000000",
    "status": "pending_queued",
    "validator": {
        "pubkey": "0x80b2d75cfb977199f7474dd5bf3b039e11e4a10a01b57e922f14d3eb9df448e65e27ff356fe4082cc34c9bad8b9f0d07",  
        "activation_eligibility_epoch": "7",
```

And then, finally, as activated:
```bash{5}
> curl -s http://localhost:3500/eth/v1/beacon/states/head/validators | jq . | tail -n20
    {
      "index": "5",
      "balance": "18000000000",
      "status": "active_ongoing",
      "validator": {
        "pubkey": "0x80b2d75cfb977199f7474dd5bf3b039e11e4a10a01b57e922f14d3eb9df448e65e27ff356fe4082cc34c9bad8b9f0d07",
        "activation_eligibility_epoch": "7",
        "activation_epoch": "8",
```


## Debugging Issues

If Docker stops working on MacOS, first try running `kurtosis clean -a`. If the problem persists, try removing all containers and restarting Docker.

```bash
# To remove all docker instances quickly
docker rm -f $(docker ps -aq);

# [Expected Output]:
# 7c1dce7eebfb
# 91bb1725781b
# 41691876aeda
# ...
```

To watch logs for deposit activity:
```bash
kurtosis service logs my-local-devnet cl-full-beaconkit-0 -f | grep num_deposits
```

To test whether a certain CometBFT public key is a associated with an operator addreass:
```bash
echo call  $DEPOSIT_ADDR \'getOperator\(bytes\)\' $COMETBFT_PUB_KEY --rpc-url $RPC_URL --private-key $PK
```

## Teardown and Cleanup

To remove all services and clean up the environment, run the following commands:

```bash
# FROM: ./beacon-kit

# NOTE: These may get stuck - in that case see Debugging Issues below
make stop-devnet;
make rm-devnet;

# [Expected Output]:
# kurtosis enclave stop my-local-devnet
# ...
```

