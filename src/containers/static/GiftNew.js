import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {push} from 'react-router-redux';
import {selectGetRecordsRequest} from '../../redux/subscriptions/selectors';
import {selectPublicGiftRequest} from '../../redux/gifts/selectors';
import {getRecords} from '../../redux/subscriptions/actions';
import {giftPublic, resetPublicGiftRequest} from '../../redux/gifts/actions';
import {Price} from "../../components/ui/Price";
import GiftForm from "./forms/GiftForm";
import CreditCardForm from "../subscriptions/forms/CreditCardForm";
import InvoiceForm from "../subscriptions/forms/InvoiceForm";
import SubscriptionsForm from '../subscriptions/forms/SubscriptionsForm'
import Loader from '../../components/layouts/Loader';
import SplashWrapper from './sections/SplashWrapper';

import learner1 from '../../media/images/1-learner.png';
import learner3 from '../../media/images/3-learner.png';
import learner4 from '../../media/images/5-learner.png';

const images = [
    learner1, learner3, learner4
];

class GiftNew extends Component {

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
                    <p className="display-6">{t('yourPlan')}: <strong>{t(subscription.get('title'))}</strong> - <strong className="g-blue"><Price price={price} currency={subscription.get('currency')} /></strong> / {t(this.state.period)}</p>     
                </div>
            );
        }                
    }
    
    _handleSelectPlan(id, period) {
        this.setState({
            subscriptionId: id,
            period: period
        });
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
    
    _renderSubscriptions() {
        const {getRecordsRequest, t} = this.props;
    
        return <div>
            <div className="subscriptions d-flex justify-content-center align-items-end">
                <div>
                    <h3>All Subscription Plans include</h3>
                    <p>* access to all BZabc Courses</p>
                    <p>* 3 simultaneous courses per learner</p>
                    <p>* freedom to switch courses anytime</p>
                    <p>* parental admin tools and reports</p>
                </div>
            </div>
            <div className="subscriptions-list">
                { getRecordsRequest.get('records').toJS().map((subscription, key) => (
                    <div>
                        <div className="row m-5">
                            <div className="col-12 col-md-5 text-center d-flex align-items-center">
                                <div className="mb-2 mb-sm-0"><img src={images[key] || images[0]} /></div>   
                            </div>
                            <div className="col-12 col-md-7">
                                <h3 className="text-center mb-4">{subscription.allowedStudents} Learner Plan</h3>
                                <div className="d-md-flex justify-content-around">
                                    <div className="text-center">
                                        <button className="btn btn-warning m-2" onClick={() => this._handleSelectPlan(subscription.id, 'month')}><Price price={subscription.priceMonthly} currency={subscription.currency} />/month</button>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-warning m-2" onClick={() => this._handleSelectPlan(subscription.id, 'year')}><Price price={subscription.priceYearly} currency={subscription.currency} />/year</button>
                                        <div className="text-right mt-2">(save 15% with annual)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>;
    }
    
    render() {        
        
        const {giftRequest, getRecordsRequest, t} = this.props;
        const {billingData} = this.state;
        const errors        = giftRequest.get('errors');
        const loading       = giftRequest.get('loading') || getRecordsRequest.get('loading')
                
        return (
            <SplashWrapper className="gifts splash-container pt-0">                
                {loading && <Loader/>}
                {this.state.step === 1 && this._renderSubscriptions()}
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
                                        <button disabled={loading} onClick={() => { this._setStep(1) }} className="btn btn-default">{t('back')}</button>                                                                  
                                        <button disabled={loading} onClick={() => { this._submitCreditCardPayment() }} className="btn btn-info m--margin-left-10">{t('makePayment')}</button>
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

GiftNew = connect(
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
)(GiftNew);

export default withTranslation('translations')(GiftNew);