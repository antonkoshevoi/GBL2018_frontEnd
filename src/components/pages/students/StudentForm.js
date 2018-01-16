import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, TextField } from 'material-ui';

class StudentForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    schools: PropTypes.any,
    errors: PropTypes.any
  };

  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;

    this.props.onChange({
      ...this.props.student,
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

  render() {
    const { student, errors } = this.props;

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
              value={student.username || ''}
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
              value={student.password || ''}
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
              value={student.email || ''}
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
              value={student.firstName || ''}
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
              value={student.lastName || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('lastName') && <FormHelperText error>{ errors.get('lastName').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <TextField
              id='select-currency'
              select name='gender'
              label='Select gender'
              value={student.gender || ''}
              onChange={(e) => { this._handleInputChange(e) }}
              margin='normal'>
              <MenuItem value={null} primaryText=""/>
              <MenuItem value='1'>
                Male
              </MenuItem>
              <MenuItem value='0'>
                Female
              </MenuItem>
            </TextField>
            {errors && errors.get('gender') && <FormHelperText error>{ errors.get('gender').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Phone</InputLabel>
            <Input
              fullWidth
              name='phone'
              type='text'
              margin='dense'
              value={student.phone || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('phone') && <FormHelperText error>{ errors.get('phone').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className='full-width form-inputs'>
            <TextField
              id='select-currency'
              select name='schoolId'
              label='Select school'
              value={student.schoolId || ''}
              onChange={(e) => { this._handleInputChange(e) }}
              margin='normal'>
              <MenuItem value={null} primaryText="" />
              {this._renderSchools()}
            </TextField>
            {errors && errors.get('schoolId') && <FormHelperText error>{ errors.get('schoolId').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className='full-width form-inputs'>
            <TextField
              id='select-currency'
              select name='homeroom'
              label='Select homeroom'
              value={student.homeroom || ''}
              onChange={(e) => { this._handleInputChange(e) }}
              margin='normal'>
              <MenuItem value={null} primaryText="" />
              <MenuItem value='1'>
                Homeroom #1
              </MenuItem>
              <MenuItem value='2'>
                Homeroom #2
              </MenuItem>
            </TextField>
            {errors && errors.get('homeroom') && <FormHelperText error>{ errors.get('homeroom').get(0) }</FormHelperText>}
          </FormControl>
        </div>
      </div>
    );
  }
}

export default StudentForm;