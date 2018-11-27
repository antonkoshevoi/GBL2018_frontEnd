import React, {PureComponent} from 'react';
import {translate} from 'react-i18next';
import SplashWrapper from './SplashWrapper'

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
    
    return (
        <SplashWrapper className="splash-container">           
            <div>
                <h1 className="m--margin-bottom-25">{t(section + '.title')}</h1>
                { (t(section + '.subTitle') !== section + '.subTitle') && <h2 className="m--margin-bottom-25">{t(section + '.subTitle')}</h2> }
                { (t(section + '.image') !== (section + '.image')) && <p><img className="img-thumbnail" alt="About Us" src={t(section + '.image')} /></p> }
                { this._renderContent(section) }
            </div>            
        </SplashWrapper>);
    }
};

export default translate('splashScreen')(SplashContent);