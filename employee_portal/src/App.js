import React from 'react';
import { Switch, Route } from 'react-router';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import LoginPage from './components/LoginPage/LoginPage';
import Sidebar from './SideBar/Sidebar';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Switch>
        <Route path='/' component={LoginPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
