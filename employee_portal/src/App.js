import React from 'react';
import { Switch, Route } from 'react-router';

import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import CheckOtp from './components/checkOtp/CheckOtp';
import ResetPassword from './components/resetPassword/ResetPassword';

function App() {
  //const { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route path = '/homePage' component = {HomePage} />
        <Route exact path={'/forgotPassword'} component={ForgotPassword} />
        <Route path={'/forgotPassword/checkOtp/:email'} component={CheckOtp} />
        <Route path = {'/resetPassword'} component = { ResetPassword} />
      </Switch>
    </>
  );
}

export default App;
