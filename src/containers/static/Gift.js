import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {push} from 'react-router-redux';
import {selectGetRecordsRequest} from '../../redux/subscriptions/selectors';
import {selectPublicGiftRequest} from '../../redux/gifts/selectors';
import {getRecords} from '../../redux/subscriptions/actions';
import {giftPublic, resetPublicGiftRequest} from '../../redux/gifts/actions';
import GiftForm from "./forms/GiftForm";
import CreditCardForm from "../subscriptions/forms/CreditCardForm";
import InvoiceForm from "../subscriptions/forms/InvoiceForm";
import SubscriptionsForm from '../subscriptions/forms/SubscriptionsForm'
import Loader from "../../components/layouts/Loader";
import SplashWrapper from './sections/SplashWrapper'

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
        const success = this.props.giftRequest.get('success');
        const nextSuccess = nextProps.giftRequest.get('success');

        if (!success && nextSuccess) {      
            const userSubscriptionId = nextProps.giftRequest.get('userSubscriptionId');
            
            this.props.resetGiftRequest();            
            
            this._setStep(3);
            
            this.setState({
                showBillingForm: false,
                subscriptionId: null,
                billingData: {}
            });                        
        }
    }    

    _getSelectedPlan() {
        const {getRecordsRequest, t} = this.props;
        
        const subscription = getRecordsRequest.get('records').find((element) => {
            return (Number(element.get('id')) === this.state.subscriptionId);
        });
        
        if (subscription) {
            let price = (this.state.period === 'month' ? subscription.get('priceMonthly') : subscription.get('priceYearly'));
        
            return (
                <div className="col-sm-12 text-center">                                                                                    
                    <p className="display-6">{t('yourPlan')}: <strong>{subscription.get('title')}</strong> - <strong className="g-blue">${price}</strong> / {t(this.state.period)}</p>     
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
        const {billingData} = this.state;
        const errors        = giftRequest.get('errors');
        const loading       = giftRequest.get('loading') || getRecordsRequest.get('loading')
                
        return (
            <SplashWrapper className="gifts splash-container">
                <h1 className="text-center m--margin-top-15 g-metal">{t('sendGift')}</h1>
                {loading && <Loader/>}
                {this.state.step === 1 &&
                    <SubscriptionsForm subscriptions={getRecordsRequest.get('records')} onSelect={(data) => this._handleSelectPlan(data)} subscriptionId={this.state.subscriptionId} period={this.state.period} />
                }
                {this.state.step === 2 &&
                    <div className='m-portlet m-portlet--head-solid-bg m--margin-top-30'>
                        <div className='m-portlet__body'>
                            <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                                {this._getSelectedPlan()}
                                <h2 className='m--margin-20'>{t('personalInformation')}</h2>                    
                                <div className='row align-items-center'>
                                    <GiftForm errors={errors} onChange={(form) => this._handleForm(form)} form={billingData} />
                                </div>                                
                                <h2 className='m--margin-20'>{t('creditCard')}</h2>                    
                                <div className='row align-items-center'>
                                    <CreditCardForm errors={errors} onChange={(form) => this._handleForm(form)} form={billingData} />                                        
                                </div>
                                <div className='row align-items-center'>
                                    <div className="col-sm-12 text-center m--margin-top-35">                                        
                                        <button disabled={loading} onClick={() => { this._submitCreditCardPayment() }} className="btn btn-info">{t('makePayment')}</button>
                                        <button disabled={loading} onClick={() => { this._setStep(1) }} className="btn btn-default m--margin-left-10">{t('back')}</button>                                                                  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                {this.state.step === 3 &&
                    <InvoiceForm data={giftRequest.get('record')} />
                }                         
            </SplashWrapper>
        );
    }
}

Gift = connect(
    (state) => ({
        giftRequest:  selectPublicGiftRequest(state),
        getRecordsRequest: selectGetRecordsRequest(state)    
    }),
    (dispatch) => ({
        giftPublic: (data) => dispatch(giftPublic(data)),
        resetGiftRequest: () => dispatch(resetPublicGiftRequest()),        
        getRecords: () => dispatch(getRecords()),
        goTo: (url) => {dispatch(push(url))}
    })
)(Gift);

export default translate('translations')(Gift);