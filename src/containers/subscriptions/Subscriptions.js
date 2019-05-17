import React, { Component } from 'react';
import { withTranslation, Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetRecordsRequest } from '../../redux/subscriptions/selectors';
import { getRecords } from '../../redux/subscriptions/actions';
import { push } from 'react-router-redux';
import { Price } from '../../components/ui/Price';
import Loader from '../../components/layouts/Loader';
import './Subscriptions.css'

class Subscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount () {
    const { getRecords } = this.props;
    getRecords();
  }
  
  _renderRecords () {
    const { getRecordsRequest, goTo, t } = this.props;
    const loading = getRecordsRequest.get('loading');

    if (!loading && getRecordsRequest.get('records').size === 0) {
      return (
            <div className="table-message">
              <h2>{t('subscriptionsNotFound')}</h2>
            </div>
      );
    }              
    
    return getRecordsRequest.get('records').map((record, key) => {
        const courses = record.get('allowedCourses');
        const students = record.get('allowedStudents');        
        return (        
        <div key={key} className="subscription-item-block col-sm-12 col-md-4 col-lg-4 col-xl-4 m--margin-top-35">
            <div className={`subscription-item item-${key}`}>
                <div className="subscription-header"><h1>{t(record.get('title'))}</h1></div>
                <div className="subscription-content">
                    <div className="subscription-prices">
                        <div className="row">
                            <div className="selected col-6 col-sm-7 px-0 align-self-center"><span className="price"><Price price={record.get('priceMonthly')} /> <span className="small">{record.get('currency')}</span></span> <span className="text-muted">{t('perMonth')}</span></div>
                            <div className="col-6 col-sm-5 px-0 text-right align-self-center"><span className="price"><Price price={record.get('priceYearly')} /> <span className="small">{record.get('currency')}</span></span> <span className="text-muted">{t('perYear')}</span></div>            
                        </div>
                    </div>
                    <div className="subscription-description">
                        <div className="subscription-limits">
                            <Trans i18nKey="translations:courseAtTime">
                                <span className="m--font-bolder">{{courses}}</span>
                            </Trans>
                            <br />
                            <Trans i18nKey={record.get('allowedCourses') > 1 ? 'translations:courseAnyCoursesSwitchAnyTime' : 'translations:courseAnyCourseSwitchAnyTime'}>
                                <span className="m--font-bolder">{{courses}}</span>
                            </Trans>
                            <br />
                            <Trans i18nKey={record.get('allowedStudents') > 1 ? 'translations:usersMax' : 'translations:userMax'}>
                                <span className="m--font-bolder">{{students}}</span>
                            </Trans>
                        </div>            
                        <div className="subscription-bonuses text-left">
                            <span>{t('annualBonus')}:</span>
                            <span className="bonus">{record.get('allowedStudents') > 1 ? t('freeWorkbooks', {number: record.get('allowedStudents')}) : t('freeWorkbook')}</span>
                        </div>
                        <p className="text-center">
                            <button onClick={() => { goTo(`/subscribe/${record.get('id')}`); }} className="btn btn-info">{t('getThis')}</button>
                        </p>
                    </div>
                </div>
            </div>  
        </div>);
    });
  }

  render() {
    const { t, getRecordsRequest } = this.props;       

    return (<div className="fadeInLeft animated">
        <h1 className="text-center m--margin-top-50 g-metal">{t('courseSubscriptionOptions')}</h1>
        <div className="px-3">
            <div className="subscriptions-block">
                <div className="row">
                    {getRecordsRequest.get('success') ? this._renderRecords() : <Loader />}
                </div>
            </div>
        </div>
    </div>);
  }
}

Subscriptions = connect(
  (state) => ({
    getRecordsRequest: selectGetRecordsRequest(state)    
  }),
  (dispatch) => ({
    getRecords: (params = {}) => { dispatch(getRecords(params)) },
    goTo: (url) => {dispatch(push(url))}
  })
)(Subscriptions);

export default withTranslation('translations')(Subscriptions);