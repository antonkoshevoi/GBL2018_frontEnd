import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation, Trans} from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {getInvoice} from '../../redux/payments/actions';
import {invoiceRequest} from '../../redux/payments/selectors';
import {Price} from '../../components/ui/Price';
import Loader from "../../components/layouts/Loader";
import {Step, StepLabel, Stepper, Typography, CircularProgress} from '@material-ui/core';
import {renderToString} from 'react-dom/server'

class Invoice extends Component {

  constructor(props) {
    super(props);           
    this.state = {};
  }

  componentDidMount() {      
    const {invoiceNo, hash} = this.props.match.params;
    this.props.getInvoice(invoiceNo, hash);
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
                <strong>{item.get('title')}</strong>
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
  
  _renderInvoice(invoice)
  {
      const {t} = this.props;
  
      return <div className="col-md-10 m-auto">
            <span className="invoice-title">
                <Trans i18nKey="translations:yourInvoice">
                    <span className="m--font-bolder">{{invoiceNo: invoice.get('invoice_no')}}</span>
                    <span className="m--font-bolder">{{invoiceAmount: renderToString(<Price price={invoice.get('total')} currency={invoice.get('currency')} />)}}</span>
                </Trans>
            </span>        
        <div>
            <p className="text-center m--margin-25">
                <a rel="noopener noreferrer" className="btn btn-success" href={invoice.get('pdf_url')} target="_blank">{t('downloadPdf')}</a>
            </p>
        </div>
        <div className="m-portlet m-portlet--bordered-semi mb-5">
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
                            <span className="invoice-title mb-3">{t('orderDetails')}</span>
                        </div>
                        <div>
                            {this._renderItems(invoice)}
                            <hr />
                            <div className="row">
                                <div className="col-6 text-center">
                                    <strong>{t('Total')}</strong>
                                </div>
                                <div className="col-6 text-center align-self-center">
                                    <strong className="text-nowrap m--font-danger"><Price price={invoice.get('total')} currency={invoice.get('currency')} /></strong>
                                </div>
                            </div>                                 
                        </div>        
                    </div>                            
                </div>
             </div>             
          </div>
        </div>
      </div>;
  }
  
  render() {
    const {invoiceRequest, t} = this.props;
    
    if (!invoiceRequest.get('success')) {
        return <Loader />;
    }
    
    const invoice = invoiceRequest.get('data');    
    
    return (      
        <div className='row-14 d-flex justify-content-center m--margin-top-30'>
          <div className="col-12 col-sm-11 col-md-9 col-xl-8">                       
            <div className="m-portlet  m-portlet--head-solid-bg">
              <div className='m-portlet__body position-relative'>               
                <Stepper activeStep={3} alternativeLabel className="g-stepper">
                  <Step>
                    <StepLabel>{t('shipping')}</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>{t('billing')}</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>{t('confirmation')}</StepLabel>
                  </Step>
                </Stepper>
                <div className="row d-flex justify-content-center">
                  <div className='col-10'>
                    {invoice ? this._renderInvoice(invoice) : <div className="d-flex justify-content-center m--margin-top-100 m--margin-bottom-100">
                        <CircularProgress color="primary" size={80}/>
                      </div>}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Invoice = connect(
  (state) => ({
    invoiceRequest: invoiceRequest(state)
  }),
  (dispatch) => ({
    getInvoice: (id, hash) => dispatch(getInvoice(id, hash))
  })
)(Invoice);

export default withRouter(withTranslation('translations')(Invoice));