import React from 'react';
import { Container, Row } from 'react-bootstrap';
import EmployeeLogin from '../login/EmployeeLogin';

import './LoginPage.scss';

function LoginPage(props) {
    return (
        <Container>
            <Row>
                <div className='col-sm-6 m-auto'>
                    <img src='./media/EMS_LoginPage.png' width='100%' height='100%' alt='Login Page' />
                </div>
                <div className="col-sm-5 m-auto">
                    <EmployeeLogin />
                </div>
            </Row>
        </Container>
    );
}

export default LoginPage;