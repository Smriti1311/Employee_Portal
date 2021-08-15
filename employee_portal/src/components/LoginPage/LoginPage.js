import React from 'react';
import EmployeeLogin from '../login/EmployeeLogin';

import './LoginPage.scss';

function LoginPage(props) {
    return (
        <div className = 'LoginPage'>
        <div className = 'col-sm Logo align-middle'>
            <h3 className = 'align-middle'>Employee Management Service</h3>
        </div>
        <div className="col-sm EmployeeLogin">
          <EmployeeLogin />  
        </div>
        </div>
    );
}

export default LoginPage;