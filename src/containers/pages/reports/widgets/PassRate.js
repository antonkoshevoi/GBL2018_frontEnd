import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCharts} from "../../../../redux/reports/dashboard/actions";
import {selectChartDatatRequest} from "../../../../redux/reports/dashboard/selectors";
import Card from "../../../../components/ui/Card";
import {CircularProgress} from '@material-ui/core';
import {translate} from 'react-i18next';

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
    const {getChartDataRequest, t} = this.props;
    const data = getChartDataRequest.get('data').toJS();
    const loading = getChartDataRequest.get('loading');
    const success = getChartDataRequest.get('success');
    const fail = getChartDataRequest.get('fail');

    return (
      <Card title={t('passRate')} icon="flaticon-list-2" className='passRateCard'>
        <h1  className="d-flex justify-content-center align-items-center absolute-center" style={{fontSize:'7rem',color:'rgb(0, 128, 0)'}}>
          {loading && !success && <CircularProgress color="primary"/>}
          {!loading && success && data.passRate + '%'}
          {fail && <span style={{color: 'red' }}>{t('error')}</span>}
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

export default translate('translations')(PassRate);
