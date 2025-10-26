// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GoldBarTether {
    string public name = "GoldBarTether";
    string public symbol = "GBT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10 ** 18;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    event Transfer(address indexed from, address indexed to, uint256 value);

    function transfer(address to, uint256 value) external returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
}
