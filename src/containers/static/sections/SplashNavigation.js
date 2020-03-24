import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "../../../components/ui/LanguageSwitcher";

class SplashNavigation extends PureComponent {

  render() {
    const { t } = this.props;

    return (
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
        <div className="splash-navigation nav-narrow">
          <div className="nav-narrow-collapse-container">
            <div className="links text-right d-flex align-items-center">
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
        </div>
      </nav>
    );
  }
}

export default SplashNavigation;
