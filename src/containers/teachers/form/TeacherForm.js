import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from 'material-ui';
import { connect } from 'react-redux';
import { selectGetSchoolHomeroomsRequest, selectSchools } from '../../../redux/schools/selectors';
import { getSchoolHomerooms, getSchools } from '../../../redux/schools/actions';

class TeacherForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    teacher: PropTypes.object.isRequired,
    errors: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.state = {
      schoolHomerooms: [],
    };
  }

  componentDidMount() {
    const { getSchools, teacher, getSchoolHomerooms } = this.props;
    getSchools();

    if (teacher.id) {
      getSchoolHomerooms(teacher.schoolId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const schoolHomerooms = this.props.getSchoolHomeroomsRequest.get('records');
    const nextschoolHomerooms = nextProps.getSchoolHomeroomsRequest.get('records');

    if (!schoolHomerooms && nextschoolHomerooms) {
      this.setState({
        ...this.state,
        schoolHomerooms: nextschoolHomerooms.toJS()
      });
    }
  }

  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;

    this.props.onChange({
      ...this.props.teacher,
      [name]: value
    });
  }

  _handleSchoolChange(event) {
    const { value } = event.target;

    if (value) {
      this.props.getSchoolHomerooms(value);
    } else {
      this.setState({
        ...this.state,
        schoolHomerooms: []
      });
    }

    this._handleInputChange(event);
  }

  _renderSchools() {
    const { schools } = this.props;

    return schools.map((school, key) => (
      <MenuItem key={key} value={ school.get('schId') }>
        { school.get('schName') }
      </MenuItem>
    ));
  }

  _renderSchoolHomerooms() {
    const { schoolHomerooms } = this.state;

    return schoolHomerooms.map((homeroom, key) => (
      <MenuItem key={key} value={ homeroom.id }>
        { homeroom.name }
      </MenuItem>
    ));
  }

  render() {
    const { teacher, errors } = this.props;

    return (
      <div className='row'>
        <div className='col-sm-8 m-auto'>
          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Username</InputLabel>
            <Input
              autoFocus
              name='username'
              margin='dense'
              fullWidth
              value={teacher.username || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('username') && <FormHelperText error>{ errors.get('username').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Password</InputLabel>
            <Input
              fullWidth
              name='password'
              type='password'
              margin='dense'
              value={teacher.password || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('password') && <FormHelperText error>{ errors.get('password').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Email</InputLabel>
            <Input
              fullWidth
              name='email'
              type='email'
              margin='dense'
              value={teacher.email || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('email') && <FormHelperText error>{ errors.get('email').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>First Name</InputLabel>
            <Input
              fullWidth
              name='firstName'
              type='text'
              margin='dense'
              value={teacher.firstName || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('firstName') && <FormHelperText error>{ errors.get('firstName').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Last Name</InputLabel>
            <Input
              fullWidth
              name='lastName'
              type='text'
              margin='dense'
              value={teacher.lastName || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('lastName') && <FormHelperText error>{ errors.get('lastName').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Select Gender</InputLabel>
            <Select
                primarytext=""
                name='gender'
                onChange={(e) => { this._handleInputChange(e) }}
                value={teacher.gender || ''}>
              <MenuItem value={null} primarytext=""/>
              <MenuItem value='1'>Male</MenuItem>
              <MenuItem value='0'>Female</MenuItem>
            </Select>
            {errors && errors.get('gender') && <FormHelperText error>{ errors.get('gender').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Phone</InputLabel>
            <Input
                fullWidth
                name='phoneNumber'
                type='text'
                margin='dense'
                value={teacher.phoneNumber || ''}
                onChange={(e) => { this._handleInputChange(e) }}/>
              {errors && errors.get('phoneNumber') && <FormHelperText error>{ errors.get('phoneNumber').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>School</InputLabel>
            <Select
                primarytext=""
                name='schoolId'
                onChange={(e) => { this._handleSchoolChange(e) }}
                value={teacher.schoolId || ''}>
              <MenuItem value={null} primarytext=""/>
              {this._renderSchools()}
            </Select>
            {errors && errors.get('schoolId') && <FormHelperText error>{ errors.get('schoolId').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Homeroom</InputLabel>
            <Select
                primarytext=""
                name='homeroomId'
                onChange={(e) => { this._handleInputChange(e) }}
                value={teacher.homeroomId || ''}>
              <MenuItem value={null} primarytext=""/>
              {this._renderSchoolHomerooms()}
            </Select>
            {errors && errors.get('homeroom') && <FormHelperText error>{ errors.get('homeroom').get(0) }</FormHelperText>}
          </FormControl>
        </div>
      </div>
    );
  }
}

TeacherForm = connect(
  (state) => ({
    schools: selectSchools(state),
    getSchoolHomeroomsRequest: selectGetSchoolHomeroomsRequest(state),
  }),
  (dispatch) => ({
    getSchools: () => { dispatch(getSchools()) },
    getSchoolHomerooms: (schoolId) => { dispatch(getSchoolHomerooms(schoolId)) }
  })
)(TeacherForm);

export default TeacherForm;