import React, {Component} from 'react';
import logo from '../../media/images/logo.png';
import trans, {changeLanguage} from '../../languages/index';
import {  translate } from 'react-i18next';
import i18n from '../../languages/i18n';
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
import UserMenu from "../../components/ui/UserMenu";
import * as AUTH from "../../services/AuthService"
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/actions';
// @translate(['key'], { wait: true })

class Header extends Component {

  state = {
    anchorEl: null,
  };

  _openLanguageMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  _switchLanguage = (lang_code) => {
    trans.setLanguage(lang_code);
    i18n.changeLanguage('de');
    changeLanguage(lang_code)
    localStorage.setItem('language', lang_code);
    this.setState({ anchorEl: null });
  };


  _renderHeader() {
    const { logout } = this.props;

    return  (
      <header className="m-grid__item  m-header "  data-minimize-offset="200" data-minimize-mobile-offset="200" >
        <div className="m-container m-container--fluid m-container--full-height">
          <div className="m-stack m-stack--ver m-stack--desktop">
            <div className="m-stack__item m-brand  ">
              <div className="m-stack m-stack--ver m-stack--general">
                <div className="m-stack__item m-stack__item--middle m-brand__logo">
                  <a  className="m-brand__logo-wrapper">
                    <img alt="GravityBrain" style={{"maxWidth":"100%"}} src={logo}/>
                  </a>
                </div>

              </div>
            </div>
            <div className="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
              <button className="m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark " id="m_aside_header_menu_mobile_close_btn">
                <i className="la la-close"></i>
              </button>

              <div id="m_header_topbar" className="m-topbar  m-stack m-stack--ver m-stack--general">
                <div className="m-stack__item m-topbar__nav-wrapper">
                  <ul className="m-topbar__nav m-nav m-nav--inline">

                    <li className="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width" data-dropdown-toggle="click" data-dropdown-persistent="true">
                      <a  className="m-nav__link m-dropdown__toggle" id="m_topbar_notification_icon">
                        <span className="m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger"></span>
                        <span className="m-nav__link-icon">
													<i className="flaticon-music-2"></i>
												</span>
                      </a>
                      <div className="m-dropdown__wrapper">
                        <span className="m-dropdown__arrow m-dropdown__arrow--center"></span>
                        <div className="m-dropdown__inner">
                          <div className="m-dropdown__header m--align-center" style={{background: "url(assets/app/media/img/misc/notification_bg.jpg); background-size: cover"}}>
														<span className="m-dropdown__header-title">
															9 New
														</span>
                            <span className="m-dropdown__header-subtitle">
															User Notifications
														</span>
                          </div>
                          <div className="m-dropdown__body">
                            <div className="m-dropdown__content">
                              <ul className="nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand" role="tablist">
                                <li className="nav-item m-tabs__item">
                                  <a className="nav-link m-tabs__link active" data-toggle="tab" href="#topbar_notifications_notifications" role="tab">
                                    Alerts
                                  </a>
                                </li>
                                <li className="nav-item m-tabs__item">
                                  <a className="nav-link m-tabs__link" data-toggle="tab" href="#topbar_notifications_events" role="tab">
                                    Events
                                  </a>
                                </li>
                                <li className="nav-item m-tabs__item">
                                  <a className="nav-link m-tabs__link" data-toggle="tab" href="#topbar_notifications_logs" role="tab">
                                    Logs
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <UserMenu logout={logout}/>

                    <LanguageSwitcher/>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  render() {
    return (
      this._renderHeader()
    );
  }
}

Header = connect(
  (state) => ({}),
  (dispatch) => ({
    logout: () => { dispatch(logout()) }
  })
)(Header);

export default translate("translation")(Header);
