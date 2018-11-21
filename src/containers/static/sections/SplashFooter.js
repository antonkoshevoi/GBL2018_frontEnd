import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';

class SplashFooter extends PureComponent {
  render() {
    const {t} = this.props;
    return (
      <div className="splash-footer">
        <div className="container footer-container links">
          <NavLink to={`/privacy-policy.html`} className="btn no-border m-btn btn-sm ">{t('privacy')}</NavLink>
          <NavLink to={`/terms`} className="btn no-border m-btn btn-sm ">{t('terms')}</NavLink>
        </div>
      </div>
    )
  }
}

export default SplashFooter