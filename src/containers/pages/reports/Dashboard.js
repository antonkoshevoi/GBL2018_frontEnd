import React, {Component} from 'react';
import {translate} from 'react-i18next';
import LineChart from './widgets/LineChart';
import PassRate from './widgets/PassRate';
import SchoolAverageChart from './widgets/SchoolAverageChart';
import RosterStatistic from './widgets/RosterStatistic';
import DashboardTabs from './DashboardTabs';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="fadeInLeft animated">
        <div className="row dashboard-main-top row-reports-main-top-block m-portlet  m-portlet--head-solid-bg">
          <div className="m-portlet__head report-snapshot-header-border border-b-blue">
            <div className="m-portlet__head-caption">
              <div className="m-portlet__head-title">
                <h3 className="m-portlet__head-text reports-text-header">Reports Snapshot</h3>
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
              <PassRate/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <SchoolAverageChart/>
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

export default translate('reports')(Dashboard);