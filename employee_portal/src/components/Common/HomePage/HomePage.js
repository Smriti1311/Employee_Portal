import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/Sidebar';
import EmpProfile from '../../Employee/EmpProfile/EmpProfile';
import CreateEmployee from '../../Admin/createEmployee/CreateEmployee';
import DirectReports from '../../Manager/directReports/DirectReports';
import './HomePage.scss';
import AllEmployees from '../../Admin/allEmployees/AllEmployees';
import ViewEmployee from 'components/Admin/allEmployees/employeeActions/ViewEmployee';

function HomePage(props) {
    const { path } = useRouteMatch();
console.log('path===',path);
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
                        <Route exact path = {`${path}/allEmployees`} component={AllEmployees} />
                        <Route path={`${path}/create-employee`} component={CreateEmployee} />
                        <Route path={`${path}/direct-reports`} component={DirectReports} />
                        <Route path ={`${path}/allEmployees/viewEmployee`} component={ViewEmployee} />
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