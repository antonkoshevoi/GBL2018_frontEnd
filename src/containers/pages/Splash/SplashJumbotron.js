import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import splashImage1 from '../../../media/images/splash-image1.png';

class SplashJumbotron extends Component {
  render() {
    const {t} = this.props
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
              <img src={splashImage1} alt="Splash Image1" className="splash-image" />

            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default SplashJumbotron


