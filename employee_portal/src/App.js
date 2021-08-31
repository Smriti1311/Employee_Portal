import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import CheckOtp from './components/checkOtp/CheckOtp';
import ResetPassword from './components/resetPassword/ResetPassword';
import EmpProfile from './components/EmpProfile/EmpProfile';
import ChangePassword from './components/changePassword/ChangePassword';
import './App.scss';


function App() {
  //const { path } = useRouteMatch();
  return (
    <div className = 'App'>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route path = '/homePage' component = {HomePage} />
        <Route path={`/emp-profile/:id`} component={EmpProfile} />
        <Route exact path={'/forgotPassword'} component={ForgotPassword} />
        <Route path={'/forgotPassword/checkOtp'} component={CheckOtp} />
        <Route path = {'/resetPassword'} component = { ResetPassword} />
        <Route path = {'/changePassword'} component = {ChangePassword} />
      </Switch>
    </div>
  );
}

export default App;
