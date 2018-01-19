import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import posterImage from "../../media/images/menu_poster.jpg"


class Notifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpened:false
        };

    }

    _openMenu = event => {
        this.setState({ menuOpened: !this.state.menuOpened });
    };

    _closeMenu = event => {
        this.setState({ menuOpened: false });
    };

    render() {
        return (
            <li className="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width" data-dropdown-toggle="click" data-dropdown-persistent="true">
                <a  className="m-nav__link m-dropdown__toggle pointer" id="m_topbar_notification_icon" onClick={this._openMenu}>
                    <span className="m-nav__link-icon">
													<i className="fa fa-bullhorn"></i>
												</span>
                </a>
                {this.state.menuOpened &&
                <div className="m-dropdown__wrapper" onMouseLeave={this._closeMenu} style={{display: 'block'}}>
                    <span className="m-dropdown__arrow m-dropdown__arrow--center"></span>
                    <div className="m-dropdown__inner">
                        <div className="m-dropdown__header m--align-center"
                             style={{backgroundImage: `url(${posterImage})`}}>
														<span className="m-dropdown__header-title">
															9 New
														</span>
                            <span className="m-dropdown__header-subtitle">
															Notifications
														</span>
                        </div>
                        <div className="m-dropdown__body">
                            <div className="m-dropdown__content">

                                <div className="tab-content">
                                    <div className="tab-pane active show">
                                        <div className="m-list-timeline">
                                            <div className="m-list-timeline__items">
                                                <div className="m-list-timeline__item">
                                                    <span className="m-list-timeline__badge m-list-timeline__badge--success"></span>
                                                    <span className="m-list-timeline__icon flaticon-user"></span>
                                                    <span className="m-list-timeline__text">12 new users registered and pending for activation</span>
                                                    <span className="m-list-timeline__time">Just now</span>
                                                </div>
                                                <div className="m-list-timeline__item">
                                                    <span className="m-list-timeline__badge m-list-timeline__badge--danger"></span>
                                                    <span className="m-list-timeline__icon flaticon-interface-7"></span>
                                                    <span className="m-list-timeline__text">Scheduled system reboot completed <span className="m-badge m-badge--success m-badge--wide">completed</span></span>
                                                    <span className="m-list-timeline__time">14 mins</span>
                                                </div>
                                                <div className="m-list-timeline__item">
                                                    <span className="m-list-timeline__badge m-list-timeline__badge--warning"></span>
                                                    <span className="m-list-timeline__icon flaticon-placeholder"></span>
                                                    <span className="m-list-timeline__text">New order has been planced and pending for processing</span>
                                                    <span className="m-list-timeline__time">20 mins</span>
                                                </div>
                                                <div className="m-list-timeline__item">
                                                    <span className="m-list-timeline__badge m-list-timeline__badge--primary"></span>
                                                    <span className="m-list-timeline__icon flaticon-share"></span>
                                                    <span className="m-list-timeline__text">Database server overloaded 80% and requires quick reboot <span className="m-badge m-badge--info m-badge--wide">settled</span></span>
                                                    <span className="m-list-timeline__time">1 hr</span>
                                                </div>
                                                <div className="m-list-timeline__item">
                                                    <span className="m-list-timeline__badge m-list-timeline__badge--brand"></span>
                                                    <span className="m-list-timeline__icon flaticon-exclamation-1"></span>
                                                    <span className="m-list-timeline__text">System error occured and hard drive has been shutdown - <a href="#" className="m-link">Check</a></span>
                                                    <span className="m-list-timeline__time">2 hrs</span>
                                                </div>
                                                <div className="m-list-timeline__item">
                                                    <span className="m-list-timeline__badge m-list-timeline__badge--success"></span>
                                                    <span className="m-list-timeline__icon flaticon-cogwheel-2"></span>
                                                    <span className="m-list-timeline__text">Production server is rebooting...</span>
                                                    <span className="m-list-timeline__time">3 hrs</span>
                                                </div>
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

export default translate("Notifications")
(connect(
    mapStateToProps,
)(Notifications));

