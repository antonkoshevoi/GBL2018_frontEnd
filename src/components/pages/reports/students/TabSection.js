import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs, Typography} from "material-ui";
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from "../../../ui/table";
import Parser from 'html-react-parser';

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
      <Tab className="tab-header-item" value="details" label="Detailed Data"/>
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
        return (
          value == item.course.crsId && <TabContainer key={i}>
            {_self._renderLessonsTables(item)}
          </TabContainer>
        )
      })
    }
  }

  _renderLessonsTables(item) {
    return (
      <Table>
        <Thead>
        <HeadRow>
          <Th first={true} width='20px'>#</Th>
          <Th width='100px'>Unit/lesson</Th>
          <Th width='150px'>Title / Description</Th>
          <Th width='100px'>Status</Th>
          <Th width='50px'>Passes/Required Passes</Th>
          <Th width='250px'>Comments</Th>
        </HeadRow>
        </Thead>
        <Tbody>
        {item.attemptsCurrent.map(function (attemptCurrent, i) {
          return (
            <Row index={i} key={i}>
              <Td first={true} width='20px'>{i + 1}</Td>
              <Td width='100px'>{attemptCurrent.lesson}</Td>
              <Td width='150px'>{attemptCurrent.description}</Td>
              <Td width='100px'>
                <span className='m-badge m-badge--brand m-badge--wide'>
                  {attemptCurrent.attempts == 0 ? 'Not started' : (attemptCurrent.passes == attemptCurrent.Required_Passes ? 'Completed' : 'In Progress') }
                </span>
              </Td>
              <Td width='50px'>{attemptCurrent.passes} / {attemptCurrent.Required_Passes}</Td>
              <Td width='250px'>{attemptCurrent.metadata && Parser(attemptCurrent.metadata)}</Td>
            </Row>
          )
        })}
        </Tbody>
      </Table>
    )
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

    const { value } = this.state;
    const { data } = this.props.data;

    return (
      <div className="row ">
        <div className="col-md-12">
          <div className="m--margin-top-40">
            <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
              <div className="m-portlet__head d-flex justify-content-between align-items-center">
                <div class="m-portlet__head-caption col-sm-4">
                  <div class="m-portlet__head-title"><span class="m-portlet__head-icon"><i
                    class="flaticon-analytics"></i></span><h3 class="m-portlet__head-text">Reports</h3></div>
                </div>
                <div className="m-portlet__head-tools col-sm-8">
                  <Tabs
                    className="nav nav-tabs m-tabs-line m-tabs-line--primary m-tabs-line--2x main-tabs pull-right"
                    value={value}
                    onChange={this.handleChange}
                    scrollable
                    scrollButtons={false}
                  >
                  {this._renderTabs(data)}
                  </Tabs>
                </div>
              </div>
              <div className="m-portlet__body" style={{height: "100%"}}>
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
