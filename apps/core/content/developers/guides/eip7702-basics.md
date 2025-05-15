---
head:
  - - meta
    - property: og:title
      content: Understand EIP7702 Basics
  - - meta
    - name: description
      content: Learn the basics on understanding EIP7702 by setting code for an EOA
  - - meta
    - property: og:description
      content: Learn the basics on understanding EIP7702 by setting code for an EOA
---

<script setup>
  import config from '@berachain/config/constants.json';
</script>

# EIP-7702 Basics For Setting Code For An EOA

The goal of this tutorial is to understand the new functionality of [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) and its limitations using Foundry.

In this guide, we will deploy a basic HelloWorld contract, a Counter contract, a SimpleDelegate contract, and perform cleanup to understand the nuances of setting code for an EOA.

![EIP-7702 Basics](/assets/eip7702-basics.png)

:::danger
PLEASE AVOID PRODUCTION: These contracts have not been audited and deploying them would be at your own risk.
:::

## Requirements

Make sure you have the following installed on your computer before we begin:

- Foundry Forge & Cast v1.0.0 or greater

## Setting HelloWorld Code For EOA

In this first step, we will set specific code for an EOA to a `HelloWorld.sol` contract to demonstrate what is expected to function and what is not expected to work.

### Step 1 - New Forge Project

```bash
mkdir eip7702-basics;
cd eip7702-basics;
forge init --force;
```

### Step 2 - Create HelloWorld & Deployment Contract

```bash
# FROM: /eip7702-basics

cat > src/HelloWorld.sol << EOF
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract HelloWorld {
    string public message = "Default message";

    address public owner;
    bool public init;

    constructor() {
        message = "Hello World";
        owner = msg.sender;
    }

    function initialize() public {
        require(!init, "Contract already initialized");
        owner = msg.sender;
        message = "Something Else!";
        init = true;
    }

    function setMessage(string memory newMessage) public {
        require(msg.sender == owner, "Only owner can set message");
        message = newMessage;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }
}
EOF

cat > script/HelloWorld.s.sol << EOF
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {HelloWorld} from "../src/HelloWorld.sol";

contract HelloWorldScript is Script {
    function run() public {
        vm.startBroadcast();
        new HelloWorld();
        vm.stopBroadcast();
    }
}
EOF
```

### Step 3 - Deploy HelloWorld Contract

```bash
# FROM: /eip7702-basics

# EOA we're setting code for
EOA_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
EOA_PK=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
OTHER_ADDRESS=0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
OTHER_PK=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
RPC_URL=http://localhost:8545;
forge script script/HelloWorld.s.sol --rpc-url $RPC_URL --private-key $EOA_PK --broadcast -vvvv;

# [Expected Similar Output]:
# ...
# Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
# ...
```

Export the contract address as an environment variable:

```bash
# FROM: /eip7702-basics

CONTRACT_ADDRESS=<YOUR_DEPLOYED_CONTRACT_ADDRESS>
```

### Step 4 - Verify Deployed Contract Message

```bash
# FROM: /eip7702-basics

cast call $CONTRACT_ADDRESS "getMessage()(string)" --rpc-url $RPC_URL;

# [Expected Output]:
 # "Hello World"
```

### Step 5 - Set HelloWorld Code For EOA

You'll notice that the transaction submitted in this next step sets the code for the EOA, but the transaction must come from another account.
This is because if the transaction comes from the original EOA attempting to set its own code, clients like `cast` will treat it as a normal EOA transaction and never load the bytecode or apply the signed authorization.

```bash
# FROM: /eip7702-basics

SIGNED_AUTH=$(cast wallet sign-auth $CONTRACT_ADDRESS --private-key $EOA_PK --rpc-url $RPC_URL);
# Must not come from the original EOA_PK
cast send $(cast az) --private-key $OTHER_PK --auth $SIGNED_AUTH --rpc-url $RPC_URL;

# [Expected Similar Output]:
# ...
# transactionHash      0x0aa309f974118982c198ef24860c2be98921e871ed262f0cb92473944d6a0107
# ...
```

Export the transaction hash:

```bash
# FROM: /eip7702-basics

TXN=<YOUR_TXN_HASH>
```

### Step 6 - Verify Authorization List

