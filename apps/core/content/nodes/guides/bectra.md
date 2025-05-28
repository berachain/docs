---
head:
  - - meta
    - property: og:title
      content: Berachain Bectra Hardfork
  - - meta
    - name: description
      content: Bectra (Pectra) upgrade for Berachain
  - - meta
    - property: og:description
      content: Bectra (Pectra) upgrade for Berachain
---

# Bectra Hardfork

Bectra is Berachain's EVM Pectra upgrade, which introduces a variety of changes, including major updates:

1. Validators can withdraw all or part of their `$BERA` stake.
2. All users can take advantage of [EIP 7702](/developers/guides/eip7702-basics) which enables any EOA to set its code based on any existing smart contract.
3. There are [additional EIPs enabled]/beacon-kit/changelog#v1-2-0-bectra-hardfork-bera-prague-electra) with this fork.

:::warning
All users, whether hosting an RPC or running a validator, **must upgrade** their Execution Client and Consensus Client to continue following the chain.
:::

## Hardfork Upgrade Timeline

| Date                   | Milestone                                           |
| ---------------------- | --------------------------------------------------- |
| April 30, 2025         | Beacon-Kit 1.2.0-rc released for Bepolia            |
| May 7, 2025 @ 12pm EDT | Bectra Hardfork Live on Bepolia                     |
| May 16, 2025           | Beacon-Kit 1.2.0 released for Mainnet               |
| June 2, 2025           | All infrastructure partners expected to be upgraded |
| June 4, 2025 @ 1pm EDT | Bectra Hardfork Live on Berachain Mainnet           |

## Execution Client Upgrade

The first upgrade is for the Execution Client, which enables new operations at the designated fork activation time. The following execution client versions have been tested / are recommended:

