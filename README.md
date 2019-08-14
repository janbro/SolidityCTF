# Solidity CTF

## What is this?
This is a site for deploying and checking completion of Solidity challenges for SwampCTF. We need a way to securely verify competitors have completed a challenge. Best way to see if competitors were able to understand and execute an exploit for the challenge is to have them exploit an actual live contract on the test network.

## Why is this?
CTFd doesn't support smart contract challenges and we need a way to securely verify competitors have completed the challenges. Best way to see if they were able to complete and understand a challenge is to have them exploit an actual live contract on the test network. Smart contract handles deployment and completion checking of contracts for competitors. Backend will return the flag to the user after sending an on chain transaction to check the user has completed the challenge.

## How do I compete?
Create an Ethereum account using the [MetaMask](https://metamask.io/) extension. Change your network to `Ropsten Test Network` or run a local RPC. Copy the challenge contract code into a file on [Remix](https://remix.ethereum.org) and paste the deployed contracts address into the `At Address` space in the `Run` tab. You can interact with the contract through remix. Make sure your environment in Remix is `Inject Web3` on `Ropsten`. Get Ether at [Ropsten Faucet](https://faucet.metamask.io/)

# Solidity

## Development
The app uses [Truffle](https://truffleframework.com/docs/truffle/overview) development environment for compilation and deployment of contracts. Deployer.sol contains all the deployment and challenge completion checking. The [contracts/Challenges](ChallengeContracts/contracts/Challenges) folder contains the Solidity challenges for the competition. Update the challenges the deployer points to in [migrations/2_deployer.js](ChallengeContracts/migrations/2_deployer.js).

`cd ChallengeContracts && npm install`

## Deployment

**Development**

Run your local ganache RPC with

`npm run ganache`

and push the contract to the local network with

`truffle deploy development`

**Production**

`truffle migrate --network ropsten`

## Challenges
- [Misnamed constructor](ChallengeContracts/contracts/Challenges/Challenge1)
- [Challenge 2](ChallengeContracts/contracts/Challenges/Challenge2)
- [Challenge 3](ChallengeContracts/contracts/Challenges/Challenge3)
- [Challenge 4](ChallengeContracts/contracts/Challenges/Challenge4)
- [Challenge 5](ChallengeContracts/contracts/Challenges/Challenge5)

# Frontend

## Development
The frontend for the challenges utilizes contracts compiled artifacts to display their information and interact with the deployer. To add a contract to the challenges page, simply add a object to the challenges array in [Challenge.js](solidity-ctf/src/Components/Challenge.js). A title, difficulty, decription (flavor text), and link to the contract artifact file is required. Be sure to have your deployer contract on the network you are using. Currently, the site will not allow any network other than Ropsten or a local RPC however you can update the targetNetwork to specify which should be allowed.

`cd solidity-ctf && npm install`

`npm run start`