import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {selectUserData} from "../../redux/user/selectors";
import HasRole from "../middlewares/HasRole";

class UserMenu extends Component {

  static propTypes = {    
    logout: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      menuOpened:false
    };
  }

  _openMenu = () => {
    this.setState({ menuOpened: !this.state.menuOpened });
  };

  _closeMenu = () => {
    this.setState({ menuOpened: false });
  };

  _renderDropDownMenu() {
    const { logout, userData, t } = this.props;

        let user = userData.toJS();    

      return (
        <div className="m-dropdown__wrapper animated d-block" onMouseLeave={() => {this.props.switchMenu(null)}}>
        <span className="m-dropdown__arrow m-dropdown__arrow--right"></span>
        <div className="m-dropdown__inner">
          <div className="m-dropdown__header user-menu-header">
            <div className="row">
              <div className="col-4">
                <img src={user.avatarSmall} className="m--img-rounded m-0 w-100" alt=""/>
              </div>
              <div className="col-8 d-flex align-items-center">
                <div>
                    <p className="my-1 text-white">{user.firstName + ' ' +  user.lastName}</p>
                    <p className="my-1"><a href={`mailto:${user.email}`} className="text-light">{user.email}</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className="m-dropdown__body">
            <div className="m-dropdown__content">
              <ul className="m-nav">
                <li className="m-nav__item">
                  <NavLink to="/profile" className="m-nav__link">
                    <i className="m-nav__link-icon la la-user"></i>
                    <span className="m-nav__link-title">
                      <span className="m-nav__link-wrap">
                        <span className="m-nav__link-text">{t('myProfile')}</span>
                      </span>
                    </span>
                  </NavLink>
                </li>
                <HasRole roles={['Superadministrator', 'School']}>
                    <li className="m-nav__item">
                      <NavLink to="/school-profile" className="m-nav__link">
                        <i className="m-nav__link-icon la la-bank"></i>
                        <span className="m-nav__link-title">
                          <span className="m-nav__link-wrap">
                            <span className="m-nav__link-text">{t('schoolProfile')}</span>
                          </span>
                        </span>
                      </NavLink>
                    </li>
                </HasRole>              
                <li className="m-nav__separator m-nav__separator--fit">
                </li>
                <li className="m-nav__item">
                  <button onClick={logout} className="btn m-btn--pill btn-secondary m-btn--custom text-info m-btn--bolder">{t('logout')}</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      )
  }

  render() {
    const { userData, activeMenu } = this.props;

    let user = userData.toJS();

    return (
      <li className="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--align-right" data-dropdown-toggle="click">
        <button className="m-nav__link m-dropdown__toggle pointer"  onClick={() => {this.props.switchMenu('userMenu')}}>
            <span className="m-topbar__userpic">
              <img src={user.avatar} className="m--img-rounded m-0 text-center" alt=""/>
            </span>
        </button>
        { activeMenu === 'userMenu' && this._renderDropDownMenu() }
      </li>
    );
  }
}

export default withTranslation("translations")(connect(
  (state) => ({
    userData: selectUserData(state)    
  })
)(UserMenu));