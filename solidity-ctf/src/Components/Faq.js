import React, { Component, Fragment } from 'react';

import Deployer from '../build/contracts/Deployer';

class Faq extends Component {
    render() {
        return (
            <Fragment>
                <div className="container text-center">
                    <div className="container mx-auto mt-5">
                        <h1>Frequently Asked Questions</h1>
                    </div>
                </div>

                <div className="container pt-5">
                    <div className="row text-center pb-3">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h4 className="mb-4">Why isn't <a target="_blank" rel="noopener noreferrer" href="https://remix.ethereum.org">Remix</a> working?</h4>
                            <p className="text-left">
                                Make sure you've selected the correct compiler version (<code>{Deployer.compiler.version}</code>), are logged into <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">MetaMask</a>, and have <b>Injected Web3</b> selected as your provider.
                            </p>
                        </div>
                    </div>
                    <div className="row text-center pb-3">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h4 className="mb-4">I clicked the button but nothing happened!</h4>
                            <p className="text-left">
                                Check your <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">MetaMask</a> extension. Every transaction is added to a queue for <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">MetaMask</a> users to verify. If you navigated to another page before accepting the transaction in <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">MetaMask</a>, decline any current transactions and attempt to deploy/check completion again through the challenge page.
                            </p>
                        </div>
                    </div>
                    <div className="row text-center pb-3">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h4 className="mb-4">Why isn't MetaMask sending my transaction?</h4>
                            <p className="text-left">
                                <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">MetaMask</a> occasionally leaves the <b>gas fee</b> field blank when presenting the transaction to the user to confirm. Make sure you have a <b>gas fee</b> set before sending the transaction. Use <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">MetaMask</a>'s suggested <b>gas fee</b> or check <a target="_blank" rel="noopener noreferrer" href="https://ropsten.etherscan.io/chart/gasprice">Ropsten Etherscan</a> for up to date gas prices.
                            </p>
                        </div>
                    </div>
                    <div className="row text-center pb-3">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h4 className="mb-4">I hacked your contract, where's my flag!?</h4>
                            <p className="text-left">
                                This site verifies you've completed the challenge by recovering your address from a signed message. Challenge completion is checked by calling a smart contract with your public address and challenge number, which calls the <code>isComplete</code> function on your deployed contract. Check that <code>isComplete()</code> returns true on your Ropsten net challenge contract, then, once you've verified it worked, click <b>Check Completion</b> and then <b>Get Flag</b> to retrieve the flag to submit to CTFd. If you believe there is a mistake and your challenge has been completed, refresh the page or contact us on IRC.
                            </p>
                        </div>
                    </div>
                    <div className="row text-center pb-3">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h4 className="mb-4">My connection is always timing out!</h4>
                            <p className="text-left">
                                Blockchain is still a relatively new technology. Speeds for transactions to be picked up from a single node to the network can be anywhere from a few seconds to few minutes. Be patient, wait for <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/">MetaMask</a> to get the transaction receipt, then refresh the page to see if the challenge has been deployed/completed.
                            </p>
                        </div>
                    </div>
                    <div className="row text-center pb-3">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h4 className="mb-4">Why doesn't the bytecode in my deployed contract match my locally compiled bytecode?</h4>
                            <p className="text-left">
                                Our website deploys light weight proxy contracts for each competitor to keep our on chain footprint lower and handle updating challenges more smoothly. The proxy contract competitors interact with acts as the storage layer for the challenges, the logic for a challenge is hosted in a single on chain contract. Mismatching bytecode is not a hint in any way.
                            </p>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Faq;