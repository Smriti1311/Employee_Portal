import axios from 'axios';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector, connect } from 'react-redux';

function EmpProfile(props) {
    //const employeeData = useSelector(state => state.Login.employeeData.employeeData.data);
    //console.log(employeeData);
    
    const authToken = localStorage.getItem('empToken');
    const employeeData = props.employeeData.employeeData.data;
    console.log(employeeData);
    const {employeeId, employeeName, Designation, employeeType, personalEmail, reportingTo, role, status} = employeeData;
    console.log(employeeId);

    useEffect(()=>{
        const url = "http://localhost:8080/users/empdetails/6110dba4ddc8dd7b9002bd79";
        axios.get(url)
        .then(res => {
            console.log(res);
        })
        .catch ( err => {
            console.log(err);
        })
    },[]); 


    return (
        <>
        <h2 className = 'text-center'> Employee Profile</h2>
       <Table bordered className = 'w-50 mx-auto'>
           <tbody>
               <tr>
                   <td>Employee Name</td>
                    <td>{employeeName}</td>
               </tr>
               <tr>
                   <td>Designation</td>
                    <td>{Designation}</td>
               </tr>
               <tr>
                   <td>Employee Type</td>
                    <td>{employeeType}</td>
               </tr>
               <tr>
                   <td>Personal Email</td>
                    <td>{personalEmail}</td>
               </tr>
               <tr>
                   <td>Reporting To</td>
                    <td>{reportingTo}</td>
               </tr>
               <tr>
                   <td>role</td>
                    <td>{role}</td>
               </tr>
               <tr>
                   <td>status</td>
                    <td>{status.xy.xyz}</td>
               </tr>

               
           </tbody>
       </Table>
       </>
    );
}

const mapStateToProps = state => {
   return { employeeData : state.Login}
}

export default connect(mapStateToProps)(EmpProfile);