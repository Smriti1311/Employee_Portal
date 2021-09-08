import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import ResetPasswordReducer from './ResetPasswordReducer';
import HRActionsReducer from "./HRActionsReducer";
import LoadingReducer from "./LoadingReducer";
import EmployeeReducer from "./EmployeeReducer";
import { RESETALLSTATESACTION }  from './../../components/Contants';

const appReducer =  combineReducers({
    Login : LoginReducer,
    ResetPassword : ResetPasswordReducer,
    HRActions : HRActionsReducer,
    Loading : LoadingReducer,
    EmployeeData : EmployeeReducer
})

const RootReducer = (state,action) => {
    if(action.type === RESETALLSTATESACTION){
        state = undefined;
    }
    return appReducer(state,action);
}
    
export default RootReducer;