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

    componentDidCatch = (error, errorInfo) => {
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        const { hasError,  errorInfo } = this.state;
        console.log(this.state);
        if (hasError) {
            return <Fragment>
                <h1>Something went wrong</h1>
                <p> {errorInfo.componentStack}</p>
            </Fragment>
        }
        else {
            return this.props.children
        }
    }

}

export default ErrorBoundary;