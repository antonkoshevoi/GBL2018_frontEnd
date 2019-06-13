import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation, Trans} from 'react-i18next';
import {selectGetCartRecordsRequest} from '../../redux/store/selectors';
import {getCartRecords} from '../../redux/store/actions';
import {withRouter, NavLink} from 'react-router-dom';
import {push} from 'react-router-redux';
import {selectCreateCheckPaymentRequest, selectCreatePayPalPaymentRequest} from '../../redux/payments/selectors';
import {createCheckPayment, createPayPalPayment} from '../../redux/payments/actions';
import {selectAddressesRequest} from "../../redux/store/selectors";
import {getAddresses} from "../../redux/store/actions";
import {Step, StepLabel, Stepper, CircularProgress} from '@material-ui/core';
import Shipping from "./sections/Shipping";
import Billing from "./sections/Billing";
import CreditCard from "./sections/CreditCard";
import PaymentSuccessContainer from "./payments/PaymentSuccessContainer";
import Loader from "../../components/layouts/Loader";
import '../../styles/store.css'

class Checkout extends Component {

  state = {   
    stepIndex: 0,
    paymentMethod: null,
    showCreditCard: false,
    forceFinish: false,
    billingAddress: {},
    shippingAddress: {}
  };

  componentDidMount() {
      const {step} = this.props.match.params;
      if (step === 'finish') {
        this._handleFinish(true);
      } else {     
        this.props.getAddresses();
        this.props.getCartRecords();
      }
  }

  componentWillReceiveProps(nextProps) {
    this._handlePayPalPaymentCreated(nextProps);
    this._handleCheckPaymentCreated(nextProps);
    this._handleCheckPaymentFailed(nextProps);  
    this._handleAddresses(nextProps);
  }
  
  _handleFinish(force = false) {
    this.setState({
      ...this.state,
      stepIndex: 2,
      forceFinish: force
    });    
  }   
  
  _handleAddresses(nextProps) {    
    const record = nextProps.addressesRequest.get('records');    
    if (record && record.size){
      this.setState({
        ...this.state, ...record.toJS(),
      })
    }  
  }
  
  _renderPaymentRequest() {
    const {t} = this.props;    
    return (
      <div>
        <Loader/>
        <div className="alert m-alert m-alert--default">
          <h3 className="display-5 text-center">
            <i className="la la-check-circle align-middle m--margin-right-20 display-2 text-success"/>
            {t('yourShippingAndBillingInfoSaved')}. <br/> 
            {t('creatingRequest', {paymentType: t(this.state.paymentMethod)})}
          </h3>
        </div>
      </div>);
  }  
  
  _stepBilling(params = {}) {
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

  _stepShipping (params = {}) {
    this.setState({
      ...this.state,
      stepIndex: 1,
      shippingAddress: params
    });
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
    const success = this.props.paypalRequest.get('success');
    const nextSuccess = nextProps.paypalRequest.get('success');

    if (!success && nextSuccess) {      
      window.location = nextProps.paypalRequest.get('approvalUrl');
    }
  }

  _handleCheckPaymentCreated(nextProps) {
    const success = this.props.checkRequest.get('success');
    const nextSuccess = nextProps.checkRequest.get('success');    

    if (!success && nextSuccess) {                
        this._handleFinish();
    }
  }

  _handleCheckPaymentFailed(nextProps) {
    const fail = this.props.checkRequest.get('fail');
    const nextFail = nextProps.checkRequest.get('fail');

    if (!fail && nextFail) {
      this.props.goToFailPage();
    }
  }
  
  _renderCheckoutSteps(stepIndex)
  {
    const { showCreditCard } = this.state;
    
    const {
      addressesRequest,
      cartRecordsRequest,
      checkRequest,
      paypalRequest,
      t
    } = this.props;
    
    const loading        = cartRecordsRequest.get('loading') || addressesRequest.get('loading');
    const success        = cartRecordsRequest.get('success') && addressesRequest.get('success');
    const paymentLoading = checkRequest.get('loading') || paypalRequest.get('loading');
    
    if (checkRequest.get('success')) {
        stepIndex = 2;
    }    
    
    if (!success) {
        return <div className="d-flex justify-content-center m--margin-top-100 m--margin-bottom-100">
            <CircularProgress color="primary" size={80}/>
        </div>;
    }
    
    return <div className="m--margin-bottom-50">
        {paymentLoading && this._renderPaymentRequest()}
        {cartRecordsRequest.get('totalPrice') > 0 ?  
            <div>
                <span className="invoice-title mb-5">
                    <Trans i18nKey="translations:yourInvoice">
                        <span className="m--font-bolder">{{invoiceNo: cartRecordsRequest.get('invoiceNo')}}</span>
                        <span className="m--font-bolder">{{invoiceAmount: ('$' + cartRecordsRequest.get('totalPrice').toFixed(2) + ' ' + cartRecordsRequest.get('currency'))}}</span>
                    </Trans>
                </span>
                {[
                    <Shipping onDataSaved={(params) => this._stepShipping(params)} data={this.state.shippingAddress} />,                    
                    <div>
                        {showCreditCard ? 
                            <CreditCard 
                                onDataSaved={() => this._handleFinish()} 
                                goBack={() => this._handleBack()} 
                                paymentAmount={cartRecordsRequest.get('totalPrice')} 
                                shippingAddress={this.state.shippingAddress} 
                                billingAddress={this.state.billingAddress} /> 
                            : 
                            <Billing 
                                onDataSaved={(params) => this._stepBilling(params)} 
                                goBack={() => this._handleBack()} 
                                shippingAddress={this.state.shippingAddress} 
                                billingAddress={this.state.billingAddress} />
                        }
                    </div>, 
                    <PaymentSuccessContainer/>
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
    const { stepIndex, forceFinish } = this.state;
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
                    {forceFinish ? <PaymentSuccessContainer/> : this._renderCheckoutSteps(stepIndex)}
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
    checkRequest: selectCreateCheckPaymentRequest(state)    
  }),
  (dispatch) => ({
    getCartRecords:         () => {dispatch(getCartRecords())},
    getAddresses:           () => {dispatch(getAddresses())},
    createPayPalPayment:    (data) => {dispatch(createPayPalPayment(data))},
    createCheckPayment:     (data) => {dispatch(createCheckPayment(data))},    
    goToFailPage:           () => {dispatch(push('/payments/fail'))}
  })
)(Checkout);

export default withRouter(withTranslation('translations')(Checkout));