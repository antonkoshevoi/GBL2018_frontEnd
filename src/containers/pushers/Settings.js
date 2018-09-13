import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
import {NavLink} from "react-router-dom";
import AppDownloadDrawer from "../../components/ui/AppDownloadDrawer";

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpened:false
        };

    }



    render() {
        const {activeMenu} = this.props

        return (
            <li className="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width" data-dropdown-toggle="click" data-dropdown-persistent="true">
                <a  className="m-nav__link m-dropdown__toggle pointer" id="m_topbar_notification_icon" onClick={() => {this.props.switchMenu('notifications')}}>
                    <span className="m-nav__link-icon">
													<i className="fa fa-cog"></i>
												</span>
                </a>
                {activeMenu == 'notifications'  &&
                <div className="m-dropdown__wrapper wrapper-right" onMouseLeave={() => {this.props.switchMenu(null)}} style={{display: 'block', width:'240px',marginLeft:'-128px'}}>
                    <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style={{right:'12.5px', color:'white'}}></span>
                    <div className="m-dropdown__inner">
                        <div className="m-dropdown__body">
                            <div className="m-dropdown__content">

                                <div className="tab-content">
                                    <div className="tab-pane active show">
                                        <div className="settingsMenuBlock">
                                            <div>
                                                <NavLink to="/reports">
                                                    <i className="fa fa-line-chart"></i>
                                                </NavLink>
                                            </div>
                                            <div>
                                                <NavLink to="/">
                                                    <i className="fa fa-calendar"></i>
                                                </NavLink>
                                            </div>
                                            <div>
                                                    <AppDownloadDrawer/>
                                            </div>
                                            <div>
                                                <LanguageSwitcher/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </li>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default translate("Settings")(connect(mapStateToProps)(Settings));

