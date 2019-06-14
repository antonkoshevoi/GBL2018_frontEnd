import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation, Trans} from 'react-i18next';
import {selectGetCartRecordsRequest} from '../../redux/store/selectors';
import {getCartRecords} from '../../redux/store/actions';
import {withRouter, NavLink} from 'react-router-dom';
import {push} from 'react-router-redux';
import {selectCreateCheckPaymentRequest, selectCreatePayPalPaymentRequest, selectCreateCreditCardPaymentRequest} from '../../redux/payments/selectors';
import {createCheckPayment, createPayPalPayment, createCreditCardPayment, resetCreditCardPayment} from '../../redux/payments/actions';
import {selectAddressesRequest} from "../../redux/store/selectors";
import {getAddresses} from "../../redux/store/actions";
import {Step, StepLabel, Stepper, CircularProgress} from '@material-ui/core';
import Shipping from "./sections/Shipping";
import Billing from "./sections/Billing";
import CreditCard from "./sections/CreditCard";
import Loader from "../../components/layouts/Loader";

import '../../styles/store.css'

class Checkout extends Component {

  state = {   
    stepIndex: 0,
    paymentMethod: null,
    showCreditCard: false,    
    billingAddress: {},
    shippingAddress: {}
  };

  componentDidMount() {            
    this.props.getAddresses();
    this.props.getCartRecords();     
  }

  componentWillReceiveProps(nextProps) {
    this._handlePayPalPaymentCreated(nextProps);
    this._handleCheckPaymentCreated(nextProps);
    this._handleCCPaymentCreated(nextProps);
    this._handleCheckPaymentFailed(nextProps);  
    this._handleAddresses(nextProps);
  }  
  
  _handleAddresses(nextProps) {    
    const record = nextProps.addressesRequest.get('records');    
    if (record && record.size){
      this.setState({
        ...this.state, ...record.toJS(),
      })
    }  
  } 
  
  _setShipping (params = {}) {
    this.setState({
      ...this.state,
      stepIndex: 1,
      shippingAddress: params
    });
  };
  
  _setBilling(params = {}) {
    this.setState({
        billingAddress: params.billingAddress,
        paymentMethod: params.paymentMethod
    }, function () {        
        const data = {
            billingAddress: this.state.billingAddress,
            shippingAddress: this.state.shippingAddress
        }
    
        switch (this.state.paymentMethod) {
          case 'check':
            this.props.createCheckPayment(data);
            break;

          case 'payPal':
            this.props.createPayPalPayment(data);
            break;

          case 'creditCard':
            this.setState({
              showCreditCard: true
            });
            break;
          default:
            return;
        }
    });
  };
  
  _makeCreditCardPayment(params = {}) {
    const { cartRecordsRequest, createCreditCardPayment } = this.props;
  
    params.billingAddress   = this.state.billingAddress;
    params.shippingAddress  = this.state.shippingAddress;
    params.paymentAmount    = cartRecordsRequest.get('totalPrice');
      
    createCreditCardPayment(params);        
  };
 
  _handleBack() {
    const {stepIndex, showCreditCard} = this.state;
    if (stepIndex < 1) {
        return false;
    }    
    if (showCreditCard) {
      return this.setState({
        showCreditCard: false
      });
    }
    return this.setState({
      stepIndex: stepIndex - 1
    });
  };

  _handlePayPalPaymentCreated(nextProps) {
    if (!this.props.paypalRequest.get('success') && nextProps.paypalRequest.get('success')) {      
      window.location = nextProps.paypalRequest.get('approvalUrl');
    }
  }
  
  _handleCCPaymentCreated(nextProps){
    if (!this.props.creditCardRequest.get('success') && nextProps.creditCardRequest.get('success')) {
      this.props.resetCreditCardPayment();
      this._goToSuccessPage(nextProps.creditCardRequest.get('data').toJS());
    }
  }  

  _handleCheckPaymentCreated(nextProps) {
    if (!this.props.checkRequest.get('success') && nextProps.checkRequest.get('success')) {                
      this._goToSuccessPage(nextProps.checkRequest.get('data').toJS());
    }
  }

  _handleCheckPaymentFailed(nextProps) {
    if (!this.props.checkRequest.get('fail') && nextProps.checkRequest.get('fail')) {
      this.props.goToFailPage();
    }
  }
  
