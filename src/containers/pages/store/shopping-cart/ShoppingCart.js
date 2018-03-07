import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';

import OpenInvoicesTable from '../../../../components/pages/store/OpenInvoicesTable';

import {
  deleteFromCartRequest,
  selectCartRecords, selectCartRecordsSum, selectGetCartRecordsRequest,
} from '../../../../redux/store/selectors';
import {
  calculateCartSum, deleteCartRecord, getCartRecords,
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
    const { records, cartRecordsRequest, cartRecordsSum ,preview} = this.props;
    const loading = cartRecordsRequest.get('loading');
    const success = cartRecordsRequest.get('success');
    console.log(preview);
    return (
      <div>
        {loading && <Loader/>}
        <div className='row'>
          <div className={`shoppingCartPortlet m-auto col-xl-${preview ? '12': '9'}`} >
            <div className='m-portlet m-portlet--full-height '>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                    <h3 className='m-portlet__head-text'>
                      {preview ? 'Our Account' : 'Shopping Cart'}
                    </h3>
                  </div>
                </div>

              </div>
              <div className={`m-portlet__body ${preview ? 'zoom-preview': ''}`}>
                {success &&
                 <OpenInvoicesTable
                   preview = {preview}
                   sum={cartRecordsSum}
                   onUpdate={(data,total) => {this._updateData(data,total)}}
                   onDelete={(id) => {this._deleteRecordFromCart (id)}}
                   data={records.toJS()}
                 />
                }
              </div>
              <div className="row d-flex justify-content-end ">
                <div className="col-md-4 d-flex justify-content-end align-items-center">
                  <div className="form-group-inline btn-group">
                    <NavLink to="/store/shopping-cart" className="btn m-btm btn-primary">View Card</NavLink>
                    <NavLink to="/shopping/checkout" className="btn m-btm btn-success">Checkout</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  preview: PropTypes.boolean
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
  }),
  (dispatch) => ({
    getRecords: () => { dispatch(getCartRecords()) },
    deleteCartRecord: (id) => { dispatch(deleteCartRecord(id)) },
    calculateSum: (data) => { dispatch(calculateCartSum(data)) },
    updateData: (data) => { dispatch(updateShoppingCart(data)) },
  })
)(ShoppingCart);

export default withRouter(translate('OpenInvoices')(ShoppingCart));