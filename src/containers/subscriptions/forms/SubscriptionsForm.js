import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {Price} from "../../../components/ui/Price";

import learner1 from '../../../media/images/1-learner.png';
import learner2 from '../../../media/images/2-learner.png';
import learner3 from '../../../media/images/3-learner.png';
import learner4 from '../../../media/images/4-learner.png';
import learner5 from '../../../media/images/5-learner.png';

import '../../../styles/subscriptions.css'

const images = [
    learner1, learner2, learner3, learner4, learner5
];

class SubscriptionsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }         
    
    _handleSelectPlan(subscriptionId, period) {
        this.props.onSelect({
            subscriptionId: subscriptionId,            
            period:         period
        });
    }
    
    render() {        
        
        const {t, subscriptions} = this.props;        
        
        if (!this.props.subscriptions.size) {
            return '';
        }
                
        return (
            <div>
                <div className="subscriptions-banner d-flex justify-content-center align-items-end">
                    <div className="description">
                        <h3>{t('subscriptionPlansInclude')}</h3>
                        <p>* {t('accessToAllCourses')}</p>
                        <p>* {t('simultaneousCoursesPerLearner')}</p>
                        <p>* {t('switchCoursesAnytime')}</p>
                        <p>* {t('adminToolsAndReports')}</p>
                    </div>
                </div>
                <div className="subscriptions-list py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-11 col-lg-10 col-xl-8 m-auto">
                            { subscriptions.toJS().map((subscription, key) => (
                                <div className="row mb-4" key={key}>
                                    <div className="col-12 col-md-5 text-center d-md-flex align-items-center">
                                        <div className="mb-3 mb-md-0"><img alt="" src={images[key] || images[0]} /></div>   
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <h3 className="text-center mb-4">{t('learnerPlan', {learners: subscription.allowedStudents})}</h3>
                                        <div className="d-sm-flex justify-content-center align-items-center">
                                            <div className="text-center mx-2">
                                                <button className="btn btn-warning m-2" onClick={() => this._handleSelectPlan(subscription.id, 'month')}><Price price={subscription.priceMonthly} currency={subscription.currency} />/{t('month')}</button>
                                            </div>
                                            <div className="text-center mx-2">
                                                {(subscription.trialDays.year > 0) && <div className="text-center"><strong>{t('startTrialPeriod', {days: subscription.trialDays.year})}!</strong></div>}
                                                <button className="btn btn-warning m-2" onClick={() => this._handleSelectPlan(subscription.id, 'year')}><Price price={subscription.priceYearly} currency={subscription.currency} />/{t('year')}</button>
                                                <div className="text-center">({t('saveWithAnnual')})</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation('translations')(SubscriptionsForm);