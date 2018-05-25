import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs, Typography} from 'material-ui';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from '../../../ui/table';
import Parser from 'html-react-parser';
import ApiClient from '../../../../services/ApiClient';
import formTableData from '../../../../services/course-template-manager';
const apiClient = new ApiClient();

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

export class LessonsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this._renderLessonsTables = this._renderLessonsTables.bind(this);

  }

  componentDidMount() {
    const {studentId, classroomId} = this.props;
    let tableData;
    apiClient.get(`students/report-details/${studentId}/${classroomId}`).then(data => {
      let courseTemplate = localStorage.getItem(data.data.course_template);
      if (!courseTemplate) {
        apiClient.getJson(data.data.course_template).then((json) => {
          courseTemplate = json;
          localStorage.setItem(data.data.course_template, JSON.stringify(courseTemplate));
          tableData = formTableData(data.data, courseTemplate);
          this.setState({data: tableData});
        });
      } else {
        courseTemplate = JSON.parse(courseTemplate);
        tableData = formTableData(data.data, courseTemplate);
        this.setState({data: tableData});
      }
    });
  }

  render() {
    const {data} = this.state;
    return (data && <TabContainer>
      {this._renderLessonsTables(data)}
    </TabContainer>);
  }

  _renderLessonsTables(data) {
    return (
      <Table className="unit-table">
        <Thead>
        <HeadRow>
          <Th width='44px'>Unit</Th>
          <Th width='193px'>Lesson Title</Th>
          <Th width='193px'>Lesson Description</Th>
          <Th width='93px'>Lesson attempt</Th>
          <Th width='93px'>Status</Th>
          <Th width='93px'>Attempt date</Th>
          <Th width='93px'>Score</Th>
          <Th width='93px'>Percent</Th>
          <Th width='93px'>Pass/Fail</Th>
          <Th classNames='comment-cell'>Comments</Th>
        </HeadRow>
        </Thead>
        <Tbody>
        {data.map((unit, unitIndex) => {
          let unitRowSpan = this.countNumberOfUnitAttempts(unit) + '';
          if (unitRowSpan === '0') {
            return (false);
          }
          return (
            <tr className="m-datatable__row" style={{height: '64px'}} key={unit.unit_id + '-unitRow'}>
              <td className="m-datatable__cell rotate" width='50px' rowSpan={unitRowSpan}
                  key={unit.unit_id + '-unitName'}>
                <div><span><b>Unit {unitIndex + 1}</b> {unit.unit_name}</span></div>
              </td>
              {unit.lessons.map((lesson, lessonIndex) => {
                const lessonRowSpan = this.countNumberOfLessonAttempts(lesson) + '';
                if (lessonRowSpan === '0') {
                  return (false);
                }
                return (
                  <tr className="m-datatable__row" style={{height: '64px'}} key={lesson.lesson_id + '-lessonRow'}>
                    <td className="m-datatable__cell text-center" width='193px' rowSpan={lessonRowSpan} key={lesson.lesson_id + '-lessonName'}>
                      <p><span class="m-badge m-badge--brand m-badge--wide">Unit {unitIndex + 1}, Lesson {lessonIndex + 1}</span></p>
                      <span style={{width: '193px'}}>{lesson.lesson_name}</span></td>
                    <td className="m-datatable__cell text-align-left" width='193px' rowSpan={lessonRowSpan}
                        key={lesson.lesson_id + '-lessonDesc'}><span
                      style={{width: '193px'}}>{lesson.lesson_description}</span></td>
                    {lesson.attempts.map((attempt) => {
                      return (this.renderAttemptRow(lesson, attempt))
                    })}
                  </tr>)
              })}
            </tr>)
        })}

        </Tbody>
      </Table>
    )
  }

  renderAttemptRow = (lesson, attempt) => {
    const attemptFinished = !!attempt.att_date;
    return (<tr className="m-datatable__row" style={{height: '64px'}}
                key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptRow'}>
        <td className="m-datatable__cell" width='93px' key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptNo'}>
          <span style={{width: '93px'}}>{attempt.attempt_no}</span></td>
        <td className="m-datatable__cell" width='93px'
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptStatus'}><span
          style={{width: '93px'}}>{attemptFinished && (attempt.scored_points >= lesson.pass_weight ? 'Completed' : 'In progress')} </span>
        </td>
        <td className="m-datatable__cell" width='93px'
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptDate'}><span
          style={{width: '93px'}}>{attemptFinished && (new Date(attempt.att_date)).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        })}</span></td>
        <td className="m-datatable__cell" width='93px'
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptScored'}><span
          style={{width: '93px'}}>{attemptFinished && (attempt.scored_points + '/' + lesson.lesson_points)}</span>
        </td>
        <td className="m-datatable__cell" width='93px'
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptScoredToLesson'}><span
          style={{width: '93px'}}>{attemptFinished && (attempt.scored_points * 100 / lesson.lesson_points).toFixed(2) + '%'}</span>
        </td>
        {attemptFinished && (+attempt.scored_points >= +lesson.pass_weight ?
          <td className="m-datatable__cell attempt-pass" width='93px'
              key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptPass'}>
            <div style={{width: '94px'}}>PASS</div>
          </td> : <td className="m-datatable__cell attempt-fail" width='100px'
                      key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptFail'}>
            <div style={{width: '94px'}}>FAIL</div>
          </td>)}
        {!attemptFinished && <td className="m-datatable__cell" width='100px'
                                 key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptPass'}>
          <div style={{width: '94px'}}></div>
        </td>}
        <td className="m-datatable__cell comment-cell text-align-left"
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptComment'}>
          <span>{attemptFinished && Parser(attempt.comment)}</span>
        </td>
      </tr>
    )
  };

  countNumberOfUnitAttempts(unit) {
    let numberOfAttempts = 0;
    if (!unit.lessons) {
      return 0;
    }
    unit.lessons.forEach((lesson) => {
      numberOfAttempts += this.countNumberOfLessonAttempts(lesson);
    });
    return numberOfAttempts;
  }

  countNumberOfLessonAttempts(lesson) {
    let numberOfAttempts = 0;
    if (!lesson.attempts) {
      return 0;
    }
    numberOfAttempts += lesson.attempts.length;

    return numberOfAttempts;
  }

}

LessonsTable.propTypes = {};
