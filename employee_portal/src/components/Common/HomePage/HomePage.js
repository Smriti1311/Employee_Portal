import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/Sidebar';
import EmpProfile from '../../Employee/EmpProfile/EmpProfile';
import CreateEmployee from '../../Admin/createEmployee/CreateEmployee';
import DirectReports from '../../Manager/directReports/DirectReports';
import './HomePage.scss';
import AllEmployees from '../../Admin/allEmployees/AllEmployees';
import ViewEmployee from 'components/Admin/allEmployees/employeeActions/ViewEmployee';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function HomePage(props) {
    const { path } = useRouteMatch();
    console.log('path===', path);
   // const isLoggedIn = useSelector(state => state.Login.empLoggedIn);
    const token = localStorage.getItem('empToken');
   // console.log(isLoggedIn);
    console.log(token);
    if ( !token) {
       // console.log('redirect to login=', isLoggedIn, token);
        toast.error('Please login first');
        return <Redirect to='/' />
    }
    return (
        <div>
            <div className="row mb-6">
                <Header />
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <Sidebar />
                </div>
                <div className="col-sm-10">
                    <Switch>
                        <Route path={`${path}/emp-profile/:id`} component={EmpProfile} />
                        <Route exact path={`${path}/allEmployees`} component={AllEmployees} />
                        <Route path={`${path}/create-employee`} component={CreateEmployee} />
                        <Route path={`${path}/direct-reports`} component={DirectReports} />
                        <Route path={`${path}/allEmployees/viewEmployee`} component={ViewEmployee} />
                        <Route path={`${path}/allEmployees/edit-employee/:id`} component={CreateEmployee} />
                    </Switch>
                    {props.children}
                </div>
            </div>
            <div className="row">
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;