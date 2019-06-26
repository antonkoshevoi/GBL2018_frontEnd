import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {push} from 'react-router-redux';
import {selectGetRecordsRequest} from '../../redux/subscriptions/selectors';
import {selectPublicGiftRequest} from '../../redux/gifts/selectors';
import {getRecords} from '../../redux/subscriptions/actions';
import {selectDiscountCodeRequest} from '../../redux/store/selectors';
import {giftPublic, resetPublicGiftRequest} from '../../redux/gifts/actions';
import {Price} from "../../components/ui/Price";
import GiftForm from "./forms/GiftForm";
import DiscountCode from '../store/sections/DiscountCode';
import CreditCardForm from "../subscriptions/forms/CreditCardForm";
import SubscriptionsForm from "../subscriptions/forms/SubscriptionsForm";
import InvoiceForm from "../subscriptions/forms/InvoiceForm";
import Loader from '../../components/layouts/Loader';

const Portlet = (props) => {    
    const {t} = props;       
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-8 m-auto">
                    <h1 className="text-center m--margin-top-15 g-metal">{t('sendGift')}</h1>
                    <div className='m-portlet m-portlet--head-solid-bg m--margin-top-30'>
                        <div className='m-portlet__body'>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

class Gift extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            billingData: {},
            subscriptionId: 2,            
            period: 'month',
            showBillingForm: false
        };
    }
    
    componentDidMount() {        
        const {getRecords} = this.props;
        getRecords();
    }    
    
    componentWillReceiveProps(nextProps) {                
        this._handleGift(nextProps);
        this._handleDiscountCode(nextProps);
    }
    
    _handleGift(nextProps) {
        if (!this.props.giftRequest.get('success') && nextProps.giftRequest.get('success')) {
            this.props.resetGiftRequest();            
            
            this._setStep(3);
            
            this.setState({
                showBillingForm: false,
                subscriptionId: null,
                billingData: {}
            });                        
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
                    <p className="display-6">{t('yourPlan')}: <strong>{t(subscription.get('title'))}</strong> - <strong className="g-blue"><Price price={totalPrice} currency={subscription.get('currency')} /></strong> / {t(this.state.period)}</p>     
                    <div className="d-flex justify-content-around mb-3">
                        <DiscountCode />
                    </div>
                </div>
            );
        }                
    }
    
    _handleSelectPlan(data) {
        this.setState(data);
        this._setStep(2);
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
            billingData: {
                ...this.state.billingData,
                ...form
            }
        });
    }    
  
    _submitCreditCardPayment = () => {
        this.props.giftPublic({
            ...this.state.billingData,
            period: this.state.period,
            subscriptionId: this.state.subscriptionId
        });        
    };
    
    _setStep(value) {
        this.setState({
            step: value
        });
    }    
    
    render() {        
        
        const {giftRequest, getRecordsRequest, t} = this.props;
        const {billingData, step} = this.state;
        const errors = giftRequest.get('errors');
        const loading = giftRequest.get('loading') || getRecordsRequest.get('loading');
        
        return (
            <div>                
                {loading && <Loader/>}
                {step === 1 && <SubscriptionsForm
                    subscriptions={getRecordsRequest.get('records')}
                    onSelect={(data) => this._handleSelectPlan(data)} />
                }
                {step === 2 &&
                    <Portlet {...this.props}>
                        <div className='m-form m-form--label-align-right my-4 mx-2 mx-sm-5'>
                            {this._getSelectedPlan()}
                            <h2 className='my-3'>{t('personalInformation')}</h2>                    
                            <div className='align-items-center'>
                                <GiftForm errors={errors} onChange={(form) => this._handleForm(form)} form={billingData} />
                            </div>                                
                            <h2 className='my-3'>{t('creditCard')}</h2>                    
                            <div className='align-items-center'>
                                <CreditCardForm errors={errors} onChange={(form) => this._handleForm(form)} form={billingData} />                                        
                            </div>
                            <div className='align-items-center'>
                                <div className="col-sm-12 text-center mt-5">                                        
                                    <button disabled={loading} onClick={() => { this._setStep(1) }} className="btn btn-default">{t('back')}</button>                                                                  
                                    <button disabled={loading} onClick={() => { this._submitCreditCardPayment() }} className="btn btn-info m--margin-left-10">{t('makePayment')}</button>
                                </div>
                            </div>
                        </div>
                    </Portlet>
                }
                {step === 3 &&
                    <Portlet {...this.props}>                        
                        <InvoiceForm data={giftRequest.get('record')} />
                    </Portlet>                    
                }                         
            </div>
        );
    }
}

Gift = connect(
    (state) => ({
        giftRequest:  selectPublicGiftRequest(state),
        getRecordsRequest: selectGetRecordsRequest(state),
        discountCodeRequest:  selectDiscountCodeRequest(state)
    }),
    (dispatch) => ({
        giftPublic: (data) => dispatch(giftPublic(data)),
        resetGiftRequest: () => dispatch(resetPublicGiftRequest()),        
        getRecords: () => dispatch(getRecords()),
        goTo: (url) => {dispatch(push(url))}
    })
)(Gift);

export default withTranslation('translations')(Gift);