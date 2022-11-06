// spdx-license-identifier:mit;

pragma solidity 0.8.17;

contract Reward{
    string public name = "Reward Token";
    string public symbol = "RWD";
    uint public totalSupply = 100000000000000000000;
    uint public decimal = 18;

    event Transfer(address indexed _from, address indexed _to, uint _value) ;
    event Approval(address indexed _owner, address indexed _spender, uint _value);

    mapping(address => uint) public BalanceOf;
    mapping(address => mapping(address => uint)) public Allowance;

    constructor(){
        BalanceOf[msg.sender] = totalSupply;
    }
    function TransferReward(address _to, uint _value) public returns(bool success){
        require(BalanceOf[msg.sender] >= _value);
        BalanceOf[msg.sender] -= _value;
        BalanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    function Approve(address _spender, uint _value) public returns(bool success){
        Allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function TransferFrom(address _from, address _to, uint _value) public returns(bool success){
        require(_value <= BalanceOf[_from]);
        require(_value <=Allowance[msg.sender][_from]);
        BalanceOf[msg.sender] -= _value;
        BalanceOf[_to] += _value;
        Allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

}