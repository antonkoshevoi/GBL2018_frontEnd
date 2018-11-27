import React from 'react';
import {translate} from 'react-i18next';
import SplashHeader from './SplashHeader'
import SplashFooter from './SplashFooter'
import './splash.css';

const SplashWrapper = props => {
  const minHeight = window.document.documentElement.clientHeight - 273;
  
  return (<div className="splash">
      <SplashHeader {...props} />
      <section className={`${props.className || 'splash-section'}`}>
          <div className="container" style={{minHeight: minHeight}}>{props.children}</div>
          <SplashFooter {...props} />
      </section>
  </div>);
}

export default translate('splashScreen')(SplashWrapper);