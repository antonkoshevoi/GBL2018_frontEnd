import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Icon, Button, Tooltip, Select, MenuItem } from 'material-ui';
import { getSchoolHomerooms } from "../../../redux/schools/actions";
import { selectGetSchoolHomeroomsRequest } from "../../../redux/schools/selectors";
import MetronicDatePicker from "../../../components/ui/metronic/MetronicDatePicker";
import { update } from "../../../redux/user/actions";
import { selectUpdateRequest } from "../../../redux/user/selectors";

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

class Details extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    schools: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      schoolHomerooms: [],
      mode: 'overview',
    }
  }

  componentDidMount () {
    this.setState({
      ...this.state,
      user: this.props.user
    });

    const { getSchoolHomerooms } = this.props;

    getSchoolHomerooms();
  }

  componentWillReceiveProps(nextProps) {
    this._updateUserSuccess(nextProps);
    this._getSchoolHomeroomsSuccess(nextProps);
  }

  _getSchoolHomeroomsSuccess(nextProps) {
    const schoolHomerooms = this.props.getSchoolHomeroomsRequest.get('records');
    const nextSchoolHomerooms = nextProps.getSchoolHomeroomsRequest.get('records');

    if (!schoolHomerooms && nextSchoolHomerooms) {
      this.setState({
        ...this.state,
        schoolHomerooms: nextSchoolHomerooms.toJS()
      });
    }
  }

  _updateUserSuccess(nextProps) {
    const prev = this.props.getUpdateRequest.get('success');
    const next = nextProps.getUpdateRequest.get('success');

    if (!prev && next) {
      this.setState({
        ...this.state,
        mode: 'overview'
      });
    }
  }

  _handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  }

  _handleDateChange(m, dateField) {
    this.setState({
      user: {
        ...this.state.user,
        [dateField]: m
      }
    });
  }

  _handleSwitchMode(mode) {
    this.setState({mode})
  }

  _renderSchools() {
    const { schools } = this.props;

    return schools.map((school,i)=>{
      return <MenuItem key={i} value={school.schId}>{school.schName}</MenuItem>
    });
  }

  _renderHmerooms() {
    const { schoolHomerooms } = this.state;

    return schoolHomerooms.map((schoolHomeroom,i)=>{
      return <MenuItem key={i} value={schoolHomeroom.id}>{schoolHomeroom.name}</MenuItem>
    });
  }

  _onSubmit (e) {
    e.preventDefault();
    this.props.update(
      this.state.user
    );
  };

  render() {
    const { mode, user } = this.state;
    const { getUpdateRequest } = this.props;
    const errors = getUpdateRequest.get('errors');
    const loading = getUpdateRequest.get('loading');

    return (
      <div>
        <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
          <div className="m-portlet__head">
            <div className="m-portlet__head-caption">
              <div className="m-portlet__head-title">
                <span className="m-portlet__head-icon">
                  {(mode === 'overview') ?
                    <i className="flaticon-info"></i> :
                    <Tooltip title="Back" placement="top">
                      <a onClick={() => {
                        this._handleSwitchMode('overview')
                      }} className="pointer la la-arrow-left"></a>
                    </Tooltip>
                  }
                </span>
                <h3 className="m-portlet__head-text">
                  {mode === 'overview' ? 'Info' : 'Edit'}
                </h3>
              </div>
            </div>
            <div className="m-portlet__head-tools">
              <ul className="m-portlet__nav">
                <li className="m-portlet__nav-item">
                  {mode === 'overview' &&
                  <Tooltip id="tooltip-icon" title="Edit" placement="top">
                    <a onClick={() => {
                      this._handleSwitchMode('edit')
                    }}
                       className=" pointer m-portlet__nav-link m-portlet__nav-link--icon">
                      <i className="la la-edit"></i>
                    </a>
                  </Tooltip>
                  }
                </li>
              </ul>
            </div>
          </div>
          <div className="m-portlet__body m--padding-top-5" style={{height: "100%"}}>
            {mode === 'overview' && <TabContainer>
              <div className="m-widget1 m-widget1--paddingless">
                <div className="m-widget1__item">
                  <div className="row m-row--no-padding align-items-center">
                    <div className="col">
                      <h3 className="m-widget1__title">First Name</h3>
                    </div>
                    <div className="col m--align-right">
                      <span className="m-widget1__number m--font-brand">{user.firstName}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                  <div className="row m-row--no-padding align-items-center">
                    <div className="col">
                      <h3 className="m-widget1__title">Last Name</h3>
                    </div>
                    <div className="col m--align-right">
                      <span className="m-widget1__number m--font-brand">{user.lastName}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                  <div className="row m-row--no-padding align-items-center">
                    <div className="col">
                      <h3 className="m-widget1__title">Email</h3>
                    </div>
                    <div className="col m--align-right">
                      <span className="m-widget1__number m--font-brand">{user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                  <div className="row m-row--no-padding align-items-center">
                    <div className="col">
                      <h3 className="m-widget1__title">Birthday</h3>
                    </div>
                    <div className="col m--align-right">
                      <span className="m-widget1__number m--font-brand">{user.birthday}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabContainer>}
            {mode == 'edit' && <TabContainer>
              <form id='update-user-form' onSubmit={(e) => { this._onSubmit(e) }}>
                <div className="alert m-alert m-alert--default">
                  <p>Submitting the following information is optional. Your profile is never shared.</p>
                </div>
                <div className="m-form">
                  <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="firsName">First Name</label>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        name="firstName"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={user.firstName || ''}
                        className="form-control m-input--air form-control-success m-input"
                        id="firsName"/>
                      {errors && errors.get('firstName') && <div className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
                    </div>
                  </div>
                  <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="lastName">Last Name</label>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        name="lastName"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={user.lastName || ''}
                        className="form-control m-input--air form-control-success m-input"
                        id="lastName"/>
                      {errors && errors.get('lastName') && <div className="form-control-feedback text-center error">{errors.get('lastName').get(0)}</div>}
                    </div>
                  </div>
                  <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="email">Email</label>
                    <div className="col-lg-9">
                      <input
                        type="email"
                        name="email"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={user.email || ''}
                        className="form-control m-input--air form-control-success m-input"
                        id="email"/>
                      {errors && errors.get('email') && <div className="form-control-feedback text-center error">{errors.get('email').get(0)}</div>}
                    </div>
                  </div>
                  <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="phone">Phone Number</label>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        name="phoneNumber"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={user.phoneNumber || ''}
                        className="form-control m-input--air form-control-success m-input"
                        id="phone"/>
                      {errors && errors.get('phoneNumber') && <div className="form-control-feedback text-center error">{errors.get('phoneNumber').get(0)}</div>}
                    </div>
                  </div>
                  <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="gender">Gender</label>
                    <div className="col-lg-9">
                      <Select
                        id="gender"
                        name="gender"
                        className="form-control m-input  m-input--air  main-select"
                        style={{minWidth:'120px'}}
                        value={user.gender || 'female'}
                        onChange={(e) => { this._handleInputChange(e) }}>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Famele</MenuItem>
                      </Select>
                      {errors && errors.get('gender') && <div className="form-control-feedback text-center error">{errors.get('gender').get(0)}</div>}
                    </div>
                  </div>
                  <div className="form-group m-form__group row">
                    <label className="col-form-label col-lg-3" htmlFor="phone">Birthday</label>
                    <div className="col-lg-9">
                      <MetronicDatePicker
                        value={user.birthday || null}
                        onChange={(date) => { this._handleDateChange(date, 'birthday') }}/>
                      {errors && errors.get('birthday') && <div className="form-control-feedback text-center error">{errors.get('birthday').get(0)}</div>}
                    </div>
                  </div>
                </div>
                <div className="m-separator m-separator--dashed"></div>
                {/*<div className="row form-group m-form__group">*/}
                  {/*<label className="col-form-label col-md-3" htmlFor="gender">School</label>*/}
                  {/*<div className="col-md-8">*/}
                    {/*<Select*/}
                      {/*id="schools"*/}
                      {/*name="schoolId"*/}
                      {/*className="form-control m-input  m-input--air  main-select"*/}
                      {/*style={{minWidth:'120px'}}*/}
                      {/*value={user.schoolId || ''}*/}
                      {/*onChange={(e) => { this._handleSchoolChange(e) }}>*/}
                      {/*<MenuItem value={null} primarytext=""><em>None</em></MenuItem>*/}
                      {/*{this._renderSchools()}*/}
                    {/*</Select>*/}
                    {/*{errors && errors.get('schoolId') && <div className="form-control-feedback text-center error">{errors.get('schoolId').get(0)}</div>}*/}
                  {/*</div>*/}

                  {/*<div className="col-md-1">*/}
                    {/*<Button fab mini color="primary" aria-label="add">*/}
                      {/*<Icon>add</Icon>*/}
                    {/*</Button>*/}
                  {/*</div>*/}
                {/*</div>*/}
                <div className="m-separator m-separator--dashed"></div>

                <div className="row form-group m-form__group">
                  <label className="col-form-label col-md-3" htmlFor="gender">Homerooms</label>
                  <div className="col-md-8">
                    <Select
                      id="homerooms"
                      name="homeroomId"
                      className="form-control m-input  m-input--air  main-select"
                      style={{minWidth:'120px'}}
                      value={user.homeroomId || ''}
                      onChange={(e) => { this._handleInputChange(e) }}>
                      <MenuItem value={null} primarytext=""><em>None</em></MenuItem>
                      {this._renderHmerooms()}
                    </Select>
                    {errors && errors.get('homeroomId') && <div className="form-control-feedback text-center error">{errors.get('homeroomId').get(0)}</div>}
                  </div>

                  <div className="col-md-1">
                    <Button fab mini color="primary" aria-label="add">
                      <Icon>add</Icon>
                    </Button>
                  </div>
                </div>
                <div className="m-separator m-separator--dashed"></div>
                <div className="text-right">
                  <button className="btn-outline-success m-btn--outline-2x m-btn btn">Submit</button>
                </div>
              </form>
            </TabContainer>}
          </div>
        </div>
      </div>
    );
  }
}

Details = connect(
  (state) => ({
    getSchoolHomeroomsRequest: selectGetSchoolHomeroomsRequest(state),
    getUpdateRequest: selectUpdateRequest(state),
  }),
  (dispatch) => ({
    getSchoolHomerooms: () => { dispatch(getSchoolHomerooms()) },
    update: (form, params = {}) => { dispatch(update(form, params)) },
  })
)(Details);

export default Details;
