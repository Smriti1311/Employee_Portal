import { USERDETAILS } from "../../components/Contants";

const initialState = {
    employeeData : {}
}

const LoginReducer = (state = initialState , action) => {
  switch(action.type){
    case USERDETAILS : 
        return{
            ...state,
            employeeData : action.employeeData
        }
    default :    
        return state;
 }
}

export default LoginReducer;