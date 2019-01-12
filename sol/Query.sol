pragma solidity ^0.4.24;

contract Query {
    address public contributor;
    address public platform;
    
    constructor(address _contributor, address _platform) public {
        contributor = _contributor;
        platform = _platform;
    }
    
    function transfer() payable public {
        //address is ether wallet address.
        contributor.transfer(8000);
        platform.transfer(2000);
    }
}