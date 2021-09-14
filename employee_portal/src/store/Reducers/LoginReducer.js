import { USERDETAILS, LOGINFAILED } from "../../components/Contants";

const initialState = {
    employeeData : {},
    error : '',
    empLoggedIn : false
}

const LoginReducer = (state = initialState , action) => {
  switch(action.type){
    case USERDETAILS : 
        return{
            ...state,
            employeeData : action.employeeData,
            empLoggedIn : true,
            error : ''
        }
    case LOGINFAILED :
        return{
            ...state,
            error : action.error,
            empLoggedIn : false
        }    
    default :    
        return state;
 }
}

export default LoginReducer;