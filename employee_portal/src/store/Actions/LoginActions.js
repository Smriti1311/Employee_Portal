import axios from "axios";
import { USERDETAILS , LOGINFAILED} from "../../components/Contants";

export const submit_login = (employeeId, password, history) => dispatch =>  {
    const url = "http://localhost:8080/users/login";
    
     axios.post(url, { username: employeeId, password: password })
        .then((res) => {
            if(res.data.code===0){
                dispatch({
                    type : LOGINFAILED,
                    error : res.data.msg
                })
            }
            else if(res.data.code === 1){
           const employeeData = res.data;
           console.log(employeeData);
           const { token } = employeeData;
           const { firstLogin } = employeeData.data;
           localStorage.setItem('empToken',token);
           if(firstLogin){
               history.push('./changePassword')
           }else {
             history.push('./homePage');
           }
            dispatch( {
                type: USERDETAILS,
                employeeData: employeeData
            })
        }
        }
        )
        .catch((err) => {
            console.log(err);
            dispatch({
                type : LOGINFAILED,
                error : err
            })
        })
   

}