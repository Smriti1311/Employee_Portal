import { TextField } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { validate } from 'validate.js';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import './ResetPassword.scss';
import { resetPassword } from '../../../store/Actions/ResetPasswordActions';
import { ToastContainer } from 'react-toastify';

const ResetPassword = (props) => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    const history = useHistory();
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

        if (key === 'confirmPassword') {
            object['password'] = password;
        }
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

    const passwordUpdateHandler = (event) => {
        event.preventDefault();
        props.ResetPasswordMethod(props.ResetPassword.email, password, confirmPassword, history)
    }

    return (
        <>
            <Card className={`Card text-center ${props.resetPassword?.loading && 'disabled'}`}>
                <Card.Header><h2>Reset Password</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <TextField id="password" label="Password" variant="outlined"
                            value={password}
                            name='password'
                            type='password'
                            onChange={handleChange}
                            helperText={errorMsg.password ? <small className='text-danger'>{errorMsg.password}</small> : null} />
                        <TextField id="confirmPassword" label="Confirm Password" variant="outlined"
                            value={confirmPassword}
                            name='confirmPassword'
                            type='password'
                            onChange={handleChange}
                            helperText={errorMsg.confirmPassword ? <small className='text-danger'>{errorMsg.confirmPassword}</small> : null} />
                    </Card.Text>
                    <Button variant='primary' type='submit'
                        onClick={passwordUpdateHandler}
                        disabled={(!password || !confirmPassword || errorMsg.password || errorMsg.confirmPassword)}>
                        Submit</Button>
                </Card.Body>
                <ToastContainer />
            </Card>
           
        </>
    );
}

const mapStateToProps = state => {
    return ({
        ResetPassword: state.ResetPassword
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        ResetPasswordMethod: ((email, password, confirmPassword, history) => dispatch(resetPassword(email, password, confirmPassword, history)))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);