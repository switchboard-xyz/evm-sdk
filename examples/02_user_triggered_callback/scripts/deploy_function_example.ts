import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("ReceiverExample", [
    "0x77409146b4d38c230c83ce7f971094b036192973", // switchboard address,
    "0x33dD841ea7Fd76ED60F6d64f3d4E2a91C811f0a6", // TODO: INSERT FUNCTION_ID HERE - THIS CAN BE DECIDED AHEAD OF TIME
  ]);
  await contract.deployed();
  console.log("ReceiverExample deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
