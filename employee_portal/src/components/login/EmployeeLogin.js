import React, { useState } from 'react';
import { Form, FormControl, FormGroup, FormLabel, FormText, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { validate } from 'validate.js';

const EmployeeLogin = (props) => {
    const [employeeId, setEmployeeId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);

    const constraints = {
        employeeId: {
            presence: true,
            length: {
                minimum: 4,
                message: 'must be atleast 4 characters'
            }
        },
        password: {
            presence: true,
            length: {
                minimum: 6,
                message: 'must be atleast 6 characters'
            }
        }
    }

    const setLoginDataHandler = event => {
        if (event.target.name === 'employeeId') {
            setEmployeeId(event.target.value);
        }
        if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
        const validateResult = validateLogin(event.target.name, event.target.value);
        let errorMsgs = errorMsg;
        errorMsgs[event.target.name] = validateResult;
        setErrorMsg(errorMsgs)
    }

    const validateLogin = (key, value) => {
        let object = {};
        object[key] = value;
        let constraint = constraints[key];
        let result = validate(object, { [key]: constraint });
        if (result) {
            return result[key][0];
        }
        else {
            return null;
        }
    }

    const submitHandler = event => {
        event.preventDefault();
    }
    return (
        <Form className="w-50 mx-auto" onSubmit={submitHandler}>
            <FormGroup className="mb-3">
                <FormLabel>Employee Id</FormLabel>
                <FormControl type='input'
                    name='employeeId'
                    value={employeeId}
                    onChange={setLoginDataHandler} />
                <FormText className='text-danger'>
                    {errorMsg.employeeId && errorMsg.employeeId}
                </FormText>
            </FormGroup>
            <FormGroup className="mb-3">
                <FormLabel>Password</FormLabel>
                <FormControl type='password'
                    name='password'
                    value={password}
                    onChange={setLoginDataHandler} />
                <FormText className=' text-danger '>
                    {errorMsg.password && errorMsg.password}
                </FormText>
            </FormGroup>
            <Button variant='primary'
                type='submit'
                disabled={ (!employeeId || !password) || errorMsg.employeeId || errorMsg.password }>Login</Button>
        </Form>
    );
}

const mapStateToProps = state => {
    return {
        employeeLogin: state.Login
    }
}

const mapDispatchToProps = dispatch => {
    return null

}

export default connect(mapStateToProps)(EmployeeLogin);