  _goToSuccessPage(data) {
      const {invoiceNo, hash} = data;
      this.props.goToSuccessPage(invoiceNo, hash);
  }
  
  _renderCheckoutSteps(stepIndex) {
    const { showCreditCard } = this.state;
    
    const {
      addressesRequest,
      cartRecordsRequest,
      checkRequest,
      creditCardRequest,
      paypalRequest,
      t
    } = this.props;
        
    const success = cartRecordsRequest.get('success') && addressesRequest.get('success');
    const loading = checkRequest.get('loading') || paypalRequest.get('loading') || creditCardRequest.get('loading') || paypalRequest.get('success');    
    
    if (!success) {
        return <div className="d-flex justify-content-center m--margin-top-100 m--margin-bottom-100">
            <CircularProgress color="primary" size={80}/>
        </div>;
    }
    
    return <div className="m--margin-bottom-50">
        {loading && <Loader/>}
        {cartRecordsRequest.get('totalPrice') > 0 ?  
            <div>
                <span className="invoice-title mb-5">
                    <Trans i18nKey="translations:yourInvoice">
                        <span className="m--font-bolder">{{invoiceNo: cartRecordsRequest.get('invoiceNo')}}</span>
                        <span className="m--font-bolder">{{invoiceAmount: ('$' + cartRecordsRequest.get('totalPrice').toFixed(2) + ' ' + cartRecordsRequest.get('currency'))}}</span>
                    </Trans>
                </span>
                {[
                    <Shipping onDataSaved={(params) => this._setShipping(params)} data={this.state.shippingAddress} />,                    
                    <div>
                        {showCreditCard ? 
                            <CreditCard 
                                onDataSaved={(params) => this._makeCreditCardPayment(params)} 
                                goBack={() => this._handleBack()} 
                                errors={creditCardRequest.get('errors')} /> 
                            : 
                            <Billing 
                                onDataSaved={(params) => this._setBilling(params)} 
                                goBack={() => this._handleBack()} 
                                shippingAddress={this.state.shippingAddress} 
                                billingAddress={this.state.billingAddress} />
                        }
                    </div>
                ][stepIndex]}
            </div>
        : 
            <div>
                <p className="text-center">
                    <span className="invoice-title">{t('yourCartIsEmpty')}</span>
                </p>
                <p className="text-center m--margin-top-100 m--margin-bottom-100">
                    <NavLink to="/store" className="btn m-btm btn-primary">{t('continueShopping')}</NavLink>
                </p>
            </div>
        }
        </div>;
  }
  
  render() {
    const { stepIndex } = this.state;
    const { t } = this.props;
    return (      
        <div className='row-14 d-flex justify-content-center m--margin-top-30'>
          <div className="col-12 col-sm-11 col-md-9 col-xl-8">                       
            <div className="m-portlet  m-portlet--head-solid-bg">
              <div className='m-portlet__body position-relative'>               
                <Stepper activeStep={stepIndex} alternativeLabel className="g-stepper">
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
                    {this._renderCheckoutSteps(stepIndex)}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Checkout = connect(
  (state) => ({
    cartRecordsRequest: selectGetCartRecordsRequest(state),
    addressesRequest: selectAddressesRequest(state),
    paypalRequest: selectCreatePayPalPaymentRequest(state),
    checkRequest: selectCreateCheckPaymentRequest(state),
    creditCardRequest: selectCreateCreditCardPaymentRequest(state)    
  }),
  (dispatch) => ({
    getCartRecords:             () => {dispatch(getCartRecords())},
    getAddresses:               () => {dispatch(getAddresses())},
    createPayPalPayment:        (data) => {dispatch(createPayPalPayment(data))},
    createCheckPayment:         (data) => {dispatch(createCheckPayment(data))},
    createCreditCardPayment:    (data) => dispatch(createCreditCardPayment(data)),
    resetCreditCardPayment:     () => dispatch(resetCreditCardPayment()),    
    goToFailPage:               () => {dispatch(push('/payments/fail'))},
    goToSuccessPage:            (id, hash) => { dispatch(push(`/shopping/checkout/${id}/${hash}`)) },
  })
)(Checkout);

export default withRouter(withTranslation('translations')(Checkout));