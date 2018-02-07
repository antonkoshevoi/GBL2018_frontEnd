import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, Typography } from 'material-ui';
import { getSchoolTeachers } from '../../../redux/schools/actions';
import {
  selectGetSchoolTeachersRequest,
  selectSchools
} from '../../../redux/schools/selectors';
import DatePicker from '../../../components/ui/DatePicker';
import { getDemoCourses } from '../../../redux/classrooms/actions';
import {selectCoursesRequest} from '../../../redux/classrooms/selectors';

function TabContainer(props) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class DemoClassroomForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    classroom: PropTypes.object.isRequired,
    schools: PropTypes.any,
    errors: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.state = {
      schoolTeachers: [],
      courses: [],
    };
  }

  componentDidMount() {
    const { getSchoolTeachers, getCourses } = this.props;

    getCourses();
    getSchoolTeachers();
  }

  componentWillReceiveProps(nextProps) {
    this._getCoursesSuccess(nextProps);
    this._getSchoolTeachersSuccess(nextProps);
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

  _getCoursesSuccess(nextProps) {
    const courses = this.props.getCoursesRequest.get('success');
    const nextCourses = nextProps.getCoursesRequest.get('success');

    if (!courses && nextCourses) {
      this.setState({
        ...this.state,
        courses: nextProps.getCoursesRequest.get('records').toJS()
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
    const { name, value } = event.target;

    this.props.onChange({
      ...this.props.classroom,
      [name]: value
    });
  }

  _renderSchools() {
    const { schools } = this.props;

    return schools.map((school, key) => (
      <MenuItem key={key} value={ school.get('schId') }>
        { school.get('schName') }
      </MenuItem>
    ));
  }

  _renderCourses() {
    const { courses } = this.state;

    return courses.map((course, key) => (
      <MenuItem key={key} value={ course.crsId }>
        { course.crsTitle }
      </MenuItem>
    ));
  }

  _renderTeachers() {
    const { schoolTeachers } = this.state;

    return schoolTeachers.map((teacher, key) => (
      <MenuItem key={key} value={ teacher.id }>
        { teacher.firstName } { teacher.lastName }
      </MenuItem>
    ));
  }

  render() {
    const { classroom, errors } = this.props;

    return (
      <div className='row'>
        <div className='col-sm-8 m-auto'>
          <FormControl aria-describedby='crmName-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='crmName-error'>Name</InputLabel>
            <Input
              name='crmName'
              margin='dense'
              fullWidth
              value={classroom.crmName || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
              {errors && errors.get('crmName') && <FormHelperText error>{ errors.get('crmName').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='crmStartDate-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='crmStartDate-error' shrink={!!classroom.crmStartDate}>Start Date</InputLabel>
            <DatePicker
              name='crmStartDate'
              value={classroom.crmStartDate || null}
              onChange={(m) => { this._handleDateChange(m, 'crmStartDate') }}
            />
            {errors && errors.get('crmStartDate') && <FormHelperText error>{ errors.get('crmStartDate').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='crmEndDate-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='crmEndDate-error' shrink={!!classroom.crmEndDate}>End Date</InputLabel>
            <DatePicker
              name='crmEndDate'
              value={classroom.crmEndDate || null}
              onChange={(m) => { this._handleDateChange(m, 'crmEndDate') }}
            />
            {errors && errors.get('crmEndDate') && <FormHelperText error>{ errors.get('crmEndDate').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='crmEnrollmentStartDate-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='crmEnrollmentStartDate-error' shrink={!!classroom.crmEnrollmentStartDate}>Enrollment Start Date</InputLabel>
            <DatePicker
              name='crmEnrollmentStartDate'
              value={classroom.crmEnrollmentStartDate || null}
              onChange={(m) => { this._handleDateChange(m, 'crmEnrollmentStartDate') }}
            />
            {errors && errors.get('crmEnrollmentStartDate') && <FormHelperText error>{ errors.get('crmEnrollmentStartDate').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='crmEnrollmentEndDate-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='crmEnrollmentEndDate-error' shrink={!!classroom.crmEnrollmentEndDate}>Enrollment End Date</InputLabel>
            <DatePicker
              name='crmEnrollmentEndDate'
              value={classroom.crmEnrollmentEndDate || null}
              onChange={(m) => { this._handleDateChange(m, 'crmEnrollmentEndDate') }}
            />
            {errors && errors.get('crmEnrollmentEndDate') && <FormHelperText error>{ errors.get('crmEnrollmentEndDate').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Course</InputLabel>
            <Select
              primarytext='Select Course'
              name='crmCourse'
              onChange={(e) => { this._handleInputChange(e) }}
              value={classroom.crmCourse || ''}>
              <MenuItem value={null} primarytext=''/>
              {this._renderCourses()}
            </Select>
            {this.props.getCoursesRequest.get('success') && !this.state.courses.length && <h5 className='text-center' style={{color: 'red'}}>No Unassigned Courses found (You should buy from Store)</h5>}
            {errors && errors.get('crmCourse') && <FormHelperText error>{ errors.get('crmCourse').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Teacher</InputLabel>
            <Select
              primarytext='Select Teacher'
              name='teacherId'
              onChange={(e) => { this._handleInputChange(e) }}
              value={classroom.teacherId || ''}>
              <MenuItem value={null} primarytext=''/>
              {this._renderTeachers()}
            </Select>
            {errors && errors.get('teacherId') && <FormHelperText error>{ errors.get('teacherId').get(0) }</FormHelperText>}
          </FormControl>
        </div>
      </div>
    );
  }
}

DemoClassroomForm = connect(
  (state) => ({
    schools: selectSchools(state),
    getCoursesRequest: selectCoursesRequest(state),
    getSchoolTeacherRequest: selectGetSchoolTeachersRequest(state),
  }),
  (dispatch) => ({
    getCourses: () => { dispatch(getDemoCourses()) },
    getSchoolTeachers: () => { dispatch(getSchoolTeachers()) },
  })
)(DemoClassroomForm);

export default DemoClassroomForm;