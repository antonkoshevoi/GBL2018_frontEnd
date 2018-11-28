import React, {Component} from 'react';
import {Select, MenuItem} from '@material-ui/core';
import LessonsTable from './LessonsTable';
import {translate} from 'react-i18next';

class TabSection extends Component {

  constructor(props) {
    super(props);
              
    this.state = {
      classroom: ''
    }
  }

  componentWillReceiveProps(nextProps) {    
    if (!this.props.data.length && nextProps.data.length) {
        this.setState({classroom: nextProps.data[0].classroomId});
    }
  }

  handleChange (event) {
      const { value } = event.target;
  
      this.setState({classroom: value});
  };

  _renderSelect(courses) {        
        return (
          <Select value={this.state.classroom} onChange={(e) => { this.handleChange(e) }} name='classroom' id='classroom'>            
            {courses.map(function (item, i) {
                return <MenuItem key={i} value={item.classroomId}>{item.classroomName}: {item.course.crsTitle}</MenuItem>
            })}
          </Select>);
  }

  _renderContent() {
    const {classroom} = this.state;
    const {studentId} = this.props;
        
    if (classroom) {
        return (<LessonsTable studentId={studentId} classroomId={classroom}></LessonsTable>)
    }
    return '';           
  }

  render() {    
    const {data, t} = this.props;
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
                {data.length && this._renderSelect(data)}                  
            </div>
          </div>
          <div className="m-portlet__body">
            {data.length && this._renderContent()}
          </div>
        </div>         
        </div>
      </div>
    );
  }
}

export default translate('translations')(TabSection);
