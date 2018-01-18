import React, {Component} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {generateBreadcrumbLink} from "../../helpers/utils";

class SubHeader extends Component {



    _renderBreadcrumbs(paths) {
        return paths.map(function (item,i) {
        const _self = this;

            return (
                [
                    <li key={i} className={`m-nav__item ${item === '' ? 'm-nav__item--home' : ''}`}>
                        <NavLink to={`${item === '' ? '/dashboard' :  generateBreadcrumbLink(paths,i)}`} className="m-nav__link ">
                            {(item === '') ?
                                <i className="m-nav__link-icon la la-home"></i> :
                                <span className="m-nav__link-text">{item}</span>
                            }
                        </NavLink>
                    </li>
                   ,(paths.length !== i + 1) &&  <li  key={item} className="m-nav__separator">-</li>
                ]
            )
        })
    }



  render() {
        const { location} = this.props

        const paths = location.pathname.split('/')

      return (
            <div className="m-subheader">
                <div className="d-flex align-items-center">
                    <div className="mr-auto">
                        <h3 className="m-subheader__title m-subheader__title--separator">{(parseInt(paths[paths.length-1]).length > 0) ? paths[paths.length-1] : (paths.length > 2) ? paths[paths.length-2] : paths[paths.length-1]}</h3>
                        <div className="m-subheader__breadcrumbs m-nav m-nav--inline">
                            {paths.length > 2 && this._renderBreadcrumbs(paths) }
                        </div>
                    </div>
                    <div>
  			    <span className="m-subheader__daterange m--hide" id="m_dashboard_daterangepicker">
					<span className="m-subheader__daterange-label">

					</span>
				</span>
                    </div>
                </div>
            </div>
        );
    }
}

SubHeader.propTypes = {};

export default withRouter(SubHeader);
