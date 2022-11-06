const Tether = artifacts.require("Tether");
const Reward = artifacts.require("Reward");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts){
//deploy mock tether
await deployer.deploy(Tether);
const tether = await Tether.deployed()

//deploy mock reward
await deployer.deploy(Reward);
const reward = await Reward.deployed();

//deploy mock DecentralBank
await deployer.deploy(DecentralBank, reward.address, tether.address);
const decentralBank = await DecentralBank.deployed();

// transfer reward token to bank
await reward.TransferReward(decentralBank.address, "1000000000000000000000000");

//distribute token to investor when they come to an account;
await tether.transferMock(accounts[1],"1000000000000000000")

}
