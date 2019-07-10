import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
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
import Summary from "./sections/Summary";
import CreditCard from "./sections/CreditCard";
import Loader from "../../components/layouts/Loader";

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
    this._handleGetAddresses(nextProps);
    this._handleGetShoppingCart(nextProps);
    this._handlePayPalPayment(nextProps);    
    this._handleCheckPayment(nextProps);
    this._handleCreditCardPayment(nextProps);    
  }  
  
  _handleGetAddresses(nextProps) {    
    const record = nextProps.addressesRequest.get('records');    
    if (record && record.size){
      this.setState({
        ...this.state, ...record.toJS(),
      })
    }  
  } 
  
  _setShipping (params = {}) {        
    let newState = {
      ...this.state,      
      shippingAddress: params
    }

    this.setState(newState);
    newState.stepIndex = 1;    
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
    const { createCreditCardPayment } = this.props;
  
    params.billingAddress   = this.state.billingAddress;
    params.shippingAddress  = this.state.shippingAddress;    
      
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

  _handleGetShoppingCart(nextProps) {
    if (!this.props.cartRecordsRequest.get('success') && nextProps.cartRecordsRequest.get('success')) {      
      if (nextProps.cartRecordsRequest.get('isDigital')) {
          this.props.goTo('/shopping/download');
      }
    }
  }
  
  _handlePayPalPayment(nextProps) {
    if (!this.props.paypalRequest.get('success') && nextProps.paypalRequest.get('success')) {      
      window.location = nextProps.paypalRequest.get('approvalUrl');
    }
  }
  
  _handleCreditCardPayment(nextProps){
    if (!this.props.creditCardRequest.get('success') && nextProps.creditCardRequest.get('success')) {
      this.props.resetCreditCardPayment();
      this._goToSuccessPage(nextProps.creditCardRequest.get('data').toJS());
    }
  }  

  _handleCheckPayment(nextProps) {
    if (!this.props.checkRequest.get('success') && nextProps.checkRequest.get('success')) {                
      this._goToSuccessPage(nextProps.checkRequest.get('data').toJS());
    }
    if (!this.props.checkRequest.get('fail') && nextProps.checkRequest.get('fail')) {
      this.props.goTo('/payments/fail');
    }    
  }
  
  _goToSuccessPage(data) {
      const {invoiceNo, hash} = data;
      this.props.goTo(`/shopping/checkout/${invoiceNo}/${hash}`);
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
    const loading = checkRequest.get('loading') 
            || paypalRequest.get('loading') 
            || creditCardRequest.get('loading')
            || paypalRequest.get('success');    
    
    if (!success) {
        return <div className="d-flex justify-content-center m-5 p-5">
            <CircularProgress color="primary" size={80}/>
        </div>;
    }
    
    return <div className="my-4">
        {loading && <Loader/>}
        {cartRecordsRequest.get('records').size > 0 ?
            <div className="row">
                <div className="col-12 col-sm-6 col-md-7 col-xl-6 mx-auto order-1 order-sm-0">
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
                <div className="col-12 col-sm-6 col-md-5 order-0 order-sm-1">
                    <Summary data={cartRecordsRequest.toJS()} />
                </div>
            </div>            
        : 
            <div>
                <p className="text-center">
                    <span className="invoice-title">{t('yourCartIsEmpty')}</span>
                </p>
                <p className="text-center m-5">
                    <NavLink to="/store" className="btn m-btm btn-primary m-5">{t('continueShopping')}</NavLink>
                </p>
            </div>
        }
        </div>;
  }
  
  render() {
    const { stepIndex } = this.state;
    const { t } = this.props;
    return (
        <div className="container p-5">
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
                    <div className="row">
                        <div className='col-12'>
                            {this._renderCheckoutSteps(stepIndex)}
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
    goTo:                       (url) => {dispatch(push(url))}    
  })
)(Checkout);

export default withRouter(withTranslation('translations')(Checkout));