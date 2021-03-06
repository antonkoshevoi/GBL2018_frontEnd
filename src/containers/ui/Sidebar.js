import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";
import '../../styles/sidebar.css';
import {withTranslation} from 'react-i18next';
import $ from "jquery"

class Sidebar extends Component {

  isActive = false;

  constructor(props, context) {
    super(props, context);
    this.menu = props.structure;
    this.state = {
      activeKey: '',
      activeMenu: {
        key: ''
      },
      hovered: false,
      headerPosition: 0,
      headerHeight:window.innerWidth <= 1240 ? 65 : 70,
      mobileMenu: $(window).width() <= 1240 ? 65 : 0      
    }
  }

  componentDidMount() {
    const {location} = this.props;
    const key = location.pathname.substr(1).split('/')[0];
    this.isActive = true;
    
    window.addEventListener('scroll',this.setHeaderPosition.bind(this));
    window.addEventListener('resize', this.updateDimensions.bind(this));
    
    this._generateMenusPosition(key);
  }
  
  componentWillUnmount() {
    this.isActive = false; 
        
    window.removeEventListener('scroll', this.setHeaderPosition.bind(this));
    window.removeEventListener('resize', this.updateDimensions.bind(this));

    if (this.interval) {
        clearInterval(this.interval);
    }
  }   

  updateDimensions() {
    if (this.isActive) {  
        this.setState({mobileMenu: $(window).width() <= 1240 ? 65 : 0});
    }
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

  componentDidUpdate() {
    const {location} = this.props;
    const key = location.pathname.substr(1).split('/')[0];
    
    if (this.state.activeKey !== key) {        
        this._generateMenusPosition(key);      
        this.setState({activeKey: key});
    }
  }

  _getActiveMenuByKey(key) {
    const activeMenu = this.menu.multipleMenu.filter(item => item.key === key)[0];
    if (activeMenu) {
      return activeMenu;
    } else {
      return { key: 'dashboard' };
    }
  }

  _generateMenusPosition(key){
    this.interval = setTimeout(() => {
      const activeMenuKey = $('.second_level .active').closest('.menuItem').data('key');
      if (activeMenuKey !== undefined) {
        $('.second_level .active').closest('.menuItem');
        this.setState({activeMenu: {key: activeMenuKey, subMenu: true}})
      } else {
        this.setState({activeMenu: this._getActiveMenuByKey(key)});
      }
    });
  }

  _renderGoogleMenus() {
    const activeMenu = this.state.activeMenu;
    const _self = this;

    return this.menu.multipleMenu.map(function (menu) {
      return (
        <div className="menuItem" key={menu.key} data-key={menu.key} onClick={(menu.subMenu === undefined) ? _self.props.mobileSidebar : () => { return; } }>
          <NavLink
            to={`/${menu.link}`}
            className={'googleMenuItem ' + menu.colorName + (activeMenu.key === menu.key ? ' active fadeInUp  animated' : activeMenu.subMenu !== undefined ? ' swapped' : '') }
            onClick={() => {_self._googleMenuToggle(menu); _self._goToFirstPage(menu);}}>
            <span className="icon"><i className={menu.icon}></i></span>
            <span className="content">{_self.props.t(menu.title)}</span>
          </NavLink>
          {(menu.subMenu !== undefined) ? _self._renderGoogleSubMenuContent(menu) : ''}
        </div>
      )
    })
  }

  _goToFirstPage(menu){
      this.props.history.push('/' + menu.link);
  }

  _renderGoogleSubMenus(subMenus) {
    const { t }= this.props;
    return subMenus.map(function (menu, i) {
      return (
        <div key={i}>
          <NavLink className={menu.colorName || 'default'} activeClassName='active' to={`/${menu.link}`} key={i}>
            {menu.icon && <span className="icon"><i className={menu.icon}></i></span>}
            <span className="content"> {t(menu.title) }</span>
          </NavLink >
        </div>
      )
    })
  }

  _renderGoogleSubMenuContent(menu) {
    const activeMenu = this.state.activeMenu;    
    return (
      <div className={'second_level ' + (activeMenu.key === menu.key ? 'activeSubMenu fadeInUp  animated' : '')} id={menu.key}>
        <span className="back" onMouseOver={() => { this._menuBackHover() }}>
          <i className="la la-angle-left"></i>
        </span>
        <div className="content" onClick={() => { this.props.mobileSidebar() }}>
          {this._renderGoogleSubMenus(menu.subMenu)}
        </div>
      </div>
    )
  }

  _googleMenuToggle(menu) {
    this._menuHoverOut();
    this.setState({activeMenu: menu})
  }

  _menuBackHover() {
    this.setState({hovered: true})
  }

  _menuHoverOut() {
    this.setState({hovered: false});
  }

  _resetMenu() {
    this.setState({activeMenu: {key: 'dashboard'}});
  }

  render() {

    const {headerPosition, activeMenu, mobileMenu} = this.state;

    return (      
        <div id="m_aside_left" style={{marginTop:-headerPosition + mobileMenu}} className={`m-menu-active-${activeMenu.key}`}>
          <div
            id="m_ver_menu"
            data-menu-vertical="true"
            data-menu-scrollable="false" data-menu-dropdown-timeout="500"
            onMouseLeave={() => {
              this._menuHoverOut()
            }}>
            <nav className={'navigation ' + (this.state.hovered ? 'hovered' : '')}>
                {this._renderGoogleMenus()}
            </nav>            
          </div>
        </div>      
    );
  }
}

export default withRouter(withTranslation("translations")(Sidebar));