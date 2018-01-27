import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../../styles/store.css'
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import * as queryString from 'query-string';
import { executePayPalPayment } from '../../../../redux/payments/actions';
import Loader from '../../../../components/layouts/Loader';
import { selectExecutePayPalPaymentRequest } from '../../../../redux/payments/selectors';

class PaymentFailedContainer extends Component {

  render() {
    return (
      <h3 className="display-3">
        <i className="la la-times" style={{
          color: 'rgb(210, 50, 45)',
          fontSize: '100px'
        }}/>
        Unfortunately your payment has failed
      </h3>
    );
  }
}

PaymentFailedContainer = connect(
  (state) => ({
  }),
  (dispatch) => ({
  })
)(PaymentFailedContainer);

export default withRouter(translate('PaymentFailedContainer')(PaymentFailedContainer));