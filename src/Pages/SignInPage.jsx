import React from 'react';
import { PageFrame } from '../Components/PageFrame';
import SignIn from '../Components/SignIn';
import { Link } from 'react-router-dom';

const SignInPage = () => (
  <PageFrame>
    <SignIn />
    <div className="sign-up-here-note">
      <span>Not yet a gourmand?</span>
      <span className="sign-up-link">
        <Link to="/sign-up">Sign up</Link>here 🍝
      </span>
    </div>
  </PageFrame>
);

export default SignInPage;
