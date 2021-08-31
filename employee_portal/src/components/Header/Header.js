//import { IconButton } from '@material-ui/core';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {Link, useRouteMatch} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Header.scss';

function Header(props) {
    const { path } = useRouteMatch();
    const id = useSelector(state => state.Login.employeeData.data?._id);
    console.log('id=',id);
    console.log(path);
    return (
        <Container fluid className='Header flex-reverse-row '>
            <Navbar className = 'navbar-fixed-top'>
                <Navbar.Brand className = 'mr-auto p-2'><img height = '3%' width = '5%' src = './media/EMS_LoginPage.png' alt = 'EMS' /></Navbar.Brand>
                <Nav.Link className = 'p-2' as={Link} to={`${path}/emp-profile/${id}`}>Profile</Nav.Link>
                <Nav.Link className = 'p-2' as={Link} to={'/'}>SignOut</Nav.Link>
            </Navbar>
        </Container>
    );
}

export default Header;