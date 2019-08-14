import React, { Component } from 'react';

import ErrorPage from './ErrorPage';

class ErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: undefined};
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true, error: error });
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    render() {
        if(this.state.hasError) {
            // You can render any custom fallback UI
            return <ErrorPage error={ this.state.error }></ErrorPage>;
        }
        return this.props.children;
    }
}

export default ErrorHandler;