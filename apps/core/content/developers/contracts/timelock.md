<script setup>
  import config from '@berachain/config/constants.json';
</script>

# TimeLock

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.timelock.address">{{config.contracts.timelock.address}}</a><span v-if="config.contracts.timelock.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.timelock.abi">ABI JSON</a></span></small>

**Inherits:**
UUPSUpgradeable, [TimelockControllerUpgradeable](https://docs.openzeppelin.com/contracts/5.x/api/governance#TimelockController)

## Functions

### initialize

```solidity
function initialize(
    uint256 minDelay,
    address[] memory proposers,
    address[] memory executors,
    address admin
)
    external
    initializer;
```

### \_authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyRole(DEFAULT_ADMIN_ROLE);
```
