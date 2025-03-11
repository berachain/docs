---
head:
  - - meta
    - property: og:title
      content: Berachain Operator Checklist
---

# Node Operator / Validator Checklist

Before reaching out for support, here are some steps to check your installation.

### Beacon-Kit version check

Ensure you are running the latest version of [Beacon-Kit](https://github.com/berachain/beacon-kit)

### Execution client version check

Check that you are running a supported version of your [execution client](/nodes/evm-execution). Note we don't _always_ support the latest version of a given client.

### Peering

There are several ingredients to successful peering:

1. **Bootnodes**: Check that you have a current list of [bootnodes](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/el-bootnodes.txt). Both `geth` and `reth` accept `--bootnodes` option.
2. **Peers**: Check that you have a current list of [peers](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/el-peers.txt). It's a good idea to use these as "trusted peers" in your execution client. `reth` accepts a `--trusted-peers` option.
3. **Remember, peers are not the same as bootnodes.** Bootnodes speak UDP and provide node discovery. Peers speak TCP and provide blocks. Ensure your firewall allows both UDP and TCP traffic to your chain clients, for both consensus and execution layer, for the ports they are configured to listen on. In the default configurations we provide, this is TCP and UDP 30303 for the execution layer, and TCP 26657 for the consensus layer.

4. **Indicate your node's external IP address.** In order to advertise their address for peering, execution clients need to know the publicly routable IP address they can be reached at. Most execution clients try to determine your public IP with UPnP, which is not available in cloud computing environments. Therefore, you must _tell your execution client_ what your external IP address is. For `reth` and `geth`, this is done with the `--nat extip:<IP>` option, For Beacon-Kit this is configured with `p2p.external_addresss` in `config.toml`.

### Let us know who you are

If you have launched a validator on the chain, it's in your interest to let us know who you are, so we know who to contact in case there's trouble with on-chain performance or actions.

Steps to do that:

1. (Optional) Formulate a pull request to the [Validator Metadata repository](https://github.com/berachain/metadata) with a public handle for your validator. You can use an anon if you want. Provide a logo attached to the pull request if you would like it posted on your validator profile.
2. Reach out to us on the `#node-support` channel on our [Discord](https://github.com/berachain). We will set you up with dedicated support, chat, and announcement channels for validators.

### Hygiene

Make sure Beacon-Kit and your execution client are configured to start when your operating system starts.

Cause your operating system to rotate logs, and slim the log output.

- Read the `beacond` config files to find log verbosity settings.
- Consult the instructions for your chosen chain node to adjust logging settings.
- Set up the `logrotate` service to rotate logs.

Monitor your node's disk space, memory consumption, and service availability. You can add `--metrics=<ip>:6060` to the reth invocation to enable prometheus metrics collection. Specify an internal IP address accessible only to your prometheus server, or ensure this port is firewalled off from the internet.
Particularly if you are a validator, consult the guide to [Becoming an Awesome Validator](https://github.com/chuck-bear/awesome-berachain-validators/tree/main) for references to other monitoring tools.
