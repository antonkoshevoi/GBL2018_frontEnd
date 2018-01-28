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

class PaymentSuccessContainer extends Component {

  render() {
    return (
      <h3 className="display-3">
        <i className="la la-check-circle" style={{
          color: '#7ac943',
          fontSize: '100px'
        }}/>
        Your payment was successful
      </h3>
    );
  }
}

PaymentSuccessContainer = connect(
  (state) => ({
  }),
  (dispatch) => ({
  })
)(PaymentSuccessContainer);

export default withRouter(translate('PaymentSuccessContainer')(PaymentSuccessContainer));