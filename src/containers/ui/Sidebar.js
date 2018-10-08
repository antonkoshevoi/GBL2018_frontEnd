import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";
import '../../styles/sidebar.css';
import {translate} from 'react-i18next';
import $ from "jquery"
import {connect} from "react-redux";

class Sidebar extends Component {

  constructor(props, context) {
    super(props, context);
    this.menu = props.structure;
    this.state = {
      activeMenu: {
        key: ''
      },
      activeMenuClass: {
        key: ''
      },
      hovered: false,
      headerPosition: 0,
      headerHeight:window.innerWidth <= 1240 ? 60 : 70,
      mobileMenu: $(window).width() <= 1240 ? 53 : 0
    }
  }

  componentDidMount() {
    const {location} = this.props;
    const key = location.pathname.substr(1).split('/')[0];
    window.addEventListener('scroll',this.setHeaderPosition.bind(this));
    window.addEventListener('resize', this.updateDimensions.bind(this));
    this._generateMenusPosition(key);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.setHeaderPosition.bind(this));
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }   

  updateDimensions() {
    this.setState({mobileMenu: $(window).width() <= 1240 ? 53 : 0});
  }

  setHeaderPosition(){
    const { headerHeight } = this.state
    window.scrollY <= headerHeight?
      this.setState({headerPosition:window.scrollY})
      :
      this.setState({headerPosition:headerHeight})
  }

  componentWillReceiveProps(nextProps) {
    const {location} = nextProps;
    const key = location.pathname.substr(1).split('/')[0];
    this._generateMenusPosition(key);
  }


  _getActiveMenuByKey(key) {
    const activeMenu = this.menu.multipleMenu.filter(item => item.key === key)[0];
    if (activeMenu) {
      return activeMenu
    } else {
      return {
        key: 'dashboard'
      }
    }
  }

  _generateMenusPosition(key){
    setTimeout(() => {
      const activeMenuKey = $('.second_level .active').closest('.menuItem').data('key');
      if (activeMenuKey !== undefined) {
        $('.second_level .active').closest('.menuItem');
        this.setState({activeMenu: {key: activeMenuKey, subMenu: true}, activeMenuClass: {key: activeMenuKey}})
      } else {
        this.setState({activeMenu: this._getActiveMenuByKey(key), activeMenuClass: this._getActiveMenuByKey(key)});
      }
    })
  }

  _renderGoogleMenus() {
    const activeMenu = this.state.activeMenu;
    const _self = this;

    return this.menu.multipleMenu.map(function (menu) {
      return (
        <div className="menuItem" key={menu.key} data-key={menu.key}
             onClick={(menu.subMenu === undefined) ? _self.props.mobileSidebar : () => {
              return;
             } }>
          <NavLink
            to={(menu.subMenu !== undefined) ? `${menu.key === 'store' ? menu.link : '#' + menu.key }` : `/${menu.link}`}
            className={'googleMenuItem ' + menu.colorName + (activeMenu.key === menu.key ? ' active fadeInUp  animated' : activeMenu.subMenu !== undefined ? ' swapped' : '') }
            onClick={(event) => {_self._googleMenuToggle(menu); _self._goToFirstPage(menu);}}>
            <span className="icon"><i className={menu.icon}></i></span>
            <span className="content">{_self.props.t(menu.title)}</span>
          </NavLink>
          {(menu.subMenu !== undefined) ? _self._renderGoogleSubMenuContent(menu) : ''}
        </div>
      )
    })
  }

  _goToFirstPage(menu){
    if (menu.key !== 'store' && menu.subMenu) {
      const subLink = this.menu.multipleMenu.filter(menuItem => menuItem.key ===  menu.key)[0].subMenu[0].link;
      this.props.history.push('/'+subLink);
    }
  }

  _renderGoogleSubMenus(subMenus) {
    const _self = this;
    return subMenus.map(function (menu, i) {
      return (
        <div key={i}>
          <NavLink activeClassName={'active'} to={`/${menu.link}`} key={i}>
            <span className="content"> {_self.props.t(menu.title) }</span>
          </NavLink >
        </div>
      )
    })
  }

  _renderGoogleSubMenuContent(menu) {
    const activeMenu = this.state.activeMenu;
    const _self = this;

    return (
      <div className={'second_level ' + (activeMenu.key === menu.key ? 'activeSubMenu fadeInUp  animated' : '')}
           id={menu.key}>
        <a href="" className="menu-back-arrow back" onMouseOver={() => {
          _self._menuBackHover()
        }}>
          <i className="la la-angle-left"></i>
        </a>
        <div className="content" onClick={() => {
          _self.props.mobileSidebar()
        }}>
          {_self._renderGoogleSubMenus(menu.subMenu)}
        </div>
      </div>
    )
  }

  _renderTimelineSubMenu(menu) {
    return menu.map((item, i) => {
      return (
        <div className="m-list-timeline__item" key={i}>
          <NavLink to={`/${item.link}`} className="timelineMenuItem">
            <span className="m-list-timeline__badge m-list-timeline__badge--success"></span>
            <span className="m-list-timeline__text">{item.title}</span>
          </NavLink>
          {item.subMenu !== undefined &&
          <div className="timelineSecondSubMenu  m-list-timeline">
            <div className="m-list-timeline__items">
              {this._renderTimelineSubMenu(item.subMenu)}
            </div>
          </div>
          }
        </div>
      )
    })
  }

  _renderSingleMenuItems() {
    const _self = this;
    return this.menu.singleMenu.map(function (menu, i) {
      return (
        <li className="m-menu__item" key={i} aria-haspopup="true" data-menu-submenu-toggle="hover">
          <NavLink to={`/${menu.link}`} className="m-menu__link" onClick={() => {_self._resetMenu()}}>
            <i className={`m-menu__link-icon ${menu.icon}`}></i>
            <span className="m-menu__link-text">{_self.props.t(menu.title)}</span>
          </NavLink >
        </li>
      )
    })
  }
  
  _renderSingleMenus() {
      const _self = this;
      if (this.menu.singleMenu) {
          return (
            <ul className="m-menu__nav  m-menu__nav--dropdown-submenu-arrow " onClick={() => {
              _self.props.mobileSidebar()
            }}>
              {_self._renderSingleMenuItems()}
            </ul>              
          );
      }         
  }

  _googleMenuToggle(menu) {
    this._menuHoverOut();
    this.setState({activeMenu: menu, activeMenuClass: menu})
  }

  _menuBackHover() {
    this.setState({hovered: true, activeMenuClass : {key: ''}})
  }

  _menuHoverOut() {
    this.setState({hovered: false, activeMenuClass: this.state.activeMenu});
  }

  _resetMenu() {
    this.setState({activeMenu: {key: 'dashboard'}, activeMenuClass: {key: 'dashboard'}});
  }

  render() {

    const {auth} = this.props;
    const isLoggedIn = auth.get('isLoggedIn')
    const {headerPosition, activeMenuClass, mobileMenu} = this.state;

    return (
      isLoggedIn && (
        <div id="m_aside_left" style={{marginTop:-headerPosition + mobileMenu}} className={`m-grid__item m-aside-left  m-aside-left--skin-dark menu-active-${activeMenuClass.key}`}>
          <div
            id="m_ver_menu"
            className="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark "
            data-menu-vertical="true"
            data-menu-scrollable="false" data-menu-dropdown-timeout="500"
            onMouseLeave={() => {
              this._menuHoverOut()
            }}>
            <nav className={'navigation ' + (this.state.hovered ? 'hovered' : '')}>
                {this._renderGoogleMenus()}
            </nav>
            {this._renderSingleMenus()}
          </div>
        </div>
      )
    );
  }
}

Sidebar = connect(
  (state) => ({
    auth: state.auth
  }),
  (dispatch) => ({})
)(Sidebar);


export default withRouter(translate("translations")(Sidebar));