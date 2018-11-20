import React, {Component} from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';
import Parser from 'html-react-parser';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import ApiClient from '../../../services/ApiClient';
import formTableData from '../../../services/CourseTemplate';
import {selectStudentReportDetailsRequest} from "../../../redux/reports/students/selectors";
import {getReportDetails, resetGetReportDetails} from "../../../redux/reports/students/actions";
import Loader from "../../../components/layouts/Loader";
import moment from "moment/moment";
const apiClient = new ApiClient();

const styles = theme => ({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing.unit
  }
});

class LessonsTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      statusPopoverAnchor: null,
      ratePopoverAnchor: null
    };    
  }

  _handleStatusPopoverOpen = event => {      
    this.setState({ statusPopoverAnchor: event.currentTarget });
  };

  _handleStatusPopoverClose = () => {
    this.setState({ statusPopoverAnchor: null });
  };
  
 _handleRatePopoverOpen = event => {      
    this.setState({ ratePopoverAnchor: event.currentTarget });
  };

  _handleRatePopoverClose = () => {
    this.setState({ ratePopoverAnchor: null });
  };
  
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

    const { t, classes, getReportRequest} = this.props;
    const {data, statusPopoverAnchor, ratePopoverAnchor} = this.state;    
    
    if (!getReportRequest.get('success') || !data) {
        return <Loader />
    }
    
    let reportIsEmpty = true;

    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr className="active">
              <th style={{ minWidth: 50}}>{t('unit')}</th>
              <th className="text-center">{t('lessonInformation')}</th>
              <th className="text-center">{t('lessonAttempt')}</th>              
              <th className="text-center">{t('attemptDate')}</th>              
              <th className="text-center">{t('score')} / {t('percent')}</th>              
              <th className='text-center'>{t('comments')}</th>
            </tr>
          </thead>
          <tbody>
          {data.map((unit, unitIndex) => {
              if (this.countNumberOfUnitAttempts(unit) > 0) {
                  reportIsEmpty = false;
                  return this.renderLessonRow(unit, unitIndex);
              }
              return '';
          })}
          {reportIsEmpty && <tr>
                <td colSpan="6" className='text-center'>
                    <div className="table-message"><h2>{t('noData')}</h2></div>
                </td>
            </tr>}
          </tbody>
        </table>       

        <Popover
            id="mouse-over-popover-status"
            className={classes.popover}
            classes={{ paper: classes.paper }}
            open={Boolean(statusPopoverAnchor)}
            anchorEl={statusPopoverAnchor}
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
            transformOrigin={{ vertical: 'center', horizontal: 'left' }}
            onClose={this._handleStatusPopoverClose}
            disableRestoreFocus >
            <div className="m--margin-right-10 m--margin-left-10">
                <h6>{t('status')}</h6>
                <p className="text-capitalize">
                    <span className="m-badge m-badge--brand m-badge--wide m-badge--metal m--margin-right-10"></span> {t('notStarted')}
                </p>
                <p className="text-capitalize">
                    <span className="m-badge m-badge--brand m-badge--wide m-badge--warning m--margin-right-10"></span> {t('inProgress')} 
                </p>
                <p className="text-capitalize margin-0">
                    <span className="m-badge m-badge--brand m-badge--wide m-badge--success m--margin-right-10"></span> {t('completed')}
                </p>            
            </div>
        </Popover>
        
        <Popover
            id="mouse-over-popover-rate"
            className={classes.popover}
            classes={{ paper: classes.paper }}
            open={Boolean(ratePopoverAnchor)}
            anchorEl={ratePopoverAnchor}
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
            transformOrigin={{ vertical: 'center', horizontal: 'left' }}
            onClose={this._handleRatePopoverClose}
            disableRestoreFocus >
            <div className="m--margin-right-10 m--margin-left-10">
                <h6>{t('perfomance')}</h6>
                <p className="text-capitalize">
                    <span className="m-badge m-badge--brand m-badge--wide m-badge--success m--margin-right-10"></span> {t('pass')}
                </p>
                <p className="text-capitalize margin-0">
                    <span className="m-badge m-badge--brand m-badge--wide m-badge--danger m--margin-right-10"></span> {t('fail')} 
                </p>            
            </div>
        </Popover>        
      </div>
    )
  }

    renderLessonRow(unit, unitIndex) {
        const { t } = this.props;
        const unitRowSpan = this.countNumberOfUnitAttempts(unit);
        
        return unit.lessons.map((lesson, lessonIndex) => {
            const lessonRowSpan = this.countNumberOfLessonAttempts(lesson);
            
            if (lessonRowSpan === 0) {
                return (false);
            }
                
            let completed  = lesson.attempts.filter(item => (!!item.att_date)).length;            
            let badgeClass = 'm-badge--metal';
            
            if (completed > 0) {
                badgeClass = completed === lesson.attempts.length ? 'm-badge--success' : 'm-badge--warning';
            }
            
            return lesson.attempts.map((attempt, attemptIndex) => {
                
                const attemptFinished = !!attempt.att_date;                
                const passed = parseInt(attempt.scored_points, 10) >=  parseInt(lesson.pass_weight, 10);
                                         
                return <tr key={lesson.lesson_id + '-' + attempt.attempt_no + '-lessonRow'}>
                    {(lessonIndex === 0 && attemptIndex === 0) &&                    
                        <td className="rotate" rowSpan={unitRowSpan} key={unit.unit_id + '-unitName'}>
                            <div>
                                <span><b>Unit {unitIndex + 1}</b> {unit.unit_name}</span>
                            </div>
                        </td>
                    }                
                    {attemptIndex === 0 &&
                    <td style={{ maxWidth: 350}} className="text-center" rowSpan={lessonRowSpan}>
                        <p>                        
                            <span aria-haspopup="true" onMouseEnter={this._handleStatusPopoverOpen} onMouseLeave={this._handleStatusPopoverClose} className={`m-badge m-badge--brand m-badge--wide ${badgeClass}`}>
                                <strong>{t('unit')} {unitIndex + 1}, {t('lesson')} {lessonIndex + 1}</strong>
                            </span>                        
                        </p>
                        <strong className="font-italic">{lesson.lesson_name}</strong>
                        <div>{lesson.lesson_description}</div>
                    </td>}
                    <td className='text-center'>
                        <span>{attempt.attempt_no}</span>
                    </td>
                    <td className='text-center'>                            
                        {attemptFinished && moment(attempt.att_date).format('ll')}                            
                    </td>          
                    {attemptFinished ? <td className={`attempt-${passed ? 'pass' : 'fail'} text-center`}>
                        <div aria-haspopup="true" onMouseEnter={this._handleRatePopoverOpen} onMouseLeave={this._handleRatePopoverClose}>
                            <p>
                                {attempt.scored_points + '/' + lesson.lesson_points}
                            </p>
                            <p>
                                {(attempt.scored_points * 100 / lesson.lesson_points).toFixed(2) + '%'}    
                            </p>
                        </div>
                    </td> : <td>-</td>}
                    <td className="text-left">
                        <span>{attemptFinished && Parser(attempt.comment)}</span>
                    </td>            
                </tr>
            });                                                  
        });
   }

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

export default translate("translations")(withStyles(styles)(LessonsTable));