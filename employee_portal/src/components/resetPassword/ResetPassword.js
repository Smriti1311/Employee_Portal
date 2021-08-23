import { TextField } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import './ResetPassword.scss';
import {  useParams } from 'react-router';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    const [successMsg, setSuccessMsg] = useState('');
    const [passwordReset, setPasswordReset] = useState(false);
    //const history = useHistory();
    const params = useParams();
    params['password'] = password;
    params['confirmPassword'] = confirmPassword;
   // console.log(params);
    //const pathName = history.location.pathname;
    const constraints = {
        password: {
            presence: true,
            length: {
                minimum: 6
            }
        },
        confirmPassword: {
            equality: 'password'
        }
    }

    const validateInput = (key, value) => {
        let object = {};
        object[key] = value;

        if(key === 'confirmPassword'){
            object['password'] = password;
        }
        let constraint = constraints[key];
      //  console.log(object,constraint);
        let result = validate(object, { [key]: constraint });
        if (result) {
            return result[key][0]
        }
        return null;
    }

    const handleChange = (event) => {
        let key = event.target.name;
        let value = event.target.value;
        if (key === 'password') {
            setPassword(value);
        }
        else if (key === 'confirmPassword') {
            setConfirmPassword(value);
        }
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
                setPasswordReset(true);
            })
            .catch((err) => {
                console.log(err);
                let errorMsg = 'Incorrect OTP'
                setErrorMsg(errorMsg);
                setPasswordReset(false);
            })
    }

    const otpPageHandler = () => {
        // history.push(`${pathName}/resetPassword/${email}`)
    }

    return (
        <>
            <Card className='Card text-center'>
                <Card.Header><h2>Reset Password</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <TextField id="outlined-basic" label="Password" variant="outlined"
                            value={password}
                            name='password'
                            onChange={handleChange}
                            helperText={errorMsg.password ? <small className = 'text-danger'>{errorMsg.password}</small> : null} />
                        <TextField id="outlined-basic" label="Confirm Password" variant="outlined"
                            value={confirmPassword}
                            name='confirmPassword'
                            
                            onChange={handleChange}
                            helperText={errorMsg.confirmPassword ? <small className = 'text-danger'>{errorMsg.confirmPassword}</small> : null} />
                    </Card.Text>
                    <Button variant='primary' type='submit'
                        onClick={otpCheckHandler}
                        disabled={(!password || !confirmPassword || errorMsg.password || errorMsg.confirmPassword)}>
                        Submit</Button>
                </Card.Body>
            </Card>
            <div>
                {passwordReset ?
                    <div className='text-center mt-3'>
                        <h2 > {successMsg} </h2>
                        <Button
                            onClick={otpPageHandler}
                            disabled={!passwordReset}>Click to proceed</Button>
                    </div>
                    : <div className = 'text-danger'>{errorMsg}</div>}
            </div>
        </>
    );
}

export default ResetPassword;