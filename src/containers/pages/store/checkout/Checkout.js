import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../../styles/store.css'
import {selectCartRecords, selectCartRecordsSum, selectGetCartRecordsRequest} from '../../../../redux/store/selectors';
import {calculateCartSum, getCartRecords} from '../../../../redux/store/actions';
import {withRouter} from 'react-router-dom';
import {push} from 'react-router-redux';
import {selectCreateCheckPaymentRequest, selectCreatePayPalPaymentRequest, selectPaymentMethod} from '../../../../redux/payments/selectors';
import {createCheckPayment, createPayPalPayment, setPayType} from '../../../../redux/payments/actions';
import {Step, StepLabel, Stepper, Button, CircularProgress} from '@material-ui/core';
import payPalImg from '../../../../media/images/payments/paypal.png'
import creditCardImg from '../../../../media/images/payments/credit_card.png'
import checkImg from '../../../../media/images/payments/check.png'
import Card from "../../../../components/ui/Card";
import ShippingAndBilling from "./ShippingAndBilling";
import CreditCard from "./CreditCard";
import PaymentMethods from './PaymentMethods';
import PaymentSuccessContainer from "../payments/PaymentSuccessContainer";

class Checkout extends Component {

  state = {   
    stepIndex: 0,
    finished: 0,
    payMethod: null,
    showCreditCard: false,
    billingAddressId: null,
    shippingAddressId: null
  };

  componentWillMount() {
    const {step} = this.props.match.params;
    if (step) {
      this.setState({stepIndex: +step});
    }
  }

  componentWillReceiveProps(nextProps) {
    this._handlePayPalPaymentCreated(nextProps);
    this._handleCheckPaymentCreated(nextProps);
    this._handleCheckPaymentFailed(nextProps);
    this._calculateSum(nextProps.cartRecords.toJS());
  }

  _calculateSum(data){
      this.props.calculateSum(data);
  }
  
  _handleCreditCard = () => {      
      this.handleNext();
  }   
  
  _stepBilling = (params = {}) => {            
    const payMethod = this.props.payMethod;    
    
    this.setState({showCreditCard: false});
    
    this.setState({
      ...this.state,
      showCreditCard: false,
      billingAddressId: params.billingAddressId,
      shippingAddressId: params.shippingAddressId
    });    
        
    switch (payMethod) {
      case 'Check':
        this.props.createCheckPayment(params);
        break;

      case 'PayPal':
        this.props.createPayPalPayment(params);
        break;
        
      case 'CreditCard':
        this.setState({
          stepIndex: 1,
          showCreditCard: true
        });            
        break;        
    }
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  };

