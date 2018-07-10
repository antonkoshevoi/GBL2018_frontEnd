import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {translate} from "react-i18next";
import Card from "../../../../components/ui/Card";
import { CircularProgress } from '@material-ui/core';
import {selectRosterStatisticRequest} from "../../../../redux/reports/dashboard/selectors";
import {getRosterStatistic} from "../../../../redux/reports/dashboard/actions";

class RosterStatistic extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { getRosterStatistic } = this.props;
    getRosterStatistic();
  }

  render() {
    const data = this.props.getRosterStatisticRequest.get('data').toJS();
    const loading = this.props.getRosterStatisticRequest.get('loading');
    const success = this.props.getRosterStatisticRequest.get('success');
    const { t } = this.props;

    return (
      <Card
        title={t('roster')}
        className="profile-card"
        avatar={success && data.school.avatar ? data.school.avatar : ''}
        iconBackground="circle-background"
        icon={'fa fa-institution'}>
        <div className="m-widget1 m-widget1--paddingless">
          <div className="m-widget1 m-widget1--paddingless">
            <div className="m-widget1__item">
              <div className="row m-row--no-padding align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('students')}</h3>
                </div>
                <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                      { !success && <CircularProgress size={15} color="primary"/> }
                      { !loading && data.studentsCount }
                  </span>
                </div>
              </div>
            </div>
            <div className="m-widget1__item">
              <div className="row m-row--no-padding align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('classrooms')}</h3>
                </div>
                <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                      { !success && <CircularProgress size={15} color="primary"/> }
                      { !loading && data.classroomsCount }
                  </span>
                </div>
              </div>
            </div>
            <div className="m-widget1__item">
              <div className="row m-row--no-padding align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('homerooms')}</h3>
                </div>
                <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                      { !success && <CircularProgress size={15} color="primary"/> }
                      { !loading && data.homeroomsCount }
                  </span>
                </div>
              </div>
            </div>
            <div className="m-widget1__item">
              <div className="row m-row--no-padding align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('teachers')}</h3>
                </div>
                <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                      { !success && <CircularProgress size={15} color="primary"/> }
                    { !loading && data.teachersCount }
                  </span>
                </div>
              </div>
            </div>
            <div className="m-widget1__item">
              <div className="row m-row--no-padding align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('admins')}</h3>
                </div>
                <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                      { !success && <CircularProgress size={15} color="primary"/> }
                    { !loading && data.adminsCount }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

RosterStatistic = connect(
  (state) => ({
    getRosterStatisticRequest: selectRosterStatisticRequest(state)
  }),
  (dispatch) => ({
    getRosterStatistic: (params = {}) => {dispatch(getRosterStatistic(params))},
  })
)(RosterStatistic);

export default translate('translations')(RosterStatistic);
