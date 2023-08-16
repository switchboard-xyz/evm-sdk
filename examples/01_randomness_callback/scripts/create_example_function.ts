import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the queue with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const sb = await ethers.getContractAt(
    "SbFunction",
    "0x77409146b4d38c230c83ce7f971094b036192973" // SWITCHBOARD ADDRESS
  );
  const sw = await sb.deployed();

  console.log("Switchboard address:", sw.address);

  // ReceiverExample Deployed at 0x2FC2bDbA6ee5395C709F2b52135f90881bCddb29
  const tx = await sw.createFunctionWithId(
    "0x33dD841ea7Fd76ED60F6d64f3d4E2a91C811f0a6", // function ID
    "Example Function EVM", // name
    deployer.address, // authority address
    "0x5Bf2D76D77177B66246DEB17e9bE7219d0192c0b", // queue address
    "CONTAINER REGISTRY", // container registry
    "COINTAINER", // container name
    [], // version (bytes32)
    "*/15 * * * *", // every 15th minute
    "", // param schema
    [], // permitted caller addresses
    {
      value: ethers.utils.parseEther("0.00001"), // give it a little bit of ether
    }
  );

  const receipt = await tx.wait();

  console.log("LOGS:");
  receipt.logs.forEach((l: { topics: string[]; data: string }) =>
    console.log(sb.interface.parseLog(l))
  );

  console.log("RECEIPT:");
  console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
