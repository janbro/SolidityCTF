pragma solidity ^0.5.8;

import './ProxyData.sol';

contract Challenge is ProxyData {
    function init() public payable;
    function isComplete() external view returns (bool);
}