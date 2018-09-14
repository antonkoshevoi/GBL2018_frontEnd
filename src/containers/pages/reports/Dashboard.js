import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {connect} from "react-redux";
import LineChart from './widgets/LineChart';
import PassRate from './widgets/PassRate';
import SchoolAverageChart from './widgets/SchoolAverageChart';
import RosterStatistic from './widgets/RosterStatistic';
import DashboardTabs from './DashboardTabs';
import {getCharts} from "../../../redux/reports/dashboard/actions";
import {selectChartDatatRequest} from "../../../redux/reports/dashboard/selectors";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const {getCharts} = this.props;
    getCharts();
  }
  
  render() {
    const {t, dataRequest} = this.props;
    return (
      <div className="fadeInLeft animated">
        <div className="row dashboard-main-top row-reports-main-top-block m-portlet  m-portlet--head-solid-bg">
          <div className="m-portlet__head report-snapshot-header-border border-b-blue">
            <div className="m-portlet__head-caption">
              <div className="m-portlet__head-title">
                <h3 className="m-portlet__head-text reports-text-header">{t('reportsSnapshot')}</h3>
              </div>
            </div>
          </div>
          <div className="reports-flex-row">
            <div className="col-sm-12 col-md-6 col-lg-3">
              <RosterStatistic/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <LineChart/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
                <PassRate loading={dataRequest.get('loading')}  data={dataRequest.get('data').toJS()} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
                <SchoolAverageChart loading={dataRequest.get('loading')} data={dataRequest.get('data').toJS()} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <DashboardTabs/>
          </div>
        </div>
      </div>
    );
  }
}
    
Dashboard = connect(
  (state) => ({
    dataRequest: selectChartDatatRequest(state)
  }),
  (dispatch) => ({
    getCharts: (params = {}) => {
      dispatch(getCharts(params))
    }
  })
)(Dashboard);

export default translate('translations')(Dashboard);