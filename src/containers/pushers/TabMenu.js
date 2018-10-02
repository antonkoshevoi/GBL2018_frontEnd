import React, {Component} from 'react';
import {translate} from 'react-i18next';
import Messages from "./Messages";
import {Typography} from '@material-ui/core';

class TabMenu extends Component {

    render() {
        const {activeMenu, t} = this.props
        return (
            <li className="m-nav__item m-topbar__Tasks m-topbar__Tasks--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width" data-dropdown-toggle="click" data-dropdown-persistent="true">
                <a  className="m-nav__link m-dropdown__toggle pointer" id="m_topbar_notification_icon" onClick={() => {this.props.switchMenu('messages')}}>
                    <span className="m-nav__link-icon">
                        <i className="fa fa-envelope"></i>
                    </span>
                </a>
                {activeMenu == 'messages' && 
                <div className="m-dropdown__wrapper" onMouseLeave={() => {this.props.switchMenu(null)}} style={{display: 'block'}}>
                    <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style={{right:'89.5px', color:'white'}}></span>
                    <span className="m-dropdown__arrow m-dropdown__arrow--center"></span>
                    <div className="m-dropdown__inner">
                        <div className="m-dropdown__body">
                            <div className="m-dropdown__content">                                            
                                <Typography variant="subheading" style={{color: '#999'}}>
                                    <i className="fa fa-envelope"></i> {t('messages')}
                                </Typography>                                                               
                                <Messages/>                                                                   
                            </div>
                        </div>
                    </div>
                </div>}                
            </li>
        );
    }
}

export default translate("translations")(TabMenu);

