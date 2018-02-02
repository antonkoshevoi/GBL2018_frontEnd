import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getCharts} from "../../../../redux/reports/dashboard/actions";
import {selectChartDatatRequest} from "../../../../redux/reports/dashboard/selectors";
import Card from "../../../../components/ui/Card";
import {CircularProgress} from "material-ui";

class PassRate extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const {getCharts} = this.props;
    getCharts();
  }

  render() {
    const {getChartDataRequest} = this.props;
    const data = getChartDataRequest.get('data').toJS();
    const loading = getChartDataRequest.get('loading');
    const success = getChartDataRequest.get('success');
    const fail = getChartDataRequest.get('fail');

    return (
      <Card title="Pass Rate" icon="flaticon-list-2" className='passRateCard'>
        <h1  className="d-flex justify-content-center align-items-center absolute-center" style={{fontSize:'7rem',color:'rgb(0, 128, 0)'}}>
          {loading && !success && <CircularProgress color="accent"/>}
          {!loading && success && data.passRate + '%'}
          {fail && <span style={{color: 'red' }}>Error</span>}
        </h1>
      </Card>
    );
  }
}

PassRate = connect(
  (state) => ({
    getChartDataRequest: selectChartDatatRequest(state)
  }),
  (dispatch) => ({
    getCharts: (params = {}) => {dispatch(getCharts(params))},
  })
)(PassRate);

export default PassRate;
