import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

class Homepage extends Component {
    render() {
      return (
        <Fragment>
            <div className="container mb-5 text-center">
                <div className="container mx-auto mt-5">
                    <h1>Solidity Challenges</h1>
                </div>
                <div className="container mx-auto mt-3 mb-5">
                    <h6>BOILERPLATE SOLIDITY CTF SITE</h6>
                </div>
                <div className="container mx-auto mt-3">
                    <div className="row justify-content-center">
                        <div className="col-2">
                            <Link to="/challenge/1" className="btn btn-primary btn-lg" role="button" aria-pressed="true">Challenge 1</Link>
                        </div>
                        <div className="col-2">
                            <Link to="/challenge/2" className="btn btn-primary btn-lg" role="button" aria-pressed="true">Challenge 2</Link>
                        </div>
                        <div className="col-2">
                            <Link to="/challenge/3" className="btn btn-primary btn-lg" role="button" aria-pressed="true">Challenge 3</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10"><hr></hr></div>
                <div className="col-1"></div>
            </div>
            <div className="container pt-5">
                <div className="row text-center">
                    <div className="col-sm">
                        <h4 className="mb-4">What is this?</h4>
                        <p className="text-left">
                            This is a site for deploying and checking completion of Solidity challenges for <a target="_blank" href="#/">[Your CTF]</a>. We need a way to securely verify competitors have completed a challenge. Best way to see if competitors were able to understand and execute an exploit for the challenge is to have them exploit an actual live contract on the test network. 
                        </p>
                    </div>
                    <div className="col-sm">
                        <h4 className="mb-4">What do I need to play?</h4>
                        <p className="text-left">
                            Create an Ethereum account using the <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">MetaMask</a> extension. Change your network to <code>Ropsten Test Network</code>. Copy the challenge contract code into a file on <a target="_blank" rel="noopener noreferrer" href="https://remix.ethereum.org">Remix</a> (or any tool which can interact with the Ropsten test net) and paste the deployed contract's address into the <b>At Address</b> space in the <b>Run</b> tab. You can interact with the contract through <a target="_blank" rel="noopener noreferrer" href="https://remix.ethereum.org">Remix</a>. Make sure your environment in <a target="_blank" rel="noopener noreferrer" href="https://remix.ethereum.org">Remix</a> is <code>Inject Web3</code> on <code>Ropsten</code> and you've set the correct compiler version listed at the top of the contract next to <code>pragma solidity</code>. Get Ether at <a target="_blank" rel="noopener noreferrer" href="https://faucet.ropsten.be/">Ropsten Faucet</a> or <a target="_blank" rel="noopener noreferrer" href="https://faucet.metamask.io/">MetaMask Faucet</a>.
                        </p>
                    </div>
                    <div className="col-sm">
                        <h4 className="mb-4">How do I play?</h4>
                        <p className="text-left">
                            Navigate to the challenge page and click <code>Deploy</code>. Once the transaction has completed and the contract is deployed on the test net, the address will be returned. Interact with the on-chain contract and complete the challenge. Each challenge goal is defined in the <code>isComplete()</code> function of the contract. Click the <code>Check Solution</code> button to verify you've completed the challenge, and once the verification has completed, click <code>Get Flag</code> to retrieve the flag to submit to CTFd.
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
      );
    }
}

export default Homepage;