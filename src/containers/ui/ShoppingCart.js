import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectCartRecordsCount} from "../../redux/store/selectors";
import {NavLink} from "react-router-dom";

class ShoppingCart extends Component {    
    render() {
        const {cartRecordsCount} = this.props;
        
        return (
            <li className="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width">
                <NavLink to='/store/shopping-cart' className='m-nav__link m-dropdown__toggle pointer' id='m_topbar_notification_icon'>
                    <span className='m-nav__link-icon'>
                        <i className="fa fa-shopping-cart PageHeader-icon"></i>
                    </span>
                </NavLink>
                        {cartRecordsCount > 0 && <span className="g-badge badge-red">{cartRecordsCount}</span> }
            </li>
        );
    }
}

ShoppingCart = connect(
    (state) => ({        
        cartRecordsCount: selectCartRecordsCount(state)
    }),
    (dispatch) => ({})
)(ShoppingCart);

export default ShoppingCart
