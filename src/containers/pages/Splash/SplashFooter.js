import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class SplashFooter extends Component {
  render() {
    const {t} = this.props;
    return (
      <div className="splash-footer">
        <div className="container clearfix">
          <div className="" style={{flex:1}}>
            <NavLink to={`/privacy-policy.html`} className="btn no-border m-btn btn-sm ">{t('privacy')}</NavLink>
          </div>

          <div className="links text-right m--hidden-mobile">
            <NavLink to={`/terms`} className="btn no-border m-btn btn-sm ">{t('terms')}</NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default SplashFooter