import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from "react-redux";
import LineChart from '../widgets/LineChart';
import PassRate from '../widgets/PassRate';
import SchoolAverageChart from '../widgets/SchoolAverageChart';
import RosterStatistic from './widgets/RosterStatistic';
import Students from "../widgets/Students";
import {getCharts} from "../../../redux/reports/classroom/actions";
import {selectChartDatatRequest} from "../../../redux/reports/classroom/selectors";

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
      <div className="fadeInLeft animated ml-3 mr-3">
          <div className="row">
            <div className="col-sm-12">
                <div className='block-header border-b-blue'>
                    <h3 className='m-portlet__head-text'>{t('reportsSnapshot')}</h3>
                </div>
            </div>           
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
              <RosterStatistic classroomId={classroomId}/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
              <SchoolAverageChart loading={dataRequest.get('loading')} data={dataRequest.get('data').toJS()} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
              <PassRate loading={dataRequest.get('loading')}  data={dataRequest.get('data').toJS()} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
              <LineChart type='classroom' id={classroomId}/>
            </div>    
            <div className="col-md-12">
                <div className="mt-4">
                  <div className="m-portlet m-portlet--head-solid-bg">
                    <div className="m-portlet__head border-b-blue">
                      <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
                            <span className="m-portlet__head-icon">
                                <i className="fa fa-group display-6 circle-background"></i>
                            </span>
                            <h3 className="m-portlet__head-text">{t('students')}</h3>
                        </div>
                      </div>                
                    </div>
                    <div className="m-portlet__body">
                        <Students filters={{ classroomId: classroomId }} />
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>      
    );
  }
}

export default withTranslation('translations')(connect(
  (state) => ({
    dataRequest: selectChartDatatRequest(state)
  }),
  (dispatch) => ({
    getCharts: (id, params = {}) => { dispatch(getCharts(id, params))}
  })
)(Dashboard));
