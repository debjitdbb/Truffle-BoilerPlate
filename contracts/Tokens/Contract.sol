// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Contract is ERC20 {
    address public owner;

    constructor() ERC20("Contract", "CNT") {
        owner = msg.sender;
        _mint(msg.sender, 10000000 * (10**uint256(decimals())));
    }

}
