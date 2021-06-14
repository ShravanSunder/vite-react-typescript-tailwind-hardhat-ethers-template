import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import { run, ethers } from 'hardhat';

async function main() {
   // Hardhat always runs the compile task when running scripts with its command
   // line interface.
   //
   // If this script is run directly using `node` you may want to call compile
   // manually to make sure everything is compiled
   // await hre.run('compile');

   // We get the contract to deploy
   const Greeter = await ethers.getContractFactory('Greeter');
   const greeter = await Greeter.deploy('Hello, Hardhat!');

   await greeter.deployed();

   console.log('Greeter deployed to:', greeter.address);

   // const Token = await ethers.getContractFactory('Token');
   // const token = await Token.deploy('Sam Token', 'SAT');
   // await token.deployed();

   console.log('Greeter deployed to:', greeter.address);
   // console.log('Token deployed to:', token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
