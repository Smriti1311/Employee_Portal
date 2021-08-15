import { IconButton } from '@material-ui/core';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link , Switch, Route, useRouteMatch} from 'react-router-dom';

import Profile from '../Profile/Profile';
import SignOut from '../signOut/SignOut';
import './Header.scss';

function Header(props) {
    const {path} = useRouteMatch();
    console.log(path);
    return (
        <Container fluid className = 'Header d-flex flex-row-reverse '>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
          ></IconButton>
            <Navbar>
                    <Nav.Link as = {Link}  to={`/profile`}>Profile</Nav.Link>
                    <Nav.Link  to={`/signOut`}>SignOut</Nav.Link>
            </Navbar>   

            <Switch>
                <Route exact path = {`/profile`} component = {Profile} />
                <Route  path = {`/signOut`} component = {SignOut} />
            </Switch>
        </Container>
    );
}

export default Header;