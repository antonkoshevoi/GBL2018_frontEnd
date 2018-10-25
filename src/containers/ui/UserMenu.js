import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import {NavLink, withRouter} from "react-router-dom";
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

  _openMenu = event => {
    this.setState({ menuOpened: !this.state.menuOpened });
  };

  _closeMenu = event => {
    this.setState({ menuOpened: false });
  };

  _renderDropDownMenu() {
    const { logout, userData, t } = this.props;

        let user = userData.toJS();    

      return (
        <div className="m-dropdown__wrapper animated m--padding-right-20" onMouseLeave={() => {this.props.switchMenu(null)}} style={{display:'block'}}>
        <span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" style={{right:'21px', color:'#385774'}}></span>
        <div className="m-dropdown__inner">
          <div className="m-dropdown__header m--align-center" style={{backgroundColor:`#385774`}}>
            <div className="m-card-user m-card-user--skin">
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
                <li className="m-nav__item" onClick={logout}>
                  <a className="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">{t('logout')}</a>
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
      <li className="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width" data-dropdown-toggle="click">
        <a className="m-nav__link m-dropdown__toggle pointer"  onClick={() => {this.props.switchMenu('userMenu')}}>
        <span className="m-topbar__userpic">
          <img src={user.avatar} className="m--img-rounded m--marginless m--img-centered" alt=""/>
        </span>
        </a>
        { activeMenu === 'userMenu' && this._renderDropDownMenu() }
      </li>
    );
  }
}

UserMenu = connect(
  (state) => ({
    userData: selectUserData(state)    
  }),
  (dispatch) => ({})
)(UserMenu);

export default withRouter(translate("translations")(UserMenu));