// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

import * as path from "path";
import { ethers, network, artifacts } from "hardhat";

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const sb = await ethers.getContractFactory("ReadAFeed");

  // CoreDAO testnet
  const sw = await sb.deploy(
    "0xe9F5Ecb00BC437F061DF59d899F00f260740dC48",
    "0xFE2517c0A585Cd5b23174b01E275C2d8329c3D83"
  );
  await sw.deployed();

  console.log("ReadAFeed address:", sw.address);

  console.log(await (await sw.getLatestResult()).wait());

  console.log(`latest value is ${await (await sw.latestValue()).toString()}`);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(sw);
}

function saveFrontendFiles(sb: any) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "deployments");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Switchboard: sb.address }, undefined, 2)
  );

  const SwitchboardArtifact = artifacts.readArtifactSync("ReadAFeed");

  fs.writeFileSync(
    path.join(contractsDir, "ReadAFeed.json"),
    JSON.stringify(SwitchboardArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
