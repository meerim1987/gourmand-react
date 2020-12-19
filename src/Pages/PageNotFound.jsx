import React, { memo } from 'react';
import { PageFrame } from '../Components/PageFrame';
import { HamburgerSvg } from '../static/svg';
import { Helmet } from 'react-helmet';



export const PageNotFound = memo(() => (
    <PageFrame>
        <Helmet>
            <link rel="stylesheet" href="/assets/page_not_found.css" />
        </Helmet>
        <p>Page not found...</p>
        <div className="main-page-not-found">
            <HamburgerSvg/>
        </div>
    </PageFrame>
));