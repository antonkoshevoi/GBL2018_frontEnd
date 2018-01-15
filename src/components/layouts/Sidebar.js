import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";
import '../../styles/sidebar.css';
import {  translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Menu from "../../data/Menu";


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
        this.setState({activeMenu:{key:this.props.location.pathname.substr(1)}})
    }

    _renderGoogleMenus() {
        const activeMenu = this.state.activeMenu;
        const _self = this;

        return Menu.multipleMenu.map(function (menu) {
            return (
                <div className="menuItem" key={menu.key}>
                   <NavLink to={(menu.subMenu !== undefined) ? `#${menu.key}` : `/${menu.link}`}  className={'googleMenuItem ' + menu.colorName + (activeMenu.key === menu.key ? ' active fadeInUp  animated' :  activeMenu.subMenu !== undefined ? ' swapped' : '') }
                         onClick={(event) => _self._googleMenuToggle(menu)}>
                       <span className="icon"><i className={menu.icon}></i></span>
                       <span className="content">{_self.props.t(menu.key)}</span>
                   </NavLink>
                    {(menu.subMenu !== undefined) ? _self._renderGoogleSubMenuContent(menu) : ''}
                </div>
           )
        })
    }

    _renderGoogleSubMenus(subMenus) {
       const _self = this;
       return subMenus.map(function (menu,i) {
            return (
                <NavLink activeClassName={'active'} to={`/${menu.link}`} key={i}>
                    <span className="content"> {_self.props.t(menu.key) }</span>
                </NavLink >
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
                <div className="content">
                    {_self._renderGoogleSubMenus(menu.subMenu)}
                </div>
            </div>
        )
    }


    _renderSingleMenus() {
        const _self = this;
        return Menu.singleMenu.map(function (menu,i) {
            return (
                <li  className="m-menu__item" key={i} aria-haspopup="true"  data-menu-submenu-toggle="hover">
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

    
        return (
        <div id="m_aside_left" className="m-grid__item	m-aside-left  m-aside-left--skin-light ">

            <div
            id="m_ver_menu"
            className="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark "
            data-menu-vertical="true"
            data-menu-scrollable="false" data-menu-dropdown-timeout="500"
            onMouseLeave={() => {this._menuHoverOut()}} >
                <nav className={'navigation ' + (this.state.hovered ? 'hovered' : '')}>
                    {this._renderGoogleMenus()}
                </nav>
                <ul className="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">
                    {this._renderSingleMenus()}
                </ul>
            </div>
        </div>
        );
    }



}

Sidebar.propTypes = {};


export default withRouter(translate("sidebar")(Sidebar));