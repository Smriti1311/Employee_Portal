import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useDispatch, useSelector} from 'react-redux';
import { LOADING_DATA, LOADING_DONE } from 'components/Contants';

function EmpProfile(props) {
    console.log('emp profile');
    const [employeeData, setEmployeeData] = useState({});
    const params = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.Loading.loading);
    console.log(loading);
  
    useEffect(()=>{
        console.log('emp profile use effect');
        dispatch({ type : LOADING_DATA});
        console.log(loading);
       const id = params['id'];
        axios.get(`http://localhost:8080/users/empdetails/${id}`)
        .then(res => {
            console.log(res);
            setEmployeeData(res.data.data);
            dispatch({ type : LOADING_DONE});
        })
        .catch ( err => {
            console.log(err);
            dispatch({ type : LOADING_DONE});
        })
    },[]); 

    return (
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
    );
}

export default EmpProfile;