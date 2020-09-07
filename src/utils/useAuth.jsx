import React, { useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from '../Application';

// Checks if user is signed in and handles redirects using useContext hook
export const useAuth = () => {
  const history = useHistory();
  const location = useLocation();
  const {userData} = useContext(AuthContext);

  useEffect(() => {
    if (!userData.isLoggedIn) {
      console.log('Redirected to signIn!');
      const redirect = location.pathname + location.search;

      sessionStorage.setItem('prevUrl', redirect);
      history.push(`/sign-in`);
    }
  }, []);
};