import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';

const splashBannerImgUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/splash-image1.3239d7be.png';

class SplashJumbotron extends PureComponent {
  render() {
    const {t} = this.props;
    return (
      <div className="splash-jumbotron">
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-6 col-sm-12 header-side">
              <h3>{t('headerJubtronTitle') }</h3>
              <ul>
                <li>{t('headerListItems.1') }</li>
                <li>{t('headerListItems.2') }</li>
                <li>{t('headerListItems.3') }</li>
                <li>{t('headerListItems.4') }</li>
                <li>{t('headerListItems.5') }</li>
              </ul>
              <NavLink to="/something">{t('learnMore') } >> </NavLink>
            </div>
            <div className="col-md-6 m--hidden-mobile">
              <img src={splashBannerImgUrl} alt={t('headerJubtronTitle')} className="splash-image" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SplashJumbotron


