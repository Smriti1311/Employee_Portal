import { TextField } from '@material-ui/core';
import { Card, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { validate } from 'validate.js';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import './ChangePassword.scss';
import { changePassword } from '../../../store/Actions/ResetPasswordActions';
import { ToastContainer } from 'react-toastify';

const ChangePassword = (props) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    useEffect(() => {
        if (props.EmployeeData.employeeData.data) {
            setEmail(props.EmployeeData.employeeData.data.personalEmail);
            setOldPassword(props.EmployeeData.employeeData.data.password);
            setEmployeeId(props.EmployeeData.employeeData.data.employeeId);
        }
    }, [props.EmployeeData])

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
        props.ChangePassword(email, oldPassword, password, confirmPassword, employeeId, history)
    }

    return (
        <div>
            <Card className={`Card text-center ${props.resetPassword?.loading && 'disabled'}`}>
                <Card.Header><h2>Change Password</h2></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <TextField id="email" label="Email" variant="outlined"
                            value={email}
                            name='email'
                            type='input'
                            disabled />
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
            </Card>
            <ToastContainer />
        </div>
    );
}

const mapStateToProps = state => {
    console.log(state);
    return ({
        ResetPassword: state.ResetPassword,
        EmployeeData: state.Login
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        ChangePassword: ((email, oldPassword, password, confirmPassword, employeeId, history) => dispatch(changePassword(email, oldPassword, password, confirmPassword, employeeId, history)))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);