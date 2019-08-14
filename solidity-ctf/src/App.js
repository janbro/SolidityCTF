import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NotificationContainer } from 'react-notifications';

import ErrorHandler from './Components/ErrorHandler';
import NavBar from './Components/Navbar';
import Challenge from './Components/Challenge';
import Homepage from './Components/Homepage';
import Faq from './Components/Faq';

import './App.css';
import '../node_modules/react-notifications/dist/react-notifications.css';

import UpdateableOwnable from './build/contracts/UpdateableOwnable';
import Contract from './build/contracts/Contract';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: null,
            nickname: null
        }
    }

    challenges = [
        {
            title: 'Multi-Owner Contract',
            difficulty: 'EASY',
            description: 'My friend wanted to create a new type of ownable contract where multiple people can be owners. However, when he deployed it for his token sale, someone managed to add themself and many other owners and they minted tons of their own tokens! Luckily the sale hasn\'t started yet, help him find the bug so he can deploy a new contract and save his ICO.',
            artifact: UpdateableOwnable
        },
        {
            title: 'Lorem ipsum',
            difficulty: 'Medium',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam finibus massa pretium consectetur maximus. Proin condimentum interdum scelerisque. Phasellus in diam ligula. Nunc ac convallis nisi, at porta enim. Nunc felis nisi, euismod cursus suscipit sodales, elementum id eros. Etiam mauris ante, bibendum ut arcu id, rhoncus volutpat tortor. Praesent sed pellentesque enim, vel viverra nisi. Morbi cursus vehicula libero.',
            artifact: Contract
        }
    ];

    setAccount = (account, nickname) => {
        this.setState({account, nickname})
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <NavBar challenges={ this.challenges } account={ this.state.account } nickname={ this.state.nickname }/>

                    <NotificationContainer/>

                    <Route path="/" exact render={ (props) => <Homepage {...props} challenges={ this.challenges } /> }/>

                    <Route path="/challenge/:id" render={ props => {
                        return (
                            <ErrorHandler>
                                <Challenge {...props} setAccount={ this.setAccount } challenges={ this.challenges }></Challenge>
                            </ErrorHandler>
                        );
                    }}/>

                    <Route path="/faq" component={ Faq }/>
                </Router>
            </Fragment>
        );
    }
}

export default App;