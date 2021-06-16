// This adds support for typescript paths mappings
import 'tsconfig-paths/register';

import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import { HardhatUserConfig, task } from 'hardhat/config';

import * as fs from 'fs';
import * as path from 'path';

const privateKey = fs.readFileSync('.secret').toString().trim();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args: any, hre: any) => {
   const accounts = await hre.ethers.getSigners();

   for (const account of accounts) {
      console.log(account.address);
   }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
   solidity: '0.8.3',
   paths: {
      artifacts: './artifacts',
   },
   defaultNetwork: 'matic',
   networks: {
      hardhat: { chainId: 1337 },
      ropsten: {
         url: 'https://ropsten.infura.io/v3/5dfa36d18c644b03899ed28b35749d56',
         accounts: ['0x31e842079698b120ae4e30753160324e198ee6d0648f268ac8fb2ec9b6a616c2'],
      },
      matic: {
         url: 'https://rpc-mumbai.maticvigil.com',
         accounts: [privateKey],
      },
   },
};

export default config;
