import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, TextField, Select } from 'material-ui';

class AdministrationForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    adminUser: PropTypes.object.isRequired,
    schools: PropTypes.any,
    roles: PropTypes.any,
    errors: PropTypes.any
  };

  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;

      this.props.onChange({
      ...this.props.adminUser,
      [name]: value
    });
  }

  _renderRoles() {
    const { roles } = this.props;

    return roles.map((role, key) => (
      <MenuItem key={key} value={ role.get('roleId') }>
        { role.get('name') }
      </MenuItem>
    ));
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
    const { adminUser, errors } = this.props;

    return (
      <div className='row'>
        <div className='col-sm-8 m-auto'>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Group</InputLabel>
            <Select
              primarytext=""
              name='roleId'
              onChange={(e) => { this._handleInputChange(e) }}
              children={this._renderRoles()}
              value={adminUser.roleId || ''}>
            </Select>
            {errors && errors.get('roleId') && <FormHelperText error>{ errors.get('roleId').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Username</InputLabel>
            <Input
              autoFocus
              name='username'
              margin='dense'
              fullWidth
              value={adminUser.username || ''}
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
              value={adminUser.password || ''}
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
              value={adminUser.email || ''}
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
              value={adminUser.firstName || ''}
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
              value={adminUser.lastName || ''}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('lastName') && <FormHelperText error>{ errors.get('lastName').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Select Gender</InputLabel>
            <Select
                primarytext=""
                name='gender'
                onChange={(e) => { this._handleInputChange(e) }}
                value={adminUser.gender || ''}>
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
                value={adminUser.phoneNumber || ''}
                onChange={(e) => { this._handleInputChange(e) }}/>
              {errors && errors.get('phoneNumber') && <FormHelperText error>{ errors.get('phoneNumber').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>School</InputLabel>
            <Select
                primarytext=""
                name='schoolId'
                onChange={(e) => { this._handleInputChange(e) }}
                children={this._renderSchools()}
                value={adminUser.schoolId || ''}>
            </Select>
            {errors && errors.get('schoolId') && <FormHelperText error>{ errors.get('schoolId').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Homeroom</InputLabel>
            <Select
                primarytext=""
                name='homeroomId'
                onChange={(e) => { this._handleInputChange(e) }}
                value={adminUser.homeroomId || ''}>
              <MenuItem value={null} primaryText="" />
              <MenuItem value='1'>Homeroom #1</MenuItem>
              <MenuItem value='2'>Homeroom #2</MenuItem>
            </Select>
            {errors && errors.get('homeroom') && <FormHelperText error>{ errors.get('homeroom').get(0) }</FormHelperText>}
          </FormControl>
        </div>
      </div>
    );
  }
}

export default AdministrationForm;