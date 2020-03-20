import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiDatePicker from '../../../components/ui/MuiDatePicker';
import { selectScheduleLessonRequest } from '../../../redux/classrooms/selectors';
import { scheduleLesson } from '../../../redux/classrooms/actions';

class AttemptDateForm extends Component {
    
    picker;

    static propTypes = {
        lesson:      PropTypes.object.isRequired,
        classroomId: PropTypes.any.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            attDate: props.lesson.attDate
        };
    }
    
    componentDidMount() {
        const {lesson} = this.props;

        this.props.scheduleLessonRequest.set('id', lesson.lessonId);
    }    

    openPicker = () => {
        this.picker.open();
    }

    _changeAttDate = function (date) {
        const {classroomId, lesson, scheduleLesson} = this.props;        
        
        this.props.scheduleLessonRequest.set('id', lesson.lessonId);
        
        scheduleLesson({
            attDate: date,
            classroomId: classroomId,
            lessonId: lesson.lessonId
        });
        
        this.setState({attDate: date});
    }

    render() {
        const {scheduleLessonRequest, lesson} = this.props;                
        const attDate = this.state.attDate || 'Not set..';

        return (                
            <div className="text-center" id={'lesson-att-date-' + lesson.lessonId}>
                <p className="attemp-date">{attDate}</p>                
                <button className='btn btn-accent m-btn--icon-only' onClick={this.openPicker}>
                    <i className='la la-pencil'></i>
                </button>                    
                <div style={{'display': 'none'}}>   
                    <MuiDatePicker
                      name={'lesson-att-date-' + lesson.lessonId}                      
                      ref={(node) => { this.picker = node; }}
                      value={this.state.attDate || ''}                      
                      onChange={(date) => {this._changeAttDate(date)}}                      
                      disabled={scheduleLessonRequest.get('loading')}
                    />     
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        scheduleLessonRequest: selectScheduleLessonRequest(state)
    }),
    (dispatch) => ({
        scheduleLesson: (params = {}) => {
            dispatch(scheduleLesson(params))
        }
    })
)(AttemptDateForm);