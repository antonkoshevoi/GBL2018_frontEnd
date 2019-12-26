import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { selectGetSchoolHomeroomsRequest } from '../../../redux/schools/selectors';
import { getSchoolHomerooms } from '../../../redux/schools/actions';

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
    const { getSchoolHomerooms, teacher } = this.props;
    
    getSchoolHomerooms((teacher ? {schoolId: teacher.schoolId} : {}));
  }

  componentDidUpdate(prevProps) {
    this._getSchoolHomeroomsSuccess(prevProps);
  }

  _getSchoolHomeroomsSuccess(prevProps) {
    const success = this.props.getSchoolHomeroomsRequest.get('success');    

    if (success && !prevProps.getSchoolHomeroomsRequest.get('success')) {
      this.setState({
        ...this.state,
        schoolHomerooms: this.props.getSchoolHomeroomsRequest.get('records').toJS()
      });
    }
  }

  _handleInputChange(event) {
    const { name, value } = event.target;

    this.props.onChange({
      ...this.props.teacher,
      [name]: value
    });
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
    const { teacher, errors, t} = this.props;

    return (
        <div className='row'>
            <div className='col-sm-12 col-md-10 m-auto'>
                <FormControl className='full-width form-inputs'>
                  <InputLabel htmlFor='username'>{t('username')}</InputLabel>
                  <Input
                    name='username'
                    margin='dense'
                    fullWidth
                    value={teacher.username || ''}
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
                    value={teacher.password || ''}
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
                    value={teacher.email || ''}
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
                    value={teacher.firstName || ''}
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
                    value={teacher.lastName || ''}
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
                      value={teacher.gender || ''}>
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
                    value={teacher.phoneNumber || ''}
                    onChange={(e) => {
                      this._handleInputChange(e)
                    }}/>
                  {errors && errors.get('phoneNumber') && <FormHelperText error>{errors.get('phoneNumber').get(0)}</FormHelperText>}
                </FormControl>
                <FormControl className='full-width form-inputs'>
                  <InputLabel htmlFor='homeroomId'>{t('homeroom')}</InputLabel>
                  <Select                              
                        name='homeroomId'
                        id="homeroomId"                            
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={teacher.homeroomId || ''}>
                        <MenuItem value={null} primarytext=""/>
                        {this._renderSchoolHomerooms()}
                  </Select>
                  {errors && errors.get('homeroom') && <FormHelperText error>{errors.get('homeroom').get(0)}</FormHelperText>}
                </FormControl>
            </div>
        </div>
    );
  }
}

export default withTranslation('translations')(connect(
  (state) => ({    
    getSchoolHomeroomsRequest: selectGetSchoolHomeroomsRequest(state),
  }),
  (dispatch) => ({    
    getSchoolHomerooms: (params = {}) => { dispatch(getSchoolHomerooms(params)) }
  })
)(TeacherForm));