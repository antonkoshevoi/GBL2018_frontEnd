import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { translate } from 'react-i18next';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,  
  Button,
  Checkbox
} from '@material-ui/core';
import {getSchoolTeachers, getSchoolHomerooms} from '../../../redux/schools/actions';
import {
  selectGetSchoolHomeroomsRequest,
  selectGetSchoolTeachersRequest  
} from '../../../redux/schools/selectors';
import MuiDatePicker from '../../../components/ui/MuiDatePicker';
import CourseModal from '../modals/CourseModal';

class ClassroomForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    classroom: PropTypes.object.isRequired,
    errors: PropTypes.any   
  };

  constructor(props) {
    super(props);
    this.state = {      
      schoolTeachers: [],
      schoolHomerooms: [],
      courseModalIsOpen: false
    };
  }

  componentDidMount() {
    const {getSchoolTeachers, getSchoolHomerooms, classroom} = this.props;

    this._setInitialHomerooms();
    
    const params = classroom ? {schoolId: classroom.schoolId} : {};
    
    getSchoolTeachers(params);
    getSchoolHomerooms(params);
  }

  componentWillReceiveProps(nextProps) {
    this._getSchoolTeachersSuccess(nextProps);
    this._getSchoolHomeroomsSuccess(nextProps);    
  }

  _openCourseDialog = () => {
    this.setState({courseModalIsOpen: true});
  };
  _closeCourseDialog = () => {
    this.setState({courseModalIsOpen: false});
  };
  _submitCourseDialog = (course) => {
    this.setState({course});
    this.props.onChange({
      ...this.props.classroom,
      crmCourse: course.get('courseId')
    });
  };

  _setInitialHomerooms() {
    let {classroom} = this.props;

    this.props.classroom.homeroomIds = [];
    if (classroom.homerooms && classroom.homerooms.length) {
      this.props.classroom.homeroomIds = classroom.homerooms.map((homeroom) => {
        return homeroom.id;
      })
    }
  }

  _getSchoolTeachersSuccess(nextProps) {
    const schoolTeachers = this.props.getSchoolTeacherRequest.get('success');
    const nextschoolTeachers = nextProps.getSchoolTeacherRequest.get('success');

    if (!schoolTeachers && nextschoolTeachers) {
      this.setState({
        ...this.state,
        schoolTeachers: nextProps.getSchoolTeacherRequest.get('records').toJS()
      });
    }
  }

  _getSchoolHomeroomsSuccess(nextProps) {
    const schoolHomerooms = this.props.getSchoolHomeroomsRequest.get('success');
    const nextschoolHomerooms = nextProps.getSchoolHomeroomsRequest.get('success');

    if (!schoolHomerooms && nextschoolHomerooms) {
      this.setState({
        ...this.state,
        schoolHomerooms: nextProps.getSchoolHomeroomsRequest.get('records').toJS()
      });
    }
  }

  _handleDateChange(m, dateField) {
    this.props.onChange({
      ...this.props.classroom,
      [dateField]: m
    });
  }

  _handleInputChange(event) {
    const {name, value} = event.target;    
    this.props.onChange({
      ...this.props.classroom,
      [name]: value
    });
    this.setState({name: value})
  }

  _renderTeachers() {
    const {schoolTeachers} = this.state;

    return schoolTeachers.map((teacher, key) => (
      <MenuItem key={key} value={teacher.id}>
        {teacher.name}
      </MenuItem>
    ));
  }

  _renderHomerooms(homeroomIds) {
    const {schoolHomerooms} = this.state;

    return schoolHomerooms.map((homeroom, key) => (
      <MenuItem key={homeroom.id} value={homeroom.id}>
        <Checkbox checked={homeroomIds ? homeroomIds.includes(homeroom.id) : false}/>
        {homeroom.name}
      </MenuItem>
    ));
  }

  render() {
    const {classroom, errors, t} = this.props;
    const {courseModalIsOpen, course } = this.state;    
        
    return (
      <div className='row'>
        <div className="col-sm-10 m-auto">
          <FormControl aria-describedby='crmName-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='crmName'>{t('name')}</InputLabel>
            <Input
              name='crmName'
              margin='dense'
              fullWidth
              value={classroom.crmName || ''}
              onChange={(e) => {
                this._handleInputChange(e)
              }}/>
            {errors && errors.get('crmName') && <FormHelperText error>{errors.get('crmName').get(0)}</FormHelperText>}
          </FormControl>
          <div className='full-width form-inputs d-inline-flex flex-column'>
            <InputLabel htmlFor='crmStartDate' shrink={!!classroom.crmStartDate}>{t('startDate')}</InputLabel>            
              <MuiDatePicker
                name='crmStartDate'
                value={classroom.crmStartDate || null}
                onChange={(m) => {
                  this._handleDateChange(m, 'crmStartDate')
                }}
              />            
            {errors && errors.get('crmStartDate') && <FormHelperText error>{errors.get('crmStartDate').get(0)}</FormHelperText>}
          </div>
          <div className='full-width form-inputs d-inline-flex flex-column'>
            <InputLabel htmlFor='crmEndDate' shrink={!!classroom.crmEndDate}>{t('endDate')}</InputLabel>            
              <MuiDatePicker
                name='crmEndDate'
                value={classroom.crmEndDate || null}
                onChange={(m) => {
                  this._handleDateChange(m, 'crmEndDate')
                }}
              />
            {errors && errors.get('crmEndDate') && <FormHelperText error>{errors.get('crmEndDate').get(0)}</FormHelperText>}
          </div>
          <div className='full-width form-inputs d-inline-flex flex-column'>
            <InputLabel htmlFor='crmEnrollmentStartDate' shrink={!!classroom.crmEnrollmentStartDate}>{t('enrollmentStartDate')}</InputLabel>            
              <MuiDatePicker
                name='crmEnrollmentStartDate'
                value={classroom.crmEnrollmentStartDate || null}
                onChange={(m) => {
                  this._handleDateChange(m, 'crmEnrollmentStartDate')
                }}
              />            
            {errors && errors.get('crmEnrollmentStartDate') && <FormHelperText error>{errors.get('crmEnrollmentStartDate').get(0)}</FormHelperText>}
          </div>
          <div className='full-width form-inputs d-inline-flex flex-column'>
              <InputLabel htmlFor='crmEnrollmentEndDate' shrink={!!classroom.crmEnrollmentEndDate}>{t('enrollmentEndDate')}</InputLabel>            
              <MuiDatePicker
                name='crmEnrollmentEndDate'
                value={classroom.crmEnrollmentEndDate || null}
                onChange={(m) => {
                  this._handleDateChange(m, 'crmEnrollmentEndDate')
                }}
              />            
            {errors && errors.get('crmEnrollmentEndDate') &&
            <FormHelperText error>{errors.get('crmEnrollmentEndDate').get(0)}</FormHelperText>}
          </div>
          {!classroom.id &&
              <FormControl className='full-width form-inputs'>
                <Button
                  onClick={() => {
                    this._openCourseDialog()
                  }}
                  type='button'
                  form='create-classroom-form'                  
                  className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
                  color='primary'>
                  {t('chooseCourse')}
                </Button>
                {!course && errors && errors.get('crmCourse') && <FormHelperText error>{errors.get('crmCourse').get(0)}</FormHelperText>}
                {course &&
                    <div className="row m--margin-top-15">
                        <div className="col-4">
                          <img src={course.get('thumbnail')} width={70} alt={course.get('title')}/>
                        </div>
                        <div className="col-8">
                          {course.get('title')}
                        </div>
                    </div>
                }
              </FormControl>                      
          }
          
          {(classroom && classroom.course) &&
            <FormControl className='full-width form-inputs'>
              <InputLabel htmlFor='course'>{t('course')}</InputLabel>
              <Input
                name='course'
                margin='dense'
                fullWidth                
                readOnly={true}                            
                value={classroom.course.crsTitle || ''} />            
            </FormControl>          
          }          
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='teacherId'>{t('teacher')}</InputLabel>
            <Select
              primarytext={t('selectTeacher')}
              name='teacherId'
              onChange={(e) => {
                this._handleInputChange(e)
              }}
              value={classroom.teacherId || ''}>
              <MenuItem value={null} primarytext=""/>
              {this._renderTeachers()}
            </Select>
            {errors && errors.get('teacherId') &&
            <FormHelperText error>{errors.get('teacherId').get(0)}</FormHelperText>}
          </FormControl>
                    
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='homeroomIds'>{t('homeroomsMultiple')}</InputLabel>
            <Select
              multiple={true}
              renderValue={(e) => this._getSelectedRooms(e)}
              primarytext={t('selectHomeroom')}
              name='homeroomIds'
              onChange={(e) => {
                this._handleInputChange(e)
              }}
              value={classroom.homeroomIds || []}>
              {this._renderHomerooms(classroom.homeroomIds)}

            </Select>
            {errors && errors.get('homerooms') && <FormHelperText error>{errors.get('homerooms').get(0)}</FormHelperText>}
          </FormControl>          
        </div>
        <CourseModal
          courseId={classroom.crmCourse}
          isOpen={courseModalIsOpen}
          onClose={() => { this._closeCourseDialog() }}
          onSuccess={(course) => { this._submitCourseDialog(course) }}/>
      </div>
    );
  }

  _getSelectedRooms(e) {
    const {classroom} = this.props;
    const {schoolHomerooms} = this.state;

    let selectedRooms = [];

    if (classroom.homeroomIds) {
      selectedRooms = schoolHomerooms
        .filter(item => classroom.homeroomIds.includes(item.id))
        .map(item => item.name);
    }
    return selectedRooms.join(',');
  }
}

ClassroomForm = connect(
  (state) => ({    
    getSchoolTeacherRequest: selectGetSchoolTeachersRequest(state),
    getSchoolHomeroomsRequest: selectGetSchoolHomeroomsRequest(state)
  }),
  (dispatch) => ({
    getSchoolTeachers: (params = {}) => {
      dispatch(getSchoolTeachers(params))
    },
    getSchoolHomerooms: (params = {}) => {
      dispatch(getSchoolHomerooms(params))
    }
  })
)(ClassroomForm);

export default translate('translations')(ClassroomForm);