pragma solidity ^0.5.8;

import '../node_modules/@openzeppelin/contracts/ownership/Ownable.sol';
import './Proxy.sol';
import './Challenge.sol';

contract Deployer is Ownable {

    mapping (address => Proxy[5]) playersToContracts;
    mapping (address => bool[5]) playersToCompletion;
    mapping (address => string) playersToNickname;

    address[5] public challenges;

    constructor(address challenge1, address challenge2, address challenge3, address challenge4, address challenge5)
        public
    {
        challenges[0] = challenge1;
        challenges[1] = challenge2;
        challenges[2] = challenge3;
        challenges[3] = challenge4;
        challenges[4] = challenge5;
    }

    //------------------ STATE CHANGING FUNCTIONS ------------------------//

    function updateChallenge(address newAddress, uint256 index)
        public
        onlyOwner
    {
        challenges[index] = newAddress;
    }

    function deployChallenge(uint256 index)
        public
        payable
    {
        require(msg.value == 0.5 ether, "Must send 0.5 ether");

        require(isContract(address(challenges[index])), "Challenge has not been created yet");

        playersToContracts[msg.sender][index] = (new Proxy)(challenges[index]);

        Challenge(address(playersToContracts[msg.sender][index])).init.value(msg.value)();

        playersToCompletion[msg.sender][index] = false;
    }

    function setNickname(string memory name)
        public
    {
        playersToNickname[msg.sender] = name;
    }

    function completeChallenge(uint256 index)
        public
    {
        address _to = address(playersToContracts[msg.sender][index]);

        require(isContract(_to), "Contract has not been deployed");

        playersToCompletion[msg.sender][index] = Challenge(_to).isComplete();
    }

    //---------------------- VIEW FUNCTIONS -------------------------------//

    function isContract(address _addr)
        private
        view
        returns (bool)
    {
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }

    function getNicknameOf(address player)
        public
        view
        returns (string memory)
    {
        return playersToNickname[player];
    }

    function getAddressOf(address player, uint256 index)
        public
        view
        returns (address)
    {
        return address(playersToContracts[player][index]);
    }

    function checkCompletionOf(address player, uint256 index)
        public
        view
        returns (bool)
    {
        return playersToCompletion[player][index];
    }

}