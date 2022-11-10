pragma solidity 0.8.17;

import "./Reward.sol";
import "./Tether.sol";

contract DecentralBank{
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Reward public reward;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Reward _reward, Tether _tether) public{
        reward = _reward;
        tether = _tether;
    }

    function depositToken(uint _amount) public {
        require(_amount > 0, "amount cannot be zero");
//        transfer tether tokens to this address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

//        update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
//        update stacking
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }
}
