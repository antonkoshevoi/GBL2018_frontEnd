import React, {Component} from 'react';
import {translate} from "react-i18next";
import LineChart from "./widgets/LineChart";
import PassRate from "../widgets/PassRate";
import SchoolAverageChart from "../widgets/SchoolAverageChart";
import RosterStatistic from "./widgets/RosterStatistic";
import StudentsGrid from "../widgets/StudentsGrid";
import {connect} from "react-redux";
import {getCharts} from "../../../../redux/reports/homerooms/actions";
import {selectChartDatatRequest} from "../../../../redux/reports/homerooms/selectors";
import {getStudents} from "../../../../redux/reports/homerooms/actions";
import {selectStudentsRequest} from "../../../../redux/reports/homerooms/selectors";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      homeroomId: null
    }
  }

  componentDidMount() {
    const homeroomId = this.props.match.params.id;
    const { getCharts, getStudents } = this.props;
    
    this.setState({ homeroomId });

    getCharts(homeroomId);
    getStudents(homeroomId);
  }  

  render() {
    const { homeroomId } = this.state;
    const { dataRequest, studentsRequest, t } = this.props;

    return (
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
              <RosterStatistic homeroomId={homeroomId}/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <SchoolAverageChart loading={dataRequest.get('loading')} data={dataRequest.get('data').toJS()} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <PassRate loading={dataRequest.get('loading')}  data={dataRequest.get('data').toJS()} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <LineChart homeroomId={homeroomId}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
                {studentsRequest.get('success') && <StudentsGrid students={studentsRequest.get('records').toJS()}/>}
            </div>
          </div>
      </div>
    );
  }
}
    
Dashboard = connect(
  (state) => ({
    dataRequest: selectChartDatatRequest(state),
    studentsRequest: selectStudentsRequest(state)
  }),
  (dispatch) => ({
    getCharts: (id, params = {}) => {dispatch(getCharts(id, params))},
    getStudents: (id, params = {}) => {dispatch(getStudents(id, params))}
  })
)(Dashboard);

export default translate('translations')(Dashboard);