```bash
# FROM: /eip7702-basics

cast tx $TXN --rpc-url $RPC_URL;

# [Expected Similar Output]:
# authorizationList    [
# 	{recoveredAuthority: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, signedAuthority: {"chainId":"0x7a69","address":"0x5fbdb2315678afecb367f032d93f642f64180aa3","nonce":"0x1","yParity":"0x1","r":"0xb479f2c7d70a98008f27bbf4fb5e67daa0764459ed4c3337cdd906e53ac8b427","s":"0x34d77ad2562e633a90f2a3c9d84098b4b6e6a9e8ad04d8484fe7d8d205f41483"}}
# ]
```

### Step 7 - Verify EOA Code Set

```bash
# FROM: /eip7702-basics

cast code $EOA_ADDRESS --rpc-url $RPC_URL;

# [Expected Similar Output]:
# 0xef01005fbdb2315678afecb367f032d93f642f64180aa3
```

Notice the prefix `0xef0100` and the contract address `5FbDB2315678afecb367f032d93F642f64180aa3`.

### Step 8 - Verify EOA Code Message

```bash
# FROM: /eip7702-basics

cast call $EOA_ADDRESS "getMessage()(string)" --rpc-url $RPC_URL;

# [Expected Output]:
# ""
```

Why is it blank, and why didn't the constructor initialize the message variable?

This is because storage initialization normally gets applied during contract deployment. When setting code for an EOA, you're effectively not deploying or executing a constructor, and no storage allocations have been initialized or set.

If you compare the `$EOA_ADDRESS` to the `$CONTRACT_ADDRESS` slots, you can see the difference:

```bash
# FROM: /eip7702-basics

cast storage $CONTRACT_ADDRESS 1;
# [Expected Output]:
# 0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266
cast storage $EOA_ADDRESS 1;
# [Expected Output]:
# 0x0000000000000000000000000000000000000000000000000000000000000000
```

### Step 9 - Initialize HelloWorld EOA Code

When calling functions on the `EOA_ADDRESS`, they can be called by any wallet, including the originating `EOA_PK`.
The main consideration is that the `owner` of the contract is set by whoever calls `initialize`.

```bash
# FROM: /eip7702-basics

cast send $EOA_ADDRESS "initialize()" \
  --private-key $OTHER_PK \
  --rpc-url $RPC_URL;

# [Expected Similar Output]:
# blockHash            0x0a4faff75f3ff5a4fef264ee0587be0ee833d74586ed64ae7d5f84f7c6ba5db4
# ...
```

### Step 10 - Verify New EOA Message

We can verify that the `message` has been updated and also verify the storage slot change.

```bash
# FROM: /eip7702-basics

cast call $EOA_ADDRESS "getMessage()(string)" --rpc-url $RPC_URL;

# [Expected Output]:
# "Something Else!"

cast storage $EOA_ADDRESS 1;
# [Expected Output]:
# 0x00000000000000000000000170997970c51812dc3a010c7d01b50e0d17dc79c8
```

### Step 11 - Set New EOA Message

Additional functions can also be triggered, but since the `OTHER_ADDRESS` initialized the contract, it has been set as the `owner` and is the only address that can set messages.

```bash
# FROM: /eip7702-basics

cast send $EOA_ADDRESS "setMessage(string)" "Goodbye World" --private-key $OTHER_PK --rpc-url $RPC_URL;
cast call $EOA_ADDRESS "getMessage()(string)" --rpc-url $RPC_URL;

# [Expected Output]:
# "Goodbye World"
```

## Setting Counter Code For EOA

Next, we'll walk through deploying a simple Counter contract to set as code for an EOA and examine how that affects its storage slots.

### Step 1 - Create Counter Contract Code

```bash
# FROM: /eip7702-basics

cat > src/Counter.sol << EOF
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}
EOF

cat > script/Counter.s.sol << EOF
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is Script {
    Counter public counter;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        counter = new Counter();
        vm.stopBroadcast();
    }
}
EOF
```

### Step 2 - Deploy Counter Contract

```bash
# FROM: /eip7702-basics

# EOA we're setting code for
EOA_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
EOA_PK=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
OTHER_ADDRESS=0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
OTHER_PK=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
RPC_URL=http://localhost:8545;
forge script script/Counter.s.sol --rpc-url $RPC_URL --private-key $EOA_PK --broadcast -vvvv;

# [Expected Similar Output]:
# ...
# Contract Address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
# ...
```

