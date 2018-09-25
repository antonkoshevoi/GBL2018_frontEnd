import React, {Component} from 'react';
import {HeadRow, Table, Tbody, Th, Thead} from '../../../../components/ui/table';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import Parser from 'html-react-parser';
import ApiClient from '../../../../services/ApiClient';
import formTableData from '../../../../services/course-template-manager';
import {selectStudentReportDetailsRequest} from "../../../../redux/reports/students/selectors";
import {getReportDetails, resetGetReportDetails} from "../../../../redux/reports/students/actions";
import Loader from "../../../../components/layouts/Loader";

const apiClient = new ApiClient();

class LessonsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };    
  }

  componentDidMount() {      
    const {studentId, classroomId, getReport} = this.props;       
    getReport(studentId, classroomId);
  }
  
  componentWillUnmount() {
    this.props.resetGetReportDetails();
  }  
  
  componentWillReceiveProps(nextProps) {
    const success = this.props.getReportRequest.get('success');
    const nextSuccess = nextProps.getReportRequest.get('success');

    if (!success && nextSuccess) {
        let data = nextProps.getReportRequest.get('data').toJS();
        let courseTemplate = localStorage.getItem(data.course_template);
        let tableData;
        
        if (!courseTemplate) {
            apiClient.getJson(data.course_template).then((json) => {
            courseTemplate = json;
            
            localStorage.setItem(data.course_template, JSON.stringify(courseTemplate));
            tableData = formTableData(data, courseTemplate);
            this.setState({data: tableData});
        });
      } else {
            courseTemplate = JSON.parse(courseTemplate);
            tableData = formTableData(data, courseTemplate);
            this.setState({data: tableData});
      }      
    }      
  }  

  render() {

    const { t, getReportRequest} = this.props;
    const {data} = this.state;    
    
    if (!getReportRequest.get('success') || !data) {
        return <Loader />
    }
    
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
              <td className="m-datatable__cell rotate" width='50px' rowSpan={unitRowSpan} key={unit.unit_id + '-unitName'}>
                <div>
                    <span><b>Unit {unitIndex + 1}</b> {unit.unit_name}</span>
                </div>
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
                    <td className="m-datatable__cell text-align-left" width='193px' rowSpan={lessonRowSpan} key={lesson.lesson_id + '-lessonDesc'}>
                        <span style={{width: '193px'}}>{lesson.lesson_description} +-</span>
                    </td>
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
    const rowKey = lesson.lesson_id + '' + attempt.attempt_no;
    const passed = parseInt(attempt.scored_points, 10) >=  parseInt(lesson.pass_weight, 10);
    
    return (<tr className="m-datatable__row" style={{height: '64px'}} key={rowKey + '-attemptRow'}>
        <td className="m-datatable__cell" width='93px' key={rowKey + '-attemptNo'}>
            <span style={{width: '93px'}}>{attempt.attempt_no}</span>
        </td>
        <td className="m-datatable__cell text-capitalize" width='93px' key={rowKey + '-attemptStatus'}>
            <span style={{width: '93px'}}>
                {attemptFinished && (attempt.scored_points >= lesson.pass_weight ? t('completed') : t('inProgress'))} 
            </span>
        </td>
        <td className="m-datatable__cell" width='93px' key={rowKey + '-attemptDate'}>
            <span style={{width: '93px'}}>
                {attemptFinished && (new Date(attempt.att_date)).toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' })}
            </span>
        </td>
        <td className="m-datatable__cell" width='93px' key={rowKey + '-attemptScored'}>
            <span style={{width: '93px'}}>
                {attemptFinished && (attempt.scored_points + '/' + lesson.lesson_points)}
            </span>
        </td>
        <td className="m-datatable__cell" width='93px' key={rowKey + '-attemptScoredToLesson'}>
            <span style={{width: '93px'}}>
                {attemptFinished && (attempt.scored_points * 100 / lesson.lesson_points).toFixed(2) + '%'}
            </span>
        </td>
        {attemptFinished && <td className={`m-datatable__cell attempt-${passed ? 'pass' : 'fail'} text-uppercase`} width='93px' key={rowKey + '-attemptPass'}>
            <div style={{width: '94px'}}>{t(passed ? 'pass' : 'fail')}</div>
          </td>}
        {!attemptFinished && <td className="m-datatable__cell" width='100px' key={rowKey + '-attemptPass'}>
          <div style={{width: '94px'}}></div>
        </td>}
        <td className="m-datatable__cell comment-cell text-align-left" key={rowKey + '-attemptComment'}>
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

LessonsTable = connect(
  (state) => ({
    getReportRequest: selectStudentReportDetailsRequest(state)
  }),
  (dispatch) => ({
    getReport: (studentId, classroomId) => {dispatch(getReportDetails(studentId, classroomId))},
    resetGetReportDetails: () => {dispatch(resetGetReportDetails())}
  })
)(LessonsTable);

export default translate("translations")(LessonsTable);