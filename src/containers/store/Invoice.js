import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {Step, StepLabel, Stepper} from '@material-ui/core';
import {getInvoice} from '../../redux/payments/actions';
import {invoiceRequest} from '../../redux/payments/selectors';
import {Price} from '../../components/ui/Price';
import {InvoiceNo} from "../../components/ui/InvoiceNo";
import {Loader} from "../../components/ui/Loader";

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
    const address = ['Address2', 'Address2', 'Country', 'Region', 'City', 'Zip'];
    return address.map((item, index) => (
        <p key={index} className="mb-1">{data.get(`${prefix}${item}`)}</p>
      )
    );
  }

  _renderItems(invoice) {
    const {t} = this.props;
    const items = invoice.get('items');
    return items.map((item, key) => (
      <div key={key} className="row my-3">
        <div className="col-6 text-left d-flex align-items-center">
            <div>                        
                <strong>{item.get('title')}</strong>            
                <div className="text-muted">
                    {item.get('quantity')} {t('items')}
                </div>
            </div>
            {(item.get('isDigitalOnly') && (invoice.get('authorizedAt') || item.get('isFree'))) &&
            <a title={t('downloadPdf')} rel="noopener noreferrer" className="btn btn-success m-btn--icon-only mx-3" href={item.get('downloadUrl')}>
                <i className="fa fa-download text-white"></i>
            </a>}
        </div>
        <div className="col-6 text-right align-self-center">
            <strong className="text-nowrap d-block"><Price price={item.get('totalPrice')} currency={item.get('currency')} /></strong>
            {(item.get('affiliate_discount') > 0) && <span className="text-nowrap text-success d-block">- <Price price={item.get('affiliateDiscount')} currency={item.get('currency')} /></span>}
        </div>
      </div>
    ));
  }
  
  _renderInvoice(invoice)
  {
      const {t} = this.props;
  
      return <div className="col-md-12 m-auto">
        <span className="invoice-title">
            <InvoiceNo number={invoice.get('invoiceNo')} amount={invoice.get('total')} currency={invoice.get('currency')} />
        </span>
        <div>
            <p className="text-center m-4">
                <a rel="noopener noreferrer" className="btn btn-success" href={invoice.get('pdfUrl')} target="_blank">{t('downloadPdf')}</a>
            </p>
        </div>
        {(!invoice.get('isFree')) && <hr />}
        {(!invoice.get('isFree')) &&        
        <div className="row">
            {(!invoice.get('isDigital')) &&  
            <div className="col-12 col-sm-6">
                <h3 className="m-portlet__head-text">{t('shipTo')}</h3>
                {this._renderAddress(invoice, 'shipping')}
            </div>}
            <div className="col-12 col-sm-6">
                <h3 className="m-portlet__head-text">{t('billTo')}</h3>
                {this._renderAddress(invoice, 'billing')}
            </div>
        </div>}
        <div className="row my-2">
            <div className="col-12">
                <div className="my-3">
                    <span className="invoice-title">{t('orderDetails')}</span>
                </div>
                <div>
                    <hr />
                    {this._renderItems(invoice)}
                    <hr />
                    {(invoice.get('discount') > 0) &&
                    <div className="row my-2">
                        <div className="col-6">
                            <strong>{t('subtotal')}</strong>
                        </div>
                        <div className="col-6 text-right">
                            <strong className="text-nowrap"><Price price={invoice.get('subTotal')} currency={invoice.get('currency')} /></strong>
                        </div>
                    </div>}
                    {invoice.get('discountCode') &&
                    <div className="row my-2">
                        <div className="col-6">
                            <strong>{t('promocode')}</strong>
                        </div>
                        <div className="col-6 text-right">
                            <strong className="text-nowrap text-success">{invoice.get('discountCode')}</strong>
                        </div>
                    </div>}
                    {(invoice.get('discount') > 0) &&
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
  
  _renderStepper(invoice) {
        const {t} = this.props;
        
        if (invoice.get('isDigital')) {
            return <Stepper activeStep={3} alternativeLabel className="g-stepper">
                <Step>
                    <StepLabel>{t('signUp')}</StepLabel>
                </Step>
                {(!invoice.get('isFree')) && 
                <Step>
                    <StepLabel>{t('billing')}</StepLabel>
                </Step>}
                <Step>
                    <StepLabel>{t('download')}</StepLabel>
                </Step>
            </Stepper>;            
        }
        return <Stepper activeStep={3} alternativeLabel className="g-stepper">
            <Step>
                <StepLabel>{t('shipping')}</StepLabel>
            </Step>            
            <Step>
                <StepLabel>{t('billing')}</StepLabel>
            </Step>
            <Step>
                <StepLabel>{t('confirmation')}</StepLabel>
            </Step>
        </Stepper>;
  }
  
  render() {
    const {invoiceRequest} = this.props;
    
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
                            {this._renderStepper(invoice)}
                            <div className='m-5'>
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

export default withRouter(withTranslation('translations')(connect(
  (state) => ({
    invoiceRequest: invoiceRequest(state)
  }),
  (dispatch) => ({
    getInvoice: (id, hash) => dispatch(getInvoice(id, hash))
  })
)(Invoice)));