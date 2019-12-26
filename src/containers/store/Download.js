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
import {Loader} from "../../components/ui/Loader";
import {Preloader} from "../../components/ui/Preloader";
    
class Download extends Component {

    state = {   
        stepIndex: 0,
        paymentMethod: null,
        showBilling: this.props.auth.get('isLoggedIn'),
        showCreditCard: false,
        billingAddress: {}    
    };

    componentDidMount() {
        this.props.getAddresses();
        this.props.getCartRecords();

        if (this.props.auth.get('isLoggedIn')) {
            this._setSignUp();
        }
    }

    componentDidUpdate(prevProps) {
        this._handleAddresses(prevProps);
        this._handleGetShoppingCart(prevProps);
        this._handlePayPalPayment(prevProps);    
        this._handleFailPayment(prevProps);    
    }
    
    _handleAddresses(prevProps) {    
        if (this.props.addressesRequest.get('success') && !prevProps.addressesRequest.get('success')) {   
            this.setState({
                ...this.state, ...this.props.addressesRequest.get('records').toJS()
            });
        }  
    }   

    _setSignUp(params = {}) {        
        let newState = {
            ...this.state,
            signUp: params,
            showBilling: true
        }
        if (this.props.cartRecordsRequest.get('isFree')) {
            this.setState(newState, () => {
                this.props.createFreeCheckout({
                    signUp: this.state.signUp
                });
            });
        } else {
            this.setState(newState);        
        }
    }

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
    }

    _makeCreditCardPayment(params = {}) {
        const { createCreditCardPayment } = this.props;

        params.signUp           = this.state.signUp;
        params.billingAddress   = this.state.billingAddress;

        createCreditCardPayment(params);        
    }

    _handleBack() {
        const {showCreditCard, showBilling} = this.state;
        const {auth} = this.props;

        if (showCreditCard) {
            return this.setState({
                showCreditCard: false
            });
        }
        if (showBilling) {
            if (auth.get('isLoggedIn')) {
                return this.props.goTo('/store/shopping-cart');
            }
            return this.setState({
                showBilling: false
            });                   
        }
    }

    _handleGetShoppingCart(prevProps) {
        if (this.props.cartRecordsRequest.get('success') && !prevProps.cartRecordsRequest.get('success')) {      
            if (!this.props.cartRecordsRequest.get('isDigital')) {
                this.props.goTo('/shopping/checkout');
            }
        }
    }

    _handlePayPalPayment(prevProps) {
        if (this.props.paypalRequest.get('success') && !prevProps.paypalRequest.get('success')) {      
            window.location = this.props.paypalRequest.get('approvalUrl');
        }
    }  

    _handleFailPayment(prevProps) {    
        if ((this.props.checkRequest.get('fail') && !prevProps.checkRequest.get('fail')) 
            || (this.props.freeCheckoutRequest.get('fail') && !prevProps.freeCheckoutRequest.get('fail'))
                || (this.props.creditCardRequest.get('fail') && !prevProps.creditCardRequest.get('fail'))
        ) {
            this.props.goTo('/payments/fail');
        }    
    }  
  
    _renderCheckoutSteps() {
        const { showCreditCard, showBilling} = this.state;

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
            return <Preloader text={t('pleaseWait')} />;
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
                {showBilling ?
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
                                contactsOnly={true}
                                billingAddress={this.state.billingAddress} />
                        }
                    </div> 
                    : 
                    <SignUp onDataSaved={(params) => this._setSignUp(params)} data={this.state.signUp} />        
                }
                </div>
                <div className="col-12 col-sm-6 col-md-5 order-0 order-sm-1">
                    <Summary data={cartRecordsRequest.toJS()} />
                </div>
            </div>
        </div>;
    }
  
    _renderStepper() {
        const { t, cartRecordsRequest, auth } = this.props;    
        const activeStep = auth.get('isLoggedIn') ? 0 : (this.state.showBilling ? 1 : 0);

        if (!cartRecordsRequest.get('success') || (cartRecordsRequest.get('isFree') && auth.get('isLoggedIn'))) {
            return '';
        }            

        return <Stepper activeStep={activeStep} alternativeLabel className="g-stepper">
            {!auth.get('isLoggedIn') && <Step>
                <StepLabel>{t('signUp')}</StepLabel>
            </Step>}
            {!cartRecordsRequest.get('isFree') && <Step>
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

export default withTranslation('translations')(connect(
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
)(Download));