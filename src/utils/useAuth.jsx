import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// Checks if user is signed in and handles redirects
export const useAuth = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn') === null) {
      console.log('Redirected to signIn!');
      const redirect = location.pathname + location.search;

      sessionStorage.setItem('prevUrl', redirect);
      history.push(`/sign-in`);
    }
  }, []);
};
