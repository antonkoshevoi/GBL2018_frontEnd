import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {HeadRow, Row, Table, Tbody, Td, Th, Thead} from '../../../ui/table';
import {translate} from 'react-i18next';
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

class LessonsTable extends Component {

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
    const { t } = this.props;
    return (
      <Table className="unit-table">
        <Thead>
        <HeadRow>
          <Th width='44px'>{t('unit')}</Th>
          <Th width='193px'>{t('lessonTitle')}</Th>
          <Th width='193px'>{t('lessonDescription')}</Th>
          <Th width='93px'>{t('lessonAttempt')}</Th>
          <Th width='93px'>{t('status')}</Th>
          <Th width='93px'>{t('attemptDate')}</Th>
          <Th width='93px'>{t('score')}</Th>
          <Th width='93px'>{t('percent')}</Th>
          <Th width='93px'>{t('passFail')}</Th>
          <Th classNames='comment-cell'>{t('comments')}</Th>
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
                      <p><span class="m-badge m-badge--brand m-badge--wide">{t('unit')} {unitIndex + 1}, {t('lesson')} {lessonIndex + 1}</span></p>
                      <span style={{width: '193px'}}>{lesson.lesson_name}</span>
                    </td>
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
    const { t } = this.props;
    const attemptFinished = !!attempt.att_date;
    return (<tr className="m-datatable__row" style={{height: '64px'}}
                key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptRow'}>
        <td className="m-datatable__cell" width='93px' key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptNo'}>
          <span style={{width: '93px'}}>{attempt.attempt_no}</span></td>
        <td className="m-datatable__cell text-capitalize" width='93px'
            key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptStatus'}><span
          style={{width: '93px'}}>{attemptFinished && (attempt.scored_points >= lesson.pass_weight ? t('completed') : t('inProgress'))} </span>
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
          <td className="m-datatable__cell attempt-pass text-uppercase" width='93px'
              key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptPass'}>
            <div style={{width: '94px'}}>{t('pass')}</div>
          </td> : <td className="m-datatable__cell attempt-fail text-uppercase" width='100px'
                      key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptFail'}>
            <div style={{width: '94px'}}>{t('fail')}</div>
          </td>)}
        {!attemptFinished && <td className="m-datatable__cell" width='100px' key={lesson.lesson_id + '' + attempt.attempt_no + '-attemptPass'}>
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

export default translate("translations")(LessonsTable);