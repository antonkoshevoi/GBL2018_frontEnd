import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';
import StickyHeader from 'react-sticky-header';
import SplashNavigation from './SplashNavigation'
import CldImage from '../../../components/ui/CldImage';
import LanguageSwitcher from "../../../components/ui/LanguageSwitcher";
import 'react-sticky-header/styles.css';

class SplashHeader extends PureComponent {
    render() {
        const {t} = this.props;        

        const headerSection = (<section className="section-header">
            <div className="splash-header">
              <div className="container clearfix">
                <div className="logo">
                  <NavLink to={`/`}><CldImage className="img-logo" src="BZabc_logo_top.png" alt="GravityBrain" /></NavLink>
                </div>
                <div className="splash-navigation-tools">
                  <LanguageSwitcher/>
                </div>                
                <div className="links text-right">
                  <NavLink to={`/login`} className="btn-login"><i></i>{t('login')}</NavLink>
                  <NavLink to={`/signup`} className="btn-signup"><i></i>{t('signup')}</NavLink>
                  <NavLink to={`/gift`} className="btn-gift"><i className="fa fa-gift"></i>{t('sendGift')}</NavLink>
                </div>
              </div>
            </div>
            <SplashNavigation t={t} />
        </section>);

        return <StickyHeader header={headerSection} />;
    }
}

export default SplashHeader