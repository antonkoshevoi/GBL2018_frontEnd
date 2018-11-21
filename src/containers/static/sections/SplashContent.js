import React, {PureComponent} from 'react';
import {translate} from 'react-i18next';
import StickyHeader from 'react-sticky-header';
import SplashHeader from './SplashHeader'
import SplashNavigation from './SplashNavigation'
import SplashFooter from './SplashFooter'

import './splash.css';
import 'react-sticky-header/styles.css';

class SplashContent extends PureComponent {
  
  componentDidMount() {
      window.scrollTo(0, 0)
  }
  
  _renderContent(section) {
    const {t} = this.props;
    
    const paragraphs = t(section + '.paragraphs', {
        interpolation: {escapeValue: false}, 
        returnObjects: true, 
        br: '<br />'
    });
    
    if (!Array.isArray(paragraphs)) {
        return '';
    }    
        
    return paragraphs.map((record, key) => (           
      <div>
        <h5>{record.title}</h5>
        <p>{record.content.split('\n').map(line => <p>{line}</p>)}</p>
      </div>));
  }

  render() {
    const {t, section} = this.props;
    const minHeight = window.document.documentElement.clientHeight - 257;
    
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
                    <h1 className="m--margin-bottom-25">{t(section + '.title')}</h1>
                    { (t(section + '.subTitle') !== section + '.subTitle') && <h2 className="m--margin-bottom-25">{t(section + '.subTitle')}</h2> }
                    { (t(section + '.image') !== (section + '.image')) && <p><img className="img-thumbnail" alt="About Us" src={t(section + '.image')} /></p> }
                    { this._renderContent(section) }
                </div>
                <SplashFooter {...this.props} />
            </section>
            </StickyHeader>
        </div>);
    }
};

export default translate('splashScreen')(SplashContent);