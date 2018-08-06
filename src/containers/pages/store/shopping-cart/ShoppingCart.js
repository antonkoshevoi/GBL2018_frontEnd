import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';

import OpenInvoicesTable from '../../../../components/pages/store/OpenInvoicesTable';

import {
  deleteFromCartRequest, selectAddToCartRequest,
  selectCartRecords, selectCartRecordsSum, selectGetCartRecordsRequest,
} from '../../../../redux/store/selectors';
import {
  calculateCartSum, deleteCartRecord, getCartRecords, setItemQuantity,
  updateShoppingCart
} from '../../../../redux/store/actions';
import {withRouter,NavLink} from 'react-router-dom';
import Loader from '../../../../components/layouts/Loader';

class ShoppingCart extends Component {


  componentDidMount() {
    const { records } = this.props;

    this._getRecords();

    this._calculateSum(records.toJS());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.records.size !== this.props.records.size) {
      this._updateData(nextProps.records);
      this._calculateSum(nextProps.records.toJS());
    }
  }

  _getRecords() {
    this.props.getRecords();
  }

  _deleteRecordFromCart(id) {
    this.props.deleteCartRecord(id);
  }

  _calculateSum(data){
    this.props.calculateSum(data);
  }

  _updateData(data) {
    this.props.updateData(data);
    this._calculateSum(data);
  }

  render() {
    const {
      records,
      cartRecordsRequest,
      cartRecordsSum ,
      cartRequest,
      preview,
      deleteRequest,
      t
    } = this.props;
    const loading = cartRecordsRequest.get('loading') || cartRequest.get('loading') || deleteRequest.get('loading');
    const success = cartRecordsRequest.get('success');
    return (
      <div>
        {loading && <Loader/>}
        <div className='row'>
          <div className={`shoppingCartPortlet m-auto col-xl-${preview ? '12': '9'}`} >
            <div className='m-portlet m-portlet--full-height dashboard-shopping-cart-transparent-bg'>
              <div className='m-portlet__head m--margin-top-20'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                    <span className="m-portlet__head-icon">
                        <i className="fa fa-shopping-cart"></i>
                    </span>
                    <h3 className='m-portlet__head-text'>
                      {preview ? t('ourAccount') : t('shoppingCart')}
                    </h3>
                  </div>
                </div>

              </div>
              <div className={`m-portlet__body dashboard-shopping-cart-body ${preview ? 'zoom-preview': ''}`}>
                {success &&
                 <OpenInvoicesTable
                   preview = {preview}
                   sum={cartRecordsSum}
                   setQuantity={(data) => this.props.setQuantity(data)}
                   onUpdate={(data,total) => {this._updateData(data,total)}}
                   onDelete={(id) => {this._deleteRecordFromCart (id)}}
                   data={records.toJS()}
                 />
                }
              </div>
              {preview &&
              <div className="row d-flex justify-content-end dashboard-shopping-cart-buttons">
                <div className="col-md-4 d-flex justify-content-end align-items-center">
                  <div className="form-group-inline btn-group">
                    <NavLink to="/store/shopping-cart" className="btn m-btm btn-primary smaller-padding">{t('viewCart')}</NavLink>
                    <NavLink to="/shopping/checkout" className="btn m-btm btn-success smaller-padding">{t('checkout')}</NavLink>
                  </div>
                </div>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  preview: PropTypes.bool
};

ShoppingCart.defaultProps = {
  preview: false
};

ShoppingCart = connect(
  (state) => ({
    cartRecordsRequest: selectGetCartRecordsRequest(state),
    deleteFromCartRequest: deleteFromCartRequest(state),
    cartRecordsSum: selectCartRecordsSum(state),
    records: selectCartRecords(state),
    cartRequest: selectAddToCartRequest(state),
    deleteRequest: deleteFromCartRequest(state),
  }),
  (dispatch) => ({
    getRecords: () => { dispatch(getCartRecords()) },
    deleteCartRecord: (id) => { dispatch(deleteCartRecord(id)) },
    calculateSum: (data) => { dispatch(calculateCartSum(data)) },
    updateData: (data) => { dispatch(updateShoppingCart(data)) },
    setQuantity: (data) => { dispatch(setItemQuantity(data))  },
  })
)(ShoppingCart);

export default withRouter(translate('translations')(ShoppingCart));