import React, {Component} from 'react';
import {translate} from 'react-i18next';
import SplashHeeader from './SplashHeeader'
import SplashNavigation from './SplashNavigation'
import SplashJumbotron from './SplashJumbotron'
import SplashStore from './SplashStore'
import SplashPlatform from './SplashPlatform'
import SplashFooter from './SplashFooter'
import {withRouter} from 'react-router-dom';
import './splash.css';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';


const SplashContainer = props => {
  return (<div className="splash">
    <StickyHeader
      // This is the sticky part of the header.
      header={
        <section>
          <SplashHeeader {...props} />
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

export default withRouter(translate('splashScreen')(SplashContainer));