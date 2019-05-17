import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import { getRoles } from '../../../redux/administration/actions';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { selectRoles } from '../../../redux/administration/selectors';
import { selectGetSchoolHomeroomsRequest } from "../../../redux/schools/selectors";
import { getSchoolHomerooms } from "../../../redux/schools/actions";

class AdministrationForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    adminUser: PropTypes.object.isRequired,
    roles: PropTypes.any,
    errors: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.state = {
      schoolHomerooms: []
    };
  }

  componentDidMount() {
    const { getRoles, getSchoolHomerooms, adminUser } = this.props;        
    
    getRoles();
    getSchoolHomerooms((adminUser ? {schoolId: adminUser.schoolId} : {}));
  }

  componentWillReceiveProps(nextProps) {
    this._getSchoolHomeroomsSuccess(nextProps);
  }

  _getSchoolHomeroomsSuccess(nextProps) {
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
    const { name, value } = event.target;

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

  _renderSchoolHomerooms() {
    const { schoolHomerooms } = this.state;

    return schoolHomerooms.map((homeroom, key) => (
      <MenuItem key={key} value={ homeroom.id }>
        { homeroom.name }
      </MenuItem>
    ));
  }

  render() {
    const { adminUser, errors, t } = this.props;

    return (
      <div className='row'>
        <div className='col-sm-12 col-md-10 m-auto'>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='roleId'>{t('group')}</InputLabel>
            <Select
              name='roleId'
              id="roleId"                                                            
              onChange={(e) => { this._handleInputChange(e) }}
              value={adminUser.roleId || ''}>
              {this._renderRoles()}
            </Select>
            {errors && errors.get('roleId') && <FormHelperText error>{errors.get('roleId').get(0)}</FormHelperText>}
          </FormControl>          
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='username'>{t('username')}</InputLabel>
            <Input
              name='username'
              margin='dense'
              fullWidth
              value={adminUser.username || ''}
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
              value={adminUser.password || ''}
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
              value={adminUser.email || ''}
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
              value={adminUser.firstName || ''}
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
              value={adminUser.lastName || ''}
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
                value={adminUser.gender || ''}>
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
              value={adminUser.phoneNumber || ''}
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
                  value={adminUser.homeroomId || ''}>
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

AdministrationForm = connect(
  (state) => ({    
    roles: selectRoles(state),
    getSchoolHomeroomsRequest: selectGetSchoolHomeroomsRequest(state)
  }),
  (dispatch) => ({    
    getRoles: () => { dispatch(getRoles()) },
    getSchoolHomerooms: (params = {}) => { dispatch(getSchoolHomerooms(params)) }
  })
)(AdministrationForm);

export default withTranslation('translations')(AdministrationForm);