import React from 'react';
import { Switch, Route } from 'react-router';

import './App.css';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import EmpProfile from './components/EmpProfile/EmpProfile';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route path = '/homePage' component = {HomePage} />
        {/* <Route path = '/homePage/emp-profile' component = {EmpProfile} /> */}
      </Switch>
    </>
  );
}

export default App;
