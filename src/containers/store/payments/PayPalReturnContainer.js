import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import '../../../styles/store.css'
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import * as queryString from 'query-string';
import { executePayPalPayment } from '../../../redux/payments/actions';
import Loader from '../../../components/layouts/Loader';
import { selectExecutePayPalPaymentRequest } from '../../../redux/payments/selectors';

class PayPalReturnContainer extends Component {

  componentDidMount() {
    const { location, history, executePayPalPayment } = this.props;
      if (!location.search) {
          history.push('/login')
      }
      const parsed = queryString.parse(location.search);
      executePayPalPayment(parsed);
  }

  componentWillReceiveProps (nextProps) {
    this._handleExecuteResults(nextProps);
  }

  _handleExecuteResults (nextProps) {
    const success = this.props.executePayPalPaymentRequest.get('success');
    const nextSuccess = nextProps.executePayPalPaymentRequest.get('success');

    if (!success && nextSuccess) {
      const data = nextProps.executePayPalPaymentRequest.get('data').toJS();      
      if (!data.isDigital) {
        this.props.goTo(`/shopping/checkout/${data.invoiceNo}/${data.hash}`);
      }      
    }

    const fail = this.props.executePayPalPaymentRequest.get('fail');
    const nextFail = nextProps.executePayPalPaymentRequest.get('fail');

    if (!fail && nextFail) {
      this.props.goTo('/payments/fail');
    }
  }

  render() {
    return (
      <Loader type="initial"/>
    );
  }
}

PayPalReturnContainer = connect(
  (state) => ({
    executePayPalPaymentRequest: selectExecutePayPalPaymentRequest(state)
  }),
  (dispatch) => ({
    executePayPalPayment: (data) => { dispatch(executePayPalPayment(data)) },
    goTo: (url) => { dispatch(push(url)) }  
  })
)(PayPalReturnContainer);

export default withRouter(withTranslation('PayPalReturnContainer')(PayPalReturnContainer));