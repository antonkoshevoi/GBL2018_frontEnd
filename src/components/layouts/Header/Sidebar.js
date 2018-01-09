import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


class Sidebar extends Component {
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
        </div>
        </div>
        );
    }
}

Sidebar.propTypes = {};

export default Sidebar;
