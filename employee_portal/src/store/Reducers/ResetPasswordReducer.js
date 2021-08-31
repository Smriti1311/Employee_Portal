import { OTPGENERATIONSTARTED, OTPGENERATION, ERRORGENERATED } from '../../components/Contants';
import { CHECKOTPSTARTED, CHECKOTP, CHECKOTPERROR } from '../../components/Contants';
import { RESETPASSWORDSTARTED, RESETPASSWORD, RESETPASSWORDERROR } from '../../components/Contants';
import {CHANGEPASSWORDSTARTED,CHANGEPASSWORD,CHANGEPASSWORDERROR } from '../../components/Contants';

const initialState = {
    email: '',
    errorMsg: '',
    successMsg: '',
    otpReceived: false,
    loading: false,
    otpVerified: false,
    passwordReset: false,
    passwordChanged : false
}

const ResetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case OTPGENERATIONSTARTED:
            return ({
                ...state,
                loading: true,
                errorMsg: '',
                successMsg: ''
            })
        case OTPGENERATION:
            return ({
                ...state,
                email: action.email,
                successMsg: action.successMsg,
                errorMsg: '',
                otpReceived: true,
                loading: false
            })
        case ERRORGENERATED:
            return ({
                ...state,
                errorMsg: action.errorMsg,
                successMsg: '',
                otpReceived: false,
                loading: false
            })
        case CHECKOTPSTARTED:
            return ({
                ...state,
                loading: true,
                errorMsg: '',
                successMsg: ''
            })
        case CHECKOTP:
            return ({
                ...state,
                successMsg: action.successMsg,
                errorMsg: '',
                otpVerified: true,
                loading: false
            })
        case CHECKOTPERROR:
            return ({
                ...state,
                errorMsg: action.errorMsg,
                otpVerified: false,
                loading: false
            })
        case RESETPASSWORDSTARTED:
            return ({
                ...state,
                loading: true,
                errorMsg: '',
                successMsg: ''
            })
        case RESETPASSWORD:
            return ({
                ...state,
                successMsg: action.successMsg,
                errorMsg: '',
                passwordReset: true,
                loading: false
            })
        case RESETPASSWORDERROR:
            return ({
                ...state,
                errorMsg: action.errorMsg,
                passwordReset: false,
                loading: false
            })
            case CHANGEPASSWORDSTARTED:
                return ({
                    ...state,
                    loading: true,
                    errorMsg: '',
                    successMsg: ''
                })
            case CHANGEPASSWORD:
                return ({
                    ...state,
                    successMsg: action.successMsg,
                    errorMsg: '',
                    passwordChanged : true,
                    loading: false
                })
            case CHANGEPASSWORDERROR:
                return ({
                    ...state,
                    errorMsg: action.errorMsg,
                    passwordChanged : false,
                    loading: false
                })
        default:
            return state;
    }
}

export default ResetPasswordReducer;