import React, {Component} from 'react';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import Card from "../../../components/ui/Card";
import { CircularProgress } from '@material-ui/core';
import {selectRosterStatisticRequest} from "../../../redux/reports/dashboard/selectors";
import {getRosterStatistic} from "../../../redux/reports/dashboard/actions";
import HasRole from "../../middlewares/HasRole";

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
        iconBackground="circle-background"
        icon="fa fa-institution display-6">
        <div className="m-widget1 p-0">
          <div className="m-widget1 p-0">
          <HasRole roles={['Superadministrator', 'Superintendent']}>
            <div className="m-widget1__item">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('schools')}</h3>
                </div>
                <div className="col text-right">
                  <span className="m-widget1__number text-info">
                      { !success && <CircularProgress size={15} color="primary"/> }
                      { !loading && (data.schoolsCount || 0) }
                  </span>
                </div>
              </div>
            </div>          
          </HasRole>
            <div className="m-widget1__item">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('students')}</h3>
                </div>
                <div className="col text-right">
                  <span className="m-widget1__number text-info">
                      { !success && <CircularProgress size={15} color="primary"/> }
                      { !loading && (data.studentsCount || 0) }
                  </span>
                </div>
              </div>
            </div>
            <div className="m-widget1__item">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('classrooms')}</h3>
                </div>
                <div className="col text-right">
                  <span className="m-widget1__number text-info">
                      { !success && <CircularProgress size={15} color="primary"/> }
                      { !loading && (data.classroomsCount || 0) }
                  </span>
                </div>
              </div>
            </div>
            <div className="m-widget1__item">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('homerooms')}</h3>
                </div>
                <div className="col text-right">
                  <span className="m-widget1__number text-info">
                      { !success && <CircularProgress size={15} color="primary"/> }
                      { !loading && (data.homeroomsCount || 0) }
                  </span>
                </div>
              </div>
            </div>
            <HasRole roles={['Principal', 'Administrator', 'Superadministrator']}>
            <div className="m-widget1__item">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('teachers')}</h3>
                </div>
                <div className="col text-right">
                  <span className="m-widget1__number text-info">
                      { !success && <CircularProgress size={15} color="primary"/> }
                    { !loading && (data.teachersCount || 0) }
                  </span>
                </div>
              </div>
            </div>
            </HasRole>
            <HasRole roles={['Principal', 'Administrator', 'Superadministrator']}>
            <div className="m-widget1__item">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">{t('admins')}</h3>
                </div>
                <div className="col text-right">
                  <span className="m-widget1__number text-info">
                      { !success && <CircularProgress size={15} color="primary"/> }
                    { !loading && (data.adminsCount || 0) }
                  </span>
                </div>
              </div>
            </div>
          </HasRole>
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

export default withTranslation('translations')(RosterStatistic);
