import React, { Component, Fragment } from 'react';

class ErrorPage extends Component {
    render() {
        console.log(this.props);
        return (
            <Fragment>
                <div className="container text-center">
                    <div className="container mx-auto mt-5">
                        <h1>{ this.props.error.title || 'Error' }</h1>
                        <p>{ this.props.error.message }</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ErrorPage;