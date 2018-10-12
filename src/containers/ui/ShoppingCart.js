import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getCartRecords} from "../../redux/store/actions";
import {selectCartRecords} from "../../redux/store/selectors";
import {NavLink} from "react-router-dom";

class ShoppingCart extends Component {

    componentDidMount() {
        this.props.getCartRecords();
    }

    render() {
        const {cartRecords} = this.props;

        return (
            <li className="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width">
                <NavLink to='/store/shopping-cart' className='m-nav__link m-dropdown__toggle pointer' id='m_topbar_notification_icon'>
                    <span className='m-nav__link-icon'>
                        <i className="fa fa-shopping-cart PageHeader-icon"></i>
                        {cartRecords.size > 0 && <span className="g-badge badge-red">{cartRecords.size}</span> }
                    </span>
                </NavLink>
            </li>
        );
    }
}

ShoppingCart = connect(
    (state) => ({
        cartRecords: selectCartRecords(state)
    }),
        (dispatch) => ({ getCartRecords: () => { dispatch(getCartRecords()) }
    })
)(ShoppingCart);

export default ShoppingCart
