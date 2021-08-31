import { TextField } from '@material-ui/core';
import { Card, Button, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';

import { generateOTP } from '../../store/Actions/ResetPasswordActions';
import './ForgotPassword.scss';

const ForgotPassword = (props) => {

    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    const history = useHistory();
    const pathName = history.location.pathname;
    const constraints = {
        email: {
            presence: true,
            email: {
                message: 'enter valid email'
            }
        }
    }

    const validateInput = (key, value) => {
        let object = {};
        object[key] = value;
        let constraint = constraints[key];
        let result = validate(object, { [key]: constraint });
        if (result) {
            return result[key][0]
        }
        return null;
    }

    const handleChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        setEmail(value);
        const result = validateInput(key, value);
        let errorMsgs = [];
        errorMsgs[key] = result;
        setErrorMsg(errorMsgs);
    }

    const otpGenerationHandler = (event) => {
        event.preventDefault();
        props.generateOTP(email);
    }

    const otpPageHandler = () => {
        history.push(`${pathName}/checkOtp`)
    }

    let clickToProceed = '';
    if (props.resetPassword.loading) {
        clickToProceed = <div className='text-center mt-3'>
            <Spinner animation="border">
            </Spinner> </div>
    }
    else if (!props.resetPassword.loading && props.resetPassword.otpReceived) {
        clickToProceed = <div className='text-center mt-3'>
            <h2 > {props.resetPassword.successMsg} </h2>
            <Button
                onClick={otpPageHandler}
                disabled={!props.resetPassword.otpReceived}>Click to proceed</Button>
        </div>
    }
    else {
        clickToProceed = <div> {props.resetPassword.errorMsg} </div>
    }

    return (
        <>
            <Card className='Card text-center'>
                <Card.Header><h2>Find your account</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <TextField id="email" label="Email" variant="outlined"
                            value={email}
                            name='email'
                            onChange={handleChange}
                            helperText={errorMsg.email ? <small className='text-danger'>{errorMsg.email}</small> : null} />
                    </Card.Text>
                    <Button variant='primary' type='submit'
                        onClick={otpGenerationHandler}
                        disabled={(!email || errorMsg.email)}>
                        Submit</Button>
                </Card.Body>
            </Card>
            {clickToProceed}
        </>
    );
}

const mapStateToProps = state => {
    return {
        resetPassword : state.ResetPassword
    }
}

const mapDispatchToProps = dispatch => {
    return {
        generateOTP : ((email) => dispatch(generateOTP(email)) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);