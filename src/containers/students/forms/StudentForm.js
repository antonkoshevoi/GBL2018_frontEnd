import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { selectGetSchoolHomeroomsRequest } from '../../../redux/schools/selectors';
import { getSchoolHomerooms } from '../../../redux/schools/actions';
import MuiDatePicker from "../../../components/ui/MuiDatePicker";
import HasPermission from "../../middlewares/HasPermission";

class StudentForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    errors: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.state = {
      schoolHomerooms: [],
    };
  }

  componentDidMount() {
    const { getSchoolHomerooms, student } = this.props;
    
    getSchoolHomerooms((student ? {schoolId: student.schoolId} : {}));
  }

  componentDidUpdate(prevProps) {
    this._getSchoolHomeroomsSuccess(prevProps);
  }

  _getSchoolHomeroomsSuccess(prevProps) {
    const homerooms = this.props.getSchoolHomeroomsRequest.get('records');
    const prevHomerooms = prevProps.getSchoolHomeroomsRequest.get('records');

    if (homerooms && !prevHomerooms) {
      this.setState({
        ...this.state,
        schoolHomerooms: homerooms.toJS()
      });
    }
  }

  _handleInputChange(event) {
    const { name, value } = event.target;
      this.props.onChange({
      ...this.props.student,
      [name]: value
    });
  }
  
  _handleDateChange(value, name) {    
      this.props.onChange({
        ...this.props.student,
        [name]: value
    });
  };  

  _renderSchoolHomerooms() {
    const { schoolHomerooms } = this.state;

    return schoolHomerooms.map((homeroom, key) => (
      <MenuItem key={key} value={ homeroom.id }>
        { homeroom.name }
      </MenuItem>
    ));
  }

  render() {
    const { student, errors, t } = this.props;

    return (
      <div className='row'>
        <div className='col-sm-12 col-md-10 m-auto'>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='username'>{t('username')}</InputLabel>
            <Input
              name='username'
              margin='dense'
              fullWidth
              value={student.username || ''}
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
              value={student.password || ''}
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
              value={student.email || ''}
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
              value={student.firstName || ''}
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
              value={student.lastName || ''}
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
                value={student.gender || ''}>
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
              value={student.phoneNumber || ''}
              onChange={(e) => {
                this._handleInputChange(e)
              }}/>
            {errors && errors.get('phoneNumber') && <FormHelperText error>{errors.get('phoneNumber').get(0)}</FormHelperText>}
          </FormControl>
          <FormControl className='full-width form-inputs'>            
            <MuiDatePicker
              label={t('birthday')}
              value={student.birthday || null}
              onChange={(date) => { this._handleDateChange(date, 'birthday') }}/>
            {errors && errors.get('birthday') && <FormHelperText error>{errors.get('birthday').get(0)}</FormHelperText>}
          </FormControl>
          <HasPermission permissions={['[Users][Students][Create][Any]']}>
            <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='homeroomId'>{t('homeroom')}</InputLabel>
              <Select                              
                  name='homeroomId'
                  id="homeroomId"                            
                  onChange={(e) => { this._handleInputChange(e) }}
                  value={student.homeroomId || ''}>
                  <MenuItem value={null} primarytext=""/>
                  {this._renderSchoolHomerooms()}
              </Select>
              {errors && errors.get('homeroom') && <FormHelperText error>{errors.get('homeroom').get(0)}</FormHelperText>}
            </FormControl>
          </HasPermission>           
        </div>
      </div>
    );
  }
}

StudentForm = connect(
  (state) => ({    
    getSchoolHomeroomsRequest: selectGetSchoolHomeroomsRequest(state),
  }),
  (dispatch) => ({    
    getSchoolHomerooms: (params = {}) => { dispatch(getSchoolHomerooms(params)) }
  })
)(StudentForm);

export default withTranslation('translations')(StudentForm);