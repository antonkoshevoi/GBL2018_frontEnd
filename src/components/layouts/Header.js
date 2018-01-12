import React, {Component} from 'react';
import logo from '../../media/images/logo.png';
import trans, {changeLanguage} from '../../languages';
import {  translate } from 'react-i18next';
import i18n from '../../languages/i18n';
import LanguageSwitcher from "../ui/LanguageSwitcher";
import UserMenu from "../ui/UserMenu";
import * as AUTH from "../../services/AuthService"
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
        return AUTH.isLodegIn() ? (
            <header className="m-grid__item    m-header "  data-minimize-offset="200" data-minimize-mobile-offset="200" >
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
                                        <li className="
	m-nav__item m-dropdown m-dropdown--large m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width m-dropdown--skin-light	m-list-search m-list-search--skin-light"
                                            data-dropdown-toggle="click" data-dropdown-persistent="true" id="m_quicksearch" data-search-type="dropdown">
                                            <a  className="m-nav__link m-dropdown__toggle">
												<span className="m-nav__link-icon">
													<i className="flaticon-search-1"></i>
												</span>
                                            </a>
                                            <div className="m-dropdown__wrapper">
                                                <span className="m-dropdown__arrow m-dropdown__arrow--center"></span>
                                                <div className="m-dropdown__inner ">
                                                    <div className="m-dropdown__header">
                                                        <form  className="m-list-search__form">
                                                            <div className="m-list-search__form-wrapper">
																<span className="m-list-search__form-input-wrapper">
																	<input id="m_quicksearch_input" autoComplete="off" type="text" name="q" className="m-list-search__form-input" value="" placeholder="Search..."/>
																</span>
                                                                <span className="m-list-search__form-icon-close" id="m_quicksearch_close">
																	<i className="la la-remove"></i>
																</span>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="m-dropdown__body">
                                                        <div className="m-dropdown__scrollable m-scrollable" data-scrollable="true" data-max-height="300" data-mobile-max-height="200">
                                                            <div className="m-dropdown__content"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
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
                                        <li className="m-nav__item m-topbar__quick-actions m-topbar__quick-actions--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push m-dropdown--mobile-full-width m-dropdown--skin-light"  data-dropdown-toggle="click">
                                            <a  className="m-nav__link m-dropdown__toggle">
                                                <span className="m-nav__link-badge m-badge m-badge--dot m-badge--info m--hide"></span>
                                                <span className="m-nav__link-icon">
													<i className="flaticon-share"></i>
												</span>
                                            </a>
                                            <div className="m-dropdown__wrapper">
                                                <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
                                                <div className="m-dropdown__inner">
                                                    <div className="m-dropdown__header m--align-center" style={{background: "url(assets/app/media/img/misc/quick_actions_bg.jpg); background-size: cover"}}>
														<span className="m-dropdown__header-title">
															Quick Actions
														</span>
                                                        <span className="m-dropdown__header-subtitle">
															Shortcuts
														</span>
                                                    </div>
                                                    <div className="m-dropdown__body m-dropdown__body--paddingless">
                                                        <div className="m-dropdown__content">
                                                            <div className="m-scrollable" data-scrollable="false" data-max-height="380" data-mobile-max-height="200">
                                                                <div className="m-nav-grid m-nav-grid--skin-light">
                                                                    <div className="m-nav-grid__row">
                                                                        <a  className="m-nav-grid__item">
                                                                            <i className="m-nav-grid__icon flaticon-file"></i>
                                                                            <span className="m-nav-grid__text">
																				Generate Report
																			</span>
                                                                        </a>
                                                                        <a  className="m-nav-grid__item">
                                                                            <i className="m-nav-grid__icon flaticon-time"></i>
                                                                            <span className="m-nav-grid__text">
																				Add New Event
																			</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="m-nav-grid__row">
                                                                        <a  className="m-nav-grid__item">
                                                                            <i className="m-nav-grid__icon flaticon-folder"></i>
                                                                            <span className="m-nav-grid__text">
																				Create New Task
																			</span>
                                                                        </a>
                                                                        <a  className="m-nav-grid__item">
                                                                            <i className="m-nav-grid__icon flaticon-clipboard"></i>
                                                                            <span className="m-nav-grid__text">
																				Completed Tasks
																			</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <UserMenu/>

                                        <LanguageSwitcher/>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        ) : ''
    }

    render() {
        return (
            this._renderHeader()
        );
    }
}



export default translate("translation")(Header);
