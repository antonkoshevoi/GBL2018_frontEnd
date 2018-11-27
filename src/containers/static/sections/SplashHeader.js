import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';
import StickyHeader from 'react-sticky-header';
import SplashNavigation from './SplashNavigation'
import 'react-sticky-header/styles.css';

class SplashHeader extends PureComponent {
    render() {
        const {t}       = this.props;
        const logoUrl   = '//d2cnhr6egzpvdl.cloudfront.net/image/gravitybrain-logo.svg';

        const headerSection = (<section className="section-header">
            <div className="splash-header">
              <div className="container clearfix">
                <div className="logo">
                  <NavLink to={`/`} className="btn no-border m-btn btn-sm "><img className="img-logo" src={logoUrl} alt="GravityBrain" /></NavLink>
                </div>
                <div className="links text-right">
                  <NavLink to={`/login`} className="btn no-border m-btn btn-sm ">{t('login')}</NavLink>
                  <NavLink to={`/signup`} className="btn btn-bordered m-btn btn-sm signup">{t('signup')}</NavLink>
                  <NavLink to={`/gift`} className="btn btn-bordered m-btn btn-sm signup">{t('sendGift')}</NavLink>
                </div>
              </div>
            </div>
            <SplashNavigation t={t} />
        </section>);

        return <StickyHeader header={headerSection} />;
    }
}

export default SplashHeader