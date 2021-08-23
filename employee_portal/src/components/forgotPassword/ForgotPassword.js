import { TextField } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import './ForgotPassword.scss';
import { useHistory } from 'react-router';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    const [successMsg, setSuccessMsg] = useState('');
    const [otpReceived, setOtpReceived] = useState(false);
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
        const url = "http://localhost:8080/users/otpgeneration";
        axios.post(url, { 'email': email })
            .then((res) => {
                console.log(res);
                let successMsg = 'OTP sent to email';
                setSuccessMsg(successMsg);
                setOtpReceived(true);
            })
            .catch((err) => {
                console.log(err);
                let errorMsg = 'Unable to generate OTP'
                setErrorMsg(errorMsg);
                setOtpReceived(false);
            })
    }

    const otpPageHandler = () => {
        history.push(`${pathName}/checkOtp/${email}`)
    }

    return (
        <>
            <Card className='Card text-center'>
                <Card.Header><h2>Find your account</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <TextField id="outlined-basic" label="Email" variant="outlined"
                            value={email}
                            name='email'
                            onChange={handleChange}
                            helperText={errorMsg.email ? <small className = 'text-danger'>{errorMsg.email}</small> : null} />
                    </Card.Text>
                    <Button variant='primary' type='submit'
                        onClick={otpGenerationHandler}
                        disabled={(!email || errorMsg.email)}>
                        Submit</Button>
                </Card.Body>
            </Card>
            <div>
                {otpReceived ? 
                    <div className='text-center mt-3'>
                    <h2 > {successMsg} </h2>
                    <Button
                        onClick = {otpPageHandler} 
                        disabled = {!otpReceived}>Click to proceed</Button>
                    </div>
                    : errorMsg}
            </div>
        </>
    );
}

export default ForgotPassword;