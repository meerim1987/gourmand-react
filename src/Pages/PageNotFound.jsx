import React, { memo, useLayoutEffect } from 'react';
import { PageFrame } from '../Components/PageFrame';
import { HamburgerSvg } from '../static/svg';
import styles from '../static/page_not_found.css';

export const PageNotFound = memo(() => {
    
    useLayoutEffect(() => {
        styles.use(); 

        return () => styles.unuse();
    }, []);
    
    return (<PageFrame>
                <p>Page not found...</p>
                <div className="main-page-not-found">
                    <HamburgerSvg/>
                </div>
            </PageFrame>)
});