import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../../styles/store.css'
import {withRouter} from 'react-router-dom';
import {getInvoice} from '../../../../redux/payments/actions';
import {invoiceRequest} from '../../../../redux/payments/selectors';
import {login, setRedirectUrl} from "../../../../redux/auth/actions";
import Typography from '@material-ui/core/Typography';

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

  _renderAddress(data, prefix) {   
    const address = ['address_1', 'address_2', 'country', 'region', 'city', 'zip'];
    return address.map((item, index) =>
      (
        <Typography key={index} variant="subheading" gutterBottom>
          {data.get(`${prefix}_${item}`)}
        </Typography>
      )
    );
  }
  
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

  _renderItems(invoice) {
    const {t} = this.props;
    const items = invoice.get('items');
    return items.map((item, key) => (
      <div key={key} className="m-widget4__item">

        <div className="m-widget4__info">
            <span className="m-widget4__title">
                {item.get('title')}
            </span> <br/>
            <span className="m-widget4__sub">
                {item.get('quantity')} {t('items')}
            </span>
        </div>
        <span className="m-widget4__ext">
            <span className="m-widget4__number m--font-danger">${item.get('total_price')}</span>
          </span>
      </div>
    ));
  }
  
  render() {
    const {invoiceRequest, t} = this.props;
    const invoice = invoiceRequest.get('data');
    const distributor = invoice ? invoice.get('distributor') : null;
    return (
      <div className="row">
        <div className="col-md-10 m-auto">
          {invoice &&
            <div className="m-widget25">
                <span className="invoice-title">
                    {t('yourInvoice', {invoiceNo: invoice.get('invoice_no'), invoiceAmount: ('$' + invoice.get('total'))})}.
                </span>                
                <p className="text-center">
                    <a className="btn btn-success" href={invoice.get('pdf_url')} target="_blank">{t('downloadPdf')}</a>
                </p>
            </div>
          }
        </div>
        {distributor &&
        <div className="col-md-10 m-auto">
            <div className="row">
              <div className="col-4">
                {t('mailChequeTo')}:
                <br/>
                <span className="d-block">{distributor.get('company')}</span>
                <span className="d-block">{distributor.get('address_1')}</span>
                <span className="d-block">{distributor.get('city')}, {distributor.get('region')}, {distributor.get('country')}</span>
              </div>
              <div className="col-4">
                {t('wireTransferTo')}:
                <br/>
                {distributor.get('bank_details')}
              </div>
              <div className="col-4">
                {t('interactPayment')}
                <span className="d-block">{t('emailToDistributor', {email: distributor.get('email')})}</span>
                <span className="d-block">
                </span>
              </div>
            </div>
        </div>
        }
        {invoice &&
          <div className="col-md-10 m-auto">
            <div className="m-portlet m-portlet--bordered-semi">
              <div className="m-portlet__body">
                <div className="m-widget4 col-md-10 m-auto">
                  <div className="row">
                    <div className="col-md-6">
                      <div>
                      </div>
                      <h3 className="m-portlet__head-text">
                        {t('billTo')}
                      </h3>
                      {this._renderAddress(invoice, 'billing')}
                    </div>
                    <div className="col-md-6">
                      <h3 className="m-portlet__head-text">
                        {t('shipTo')}
                      </h3>
                      {this._renderAddress(invoice, 'shipping')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {invoice &&
            <div className="col-md-10 m-auto">
                <div className="m-portlet m-portlet--bordered-semi cartItems">
                  <div className="m-portlet__body">
                    <div className="m-widget25">
                      <Typography variant="title" gutterBottom>
                      </Typography>
                      <span className="invoice-title">{t('orderDetails')}</span>
                    </div>
                    <div className="m-widget4 col-md-7 m-auto">
                        {this._renderItems(invoice)}
                    </div>
                  </div>
                </div>        
            </div>
        }
      </div>
    );
  }
}

PaymentSuccessContainer = connect(
  (state) => ({
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

export default withRouter(translate('translations')(PaymentSuccessContainer));