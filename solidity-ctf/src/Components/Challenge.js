import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Highlight from 'react-highlight'
import { NotificationManager } from 'react-notifications';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Web3 from 'web3';
import TruffleContract from 'truffle-contract';

import Deployer from '../build/contracts/Deployer';

class Challenge extends Component {

    constructor(props){
        super(props);

        this.appName = 'SolidityCTF';
        this.isWeb3 = true;                 //If metamask is installed
        this.isWeb3Locked = false;          //If metamask account is locked

        this.targetNetwork = 'Ropsten';

        this.state = {
            inProgress: false,
            tx: null,
            network: 'Checking...',
            account: null,
            tokens: [],
            fields: {
                receiver: null,
                amount: null,
                gasPrice: null,
                gasLimit: null,
            },
            defaultGasPrice: null,
            defaultGasLimit: 200000,
            challengeId: this.props.match.params.id - 1
        };

        let web3 = window.web3;

        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            this.web3Provider = window.ethereum;
            this.web3 = new Web3(web3.currentProvider);

            this.deployer = TruffleContract(Deployer);
            this.deployer.setProvider(this.web3Provider)

            if (web3.eth.coinbase === null) this.isWeb3Locked = true;

        } else {
            this.isWeb3 = false;
        }
    }

    setNetwork = () => {
        let networkName,that = this;

        this.web3.version.getNetwork((err, networkId) => {
            switch (networkId) {
                case '1':
                    networkName = 'Main';
                    break;
                case '2':
                    networkName = 'Morden';
                    break;
                case '3':
                    networkName = 'Ropsten';
                    break;
                case '4':
                    networkName = 'Rinkeby';
                    break;
                case '42':
                    networkName = 'Kovan';
                    break;
                default:
                    networkName = networkId;
            }

            that.setState({
                network: networkName,
                targetNetwork: this.targetNetwork === networkName || networkName > 100
            });

            if(!this.state.targetNetwork) {
                NotificationManager.error(`Please connect to ${this.targetNetwork} network`);
            }
        });
    };

    setGasPrice = () => {
        this.web3.eth.getGasPrice((err,price) => {
            price = this.web3.fromWei(price,'gwei');
            if(!err) this.setState({ defaultGasPrice: price.toNumber() })
        });
    };

    setDeployerContractAddress = () => {
        this.deployer.deployed().then(deployerInstance => {
            this.setState({ deployerAddress: deployerInstance.address });

            // Get current challenge address
            this.setChallengeContractAddress();
        }).catch(err => {
            NotificationManager.error("Deployer contract has not been detected on this network");
            console.log(err);
        });
    };

    setChallengeContractAddress = () => {
        this.deployer.deployed().then(deployerInstance => {
            deployerInstance.getAddressOf(this.state.account, this.state.challengeId, { from: this.state.account }).then(event => {
                if(!/^0x0*$/.test(event)) {
                    this.setState({ challengeAddress: event });
                }
            }).catch(err => {
                NotificationManager.error("Could not retrieve challenge address");
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    checkChallengeCompletion = (showNotification) => {
        this.deployer.deployed().then(deployerInstance => {
            deployerInstance.checkCompletionOf(this.state.account, this.state.challengeId, { from: this.state.account }).then(event => {
                this.setState({ challengeCompleted: event });
                if(showNotification) {
                    if(event) {
                        NotificationManager.success("Challenge completed!");
                    } else {
                        NotificationManager.error("Incorrect");
                    }
                }
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    getNickname = () => {
        this.deployer.deployed().then(deployerInstance => {
            deployerInstance.getNicknameOf(this.state.account, { from: this.state.account }).then(event => {
                let nickname;
                if(event) {
                    nickname = event;
                } else {
                    nickname = this.state.account;
                }
                this.setState({nickname});
                this.props.setAccount(this.state.account, nickname);
            }).catch(err => {
                NotificationManager.error("Could not retrieve nickname");
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    resetApp = () => {
      this.setState({
        inProgress: false,
        tx: null,
        network: 'Checking...',
        account: null,
        tokens: [],
        fields: {
            receiver: null,
            amount: null,
            gasPrice: null,
            gasLimit: null,
        },
        defaultGasPrice: null,
        defaultGasLimit: 200000,
        challengeId: this.props.match.params.id - 1,
        challengeCompleted: false,
        challengeAddress: null
      });
    };

    resetChallenge = () => {
        this.setState({
            inProgress: false,
            challengeId: this.props.match.params.id - 1,
            challengeCompleted: false,
            challengeAddress: null
        });
    }

    componentDidMount() {
        if(this.props.challenges[this.state.challengeId]) {
            window.ethereum.enable().then(event => {
                NotificationManager.success("Thank you for connecting");
                this.setState({
                    providerEnabled: true,
                    account: event[0]
                });
            }).catch(err => {
                NotificationManager.error(err.message);
            });

            this.setNetwork();
            this.setGasPrice();
            this.setDeployerContractAddress();
            this.checkChallengeCompletion();
            this.getNickname();

            this.setState({
                challengeId: this.props.match.params.id - 1
            });
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(this.state.challengeId !== this.props.match.params.id - 1) {
            this.resetChallenge();
            // Challenge page was updated
            this.setState({
                account: this.web3.eth.accounts[0],
                challengeId: this.props.match.params.id - 1
            });
            this.setChallengeContractAddress();
            this.checkChallengeCompletion();
            this.getNickname();
        } else if(this.state.account !== prevState.account) {
            // Account was updated
            this.setChallengeContractAddress()
            this.checkChallengeCompletion();
            this.getNickname();
        }
    }

    deployChallenge = () => {
        this.setState({ inProgress: true });
        this.deployer.deployed().then(deployerInstance => {
            deployerInstance.deployChallenge(this.state.challengeId, { from: this.state.account, value: this.web3.toWei(0.5) }).then(event => {
                NotificationManager.info("Challenge deployed!");
                this.setChallengeContractAddress();
                this.checkChallengeCompletion();
            }).catch(err => {
                NotificationManager.error(err.message);
            }).finally(() => {
                this.setState({ inProgress: false });
            });
        }).catch(err => {
            NotificationManager.error("Deployer contract has not been detected on this network")
            console.log(err);
        });
    }

    completeChallenge = () => {
        this.setState({ inProgress: true });
        this.deployer.deployed().then(deployerInstance => {
            deployerInstance.completeChallenge(this.state.challengeId, { from: this.state.account }).then(event => {
                this.checkChallengeCompletion(true);
            }).catch(err => {
                NotificationManager.error(err.message);
            }).finally(() => {
                this.setState({ inProgress: false });                
            });
        }).catch(err => {
            NotificationManager.error("Deployer contract has not been detected on this network");
            console.log(err);
        });
    }

    render() {
        if(!this.props.challenges[this.state.challengeId]) {
            return <Redirect to="/"></Redirect>
        }
        return (
            <ChallengePresentational {...this.state} challenges={ this.props.challenges } deployChallenge={ this.deployChallenge } completeChallenge={ this.completeChallenge }></ChallengePresentational>
        );
    }
}

class ChallengePresentational extends Component {
    render() {
        return (
            <div className="container pt-5">
                <div className="row text-left">
                    <div className="col-5">
                        <div className="card mb-3">
                            <div className="card-header">
                                <div className="container row">
                                    <h2 className="challenge-title col-11">
                                        { this.props.challenges[this.props.challengeId].title }
                                    </h2>
                                    <i className="fas fa-check fa-2x col-1 pt-1" style={ {"color": "#15bf8c", "display": "none"} }></i>
                                </div>
                                <div className="container row">
                                    <h6 className="text-muted col">
                                        { this.props.challenges[this.props.challengeId].difficulty }
                                    </h6>
                                </div>
                            </div>
                            <div className="card-body">
                                { this.props.challenges[this.props.challengeId].description }
                            </div>
                        </div>
                        {
                            /* Conditional Rendering for Deploy, Check Solution, and Get Flag buttons */
                            (() => {
                                if(!this.props.challengeAddress) {
                                    return (
                                        <LoadingButton text="Deploy" disabled={ !this.props.targetNetwork || !this.props.deployerAddress || !this.props.providerEnabled } clickHandler={ this.props.deployChallenge }/>
                                    );
                                }
                                else if(!this.props.challengeCompleted) {
                                    return (
                                        <LoadingButton text="Check Solution" loading={ this.props.inProgress } clickHandler={ this.props.completeChallenge }>
                                            <span className="pt-2 ml-3">
                                                or <u className="text-primary btn btn-primary-outline pb-2 pl-1" onClick={ this.props.deployChallenge }> start over</u>
                                            </span>
                                        </LoadingButton>
                                    );
                                }
                                else {
                                    return (
                                        <LoadingButton text="Get Flag" loading={ this.props.inProgress }>
                                            <span className="pt-2 ml-3">
                                                or <u className="text-primary btn btn-primary-outline pb-2 pl-1" onClick={ this.props.deployChallenge }> start over</u>
                                            </span>
                                        </LoadingButton>
                                    );
                                }
                            })()
                        }
                        {
                            (() => {
                                if(this.props.challengeAddress) {
                                    return (
                                        <div className="row mb-3">
                                            <span className="col">
                                                Contract deployed at address: <a style={ {"paddingRight": "5px", "overflowWrap": "breakWord"} } target='_blank' rel="noopener noreferrer" href={ 'https://ropsten.etherscan.io/address/' + this.props.challengeAddress }>
                                                    { this.props.challengeAddress }
                                                </a>
                                                <CopyToClipboard text={ this.props.challengeAddress } onCopy={ () => { NotificationManager.info("Address copied to clipboard") } }>
                                                    <button className='fas btn fa-copy copy-button'></button>
                                                </CopyToClipboard>
                                            </span>
                                        </div>
                                    );
                                }
                            })()
                        }
                    </div>
                    <div className="col-7" style={ {pointerEvents: "none"} }>
                        <CopyToClipboard text={ this.props.challenges[this.props.challengeId].artifact.source } onCopy={ () => { NotificationManager.info("Source copied to clipboard") } }>
                            <button className="fas btn fa-copy copy-source-button"></button>
                        </CopyToClipboard>
                        <Highlight className="solidity code-block all-pointer-events">
                            { this.props.challenges[this.props.challengeId].artifact.source }
                        </Highlight>
                    </div>
                </div>
            </div>
        );
    }
}

class LoadingButton extends Component {
    render() {
        return (
            <div className="row pl-3 mb-3">
                <button className={ `btn btn-primary btn-lg col-6 ${ this.props.disabled ? 'disabled' : '' }` } onClick={ this.props.clickHandler }>
                    {
                        (() => {
                            if(this.props.loading) {
                                return <i className="fas fa-spinner fa-spin fa-2x" style={ {"fontSize": "1.2em"} }/>;
                            }
                            else {
                                return (
                                    <span style={ {textDecoration: this.props.disabled ? 'line-through' : 'none' } }>
                                        { this.props.text }
                                    </span>
                                );
                            }
                        })()
                    }
                </button>
                {
                    this.props.children
                }
            </div>
        );
    }
}

export default Challenge;