import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import { getRoles } from '../../../redux/administration/actions';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
    const { getRoles, getSchoolHomerooms } = this.props;
    
    getRoles();
    getSchoolHomerooms();
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
          <div className='col-sm-12 m-auto'>
              <div className="m-form">
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="gender">{t('group')}</label>
                      <div className="col-lg-9">
                          <Select
                              name='roleId'
                              id="roleId"
                              className='form-control m-input m-input--air main-select'
                              disableUnderline={true}
                              onChange={(e) => { this._handleInputChange(e) }}
                              value={adminUser.roleId || ''}>
                              {this._renderRoles()}
                          </Select>
                          {errors && errors.get('roleId') && <div className="form-control-feedback error">{ errors.get('roleId').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="username">{t('username')}</label>
                      <div className="col-lg-9">
                          <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.username || ''} className="form-control m-input--air form-control-success m-input" name="username" id="username"/>
                          {errors && errors.get('username') && <div className="form-control-feedback error">{ errors.get('username').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="password">{t('password')}</label>
                      <div className="col-lg-9">
                          <input type="password" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.password || ''} className="form-control m-input--air form-control-success m-input" name="password" id="password"/>
                          {errors && errors.get('password') && <div className="form-control-feedback error">{ errors.get('password').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="email">{t('email')}</label>
                      <div className="col-lg-9">
                          <input type="email" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.email || ''} className="form-control m-input--air form-control-success m-input" name="email" id="email"/>
                          {errors && errors.get('email') && <div className="form-control-feedback error">{ errors.get('email').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="firsName">{t('firstName')}</label>
                      <div className="col-lg-9">
                          <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.firstName || ''} className="form-control m-input--air form-control-success m-input" name="firstName" id="firstName"/>
                          {errors && errors.get('firstName') && <div className="form-control-feedback error">{ errors.get('firstName').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="lastName">{t('lastName')}</label>
                      <div className="col-lg-9">
                          <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.lastName || ''} className="form-control m-input--air form-control-success m-input" name="lastName" id="lastName"/>
                          {errors && errors.get('lastName') && <div className="form-control-feedback error">{ errors.get('lastName').get(0) }</div>}
                      </div>
                  </div>

                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="gender">{t('selectGender')}</label>
                      <div className="col-lg-9">
                          <Select
                              name='gender'
                              id='gender'
                              className='form-control m-input m-input--air main-select'
                              disableUnderline={true}
                              onChange={(e) => { this._handleInputChange(e) }}
                              value={adminUser.gender || ''}>
                              <MenuItem value={null} primarytext=""/>
                              <MenuItem value='male'>{t('male')}</MenuItem>
                              <MenuItem value='female'>{t('female')}</MenuItem>
                          </Select>
                          {errors && errors.get('gender') && <div className="form-control-feedback error">{ errors.get('gender').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="firsName">{t('phoneNumber')}</label>
                      <div className="col-lg-9">
                          <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.phoneNumber || ''} className="form-control m-input--air form-control-success m-input" name="phoneNumber" id="phoneNumber"/>
                          {errors && errors.get('phoneNumber') && <div className="form-control-feedback error">{ errors.get('phoneNumber').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="homeroomId">{t('homeroom')}</label>
                      <div className="col-lg-9">
                          <Select
                              name='homeroomId'
                              id="homeroomId"
                              className='form-control m-input m-input--air main-select'
                              disableUnderline={true}
                              onChange={(e) => { this._handleInputChange(e) }}
                              value={adminUser.homeroomId || ''}>
                              <MenuItem value={null} primarytext=""/>
                              {this._renderSchoolHomerooms()}
                          </Select>
                          {errors && errors.get('homeroom') && <div className="form-control-feedback error">{ errors.get('homeroom').get(0) }</div>}
                      </div>
                  </div>
              </div>
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
    getSchoolHomerooms: () => { dispatch(getSchoolHomerooms()) }
  })
)(AdministrationForm);

export default translate('translations')(AdministrationForm);