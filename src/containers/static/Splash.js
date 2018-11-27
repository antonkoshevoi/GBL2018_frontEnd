import React from 'react';
import {translate} from 'react-i18next';
import SplashWrapper from './sections/SplashWrapper'
import SplashJumbotron from './sections/SplashJumbotron'
import SplashStore from './sections/SplashStore'
import SplashPlatform from './sections/SplashPlatform'

const SplashContainer = props => {
  return (<SplashWrapper>
        <SplashJumbotron {...props} />
        <SplashPlatform {...props} />
        <SplashStore {...props} />        
    </SplashWrapper>);
}

export default translate('splashScreen')(SplashContainer);