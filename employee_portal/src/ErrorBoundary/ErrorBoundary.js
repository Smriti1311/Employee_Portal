import { React, Fragment, Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorInfo: '',
            error: ''
        }
    }

    componentDidError = (error, errorInfo) => {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        const { hasError, error, errorInfo } = this.state;
        if (hasError) {
            return <Fragment>
                <h1>Something went wrong</h1>
                <p>{error - errorInfo.componentStack}</p>
            </Fragment>
        }
        else {
            return this.props.children
        }
    }

}

export default ErrorBoundary;