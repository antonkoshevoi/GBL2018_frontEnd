import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import LanguageSwitcher from "../../../components/ui/LanguageSwitcher";

class SplashNavigation extends Component {
  render() {
    const {t} = this.props;

    return (
      <div className="splash-navigation  m--hidden-mobile">
        <div className="container text-center clearfix">
          <NavLink to={`/login`} className="btn no-border m-btn btn-sm ">{t('about')}</NavLink>
          <NavLink to={`/login`} className="btn no-border m-btn btn-sm ">{t('store')}</NavLink>
          <NavLink to={`/login`} className="btn no-border m-btn btn-sm ">{t('studentAndParents.title')}</NavLink>
          <NavLink to={`/login`} className="btn no-border m-btn btn-sm ">{t('schoolAndTeacher.title')}</NavLink>
          <NavLink to={`/login`} className="btn no-border m-btn btn-sm ">{t('publishers.title')}</NavLink>
          <div className="splash-navigation-tools">
            <LanguageSwitcher/>
          </div>
        </div>

      </div>
    )
  }
}

export default SplashNavigation