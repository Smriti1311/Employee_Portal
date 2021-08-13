import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";

const RootReducer = combineReducers({
    Login : LoginReducer

})

export default RootReducer;