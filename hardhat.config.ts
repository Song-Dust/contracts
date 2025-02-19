import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";

import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
require("solidity-coverage");

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

let accounts: string[] = [];

function setAccountIfExists(account: string | undefined) {
  if (account !== undefined) accounts.push(account);
}

setAccountIfExists(process.env.PRIVATE_KEY_OWNER);
setAccountIfExists(process.env.PRIVATE_KEY_DEV);
setAccountIfExists(process.env.PRIVATE_KEY_USER);

const config = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL !== undefined ? process.env.RINKEBY_URL : "",
      accounts: accounts,
      gas: "auto",
      gasPrice: "auto",
    },
    goerli: {
      url: process.env.GOERLI_URL !== undefined ? process.env.GOERLI_URL : "",
      accounts: accounts,
      gas: "auto",
      gasPrice: "auto",
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: { timeout: 10 * 60 * 1000 },
};

export default config;
