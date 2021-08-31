import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import LinearProgress from '@material-ui/core/LinearProgress';

function EmpProfile(props) {
    const [employeeData, setEmployeeData] = useState({});
    const [loading, setLoading] = useState(false);
    const params = useParams();
    console.log(params);
  
    useEffect(()=>{
        setLoading(true);
       const id = params['id'];
        axios.get(`http://localhost:8080/users/empdetails/${id}`)
        .then(res => {
            console.log(res.data.data);
            setEmployeeData(res.data.data);
            setLoading(false);
        })
        .catch ( err => {
            console.log(err);
            setLoading(false);
        })
    },[params]); 

    return (
        <>
        { loading ? 
            <div>
                <LinearProgress variant='indeterminate' value={loading} />
                </div>
        :
        <>
        <h2 className = 'text-center'> Employee Profile</h2>
       <Table bordered className = 'w-50 mx-auto'>
           <tbody>
               <tr>
                   <td>Employee Name</td>
                    <td className = 'text-capitalize'>{employeeData?.employeeName}</td>
               </tr>
               <tr>
                   <td>Designation</td>
                    <td>{employeeData?.designation}</td>
               </tr>
               <tr>
                   <td>Employee Type</td>
                    <td>{employeeData?.employeeType}</td>
               </tr>
               <tr>
                   <td>Personal Email</td>
                    <td>{employeeData?.personalEmail}</td>
               </tr>
               <tr>
                   <td>Reporting To</td>
                    <td>{employeeData?.reportingTo}</td>
               </tr>
               <tr>
                   <td>Role</td>
                    <td>{employeeData?.role}</td>
               </tr>
               <tr>
                   <td>Status</td>
                    <td>{employeeData?.status}</td>
               </tr>

               
           </tbody>
       </Table>
       </>
        }
        </>
    );
}

export default EmpProfile;