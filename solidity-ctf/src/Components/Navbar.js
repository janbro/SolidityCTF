import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Solidity Challenges</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse navbar-brand" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="btn btn-link nav-link dropdown-toggle" style={ {"fontSize": "inherit"} }id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Challenges
                            </button>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {
                                    this.props.challenges.map((value, index) => {
                                        return <Link className="dropdown-item" to={`/challenge/${index + 1}`}>Challenge { (index + 1) }</Link>;
                                    })
                                }
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/faq">FAQ</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="navbar-item">
                            {
                                (() => {
                                    if(this.props.account) {
                                        return (
                                            <Fragment>
                                                <a target="_blank" rel="noopener noreferrer" href={ `https://ropsten.etherscan.io/address/${this.props.account}` }>
                                                    <b>{ this.props.nickname ? this.props.nickname : this.props.account }</b>
                                                </a>
                                            </Fragment>
                                        );
                                    } else {
                                        return <a className="nav-link" href="https://metamask.io/">MetaMask</a>;
                                    }
                                })()
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;