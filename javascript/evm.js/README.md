<div align="center">

![Switchboard Logo](https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.png)

# @switchboard-xyz/evm.js

> A Typescript client to interact with Switchboard on EVM based chains.

[![NPM Badge](https://img.shields.io/github/package-json/v/switchboard-xyz/evm-sdk?color=red&filename=javascript%2Fevm.js%2Fpackage.json&label=%40switchboard-xyz%2Fevm.js&logo=npm)](https://www.npmjs.com/package/@switchboard-xyz/evm.js)

</div>

## Install

```bash
npm i --save @switchboard-xyz/evm.js
```

## Usage

**Directory**

- [Load Switchboard Contract and Switchboard Push Receiver Contract Functions](#load-switchboard-contract-and-switchboard-push-receiver-contract-functions)

### Load Switchboard Contract and Switchboard Push Receiver Contract Functions

```ts
import ethers from "ethers";
import {
  getSwitchboard,
  getSwitchboardPushReceiver,
  getSwitchboardPushReceiverFeeds,
} from "@switchboard-xyz/evm.js";

const signer = new ethers.Wallet(privateKey);

// get switchboard contract functions
const switchboardProgram = await getSwitchboard(
  process.env.SWITCHBOARD_ADDRESS, // Switchboard contract address (from environment)
  signer // Signer instance
);

// get switchboard feeds contract functions
const switchboardPushReceiver = await getSwitchboardPushReceiver(
  process.env.SWITCHBOARD_PUSH_ADDRESS,
  signer
);

// log all feeds
const allFeeds = await getSwitchboardPushReceiverFeeds(switchboardPushReceiver);
console.log(allFeeds); // Feed[];
```
