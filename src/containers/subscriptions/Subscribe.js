import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {translate} from 'react-i18next';
import {push} from 'react-router-redux';
import {selectGetRecordsRequest, selectSubscribeRequest} from '../../redux/subscriptions/selectors';
import {getRecords, subscribe, resetSubscribeRequest, resetGetUserRecordsRequest} from '../../redux/subscriptions/actions';
import CreditCardForm from "./forms/CreditCardForm";
import SubscriptionsForm from "./forms/SubscriptionsForm";
import Loader from "../../components/layouts/Loader";

class Subscribe extends Component {

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
                
        this.setState({subscriptionId: Number(this.props.match.params.id)});
        
        getRecords();
    }
    
    componentWillReceiveProps(nextProps) {                
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

    _getSelectedPlan() {
        const {getRecordsRequest, t} = this.props;
        
        const subscription = getRecordsRequest.get('records').find((element) => {
            return (Number(element.get('id')) === this.state.subscriptionId);
        });
        
        if (subscription) {
            let price = (this.state.period === 'month' ? subscription.get('priceMonthly') : subscription.get('priceYearly'));
        
            return (
                <div className="col-sm-12 text-center">                                                                                    
                    <p className="display-6">{t('yourPlan')}: <strong className="g-blue">${price} {subscription.get('currency')}</strong> / {t(this.state.period)}</p>     
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
            <div className='container'>
                <h1 className="text-center m--margin-top-50 g-metal">{t('subscriptions')}</h1>
                {loading && <Loader />}
                {this.state.showBillingForm ?
                    <div className="col-sm-12 col-md-10 col-lg-9 col-xl-6 m-auto">
                        <div className='m-portlet m-portlet--head-solid-bg m--margin-top-30'>
                            <div className='m-portlet__body'>
                                <div className='m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30'>
                                    <h2 className='m--margin-bottom-40 m--margin-left-20'>{t('creditCard')}</h2>                    
                                    <div className='row align-items-center'>                                                                                
                                        {this._getSelectedPlan()}
                                        
                                        <CreditCardForm errors={errors} onChange={(form) => this._handleForm(form)} form={creditCard} />
                                        
                                        <div className="col-sm-12 text-center m--margin-top-35">                                        
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
                        subscriptionId={this.state.subscriptionId} 
                        period={this.state.period} 
                        subscriptions={getRecordsRequest.get('records')}
                        onSelect={(data) => this._handleSelectPlan(data)}/>
                }      
            </div>        
        );
    }
}

Subscribe = connect(
    (state) => ({
        subscribeRequest:  selectSubscribeRequest(state),
        getRecordsRequest: selectGetRecordsRequest(state)    
    }),
    (dispatch) => ({
        subscribe: (data) => dispatch(subscribe(data)),
        resetSubscribeRequest: () => dispatch(resetSubscribeRequest()),
        resetGetUserRecordsRequest: () => dispatch(resetGetUserRecordsRequest()),
        getRecords: () => dispatch(getRecords()),
        goTo: (url) => {dispatch(push(url))}
    })
)(Subscribe);

export default withRouter(translate('translations')(Subscribe));