import { UPDATEUSER, VIEWUSER, DELETEUSER } from 'components/Contants';

const initialState = {
    employeeData: {},
    empDeleted: false,
    empUpdated: false
}

const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case VIEWUSER:
            return {
                ...state,
                employeeData: action.employeeData
            }
        case DELETEUSER:
            return {
                ...state,
                employeeData: action.employeeData,
                empDeleted: true
            }
        case UPDATEUSER:
            return {
                ...state,
                employeeData : action.employeeData,
                empUpdated : true
            }
        default:
            return state;
    }
}

export default EmployeeReducer;