// spdx-license-identifier:mit;

pragma solidity 0.8.17;


contract Migration{
    address public owner;
    uint public last_migrated;

    constructor() public {
        owner=msg.sender;
    }
    modifier restricted{
        require(msg.sender==owner);
        _;
    }

    function setCompleted(uint completed) public restricted{
        last_migrated = completed;
    }
    function upgrade(address new_address) public restricted{
        Migration upgraded = Migration(new_address);
        upgraded.setCompleted(last_migrated);
    }
}