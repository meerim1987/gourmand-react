import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Redirect } from 'react-router-dom';
import { useFetch } from '../utils/useFetch';
import { SIGN_OUT } from '../constants/url';

const SignOut = () => {
  const [redirect, setRedirect] = useState(false);
  const { data: content } = useFetch(SIGN_OUT);

  useEffect(() => {
    if (!content) {
      return;
    }
    try {
      if (content.success) {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('prevUrl');
        setRedirect(true);
        window.toaster.addMessage('Signed off!', 'info');
      } else {
        window.toaster.addMessage(content.message, 'error');
      }
    } catch (e) {
      console.error(e);
      window.toaster.addMessage('Server returned unexpected response...', 'error');
    }
  }, [content]);

  return (
    <div>
      {redirect && <Redirect to="/" />}
      <Loader />
    </div>
  );
};

export default SignOut;
