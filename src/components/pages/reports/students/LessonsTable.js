import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs, Typography} from 'material-ui';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from '../../../ui/table';
import Parser from 'html-react-parser';
import ApiClient from '../../../../services/ApiClient';
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

    apiClient.get(`students/report-details/${studentId}/${classroomId}`).then(data => {
      console.log('apiData', data);
      this.setState({data: data});
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
          <Th width='40px'>Unit</Th>
          <Th width='190px'>Lesson Title</Th>
          <Th width='200px'>Lesson Description</Th>
          <Th width='150px'>Lesson attempt</Th>
          <Th width='100px'>Status</Th>
          <Th width='150px'>Attempt date</Th>
          <Th width='100px'>Score</Th>
          <Th width='100px'>Percent</Th>
          <Th width='100px'>Pass/Fail</Th>
          <Th width='250px'>Comments</Th>
        </HeadRow>
        </Thead>
        <Tbody>
        {data.data.map((unit) => {
          let unitRowSpan = this.countNumberOfUnitAttempts + '';
          return (
            <tr className="m-datatable__row" style={{height: '64px'}} key={unit.unit_id + '-unitRow'}>
              <td className="m-datatable__cell rotate" width='50px' rowSpan={unitRowSpan}
                  key={unit.unit_id + '-unitName'}>
                <div><span>{unit.unit_name}</span></div>
              </td>
              {unit.lessons.map((lesson, i) => {
                const lessonRowSpan = this.countNumberOfLessonAttempts(lesson) + '';
                return (
                  <tr className="m-datatable__row" style={{height: '64px'}} key={lesson.lesson_id + '-lessonRow'}>
                    <td className="m-datatable__cell" width='200px' rowSpan={lessonRowSpan}
                        key={lesson.lesson_id + '-lessonName'}><span
                      style={{width: '200px'}}>{lesson.lesson_name}</span></td>
                    <td className="m-datatable__cell" width='200px' rowSpan={lessonRowSpan}
                        key={lesson.lesson_id + '-lessonDesc'}><span
                      style={{width: '200px'}}>{lesson.lesson_description}</span></td>
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
    return (<tr className="m-datatable__row" style={{height: '64px'}}
                key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptRow'}>
        <td className="m-datatable__cell" width='150px' key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptNo'}>
          <span style={{width: '150px'}}>{attempt.attempt_no}</span></td>
        <td className="m-datatable__cell" width='100px'
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptStatus'}><span
          style={{width: '100px'}}>{attempt.scored_points >= attempt.pass_weight ? 'Completed' : 'In progress'}</span>
        </td>
        <td className="m-datatable__cell" width='150px'
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptDate'}><span
          style={{width: '150px'}}>{(new Date(attempt.att_date)).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        })}</span></td>
        <td className="m-datatable__cell" width='100px'
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptScored'}><span
          style={{width: '100px'}}>{attempt.scored_points} / {attempt.lesson_points}</span></td>
        <td className="m-datatable__cell" width='100px'
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptScoredToLesson'}><span
          style={{width: '100px'}}>{(attempt.scored_points * 100 / attempt.lesson_points).toFixed(2)}%</span>
        </td>
        {attempt.scored_points >= attempt.pass_weight ? <td className="m-datatable__cell attempt-pass" width='100px'
                                                            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptPass'}>
          <div>PASS</div>
        </td> : <td className="m-datatable__cell attempt-fail" width='100px'
                    key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptFail'}>
          <div>FAIL</div>
        </td>}
        <td className="m-datatable__cell" width='250px'
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptComment'}><span
          style={{width: '250px'}}>COMMENT</span>
        </td>
      </tr>
    )
  };

  countNumberOfUnitAttempts(unit) {
    let numberOfAttempts = 0;
    if (!unit.lessons) {
      return '';
    }
    unit.lessons.forEach((lesson) => {
      numberOfAttempts += this.countNumberOfLessonAttempts(lesson);
    });
    return numberOfAttempts || 1;
  }

  countNumberOfLessonAttempts(lesson) {
    let numberOfAttempts = 0;
    if (!lesson.attempts) {
      return 0;
    }
    lesson.attempts.forEach((attempt) => {
      numberOfAttempts++;
    });

    return numberOfAttempts || 1;
  }

}

LessonsTable.propTypes = {};
