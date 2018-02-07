import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";
import '../../styles/sidebar.css';
import {  translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Menu from "../../data/Menu";
import MenuParent from "../../data/MenuParent";
import $ from "jquery"
import {Icon, IconButton} from "material-ui";
import HasRole from "../../containers/middlewares/HasRole";
import {connect} from "react-redux";

class Sidebar extends Component {

    constructor(props,context) {
        super(props,context);
        this.state = {
            activeMenu:{
                key:''
            },
            hovered:false,
        }
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }; //

    componentDidMount(){
        const {location} = this.props;
        const key = location.pathname.substr(1).split('/')[0];

        setTimeout(()=>{
            const activeMenuKey = $('.second_level .active').closest('.menuItem').data('key');

            if (activeMenuKey !== undefined) {
                $('.second_level active').closest('.menuItem');
                this.setState({activeMenu:{key:activeMenuKey,subMenu:true}})
            } else {
                this.setState({activeMenu:this._getActiveMenuByKey(key)});
            }
        })
    }


    _getActiveMenuByKey(key) {
        const activeMenu = Menu.multipleMenu.filter(item => item.key === key )[0];
        if (activeMenu) {
            return activeMenu
        } else {
            return {
                key:'dashboard'
            }
        }
    }


    _renderGoogleMenus() {
        const activeMenu = this.state.activeMenu;
        const _self = this;

        return Menu.multipleMenu.map(function (menu) {
            return (
                <div className="menuItem" key={menu.key} data-key={menu.key}  onClick={(menu.subMenu === undefined) ? _self.props.mobileSidebar : () => {return} }>
                   <NavLink to={(menu.subMenu !== undefined) ? `${menu.key == 'store' ? menu.link : '#' + menu.key }` : `/${menu.link}`}  className={'googleMenuItem ' + menu.colorName + (activeMenu.key === menu.key ? ' active fadeInUp  animated' :  activeMenu.subMenu !== undefined ? ' swapped' : '') }
                         onClick={(event) => _self._googleMenuToggle(menu)}>
                       <span className="icon"><i className={menu.icon}></i></span>
                       <span className="content">{_self.props.t(menu.key)}</span>
                   </NavLink>
                    {(menu.subMenu !== undefined) ? _self._renderGoogleSubMenuContent(menu) : ''}
                </div>
           )
        })
    }

  _renderGoogleMenusParent() {
    const activeMenu = this.state.activeMenu;
    const _self = this;

    return MenuParent.multipleMenu.map(function (menu) {
      return (
        <div className="menuItem" key={menu.key} data-key={menu.key}>
            <NavLink to={(menu.subMenu !== undefined) ? `#${menu.key}` : `/${menu.link}`}
                     className={'googleMenuItem ' + menu.colorName + (activeMenu.key === menu.key ? ' active fadeInUp  animated' : activeMenu.subMenu !== undefined ? ' swapped' : '')}
                     onClick={(event) => _self._googleMenuToggle(menu)}>
                <span className="icon"><i className={menu.icon}></i></span>
                <span className="content">{_self.props.t(menu.key)}</span>
            </NavLink>
          {(menu.subMenu !== undefined) && _self._renderGoogleSubMenuContent(menu) }
        </div>
      )
    })
  }

    _renderGoogleSubMenus(subMenus) {
       const _self = this;
       return subMenus.map(function (menu,i) {
            return (
                <div key={i}>
                    <NavLink activeClassName={'active'} to={`/${menu.link}`} key={i}>
                        <span className="content"> {_self.props.t(menu.key) }</span>
                    </NavLink >
                </div>
            )
        })
    }

    _renderGoogleSubMenuContent(menu) {
        const activeMenu = this.state.activeMenu;
        const _self = this;

        return (
            <div className={'second_level '  + (activeMenu.key === menu.key ? 'activeSubMenu fadeInUp  animated' : '')} id={menu.key}>
                <a href="#" className="back" onMouseOver={() => {_self._menuBackHover()}}>
                    <i className="la la-angle-left"></i>
                </a>
                <div className="content" onClick={() => {_self.props.mobileSidebar()}}>
                        {_self._renderGoogleSubMenus(menu.subMenu)}
                </div>
            </div>
        )
    }


    _renderTimelineSubMenu(menu){
        return menu.map((item,i)=>{
            return (
                <div className="m-list-timeline__item" key={i}>
                    <NavLink to={`/${item.link}`} className="timelineMenuItem">
                        <span className="m-list-timeline__badge m-list-timeline__badge--success"></span>
                        <span className="m-list-timeline__text">
                        {item.title}
                    </span>
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

    _renderSingleMenus() {
        const _self = this;
        return Menu.singleMenu.map(function (menu,i) {
            return (
                <li  className="m-menu__item" key={i} aria-haspopup="true"  data-menu-submenu-toggle="hover" >
                    <NavLink  to={`/${menu.link}`} className="m-menu__link" onClick={() => {_self._resetMenu()}}>
                        <i className={`m-menu__link-icon ${menu.icon}`}></i>
                        <span className="m-menu__link-text">
                            {_self.props.t(menu.key)}
						</span>
                    </NavLink >
                </li>
            )
        })
    }

    _googleMenuToggle(menu) {
        this._menuHoverOut();
        this.setState({activeMenu:menu})
    }

    _menuBackHover() {
        this.setState({hovered:true})
    }

    _menuHoverOut() {
        this.setState({hovered:false});
    }

    _resetMenu() {
        this.setState({activeMenu:{key:'dashboard'}});
    }

    render() {

        const { auth } = this.props;
        const isLoggedIn = auth.get('isLoggedIn')

        return (
        isLoggedIn && (
            <div id="m_aside_left" className="m-grid__item	m-aside-left  m-aside-left--skin-dark ">
                <div className="text-right mobile-sidebar-toggle m--hide" >
                    <IconButton color='primary'  onClick={() => {this.props.mobileSidebar()}}>
                        <Icon>menu</Icon>
                    </IconButton>
                </div>
                <div
                id="m_ver_menu"
                className="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark "
                data-menu-vertical="true"
                data-menu-scrollable="false" data-menu-dropdown-timeout="500"
                onMouseLeave={() => {this._menuHoverOut()}} >
                    <nav className={'navigation ' + (this.state.hovered ? 'hovered' : '')}>
                        <HasRole roles={[
                          'Superintendent',
                          'Student',
                          'Teacher',
                          'Principal',
                          'Administrator',
                          'Superadministrator',
                          'Affiliate',
                        ]}>
                            {this._renderGoogleMenus()}
                        </HasRole>
                        <HasRole roles={["Parents"]}>
                            {this._renderGoogleMenusParent()}
                        </HasRole>
                    </nav>
                    <ul className="m-menu__nav  m-menu__nav--dropdown-submenu-arrow "  onClick={() => {this.props.mobileSidebar()}}>
                        {this._renderSingleMenus()}
                    </ul>
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
    (dispatch) => ({
    })
)(Sidebar);



export default withRouter(translate("sidebar")(Sidebar));