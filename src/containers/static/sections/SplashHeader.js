import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';
import CldImage from '../../../components/ui/CldImage';
import LanguageSwitcher from "../../../components/ui/LanguageSwitcher";

class SplashHeader extends PureComponent {
    render() {
        const {t} = this.props;        

        return <header className="splash-header" id="splash-header">        
          <div className="d-flex justify-content-between py-2 mx-3 mx-md-4 mx-lg-5 px-xl-5">
            <div className="logo py-sm-1">
              <NavLink to={`/`}><CldImage className="img-logo" src="BZabc_logo_top.png" alt="GravityBrain" /></NavLink>
            </div>
            <div className="links d-none d-md-flex justify-content-end align-items-center text-right">
              <NavLink to={`/login`} className="btn-login"><i></i>{t('login')}</NavLink>
              <NavLink to={`/signup`} className="btn-signup"><i></i>{t('signup')}</NavLink>
              <NavLink to={`/gift`} className="btn-gift"><i className="fa fa-gift"></i>{t('sendGift')}</NavLink>             
            </div>
            <div className="links-mobile d-flex d-md-none align-items-center justify-content-end">                              
              <NavLink to={`/login`} className="btn btn-sm ">
                {t("login")}
              </NavLink>
              <NavLink to={`/signup`} className="btn btn-sm signup">
                {t("signup")}
              </NavLink>
              <NavLink to={`/gift`} className="btn btn-sm signup">
                {t("sendGift")}
              </NavLink>
              <div className="splash-navigation-tools d-md-none float-right">
                <LanguageSwitcher/>
              </div>
            </div>            
          </div>          
          <nav>
            <div className="splash-navigation d-none d-md-block">
              <div className="d-flex align-items-center justify-content-end mx-3 mx-md-4 mx-lg-5 px-xl-5">
                <a href="tel:13068706488">1-306-570-6488</a>
                <a href="mailto:office@bzabc.tv">office@bzabc.tv</a>
                <div className="splash-navigation-tools">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </nav>
        </header>;
    }
}

export default SplashHeader