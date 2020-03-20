import React, { PureComponent } from "react";
import { withRouter, NavLink } from "react-router-dom";
import LanguageSwitcher from "../../../components/ui/LanguageSwitcher";

class SplashNavigation extends PureComponent {
  burgerToggle() {
    let linksEl = document.querySelector(".narrow-links");
    if (linksEl.style.display === "block") {
      linksEl.style.display = "none";
    } else {
      linksEl.style.display = "block";
    }
  }

  render() {
    const { t, location } = this.props;

    const page = location.pathname.replace("/", "") || "parents";

    return (
      <nav>
        <div className="splash-navigation nav-wide">
          <div className="container text-right clearfix wide-div">
            <a href="tel:13068706488">1-306-570-6488</a>
            <a href="mailto:office@bzabc.tv">office@bzabc.tv</a>
            {/* <NavLink to={`/parents`} className={`btn radius-0 btn-sm students-parents ${(page === 'parents') ? 'active' : ''}`}>{t('parentsStudents')}</NavLink>
            <NavLink to={`/schools`} className={`btn radius-0 btn-sm schools-teachers ${(page === 'schools') ? 'active' : ''}`}>{t('schoolsTeachers')}</NavLink>             */}
            <div className="splash-navigation-tools">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <div className="splash-navigation nav-narrow">
          <div className="nav-narrow-collapse-container">
            <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
            <div className="links text-right">
              <NavLink to={`/login`} className="btn btn-sm ">
                {t("login")}
              </NavLink>
              <NavLink to={`/signup`} className="btn btn-sm signup">
                {t("signup")}
              </NavLink>
              <NavLink to={`/gift`} className="btn btn-sm signup">
                {t("sendGift")}
              </NavLink>
            </div>
          </div>

          <div className="container text-center clearfix narrow-links">
            <NavLink to={`/about`} className="btn radius-0 btn-sm ">
              {t("about")}
            </NavLink>
            <NavLink to={`/store`} className="btn radius-0 btn-sm ">
              {t("store")}
            </NavLink>
            <NavLink to={`/parents`} className="btn radius-0 btn-sm ">
              {t("parentsStudents")}
            </NavLink>
            <NavLink to={`/schools`} className="btn radius-0 btn-sm ">
              {t("schoolsTeachers")}
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(SplashNavigation);
