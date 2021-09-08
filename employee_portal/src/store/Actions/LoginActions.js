import axios from "axios";
import { toast } from "react-toastify";

import { USERDETAILS, LOGINFAILED } from "../../components/Contants";
import { LOADING_DATA, LOADING_DONE } from '../../components/Contants';
import { baseUrl } from '../../components/Contants';

export const submit_login = (employeeId, password, history) => dispatch => {

    const url = baseUrl + "login";
    dispatch({
        type: LOADING_DATA
    });
    axios.post(url, { username: employeeId, password: password })
        .then((res) => {
            if (res.data.code === 0) {
                dispatch({
                    type: LOGINFAILED,
                    error: res.data.msg
                });
                dispatch({
                    type : LOADING_DONE
                });
                toast.error(res.data.msg);
            }
            else if (res.data.code === 1) {
                const employeeData = res.data;
                console.log(employeeData);
                const { token } = employeeData;
                const { firstLogin, _id } = employeeData.data;
                localStorage.setItem('empToken', token);
                if (firstLogin) {
                    history.push('./changePassword')
                } else {
                    history.push('./homePage');
                }
                dispatch({
                    type: USERDETAILS,
                    employeeData: employeeData
                });
                dispatch({
                    type : LOADING_DONE
                });
                toast.success('Login Successful');
            }
        }
        )
        .catch((err) => {
            console.log(err);
            dispatch({
                type: LOGINFAILED,
                error: err
            });
            dispatch({
                type : LOADING_DONE
            });
        })


}