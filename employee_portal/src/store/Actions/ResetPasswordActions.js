import axios from 'axios';
import { toast } from 'react-toastify';

import { OTPGENERATIONSTARTED, OTPGENERATION, ERRORGENERATED } from '../../components/Contants';
import { CHECKOTPSTARTED, CHECKOTP, CHECKOTPERROR } from '../../components/Contants';
import { RESETPASSWORDSTARTED, RESETPASSWORD, RESETPASSWORDERROR } from '../../components/Contants';
import {CHANGEPASSWORDSTARTED,CHANGEPASSWORD,CHANGEPASSWORDERROR } from '../../components/Contants';
import { LOADING_DATA, LOADING_DONE } from '../../components/Contants';

export const generateOTP = (email, history, pathName) => dispatch => {
    console.log(email, history, pathName);
    dispatch({
        type: OTPGENERATIONSTARTED
    });
    dispatch({
        type: LOADING_DATA
    });
    const url = "http://localhost:8080/users/otpgeneration";
    axios.post(url, { 'email': email })
        .then((res) => {
            console.log('success',res);
            let successMsg = 'OTP sent to email';
            dispatch({
                type: OTPGENERATION,
                email: email,
                successMsg: successMsg,
            });
            dispatch({
                type : LOADING_DONE
            });
            console.log('otp generate success');
            toast.success(successMsg, {
                onClose: () => history.push(`${pathName}/checkOtp`)
            });
        })
        .catch((err) => {
            console.log(err);
            let errorMsg = 'Unable to generate OTP';
            dispatch({
                type: ERRORGENERATED,
                errorMsg: errorMsg,
            });
            dispatch({
                type : LOADING_DONE
            })
            toast.error(errorMsg);
        })
}

export const checkOTP = (email, otp, history) => dispatch => {
    dispatch({
        type: CHECKOTPSTARTED
    })
    dispatch({
        type: LOADING_DATA
    });
    const url = "http://localhost:8080/users/checkOtp";
    const payload = {
        email: email,
        otp: parseInt(otp, 10)
    }
    axios.post(url, payload)
        .then((res) => {
            let successMsg = 'Valid Otp';
            console.log(res);
            if (res.data.status === 200 && res.data.msg === successMsg) {
                dispatch({
                    type: CHECKOTP,
                    successMsg: successMsg,
                });
                dispatch({
                    type : LOADING_DONE
                });
                console.log('Check otp action');
                toast.success(successMsg,{
                    onClose : ()=>{
                        history.push('/resetPassword');
                    }
                });
            }
            else {
                dispatch({
                    type: CHECKOTPERROR,
                    errorMsg: res.data.msg
                });
                dispatch({
                    type : LOADING_DONE
                });
                console.log('Check otp error action');
                toast.error(res.data.msg);
            }
        })
        .catch((err) => {
            let errorMsg = 'Incorrect OTP'
            dispatch({
                type: CHECKOTPERROR,
                errorMsg: errorMsg,
            });
            dispatch({
                type : LOADING_DONE
            });
            toast.error(errorMsg);
        })
}

export const resetPassword = (email,password,confirmPassword, history) => dispatch => {
    dispatch({
        type : RESETPASSWORDSTARTED
    })
    dispatch({
        type: LOADING_DATA
    });
   
    const payload = {
        email : email,
        password : password,
        newpassword : confirmPassword
    } 
    const url = "http://localhost:8080/users/resetPassword";
   
    axios.post(url, payload)
        .then((res) => {
            dispatch({
                type : RESETPASSWORD,
                successMsg : res.data.msg
            });
            dispatch({
                type : LOADING_DONE
            });
            toast.success(res.data.msg,{
                onClose : () => {
                    history.push('/');
                }
            })
        })
        .catch((err) => {
            let errorMsg = 'Password reset failed'
            dispatch({
                type : RESETPASSWORDERROR,
                errorMsg : errorMsg
            });
            dispatch({
                type : LOADING_DONE
            });
        })

}


export const changePassword = (email,oldPassword, password,confirmPassword, employeeId, history) => dispatch => {
    dispatch({
        type : CHANGEPASSWORDSTARTED
    });
    dispatch({
        type: LOADING_DATA
    });
   
    const payload = {
        email : email,
        currentpassword : oldPassword,
        newpassword : password,
        confirmpassword : confirmPassword,
        employeeId : employeeId
    } 
    const url = "http://localhost:8080/users/changepassword";
   
    axios.post(url, payload)
        .then((res) => {
            dispatch({
                type : CHANGEPASSWORD,
                successMsg : res.data.msg
            });
            dispatch({
                type : LOADING_DONE
            });
            toast.success(res.data.msg,{
                onClose : () => {
                    history.push('/');
                }
            })
        })
        .catch((err) => {
            let errorMsg = 'Password reset failed'
            dispatch({
                type : CHANGEPASSWORDERROR,
                errorMsg : errorMsg
            });
            dispatch({
                type : LOADING_DONE
            });
            toast.error(errorMsg);
        })

}