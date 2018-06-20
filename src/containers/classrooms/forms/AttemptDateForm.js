import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EditButton } from '../../../components/ui/table';
import DatePicker from '../../../components/ui/DatePicker';
import { selectScheduleLessonRequest } from '../../../redux/classrooms/selectors';
import { scheduleLesson } from '../../../redux/classrooms/actions';
import { CircularProgress} from '@material-ui/core';

class AttemptDateForm extends Component {
    
    static propTypes = {
        lesson:      PropTypes.object.isRequired,
        classroomId: PropTypes.any.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            attDate: props.lesson.attDate,            
            picker: null
        };
    }
    
    componentDidMount() {
        const {lesson} = this.props;

        this.props.scheduleLessonRequest.set('id', lesson.lessonId);
    }    

    _showDatePicker = function () {
        this.state.picker.open();
    }

    _changeAttDate = function (date) {
        const {classroomId, lesson, scheduleLesson} = this.props;        
        
        this.props.scheduleLessonRequest.set('id', lesson.lessonId);
        
        scheduleLesson({
            attDate: date,
            classroomId: classroomId,
            lessonId: lesson.lessonId
        });
        
        this.state.attDate = date;
    }

    render() {
        const {scheduleLessonRequest, lesson} = this.props;                
        const attDate = this.state.attDate || 'Not set..';

        return (                
            <div className="text-center" id={'lesson-att-date-' + lesson.lessonId}>
                <p className="attemp-date">{attDate}</p>                
                <button className='btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill' onClick={() => {this._showDatePicker()}}>
                    <i className='la la-pencil'></i>
                </button>                    
                <div style={{'display': 'none'}}>   
                    <DatePicker
                      name={'lesson-att-date-' + lesson.lessonId}                      
                      ref={(node) => {this.state.picker = node;}}                      
                      value={this.state.attDate || ''}                      
                      onChange={(date) => {this._changeAttDate(date)}}                      
                      disabled={scheduleLessonRequest.get('loading')}
                    />     
                </div>
            </div>
        );
    }
}

AttemptDateForm = connect(
    (state) => ({
        scheduleLessonRequest: selectScheduleLessonRequest(state)
    }),
    (dispatch) => ({
        scheduleLesson: (params = {}) => {
            dispatch(scheduleLesson(params))
        }
    })
)(AttemptDateForm);

export default AttemptDateForm;