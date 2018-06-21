import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { getRoles } from '../../../redux/administration/actions';
import { connect } from 'react-redux';
import { selectRoles } from '../../../redux/administration/selectors';
import { selectGetSchoolHomeroomsRequest, selectSchools } from "../../../redux/schools/selectors";
import { getSchoolHomerooms, getSchools } from "../../../redux/schools/actions";
import MetronicSelect from "../../../components/ui/metronic/MetronicSelect";

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
      schoolHomerooms: [],
    };
  }

  componentDidMount() {
    const { getSchools, getRoles, getSchoolHomerooms } = this.props;

    getSchools();
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
    const { adminUser, errors } = this.props;

    return (
      <div className='row'>
          <div className='col-sm-12 m-auto'>

              <div className="m-form">
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="gender">Group</label>
                      <div className="col-lg-9">
                          <MetronicSelect
                              primarytext=""
                              name='roleId'
                              id="roleId"
                              onChange={(e) => { this._handleInputChange(e) }}
                              value={adminUser.roleId || ''}>
                              {this._renderRoles()}
                          </MetronicSelect>
                          {errors && errors.get('roleId') && <div className="form-control-feedback error">{ errors.get('roleId').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="username">Username</label>
                      <div className="col-lg-9">
                          <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.username || ''} className="form-control m-input--air form-control-success m-input" name="username" id="username"/>
                          {errors && errors.get('username') && <div className="form-control-feedback error">{ errors.get('username').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="password">Password</label>
                      <div className="col-lg-9">
                          <input type="password" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.password || ''} className="form-control m-input--air form-control-success m-input" name="password" id="password"/>
                          {errors && errors.get('password') && <div className="form-control-feedback error">{ errors.get('password').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="email">Email</label>
                      <div className="col-lg-9">
                          <input type="email" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.email || ''} className="form-control m-input--air form-control-success m-input" name="email" id="email"/>
                          {errors && errors.get('email') && <div className="form-control-feedback error">{ errors.get('email').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="firsName">First Name</label>
                      <div className="col-lg-9">
                          <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.firstName || ''} className="form-control m-input--air form-control-success m-input" name="firstName" id="firstName"/>
                          {errors && errors.get('firstName') && <div className="form-control-feedback error">{ errors.get('firstName').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="lastName">Last Name</label>
                      <div className="col-lg-9">
                          <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.lastName || ''} className="form-control m-input--air form-control-success m-input" name="lastName" id="lastName"/>
                          {errors && errors.get('lastName') && <div className="form-control-feedback error">{ errors.get('lastName').get(0) }</div>}
                      </div>
                  </div>

                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="gender">Select Gender</label>
                      <div className="col-lg-9">
                          <MetronicSelect
                              primarytext=""
                              name='gender'
                              id="gender"
                              onChange={(e) => { this._handleInputChange(e) }}
                              value={adminUser.gender || ''}>
                              <MenuItem value={null} primarytext=""/>
                              <MenuItem value='1'>Male</MenuItem>
                              <MenuItem value='0'>Female</MenuItem>
                          </MetronicSelect>
                          {errors && errors.get('gender') && <div className="form-control-feedback error">{ errors.get('gender').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="firsName">Phone Number</label>
                      <div className="col-lg-9">
                          <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={adminUser.phoneNumber || ''} className="form-control m-input--air form-control-success m-input" name="phoneNumber" id="phoneNumber"/>
                          {errors && errors.get('phoneNumber') && <div className="form-control-feedback error">{ errors.get('phoneNumber').get(0) }</div>}
                      </div>
                  </div>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="homeroomId">Homeroom</label>
                      <div className="col-lg-9">
                          <MetronicSelect
                              primarytext=""
                              name='homeroomId'
                              id="homeroomId"
                              onChange={(e) => { this._handleInputChange(e) }}
                              value={adminUser.homeroomId || ''}>
                              <MenuItem value={null} primarytext=""/>
                              {this._renderSchoolHomerooms()}
                          </MetronicSelect>
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
    schools: selectSchools(state),
    roles: selectRoles(state),
    getSchoolHomeroomsRequest: selectGetSchoolHomeroomsRequest(state),
  }),
  (dispatch) => ({
    getSchools: () => { dispatch(getSchools()) },
    getRoles: () => { dispatch(getRoles()) },
    getSchoolHomerooms: () => { dispatch(getSchoolHomerooms()) }
  })
)(AdministrationForm);

export default AdministrationForm;