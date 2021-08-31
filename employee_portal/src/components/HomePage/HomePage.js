import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/Sidebar';
import EmpProfile from '../EmpProfile/EmpProfile';
import CreateEmployee from '../createEmployee/CreateEmployee';
import DirectReports from '../directReports/DirectReports';
import './HomePage.scss';

function HomePage(props) {
    const { path } = useRouteMatch();

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
                        <Route path={`${path}/create-employee`} component={CreateEmployee} />
                        <Route path={`${path}/direct-reports`} component={DirectReports} />
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