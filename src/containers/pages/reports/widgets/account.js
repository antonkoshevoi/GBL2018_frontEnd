import React, {Component} from 'react';
import '../../../../styles/widgets.css';
import ShoppingCart from "../../store/shopping-cart/ShoppingCart";
import Card from "../../../../components/ui/Card";
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
import {withRouter,NavLink} from 'react-router-dom';
import Loader from '../../../../components/layouts/Loader';

export default class Account extends Component {

    render() {
        return (
          <div>
              <ShoppingCart preview = {true}/>
          </div>


        );
    }
}

Account = connect(
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
)(Account);
