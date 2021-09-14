import axios from 'axios';

import {  VIEWUSER, baseUrl, LOADING_DATA, LOADING_DONE } from 'components/Contants';
import { toast } from 'react-toastify';

export const ViewEmployee = (id, history, location) => dispatch => {
   // const url = baseUrl + 'empdetails/';
    const pathName = location.pathname;
    console.log('location==', location.pathname);
    dispatch({
        type: LOADING_DATA
    })
    axios.get(`http://localhost:8080/users/empdetails/${id}`)
        .then(res => {
            console.log(res.data.data);
            dispatch({
                type: VIEWUSER,
                employeeData: res.data.data
            })
            dispatch({ type: LOADING_DONE });
            history.push(`${pathName}viewEmployee`)
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: LOADING_DONE });
        })

}

export const DeleteEmployee = (id) => dispatch => {
    const url = baseUrl + 'deleteemployee/';
    console.log('delete emp=', id);
    dispatch({type : LOADING_DATA})
    axios.get(`${url}${id}`)
        .then((res) => {
            console.log(res)
            if(res.data.code===0 && res.data.msg==='Employee deleted successfully'){
                toast.success('Employee deleted successfully');
            }
            else{
                toast.error('Unable to delete');
            }
            dispatch({ type : LOADING_DONE});
        })
        .catch((err)=>{
            console.log(err);
            dispatch({ type : LOADING_DONE});
        })
}

export const EditEmployee = (id, history, location) => dispatch => {
    console.log(history);
    const pathName = location.pathname;
    console.log(pathName);
   history.push(`${pathName}edit-employee/${id}`)
}
