import { OTPGENERATIONSTARTED, OTPGENERATION, ERRORGENERATED } from '../../components/Contants';
import { CHECKOTPSTARTED, CHECKOTP, CHECKOTPERROR } from '../../components/Contants';
import { RESETPASSWORDSTARTED, RESETPASSWORD, RESETPASSWORDERROR } from '../../components/Contants';
import {CHANGEPASSWORDSTARTED,CHANGEPASSWORD,CHANGEPASSWORDERROR } from '../../components/Contants';

const initialState = {
    email: '',
    errorMsg: '',
    successMsg: '',
    otpReceived: false,
    otpVerified: false,
    passwordReset: false,
    passwordChanged : false
}

const ResetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case OTPGENERATIONSTARTED:
            return ({
                ...state,
                errorMsg: '',
                successMsg: ''
            })
        case OTPGENERATION:
            console.log('otp generate reducer');
            return ({
                ...state,
                email: action.email,
                successMsg: action.successMsg,
                errorMsg: '',
                otpReceived: true,
            })
        case ERRORGENERATED:
            return ({
                ...state,
                errorMsg: action.errorMsg,
                successMsg: '',
                otpReceived: false,
            })
        case CHECKOTPSTARTED:
            return ({
                ...state,
                errorMsg: '',
                successMsg: ''
            })
        case CHECKOTP:
            console.log('Reducer Check OTP');
            return ({
                ...state,
                successMsg: action.successMsg,
                errorMsg: '',
                otpVerified: true,
             })
        case CHECKOTPERROR:
            console.log('Reducer Error OTP');
            return ({
                ...state,
                errorMsg: action.errorMsg,
                otpVerified: false,
            })
        case RESETPASSWORDSTARTED:
            return ({
                ...state,
                errorMsg: '',
                successMsg: ''
            })
        case RESETPASSWORD:
            return ({
                ...state,
                successMsg: action.successMsg,
                errorMsg: '',
                passwordReset: true,
            })
        case RESETPASSWORDERROR:
            return ({
                ...state,
                errorMsg: action.errorMsg,
                passwordReset: false,
            })
            case CHANGEPASSWORDSTARTED:
                return ({
                    ...state,
                    errorMsg: '',
                    successMsg: ''
                })
            case CHANGEPASSWORD:
                return ({
                    ...state,
                    successMsg: action.successMsg,
                    errorMsg: '',
                    passwordChanged : true,
                })
            case CHANGEPASSWORDERROR:
                return ({
                    ...state,
                    errorMsg: action.errorMsg,
                    passwordChanged : false,
                })
        default:
            return state;
    }
}

export default ResetPasswordReducer;