import React, {Component} from 'react';
import logo from '../../media/images/logo.png';
import {  translate } from 'react-i18next';
import i18n from '../../configs/i18n';
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
import UserMenu from "./UserMenu";
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/actions';
import Messages from "../pushers/Messages";
import Notifications from "../pushers/Notifications";
import Tasks from "../pushers/Tasks";
import {Icon, IconButton} from "material-ui";
// @translate(['key'], { wait: true })

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            activePusherMenu: null,
        };
    }


    _openLanguageMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  _switchLanguage = (lang_code) => {
    i18n.changeLanguage('de');
    localStorage.setItem('language', lang_code);
    this.setState({ anchorEl: null });
  };

  _switchPushMenus = (menu) =>{
      this.setState({activePusherMenu:menu})
  }

  _renderHeader() {
    const { logout } = this.props;

      return  (
          <header className="m-grid__item  m-header "  data-minimize-offset="200" data-minimize-mobile-offset="200" >
              <div className="m-container general-header m-container--fluid m-container--full-height">
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
                <div className="m-stack__item m-stack__item--fluid m-header-head d-flex" id="m_header_nav">
                  <button className="m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark " id="m_aside_header_menu_mobile_close_btn">
                    <i className="la la-close"></i>
                  </button>

                  <div className="d-flex justify-content-center headerSchoolName align-items-center flex-1 hidden-sm">
                    <h4 style={{color:'#777'}}>
                      GravityBrain School
                    </h4>
                  </div>

                  <div id="m_header_topbar" className="m-topbar  m-stack m-stack--ver m-stack--general">
                    <div className="m-stack__item m-topbar__nav-wrapper">
                        <IconButton color='primary' className="m--hide mobile-sidebar-out-toggle"  onClick={() => {this.props.mobileSidebar()}}>
                            <Icon>menu</Icon>
                        </IconButton>

                      <ul className="m-topbar__nav m-nav m-nav--inline">

                        <Tasks activeMenu={this.state.activePusherMenu} switchMenu={this._switchPushMenus}/>
                        <Messages activeMenu={this.state.activePusherMenu} switchMenu={this._switchPushMenus}/>
                        <Notifications activeMenu={this.state.activePusherMenu} switchMenu={this._switchPushMenus}/>

                        <UserMenu logout={logout}/>


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
      const { auth } = this.props;
      const isLoggedIn = auth.get('isLoggedIn')
    return (
            isLoggedIn &&  this._renderHeader()
           );
  }
}

Header = connect(
  (state) => ({
      auth: state.auth
  }),
  (dispatch) => ({
    logout: () => { dispatch(logout()) }
  })
)(Header);

export default translate("translation")(Header);
