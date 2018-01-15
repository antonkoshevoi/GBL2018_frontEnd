import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Divider, FormControl, FormHelperText, Input, InputLabel, MenuItem, TextField} from "material-ui";

class AddForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      gender: 'male',
      phone: '',
      school: 1,
      homeroom: 1,
    }
  }

  _submit() {
    this.props.onSubmit(
      this.state
    );
  }

  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { errors } = this.props;

    console.log(errors);
    return (
      <div className="row">
        <div className="col-sm-8 m-auto">
          <FormControl aria-describedby="name-error-text" className="full-width form-inputs">
            <InputLabel htmlFor="name-error">Username</InputLabel>
            <Input autoFocus
              name="username"
              margin="dense"
              fullWidth
              value={this.state.username}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('username') && <FormHelperText>{ errors.get('username').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby="name-error-text" className="full-width form-inputs">
            <InputLabel htmlFor="name-error">Password</InputLabel>
            <Input fullWidth
              name="password"
              type="password"
              margin="dense"
              value={this.state.password}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('password') && <FormHelperText>{ errors.get('password').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby="name-error-text" className="full-width form-inputs">
            <InputLabel htmlFor="name-error">Email</InputLabel>
            <Input fullWidth
              name="email"
              type="email"
              margin="dense"
              value={this.state.email}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('email') && <FormHelperText>{ errors.get('email').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby="name-error-text" className="full-width form-inputs">
            <InputLabel htmlFor="name-error">First Name</InputLabel>
            <Input fullWidth
              name="firstName"
              type="text"
              margin="dense"
              value={this.state.firstName}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('firstName') && <FormHelperText>{ errors.get('firstName').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl aria-describedby="name-error-text" className="full-width form-inputs">
            <InputLabel htmlFor="name-error">Last Name</InputLabel>
            <Input fullWidth
              name="lastName"
              type="text"
              margin="dense"
              value={this.state.lastName}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('lastName') && <FormHelperText>{ errors.get('lastName').get(0) }</FormHelperText>}
          </FormControl>
          <FormControl className="full-width form-inputs">
            <TextField id="select-currency"
              select name="gender"
              label="Select gender"
              value={this.state.gender}
              onChange={(e) => { this._handleInputChange(e) }}
              margin="normal">
              <MenuItem  value="male">
                Male
              </MenuItem>
              <MenuItem  value="female">
                Female
              </MenuItem>
            </TextField>
            {errors && errors.get('gender') && <FormHelperText>{ errors.get('gender').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl aria-describedby="name-error-text" className="full-width form-inputs">
            <InputLabel htmlFor="name-error">Phone</InputLabel>
            <Input fullWidth
              name="phone"
              type="number"
              margin="dense"
              value={this.state.phone}
              onChange={(e) => { this._handleInputChange(e) }}/>
            {errors && errors.get('phone') && <FormHelperText>{ errors.get('phone').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className="full-width form-inputs">
            <TextField id="select-currency"
              select name="school"
              label="Select school"
              value={this.state.school}
              onChange={(e) => { this._handleInputChange(e) }}
              margin="normal">
              <MenuItem value="male">
                Male
              </MenuItem>
              <MenuItem value="female">
                Female
              </MenuItem>
            </TextField>
            {errors && errors.get('school') && <FormHelperText>{ errors.get('school').get(0) }</FormHelperText>}
          </FormControl>

          <FormControl className="full-width form-inputs">
            <TextField id="select-currency"
              select name="homeroom"
              label="Select homeroom"
              value={this.state.homeroom}
              onChange={(e) => { this._handleInputChange(e) }}
              margin="normal">
              <MenuItem  value="male">
                Male
              </MenuItem>
              <MenuItem  value="female">
                Female
              </MenuItem>
            </TextField>
            {errors && errors.get('homeroom') && <FormHelperText>{ errors.get('homeroom').get(0) }</FormHelperText>}
          </FormControl>
        </div>
        <div className="col-sm-12">
          <Divider/>
          <Button raised className="mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn" color="primary" onClick={() => { this._submit() }} >
            Add New User
          </Button>
        </div>
      </div>
    );
  }
}

AddForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.any
};

export default AddForm;