| Client     | Version                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Geth       | [1.15.10](https://github.com/ethereum/go-ethereum/releases/tag/v1.15.10) or [.11](https://github.com/ethereum/go-ethereum/releases/tag/v1.15.11) |
| Reth       | [1.3.12](https://github.com/paradigmxyz/reth/releases/tag/v1.3.12)                                                                               |
| Nethermind | [1.31.x](https://github.com/NethermindEth/nethermind/releases/tag/1.31.11)                                                                       |
| Besu       | [25.4.1](https://github.com/hyperledger/besu/releases/tag/25.4.1)                                                                                |
| Erigon     | [3.0.x](https://github.com/erigontech/erigon/releases/tag/v3.0.3)                                                                                |

### Step 1 - Deploy Genesis File

Use the updated execution client [genesis files](https://github.com/berachain/beacon-kit/tree/v1.2.0/testing/networks/80094) to ensure your node is compatible with Bectra, and place them in their respective locations based on the execution client you are using:

#### Reth, Geth, Besu, Erigon

```bash-vue{4,5}
wget https://raw.githubusercontent.com/berachain/beacon-kit/refs/tags/v1.2.0/testing/networks/80094/eth-genesis.json;
md5 eth-genesis.json;

# [Expected Exact Output]:
# 77bc26d81f1c8c16070d3b641428901f

cp eth-genesis.json var/reth/genesis.json
```

The reth, besu, Erigon, and Nethermind clients automatically load and apply the new genesis file.

##### Geth Additional Steps

For `geth` you must run `geth init` again after the genesis file has been placed in the correct directory. We recommend this be made a permanent part of every geth startup. Our recommended [startup process](https://github.com/berachain/guides/tree/main/apps/node-scripts/run-geth.sh) now includes this.

:::tip
If your node is an archive node and ordinarily runs with `--state.scheme hash`, then you must provide that option to `geth init` as well.
:::

```bash
geth init --datadir /path/to/geth/data /path/to/eth-genesis.json;
```

The geth `datadir` should contain the following directories:

```bash-vue{4-8}
tree datadir;

# [Expected Output]:
# datadir
# ├── keystore
# └── geth
#     ├── blobpool
#     └── chaindata
```

_**Example Successful Geth Bectra Upgrade:**_

```bash-vue{3,17,22,35}
$ geth version
Geth
Version: 1.15.11-stable
Git Commit: 36b2371c59cd91a9b1da062b3e382f05a6d8687e
Git Commit Date: 20250505
Architecture: amd64
Go Version: go1.24.2
Operating System: linux
GOPATH=
GOROOT=

$ ./fetch-berachain-params.sh
0038db129d91238c9bff8e495c5fa93f  seed-data-80094/app.toml
8e5601f00d14d3694b4eccc8c101b15b  seed-data-80094/config.toml
5aeab3cb885d8f32892685fc8e44151b  seed-data-80094/el-bootnodes.txt
b00257ebcaa13f02559861696b55c5da  seed-data-80094/el-peers.txt
77bc26d81f1c8c16070d3b641428901f  seed-data-80094/eth-genesis.json
2deeecfe9ac40d6a8cced45cca3bf0bc  seed-data-80094/eth-nether-genesis.json
c66dbea5ee3889e1d0a11f856f1ab9f0  seed-data-80094/genesis.json
5d0d482758117af8dfc20e1d52c31eef  seed-data-80094/kzg-trusted-setup.json

$ geth init --datadir var/geth/data seed-data-80094/eth-genesis.json
INFO [05-27|17:37:00.791] Maximum peer count                       ETH=50 total=50
INFO [05-27|17:37:00.793] Smartcard socket not found, disabling    err="stat /run/pcscd/pcscd.comm: no such file or directory"
INFO [05-27|17:37:00.795] Set global gas cap                       cap=50,000,000
INFO [05-27|17:37:00.795] Initializing the KZG library             backend=gokzg
INFO [05-27|17:37:00.798] Using pebble as the backing database
INFO [05-27|17:37:00.798] Allocated cache and file handles         database=/opt/berachain/geth-mainnet/var/geth/data/geth/chaindata cache=16.00MiB handles=16
INFO [05-27|17:37:01.166] Opened ancient database                  database=/opt/berachain/geth-mainnet/var/geth/data/geth/chaindata/ancient/chain readonly=false
INFO [05-27|17:37:01.168] State scheme set to already existing     scheme=hash
INFO [05-27|17:37:07.758] Successfully wrote genesis state         database=chaindata hash=d57819..fcfb38
```

Note: `hash=d57819..fcfb38` must be seen!

#### Nethermind

```bash-vue{4,5}
wget https://raw.githubusercontent.com/berachain/beacon-kit/refs/tags/v1.2.0/testing/networks/80094/eth-nether-genesis.json;
md5 eth-nether-genesis.json;

# [Expected Exact Output]:
# 2deeecfe9ac40d6a8cced45cca3bf0bc
```

### Step 2 - Verify EL Upgrade

Start the execution client and check the logs for indications of successful fork activation.

```bash{5}
# [ EXAMPLE for geth - expected similar output for other EL]
# Post-Merge hard forks (timestamp based):
# - Shanghai:                    @0
# - Cancun:                      @0
# - Prague:                      @1749056400
```

## Beacon Kit Upgrade

[Beacon Kit 1.2.0](https://github.com/berachain/beacon-kit/releases/tag/v1.2.0) is required in addition to the [execution client configuration](#execution-client-upgrade-instructions) for the Bectra Hardfork.

### Step 1 - Configure app.toml

Revise your app.toml by adding this configuration to the `beacon-kit` section. Create the section if it doesn't exist:

**File:** `./.beacond/config/app.toml`

```toml
[beacon-kit]

chain-spec = "mainnet"     # or testnet, as case may be
```

### Step 2 - Verify CL Upgrade

Start `beacond` and verify that the following is logged. Note the **"Electra Fork Time"** in the banner.

```bash-vue{10}
./beacond start; # Use --home as needed;

# [Expected Output]:

	+==========================================================================+
	+ ⭐️ Star BeaconKit on GitHub @ https://github.com/berachain/beacon-kit    +
	+ 🧩 Your node is running version: v1.2.0                                  +
	+ 💾 Your system: linux/amd64                                              +
	+ 🍴 Deneb1 Fork Time: 1738415507                                          +
	+ 🍴 Electra Fork Time: 1749056400                                         +
	+ 🦺 Please report issues @ https://github.com/berachain/beacon-kit/issues +
	+==========================================================================+

```
