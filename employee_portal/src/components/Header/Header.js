import { IconButton } from '@material-ui/core';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';

import EmpProfile from '../EmpProfile/EmpProfile';
import SignOut from '../signOut/SignOut';
import './Header.scss';

function Header(props) {
    const { path } = useRouteMatch();
    console.log(path);
    return (
        <Container fluid className='Header d-flex flex-row-reverse '>
            <Navbar>
                <Navbar.Brand>EMS</Navbar.Brand>
                <Nav.Link as={Link} to={`${path}/emp-profile`}>Profile</Nav.Link>
                <Nav.Link as={Link} to={`${path}/signOut`}>SignOut</Nav.Link>
            </Navbar>

            <Switch>
                {/* <Route exact path={`${path}/emp-profile`} component={EmpProfile} /> */}
                <Route path={`${path}/signOut`} component={SignOut} />
            </Switch>
        </Container>
    );
}

export default Header;