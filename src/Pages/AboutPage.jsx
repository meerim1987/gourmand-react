import React, { useContext } from 'react';
import { PageFrame } from '../Components/PageFrame';
import { AuthorField } from '../Components/AuthorField';
import { SubscribeUser } from '../Components/SubscribeUser';
import { SubscribeNotUser } from '../Components/SubscribeNotUser';
import { About } from '../Components/About';
import { PersonalData } from '../constants/data';
import { AuthContext } from '../Application';

  
const AboutPage = () => {
  const {userData} = useContext(AuthContext);
  return (
    <PageFrame>
      <div className="column-content">
        <div className="article-container">
          <About />
        </div>
        <div className="aside-container">
          <AuthorField data={PersonalData} />
          {userData.isLoggedIn ? <SubscribeUser /> : <SubscribeNotUser />}
        </div>
      </div>
  </PageFrame>
  )
};

export default AboutPage;
