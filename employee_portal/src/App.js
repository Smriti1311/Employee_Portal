import React from 'react';
import { Switch, Route } from 'react-router';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';

import LoginPage from './components/Logins/LoginPage/LoginPage';
import HomePage from './components/Common/HomePage/HomePage';
import ForgotPassword from './components/resetPasswords/forgotPassword/ForgotPassword';
import CheckOtp from './components/resetPasswords/checkOtp/CheckOtp';
import ResetPassword from './components/resetPasswords/resetPassword/ResetPassword';
import EmpProfile from './components/Employee/EmpProfile/EmpProfile';
import ChangePassword from './components/resetPasswords/changePassword/ChangePassword';
import SignOut from 'components/Common/signOut/SignOut';
import './App.scss';


function App() {
  const loading = useSelector(state => state.Loading.loading); 
  return(
    <div className = 'App'>
      {loading && <LinearProgress />}
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route path = '/homePage' component = {HomePage} />
        <Route path={`/emp-profile/:id`} component={EmpProfile} />
        <Route exact path={'/forgotPassword'} component={ForgotPassword} />
        <Route path={'/forgotPassword/checkOtp'} component={CheckOtp} />
        <Route path = {'/resetPassword'} component = { ResetPassword} />
        <Route path = {'/changePassword'} component = {ChangePassword} />
        <Route path = {'/signOut'} component = {SignOut} />
      </Switch>
    </div>
  );
}

export default App;
