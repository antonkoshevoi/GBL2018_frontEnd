import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';
import SplashNavigation from './SplashNavigation'
import CldImage from '../../../components/ui/CldImage';
import LanguageSwitcher from "../../../components/ui/LanguageSwitcher";

class SplashHeader extends PureComponent {
    render() {
        const {t} = this.props;        

        return <header className="sticky-header" id="sticky-header">
          <div className="splash-header d-flex py-2">
            <div className="w-100 d-flex align-items-center mx-3 mx-md-4 mx-lg-5 px-xl-5">
              <div className="logo py-sm-1">
                <NavLink to={`/`}><CldImage className="img-logo" src="BZabc_logo_top.png" alt="GravityBrain" /></NavLink>
              </div>
              <div className="links text-right">
                <NavLink to={`/login`} className="btn-login"><i></i>{t('login')}</NavLink>
                <NavLink to={`/signup`} className="btn-signup"><i></i>{t('signup')}</NavLink>
                <NavLink to={`/gift`} className="btn-gift"><i className="fa fa-gift"></i>{t('sendGift')}</NavLink>             
              </div>
            </div>
          </div>
          <SplashNavigation t={t} />
        </header>;
    }
}

export default SplashHeader