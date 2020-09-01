import React from 'react';
import { PageFrame } from '../Components/PageFrame';
import { AuthorField } from '../Components/AuthorField';
import { SubscribeUser } from '../Components/SubscribeUser';
import { SubscribeNotUser } from '../Components/SubscribeNotUser';
import { About } from '../Components/About';
import { PersonalData } from '../constants/data';

const AboutPage = () => (
  <PageFrame>
    <div className="column-content">
      <div className="article-container">
        <About />
      </div>
      <div className="aside-container">
        <AuthorField data={PersonalData} />
        {sessionStorage.getItem('isLoggedIn') ? <SubscribeUser /> : <SubscribeNotUser />}
      </div>
    </div>
  </PageFrame>
);

export default AboutPage;
