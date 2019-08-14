pragma solidity ^0.5.8;

import './ProxyData.sol';

contract Proxy is ProxyData {

    constructor(address _address)
        public
        payable
    {
        implementation = _address;
    }

    function()
        external
        payable
    {
        address _impl = implementation;
        require(_impl != address(0x0));

        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0x0, calldatasize)
            let result := delegatecall(gas, _impl, ptr, calldatasize, 0, 0)
            returndatacopy(ptr, 0x0, returndatasize)
            switch result case 0 {revert(ptr, returndatasize)} default {return (ptr, returndatasize)}
        }
    }
}