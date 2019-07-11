import React, {PureComponent} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
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
    const {t, location} = this.props;

    const page = location.pathname.replace('/', '') || 'parents';       
    
    return (
      <nav>
        <div className="splash-navigation nav-wide">
          <div className="container text-center clearfix wide-div">
            <NavLink to={`/parents`} className={`btn no-border btn-sm students-parents ${(page === 'parents') ? 'active' : ''}`}>{t('parentsStudents')}</NavLink>
            <NavLink to={`/schools`} className={`btn no-border btn-sm schools-teachers ${(page === 'schools') ? 'active' : ''}`}>{t('schoolsTeachers')}</NavLink>            
            <div className="splash-navigation-tools">
              <LanguageSwitcher/>
            </div>
          </div>
        </div>
        <div className="splash-navigation nav-narrow">
          <div className="nav-narrow-collapse-container">
            <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
            <div className="links text-right">
              <NavLink to={`/login`} className="btn btn-sm ">{t('login')}</NavLink>
              <NavLink to={`/signup`} className="btn btn-sm signup">{t('signup')}</NavLink>
              <NavLink to={`/gift`} className="btn btn-sm signup">{t('sendGift')}</NavLink>
            </div>
          </div>

          <div className="container text-center clearfix narrow-links">
            <NavLink to={`/about`} className="btn no-border btn-sm ">{t('about')}</NavLink>
            <NavLink to={`/store`} className="btn no-border btn-sm ">{t('store')}</NavLink>
            <NavLink to={`/parents`} className="btn no-border btn-sm ">{t('parentsStudents')}</NavLink>
            <NavLink to={`/schools`} className="btn no-border btn-sm ">{t('schoolsTeachers')}</NavLink>            
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(SplashNavigation);