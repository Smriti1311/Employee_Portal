import axios from 'axios';

import { UPDATEUSER, VIEWUSER, DELETEUSER, baseUrl, LOADING_DATA, LOADING_DONE } from 'components/Contants';

export const ViewEmployee = (id, history) => dispatch => {
    const url = baseUrl + 'empdetails/';
    const pathName = history.location.pathname;
    console.log('pathname==',pathName);
    dispatch({
        type : LOADING_DATA
    })
    axios.get(`http://localhost:8080/users/empdetails/${id}`)
        .then(res => {
            console.log(res.data.data);
           dispatch({
               type : VIEWUSER,
               employeeData : res.data.data
           })
            dispatch({ type : LOADING_DONE});
            console.log(pathName);
           history.push(`${pathName}viewEmployee`)
        })
        .catch ( err => {
            console.log(err);
           dispatch({ type : LOADING_DONE});
        })
  
}