import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Card from "../../../../../components/ui/Card";
import { CircularProgress } from 'material-ui';
import {selectRosterStatisticRequest} from "../../../../../redux/reports/classroom/selectors";
import {getRosterStatistic} from "../../../../../redux/reports/classroom/actions";

class RosterStatistic extends Component {
  static propTypes = {
    classroomId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { getRosterStatistic, classroomId } = this.props;

    getRosterStatistic(classroomId);
  }

  render() {
    const data = this.props.getRosterStatisticRequest.get('data').toJS();
    const loading = this.props.getRosterStatisticRequest.get('loading');
    const success = this.props.getRosterStatisticRequest.get('success');

    return (
      <Card
        title={success ? data.classroom.crmName : ''}
        className="profile-card"
        avatar='http://admissions.berkeley.edu/sites/default/files/UCB_landingpage_images_600x300_212.jpg'>
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
    getRosterStatistic: (id, params = {}) => {dispatch(getRosterStatistic(id, params))},
  })
)(RosterStatistic);

export default RosterStatistic;
