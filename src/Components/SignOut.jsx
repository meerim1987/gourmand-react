import React, { useContext, useEffect } from 'react';
import { Loader } from './Loader';

import { useFetch } from '../utils/useFetch';
import { SIGN_OUT } from '../constants/url';
import { AuthContext } from '../Application';
import { useHistory } from 'react-router';

const SignOut = () => {
  const { dispatch, userData } = useContext(AuthContext);
  const { data, error } = useFetch(SIGN_OUT, !userData.isLoggedIn);
  const history = useHistory();
  
  useEffect(() => {
    if(!data && !error) {
      return;
    }

    if(error) {
      window.toaster.addMessage('Server returned unexpected response...', 'error');
    }

    if(data.error) {
      window.toaster.addMessage(data.error, 'error');
    }

    if(data.success) {
        // Calls the Setter of useReducer and updates the state of user
      dispatch({type: 'LOGOUT'});
      window.toaster.addMessage('Signed off!', 'info');
    }

    history.push('/');
    
  }, [data]); 

  return (<div><Loader /></div>)
};

export default SignOut;
