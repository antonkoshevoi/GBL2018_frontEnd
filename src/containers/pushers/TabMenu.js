import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import posterImage from "../../media/images/menu_poster.jpg"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Messages from "./Messages";
import Notifications from "./Notifications";
import Tasks from "./Tasks";

class TabMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuOpened:false,
            activePusherMenu:null,
            tabIndex: 0
        };


    }


    render() {
        const {activeMenu} = this.props
        return (
            <li className="m-nav__item m-topbar__Tasks m-topbar__Tasks--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width" data-dropdown-toggle="click" data-dropdown-persistent="true">
                <a  className="m-nav__link m-dropdown__toggle pointer" id="m_topbar_notification_icon" onClick={() => {this.props.switchMenu('tasks')}}>
                    <span className="m-nav__link-icon">
													<i className="fa fa-bell-o"></i>
												</span>
                </a>
                {activeMenu == 'tasks' &&
                <div className="m-dropdown__wrapper" onMouseLeave={() => {this.props.switchMenu(null)}} style={{display: 'block'}}>
                    <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style={{right:'89.5px', color:'white'}}></span>
                    <span className="m-dropdown__arrow m-dropdown__arrow--center"></span>
                    <div className="m-dropdown__inner">

                        <div className="m-dropdown__body">
                            <div className="m-dropdown__content">
                                <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                    <TabList className="g-tab-list fill-tabs">
                                        <Tab>	<i className="fa fa fa-exclamation-triangle"></i></Tab>
                                        <Tab>	<i className="fa fa-envelope"></i></Tab>
                                        <Tab>	<i className="fa fa-bullhorn"></i></Tab>
                                    </TabList>
                                    <TabPanel>
                                       <Tasks/>
                                    </TabPanel>
                                    <TabPanel>
                                        <Messages/>
                                    </TabPanel>
                                    <TabPanel>
                                        <Notifications/>
                                    </TabPanel>
                                </Tabs>
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

export default translate("TabMenu")
(connect(
    mapStateToProps,
)(TabMenu));

