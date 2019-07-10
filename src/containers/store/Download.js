import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {selectGetCartRecordsRequest} from '../../redux/store/selectors';
import {getCartRecords} from '../../redux/store/actions';
import {NavLink} from 'react-router-dom';
import {push} from 'react-router-redux';
import {selectCreateCheckPaymentRequest, selectCreatePayPalPaymentRequest, selectCreateCreditCardPaymentRequest, selectCreateFreeCheckoutRequest} from '../../redux/payments/selectors';
import {createCheckPayment, createFreeCheckout, createPayPalPayment, createCreditCardPayment, resetCreditCardPayment} from '../../redux/payments/actions';
import {selectAddressesRequest} from "../../redux/store/selectors";
import {getAddresses} from "../../redux/store/actions";
import {Step, StepLabel, Stepper} from '@material-ui/core';
import SignUp from "./sections/SignUp";
import Billing from "./sections/Billing";
import Summary from "./sections/Summary";
import CreditCard from "./sections/CreditCard";
import Loader from "../../components/layouts/Loader";

class Download extends Component {

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
    
    if (this.props.auth.get('isLoggedIn')) {
        this._setSignUp();
    }
  }

  componentWillReceiveProps(nextProps) {
    this._handleAddresses(nextProps);
    this._handleGetShoppingCart(nextProps);
    this._handlePayPalPayment(nextProps);    
    this._handleFailPayment(nextProps);    
  }  
  
  _handleAddresses(nextProps) {    
    const record = nextProps.addressesRequest.get('records');    
    if (record && record.size){
      this.setState({
        ...this.state, ...record.toJS(),
      })
    }  
  } 
  
  _setSignUp (params = {}) {        
    let newState = {
      ...this.state,
      signUp: params
    }
    if (this.props.cartRecordsRequest.get('isFree')) {
        this.setState(newState, () => {
            this.props.createFreeCheckout({
                signUp: this.state.signUp
            });
        });
    } else {
        this.setState(newState);
        newState.stepIndex = 1;
    }
  };
  
  _setBilling(params = {}) {
    this.setState({
        billingAddress: params.billingAddress,
        paymentMethod: params.paymentMethod
    }, function () {        
        const data = {
            signUp: this.state.signUp,
            billingAddress: this.state.billingAddress
        };
    
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
  
    params.signUp           = this.state.signUp;
    params.billingAddress   = this.state.billingAddress;
      
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
      if (!nextProps.cartRecordsRequest.get('isDigital')) {
          this.props.goTo('/shopping/checkout');
      }
    }
  }
  
  _handlePayPalPayment(nextProps) {
    if (!this.props.paypalRequest.get('success') && nextProps.paypalRequest.get('success')) {      
      window.location = nextProps.paypalRequest.get('approvalUrl');
    }
  }  

  _handleFailPayment(nextProps) {    
    if ((!this.props.checkRequest.get('fail') && nextProps.checkRequest.get('fail')) 
            || (!this.props.freeCheckoutRequest.get('fail') && nextProps.freeCheckoutRequest.get('fail'))
                || (!this.props.creditCardRequest.get('fail') && nextProps.creditCardRequest.get('fail'))
    ) {
      this.props.goTo('/payments/fail');
    }    
  }  
  
  _renderCheckoutSteps() {
    const { showCreditCard, stepIndex} = this.state;
    
    const {
      auth,
      addressesRequest,
      cartRecordsRequest,
      checkRequest,
      creditCardRequest,
      freeCheckoutRequest,
      paypalRequest,
      t
    } = this.props;
        
    const success = cartRecordsRequest.get('success') && addressesRequest.get('success');
    const loading = checkRequest.get('loading') 
            || paypalRequest.get('loading') 
            || creditCardRequest.get('loading') 
            || freeCheckoutRequest.get('loading') 
            || freeCheckoutRequest.get('success') 
            || paypalRequest.get('success');    
    
    if (!success || (cartRecordsRequest.get('isFree') && auth.get('isLoggedIn'))) {
        return <div className="d-flex justify-content-center m-5 p-5">
            <Loader/>
        </div>;
    }
    
    if (!cartRecordsRequest.get('records').size) {
        return <div className="mb-5">
            <p className="text-center">
                <span className="invoice-title">{t('yourCartIsEmpty')}</span>
            </p>
            <p className="text-center m-5">
                <NavLink to="/store" className="btn m-btm btn-primary m-5">{t('continueShopping')}</NavLink>
            </p>
        </div>;        
    }
    
    return <div className="mb-5">
        {loading && <Loader/>}
        <div className="row mt-3">
            <div className="col-12 col-sm-6 col-md-7 col-xl-6 mx-auto order-1 order-sm-0">
            {stepIndex === 0 &&
                <div>
                    {auth.get('isLoggedIn') ? 
                        <Loader/>
                    : 
                        <SignUp onDataSaved={(params) => this._setSignUp(params)} data={this.state.signUp} /> 
                    }
                </div>
            }
            {stepIndex === 1 &&
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
                            shippingAddress={[]} 
                            billingAddress={this.state.billingAddress} />
                    }
                </div>
            }
            </div>
            <div className="col-12 col-sm-6 col-md-5 order-0 order-sm-1">
                <Summary data={cartRecordsRequest.toJS()} />
            </div>
        </div>
    </div>;
  }
  
  _renderStepper()
  {
    const { t, cartRecordsRequest } = this.props;
    const { stepIndex } = this.state;    
    
    if (!cartRecordsRequest.get('success')) {
        return '';
    }
      
    return <Stepper activeStep={stepIndex} alternativeLabel className="g-stepper">
        <Step>
            <StepLabel>{t('signUp')}</StepLabel>
        </Step>
        {!cartRecordsRequest.get('isFree') &&
        <Step>
            <StepLabel>{t('billing')}</StepLabel>
        </Step>}        
        <Step>
            <StepLabel>{t('download')}</StepLabel>
        </Step>
    </Stepper>;
  }
  
  render() {
    return (
        <div className="container p-5">
            <div className="m-portlet  m-portlet--head-solid-bg">
                <div className='m-portlet__body position-relative'>               
                    {this._renderStepper()}
                    <div className="row">
                        <div className='col-12'>
                            {this._renderCheckoutSteps()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

Download = connect(
  (state) => ({
    auth: state.auth,    
    cartRecordsRequest: selectGetCartRecordsRequest(state),
    addressesRequest: selectAddressesRequest(state),
    paypalRequest: selectCreatePayPalPaymentRequest(state),
    checkRequest: selectCreateCheckPaymentRequest(state),
    freeCheckoutRequest: selectCreateFreeCheckoutRequest(state),
    creditCardRequest: selectCreateCreditCardPaymentRequest(state)    
  }),
  (dispatch) => ({    
    getCartRecords:             () => {dispatch(getCartRecords())},
    getAddresses:               () => {dispatch(getAddresses())},    
    createPayPalPayment:        (data) => {dispatch(createPayPalPayment(data))},
    createCheckPayment:         (data) => {dispatch(createCheckPayment(data))},
    createCreditCardPayment:    (data) => dispatch(createCreditCardPayment(data)),
    createFreeCheckout:         (data) => dispatch(createFreeCheckout(data)),
    resetCreditCardPayment:     () => dispatch(resetCreditCardPayment()),
    goTo:                       (url) => {dispatch(push(url))}    
  })
)(Download);

export default withTranslation('translations')(Download);