import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import OpenInvoicesTable from '../../../../components/pages/store/OpenInvoicesTable';

import {
  deleteFromCartRequest,
  selectCartRecords, selectCartRecordsSum, selectGetCartRecordsRequest,
} from '../../../../redux/store/selectors';
import {
  calculateCartSum, deleteCartRecord, getCartRecords,
  updateShoppingCart
} from '../../../../redux/store/actions';
import {withRouter} from 'react-router-dom';
import Loader from '../../../../components/layouts/Loader';

class OpenInvoices extends Component {

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
    const { records, cartRecordsRequest, cartRecordsSum } = this.props;
    const loading = cartRecordsRequest.get('loading');
    const success = cartRecordsRequest.get('success');

    return (
      <div>
        {loading && <Loader/>}
        <div className='row'>
          <div className='col-xl-9 shoppingCartPortlet m-auto'>
            <div className='m-portlet m-portlet--full-height '>
              <div className='m-portlet__head'>
                <div className='m-portlet__head-caption'>
                  <div className='m-portlet__head-title'>
                    <h3 className='m-portlet__head-text'>
                      Shopping Cart
                    </h3>
                  </div>
                </div>

              </div>
              <div className='m-portlet__body'>
                {success &&
                 <OpenInvoicesTable
                   sum={cartRecordsSum}
                   onUpdate={(data,total) => {this._updateData(data,total)}}
                   onDelete={(id) => {this._deleteRecordFromCart (id)}}
                   data={records.toJS()}/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OpenInvoices = connect(
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
)(OpenInvoices);

export default withRouter(translate('OpenInvoices')(OpenInvoices));