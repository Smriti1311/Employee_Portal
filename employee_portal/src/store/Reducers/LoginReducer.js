import { USERDETAILS, LOGINFAILED } from "../../components/Contants";

const initialState = {
    employeeData : {},
    error : ''
}

const LoginReducer = (state = initialState , action) => {
  switch(action.type){
    case USERDETAILS : 
        return{
            ...state,
            employeeData : action.employeeData,
            error : ''
        }
    case LOGINFAILED :
        return{
            ...state,
            error : action.error
        }    
    default :    
        return state;
 }
}

export default LoginReducer;