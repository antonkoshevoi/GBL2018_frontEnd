import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import {logout} from '../../redux/auth/actions';
import {NavLink} from "react-router-dom";
import {Icon, IconButton} from '@material-ui/core';
import {selectGetUserRequest, selectUserData} from "../../redux/user/selectors";
import UserMenu from "./UserMenu";
import Messages from "./Messages";
import ShoppingCart from "./ShoppingCart";
import HasRole from "../middlewares/HasRole";
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";

const logoUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/gravitybrain-logo.svg';

class Header extends Component {

  isActive = false;

  constructor(props) {
    super(props);
    this.state = {     
      activePusherMenu: null,
      headerPosition: 0,
      headerHeight:window.innerWidth <= 1240 ? 60 : 70
    };
  }

  componentDidMount() {
    this.isActive = true;    
    window.addEventListener('scroll', this.setHeaderPosition.bind(this));    
  }
  
  componentWillUnmount() {
    this.isActive = false;
    window.removeEventListener('scroll', this.setHeaderPosition.bind(this));
  }  

  setHeaderPosition(){
    if (this.isActive) {
        let position = this.state.headerHeight;
        if (window.scrollY <= position) {
            position = window.scrollY;
        }
        this.setState({headerPosition: position});
    }
  }

  _switchPushMenus = (menu) => {
    this.setState({activePusherMenu: menu});
  }

  render() {
    const {logout, hideMenu, userRequest, auth} = this.props;    
    const {headerPosition} = this.state;
    const user = this.props.user.toJS();
    
    return (
      <header className="m-grid__item  m-header " style={{top:-headerPosition}} ref="header" data-minimize-offset="200" data-minimize-mobile-offset="200">
        <div className="m-container general-header m-container--fluid m-container--full-height">
          <div className="m-stack m-stack--ver m-stack--desktop">
            <div className="m-stack__item m-brand gravity-logo ">
              <div className="m-stack m-stack--ver m-stack--general">
                <div className="m-stack__item m-stack__item--middle m-brand__logo text-center">
                  <NavLink to="/dashboard" className="m-brand__logo-wrapper m--margin-left-5">
                      <img alt="GravityBrain" style={{width: (hideMenu ? '300px' : '220px'), height: 'auto'}} src={logoUrl}/>
                  </NavLink>
                </div>
              </div>
            </div>
            {(auth.get('isLoggedIn') && !hideMenu) &&
            <div className="m-stack__item m-stack__item--fluid m-header-head d-flex" id="m_header_nav">
              <button className="m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark" id="m_aside_header_menu_mobile_close_btn">
                <i className="la la-close"></i>
              </button>

              <div className="d-flex justify-content-center headerSchoolName align-items-center flex-1 hidden-sm">
                {userRequest.get('success') && <h4 style={{color: '#777'}}> {user.school ? user.school.schName : ''} </h4>}
              </div>

              <div id="m_header_topbar" className="m-topbar  m-stack m-stack--ver m-stack--general">
                <div className="m-stack__item m-topbar__nav-wrapper">
                  <IconButton color='primary' className="m--hide mobile-sidebar-out-toggle" onClick={() => { this.props.mobileSidebar() }}>
                    <Icon>menu</Icon>
                  </IconButton>

                  <ul className="m-topbar__nav m-nav m-nav--inline">
                    <Messages activeMenu={this.state.activePusherMenu} switchMenu={this._switchPushMenus}/>
                    <HasRole roles={['Superadministrator','Superintendent','Principal','Administrator','Teacher','Parents']}>
                        <ShoppingCart />
                    </HasRole>
                    <li style={{paddingTop: '8px'}} className="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width">
                        <LanguageSwitcher className="m-nav__link"/>
                    </li>
                    <UserMenu activeMenu={this.state.activePusherMenu} switchMenu={this._switchPushMenus} logout={logout}/>
                  </ul>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </header>
    );
  }
}

Header = connect(
  (state) => ({
    auth: state.auth,          
    user: selectUserData(state),
    userRequest: selectGetUserRequest(state)
  }),
  (dispatch) => ({
    logout: () => { dispatch(logout()) }
  })
)(Header);

export default translate("translation")(Header);
