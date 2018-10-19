import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {connect} from "react-redux";
import LineChart from '../widgets/LineChart';
import PassRate from '../widgets/PassRate';
import SchoolAverageChart from '../widgets/SchoolAverageChart';
import RosterStatistic from './widgets/RosterStatistic';
import Students from "../widgets/Students";
import {getCharts} from "../../../../redux/reports/classroom/actions";
import {selectChartDatatRequest} from "../../../../redux/reports/classroom/selectors";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classroomId: this.props.match.params.id
    }
  }

  componentDidMount() {    
    const { getCharts } = this.props;    
    getCharts(this.state.classroomId);       
  }

  render() {
    const {classroomId} = this.state;
    const {t, dataRequest } = this.props;        

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
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-3">
              <RosterStatistic classroomId={classroomId}/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <SchoolAverageChart loading={dataRequest.get('loading')} data={dataRequest.get('data').toJS()} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <PassRate loading={dataRequest.get('loading')}  data={dataRequest.get('data').toJS()} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <LineChart type='classroom' id={classroomId}/>
            </div>    
            <div className="col-md-12">
                <div className="m--margin-top-25">
                  <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                    <div className="m-portlet__head d-flex justify-content-between align-items-center">
                      <div className="m-portlet__head-caption col-sm-4">
                        <div className="m-portlet__head-title"><span className="m-portlet__head-icon"><i
                          className="flaticon-analytics"></i></span><h3 className="m-portlet__head-text">{t('students')}</h3></div>
                      </div>                
                    </div>
                    <div className="m-portlet__body" style={{height: '100%'}}>
                        <Students filters={{ classroomId: classroomId }} />
                    </div>
                  </div>
                </div>
            </div>
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
    getCharts: (id, params = {}) => { dispatch(getCharts(id, params))}
  })
)(Dashboard);

export default translate('translations')(Dashboard);
