import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getCharts} from "../../../../redux/reports/charts/actions";
import {selectChartDatatRequest} from "../../../../redux/reports/charts/selectors";
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

    return (
      <div className="col-sm-12 col-md-6 col-lg-3">
        <Card title="Pass Rate" icon="flaticon-list-2" className='passRateCard'>
          <h1  className="d-flex justify-content-center align-items-center absolute-center" style={{fontSize:'7rem',color:'rgb(0, 128, 0)'}}>
            {getChartDataRequest.get('loading') && <CircularProgress color="accent"/>}
            {!getChartDataRequest.get('loading') && data.passRate + '%'}
          </h1>
        </Card>
      </div>
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
