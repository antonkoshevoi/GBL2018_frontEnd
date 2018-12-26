import React, {PureComponent} from 'react';
import {NavLink} from 'react-router-dom';
import LanguageSwitcher from "../../../components/ui/LanguageSwitcher";

class SplashNavigation extends PureComponent {

  burgerToggle () {
    let linksEl = document.querySelector('.narrow-links');
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
    }
    else {
      linksEl.style.display = 'block';
    }
  }

  render() {
    const {t} = this.props;

    return (
      <nav>
        <div className="splash-navigation nav-wide">
          <div className="container text-center clearfix wide-div">
            <NavLink to={`/parents`} className="btn no-border m-btn btn-sm students-parents">{t('parentsStudents')}</NavLink>
            <NavLink to={`/schools`} className="btn no-border m-btn btn-sm schools-teachers">{t('schoolsTeachers')}</NavLink>
            
            <div className="splash-navigation-tools">
              <LanguageSwitcher/>
            </div>
          </div>
        </div>
        <div className="splash-navigation nav-narrow">
          <div className="nav-narrow-collapse-container">
            <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
            <div className="links text-right">
              <NavLink to={`/login`} className="btn m-btn btn-sm ">{t('login')}</NavLink>
              <NavLink to={`/signup`} className="btn m-btn btn-sm signup">{t('signUp')}</NavLink>
              <NavLink to={`/gift`} className="btn m-btn btn-sm signup">{t('sendGift')}</NavLink>
            </div>
          </div>
          <div className="splash-navigation-tools">
            <LanguageSwitcher/>
          </div>

          <div className="container text-center clearfix narrow-links">
            <NavLink to={`/about`} className="btn no-border m-btn btn-sm ">{t('about')}</NavLink>
            <NavLink to={`/store`} className="btn no-border m-btn btn-sm ">{t('store')}</NavLink>
            <NavLink to={`/parents`} className="btn no-border m-btn btn-sm ">{t('parentsStudents')}</NavLink>
            <NavLink to={`/schools`} className="btn no-border m-btn btn-sm ">{t('schoolsTeachers')}</NavLink>
            <NavLink to={`//pubtool.gravitybrain.com/`} className="btn no-border m-btn btn-sm ">{t('publishers')}</NavLink>           
          </div>
        </div>
      </nav>
    )
  }
}

export default SplashNavigation