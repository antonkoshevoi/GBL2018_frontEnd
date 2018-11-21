import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';

class SplashHeader extends PureComponent {
  render() {
    const {t}       = this.props;
    const logoUrl   = '//d2cnhr6egzpvdl.cloudfront.net/image/gravitybrain-logo.svg';
    
    return (
      <div className="splash-header">
        <div className="container clearfix">
          <div className="logo">
            <NavLink to={`/`} className="btn no-border m-btn btn-sm "><img className="img-logo" src={logoUrl} alt="GravityBrain" /></NavLink>
          </div>
          <div className="links text-right">
            <NavLink to={`/login`} className="btn no-border m-btn btn-sm ">{t('login')}</NavLink>
            <NavLink to={`/signup`} className="btn btn-bordered m-btn btn-sm signup">{t('signup')}</NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default SplashHeader