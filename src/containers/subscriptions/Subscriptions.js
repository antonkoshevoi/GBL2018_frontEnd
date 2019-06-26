import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {push} from 'react-router-redux';
import {selectGetRecordsRequest, selectSubscribeRequest} from '../../redux/subscriptions/selectors';
import {selectDiscountCodeRequest} from "../../redux/store/selectors";
import {getRecords, subscribe, resetSubscribeRequest, resetGetUserRecordsRequest} from '../../redux/subscriptions/actions';
import {Price} from '../../components/ui/Price';
import CreditCardForm from "./forms/CreditCardForm";
import SubscriptionsForm from "./forms/SubscriptionsForm";
import Loader from "../../components/layouts/Loader";
import DiscountCode from '../store/sections/DiscountCode';

class Subscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = {           
            creditCard: {},
            subscriptionId: null,
            period: 'month',
            showBillingForm: false
        };
    }

    componentDidMount() {        
        const {getRecords} = this.props;        
        getRecords();
    }
    
    componentWillReceiveProps(nextProps) {
        this._handleSubscribe(nextProps);
        this._handleDiscountCode(nextProps);
    }
    
    _handleSubscribe(nextProps) {
        const success = this.props.subscribeRequest.get('success');
        const nextSuccess = nextProps.subscribeRequest.get('success');

        if (!success && nextSuccess) {      
            const paymentId = nextProps.subscribeRequest.get('paymentId');
            
            this.props.resetSubscribeRequest();
            this.props.resetGetUserRecordsRequest();
            
            this.setState({
                showBillingForm: false,
                subscriptionId: null,
                creditCard: {}
            });
            
            this.props.goTo(`/subscribed/${paymentId}`);
        }        
    }
    
    _handleDiscountCode(nextProps) {
        if (!this.props.discountCodeRequest.get('success') && nextProps.discountCodeRequest.get('success')) {
            this.props.getRecords();            
        }
    }     

    _getSelectedPlan() {
        const {getRecordsRequest, t} = this.props;
        
        const subscription = getRecordsRequest.get('records').find((element) => {
            return (Number(element.get('id')) === this.state.subscriptionId);
        });
        
        if (subscription) {
            let price = (this.state.period === 'month' ? subscription.get('priceMonthly') : subscription.get('priceYearly'));
            let totalPrice = price;
            let discount = 0;
            
            if (subscription.get('discount') > 0) {
                discount    = (price / 100) * subscription.get('discount');
                totalPrice  = price - discount;
            }
        
            return (
                <div className="col-sm-12 text-center">
                    {(subscription.get('discount') > 0) && <div>
                        <p className="display-10">{t('price')}: <strong><Price price={price} currency={subscription.get('currency')} /></strong> / {t(this.state.period)}</p>                        
                        <p className="display-10">{t('discount')}: <strong><Price price={discount} currency={subscription.get('currency')} /></strong></p>
                    </div>}
                    <p className="display-6">{t('yourPlan')}: <strong className="g-blue"><Price price={totalPrice} currency={subscription.get('currency')} /></strong> / {t(this.state.period)}</p>     
                </div>
            );
        }                
    }
   
    _handleSelectPlan(data) {
        this.setState(data);
        this._showBillingForm(true);
    }
    
    _handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    _handlePeriodChange(event) {        
        const { value } = event.target;
        this.setState({
            period: value
        });
    }
    
    _handleForm(form) {      
        this.setState({
            ...this.state,
            creditCard: {
                ...form
            }
        });
    }    
  
    _submitCreditCardPayment() {
        this.props.subscribe({
            ...this.state.creditCard,
            period: this.state.period,
            subscriptionId: this.state.subscriptionId
        });        
    };
    
    _showBillingForm(value) {
        this.setState({
            showBillingForm: value
        });        
    }
    
    render() {        
        
        const {subscribeRequest, getRecordsRequest, t} = this.props;
        const {creditCard}  = this.state;
        const errors        = subscribeRequest.get('errors');
        const loading       = subscribeRequest.get('loading') || getRecordsRequest.get('loading')
                
        return (
            <div>
                {loading && <Loader />}
                {this.state.showBillingForm ?
                    <div className="col-sm-12 col-md-10 col-lg-9 col-xl-6 m-auto">
                        <h1 className="text-center m--margin-top-50 g-metal">{t('subscriptions')}</h1>
                        <div className='m-portlet m-portlet--head-solid-bg my-5'>
                            <div className='m-portlet__body'>
                                <div className='m-form m-form--label-align-right mx-5 my-4'>
                                    <h2 className='mb-3'>{t('creditCard')}</h2>                    
                                    <div className='align-items-center'>                                                                                
                                        {this._getSelectedPlan()}
                                        
                                        <div className="d-flex justify-content-around mb-3">
                                            <DiscountCode type="subscription" />
                                        </div>
                                        
                                        <CreditCardForm errors={errors} onChange={(form) => this._handleForm(form)} form={creditCard} />
                                        
                                        <div className="text-center my-3">                                        
                                            <button disabled={subscribeRequest.get('loading')} onClick={() => { this._submitCreditCardPayment() }} className="btn btn-info">{t('makePayment')}</button>
                                            <button disabled={subscribeRequest.get('loading')} onClick={() => { this._showBillingForm(false) }} className="btn btn-default m--margin-left-10">{t('back')}</button>                                                                  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                :                
                    <SubscriptionsForm
                        subscriptions={getRecordsRequest.get('records')}
                        onSelect={(data) => this._handleSelectPlan(data)}/>
                }      
            </div>        
        );
    }
}

Subscriptions = connect(
    (state) => ({
        subscribeRequest:  selectSubscribeRequest(state),
        getRecordsRequest: selectGetRecordsRequest(state),
        discountCodeRequest:  selectDiscountCodeRequest(state)
    }),
    (dispatch) => ({
        subscribe: (data) => dispatch(subscribe(data)),
        resetSubscribeRequest: () => dispatch(resetSubscribeRequest()),
        resetGetUserRecordsRequest: () => dispatch(resetGetUserRecordsRequest()),
        getRecords: () => dispatch(getRecords()),
        goTo: (url) => {dispatch(push(url))}
    })
)(Subscriptions);

export default withTranslation('translations')(Subscriptions);