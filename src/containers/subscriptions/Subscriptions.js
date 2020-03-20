import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {push} from 'react-router-redux';
import {selectGetRecordsRequest, selectSubscribeRequest} from '../../redux/subscriptions/selectors';
import {selectDiscountCodeRequest} from "../../redux/store/selectors";
import {getRecords, subscribe, resetSubscribeRequest, resetGetUserRecordsRequest} from '../../redux/subscriptions/actions';
import {selectValidateRecipientRequest } from '../../redux/gifts/selectors';
import {selectUserData} from '../../redux/user/selectors';
import {validateRecipient} from "../../redux/gifts/actions";
import {Price} from '../../components/ui/Price';
import {Loader} from "../../components/ui/Loader";
import CreditCardForm from "./forms/CreditCardForm";
import SubscriptionsForm from "./forms/SubscriptionsForm";
import RecipientForm from "./forms/RecipientForm";
import DiscountCode from '../store/sections/DiscountCode';

import {Checkbox, withStyles} from '@material-ui/core';

const CustomCheckbox = withStyles({
    root: {
        padding: '2px 12px',
        color: '#ffffff',    
        '&$checked': {
          color: '#ffffff'
        }  
    },
    checked: {},
})(props => <Checkbox {...props} />);

class Subscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = this._initState();
    }

    componentDidMount() {        
        const {getRecords} = this.props;        
        getRecords();
    }
    
    componentDidUpdate(prevProps) {
        this._handleValidate(prevProps);
        this._handleSubscribe(prevProps);
        this._handleDiscountCode(prevProps);
    }
    
    _initState() {
        return {
            type: 'self-use',
            creditCard: {},
            recipient: {
                firstName: this.props.userData.get('firstName'),
                lastName: this.props.userData.get('lastName')
            },
            recipientIsValid: false,
            subscriptionId: null,
            period: 'month'
        };
    }
    
    _handleValidate(prevProps) {
        const success = this.props.validateRecipientRequest.get('success');        

        if (success && !prevProps.validateRecipientRequest.get('success')) {               
            this.setState({recipientIsValid: true});
        }        
    }
    
    _handleSubscribe(prevProps) {
        const success = this.props.subscribeRequest.get('success');        

        if (success && !prevProps.subscribeRequest.get('success')) {      
            const paymentId = this.props.subscribeRequest.get('paymentId');
            
            this.props.resetSubscribeRequest();
            this.props.resetGetUserRecordsRequest();
            
            this.setState(this._initState());
            
            this.props.goTo(`/subscribed/${paymentId}`);
        }        
    }
    
    _handleDiscountCode(prevProps) {
        if (this.props.discountCodeRequest.get('success') && !prevProps.discountCodeRequest.get('success')) {
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
   
    _goBack() {
        let backState = {
            recipientIsValid: false
        };    
        if (this.state.type === 'self-use' || !this.state.recipientIsValid) {            
            backState.subscriptionId = false;
        }
        this.setState(backState);
    }
    
    _handleSelectPlan(data) {
        this.setState(data);
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
   
    _validateRecipient() {
        this.props.validateRecipient(this.state.recipient);        
    }
    
    _submitCreditCardPayment() {
        let data = {
            ...this.state.creditCard,
            period: this.state.period,
            subscriptionId: this.state.subscriptionId
        };
        if (this.state.type === 'gift' && this.state.recipientIsValid) {
            data.recipient = this.state.recipient;
        }
        this.props.subscribe(data);        
    }
       
    _renderBillingForm() {
        
        const {subscribeRequest, t} = this.props;
        const {creditCard}  = this.state;
        const errors        = subscribeRequest.get('errors');
        const loading       = subscribeRequest.get('loading');
        
        return <div className="col-sm-12 col-md-10 col-lg-9 col-xl-6 m-auto">
            <h1 className="text-center mt-5 g-metal">{t('subscriptions')}</h1>
            <div className='m-portlet m-portlet--head-solid-bg my-5'>
                <div className='m-portlet__body'>
                    <div className='mx-5 my-4'>
                        <div>                                                                                
                            {this._getSelectedPlan()}

                            <div className="d-flex justify-content-around mb-3">
                                <DiscountCode type="subscription" />
                            </div>                            

                            <CreditCardForm errors={errors} onChange={(form) => this.setState({creditCard: form})} form={creditCard} />

                            <div className="text-center my-3">                                        
                                <button disabled={loading} onClick={() => { this._submitCreditCardPayment() }} className="btn btn-info">{t('makePayment')}</button>
                                <button disabled={loading} onClick={() => { this._goBack() }} className="btn btn-default ml-3">{t('back')}</button>                                                                  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }    
    
    _renderSubscriptionsForm() {
        const {getRecordsRequest} = this.props;
        
        return <div className="subscription-types">
            <div className="container">
                <div className="d-flex justify-content-around">
                    <label className="subsription-type d-flex align-self-center">
                        <CustomCheckbox
                            checked={this.state.type === 'self-use'}
                            onChange={() => this.setState({type: 'self-use'})}
                            value="self-use"
                        />
                        <span className="label-text">This is for me</span>
                    </label>
                    <label className="subsription-type d-flex align-self-center">
                        <CustomCheckbox
                            checked={this.state.type === 'gift'}
                            onChange={() => this.setState({type: 'gift'})}
                            value="gift"
                        />
                        <span className="label-text">Send a gift</span>
                    </label>
                </div>
            </div>
            <SubscriptionsForm
                subscriptions={getRecordsRequest.get('records')}
                onSelect={(data) => this._handleSelectPlan(data)}            
            />
        </div>;
    }
    
    _renderRecipientForm() {
        const {t, validateRecipientRequest} = this.props;        
        const loading = validateRecipientRequest.get('loading');
        const errors = validateRecipientRequest.get('errors');
        const {recipient} = this.state;
        
        return <div className="col-sm-12 col-md-10 col-lg-9 col-xl-6 m-auto">
            <h1 className="text-center mt-5 g-metal">{t('subscriptions')}</h1>
            <div className='m-portlet m-portlet--head-solid-bg my-5'>
                <div className='m-portlet__body'>
                    <div className='mx-5 my-4'>                                       
                        <div>                                                                                
                            {this._getSelectedPlan()}

                            <div className="d-flex justify-content-around mb-3">
                                <DiscountCode type="subscription" />
                            </div>

                            <RecipientForm errors={errors} onChange={(form) => this.setState({recipient: form})} form={recipient} />
                            
                            <div className="text-center my-3">                                        
                                <button disabled={loading} onClick={() => { this._validateRecipient() }} className="btn btn-info">{t('next')}</button>
                                <button disabled={loading} onClick={() => { this._goBack() }} className="btn btn-default ml-3">{t('back')}</button>                                                                  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;        
    }
    
    _renderForm() {
        if (!this.state.subscriptionId) {
            return this._renderSubscriptionsForm();
        }
        if (this.state.type === 'self-use' || (this.state.type === 'gift' && this.state.recipientIsValid)) {
            return this._renderBillingForm();
        }
        return this._renderRecipientForm();
    }
    
    render() {
        const {subscribeRequest, getRecordsRequest, validateRecipientRequest} = this.props;        
                
        return (
            <div>
                {(subscribeRequest.get('loading') || getRecordsRequest.get('loading') || validateRecipientRequest.get('loading')) && <Loader />}
                
                {this._renderForm()}                
            </div>        
        );
    }
}
export default withTranslation('translations')(connect(
    (state) => ({
        subscribeRequest:  selectSubscribeRequest(state),
        getRecordsRequest: selectGetRecordsRequest(state),
        discountCodeRequest:  selectDiscountCodeRequest(state),
        validateRecipientRequest:  selectValidateRecipientRequest(state),
        userData:  selectUserData(state)
    }),
    (dispatch) => ({
        subscribe: (data) => dispatch(subscribe(data)),
        resetSubscribeRequest: () => dispatch(resetSubscribeRequest()),
        resetGetUserRecordsRequest: () => dispatch(resetGetUserRecordsRequest()),
        validateRecipient: (data) => dispatch(validateRecipient(data)),
        getRecords: () => dispatch(getRecords()),
        goTo: (url) => {dispatch(push(url))}
    })
)(Subscriptions));