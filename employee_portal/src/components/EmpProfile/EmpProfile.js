import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router';

function EmpProfile(props) {
    const [employeeData, setEmployeeData] = useState({});
    const params = useParams();
    console.log(params);
  
    useEffect(()=>{
    
       const id = params['id'];
        axios.get(`http://localhost:8080/users/empdetails/${id}`)
        .then(res => {
            console.log(res.data.data);
            setEmployeeData(res.data.data);
        })
        .catch ( err => {
            console.log(err);
        })
    },[params]); 

    return (
        <>
        <h2 className = 'text-center'> Employee Profile</h2>
       <Table bordered className = 'w-50 mx-auto'>
           <tbody>
               <tr>
                   <td>Employee Name</td>
                    <td className = 'text-capitalize'>{employeeData.employeeName}</td>
               </tr>
               <tr>
                   <td>Designation</td>
                    <td>{employeeData.designation}</td>
               </tr>
               <tr>
                   <td>Employee Type</td>
                    <td>{employeeData.employeeType}</td>
               </tr>
               <tr>
                   <td>Personal Email</td>
                    <td>{employeeData.personalEmail}</td>
               </tr>
               <tr>
                   <td>Reporting To</td>
                    <td>{employeeData.reportingTo}</td>
               </tr>
               <tr>
                   <td>Role</td>
                    <td>{employeeData.role}</td>
               </tr>
               <tr>
                   <td>Status</td>
                    <td>{employeeData.status}</td>
               </tr>

               
           </tbody>
       </Table>
       </>
    );
}

export default EmpProfile;