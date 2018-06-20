import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Icon, ListItemIcon, ListItemText, Menu, MenuItem} from '@material-ui/core';
import {translate} from "react-i18next";
import * as AUTH from '../../services/AuthService';
import {NavLink, withRouter} from "react-router-dom";
import posterImage from "../../media/images/menu_poster.jpg"
import {connect} from "react-redux";
import {selectUserData} from "../../redux/user/selectors";
import {selectUserRoles} from "../../redux/user/selectors";

class UserMenu extends Component {

  static propTypes = {
    // logout function
    logout: PropTypes.func.isRequired
  };

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

  _renderDropDownMenu() {
    const { logout, userData, t, roles } = this.props;

    let user = userData.toJS();
    let prettyRoles = roles.toJS();

      return (
        <div className="m-dropdown__wrapper animated m--padding-right-20" onMouseLeave={() => {this.props.switchMenu(null)}} style={{display:'block'}}>
        <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style={{right:'21px', color:'#385774'}}></span>
        <div className="m-dropdown__inner">
          <div className="m-dropdown__header m--align-center" style={{backgroundColor:`#385774`}}>
            <div className="m-card-user m-card-user--skin-dark">
              <div className="m-card-user__pic">
                <img src={user.avatar} className="m--img-rounded m--marginless" alt=""/>
              </div>
              <div className="m-card-user__details">
                <span className="m-card-user__name m--font-weight-500">{user.firstName + ' ' +  user.lastName}</span>
                <a href={`mailto:${user.email}`} className="m-card-user__email m--font-weight-300 m-link" style={{ fontSize: '0.8rem'}}>{user.email}</a>
              </div>
            </div>
          </div>
          <div className="m-dropdown__body">
            <div className="m-dropdown__content">
              <ul className="m-nav m-nav--skin-light">
                <li className="m-nav__section m--hide">
                  <span className="m-nav__section-text">Section</span>
                </li>
                <li className="m-nav__item">
                  <NavLink to="/profile" className="m-nav__link">
                    <i className="m-nav__link-icon flaticon-profile-1"></i>
                    <span className="m-nav__link-title">
                      <span className="m-nav__link-wrap">
                        <span className="m-nav__link-text">My Profile</span>
                      </span>
                    </span>
                  </NavLink>
                </li>
                  {prettyRoles && prettyRoles[0] && prettyRoles[0].name !== 'Parents' &&
                    <li className="m-nav__item">
                      <NavLink to="/school-profile" className="m-nav__link">
                        <i className="m-nav__link-icon flaticon-profile-1"></i>
                        <span className="m-nav__link-title">
                          <span className="m-nav__link-wrap">
                            <span className="m-nav__link-text">School Profile</span>
                          </span>
                        </span>
                      </NavLink>
                    </li>
                  }

                <li className="m-nav__separator m-nav__separator--fit">
                </li>
                <li className="m-nav__item" onClick={logout}>
                  <a className="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">{t('logout','Logout')}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      )
  }

  render() {
    const { t, userData, activeMenu } = this.props;

    let user = userData.toJS();

    return (
      <li className="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" data-dropdown-toggle="click">

        <a className="m-nav__link m-dropdown__toggle pointer"  onClick={() => {this.props.switchMenu('userMenu')}}>

        <span className="m-topbar__userpic">
          <img src={user.avatar} className="m--img-rounded m--marginless m--img-centered" alt=""/>
        </span>
        </a>
        {activeMenu == 'userMenu' &&
        this._renderDropDownMenu()
        }
      </li>
    );
  }
}

UserMenu = connect(
  (state) => ({
    userData: selectUserData(state),
    roles: selectUserRoles(state)
  }),
  (dispatch) => ({})
)(UserMenu);

export default withRouter(translate("LanguageSwitcher")(UserMenu));