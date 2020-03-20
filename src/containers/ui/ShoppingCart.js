import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from "react-router-dom";
import {selectCartRecordsCount} from "../../redux/store/selectors";
import {getCartRecords} from '../../redux/store/actions';

class ShoppingCart extends Component {
    
    componentDidMount() {                
        const {cartRecordsCount, auth, getRecords, location} = this.props;                
        
        if (cartRecordsCount === null && !auth.get('isLoggedIn') && location.pathname !== '/store/shopping-cart') {            
            getRecords();
        }
    }  
    
    render() {
        const {cartRecordsCount} = this.props;
        
        return (
            <li className="m-nav__item m-topbar__notifications m-topbar__notifications--img">
                <NavLink to='/store/shopping-cart' className='m-nav__link' id='m_topbar_notification_icon'>
                    <span className='m-nav__link-icon'>
                        <i className="fa fa-shopping-cart"></i>
                    </span>
                </NavLink>
                {cartRecordsCount > 0 && <span className="g-badge badge-red">{cartRecordsCount}</span> }
            </li>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        auth: state.auth,        
        cartRecordsCount: selectCartRecordsCount(state)
    }),
    (dispatch) => ({
        getRecords: () => { dispatch(getCartRecords()) }
    })
)(ShoppingCart));
