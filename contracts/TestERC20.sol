pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20{
    constructor(uint256 mintAmount)
    ERC20('Meta', 'Meta')
    {
        _mint(msg.sender, mintAmount);
    }
}
