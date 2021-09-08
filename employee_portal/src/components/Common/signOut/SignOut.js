import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import {ResetAllStatesAction} from './../../../store/Actions/ResetAllStatesAction'

function SignOut(props) {

  const dispatch = useDispatch();

  useEffect(()=>{
    localStorage.removeItem('empToken');
    dispatch(ResetAllStatesAction());
  })

return(
  <Redirect to = '/' />
);

}

export default SignOut;