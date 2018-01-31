import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import ShoppingCartTable from "../../../../components/pages/store/ShoppingCartTable";

import {
  deleteFromCartRequest,
  selectCartRecords, selectCartRecordsSum, selectGetCartRecordsRequest,
} from "../../../../redux/store/selectors";
import {
  addToCarts, calculateCartSum, deleteCartRecord, getCartRecords, getRecords,
  getSingleRecord, updateShoppingCart
} from "../../../../redux/store/actions";
import {withRouter} from "react-router-dom";
import Loader from "../../../../components/layouts/Loader";

class ShoppingCart extends Component {

    componentDidMount() {

      const { records } = this.props;
      if (records.size === 0) {
        this._getRecords();
      }
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
        this.props.updateData(data)
        this._calculateSum(data);
    }

    render() {

        const {records, cartRecordsRequest,deleteFromCartRequest,cartRecordsSum} = this.props;
        const loading = cartRecordsRequest.get('loading');
        const success = cartRecordsRequest.get('success');


        return (
            <div>
                {loading &&
                <Loader/>}
              <div className="row">
                  <div className="col-xl-9 shoppingCartPortlet m-auto">
                      <div className="m-portlet m-portlet--full-height ">
                          <div className="m-portlet__head">
                              <div className="m-portlet__head-caption">
                                  <div className="m-portlet__head-title">
                                      <h3 className="m-portlet__head-text">
                                          Shopping Cart
                                      </h3>
                                  </div>
                              </div>

                          </div>
                          <div className="m-portlet__body">
                              {success &&
                             <ShoppingCartTable sum={cartRecordsSum} onUpdate={(data,total) => {this._updateData(data,total)}} onDelete={(id) => {this._deleteRecordFromCart (id)}} data={records.toJS()}/> }
                          </div>
                      </div>
                  </div>
              </div>

            </div>
        );
    }
}

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
        updateData: (data,total) => { dispatch(updateShoppingCart(data,total)) },
    })
)(ShoppingCart);


export default withRouter(translate("ShoppingCart")(ShoppingCart));