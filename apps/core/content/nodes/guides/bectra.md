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
2. All users can take advantage of [EIP 7702](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7702.md), which enables any EOA to set its code based on any existing smart contract.

:::warning
All users, whether hosting an RPC or running a validator, **must upgrade** their Execution Client and Consensus Client to continue following the chain.
:::

## Bepolia Hardfork Upgrade Timeline

As a first step, Berachain will implement the upgrades in phases, with the first phase being the full upgrade on Bepolia Testnet.

| Date                | Milestone                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------- |
| Week of April 21    | Documentation Release                                                                     |
| Week of April 28    | Beacon Kit 1.2.0-rc Released <br/> (Node operators upgrade Beacon Kit and geth/reth/etc.) |
| Week of May 5       | All Infrastructure Providers Upgraded                                                     |
| May 7 - 12:00pm EST | Bectra Hardfork on Bepolia                                                                |

After evaluating the upgrade on Bepolia, Berachain will schedule a hardfork for Berachain Mainnet at the end of May.
The final release date for Berachain Mainnet will be announced closer to the upgrade.

## Bepolia Execution Client Upgrade Instructions

The first upgrade is for the Execution Client, which enables new operations at the designated fork activation time.

The following execution client versions have been tested with the upgrade and are the recommended versions to use:

| Client     | Version                                                                   |
| ---------- | ------------------------------------------------------------------------- |
| Geth       | [1.15.10](https://github.com/ethereum/go-ethereum/releases/tag/v1.15.10)  |
| Reth       | [1.3.12](https://github.com/paradigmxyz/reth/releases/tag/v1.3.12)        |
| Nethermind | [1.31.8](https://github.com/NethermindEth/nethermind/releases/tag/1.31.8) |
| Besu       | [25.4.1](https://github.com/hyperledger/besu/releases/tag/25.4.1)         |
| Erigon     | [3.0.2](https://github.com/erigontech/erigon/releases/tag/v3.0.2)         |

### Step 1 - Deploy Genesis File

Use the following execution client genesis files to ensure your node is compatible with Bectra, and place them in their respective locations based on the execution client you are using:

#### Reth, Geth, Besu, Erison

```bash-vue{4,5}
wget https://raw.githubusercontent.com/berachain/beacon-kit/refs/tags/v1.2.0.rc0/testing/networks/80069/eth-genesis.json;
md5 eth-genesis.json;

# [Expected Exact Output]:
# 9e32b2a1a5eb434d7b2fbaa27752b751
```

##### Geth Additional Steps

:::warning
If you are using Geth, you will need to perform the following steps to ensure that the new genesis file is applied correctly.
:::
Other execution clients automatically load and apply the new genesis file. For Geth, you must run `geth init` again after the genesis file has been placed in the correct directory:

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

![Geth bectra upgrade](/assets/geth-bectra-upgrade.png)

#### Nethermind

```bash-vue{4,5}
wget https://raw.githubusercontent.com/berachain/beacon-kit/refs/tags/v1.2.0.rc0/testing/networks/80069/eth-nether-genesis.json;
md5 eth-nether-genesis.json;

# [Expected Exact Output]:
# 04e689193d6506f36abf98c23b75a07e
```

### Step 2 - Start Execution Client

Start the execution client and check the logs for indications of successful fork activation.

```bash{5}
# [EXAMPLE Reth - Expected Similar Output]:
# Post-merge hard forks (timestamp based):
# - Shanghai                         @0
# - Cancun                           @0
# - Prague                           @1746633600
```

## Bepolia Beacon Kit Upgrade Instructions

Beacon Kit [1.2.0-rc](https://github.com/berachain/beacon-kit/releases) is required in addition to the [execution client configuration](#bepolia-execution-client-upgrade-instructions) for the Bepolia Hardfork.

### Step 1 - Configure App Toml

Revise your app.toml by adding this configuration to the `beacon-kit` section. Create the section if it doesn't exist:

**File:** `./.beacond/config/app.toml`

```toml
[beacon-kit]

chain-spec = testnet
```

### Step 2 - Verify Upgrade

Start `beacond` and verify that the following is logged. Note the **"Electra Fork Time"** in the banner.

```bash-vue{10}
./beacond start; # Use --home as needed;

# [Expected Output]:
# +=========================================================================+
# + ⭐ BeaconKit on GitHub @ https://github.com/berachain/beacon-kit        +
# + 🧩 Your node is running version: v1.2.0.rc0                             +
# + ♦ Eth client: unknown (version: unknown)                                +
# + 💾 Your system: linux/amd64                                             +
# + 🍴 Deneb1 Fork Time: 1740090694                                         +
# + 🍴 Electra Fork Time: 1746633600                                        +
# + 🦺 Please report issues @ http://github.com/berachain/beacon-kit/issues +
# +=========================================================================+
```
