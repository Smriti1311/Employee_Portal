import React from 'react';
import { Switch , Route } from 'react-router';

import './App.css';
import EmployeeLogin from './components/login/EmployeeLogin';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path = '/' component = {EmployeeLogin} />
      </Switch>
    </div>
  );
}

export default App;
