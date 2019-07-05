import React, {PureComponent} from 'react';
import {withTranslation} from 'react-i18next';
import SplashWrapper from './SplashWrapper'

class SplashContent extends PureComponent {
  
  componentDidMount() {
      window.scrollTo(0, 0)
  }
  
  componentWillReceiveProps(nextProps) {
      if (this.props.section !== nextProps.section) {
          window.scrollTo(0, 0);
      }
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
      <div key={key}>
        {record.title && <h4 className='mt-3 mb-3'>{record.title}</h4>}
        {record.subTitle && <h5 className='mb-3'>{record.subTitle}</h5>}
        {record.content.split('\n').map((line, lKey) => <p key={lKey}>{line}</p>)}
      </div>));
  }

  render() {
    const {t, section} = this.props;    
    
    return (
        <SplashWrapper className="splash-container">           
            <div>
                <h1 className="mb-4">{t(section + '.title')}</h1>
                { (t(section + '.subTitle') !== section + '.subTitle') && <h2 className="mb-4">{t(section + '.subTitle')}</h2> }                
                { (t(section + '.image') !== (section + '.image')) && <p><img className="img-thumbnail" alt="About Us" src={t(section + '.image')} /></p> }
                { this._renderContent(section) }
            </div>            
        </SplashWrapper>);
    }
};

export default withTranslation('splashScreen')(SplashContent);