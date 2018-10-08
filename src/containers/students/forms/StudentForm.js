import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { selectGetSchoolHomeroomsRequest } from '../../../redux/schools/selectors';
import { getSchoolHomerooms } from '../../../redux/schools/actions';
import DatePicker from "../../../components/ui/DatePicker";
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
    const { getSchoolHomerooms } = this.props;
    
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
                        <Select
                            name='gender'
                            id="gender"
                            className='form-control m-input m-input--air main-select'
                            disableUnderline={true}                            
                            onChange={(e) => { this._handleInputChange(e) }}
                            value={student.gender || ''}>
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
                        <input type="text" onChange={(e) => { this._handleInputChange(e) }} value={student.phoneNumber || ''} className="form-control m-input--air form-control-success m-input" name="phoneNumber" id="phoneNumber"/>
                        {errors && errors.get('phoneNumber') && <div className="form-control-feedback error">{ errors.get('phoneNumber').get(0) }</div>}
                    </div>
                </div>
                
                <div className="form-group m-form__group row">
                  <label className="col-form-label col-lg-3 col-sm-12" htmlFor="phone">{t('birthday')}</label>
                  <div className="col-lg-8 col-md-12 col-sm-12">
                    <DatePicker
                      InputProps={{
                          className: "form-control m-input m-input--air m--padding-top-5 m--padding-bottom-0",
                          disableUnderline: true                    
                      }}
                      style={{width: '100%'}}
                      disableUnderline={true}
                      value={student.birthday || null}
                      onChange={(date) => { this._handleDateChange(date, 'birthday') }}/>
                    {errors && errors.get('birthday') &&
                    <div className="form-control-feedback text-center error">{errors.get('birthday').get(0)}</div>}
                  </div>
                </div>
                      
                <HasPermission permissions={['[Users][Students][Create][Any]']}>
                  <div className="form-group m-form__group row">
                      <label className="col-form-label col-lg-3" htmlFor="homeroomId">{t('homeroom')}</label>
                      <div className="col-lg-9">
                          <Select                              
                              name='homeroomId'
                              id="homeroomId"
                              className='form-control m-input m-input--air main-select'
                              disableUnderline={true}                              
                              onChange={(e) => { this._handleInputChange(e) }}
                              value={student.homeroomId || ''}>
                              <MenuItem value={null} primarytext=""/>
                              {this._renderSchoolHomerooms()}
                          </Select>
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
    getSchoolHomeroomsRequest: selectGetSchoolHomeroomsRequest(state),
  }),
  (dispatch) => ({    
    getSchoolHomerooms: () => { dispatch(getSchoolHomerooms()) }
  })
)(StudentForm);

export default translate('translations')(StudentForm);