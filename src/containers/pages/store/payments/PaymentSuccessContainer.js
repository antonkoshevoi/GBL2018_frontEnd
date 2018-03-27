import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../../styles/store.css'
import {withRouter} from 'react-router-dom';
import {push} from 'react-router-redux';
import * as queryString from 'query-string';
import {executePayPalPayment, getInvoice} from '../../../../redux/payments/actions';
import Loader from '../../../../components/layouts/Loader';
import {invoiceRequest, selectExecutePayPalPaymentRequest} from '../../../../redux/payments/selectors';
import {Button, Checkbox, CircularProgress, FormControlLabel, Typography} from "material-ui";
import {selectLoginRequest} from "../../../../redux/auth/selectors";
import {login, setRedirectUrl} from "../../../../redux/auth/actions";
import ServiceList from "../../../../components/pages/store/payment/ServiceList";
import CartItems from "../../../../components/pages/store/checkout/CartItems";
import InvoiceDetail from "../../../../components/pages/store/checkout/InvoiceDetail";

class PaymentSuccessContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false
    };
  }


  componentDidMount() {
    const {history} = this.props;
    this.props.getInvoice();

    if (history.action !== "PUSH") {
      history.push('/login')
    }
  }

  _handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  };
  _handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  };
  _handleRememberChange = (event) => {
    this.setState({remember: !this.state.remember});
  };

  _login() {
    const {setRedirectUrl, login} = this.props;
    const {username, password, remember} = this.state;
    let pathname = '/';
    try {
      pathname = this.props.location.pathname;
    } catch (e) {
    }

    setRedirectUrl(pathname);
    login(username, password, remember);
  }


  render() {

    const {auth, loginRequest, history, invoiceRequest} = this.props;
    const invoice = invoiceRequest.get('data');
    const isLoggedIn = auth.get('isLoggedIn');
    const loading = loginRequest.get('loading');
    const errors = loginRequest.get('errors');
    const distributor = invoice ? invoice.get('distributor') : null;
    return (
      <div className="row">
        <div className="col-md-10 m-auto">
          {/*<div className="m-portlet m--margin-top-35">*/}
            {/*<div className="m-portlet__body">*/}
              {/*<div className="alert m-alert m-alert--default">*/}
                {/*<h3 className="display-4 text-center">*/}
                  {/*<i className="la la-check-circle align-middle m--margin-right-20" style={{*/}
                    {/*color: '#7ac943',*/}
                    {/*fontSize: '100px'*/}
                  {/*}}/>*/}
                  {/*Your payment was successful*/}
                {/*</h3>*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</div>*/}
          {invoice &&
          <div className="m-widget25">
            <span className="invoice-title">Yor invoice #{invoice.get('invoice_no')} Total ${invoice.get('total')}</span>
          </div>
          }
        </div>
        {distributor &&
        <div className="col-md-10 m-auto">
            <div className="row">
              <div className="col-4">
                Mail Cheque to:
                <br/>
                <span className="d-block">{distributor.get('company')}</span>
                <span className="d-block">{distributor.get('address_1')}</span>
                <span className="d-block">{distributor.get('city')}, {distributor.get('region')}, {distributor.get('country')}</span>

              </div>
              <div className="col-4">
                Wire Transfer to:
                <br/>
                {distributor.get('bank_details')}
              </div>
              <div className="col-4">
                Interact payment
                <span className="d-block">Email to {distributor.get('email')}</span>
                <span className="d-block">

                </span>

              </div>
            </div>
        </div>
        }
        {invoice &&
        <div className="col-md-10 m-auto">
          <InvoiceDetail data={invoice}/>
        </div>
        }
        {invoice &&
        <div className="col-md-10 m-auto">
          <CartItems data={invoice}/>
        </div>
        }
      </div>
    );
  }
}

PaymentSuccessContainer = connect(
  (state) => ({
    loginRequest: selectLoginRequest(state),
    auth: state.auth,
    invoiceRequest: invoiceRequest(state)
  }),
  (dispatch) => ({
    login: (username, password, remember) => {
      dispatch(login(username, password, remember));
    },
    setRedirectUrl: (uri) => {
      dispatch(setRedirectUrl(uri));
    },
    getInvoice: () => dispatch(getInvoice())
  })
)(PaymentSuccessContainer);

export default withRouter(translate('PaymentSuccessContainer')(PaymentSuccessContainer));