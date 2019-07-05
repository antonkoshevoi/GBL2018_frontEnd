import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation, Trans} from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {getInvoice} from '../../redux/payments/actions';
import {invoiceRequest} from '../../redux/payments/selectors';
import {Price} from '../../components/ui/Price';
import Loader from "../../components/layouts/Loader";
import {Step, StepLabel, Stepper, Typography} from '@material-ui/core';
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
      <div key={key} className="row my-2">
        <div className="col-6 text-left">
            <div>
                <strong>{item.get('title')}</strong>
            </div>
            <span className="text-muted">
                {item.get('quantity')} {t('items')}
            </span>
        </div>
        <div className="col-6 text-right align-self-center">
            <strong className="text-nowrap d-block"><Price price={item.get('total_price')} currency={item.get('currency')} /></strong>
            {(item.get('affiliate_discount') > 0) && <span className="text-nowrap m--font-success d-block">- <Price price={item.get('affiliate_discount')} currency={item.get('currency')} /></span>}
        </div>
      </div>
    ));
  }
  
  _renderInvoice(invoice)
  {
      const {t} = this.props;
  
      return <div className="col-md-12 m-auto">
        <span className="invoice-title">
            <Trans i18nKey="translations:yourInvoice">
                <span className="m--font-bolder">{{invoiceNo: invoice.get('invoice_no')}}</span>
                <span className="m--font-bolder">{{invoiceAmount: renderToString(<Price price={invoice.get('total')} currency={invoice.get('currency')} />)}}</span>
            </Trans>
        </span>
        <div>
            <p className="text-center m-4">
                <a rel="noopener noreferrer" className="btn btn-success" href={invoice.get('pdf_url')} target="_blank">{t('downloadPdf')}</a>
            </p>
        </div>
        <hr />
        <div className="row">
            <div className="col-12 col-sm-6">
                <h3 className="m-portlet__head-text">{t('shipTo')}</h3>
                {this._renderAddress(invoice, 'shipping')}
            </div>
            {(invoice.get('total') > 0) &&
            <div className="col-12 col-sm-6">
                <h3 className="m-portlet__head-text">{t('billTo')}</h3>
                {this._renderAddress(invoice, 'billing')}
            </div>}
        </div>
        <div className="row my-2">
            <div className="col-12">
                <div className="my-3">
                    <span className="invoice-title">{t('orderDetails')}</span>
                </div>
                <div>
                    <hr />
                    {this._renderItems(invoice)}
                    <hr />
                    {invoice.get('discount') &&
                    <div className="row my-2">
                        <div className="col-6">
                            <strong>{t('subtotal')}</strong>
                        </div>
                        <div className="col-6 text-right">
                            <strong className="text-nowrap"><Price price={invoice.get('sub_total')} currency={invoice.get('currency')} /></strong>
                        </div>
                    </div>}
                    {invoice.get('discount_code') &&
                    <div className="row my-2">
                        <div className="col-6">
                            <strong>{t('promocode')}</strong>
                        </div>
                        <div className="col-6 text-right">
                            <strong className="text-nowrap">{invoice.get('discount_code')}</strong>
                        </div>
                    </div>}
                    {invoice.get('discount') &&
                    <div className="row my-2">
                        <div className="col-6">
                            <strong>{t('discount')}</strong>
                        </div>
                        <div className="col-6 text-right">
                            <strong className="text-nowrap"><Price price={invoice.get('discount')} currency={invoice.get('currency')} /></strong>
                        </div>
                    </div>}
                    <div className="row my-2">
                        <div className="col-6">
                            <strong>{t('Total')}</strong>
                        </div>
                        <div className="col-6 text-right">
                            <strong className="text-nowrap"><Price price={invoice.get('total')} currency={invoice.get('currency')} /></strong>
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
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-12 col-lg-10 col-xl-9 m-auto">
                    <div className="m-portlet m-portlet--head-solid-bg my-5">
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
                            <div className='p-5'>
                                {this._renderInvoice(invoice)}
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