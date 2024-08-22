---
head:
  - - meta
    - property: og:title
      content: Vault Interface
  - - meta
    - name: description
      content: Technical reference of Vault contract interface.
  - - meta
    - property: og:description
      content: Technical reference of Vault contract interface.
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# Vault Contract Interface

> <small><a target="_blank" :href="config.testnet.dapps.beratrail.url + 'address/' + config.contracts.vault.address">{{config.contracts.vault.address}}</a><span v-if="config.contracts.vault.abi">&nbsp;|&nbsp;<a target="_blank" :href="config.contracts.vault.abi">ABI JSON</a></span></small>

`Vault.sol` serves as the Honey vault which provides trading liquidity, and to which protocol fees accrue.

## deposit

```solidity
function deposit(
    uint256 assets,
    address receiver
) public returns (uint256)
```

Allows a user to deposit assets into the Vault and receive vault tokens in return.

**Parameters**
| Name | Type | Description |
| -------- | ------- | ------------------------------------------ |
| assets | uint256 | The amount of assets to deposit. |
| receiver | address | The address to receive the minted tokens. |

**Returns**

| Type    | Description                               |
| ------- | ----------------------------------------- |
| uint256 | The amount of tokens minted and received. |

## mint

```solidity
function mint(
    uint256 shares,
    address receiver
) public returns (uint256)
```

Allows a user to mint vault tokens by depositing assets into the Vault.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| shares | uint256 | The amount of vault tokens to mint. |
| receiver | address | The address to receive the minted tokens. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The amount of assets deposited. |

## withdraw

```solidity
function withdraw(
    uint256 assets,
    address receiver,
    address owner
) public returns (uint256)
```

Allows a user to withdraw assets from the Vault by burning vault tokens, denominated in number of underlying assets.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| assets | uint256 | The amount of assets to withdraw. |
| receiver | address | The address to receive the withdrawn assets. |
| owner | address | The address of the token owner. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The amount of vault tokens burned. |

## redeem

```solidity
function redeem(
    uint256 shares,
    address receiver,
    address owner
) public returns (uint256)
```

Allows a user to redeem vault tokens for the underlying assets, denomianted in vault shares.

**Parameters**

| Name     | Type    | Description                                 |
| -------- | ------- | ------------------------------------------- |
| shares   | uint256 | The amount of tokens to redeem.             |
| receiver | address | The address to receive the redeemed assets. |
| owner    | address | The address of the token owner.             |

**Returns**

| Type    | Description                    |
| ------- | ------------------------------ |
| uint256 | The amount of assets received. |

## makeWithdrawRequest

```solidity
function makeWithdrawRequest(uint256 shares) external
```

Allows a user to request a withdrawal of vault tokens.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| shares | uint256 | The amount of tokens to request withdrawal. |

## cancelWithdrawRequest

```solidity
function cancelWithdrawRequest(
    uint256 shares,
    uint256 unlockEpoch
) external
```

Allows a user to cancel a pending withdrawal request.

**Parameters**
| Name | Type | Description |
|--------------|----------|--------------------------------------|
| shares | uint256 | The amount of vault tokens to cancel withdrawal for. |
| unlockEpoch | uint256 | The epoch number when the withdrawal can be claimed. |

## maxDeposit

```solidity
function maxDeposit(address owner) public view returns (uint256)
```

Returns the maximum amount of assets that can be deposited by an owner.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| owner | address | The address of the owner. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The maximum amount of assets that can be deposited. |

## maxMint

```solidity
function maxMint(address) public view returns (uint256)
```

Returns the maximum amount of shares that can be minted.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| - | address | The address parameter is not used in the function. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The maximum amount of shares that can be minted. |

## maxWithdraw

```solidity
function maxWithdraw(address owner) public view returns (uint256)
```

Returns the maximum amount of assets that can be withdrawn by an owner.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| owner | address | The address of the owner. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The maximum amount of assets that can be withdrawn. |

## maxRedeem

```solidity
function maxRedeem(address owner) public view returns (uint256)
```

Returns the maximum amount of shares that can be redeemed by an owner.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| owner | address | The address of the owner. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The maximum amount of shares that can be redeemed. |

## sendAssets

```solidity
function sendAssets(uint256 assets, address receiver) external
```

Allows the PnL handler to send assets to a receiver.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| assets | uint256 | The amount of assets to send. |
| receiver | address | The address to receive the assets. |

## receiveAssets

```solidity
function receiveAssets(uint256 assets, address user) external
```

Allows the vault to receive assets from a user.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| assets | uint256 | The amount of assets received. |
| user | address | The address of the user sending the assets. |

## forceNewEpoch

```solidity
function forceNewEpoch() external
```

Allows anyone to force start a new epoch if the current epoch has exceeded the epoch length.

## tvl

```solidity
function tvl() public view returns (uint256)
```

Returns the total value locked (TVL) in the vault.

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The total value locked (TVL) in the vault. |

## availableAssets

```solidity
function availableAssets() public view returns (uint256)
```

Returns the amount of assets available in the vault.

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The amount of assets available in the vault. |

## marketCap

```solidity
function marketCap() public view returns (uint256)
```

Returns the market capitalization of the vault.

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The market capitalization of the vault. |

## balanceOfAssets

```solidity
function balanceOfAssets(address owner) public view returns (uint256)
```

Returns the balance of assets for a given owner.

**Parameters**
| Name | Type | Description |
|----------|----------|---------------------------------------|
| owner | address | The address of the owner. |

**Returns**
| Type | Description |
|----------|---------------------------------------|
| uint256 | The balance of assets for the owner. |
