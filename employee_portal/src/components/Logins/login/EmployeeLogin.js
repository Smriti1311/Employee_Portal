import React, {  useState } from 'react';
import { Form, FormControl, FormGroup, FormLabel, FormText, Button, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { validate } from 'validate.js';
import { useHistory, Link } from 'react-router-dom';

import { submit_login } from '../../../store/Actions/LoginActions';
import './EmployeeLogin.scss';
import { ToastContainer } from 'react-toastify';

const EmployeeLogin = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState([]);
    const history = useHistory();

    const constraints = {
        userName: {
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
        if (event.target.name === 'userName') {
            setUserName(event.target.value);
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
         props.submit_login(userName,password, history);
    }
    return (
        <>
        <Form  onSubmit={submitHandler}>
            <FormGroup className="mb-3">
                <FormLabel className = 'font-weight-bold'>User Name</FormLabel>
                <FormControl type='input'
                    name='userName'
                    value={userName}
                    onChange={setLoginDataHandler} />
                <FormText className='text-danger'>
                    {errorMsg.userName && errorMsg.userName}
                </FormText>
            </FormGroup>
            <FormGroup className="mb-3">
                <FormLabel className = 'font-weight-bold'>Password</FormLabel>
                <FormControl type='password'
                    name='password'
                    value={password}
                    onChange={setLoginDataHandler} />
                <FormText className=' text-danger '>
                    {errorMsg.password && errorMsg.password}
                </FormText>
            </FormGroup>
            <Button variant='primary'
            className = 'font-weight-bold'
                type='submit'
                disabled={(!userName || !password) || errorMsg.userName || errorMsg.password}>Login</Button>
        </Form>
       <ToastContainer />
        <Nav>
            <Nav.Item>
                <Nav.Link as = {Link} to ='/forgotPassword'>Forgot Password?</Nav.Link>
            </Nav.Item>
        </Nav>
        </>
    );
}

const mapStateToProps = state => {
    return {
        employeeLogin: state.Login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submit_login: (userName, password, history) => dispatch(submit_login(userName, password, history))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeLogin);