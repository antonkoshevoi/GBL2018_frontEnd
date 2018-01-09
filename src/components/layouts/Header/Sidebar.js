import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


class Sidebar extends Component {

    constructor() {
        super();
        this.state = {
            activeMenu:'home',
            hovered:false,
        }
    }

    _googleMenuToggle(menu) {
        this.setState({activeMenu:menu})
    }

    _menuBackHover(menu) {
        this.setState({hovered:true})
    }

    render() {
        return (
        <div id="m_aside_left" className="m-grid__item	m-aside-left  m-aside-left--skin-dark ">
            <div
            id="m_ver_menu"
            className="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark "
            data-menu-vertical="true"
            data-menu-scrollable="false" data-menu-dropdown-timeout="500"
        >
            <ul className="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">
                <li className="m-menu__item  m-menu__item--active" aria-haspopup="true" >
                    <Link to="/dashboard"   className="m-menu__link ">
                        <i className="m-menu__link-icon flaticon-line-graph"></i>
                        <span className="m-menu__link-title">
										<span className="m-menu__link-wrap">
											<span className="m-menu__link-text">
												DASHBOARD
											</span>
											<span className="m-menu__link-badge">
												<span className="m-badge m-badge--danger">
													2
												</span>
											</span>
										</span>
									</span>
                    </Link >
                </li>
                <li className="m-menu__item  " aria-haspopup="true"  data-menu-submenu-toggle="hover">
                    <Link   to="Reports" className="m-menu__link m-menu__toggle">
                        <i className="m-menu__link-icon flaticon-share"></i>
                        <span className="m-menu__link-text">
										REPORTS
						</span>
                    </Link >
                </li>

            </ul>
                <nav className="navigation">
                    <a href="#" className={'home ' + (this.state.activeMenu == 'home' ? 'active fadeInUp  animated' : 'swapped') }
                       onClick={(event) => this._googleMenuToggle('home')}>
                        <span className="icon"><i className="flaticon-line-graph"></i></span> <span className="content">Dashboard</span>
                    </a>
                    <a href="#app_nav" onClick={(event) => this._googleMenuToggle('app_nav')}
                       className={'green ' + (this.state.activeMenu == 'app_nav' ? 'active fadeInUp  animated' : this.state.activeMenu !== 'home' ? 'swapped' : '')}>
                        <span className="icon"><i className="la la-wrench"></i></span> <span className="content">Reports</span>
                    </a>
                    <div className={'second_level '  + (this.state.activeMenu == 'app_nav' ? 'activeSubMenu fadeInUp  animated' : '')} id="app_nav">
                        <a href="#" className="back">
                            <i className="la la-angle-left"></i>
                        </a>
                        <div className="content">
                            <a href="http://www.google.com">
                                <span className="content">Popular Apps</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Viewed Apps</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Commented Apps</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Recent Apps</span>
                            </a>
                        </div>
                    </div>
                    <a href="#movies_nav" className={'red ' + (this.state.activeMenu == 'movies_nav' ? 'active fadeInUp  animated' : this.state.activeMenu !== 'home' ? 'swapped' : '')} onClick={(event) => this._googleMenuToggle('movies_nav')}>
                        <span className="icon"><i className="la	la-twitter"></i></span> <span className="content">Movies &amp; TV</span>
                    </a>
                    <div className={'second_level '  + (this.state.activeMenu == 'movies_nav' ? 'activeSubMenu fadeInUp  animated' : '')} id="movies_nav">
                        <a href="#" className="back">
                            <i className="icon-chevron-left"></i>
                        </a>
                        <div className="content">
                            <a href="http://www.google.com">
                                <span className="content">Popular Movies</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Viewed Movies</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Commented Movies</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Recent Movies</span>
                            </a>
                        </div>
                    </div>
                    <a href="#music_nav" className="orange">
                        <span className="icon"><i className="la	la-twitter"></i></span> <span className="content">Music</span>
                    </a>
                    <div className="hide second_level" id="music_nav">
                        <a href="#" className="back">
                            <i className="icon-chevron-left"></i>
                        </a>
                        <div className="content">
                            <a href="http://www.google.com">
                                <span className="content">Popular Music</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Viewed Music</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Commented Music</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Recent Music</span>
                            </a>
                        </div>
                    </div>
                    <a href="#books_nav" className="blue">
                        <span className="icon"><i className="icon-book"></i></span> <span className="content">Books</span>
                    </a>
                    <div className="hide second_level" id="books_nav">
                        <a href="#" className="back">
                            <i className="icon-chevron-left"></i>
                        </a>
                        <div className="content">
                            <a href="http://www.google.com">
                                <span className="content">Popular Books</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Viewed Books</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Commented Books</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Recent Books</span>
                            </a>
                        </div>
                    </div>
                    <a href="#magazines_nav" className="purple">
                        <span className="icon"><i className="icon-picture"></i></span> <span className="content">Magazines</span>
                    </a>
                    <div className="hide second_level" id="magazines_nav">
                        <a href="#" className="back">
                            <i className="icon-chevron-left"></i>
                        </a>
                        <div className="content">
                            <a href="http://www.google.com">
                                <span className="content">Popular Magazines</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Viewed Magazines</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Commented Magazines</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Recent Magazines</span>
                            </a>
                        </div>
                    </div>
                    <a href="#devices_nav" className="grey">
                        <span className="icon"><i className="icon-screen"></i></span> <span className="content">Devices</span>
                    </a>
                    <div className="hide second_level" id="devices_nav">
                        <a href="#" className="back">
                            <i className="icon-chevron-left"></i>
                        </a>
                        <div className="content">
                            <a href="http://www.google.com">
                                <span className="content">Popular Devices</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Viewed Devices</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Most Commented Devices</span>
                            </a>
                            <a href="http://www.google.com">
                                <span className="content">Recent Devices</span>
                            </a>
                        </div>
                    </div>
                </nav>
        </div>
        </div>
        );
    }
}

Sidebar.propTypes = {};

export default Sidebar;
