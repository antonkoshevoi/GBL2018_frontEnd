import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs, Typography} from 'material-ui';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from '../../../ui/table';
import Parser from 'html-react-parser';
import ApiClient from "../../../../services/ApiClient";
import {LessonsTable} from '../students/LessonsTable';
import {getStudentClassReport} from '../../../../redux/reports/students/actions';

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

class TabSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'details'
    }
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  _renderTabs(courses) {
    return [
      courses.map(function (item, i) {
        return <Tab key={i} className="tab-header-item" value={item.course.crsId} label={item.course.crsTitle}/>
      }),
      <Tab key={-1} className="tab-header-item" value="details" label="Detailed Data"/>
    ];
  }


  _renderTabContent(courses) {
    const {value} = this.state;
    const _self = this;

    if (value === 'details') {
      if (!courses.length) {
        return null;
      }
      return <TabContainer>
        {this._renderDetailedData(courses[0])}
      </TabContainer>
    } else {
      return courses.map(function (item, i) {
        if (value == item.course.crsId) {
          return (<LessonsTable studentId={item.studentId} classroomId={item.classroomId} key={i}></LessonsTable>)
        } else {
          return (false)
        }
      })
    }
  }

  _renderDetailedData(item) {
    return (
      <Table>
        <Thead>
        <HeadRow>
          <Th first={true} width='20px'>#</Th>
          <Th width='150px'>Date</Th>
          <Th width='150px'>Classroom</Th>
          <Th width='150px'>Course</Th>
          <Th width='200px'>Unit/Lesson</Th>
          <Th width='50px'>Score</Th>
          <Th width='50px'>Percent</Th>
          <Th width='50px'>Pass/Fail</Th>
          <Th width='50px'>Passes/Attempts</Th>
        </HeadRow>
        </Thead>
        <Tbody>
        {item.attempts.map(function (attempt, i) {
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
                <span className='m-badge m-badge--brand m-badge--wide'>
                  {attempt.pass ? 'pass' : 'fail'}
                </span>
              </Td>
              <Td width='50px'>{attempt.passes} / {attempt.attempts} </Td>
            </Row>
          )
        })}
        </Tbody>
      </Table>
    )
  }

  render() {

    const {value} = this.state;
    const {data} = this.props.data;

    return (
      <div className="row ">
        <div className="col-md-12">
          <div className="m--margin-top-40">
            <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
              <div className="m-portlet__head d-flex justify-content-between align-items-center">
                <div className="m-portlet__head-caption col-sm-4">
                  <div className="m-portlet__head-title"><span className="m-portlet__head-icon"><i
                    className="flaticon-analytics"></i></span><h3 className="m-portlet__head-text">Reports</h3></div>
                </div>
                <div className="m-portlet__head-tools col-sm-8">
                  <Tabs
                    className="nav nav-tabs m-tabs-line m-tabs-line--primary m-tabs-line--2x main-tabs pull-right"
                    value={value}
                    onChange={this.handleChange}
                  >
                    {this._renderTabs(data)}
                  </Tabs>
                </div>
              </div>
              <div className="m-portlet__body" style={{height: '100%'}}>
                {this._renderTabContent(data)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TabSection.propTypes = {};

export default TabSection;
