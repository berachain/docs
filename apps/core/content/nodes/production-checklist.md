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
1. **Bootnodes**: Check that you have a current list of [bootnodes](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/el-bootnodes.txt).
2. **Peers**: Check that you have a current list of [peers](https://github.com/berachain/beacon-kit/blob/main/testing/networks/80094/el-peers.txt). It's a good idea to use these as "trusted peers" in your execution client.
3. **Remember, peers are not the same as bootnodes.**  Bootnodes speak UDP and provide node discovery. Peers speak TCP and provide blocks. Each execution client has separate options to specify bootnodes and peers.  Consult your execution client's documentation for the correct options.
4. **Indicate your node's external IP address.**  In order to advertise their address for peering, execution clients need to know the publicly routable IP address they can be reached at.  Most execution clients try to determine your public IP with UPnP, which is not available in cloud computing environments. Therefore, you must _tell your execution client_ what your external IP address is. This is sometimes done with the `--nat extip:<IP>` option, but check your execution client's documentation for the correct option. For Beacon-Kit this is configured with `p2p.external_addresss` in `config.toml`.

### Hygiene

Make sure Beacon-Kit and your execution client are configured to start when your operating system starts. We recommend to start the execution client first, then Beacon-Kit.

Cause your operating system to rotate logs, and slim the log output.
   - Read the `beacond` config files to find log verbosity settings.
   - Consult the instructions for your chosen chain node to adjust logging settings.
   - Set up the `logrotate` service to rotate logs. Beacon-Kit currently needs a restart to reopen the log file.

Monitor your node's disk space, memory consumption, and service availability. You can add `--metrics=<ip>:6060` to the reth invocation to enable prometheus metrics collection. Specify an internal IP address accessible only to your prometheus server, or ensure this port is firewalled off from the internet.
Particularly if you are a validator, consult the guide to [Becoming an Awesome Validator](https://github.com/chuck-bear/awesome-berachain-validators/tree/main) for references to other monitoring tools.
