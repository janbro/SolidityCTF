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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: null,
            nickname: null
        }
    }

    setAccount = (account, nickname) => {
        this.setState({account, nickname})
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <NavBar account={ this.state.account } nickname={ this.state.nickname }/>

                    <NotificationContainer/>

                    <Route path="/" exact component={ Homepage }/>

                    <Route path="/challenge/:id" render={ props => {
                        return (
                            <ErrorHandler>
                                <Challenge {...props} setAccount={ this.setAccount }></Challenge>
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