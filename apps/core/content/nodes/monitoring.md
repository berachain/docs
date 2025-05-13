---
head:
  - - meta
    - property: og:title
      content: Monitoring a Berachain Node
---

# Monitoring a Berachain node

Berachain nodes operate as a joined pair of execution layer and consensus layer. The healthy operation of these servers can be tracked by monitoring metrics exposed over Prometheus endpoints, which are collected by Prometheus and graphed with Grafana. This guide will describe setting up monitoring of a Berachain node with Prometheus and Grafana.

## What is Prometheus and Grafana?

Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability. It functions as a time series database that collects and stores metrics from monitored targets at regular intervals. Prometheus works on a pull-based model, where it scrapes HTTP endpoints exposed by services like `beacond` or `geth`. These services listen on dedicated ports and respond with metrics in a simple text-based format. Prometheus features a flexible query language (PromQL) for data analysis, operates autonomously without distributed storage dependencies, and includes built-in alerting capabilities. For Berachain nodes, Prometheus is essential for tracking performance metrics, resource utilization, and operational health over time.

Grafana is a visualization and analytics platform often paired with Prometheus. While Prometheus collects and stores metrics, Grafana provides a powerful interface to query, visualize, and understand that data through customizable dashboards. It allows node operators to create graphs, charts, and alerts based on Prometheus metrics, making it easier to monitor node performance, identify issues, and track the health of Berachain nodes over time. The combination of Prometheus for data collection and Grafana for visualization creates a comprehensive monitoring solution.

### Grafana & Prometheus Setup

Grafana has commercial ("enterprise") and open-source variants. Refer to its [installation instructions](https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/).

Prometheus is fully open-source.   Refer to its [installation instructions](https://prometheus.io/docs/prometheus/latest/installation/).

Once installed, set up grafana so that you can sign in as an administrator, and set up the Prometheus data source (by default on `localhost:9100`).

 We recommend the following additional packages:
 * `prometheus-blackbox-exporter` monitors TCP and HTTP endpoints, providing prometheus metrics
 * `prometheus-node-exporter` collects operating system metrics from the host computer
 * `prometheus-alertmanager` to identify failure conditions and dispatch alerts

## Service endpoints

1. **Execution Layer Traffic.** This is usually on TCP port 30303. 
2. **Execution Layer Peer Discovery.** This is usually on UDP port 30303.
3. **Consensus Layer.** This is by default on TCP port 26656.

Prometheus configuration:

**File: `prometheus.yml`**

```yaml
  - job_name: berachain_mainnet_monitor
    static_configs:
    - targets:
            - 'x.x.x.x:30303'
            - 'y.y.y.y:26656'
```

## Beacon-Kit Health

## Execution Layer Health
