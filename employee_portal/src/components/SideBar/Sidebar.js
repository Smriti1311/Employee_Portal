import React, { useState, useRef, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { GoDashboard } from 'react-icons/go';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { GrUserManager } from 'react-icons/gr';
import { MenuItem, Menu, ProSidebar, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/scss/styles.scss';
import './SideBar.scss';

function Sidebar(props) {
    const [collapseSideBar, setcollapseSideBar] = useState(true);
    const { path } = useRouteMatch();
    const sideBarRef = useRef();
    const id = useSelector(state => state.Login.employeeData?.data?._id);

    const collapseSideBarHandler = () => {
        setcollapseSideBar(true);
    }

    const toggleSideBarHandler = () => {
        setcollapseSideBar(!collapseSideBar);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
                setcollapseSideBar(true);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    });


    return (
        <ProSidebar ref={sideBarRef} className='ProSidebar' collapsed={collapseSideBar}>
            <SidebarHeader>
                <FaBars onClick={toggleSideBarHandler} />
            </SidebarHeader>
            <SidebarContent >
                <Menu onClick = {toggleSideBarHandler} iconShape="square">
                    <MenuItem onClick={collapseSideBarHandler} 
                                icon={<GoDashboard />}>DashBoard</MenuItem>
                    <MenuItem onClick={collapseSideBarHandler} 
                                icon={<BsFillPersonFill />} >All Employees</MenuItem>
                    <SubMenu title='My Data' icon={<BsFillPersonFill />}>
                        <MenuItem onClick={collapseSideBarHandler} >My Profile
                            <Link to={`${path}/emp-profile/${id}`} />
                        </MenuItem>
                        <MenuItem onClick={collapseSideBarHandler}>Time Sheet</MenuItem>
                        <MenuItem onClick={collapseSideBarHandler}>Team Members</MenuItem>
                    </SubMenu>
                    <SubMenu title='Employment' icon={<GrUserManager />} >
                        <MenuItem onClick={collapseSideBarHandler} icon={<BsFillPersonFill />}>Enroll Employee
                            <Link to={`${path}/create-employee`} />
                        </MenuItem>
                        <MenuItem onClick={collapseSideBarHandler} icon={<HiOutlineDocumentReport />}>Direct Reports
                            <Link to={`${path}/direct-reports`} />
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </SidebarContent>
        </ProSidebar>
    );
}

export default Sidebar;