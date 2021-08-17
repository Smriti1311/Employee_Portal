import React, {useState} from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { FaBars, FaGem , FaHeart} from 'react-icons/fa';
import { GoDashboard} from 'react-icons/go';
import { MenuItem,Menu, ProSidebar, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/scss/styles.scss';
import './SideBar.scss';
function Sidebar(props) {
    const [collapseSideBar, setcollapseSideBar] = useState(false);
    const history = useHistory();
    const {path} = useRouteMatch();
    const myProfileHandler = () => {
       // history.push(`${path}/emp-profile`);
    }
    return (
        <ProSidebar className = 'ProSidebar' collapsed = {collapseSideBar}>
            <SidebarHeader>
                <FaBars />
                <h5>Employee Management</h5>
            </SidebarHeader>
            <SidebarContent>
            <Menu iconShape = "square">
                <MenuItem icon = { <GoDashboard />}>DashBoard</MenuItem>
                <SubMenu title = 'My Data' icon = { <FaHeart />}>
                    <MenuItem >My Profile<Link to = {`${path}/emp-profile`}/></MenuItem>
                    <MenuItem>Time Sheet</MenuItem>
                    <MenuItem>Team Members</MenuItem>
                </SubMenu>
            </Menu>
            </SidebarContent>
            <SidebarFooter>
                Footer
            </SidebarFooter>

        </ProSidebar>
    );
}

export default Sidebar;