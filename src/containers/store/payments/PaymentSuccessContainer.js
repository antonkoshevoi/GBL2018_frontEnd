import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../styles/store.css'
import {getInvoice} from '../../../redux/payments/actions';
import {invoiceRequest} from '../../../redux/payments/selectors';
import {Price} from '../../../components/ui/Price';
import Loader from "../../../components/layouts/Loader";
import {renderToString} from 'react-dom/server'
import Typography from '@material-ui/core/Typography';

class PaymentSuccessContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {    
    this.props.getInvoice();
  }

  _renderAddress(data, prefix) {   
    const address = ['address_1', 'address_2', 'country', 'region', 'city', 'zip'];
    return address.map((item, index) => (
        <Typography key={index} variant="body1" gutterBottom>
          {data.get(`${prefix}_${item}`)}
        </Typography>
      )
    );
  }

  _renderItems(invoice) {
    const {t} = this.props;
    const items = invoice.get('items');
    return items.map((item, key) => (
      <div key={key} className="row">
        <div className="col-6 text-center">
            <div>
                <strong>
                    {item.get('title')}
                </strong>
            </div>
            <span className="text-muted">
                {item.get('quantity')} {t('items')}
            </span>
        </div>
        <div className="col-6 text-center align-self-center">
            <strong className="text-nowrap m--font-danger"><Price price={item.get('total_price')} currency={item.get('currency')} /></strong>
        </div>
      </div>
    ));
  }
  
  render() {
    const {invoiceRequest, t} = this.props;
    
    if (!invoiceRequest.get('success')) {
        return <Loader />;
    }
    
    const invoice = invoiceRequest.get('data');    
    
    return (
      <div className="row">
        {invoice &&
        <div className="col-md-10 m-auto">
            <div>
                <span className="invoice-title">
                    {t('yourInvoice', {invoiceNo: invoice.get('invoice_no'), invoiceAmount: renderToString(<Price price={invoice.get('total')} currency={invoice.get('currency')} />)})}.
                </span>                
                <p className="text-center m--margin-15">
                    <a rel="noopener noreferrer" className="btn btn-success" href={invoice.get('pdf_url')} target="_blank">{t('downloadPdf')}</a>
                </p>
            </div>
            <div className="m-portlet m-portlet--bordered-semi">
              <div className="m-portlet__body m--padding-top-25">
                <div className="col-md-10 m-auto">
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
                    <div className="row my-2">
                        <div className="col-md-10 m-auto cartItems m--margin-15">
                            <div>
                              <span className="invoice-title">{t('orderDetails')}</span>
                            </div>
                            <div className="col-12 col-sm-12 col-md-10 col-lg-7 m-auto">
                                {this._renderItems(invoice)}
                            </div>        
                        </div>
                    </div>
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
    getInvoice: () => dispatch(getInvoice())
  })
)(PaymentSuccessContainer);

export default translate('translations')(PaymentSuccessContainer);