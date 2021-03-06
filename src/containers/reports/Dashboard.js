import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from "react-redux";
import LineChart from './widgets/LineChart';
import PassRate from './widgets/PassRate';
import SchoolAverageChart from './widgets/SchoolAverageChart';
import RosterStatistic from './widgets/RosterStatistic';
import {getCharts} from "../../redux/reports/dashboard/actions";
import {selectChartDatatRequest} from "../../redux/reports/dashboard/selectors";
import {Tabs, Tab} from '@material-ui/core';
import Students from "./widgets/Students";
import Classrooms from "./widgets/Classrooms";
import Homerooms from "./widgets/Homerooms";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
        tab: 'classRooms'
    }
  }

  componentDidMount() {
    const {getCharts} = this.props;
    getCharts();
  }
  
  handleChange = (event, value) => {
    this.setState({tab: value});
  };  
  
  render() {
    const {t, dataRequest} = this.props;
    const {tab} = this.state;
    
    return (
      <div className="fadeInLeft animated ml-3 mr-3">
          <div className="row">
            <div className="col-sm-12">
                <div className='block-header border-b-blue'>
                    <h3 className='m-portlet__head-text'>{t('reportsSnapshot')}</h3>
                </div>
            </div>          
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
              <RosterStatistic/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
              <LineChart type='school'/>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                <PassRate loading={dataRequest.get('loading')}  data={dataRequest.get('data').toJS()} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                <SchoolAverageChart loading={dataRequest.get('loading')} data={dataRequest.get('data').toJS()} />
            </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div className="mt-4">
              <div className="m-portlet m-portlet--head-solid-bg">
                <div className="m-portlet__head d-flex justify-content-between align-items-center border-b-blue">
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">                
                            <Tabs value={this.state.tab} onChange={this.handleChange} indicatorColor="primary">
                                <Tab className="tab-header-item" value="classRooms" label={t('classrooms')}/>
                                <Tab className="tab-header-item" value="homeRooms" label={t('homerooms')}/>
                                <Tab className="tab-header-item" value="students" label={t('students')}/>
                            </Tabs>
                        </div>
                    </div>                
                </div>
                <div className="m-portlet__body">            
                    {tab === 'students' && <Students /> }
                    {tab === 'classRooms' && <Classrooms /> }
                    {tab === 'homeRooms' && <Homerooms /> }                     
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
    getCharts: (params = {}) => {
      dispatch(getCharts(params))
    }
  })
)(Dashboard));