  handleBack = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        showCreditCard: false        
      });
    }
  };

  _processPayPal = () => {
    this.props.setPayMethod('PayPal');
    this.handleNext();
  };

  _handlePayPalPaymentCreated(nextProps) {
    const success = this.props.createPayPalPaymentRequest.get('success');
    const nextSuccess = nextProps.createPayPalPaymentRequest.get('success');

    if (!success && nextSuccess) {      
      window.location = nextProps.createPayPalPaymentRequest.get('approvalUrl');
    }
  }

  _processCheck = () => {
    this.props.setPayMethod('Check');
    this.handleNext();
  };

  _processCreditCard = () => {
    this.props.setPayMethod('CreditCard');
    this.handleNext();
  };

  _handleCheckPaymentCreated(nextProps) {
    const success = this.props.createCheckPaymentRequest.get('success');
    const nextSuccess = nextProps.createCheckPaymentRequest.get('success');

    if (!success && nextSuccess) {
      this.handleNext();
    }
  }

  _handleCheckPaymentFailed(nextProps) {
    const fail = this.props.createCheckPaymentRequest.get('fail');
    const nextFail = nextProps.createCheckPaymentRequest.get('fail');

    if (!fail && nextFail) {
      this.props.goToFailPage();
    }
  }  

  render() {
    const {
        stepIndex,
        showCreditCard,
        shippingAddressId,
        billingAddressId
    } = this.state;
    const {
      cartRecords,
      cartRecordsRequest,      
      createCheckPaymentRequest,
      cartRecordsSum,
      t
    } = this.props;
    const loadingCarts = cartRecordsRequest.get('loading');
    const successCarts = cartRecordsRequest.get('success');
    const {classes} = this.props;
    const item = cartRecords.toJS().shift();
    return (
      <div className="m--margin-top-30">
        <div className='row d-flex justify-content-center'>
          <div className="col-12">
            <Card header={false}>
              <Stepper activeStep={stepIndex} alternativeLabel className="g-stepper">
                <Step>
                  <StepLabel>{t('paymentsOptions')}</StepLabel>
                </Step>
                <Step>
                  <StepLabel classes={{...classes}}>{t('shippingAndBilling')}</StepLabel>
                </Step>
                <Step>
                  <StepLabel>{t('confirmation')}</StepLabel>
                </Step>
              </Stepper>
              {[
                (() => {
                  return (
                    //(temp) TODO need extract to component
                    <div className="row d-flex justify-content-center">
                      <div className='col-10'>
                        {successCarts &&
                        <div className="m-portlet__body">
                          <div className="m-widget25">
                            {item && <span className="invoice-title">{t('yourInvoice', {invoiceNo: item.invoiceNo, invoiceAmount: ('$' + cartRecordsSum)})}</span>}
                          </div>
                        </div>
                        }
                        {loadingCarts && !successCarts &&
                        <div className="row d-flex justify-content-center">
                          <CircularProgress color="primary" size={80}/>
                        </div>}
                        <br/>
                        <PaymentMethods methods={[
                          {
                            title: t('payPal'),
                            img: payPalImg,                            
                            onSelect: this._processPayPal
                          },
                          {
                            title: t('creditCard'),
                            img: creditCardImg,
                            onSelect: this._processCreditCard,
                          },
                          {
                            title: t('check'),
                            img: checkImg,
                            loading: createCheckPaymentRequest.get('loading'),
                            onSelect: this._processCheck,
                          },
                          {
                            title: t('wireTransfer'),
                            img: checkImg,                            
                            onSelect: () => {
                              this.handleNext();
                            },
                          },
                          {
                            title: t('cog'),
                            img: checkImg,                            
                            onSelect: () => {
                              this.handleNext();
                            },
                          }
                        ]}

                        />
                      </div>
                    </div>
                  )
                })(),
                
                (() => {
                  return (    
                    <div className="row d-flex justify-content-center">
                        <div className='col-10'>                        
                        {showCreditCard ? 
                            <CreditCard onDataSaved={this._handleCreditCard} paymentAmount={cartRecordsSum} shippingAddressId={shippingAddressId} billingAddressId={billingAddressId}/> : 
                            <ShippingAndBilling onDataSaved={this._stepBilling}/>
                        }                             
                        </div>
                    </div>
                  )
                })(),
                                                
                <PaymentSuccessContainer/>

              ][stepIndex]}
              
              {stepIndex !== 0 && stepIndex !== 2 &&
              <div className="form-group">
                <Button
                  disabled={stepIndex === 0}
                  onClick={this.handleBack}
                >
                  {t('back')}
                </Button>
              </div>
              }
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Checkout = connect(
  (state) => ({
    cartRecordsRequest: selectGetCartRecordsRequest(state),
    cartRecords: selectCartRecords(state),
    createPayPalPaymentRequest: selectCreatePayPalPaymentRequest(state),
    createCheckPaymentRequest: selectCreateCheckPaymentRequest(state),
    cartRecordsSum: selectCartRecordsSum(state),
    payMethod: selectPaymentMethod(state)
  }),
  (dispatch) => ({
    getCartRecords:     () => {dispatch(getCartRecords())},
    calculateSum:       (data) => {dispatch(calculateCartSum(data))},
    createPayPalPayment:(data) => {dispatch(createPayPalPayment(data))},
    createCheckPayment: (data) => {dispatch(createCheckPayment(data))},    
    goToFailPage:       () => {dispatch(push('/payments/fail'))},
    setPayMethod:       (data) => {dispatch(setPayType(data))}
  })
)(Checkout);

export default withRouter(translate('translations')(Checkout));