import React, {Component} from 'react';
import {translate} from 'react-i18next';

import SplashHeader from '../Splash/SplashHeader'
import SplashNavigation from '../Splash/SplashNavigation'
import SplashFooter from '../Splash/SplashFooter'
import {withRouter} from 'react-router-dom';
import '../Splash/splash.css';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
const minHeight = window.document.documentElement.clientHeight - 225;


class About extends Component {
    
  constructor(props) {
    super(props);
  }    
  
  _renderContent() {
    const {t} = this.props;
    const paragraphs = t('aboutContent.paragraphs', { returnObjects: true });
        
    return paragraphs.map((record, key) => (
      <div>
        <h2>{record.title}</h2>
        <p>{record.content}</p>
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
              <div className="container" style={{minHeight: minHeight}}>
                  <p><img className="img-thumbnail" alt="About Us" src={t('aboutContent.image')} /></p>
                  { this._renderContent() }
              </div>
              <SplashFooter {...this.props} />
            </section>
          </StickyHeader>
        </div>);
    }
};

export default withRouter(translate('splashScreen')(About));