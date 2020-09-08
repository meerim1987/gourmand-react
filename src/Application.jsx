import React, { Suspense, lazy, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IndexPage } from './Pages/IndexPage';
const SignIn = lazy(() => import('./Pages/SignInPage'));
import RecipePost from './Pages/RecipePostPage';
const Recipe = lazy(() => import('./Pages/RecipePage'));
const SignUp = lazy(() => import('./Pages/SignUpPage'));
const SignOut = lazy(() => import('./Components/SignOut'));
const Categories = lazy(() => import('./Pages/CategoryPage'));
const AboutInfo = lazy(() => import('./Pages/AboutPage'));
const ContactPage = lazy(() => import('./Pages/ContactPage'));
export const AuthContext = React.createContext();
import {reducer} from './utils/reducer';
 

// Saving state of the authenticated user on onload
let initialState = { isLoggedIn: false, user: null };
const userData = sessionStorage.getItem('user');

if(userData) {
  initialState = {isLoggedIn: true, user: JSON.parse(userData)};
}

import { Loader } from './Components/Loader';
import {
  ABOUT,
  CATEGORIES,
  CATEGORY,
  CONTACT,
  RECIPE,
  RECIPE_POST,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from './constants/routes';

const notifier = (groupByComponent, collapseComponentGroups, displayName, diffs) => {
  diffs.forEach(({ name, prev, next, type }) => {
    console.log('Report - ', 'name-', name, 'prev-', prev, 'next-', next, 'type-', type);
  });
};

// if (process.env.NODE_ENV !== 'production') {
//     const {whyDidYouUpdate} = require('why-did-you-update');
//     // whyDidYouUpdate(React, { notifier });
//     whyDidYouUpdate(React);
// }


export const Application = () => {
  // useReducer updates user info state using its handler (reducer)
  // Context provider delivers user info and setter via its object to all the Components
  const [userData, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider 
      value={{
        userData,
        dispatch
      }}>
      <Router>
        <Switch>
          <Route exact path={'/'} component={IndexPage} />
          <Suspense
            fallback={
              <div>
                <Loader />
              </div>
            }
          >
            <Route exact path={ABOUT} component={(props) => <AboutInfo {...props} />} />
            <Route exact path={CONTACT} component={(props) => <ContactPage {...props} />} />
            <Route exact path={SIGN_IN} component={(props) => <SignIn {...props} />} />
            <Route exact path={RECIPE_POST} component={RecipePost} />
            <Route exact path={RECIPE} component={(props) => <Recipe {...props} />} />
            <Route exact path={SIGN_UP} component={(props) => <SignUp {...props} />} />
            <Route exact path={SIGN_OUT} component={(props) => <SignOut {...props} />} />
            <Route exact path={CATEGORY} component={(props) => <Categories {...props} />} />
            <Route exact path={CATEGORIES} component={(props) => <Categories {...props} />} />
          </Suspense>
        </Switch>
      </Router>
      </AuthContext.Provider>
  );
};