Export the contract address as an environment variable:

```bash
# FROM: /eip7702-basics

CONTRACT_ADDRESS=<YOUR_DEPLOYED_CONTRACT_ADDRESS>
```

### Step 3 - Set Counter Code For EOA

```bash
# FROM: /eip7702-basics

SIGNED_AUTH=$(cast wallet sign-auth $CONTRACT_ADDRESS --private-key $EOA_PK --rpc-url $RPC_URL);
# Must not come from the original EOA_PK
cast send $(cast az) --private-key $OTHER_PK --auth $SIGNED_AUTH --rpc-url $RPC_URL;

# [Expected Similar Output]:
# ...
# transactionHash      0x305b3a0337ed695e84fcaeda8a4490eb502db8e8165cfea0daa9bdc6d0e33e29
# ...
```

Export the transaction hash:

```bash
# FROM: /eip7702-basics

TXN=<YOUR_TXN_HASH>
```

### Step 4 - Verify Previous Storage Slots Conflict

Now that we have set our EOA code to another contract code, we will see that the storage slot value has carried over from our [initialized HelloWorld contract](#step-10-verify-new-eoa-message).

```bash
# FROM: /eip7702-basics

cast storage $EOA_ADDRESS 1;
# [Expected Output]:
# 0x00000000000000000000000170997970c51812dc3a010c7d01b50e0d17dc79c8
```

This can also pose a problem, as we noted before that storage slots aren't initialized and simply carry forward what was there before.

:::warning
NOTE: When setting code for an EOA, consider examining its storage slots and creating an initialize function that resets these values.
:::

```bash
# FROM: /eip7702-basics

cast call $CONTRACT_ADDRESS "number()(uint256)" --rpc-url $RPC_URL;
# [Expected Output]:
# 0

cast call $EOA_ADDRESS "number()(uint256)" --rpc-url $RPC_URL;
# [Expected Incorrect Output]:
# 37738841482167102822784567685588449352038201195630954555629069933914850590750
```

## Setting SimpleDelegate Code For EOA

As another example, we'll demonstrate how you can specify any call data for the EOA to execute.

:::danger
USE ONLY FOR TESTING PURPOSES. This contract essentially provides an open door for anyone to make you process transactions.
:::

### Step 1 - Create SimpleDelegate Contract Code

```bash
# FROM: /eip7702-basics

cat > src/SimpleDelegate.sol << EOF
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleDelegate {
  struct Call {
    bytes data;
    address to;
    uint256 value;
  }

  error ExternalCallFailed();

  function execute(Call[] memory calls) external payable { // lack of access control
    for (uint256 i = 0; i < calls.length; i++) {
      Call memory call = calls[i];

      (bool success,) = call.to.call{value: call.value}(call.data);
      require(success, ExternalCallFailed());
    }
  }
}
EOF

cat > script/SimpleDelegate.s.sol << EOF
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {SimpleDelegate} from "../src/SimpleDelegate.sol";

contract SimpleDelegateScript is Script {
    SimpleDelegate public simpleDelegate;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        simpleDelegate = new SimpleDelegate();
        vm.stopBroadcast();
    }
}
EOF
```

### Step 2 - Create ERC20Token Contract Code

```bash
# FROM: /eip7702-basics

cat > src/ERC20Token.sol << EOF
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
EOF

cat > script/ERC20Token.s.sol << EOF
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {ERC20Token} from "../src/ERC20Token.sol";

contract ERC20TokenScript is Script {
    ERC20Token public token;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        token = new ERC20Token("MyToken", "MTK");
        vm.stopBroadcast();
    }
}
EOF
```

### Step 3 - Deploy SimpleDelegate ERC20Token Contract

```bash
# FROM: /eip7702-basics

# EOA we're setting code for
EOA_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
EOA_PK=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
OTHER_ADDRESS=0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
OTHER_PK=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
RPC_URL=http://localhost:8545;

forge install OpenZeppelin/openzeppelin-contracts;
forge script script/SimpleDelegate.s.sol --rpc-url $RPC_URL --private-key $EOA_PK --broadcast -vvvv --via-ir;
forge script script/ERC20Token.s.sol --rpc-url $RPC_URL --private-key $EOA_PK --broadcast -vvvv --via-ir;

# [Expected Similar Output]:
# ...
# Contract Address: 0x0165878A594ca255338adfa4d48449f69242Eb8F
# ...
```

Export the contract addresses as an environment variables:

```bash
# FROM: /eip7702-basics

CONTRACT_ADDRESS=<YOUR_DEPLOYED_CONTRACT_ADDRESS>
ERC20_ADDRESS=<YOUR_DEPLOYED_ERC20_ADDRESS>
```

### Step 4 - Set SimpleDelegate Code For EOA

```bash
# FROM: /eip7702-basics

SIGNED_AUTH=$(cast wallet sign-auth $CONTRACT_ADDRESS --private-key $EOA_PK --rpc-url $RPC_URL);
# Must not come from the original EOA_PK
cast send $(cast az) --private-key $OTHER_PK --auth $SIGNED_AUTH --rpc-url $RPC_URL;

# [Expected Similar Output]:
# ...
# transactionHash      0xc1316e76e9a4cc43d646cebef47e5cae7207a84e3eef73d2b5ec45ae4785a193
# ...
```

### Step 5 - Burn BERA

Next, we'll introduce a transaction to burn some of the balance from the `EOA_ADDRESS`.

```bash
# FROM: /eip7702-basics

# Confirm existing balance
cast balance $EOA_ADDRESS;
# [Expected Similar Output]:
# 9999998774554943145151

# Burn 5 $BERA
cast send $EOA_ADDRESS "execute((bytes,address,uint256)[])" \
    '[(0x,0x0000000000000000000000000000000000000000,5000000000000000000)]' \
    --private-key $OTHER_PK \
    --rpc-url $RPC_URL;

# Recheck balance
cast balance $EOA_ADDRESS;
# [Expected Similar Output]:
# 9994998774554943145151
```

### Step 6 - Transfer ERC20 Tokens

Finally, we'll introduce a transaction to transfer ERC20 tokens to `OTHER_ADDRESS`.

```bash
# FROM: /eip7702-basics

# Check erc20 balances
cast call $ERC20_ADDRESS "balanceOf(address)(uint256)" $OTHER_ADDRESS --rpc-url $RPC_URL;
# [Expected Output]:
# 0
cast call $ERC20_ADDRESS "balanceOf(address)(uint256)" $EOA_ADDRESS --rpc-url $RPC_URL;
# [Expected Output]:
# 1000000000000000000000000

# Transfer erc20
CALL_DATA=$(cast calldata "transfer(address,uint256)" $OTHER_ADDRESS 700000000000000000000000);
cast send $EOA_ADDRESS "execute((bytes,address,uint256)[])" \
    "[($CALL_DATA,$ERC20_ADDRESS,0)]" \
    --private-key $OTHER_PK \
    --rpc-url $RPC_URL;

# Recheck erc20 balances
cast call $ERC20_ADDRESS "balanceOf(address)(uint256)" $OTHER_ADDRESS --rpc-url $RPC_URL;
# [Expected Output]:
# 700000000000000000000000
cast call $ERC20_ADDRESS "balanceOf(address)(uint256)" $EOA_ADDRESS --rpc-url $RPC_URL;
# [Expected Output]:
# 300000000000000000000000
```

## Clean Up Code For EOA

The last remaining step is to remove any code associated with the `EOA_ADDRESS`.

```bash
# FROM: /eip7702-basics

EOA_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
EOA_PK=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
OTHER_ADDRESS=0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
OTHER_PK=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;
RPC_URL=http://localhost:8545;

# Verify existing code
cast code $EOA_ADDRESS;
# [Expected Similar Output]:
# 0xef01000165878a594ca255338adfa4d48449f69242eb8f

# Set new code to 0x0
SIGNED_AUTH=$(cast wallet sign-auth 0x0000000000000000000000000000000000000000 --private-key $EOA_PK --rpc-url $RPC_URL);
# Must not come from the original EOA_PK
cast send $(cast az) --private-key $OTHER_PK --auth $SIGNED_AUTH --rpc-url $RPC_URL;

# Recheck existing code
cast code $EOA_ADDRESS;
# [Expected Similar Output]:
# 0x
```
