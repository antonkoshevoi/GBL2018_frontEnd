import React, {Component} from 'react';
import {translate} from 'react-i18next';
import SplashHeader from './sections/SplashHeader'
import SplashNavigation from './sections/SplashNavigation'
import SplashFooter from './sections/SplashFooter'
import {withRouter} from 'react-router-dom';
import './splash.css';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';


class PrivacyPolicy extends Component {
      
  componentDidMount() {
      window.scrollTo(0, 0)
  }
  
  _renderContent() {
    const {t} = this.props;
    
    const paragraphs = t('privacyPolicy.paragraphs', {
        interpolation: {escapeValue: false}, 
        returnObjects: true, 
        br: '<br />'
    });       
        
    return paragraphs.map((record, key) => (           
      <div>
        <h5>{record.title}</h5>
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
                  <h1>{t('privacyPolicy.title')}</h1>
                  <h3 className="m--margin-top-15 m--margin-bottom-15">{t('privacyPolicy.subTitle')}</h3>
                  { this._renderContent() }
              </div>
              <SplashFooter {...this.props} />
            </section>
          </StickyHeader>
        </div>);
    }
};

export default withRouter(translate('splashScreen')(PrivacyPolicy));