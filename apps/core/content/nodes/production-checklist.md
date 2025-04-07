---
head:
  - - meta
    - property: og:title
      content: Berachain Operator Checklist
---

# Node Operator / Validator Checklist

Before reaching out for support, here are some steps to check your installation.

### Beacon Kit version check

Ensure you are running the latest version of [Beacon Kit](https://github.com/berachain/beacon-kit)

### Execution client version check

Check that you are running a supported version of your [execution client](/nodes/evm-execution). Note we don't _always_ support the latest version of a given client.

### Peering

There are several ingredients to successful peering:

1. **Check bootnodes for initial chain sync**: Check that you have a current list of [bootnodes](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/el-bootnodes.txt). Both `geth` and `reth` accept `--bootnodes` option. `beacond` has the boot node list baked into our distributed [config](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/config.toml).
2. **Check Execution Layer peering**: The execution layer needs excellent peering in order to ensure that transactions flow to your validator for sealing in blocks. Ensure port 30303 TCP (for transactions) and UDP (for peer exchange) is open. Check that you have a current list of [peers](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/el-peers.txt). It's a good idea to use these as "trusted peers" or "static peers" in your execution client. Here's how:
   - **Reth**: Use `trusted_nodes` in the `[peers]` section of Reth.toml or the --trusted-peers option.
   - **Geth**: Use the `StaticNodes` field of the `[Node.P2P]` section in config.toml. This config file isn't generated for you, and you must make one with `geth dumpconfig` and refer to it with `geth --config <configfile>`.
   - **Nethermind**: Use the `Network.StaticPeers` key in `nethermind.cfg`.
3. **Indicate your Execution Layer's external IP address.** In order to advertise their address for peering, execution clients need to know the publicly routable IP address they can be reached at. Most execution clients try to determine your public IP with UPnP, which is not available in cloud computing environments. Therefore, you must _tell your execution client_ what your external IP address is. For `reth` and `geth`, this is done with the `--nat extip:<IP>` option.
4. **Check beacond peering**: `beacond`needs good peering to organize and perform consensus actions. This is carried out over TCP port 26656, typically. Also, correctly advertise your node's external IP with `p2p.external_address` in `config.toml`. Further, to limit beacond's memory consumption we recommend **40 inbound + 10 outbound peers**, by applying the settings in `config.toml` for healthy peering with reasonable resource usage:
   ```
   max_num_inbound_peers = 40
   max_num_outbound_peers = 10
   ```

### Let us know who you are

If you have launched a validator on the chain, it's in your interest to let us know who you are, so we know who to contact in case there's trouble with on-chain performance or actions.

Steps to do that:

1. (Optional) Formulate a pull request to the [Validator Metadata repository](https://github.com/berachain/metadata) with a public handle for your validator. You can use an anon if you want. Provide a logo attached to the pull request if you would like it posted on your validator profile.
2. Reach out to us on the `#node-support` channel on our [Discord](https://github.com/berachain). We will set you up with dedicated support, chat, and announcement channels for validators.

### Hygiene

Make sure Beacon Kit and your execution client are configured to start when your operating system starts.

Cause your operating system to rotate logs, and slim the log output.

- Read the `beacond` config files to find log verbosity settings.
- Consult the instructions for your chosen chain node to adjust logging settings.
- Set up the `logrotate` service to rotate logs.

Monitor your node's disk space, memory consumption, and service availability. You can add `--metrics=<ip>:6060` to the reth invocation to enable prometheus metrics collection. Specify an internal IP address accessible only to your prometheus server, or ensure this port is firewalled off from the internet.
Particularly if you are a validator, consult the guide to [Becoming an Awesome Validator](https://github.com/chuck-bear/awesome-berachain-validators/tree/main) for references to other monitoring tools.
