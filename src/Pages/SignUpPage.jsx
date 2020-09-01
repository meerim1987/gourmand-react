import React from 'react';
import { PageFrame } from '../Components/PageFrame';
import { SignUp } from '../Components/SignUp';
import { CloudTag } from '../Components/CloudTag';

const SignUpPage = () => {
  return (
    <PageFrame>
      <div className="column-content">
        <div className="article-container">
          <SignUp />
        </div>
        <div className="aside-container">
          <CloudTag />
        </div>
      </div>
    </PageFrame>
  );
};

export default SignUpPage;
