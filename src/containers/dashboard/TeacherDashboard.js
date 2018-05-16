import React, {Component} from 'react';
import {ChartData} from "../../data/Charts";
import AppDownloadDrawer from "../../components/ui/AppDownloadDrawer";
import SchoolAverageChart from "../pages/reports/widgets/SchoolAverageChart";
import RosterStatistic from "../pages/reports/widgets/RosterStatistic";
import LineChart from "../pages/reports/widgets/LineChart";
import {connect} from "react-redux";
import {translate} from "react-i18next";
import {withRouter} from "react-router-dom";
import LinksWidgets from "../pages/reports/widgets/LinksWidgets";
import QuickLink from "../pages/reports/widgets/QuickLink";
import Card from "../../components/ui/Card";

export default class TeacherDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="fadeInLeft  animated">
        <div className="row dashboard-main-top">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-9 dashboard-reports-snapshot" style={{marginTop:'15px'}}>
            <Card title="Reports Snapshot" isMainCard={true} boxShadow={false} style={{boxShadow:"none"}} bodyStyle={{padding:'0', background:'#f2f3f8'}}>
              <div className="row row-15">
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 margin-bottom-zero">
                  <RosterStatistic/>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 margin-bottom-zero">
                  <LineChart/>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 margin-bottom-zero">
                  <SchoolAverageChart/>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-3 m--visible-tablet-and-mobile m--visible-desktop-lg">
                  <QuickLink/>
                </div>
              </div>
            </Card>

          </div>
          <div className="col-sm-12 col-xl-3 m--hidden-tablet-and-mobile m--hidden-desktop-lg dashboard-quick-links">
            <QuickLink/>
          </div>
        </div>
      </div>
    )
  }
}