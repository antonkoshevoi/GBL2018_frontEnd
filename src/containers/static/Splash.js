import React from 'react';
import {translate} from 'react-i18next';
import SplashHeader from './sections/SplashHeader'
import SplashNavigation from './sections/SplashNavigation'
import SplashJumbotron from './sections/SplashJumbotron'
import SplashStore from './sections/SplashStore'
import SplashPlatform from './sections/SplashPlatform'
import SplashFooter from './sections/SplashFooter'
import './splash.css';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';


const SplashContainer = props => {
  return (<div className="splash">
    <StickyHeader      
      header={
        <section className="section-header">
          <SplashHeader {...props} />
          <SplashNavigation {...props} />
        </section>
      }
    >
      <section>
        <SplashJumbotron {...props} />
        <SplashPlatform {...props} />
        <SplashStore {...props} />
        <SplashFooter {...props} />
      </section>
    </StickyHeader>
  </div>)
}

export default translate('splashScreen')(SplashContainer);