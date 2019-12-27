import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {logout} from '../../redux/auth/actions';
import {Icon, IconButton} from '@material-ui/core';
import {selectGetUserRequest, selectUserData} from "../../redux/user/selectors";
import UserMenu from "./UserMenu";
import Messages from "./Messages";
import ShoppingCart from "./ShoppingCart";
import HasRole from "../middlewares/HasRole";
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
import Logo from "./Logo";

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
    const {logout, hideMenu, hideSidebar, userRequest, auth} = this.props;    
    const {headerPosition} = this.state;
    const user = this.props.user.toJS();
    const isLoggedIn = auth.get('isLoggedIn') && userRequest.get('success');
    return (
      <header className="m-header " style={{top:-headerPosition}} data-minimize-offset="200" data-minimize-mobile-offset="200">
        <div className="m-container general-header m-container--fluid m-container--full-height">
          <div className="m-stack m-stack--ver m-stack--desktop">
            <div className={`m-stack__item m-brand gravity-logo ${hideMenu ? 'logo-only' : ''}`}>
              <div className="m-stack m-stack--ver m-stack--general">
                <Logo isLoggedIn={auth.get('isLoggedIn')} className="m-stack__item m-stack__item--middle m-brand__logo text-center" />
              </div>
            </div>
            {(!hideMenu) &&
            <div className="m-stack__item m-stack__item--fluid m-header-head d-flex" id="m_header_nav">
              <div className="d-none d-lg-flex justify-content-center align-items-center flex-1">
                {isLoggedIn && <h4 className="g-metal"> {user.school ? user.school.schName : ''} </h4>}
              </div>              
              <div id="m_header_topbar" className="m-topbar  m-stack m-stack--ver m-stack--general">
                <div className="m-stack__item m-topbar__nav-wrapper">
                  {!hideSidebar &&
                  <IconButton color='primary' className="m--hide mobile-sidebar-out-toggle mt-2" onClick={() => { this.props.mobileSidebar() }}>
                    <Icon fontSize="large">menu</Icon>
                  </IconButton>}

                  <ul className="m-topbar__nav m-nav m-nav--inline">
                    {isLoggedIn && <Messages activeMenu={this.state.activePusherMenu} switchMenu={this._switchPushMenus}/>}
                    <HasRole roles={['Superadministrator','School','Teacher','Parents']}>
                        <ShoppingCart />
                    </HasRole>
                    {!isLoggedIn && <ShoppingCart />}
                    <li className="m-nav__item m-topbar__notifications m-topbar__notifications--img">
                        <LanguageSwitcher className="m-nav__link"/>
                    </li>
                    {isLoggedIn ? 
                        <UserMenu activeMenu={this.state.activePusherMenu} switchMenu={this._switchPushMenus} logout={logout}/> 
                        : 
                        <li className="m-nav__item m-topbar__notifications m-topbar__notifications--img border-0">
                            <a href='/login' className='m-nav__link pointer' id='m_topbar_notification_icon'>
                                <span className='m-nav__link-icon'>
                                    <i className="fa fa-sign-in"></i>
                                </span>
                            </a>                   
                        </li>                                
                    }
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

export default withTranslation("translation")(connect(
  (state) => ({
    auth: state.auth,          
    user: selectUserData(state),
    userRequest: selectGetUserRequest(state)
  }),
  (dispatch) => ({
    logout: () => { dispatch(logout()) }
  })
)(Header));
