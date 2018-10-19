import React, {Component} from 'react';
import {Select, MenuItem} from '@material-ui/core';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from '../../../../components/ui/table';
import LessonsTable from './LessonsTable';
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

  _renderTabs(courses) {
        const {t} = this.props;

        return <div>          
          <Select
            value={this.state.classroom}
            onChange={(e) => { this.handleChange(e) }}
            inputProps={{
              name: 'classroom',
              id: 'classroom'
            }}
          >
            <MenuItem key={-1} value="details">{t('detailedData')}</MenuItem>
            {courses.map(function (item, i) {
                return <MenuItem key={i} value={item.classroomId}>{item.classroomName}: {item.course.crsTitle}</MenuItem>
            })}
          </Select>
        </div>    
  }

  _renderTabContent(courses) {
    const {classroom} = this.state;
    const {studentId} = this.props;
    
    if (classroom === 'details') {
        return this._renderDetailedData(courses[0] || null);
    }
    return courses.map(function (item, i) {
        if (classroom == item.classroomId) {
            return (<LessonsTable studentId={studentId} classroomId={item.classroomId} key={i}></LessonsTable>)
        }
        return false;        
    });    
  }

  _renderDetailedData(course) {
    const {t} = this.props;
    
    if (!course) {
        return <Table>
            <Row index={0} key={0}>
                <Td><h2>{t('noData')}</h2></Td>
            </Row>
        </Table>;
    }
    
    return (
        <Table>
            <Thead>
                <HeadRow>
                  <Th first={true} width='20px'>#</Th>
                  <Th width='150px'>{t('date')}</Th>
                  <Th width='150px'>{t('classroom')}</Th>
                  <Th width='150px'>{t('course')}</Th>
                  <Th width='200px'>{t('unitLesson')}</Th>
                  <Th width='50px'>{t('score')}</Th>
                  <Th width='50px'>{t('percent')}</Th>
                  <Th width='50px'>{t('passFail')}</Th>
                  <Th width='50px'>{t('passesAttempts')}</Th>
                </HeadRow>
            </Thead>
            <Tbody>
                {course.attempts.map(function (attempt, i) {
                  return (
                    <Row index={i} key={i}>
                      <Td first={true} width='20px'>{i + 1}</Td>
                      <Td width='150px'>{attempt.att_date}</Td>
                      <Td width='150px'>{attempt.classroom_name}</Td>
                      <Td width='150px'>{attempt.course_name}</Td>
                      <Td width='200px'>{attempt.lesson}</Td>
                      <Td width='50px'>{attempt.scored_points} / {attempt.lesson_points}</Td>
                      <Td width='50px'>{(attempt.scored_points / attempt.lesson_points) * 100}</Td>
                      <Td width='50px'>
                        <span className={`m-badge m-badge--brand m-badge--wide ${attempt.pass ? 'm-badge--success' : 'm-badge--danger'}`}>
                          {attempt.pass ? t('pass') : t('fail')}
                        </span>
                      </Td>
                      <Td width='50px'>{attempt.passes} / {attempt.attempts} </Td>
                    </Row>)
                })}
            </Tbody>
        </Table>);
  }

  render() {
    
    const {t, data}    = this.props;

    return (
      <div className="row ">
        <div className="col-md-12">         
        <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
          <div className="m-portlet__head d-flex justify-content-between align-items-center">
            <div className="m-portlet__head-caption col-sm-4">
              <div className="m-portlet__head-title">
              <span className="m-portlet__head-icon">
                <i className="fa fa-line-chart"></i>
              </span>
              <h3 className="m-portlet__head-text">{t('reports')}</h3></div>
            </div>
            <div className="m-portlet__head-tools col-sm-8">
                {this._renderTabs(data.data)}                  
            </div>
          </div>
          <div className="m-portlet__body" style={{height: '100%'}}>
            {this._renderTabContent(data.data)}
          </div>
        </div>         
        </div>
      </div>
    );
  }
}

export default translate('translations')(TabSection);
