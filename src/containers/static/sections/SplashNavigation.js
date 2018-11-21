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
            <NavLink to={`/about`} className="btn no-border m-btn btn-sm ">{t('about')}</NavLink>
            <NavLink to={`/store`} className="btn no-border m-btn btn-sm ">{t('store')}</NavLink>
            <NavLink to={`/parents`} className="btn no-border m-btn btn-sm ">{t('studentAndParents.title')}</NavLink>
            <NavLink to={`/schools`} className="btn no-border m-btn btn-sm ">{t('schoolAndTeacher.title')}</NavLink>
            <a href="https://pubtool.gravitybrain.com" className="btn no-border m-btn btn-sm ">{t('publishers.title')}</a>
            <div className="splash-navigation-tools">
              <LanguageSwitcher/>
            </div>
          </div>
        </div>
        <div className="splash-navigation nav-narrow">
          <div className="nav-narrow-collapse-container">
            <i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
            <div className="links text-right">
              <NavLink to={`/login`} className="btn no-border m-btn btn-sm ">Login</NavLink>
              <NavLink to={`/signup`} className="btn btn-bordered m-btn btn-sm signup">Sign up</NavLink>
            </div>
          </div>
          <div className="splash-navigation-tools">
            <LanguageSwitcher/>
          </div>

          <div className="container text-center clearfix narrow-links">
            <NavLink to={`/about`} className="btn no-border m-btn btn-sm ">{t('about')}</NavLink>
            <NavLink to={`/store`} className="btn no-border m-btn btn-sm ">{t('store')}</NavLink>
            <NavLink to={`/parents`} className="btn no-border m-btn btn-sm ">{t('studentAndParents.title')}</NavLink>
            <NavLink to={`/schools`} className="btn no-border m-btn btn-sm ">{t('schoolAndTeacher.title')}</NavLink>
            <NavLink to={`//pubtool.gravitybrain.com/`} className="btn no-border m-btn btn-sm ">{t('publishers.title')}</NavLink>           
          </div>
        </div>
      </nav>
    )
  }
}

export default SplashNavigation