import React, {Component} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {generateBreadcrumbLink} from "../../helpers/utils";
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
import {Menu, MenuItem} from '@material-ui/core';
import {translate} from "react-i18next";
import {connect} from "react-redux";
import {selectAddToCartRequest, selectCartRecords, selectGetCartRecordsRequest} from "../../redux/store/selectors";
import {getCartRecords} from "../../redux/store/actions";

class SubHeader extends Component {


    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };

    }

    componentDidMount() {
        this._getCartRecords();
    }


    _getCartRecords() {
        this.props.getCartRecords();
    }

    _renderBreadcrumbs(paths) {
        return paths.map(function (item,i) {
        const _self = this;

            return (
                [
                    <li key={i} className={`m-nav__item ${item === '' ? 'm-nav__item--home' : ''}`}>
                        <NavLink to={`${item === '' ? '/dashboard' :  generateBreadcrumbLink(paths,i)}`} className="m-nav__link ">
                            {(item === '') ?
                                <i className="m-nav__link-icon la la-home"></i> :
                                <span className="m-nav__link-text">{item.replace('_', ' ')}</span>
                            }
                        </NavLink>
                    </li>
                   ,(paths.length !== i + 1) &&  <li  key={item} className="m-nav__separator">-</li>
                ]
            )
        })
    }


    _renderHeaderMenu() {
        const _self = this;
            return ( [
                <MenuItem key="1" onClick={_self._closeHeaderMenu}>
                    <NavLink to='/shopping/cart' className="fa fa-shopping-cart PageHeader-icon"></NavLink>
                </MenuItem>,
                <MenuItem key="2" onClick={_self._closeHeaderMenu}>
                    <i className="fa fa-line-chart"></i>
                </MenuItem>,
                <MenuItem key="3" onClick={_self._closeHeaderMenu}>
                    <i className="fa fa-id-card PageHeader-icon"></i>
                </MenuItem>,
                <MenuItem key="4" onClick={_self._closeHeaderMenu}>
                    <i className="fa fa-calendar PageHeader-icon"></i>
                </MenuItem>,
                <MenuItem key="5" onClick={_self._closeHeaderMenu}>
                    <NavLink to="/messages" className="fa fa-envelope-open PageHeader-icon"></NavLink>
                </MenuItem>,
                <MenuItem key="6" onClick={_self._closeHeaderMenu}>
                   <ul className="list-inline"><LanguageSwitcher/></ul>
                </MenuItem>

               ]
            )
    }


    _openHeaderMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };


    _closeHeaderMenu = event => {
        this.setState({ anchorEl: null });
    };



  render() {
      const {location,  auth} = this.props;
      const isLoggedIn = auth.get('isLoggedIn');
      const paths = location.pathname.split('/');
      return (
          isLoggedIn && (
                <div className="m-subheader">
                    <div className="d-flex align-items-center full-width">
                        <div className="mr-auto">
                            <h3 className="m-subheader__title m-subheader__title--separator">{(parseInt(paths[paths.length-1]).length > 0) ? paths[paths.length-1] : (paths.length > 2) ? paths[paths.length-2] : paths[paths.length-1]}</h3>
                            <div className="m-subheader__breadcrumbs m-nav m-nav--inline">
                                {paths.length > 2 && this._renderBreadcrumbs(paths) }
                            </div>
                        </div>
                        <div>
                    <span className="m-subheader__datferange " id="m_dashboard_daterangepicker">
                        <div className="right-wrapper text-right PageHeader-breadcrumbs">
                                <ol className="breadcrumbs m--padding-right-20 d-flex justify-content-between align-items-center header-menu" style={{marginBottom:0}}>
                                    <li>
                                        <NavLink to='/shopping/cart'>
                                            <i className="fa fa-shopping-cart PageHeader-icon"></i>

                                        </NavLink>
                                    </li>
                                    <li>
                                        <a >
                                            <i className="fa fa-line-chart PageHeader-icon"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a >
                                            <i className="fa fa-id-card PageHeader-icon"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a >
                                            <i className="fa fa-calendar PageHeader-icon"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <NavLink to="/messages">
                                            <i className="fa fa-envelope-open PageHeader-icon"></i>
                                        </NavLink>
                                    </li>
                                    <LanguageSwitcher/>
                                </ol>

                                <div className="mobile-header-menu m--hide">
                                    <a className="fa pointer fa-arrow-down "
                                       aria-haspopup="true"
                                       onClick={this._openHeaderMenu}>
                                        <Menu
                                            id="header-menu"
                                            anchorEl={this.state.anchorEl}
                                            open={Boolean(this.state.anchorEl)}
                                            onClose={this._closeHeaderMenu}
                                        >
                                            {this._renderHeaderMenu()}

                                        </Menu>
                                    </a>
                                </div>
                            </div>
                    </span>
                        </div>
                    </div>
                </div>
              )
        );
    }
}


SubHeader = connect(
    (state) => ({
        addToCartRequest: selectAddToCartRequest(state),
        cartRecordsRequest: selectGetCartRecordsRequest(state),
        cartRecords: selectCartRecords(state),
        auth: state.auth
    }),
    (dispatch) => ({
        getCartRecords: () => { dispatch(getCartRecords()) },
    })
)(SubHeader);

export default withRouter(translate("translation")(SubHeader));


