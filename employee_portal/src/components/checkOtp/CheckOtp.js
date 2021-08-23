import { TextField } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import './CheckOtp.scss';
import { useHistory, useParams } from 'react-router';

const CheckOtp = () => {

    const [otp, setOTP] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    const [successMsg, setSuccessMsg] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const history = useHistory();
    const params = useParams();
    const email = params.email;
    params['otp'] = otp;
    console.log(params);
    //const pathName = history.location.pathname;
    const constraints = {
        otp: {
            presence: true,
            length : {
                is : 6
            },
            numericality: {
                onlyInteger: true
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
        setOTP(value);
        const result = validateInput(key, value);
        let errorMsgs = [];
        errorMsgs[key] = result;
        setErrorMsg(errorMsgs);
    }

    const otpCheckHandler = (event) => {
        console.log(params);
        event.preventDefault();
        const url = "http://localhost:8080/users/checkOtp";
        axios.post(url, { params })
            .then((res) => {
                console.log(res);
                let successMsg = 'OTP is correct';
                setSuccessMsg(successMsg);
                setOtpVerified(true);
            })
            .catch((err) => {
                console.log(err);
                let errorMsg = 'Incorrect OTP'
                setErrorMsg(errorMsg);
                setOtpVerified(false);
            })
    }

    const otpPageHandler = () => {
        history.push(`/resetPassword/${email}`)
    }

    return (
        <>
            <Card className='Card text-center'>
                <Card.Header><h2>Enter OTP</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <TextField id="outlined-basic" label="OTP" variant="outlined"
                            value={otp}
                            name='otp'
                            type = 'password'
                            onChange={handleChange}
                            helperText={errorMsg.otp ? <small className = 'text-danger'>{errorMsg.otp}</small> : null} />
                    </Card.Text>
                    <Button variant='primary' type='submit'
                        onClick={otpCheckHandler}
                        disabled={(!otp || errorMsg.otp)}>
                        Submit</Button>
                </Card.Body>
            </Card>
            <div>
                {otpVerified ? 
                    <div className='text-center mt-3'>
                    <h2 > {successMsg} </h2>
                    <Button
                        onClick = {otpPageHandler} 
                        disabled = {!otpVerified}>Click to proceed</Button>
                    </div>
                    : errorMsg}
            </div>
        </>
    );
}

export default CheckOtp;