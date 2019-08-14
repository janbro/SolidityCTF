pragma solidity ^0.5.8;

contract ProxyData {
    address internal implementation;
}

/** The storage layout of our proxy contract has the implementation address at 0x0, our implementation contract needs to know this so it doesn't overwrite the address which is why we extend ProxyData. Alternatively you can declare a variable of the same size at the top of the contract but be sure to not overwrite the value or your proxy contract will break.
 */
contract Contract is ProxyData {

    uint256 some_value;

    /** The init function is used in place of a constructor since we cannot directly call the constructor when creating a proxy contract
     */
    function init() public payable {
        require(msg.value == 0.5 ether, "Must send 0.5 Ether");
        some_value = 42;
    }

    /** CTF helper function
     *  Used to check if challenge is complete
     */
    function isComplete() public view returns (bool) {
        return address(this).balance == 0;
    }

}