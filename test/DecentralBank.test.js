const Tether = artifacts.require("./Tether.sol");
const Reward = artifacts.require("./Reward.sol");
const DecentralBank = artifacts.require("./DecentralBank.sol");

var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

contract ("DecentralBank", ([owner, investor]) => {
let tether, reward, decentralBank;

function tokens(number){
return web3.utils.toWei(number, "ether")
}

beforeEach(async () =>{
//load contract
tether = await Tether.new();
reward = await Reward.new();
decentralBank = await DecentralBank.new(reward.address, tether.address);

//trnasfer all reward token to bank
await reward.TransferReward(decentralBank.address,tokens("1000000"));

//transfer 100 mocks tether to investor
await tether.transferMock(investor, tokens("100"), {from:owner});
})

describe("mock tether deployment", async () =>{
it("should match the name and symbol correctly", async()=>{
const name = await tether.name()
const symbol = await tether.symbol()
assert.equal(name,"tether project")
assert.equal(symbol,"USDT")
})
})
describe("reward token deployment", async() =>{
it("should matches the name and symbol correctly", async () =>{
const name = await reward.name();
const symbol = await reward.symbol();
assert.equal(name, "Reward Token")
assert.equal(symbol,"RWD")
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
describe("staking", async() =>{
it("give tether tokens for staking", async() =>{
let result
//check investor balance
result = await tether.balanceOf(investor)
assert.equal(result,tokens("100"),"investor mock balance before staking")

////check staking for customer of 100 tokens
await tether.approve(decentralBank.address, tokens("100"), {from: investor})
await decentralBank.depositToken(tokens("100"), {from:investor})

////updated balance after staking
result = await tether.balanceOf(investor)
assert.equal(result.toString(), tokens("0"), "investor balance after staking 100 mock")

//////updated bank balance
result = await tether.balanceOf(decentralBank.address)
assert.equal(result, tokens("100"), "bank balance after staking 100 mock")

})
})

})
