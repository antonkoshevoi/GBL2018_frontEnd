import React, {Component} from 'react';
import {translate} from "react-i18next";
import LineChart from "./widgets/LineChart";
import PassRate from "./widgets/PassRate";
import SchoolAverageChart from "./widgets/SchoolAverageChart";
import RosterStatistic from "./widgets/RosterStatistic";
import DashboardTabs from "./DashboardTabs";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      homeroomId: null
    }
  }

  componentDidMount() {
    const homeroomId = this.props.match.params.id;
    this.setState({ homeroomId });
  }

  render() {
    const { homeroomId } = this.state;

    return (
      <div className="fadeInLeft animated">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3">
            {homeroomId && <RosterStatistic homeroomId={homeroomId}/>}
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            {homeroomId &&<SchoolAverageChart homeroomId={homeroomId}/>}
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            {homeroomId && <PassRate homeroomId={homeroomId}/>}
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            {homeroomId && <LineChart homeroomId={homeroomId}/>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {homeroomId &&<DashboardTabs homeroomId={homeroomId}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default translate('reports')(Dashboard);