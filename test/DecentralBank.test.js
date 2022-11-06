
const Tether = artifacts.require("Tether");
const Reward = artifacts.require("Reward");
const DecentralBank = artifacts.require("DecentralBank");


require("chai");
.use(require("chai-as-promised"))
.should()

contract ("DecentralBank", ([owner, customer]) => {
let tether, reward, decentralBank;

function tokens(number){
return web3.utils.toWei(number, "ether")
}

before(async () =>{
//load contract
tether = await Tether.new();
reward = await Reward.new();
decentralBank = await DecentralBank.new(reward.address, tether.address);

//trnasfer all reward token to bank
await reward.TransferReward(decentralBank.address,tokens("1000000"));

//transfer 100 mocks tether to investor/customer
await tether.transferMock(customer, tokens("100"), {from:owner});
})

describe("mock tether deployment",async()=>{
it("should match the name successfully", async()=>{
const name = await tether.name()
assert.equal(name,"tether project")
})
})
describe("reward token deployment", async() =>{
it("should matches the name correctly", async () =>{
const name = await reward.new();
//const symbol = await reward.new();
assert.equal(name, "Reward Token")
//assert.equal(symbol,"RWD")
})
})
describe("decentralBank deployment",async()=>{
it("should match the name successfully", async()=>{
const name = await decentralBank.name()
assert.equal(name,"Decentral Bank")
})
it("contract has enough tokens", async () =>{
let balance = await reward.BalanceOf(decentralBank.address)
assert.equal(balance, tokens("1000000"))
})
})
})
