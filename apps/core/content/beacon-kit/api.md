# Beacon Kit API Reference

## Beacon Chain JSON-RPC

## Node API

The Node API is default closed. To open it, revise your installation's `app.toml` and review the section `beacon-kit.node-api`.

### /eth/v1/node/version

Returns node version information.

### /eth/v2/debug/beacon/states/:state_id

Returns a quantity of debug information, including:
* validator root
* latest beacon and execution chain block headers
* various root hahes
* the node's understanding of the validator set voting power, slashing status

