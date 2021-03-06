import { TextField } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import './CheckOtp.scss';
import { checkOTP } from '../../../store/Actions/ResetPasswordActions';
import { ToastContainer } from 'react-toastify';

const CheckOtp = (props) => {
console.log('check otp file');
    const [otp, setOTP] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    const history = useHistory();

    const constraints = {
        otp: {
            presence: true,
            length: {
                is: 6
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
        event.preventDefault();
        props.CheckOtp(props.resetPassword.email,otp,history)
    }

    return (
        <>
            <Card className= {`Card text-center ${props.resetPassword?.loading && 'disabled'}`}>
                <Card.Header><h2>Enter OTP</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <TextField id="otp" label="OTP" variant="outlined"
                            value={otp}
                            name='otp'
                            type='password'
                            onChange={handleChange}
                            helperText={errorMsg.otp ? <small className='text-danger'>{errorMsg.otp}</small> : null} />
                    </Card.Text>
                    <Button variant='primary' type='submit'
                        onClick={otpCheckHandler}
                        disabled={(!otp || errorMsg.otp)}>
                        Submit</Button>
                        <ToastContainer />
                </Card.Body>
            </Card>
        </>
    );
}

const mapStateToProps = state => {
    return ({
        resetPassword: state.ResetPassword
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        CheckOtp : ((email,otp, history)=>{dispatch(checkOTP(email,otp, history))}) 
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOtp);