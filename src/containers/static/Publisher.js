import React from 'react';
import {translate} from 'react-i18next';

import SplashHeader from './sections/SplashHeader'
import SplashNavigation from './sections/SplashNavigation'
import SplashFooter from './sections/SplashFooter'

import './splash.css';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

const Publisher = (props) => {
  return (<div className="splash">
    <StickyHeader      
      header={
        <section>
          <SplashHeader {...props} />
          <SplashNavigation {...props} />
        </section>
      }
    >
      <section className="splash-container">
        <div className="container">

        </div>
        <SplashFooter {...props} />
      </section>
    </StickyHeader>
  </div>)
};

export default translate('splashScreen')(Publisher);