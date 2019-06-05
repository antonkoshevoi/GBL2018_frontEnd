import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import OpenInvoicesTable from '../../../components/store/OpenInvoicesTable';
import { deleteFromCartRequest, selectGetCartRecordsRequest } from '../../../redux/store/selectors';
import { deleteCartRecord, getCartRecords, setItemQuantity } from '../../../redux/store/actions';
import { NavLink } from 'react-router-dom';
import Loader from '../../../components/layouts/Loader';

import { CircularProgress } from '@material-ui/core';

class ShoppingCart extends Component {
    componentDidMount() {        
        this.props.getRecords();   
    }

    render() {
        const {            
            cartRecordsRequest,
            deleteRequest,
            t
        } = this.props;                 
        
        return (
            <div>
                {deleteRequest.get('loading') && <Loader />}
                <div className='block-header border-b-green'>                                                      
                    <h3 className='m-portlet__head-text'>{t('shoppingCart')}</h3>
                </div>          
                <div className="m-portlet m-portlet--full-heigh">
                    <div className="m-portlet__body dashboard-shopping-cart-body">
                    {cartRecordsRequest.get('loading') ? <CircularProgress className="m--margin-70"/> : 
                        <div>                            
                            <OpenInvoicesTable
                                preview = {true}
                                sum={cartRecordsRequest.get('totalPrice')}
                                setQuantity={(data) => this.props.setQuantity(data)}                                
                                onDelete={(id) => this.props.deleteCartRecord(id)}
                                data={cartRecordsRequest.get('records').toJS()}
                            />
                            {cartRecordsRequest.get('records').size > 0 &&
                            <div className="row">
                                <div className="col-md-12 text-right m--margin-bottom-10">
                                    <div className="form-group-inline btn-group">
                                        <NavLink to="/store/shopping-cart" className="btn m-btm btn-primary smaller-padding">{t('viewCart')}</NavLink>
                                        <NavLink to="/shopping/checkout" className="btn m-btm btn-success smaller-padding">{t('checkout')}</NavLink>
                                    </div>
                                </div>
                            </div>}
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}

ShoppingCart = connect(
    (state) => ({
        cartRecordsRequest: selectGetCartRecordsRequest(state),        
        deleteRequest: deleteFromCartRequest(state),
    }),
    (dispatch) => ({
        getRecords: () => {
            dispatch(getCartRecords())
        },
        deleteCartRecord: (id) => {
            dispatch(deleteCartRecord(id))
        },
        setQuantity: (data) => {
            dispatch(setItemQuantity(data))
        }
    })
)(ShoppingCart);

export default withTranslation('translations')(ShoppingCart);