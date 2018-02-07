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
      classroomId: null
    }
  }

  componentDidMount() {
    const classroomId = this.props.match.params.id;
    this.setState({ classroomId });
  }

  render() {
    const { classroomId } = this.state;

    return (
      <div className="fadeInLeft animated">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3">
            {classroomId && <RosterStatistic classroomId={classroomId}/>}
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            {classroomId && <LineChart classroomId={classroomId}/>}
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            {classroomId && <PassRate classroomId={classroomId}/>}
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            {classroomId &&<SchoolAverageChart classroomId={classroomId}/>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {classroomId &&<DashboardTabs classroomId={classroomId}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default translate('reports')(Dashboard);