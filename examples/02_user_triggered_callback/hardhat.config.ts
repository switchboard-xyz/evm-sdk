import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-abi-exporter";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-contract-sizer";

import * as dotenv from "dotenv";
import type { HardhatUserConfig } from "hardhat/config";
import { task } from "hardhat/config";

dotenv.config();

task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  paths: {
    sources: "./src",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
    strict: true,
    only: [],
    except: [],
  },
  abiExporter: {
    path: "./abis",
    runOnCompile: true,
    clear: true,
    flat: false,
    only: [],
    spacing: 2,
    pretty: true,
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      chainId: 31337,
      hardfork: "shanghai",
      allowUnlimitedContractSize: true,
      forking: {
        url: process.env.ETH_MAINNET_URL || "",
        // The Hardhat network will by default fork from the latest mainnet block
        // To pin the block number, specify it below
        // You will need access to a node with archival data for this to work!
        // blockNumber: 14743877,
        // If you want to do some forking, set `enabled` to true
        enabled: false,
      },
      // zksync: true, // Enables zkSync in the Hardhat local network
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      // gas: 30000000,
    },
    kovan: {
      chainId: 42,
      url: process.env.ETH_KOVAN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    ropsten: {
      chainId: 3,
      url: process.env.ETH_ROPSTEN_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    goerli: {
      chainId: 5,
      url: process.env.ETH_GOERLI_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    sepolia: {
      chainId: 11155111,
      url: process.env.ETH_SEPOLIA_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    ethMain: {
      chainId: 1,
      url: process.env.ETH_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    coredaoMain: {
      chainId: 1116,
      url: process.env.COREDAO_MAINNET_URL || "https://rpc.coredao.org",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    coredaoTestnet: {
      chainId: 1115,
      url: process.env.COREDAO_TESTNET_URL || "https://rpc.test.btcs.network",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;
