import React, {Component} from 'react';
import {translate} from 'react-i18next';

import SplashHeader from '../Splash/SplashHeader'
import SplashNavigation from '../Splash/SplashNavigation'
import SplashFooter from '../Splash/SplashFooter'
import {withRouter} from 'react-router-dom';
import '../Splash/splash.css';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

class TermsService extends Component {
    
  constructor(props) {
    super(props);
  }    
  
  _renderContent() {
    const {t} = this.props;
    
    const paragraphs = t('termsAndConditions.paragraphs', {
        interpolation: {escapeValue: false}, 
        returnObjects: true
    });       
        
    return paragraphs.map((record, key) => (           
      <div>
        <h4>{record.title}</h4>
        <p>{record.content.split('\n').map(line => <p>{line}</p>)}</p>
      </div>));
  }

  render() {
    const {t} = this.props;
        
    return (       
        <div className="splash">
          <StickyHeader            
            header={
                <section>
                    <SplashHeader {...this.props} />
                    <SplashNavigation {...this.props} />
                </section>
            }
          >
            <section className="splash-container">
              <div className="container">
                  <h1>{t('termsAndConditions.title')}</h1>
                  { this._renderContent() }
              </div>
              <SplashFooter {...this.props} />
            </section>
          </StickyHeader>
        </div>);
    }
};

export default withRouter(translate('splashScreen')(TermsService));