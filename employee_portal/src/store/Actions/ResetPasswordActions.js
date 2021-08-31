import axios from 'axios';
import { OTPGENERATIONSTARTED, OTPGENERATION, ERRORGENERATED } from '../../components/Contants';
import { CHECKOTPSTARTED, CHECKOTP, CHECKOTPERROR } from '../../components/Contants';
import { RESETPASSWORDSTARTED, RESETPASSWORD, RESETPASSWORDERROR } from '../../components/Contants';
import {CHANGEPASSWORDSTARTED,CHANGEPASSWORD,CHANGEPASSWORDERROR } from '../../components/Contants';

export const generateOTP = (email) => dispatch => {
    dispatch({
        type: OTPGENERATIONSTARTED
    });
    const url = "http://localhost:8080/users/otpgeneration";
    axios.post(url, { 'email': email })
        .then((res) => {
            let successMsg = 'OTP sent to email';
            dispatch({
                type: OTPGENERATION,
                email: email,
                successMsg: successMsg,
            })
        })
        .catch((err) => {
            let errorMsg = 'Unable to generate OTP';
            dispatch({
                type: ERRORGENERATED,
                errorMsg: errorMsg,
            })
        })
}

export const checkOTP = (email, otp) => dispatch => {
    dispatch({
        type: CHECKOTPSTARTED
    })
    const url = "http://localhost:8080/users/checkOtp";
    const payload = {
        email: email,
        otp: parseInt(otp, 10)
    }
    axios.post(url, payload)
        .then((res) => {
            let successMsg = 'Valid Otp';
            if (res.data.status === 200 && res.data.msg === successMsg) {
                dispatch({
                    type: CHECKOTP,
                    successMsg: successMsg,
                })
            }
            else {
                dispatch({
                    type: CHECKOTPERROR,
                    errorMsg: res.data.msg
                })
            }
        })
        .catch((err) => {
            let errorMsg = 'Incorrect OTP'
            dispatch({
                type: CHECKOTPERROR,
                errorMsg: errorMsg,
            })
        })
}

export const resetPassword = (email,password,confirmPassword) => dispatch => {
    dispatch({
        type : RESETPASSWORDSTARTED
    })
   
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
            })
        })
        .catch((err) => {
            let errorMsg = 'Password reset failed'
            dispatch({
                type : RESETPASSWORDERROR,
                errorMsg : errorMsg
            })
        })

}


export const changePassword = (email,oldPassword, password,confirmPassword, employeeId) => dispatch => {
    dispatch({
        type : CHANGEPASSWORDSTARTED
    })
   
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
            })
        })
        .catch((err) => {
            let errorMsg = 'Password reset failed'
            dispatch({
                type : CHANGEPASSWORDERROR,
                errorMsg : errorMsg
            })
        })

}