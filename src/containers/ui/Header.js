import React, {Component} from 'react';
import logo from '../../media/images/logo.png';
import {translate} from 'react-i18next';
import i18n from '../../configs/i18n';
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
import UserMenu from "./UserMenu";
import {connect} from 'react-redux';
import {logout} from '../../redux/auth/actions';
import Messages from "../pushers/Messages";
import Notifications from "../pushers/Notifications";
import Tasks from "../pushers/Tasks";
import {NavLink, withRouter,Redirect} from "react-router-dom";

import {Icon, IconButton} from '@material-ui/core';
import {getCartRecords} from "../../redux/store/actions";
import {
  selectAddToCartRequest, selectCardRedirect, selectCartRecords,
  selectGetCartRecordsRequest
} from "../../redux/store/selectors";
import Settings from "../pushers/Settings";
import TabMenu from "../pushers/TabMenu";
import {selectUserData} from "../../redux/user/selectors";
import {getSchool} from "../../redux/schools/actions";
import {selectSchool} from "../../redux/schools/selectors";
// @translate(['key'], { wait: true })

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      activePusherMenu: null,
      headerPosition: 0,
      headerHeight:window.innerWidth <= 1240 ? 60 : 70
    };
  }

  componentDidMount() {
    const { getSchool, getCartRecords, isLoggedIn} = this.props;
    if (isLoggedIn) {
        getSchool();
        getCartRecords();
    }
    window.addEventListener('scroll',this.setHeaderPosition.bind(this));    
  }

  setHeaderPosition(){
    const { headerHeight } = this.state
    window.scrollY <= headerHeight?
      this.setState({headerPosition:window.scrollY})
      :
      this.setState({headerPosition:headerHeight})
  }

  _openLanguageMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  _switchLanguage = (lang_code) => {
    i18n.changeLanguage('de');
    localStorage.setItem('language', lang_code);
    this.setState({anchorEl: null});
  };

  _switchPushMenus = (menu) => {
    this.setState({activePusherMenu: menu})
  }

  _renderHeader() {
    const {logout, cartRecords,cartAddRedirect, addToCartRequest, cartRecordsRequest, userData, isLoggedIn} = this.props;
    const school = this.props.schoolRequest.get('record').toJS();
    const {headerPosition} = this.state;
    console.log();
    return (
      <header className="m-grid__item  m-header " style={{top:-headerPosition}} ref="header" data-minimize-offset="200" data-minimize-mobile-offset="200">
        <div className="m-container general-header m-container--fluid m-container--full-height">
          <div className="m-stack m-stack--ver m-stack--desktop">
            <div className="m-stack__item m-brand gravity-logo ">
              <div className="m-stack m-stack--ver m-stack--general">
                <div className="m-stack__item m-stack__item--middle m-brand__logo">
                  <NavLink to="/dashboard" className="m-brand__logo-wrapper">
                      <img alt="GravityBrain" style={{"maxWidth": "100%"}} src={logo}/>
                  </NavLink>
                </div>
              </div>
            </div>
            {isLoggedIn &&
            <div className="m-stack__item m-stack__item--fluid m-header-head d-flex" id="m_header_nav">
              <button className="m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark "
                      id="m_aside_header_menu_mobile_close_btn">
                <i className="la la-close"></i>
              </button>

              <div className="d-flex justify-content-center headerSchoolName align-items-center flex-1 hidden-sm">
                <h4 style={{color: '#777'}}>
                  {school.schName}
                </h4>
              </div>

              <div id="m_header_topbar" className="m-topbar  m-stack m-stack--ver m-stack--general">
                <div className="m-stack__item m-topbar__nav-wrapper">
                  <IconButton color='primary' className="m--hide mobile-sidebar-out-toggle" onClick={() => {
                    this.props.mobileSidebar()
                  }}>
                    <Icon>menu</Icon>
                  </IconButton>

                  <ul className="m-topbar__nav m-nav m-nav--inline">

                    <TabMenu activeMenu={this.state.activePusherMenu} switchMenu={this._switchPushMenus}/>
                    <li
                      className="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width">

                      <NavLink to='/store/shopping-cart' className='m-nav__link m-dropdown__toggle pointer' id='m_topbar_notification_icon'>
                        <span className='m-nav__link-icon'>
                          <i className="fa fa-shopping-cart PageHeader-icon"></i>
                          {cartRecords.size > 0 && <span className="g-badge badge-red">{cartRecords.size}</span> }
                        </span>
                      </NavLink>
                    </li>
                    <Settings activeMenu={this.state.activePusherMenu} switchMenu={this._switchPushMenus}/>

                    <UserMenu activeMenu={this.state.activePusherMenu} switchMenu={this._switchPushMenus} logout={logout}/>
                  </ul>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </header>
    )
  }

  render() {
      return this._renderHeader();  
  }
}

Header = connect(
  (state) => ({
    auth: state.auth,
    addToCartRequest: selectAddToCartRequest(state),
    cartRecordsRequest: selectGetCartRecordsRequest(state),
    cartRecords: selectCartRecords(state),
    cartAddRedirect: selectCardRedirect(state),
    userData: selectUserData(state),
    schoolRequest: selectSchool(state),
  }),
  (dispatch) => ({
    logout: () => {
      dispatch(logout())
    },
    getCartRecords: () => {
      dispatch(getCartRecords())
    },
    getSchool: () => { dispatch(getSchool()) },
  })
)(Header);

export default translate("translation")(Header);
