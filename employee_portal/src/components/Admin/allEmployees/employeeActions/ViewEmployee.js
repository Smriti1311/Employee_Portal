import { Table } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';

function ViewEmployee(props) {
    console.log('emp profile');
    const dispatch = useDispatch();
    const employeeData = useSelector(state => state.EmployeeData?.employeeData);

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

export default ViewEmployee;