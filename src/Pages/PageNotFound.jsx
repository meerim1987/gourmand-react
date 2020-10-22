import React, { memo } from 'react';
import { PageFrame } from '../Components/PageFrame';
import { HamburgerSvg } from '../static/svg';



export const PageNotFound = memo(() => (
    <PageFrame>
        <p>Page not found...</p>
        <div className="main-page-not-found">
            <HamburgerSvg/>
        </div>
    </PageFrame>
));