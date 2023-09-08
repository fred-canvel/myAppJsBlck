
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contract with the account: ${deployer.address}`);

  const Lock = await ethers.getContractFactory('UserRegistration');
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log(`Contract address: ${lock.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
