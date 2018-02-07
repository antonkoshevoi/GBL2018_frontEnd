import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Card from "../../../../components/ui/Card";
import { CircularProgress } from 'material-ui';
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

    return (
      <Card
        title={'Roster'}
        className="profile-card"
        avatar={success && data.school.avatar ? data.school.avatar : ''}
        icon={'fa fa-institution'}>
        <div className="m-widget1 m-widget1--paddingless">
          <div className="m-widget1 m-widget1--paddingless">
            <div className="m-widget1__item">
              <div className="row m-row--no-padding align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">Students</h3>
                </div>
                <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                      { !success && <CircularProgress size={15} color="accent"/> }
                      { !loading && data.studentsCount }
                  </span>
                </div>
              </div>
            </div>
            <div className="m-widget1__item">
              <div className="row m-row--no-padding align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">Classrooms</h3>
                </div>
                <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                      { !success && <CircularProgress size={15} color="accent"/> }
                      { !loading && data.classroomsCount }
                  </span>
                </div>
              </div>
            </div>
            <div className="m-widget1__item">
              <div className="row m-row--no-padding align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">Homerooms</h3>
                </div>
                <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                      { !success && <CircularProgress size={15} color="accent"/> }
                      { !loading && data.homeroomsCount }
                  </span>
                </div>
              </div>
            </div>
            <div className="m-widget1__item">
              <div className="row m-row--no-padding align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">Teachers</h3>
                </div>
                <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                      { !success && <CircularProgress size={15} color="accent"/> }
                    { !loading && data.teachersCount }
                  </span>
                </div>
              </div>
            </div>
            <div className="m-widget1__item">
              <div className="row m-row--no-padding align-items-center">
                <div className="col">
                  <h3 className="m-widget1__title">Admins</h3>
                </div>
                <div className="col m--align-right">
                  <span className="m-widget1__number m--font-brand">
                      { !success && <CircularProgress size={15} color="accent"/> }
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

export default RosterStatistic;
