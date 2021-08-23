import React from 'react';
import { useRouteMatch, Redirect } from 'react-router';

function SignOut(props) {
  //  const {path} = useRouteMatch();
    return (
        <div className = " p-2" >
           < Redirect to = '/' />
        </div>
    );
}

export default SignOut;