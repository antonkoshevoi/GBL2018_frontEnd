import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import Card from "../../../../components/ui/Card";
import { CircularProgress } from '@material-ui/core';
import {selectRosterStatisticRequest} from "../../../../redux/reports/homerooms/selectors";
import {getRosterStatistic} from "../../../../redux/reports/homerooms/actions";

class RosterStatistic extends Component {
  static propTypes = {
    homeroomId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { getRosterStatistic, homeroomId } = this.props;

    getRosterStatistic(homeroomId);
  }

  render() {
    const data = this.props.getRosterStatisticRequest.get('data').toJS();
    const loading = this.props.getRosterStatisticRequest.get('loading');
    const success = this.props.getRosterStatisticRequest.get('success');
    const { t } = this.props;
    
    return (
      <Card
        title={success ? data.homeroom.name : ''}
        className="profile-card"
        avatar={success ? data.homeroom.avatar : ''}>
        <div className="m-widget1 p-0">
          <div className="m-widget1 p-0">
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

export default withTranslation('translations')(RosterStatistic);
