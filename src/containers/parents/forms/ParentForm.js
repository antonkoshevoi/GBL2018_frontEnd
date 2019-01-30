import React, {Component} from 'react';
import { MenuItem, Select, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { translate } from 'react-i18next';
import MuiDatePicker from "../../../components/ui/MuiDatePicker";

class ParentForm extends Component {

  constructor (props) {
    super(props);
    this.state = {};
  }

  _handleInputChange(event) {
    const { name, value } = event.target;
      this.props.onChange({
      ...this.props.parent,
      [name]: value
    });
  }
  
  _handleDateChange(value, name) {    
      this.props.onChange({
        ...this.props.parent,
        [name]: value
    });
  };

  render() {
    const { parent, errors, t } = this.props;

    return (
      <div className='row'>
        <div className='col-sm-12 col-md-10 m-auto'>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='username'>{t('username')}</InputLabel>
            <Input
              name='username'
              margin='dense'
              fullWidth
              value={parent.username || ''}
              onChange={(e) => {
                this._handleInputChange(e)
              }}/>
            {errors && errors.get('username') && <FormHelperText error>{errors.get('username').get(0)}</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='password'>{t('password')}</InputLabel>
            <Input
              name='password'
              margin='dense'
              type="password"
              fullWidth
              value={parent.password || ''}
              onChange={(e) => {
                this._handleInputChange(e)
              }}/>
            {errors && errors.get('password') && <FormHelperText error>{errors.get('password').get(0)}</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='email'>{t('email')}</InputLabel>
            <Input
              name='email'
              margin='dense'              
              fullWidth
              value={parent.email || ''}
              onChange={(e) => {
                this._handleInputChange(e)
              }}/>
            {errors && errors.get('email') && <FormHelperText error>{errors.get('email').get(0)}</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='firstName'>{t('firstName')}</InputLabel>
            <Input
              name='firstName'
              margin='dense'              
              fullWidth
              value={parent.firstName || ''}
              onChange={(e) => {
                this._handleInputChange(e)
              }}/>
            {errors && errors.get('firstName') && <FormHelperText error>{errors.get('firstName').get(0)}</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='lastName'>{t('lastName')}</InputLabel>
            <Input
              name='lastName'
              margin='dense'              
              fullWidth
              value={parent.lastName || ''}
              onChange={(e) => {
                this._handleInputChange(e)
              }}/>
            {errors && errors.get('lastName') && <FormHelperText error>{errors.get('lastName').get(0)}</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='lastName'>{t('selectGender')}</InputLabel>
            <Select
                name='gender'
                id="gender"                                                                              
                onChange={(e) => { this._handleInputChange(e) }}
                value={parent.gender || ''}>
                <MenuItem value={null} primarytext=""/>
                <MenuItem value='male'>{t('male')}</MenuItem>
                <MenuItem value='female'>{t('female')}</MenuItem>
            </Select>
            {errors && errors.get('gender') && <FormHelperText error>{errors.get('gender').get(0)}</FormHelperText>}
          </FormControl>         
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='phoneNumber'>{t('phoneNumber')}</InputLabel>
            <Input
              name='phoneNumber'
              margin='dense'              
              fullWidth
              value={parent.phoneNumber || ''}
              onChange={(e) => {
                this._handleInputChange(e)
              }}/>
            {errors && errors.get('phoneNumber') && <FormHelperText error>{errors.get('phoneNumber').get(0)}</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>            
            <MuiDatePicker
              label={t('birthday')}
              value={parent.birthday || null}
              onChange={(date) => { this._handleDateChange(date, 'birthday') }}/>
            {errors && errors.get('birthday') && <FormHelperText error>{errors.get('birthday').get(0)}</FormHelperText>}
          </FormControl>          
        </div>
      </div>
    );
  }
}

export default translate('translations')(ParentForm);