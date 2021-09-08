import { TextField } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { validate } from 'validate.js';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { generateOTP } from '../../../store/Actions/ResetPasswordActions';
import './ForgotPassword.scss';

const ForgotPassword = (props) => {
console.log('forgot password');
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
        props.generateOTP(email, history, pathName);
    }

    const otpPageHandler = () => {
        history.push(`${pathName}/checkOtp`)
    }

    return (
        <>
            <Card className = {`Card text-center ${props.resetPassword?.loading && 'disabled'}`} >
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
                        <ToastContainer />
                </Card.Body>
            </Card>
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
        generateOTP : ((email, history, pathName) => dispatch(generateOTP(email, history, pathName)) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);