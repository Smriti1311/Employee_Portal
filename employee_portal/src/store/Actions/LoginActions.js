import axios from "axios";
import { USERDETAILS } from "../../components/Contants";

export const submit_login = (employeeId, password) => dispatch => {
    const url = "http://localhost:8080/users/login";
    axios.post(url, { username: employeeId, password: password })
        .then((res) => {
            console.log(res.data);
           const employeeData = res.data;
           localStorage.setItem('empToken',employeeData.token);
            return {
                type: USERDETAILS,
                employeeData: employeeData,
            }
        })
        .catch((err) => {
            console.log(err);
        })
   

}