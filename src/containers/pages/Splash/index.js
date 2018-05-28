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


const SplashContainer = props => {
  return (<div className="splash">
    <SplashHeeader {...props} />
    <SplashNavigation {...props} />
    <SplashJumbotron {...props} />
    <SplashPlatform {...props} />
    <SplashStore {...props} />
    <SplashFooter {...props} />
  </div>)
}

export default withRouter(translate('splashScreen')(SplashContainer));