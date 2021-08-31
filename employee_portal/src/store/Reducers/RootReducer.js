import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import ResetPasswordReducer from './ResetPasswordReducer';

const RootReducer = combineReducers({
    Login : LoginReducer,
    ResetPassword : ResetPasswordReducer
})

export default RootReducer;