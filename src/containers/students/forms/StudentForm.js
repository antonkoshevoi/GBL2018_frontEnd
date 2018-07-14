import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { selectGetSchoolHomeroomsRequest, selectSchools } from '../../../redux/schools/selectors';
import { getSchoolHomerooms, getSchools } from '../../../redux/schools/actions';
import MetronicSelect from "../../../components/ui/metronic/MetronicSelect";
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
    const { getSchools, getSchoolHomerooms } = this.props;

    getSchools();
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
        <div className='col-sm-12 m-auto'>
            <div className="m-form">
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="username">{t('username')}</label>
                    <div className="col-lg-9">
                        <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={student.username || ''} className="form-control m-input--air form-control-success m-input" name="username" id="username"/>
                        {errors && errors.get('username') && <div className="form-control-feedback error">{ errors.get('username').get(0) }</div>}
                    </div>
                </div>
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="password">{t('password')}</label>
                    <div className="col-lg-9">
                        <input type="password" onChange={(e) => { this._handleInputChange(e) }} value={student.password || ''} className="form-control m-input--air form-control-success m-input" name="password" id="password"/>
                        {errors && errors.get('password') && <div className="form-control-feedback error">{ errors.get('password').get(0) }</div>}
                    </div>
                </div>
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="email">{t('email')}</label>
                    <div className="col-lg-9">
                        <input type="email" onChange={(e) => { this._handleInputChange(e) }} value={student.email || ''} className="form-control m-input--air form-control-success m-input" name="email" id="email"/>
                        {errors && errors.get('email') && <div className="form-control-feedback error">{ errors.get('email').get(0) }</div>}
                    </div>
                </div>
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="firstName">{t('firstName')}</label>
                    <div className="col-lg-9">
                        <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={student.firstName || ''} className="form-control m-input--air form-control-success m-input" name="firstName" id="firstName"/>
                        {errors && errors.get('firstName') && <div className="form-control-feedback error">{ errors.get('firstName').get(0) }</div>}
                    </div>
                </div>
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="lastName">{t('lastName')}</label>
                    <div className="col-lg-9">
                        <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={student.lastName || ''} className="form-control m-input--air form-control-success m-input" name="lastName" id="lastName"/>
                        {errors && errors.get('lastName') && <div className="form-control-feedback error">{ errors.get('lastName').get(0) }</div>}
                    </div>
                </div>

                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="gender">{t('selectGender')}</label>
                    <div className="col-lg-9">
                        <MetronicSelect
                            primarytext=""
                            name='gender'
                            id="gender"
                            onChange={(e) => { this._handleInputChange(e) }}
                            value={student.gender || ''}>
                            <MenuItem value={null} primarytext=""/>
                            <MenuItem value='1'>{t('male')}</MenuItem>
                            <MenuItem value='0'>{t('female')}</MenuItem>
                        </MetronicSelect>
                        {errors && errors.get('gender') && <div className="form-control-feedback error">{ errors.get('gender').get(0) }</div>}
                    </div>
                </div>
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="firsName">{t('phoneNumber')}</label>
                    <div className="col-lg-9">
                        <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={student.phoneNumber || ''} className="form-control m-input--air form-control-success m-input" name="phoneNumber" id="phoneNumber"/>
                        {errors && errors.get('phoneNumber') && <div className="form-control-feedback error">{ errors.get('phoneNumber').get(0) }</div>}
                    </div>
                </div>
                <HasPermission permissions={[
                  '[Users][Students][Create][Any]'
                ]}>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="homeroomId">{t('homeroom')}</label>
                      <div className="col-lg-9">
                          <MetronicSelect
                              primarytext=""
                              name='homeroomId'
                              id="homeroomId"
                              onChange={(e) => { this._handleInputChange(e) }}
                              value={student.homeroomId || ''}>
                              <MenuItem value={null} primarytext=""/>
                              {this._renderSchoolHomerooms()}
                          </MetronicSelect>
                          {errors && errors.get('homeroom') && <div className="form-control-feedback error">{ errors.get('homeroom').get(0) }</div>}
                      </div>
                  </div>
                </HasPermission>
            </div>
        </div>
      </div>
    );
  }
}

StudentForm = connect(
  (state) => ({
    schools: selectSchools(state),
    getSchoolHomeroomsRequest: selectGetSchoolHomeroomsRequest(state),
  }),
  (dispatch) => ({
    getSchools: () => { dispatch(getSchools()) },
    getSchoolHomerooms: () => { dispatch(getSchoolHomerooms()) }
  })
)(StudentForm);

export default translate('translations')(StudentForm);