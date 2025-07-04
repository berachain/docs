---
head:
  - - meta
    - property: og:title
      content: Monitoring a Berachain Node
---

# Monitoring a Berachain node

Berachain nodes operate as a joined pair of execution layer and consensus layer. The healthy operation of these servers can be tracked by monitoring metrics exposed over Prometheus endpoints, which are collected by Prometheus and graphed with Grafana. This guide will describe setting up monitoring of a Berachain node with Prometheus and Grafana.

## What are Prometheus and Grafana?

Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability. It functions as a time series database that collects and stores metrics from monitored targets at regular intervals. Prometheus works on a pull-based model, where it scrapes HTTP endpoints exposed by services like `beacond` or `geth`. These services listen on dedicated ports and respond with metrics in a simple text-based format. For Berachain nodes, Prometheus is essential for tracking performance metrics, resource utilization, and operational health over time.

Grafana is a visualization and analytics platform often paired with Prometheus. While Prometheus collects and stores metrics, Grafana provides a powerful interface to query, visualize, and understand that data through customizable dashboards. It allows node operators to create graphs, charts, and alerts based on Prometheus metrics, making it easier to monitor node performance, identify issues, and track the health of Berachain nodes over time.

### Grafana & Prometheus Setup

Grafana has commercial ("enterprise") and open-source variants. Refer to its [installation instructions](https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/).

Prometheus is fully open-source. Refer to its [installation instructions](https://prometheus.io/docs/prometheus/latest/installation/).

Once installed, set up grafana so that you can sign in as an administrator, and set up the Prometheus data source (by default on `localhost:9100`).

We recommend the following additional packages:

- `prometheus-blackbox-exporter` monitors TCP and HTTP endpoints, providing prometheus metrics
- `prometheus-node-exporter` collects operating system metrics from the host computer
- `prometheus-alertmanager` to identify failure conditions and dispatch alerts

## What Should be Monitored

At minimum:

1. The **public** TCP/IP endpoints for your beacon kit, generally on port 26656.
2. The **public** TCP/IP endpoint for your execution layer. This is usually on TCP port 30303.
3. The **block height** for both of these
4. **Operating system telemetry**

It is not sufficient to monitor an internal IP address, when the important thing is whether the system is reachable from the Internet.

## Monitoring Service Endpoints

The following prometheus configuration sets up monitoring for TCP endpoints.

**File: `/etc/prometheus/prometheus.yml`**

```yaml
scrape_configs:
  - job_name: listening
    metrics_path: /probe
    params:
      module: [tcp_connect]
    static_configs:
      - targets: ['a.b.c.d:30303', 'a.b.c.d:26656']
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115
```

In the above configuration, monitoring is set up to ensure port 26656 (a beacond instance) and 30303 (a reth/geth instance) are listening.

When you restart prometheus with this configuration, it should begin publishing a `probe_success` metric with a 0 or 1 value to indicate DOWN or UP.

## Monitoring Beacon-Kit

Beacon-Kit must have the Prometheus instrumentation enabled. To do this, revise the configuration:

**File: `config.toml`**

```toml
[instrumentation]
prometheus = true
prometheus_listen_addr = "0.0.0.0:9107"
```

This enables the Beacon-Kit client to listen on port 9107. As a precaution, ensure this port can't be reached by the public with a firewall or by scoping the address to your administrative network instead of 0.0.0.0.

Then, add this endpoint to Prometheus by referring to the metrics port:

**File: `/etc/prometheus/prometheus.yml`**

```yaml
scrape_configs:
  - job_name: beacond
    static_configs:
      - targets: ['localhost:9107']
```

With this enabled, beacond exports a considerable number of metrics. Here are some of the more useful ones:

- `cometbft_consensus_height` is the block height of the Beacon Chain
- `cometbft_consensus_rounds` reports the number of consensus rounds CometBFT has gone through for the current block. This should normally not rise above 1.
- `cometbft_p2p_message_receive_bytes_total` (and `cometbft_p2p_message_send_bytes_total`) show the network traffic received and sent
- `cometbft_p2p_peers` is the total (incoming + outgoing) peer connections to `beacond`

## Monitoring Execution Layer

Both `geth` and `reth` allow you to enable metrics with identical command line options:

`--metrics
--metrics.port 9108
--metrics.addr 0.0.0.0
`

The address, again, should be either on a private network or not accessible to the public via firewall rule. `reth` publishes the metrics at `/metrics`, while `geth` mixes things up by using `/debug/metrics/prometheus`.

After restarting your EL to begin publishing metrics at your chosen port, add this endpoint to Prometheus by referring to the metrics port. **You only need the one which matches your EL client:**

**File: `/etc/prometheus/prometheus.yml`**

```yaml
scrape_configs:
  - job_name: geth
    metrics_path: /debug/metrics/prometheus
    static_configs:
      - targets: ['localhost:9108']

  - job_name: reth
    metrics_path: /metrics
    static_configs:
      - targets: ['localhost:9108']
```

`geth` publishes the following interesting metrics:

- `chain_head_finalized` is the chain height for the `_finalized` sync step. There are additional steps available such as `_receipt`, `_header`, etc.
- `eth_db_chaindata_disk_size` is the on-disk size of the chain data.
- `p2p_peers_inbound` and `p2p_peers_outbound` are the number of connections propagating transactions and blocks.
- `irate(txpool_known[5m])` is the number of new transactions introduced to the pool in the last 5 minutes, and is an indicator of successful peering.

`reth` publishes the following interesting metrics:

- `reth_sync_checkpoint` is the chain height, with details available on the height/progress of every sync step (there are ~ 14)
- `reth_network_outgoing_connections` and `reth_network_incoming_connections` are the number of connections propagating transactions and blocks.
- `reth_transaction_pool_pending_pool_transactions` shows the number of transactions pending in the pool (i.e. waiting to be executed). This is different from `reth_transaction_pool_queued_pool_transactions` in that queued transactions are stuck due to a wrong nonce.
- `reth_sync_execution_gas_per_second` shows the execution engine's performance, measured in gas/sec.

## Sample Dashboard

All of the above metrics are collected into a sample Grafana dashboard shown below.
If you would like to start with this dashboard as a basis for your system, download the dashboard description file - as a JSON file which can be imported into Grafana - at https://github.com/berachain/guides/tree/main/apps/grafana/sample-dashboard.json

![Berachain Grafana Dashboard](/assets/guides/monitoring-dashboard-1.png)
![Berachain Grafana Dashboard](/assets/guides/monitoring-dashboard-2.png)

## Further exploration

[This article](https://research.despread.io/berachain-monitoring/) by Despread, a Berachain Validator, provides a lot of useful insight about monitoring what's happening on the Beacon Chain.

Set up alerts in Grafana to dispatch notifications when a service goes down, or you begin to run low on disk space.

Grafana offers a feature called Drilldown that allows you to explore the metrics available to you. Some metrics are more useful than others.

Synthetic metrics combine data from different sources to create new metrics. A good example of the application of this idea to Berachain is available at [StakeLab's monitoring-tools repository](https://github.com/StakeLab-Zone/monitoring-tools/tree/main).
