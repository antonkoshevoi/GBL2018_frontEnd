import React from 'react';
import {translate} from 'react-i18next';

import SplashHeader from '../Splash/SplashHeader'
import SplashNavigation from '../Splash/SplashNavigation'
import SplashFooter from '../Splash/SplashFooter'
import {withRouter} from 'react-router-dom';
import '../Splash/splash.css';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';


const Publisher = (props) => {
  return (<div className="splash">
    <StickyHeader
      // This is the sticky part of the header.
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

export default withRouter(translate('splashScreen')(Publisher));