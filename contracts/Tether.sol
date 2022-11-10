// spdx-license-identifier:mit;

pragma solidity 0.8.17;

contract Tether{
    string public name = "tether project";
    string public symbol = "USDT";
    uint public totalSupply = 1000000000000000000000000;
    uint public decimal = 18;

    event transfer(address indexed _from, address indexed _to, uint _value) ;
    event approval(address indexed _owner, address indexed _spender, uint _value);

    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    constructor(){
        balanceOf[msg.sender] = totalSupply;
    }
    function transferMock(address _to, uint _value) public returns(bool success){
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit transfer(msg.sender, _to, _value);
        return true;
    }
    function approve(address _spender, uint _value) public returns(bool success){
        allowance[msg.sender][_spender] = _value;
        emit approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns(bool success){
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[msg.sender][_from]);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit transfer(_from, _to, _value);
        return true;
    }

}
