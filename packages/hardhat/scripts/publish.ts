import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as bre from 'hardhat';
import { ContractJson } from 'helpers/types/hardhat.types';

const publishDir = '../app/src/contracts';
const graphDir = '../subgraph';

function publishContract(contractName: string) {
   console.log(' 💽 Publishing', chalk.cyan(contractName), 'to', chalk.gray(publishDir));
   try {
      let contractString = fs.readFileSync(`${bre.config.paths.artifacts}/contracts/${contractName}.sol/${contractName}.json`).toString();
      const address = fs.readFileSync(`${bre.config.paths.artifacts}/${contractName}.address`).toString();
      const contract: ContractJson = JSON.parse(contractString);

      fs.writeFileSync(`${publishDir}/${contractName}.address.js`, `module.exports = "${address}";`);
      fs.writeFileSync(`${publishDir}/${contractName}.abi.js`, `module.exports = ${JSON.stringify(contract.abi, null, 2)};`);
      fs.writeFileSync(`${publishDir}/${contractName}.bytecode.js`, `module.exports = "${contract.bytecode}";`);

      let graphConfigPath = `${graphDir}/config/config.json`;
      let graphConfig;
      try {
         if (fs.existsSync(graphConfigPath)) {
            graphConfig = fs.readFileSync(graphConfigPath).toString();
         } else {
            graphConfig = '{}';
         }
      } catch (e) {
         console.log(e);
      }

      graphConfig = JSON.parse(graphConfig ?? '');
      graphConfig[contractName + 'Address'] = address;

      const folderPath = graphConfigPath.replace('/config.json', '');
      if (!fs.existsSync(folderPath)) {
         fs.mkdirSync(folderPath);
      }
      fs.writeFileSync(graphConfigPath, JSON.stringify(graphConfig, null, 2));
      fs.writeFileSync(`${graphDir}/abis/${contractName}.json`, JSON.stringify(contract.abi, null, 2));

      console.log(' 📠 Published ' + chalk.green(contractName) + ' to the frontend.');

      return true;
   } catch (e) {
      if (e.toString().indexOf('no such file or directory') >= 0) {
         console.log(chalk.yellow(" ⚠️  Can't publish " + contractName + ' yet (make sure it has an address file and is getting deployed).'));
      } else {
         console.log(e);
         return false;
      }
   }
}

async function main() {
   if (!fs.existsSync(publishDir)) {
      fs.mkdirSync(publishDir);
   }
   const finalContractList: string[] = [];
   fs.readdirSync(bre.config.paths.sources).forEach((file) => {
      if (file.indexOf('.sol') >= 0) {
         const contractName = file.replace('.sol', '');
         // Add contract to list if publishing is successful
         if (publishContract(contractName)) {
            finalContractList.push(contractName);
         }
      }
   });
   fs.writeFileSync(`${publishDir}/contracts.js`, `module.exports = ${JSON.stringify(finalContractList)};`);
}
main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
