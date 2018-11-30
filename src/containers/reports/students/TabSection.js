import React, {Component} from 'react';
import {Select, MenuItem} from '@material-ui/core';
import LessonsTable from './LessonsTable';
import AttemptsTable from './AttemptsTable';
import {translate} from 'react-i18next';

class TabSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classroom: 'details'
    }
  }
 
  handleChange (event) {
      const { value } = event.target;
  
      this.setState({classroom: value});
  };

  _renderClassRooms(courses) {
        const {t} = this.props;

        return <div>          
          <Select
            value={this.state.classroom}
            onChange={(e) => { this.handleChange(e) }}            
            name='classroom'
            id='classroom'            
          >
            <MenuItem key={-1} value="details">{t('detailedData')}</MenuItem>
            {courses.map(function (item, i) {
                return <MenuItem key={i} value={item.classroomId}>{item.classroomName}: {item.courseName}</MenuItem>
            })}
          </Select>
        </div>    
  }

  _renderReportDetails(courses) {
    const {classroom} = this.state;
    const {studentId} = this.props;
    
    if (classroom === 'details') {
        return <AttemptsTable studentId={studentId} />;
    }
    
    return courses.map(function (item, i) {
        if (classroom === item.classroomId) {
            return (<LessonsTable studentId={studentId} classroomId={item.classroomId} key={i}></LessonsTable>)
        }
        return false;        
    });    
  }

  render() {
    
    const {t, data}    = this.props;

    return (
      <div className="row ">
        <div className="col-md-12">         
        <div className="m-portlet m-portlet--head-solid-bg">
          <div className="m-portlet__head border-b-blue">
            <div className="m-portlet__head-caption">
              <div className="m-portlet__head-title">
              <span className="m-portlet__head-icon">
                <i className="fa fa-line-chart  display-6 circle-background"></i>
              </span>
              <h3 className="m-portlet__head-text">{t('reports')}</h3></div>
            </div>
            <div className="m-portlet__head-tools col-sm-8">
                {data && this._renderClassRooms(data)}                  
            </div>
          </div>
          <div className="m-portlet__body">
            {this._renderReportDetails(data)}
          </div>
        </div>         
        </div>
      </div>
    );
  }
}

export default translate('translations')(TabSection);
