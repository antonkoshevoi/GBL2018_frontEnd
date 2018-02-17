import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from 'material-ui';
import { connect } from 'react-redux';
import { selectGetSchoolHomeroomsRequest, selectSchools } from '../../../redux/schools/selectors';
import { getSchoolHomerooms, getSchools } from '../../../redux/schools/actions';
import MetronicSelect from "../../../components/ui/metronic/MetronicSelect";
import HasRole from "../../middlewares/HasRole";
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

  _renderSchoolHomerooms() {
    const { schoolHomerooms } = this.state;

    return schoolHomerooms.map((homeroom, key) => (
      <MenuItem key={key} value={ homeroom.id }>
        { homeroom.name }
      </MenuItem>
    ));
  }

  render() {
    const { student, errors } = this.props;

    return (
      <div className='row'>
        <div className='col-sm-12 m-auto'>
            <div className="m-form">
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="username">Username</label>
                    <div className="col-lg-9">
                        <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={student.username || ''} className="form-control m-input--air form-control-success m-input" name="username" id="username"/>
                        {errors && errors.get('username') && <div className="form-control-feedback error">{ errors.get('username').get(0) }</div>}
                    </div>
                </div>
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="password">Password</label>
                    <div className="col-lg-9">
                        <input type="password" onChange={(e) => { this._handleInputChange(e) }} value={student.password || ''} className="form-control m-input--air form-control-success m-input" name="password" id="password"/>
                        {errors && errors.get('password') && <div className="form-control-feedback error">{ errors.get('password').get(0) }</div>}
                    </div>
                </div>
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="email">Email</label>
                    <div className="col-lg-9">
                        <input type="email" onChange={(e) => { this._handleInputChange(e) }} value={student.email || ''} className="form-control m-input--air form-control-success m-input" name="email" id="email"/>
                        {errors && errors.get('email') && <div className="form-control-feedback error">{ errors.get('email').get(0) }</div>}
                    </div>
                </div>
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="firsName">First Name</label>
                    <div className="col-lg-9">
                        <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={student.firstName || ''} className="form-control m-input--air form-control-success m-input" name="firstName" id="firstName"/>
                        {errors && errors.get('firstName') && <div className="form-control-feedback error">{ errors.get('firstName').get(0) }</div>}
                    </div>
                </div>
                <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="lastName">Last Name</label>
                    <div className="col-lg-9">
                        <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={student.lastName || ''} className="form-control m-input--air form-control-success m-input" name="lastName" id="lastName"/>
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
                            value={student.gender || ''}>
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
                        <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={student.phoneNumber || ''} className="form-control m-input--air form-control-success m-input" name="phoneNumber" id="phoneNumber"/>
                        {errors && errors.get('phoneNumber') && <div className="form-control-feedback error">{ errors.get('phoneNumber').get(0) }</div>}
                    </div>
                </div>
                <HasPermission permissions={[
                  '[Users][Students][Create][Any]'
                ]}>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="homeroomId">Homeroom</label>
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




          {/*<FormControl className='full-width form-inputs'>*/}
            {/*<InputLabel htmlFor='name-error'>School</InputLabel>*/}
            {/*<Select*/}
                {/*primarytext=""*/}
                {/*name='schoolId'*/}
                {/*onChange={(e) => { this._handleSchoolChange(e) }}*/}
                {/*value={student.schoolId || ''}>*/}
              {/*<MenuItem value={null} primarytext=""/>*/}
              {/*{this._renderSchools()}*/}
            {/*</Select>*/}
            {/*{errors && errors.get('schoolId') && <FormHelperText error>{ errors.get('schoolId').get(0) }</FormHelperText>}*/}
          {/*</FormControl>*/}

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

export default StudentForm;