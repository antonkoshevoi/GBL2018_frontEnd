import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import posterImage from "../../media/images/menu_poster.jpg"


class Tasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpened:false,
            activePusherMenu:null
        };


    }


    render() {
        const {activeMenu} = this.props
        return (
            <li className="m-nav__item m-topbar__Tasks m-topbar__Tasks--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width" data-dropdown-toggle="click" data-dropdown-persistent="true">
                <a  className="m-nav__link m-dropdown__toggle pointer" id="m_topbar_notification_icon" onClick={() => {this.props.switchMenu('tasks')}}>
                    <span className="m-nav__link-icon">
													<i className="fa fa-exclamation-triangle"></i>
												</span>
                </a>
                {activeMenu == 'tasks' &&
                <div className="m-dropdown__wrapper" onMouseLeave={() => {this.props.switchMenu(null)}} style={{display: 'block'}}>
                    <span className="m-dropdown__arrow m-dropdown__arrow--center"></span>
                    <div className="m-dropdown__inner">
                        <div className="m-dropdown__header m--align-center"
                             style={{backgroundImage: `url(${posterImage})`}}>
														<span className="m-dropdown__header-title">
															9 New
														</span>
                            <span className="m-dropdown__header-subtitle">
															Tasks
														</span>
                        </div>
                        <div className="m-dropdown__body">
                            <div className="m-dropdown__content">

                                <div className="tab-content">
                                    <div className="tab-pane active show">
                                        <div className="m-widget1 m-widget1--paddingless">
                                            <div className="m-widget1__item">
                                                <div className="row m-row--no-padding align-items-center">
                                                  <div className="task-info">
                                                      <span>Generating Sales Report</span>
                                                      <span className="pull-right">50%</span>
                                                  </div>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-info" role="progressbar" style={{width: '50%'}}></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="m-widget1__item">
                                                <div className="row m-row--no-padding align-items-center">
                                                    <div className="task-info">
                                                        <span>Importing Contacts</span>
                                                        <span className="pull-right">40%</span>
                                                    </div>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-info" role="progressbar" style={{width: '40%'}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="m-widget1__item">
                                                <div className="row m-row--no-padding align-items-center">
                                                    <div className="task-info">
                                                        <span>Importing Contacts</span>
                                                        <span className="pull-right">85%</span>
                                                    </div>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-info" role="progressbar" style={{width: '85%'}}></div>
                                                    </div>
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

export default translate("Tasks")
(connect(
    mapStateToProps,
)(Tasks));

