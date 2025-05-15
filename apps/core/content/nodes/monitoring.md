---
head:
  - - meta
    - property: og:title
      content: Monitoring a Berachain Node
---

# Monitoring a Berachain node

Berachain nodes operate as a joined pair of execution layer and consensus layer. The healthy operation of these servers can be tracked by monitoring metrics exposed over Prometheus endpoints, which are collected by Prometheus and graphed with Grafana. This guide will describe setting up monitoring of a Berachain node with Prometheus and Grafana.

## What is Prometheus and Grafana?

Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability. It functions as a time series database that collects and stores metrics from monitored targets at regular intervals. Prometheus works on a pull-based model, where it scrapes HTTP endpoints exposed by services like `beacond` or `geth`. These services listen on dedicated ports and respond with metrics in a simple text-based format. For Berachain nodes, Prometheus is essential for tracking performance metrics, resource utilization, and operational health over time.

Grafana is a visualization and analytics platform often paired with Prometheus. While Prometheus collects and stores metrics, Grafana provides a powerful interface to query, visualize, and understand that data through customizable dashboards. It allows node operators to create graphs, charts, and alerts based on Prometheus metrics, making it easier to monitor node performance, identify issues, and track the health of Berachain nodes over time. 

### Grafana & Prometheus Setup

Grafana has commercial ("enterprise") and open-source variants. Refer to its [installation instructions](https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/).

Prometheus is fully open-source.   Refer to its [installation instructions](https://prometheus.io/docs/prometheus/latest/installation/).

Once installed, set up grafana so that you can sign in as an administrator, and set up the Prometheus data source (by default on `localhost:9100`).

 We recommend the following additional packages:
 * `prometheus-blackbox-exporter` monitors TCP and HTTP endpoints, providing prometheus metrics
 * `prometheus-node-exporter` collects operating system metrics from the host computer
 * `prometheus-alertmanager` to identify failure conditions and dispatch alerts

## Monitoring Service endpoints

1. **Execution Layer Traffic.** This is usually on TCP port 30303. 
2. **Execution Layer Peer Discovery.** This is usually on UDP port 30303.
3. **Consensus Layer.** This is by default on TCP port 26656.

The following prometheus configuration sets up monitoring for the TCP endpoints, and gives them a useful name.

**File: `/etc/prometheus/prometheus.yml`**

```yaml
scrape_configs:
  - job_name: listening
    metrics_path: /probe
    params:
      module: [tcp_connect]
    static_configs:
      - targets: ['127.0.0.1:21000', '127.0.0.1:21005']
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: 127.0.0.1:9115  
      - source_labels: [__param_target]
        regex: '127.0.0.1:21000'
        target_label: node_type
        replacement: 'testnet-reth-beacond'
      - source_labels: [__param_target]
        regex: '127.0.0.1:21005'
        target_label: node_type
        replacement: 'testnet-reth'
```

In the above configuration, monitoring is set up to ensure port 21000 (a beacond instance) and 21005 (a reth instance) are listening.

When you restart prometheus, it should begin publishing a `probe_success` metric. In the sample dashboards provided above, these values are overridden to read as DOWN or UP.

## Monitoring Beacon-Kit

Beacon-Kit must have the Prometheus instrumentation enabled. To do this, revise the configuration:

**File: `config.toml`**
```toml
[instrumentation]
prometheus = true
prometheus_listen_addr = "0.0.0.0:31007"
```

This enables the Beacon-Kit client to listen on port 21000.  As a precaution, ensure this port can't be reached by the public with a firewall or by scoping the addresss to your administrative network instead of 0.0.0.0.

Then, add this endpoint to Prometheus by referring to the metrics port:

**File: `/etc/prometheus/prometheus.yml`**
```yaml
scrape_configs:
  - job_name: beacond
    static_configs:
      - targets: ['localhost:31007']  
```

With this enabled, beacond exports a considerable number of metrics. Here are some of the more useful ones:
* `cometbft_consensus_height` is the block height of the Beacon Chain
* `cometbft_consensus_rounds` reports the number of consensus rounds CometBFT has gone through for the current block. This should normally not rise above 1.
* `cometbft_p2p_message_receive_bytes_total` (and `cometbft_p2p_message_send_bytes_total`) show the network traffic received and sent
* `cometbft_p2p_peers` is the total (incoming + outgoing) peer connections to `beacond`

These metrics and others are collected into the sample dashboard provided above.

## Monitoring Execution Layer

Both `geth` and `reth` allow you to enable metrics with identical command line options:

`--metrics
--metrics.port 21005
--metrics.addr 0.0.0.0
`

The address, again, should be either on a private network or not accessible to the public via firewall rule.   `reth` publishes the metrics at `/metrics`, while `geth` mixes things up by using `/debug/metrics/prometheus`.

After restarting your EL to begin publishing metrics at your chosen port, add this endpoint to Prometheus by referring to the metrics port:

**File: `/etc/prometheus/prometheus.yml`**
```yaml
scrape_configs:
  - job_name: geth
    metrics_path: /debug/metrics/prometheus
    static_configs:
      - targets: ['localhost:21005']

  - job_name: reth
    metrics_path: /metrics
    static_configs:
      - targets: ['localhost:21005']

```


Since the execution layer is responsible for transaction propagation, it is a good idea to also monitor the transaction pool telemetry, if your node is a validator.

## Further exploration

Set up alerts in Grafana to dispatch notifications when a service goes down, or you begin to run low on disk space.

Grafana offers a feature called Drilldown that allows you to explore the metrics available to you. Some metrics are more useful than others.  

Synthetic metrics combine data from different sources to create new metrics.  A good example of the application of this idea to Berachain is available at [StakeLab's monitoring-tools repository](https://github.com/StakeLab-Zone/monitoring-tools/tree/main).