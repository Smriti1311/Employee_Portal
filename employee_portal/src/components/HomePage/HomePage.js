import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/Sidebar';
import EmpProfile from '../EmpProfile/EmpProfile';
function HomePage(props) {
    const { path } = useRouteMatch();

    return (
        <div className="row">
            <Header />
            <div className="col-md-2">

            <Sidebar />
            </div>
            <div className="col-md-10">

                <Route path = {`${path}/emp-profile`} component = {EmpProfile} />
                {props.children}
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;