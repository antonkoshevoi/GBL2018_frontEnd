import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Select, MenuItem, CircularProgress } from '@material-ui/core';
import { update } from "../../../redux/user/actions";
import { selectUpdateRequest } from "../../../redux/user/selectors";
import { Date } from "../../../components/ui/DateTime";
import MuiDatePicker from "../../../components/ui/MuiDatePicker";
import HasRole from "../../middlewares/HasRole";

class Details extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {},      
      mode: 'overview'
    }
  }

  componentDidMount () {
    this.setState({
      ...this.state,
      user: this.props.user
    });
  }

  componentDidUpdate(prevProps) {
    this._updateUserSuccess(prevProps);    
  }

  _updateUserSuccess(prevProps) {
    const success = this.props.updateRequest.get('success');

    if (success && !prevProps.updateRequest.get('success')) {
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

  _onSubmit (e) {
    e.preventDefault();
    this.props.update(
      this.state.user
    );
  }

  render() {
    const { mode, user } = this.state;
    const { updateRequest, t } = this.props;
    const errors = updateRequest.get('errors');    

    return (      
        <div className="m-portlet m-portlet--head-solid-bg m-portlet--brand mb-3">
          <div className="m-portlet__head">
            <div className="m-portlet__head-caption">              
              <div className="m-portlet__head-title">
                <span className="m-portlet__head-icon">                  
                    {updateRequest.get('loading') ? <CircularProgress color="inherit"/> : <i className="fa fa-id-card-o display-5"></i>}
                </span>
                <h3 className="m-portlet__head-text">{t('info')}</h3>
              </div>
            </div>
            <div className="m-portlet__head-tools">
              <ul className="m-portlet__nav">
                <li className="m-portlet__nav-item">
                  {mode === 'overview' &&                  
                    <button title={t('edit')} onClick={() => { this._handleSwitchMode('edit') }} className="pointer m-portlet__nav-link m-portlet__nav-link--icon">
                      <i className="la la-edit display-5"></i>
                    </button>
                  }
                </li>
              </ul>
            </div>
          </div>
          <div className="m-portlet__body">
            {mode === 'overview' && <div>
              <div className="m-widget1">
                <div className="m-widget1__item">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('firstName')}</h3>
                    </div>
                    <div className="col text-right">
                      <span className="m-widget1__title text-info">{user.firstName || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('lastName')}</h3>
                    </div>
                    <div className="col text-right">
                      <span className="m-widget1__title text-info">{user.lastName || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('email')}</h3>
                    </div>
                    <div className="col text-right">
                      <span className="m-widget1__title text-info">{user.email || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                    <div className="row">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('phoneNumber')}</h3>
                    </div>
                    <div className="col text-right">
                      <span className="m-widget1__title text-info">{user.phoneNumber || '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="m-widget1__item">
                    <div className="row">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('gender')}</h3>
                    </div>
                    <div className="col text-right">
                      <span className="m-widget1__title text-info">{user.gender ? t(user.gender) : '-'}</span>
                    </div>
                  </div>
                </div>                 
                <div className="m-widget1__item">
                    <div className="row">
                    <div className="col">
                      <h3 className="m-widget1__title">{t('birthday')}</h3>
                    </div>
                    <div className="col text-right">
                      <span className="m-widget1__title text-info">{user.birthday ? <Date time={user.birthday} /> : '-'}</span>
                    </div>  
                  </div>
                </div>
              </div>
            </div>}
            {mode === 'edit' && <div>
              <form id='update-user-form' className="m-4" onSubmit={(e) => { this._onSubmit(e) }}>
                <div className="alert alert-secondary mt-0">
                  <p className='m-0'>{t('updateUserProfileNote')}</p>
                </div>
                <div className="m-form">
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3" htmlFor="firsName">{t('firstName')}</label>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        name="firstName"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={user.firstName || ''}
                        className="form-control m-input"
                        id="firsName"/>
                      {errors && errors.get('firstName') && <div className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3" htmlFor="lastName">{t('lastName')}</label>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        name="lastName"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={user.lastName || ''}
                        className="form-control m-input"
                        id="lastName"/>
                      {errors && errors.get('lastName') && <div className="form-control-feedback text-center error">{errors.get('lastName').get(0)}</div>}
                    </div>
                  </div>
                  <HasRole roles={['Superadministrator','School','Teacher','Parents']}>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3" htmlFor="email">{t('email')}</label>
                    <div className="col-lg-9">
                      <input
                        type="email"
                        name="email"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={user.email || ''}
                        className="form-control m-input"
                        id="email"/>
                      {errors && errors.get('email') && <div className="form-control-feedback text-center error">{errors.get('email').get(0)}</div>}
                    </div>
                  </div>
                  </HasRole>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3" htmlFor="phone">{t('phoneNumber')}</label>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        name="phoneNumber"
                        onChange={(e) => { this._handleInputChange(e) }}
                        value={user.phoneNumber || ''}
                        className="form-control m-input"
                        id="phone"/>
                      {errors && errors.get('phoneNumber') && <div className="form-control-feedback text-center error">{errors.get('phoneNumber').get(0)}</div>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3" htmlFor="gender">{t('gender')}</label>
                    <div className="col-lg-9">
                      <Select
                        id="gender"
                        name="gender"
                        className="form-control m-input   main-select"
                        style={{minWidth:'120px'}}
                        value={user.gender || 'female'}
                        onChange={(e) => { this._handleInputChange(e) }}>
                        <MenuItem value="male">{t('male')}</MenuItem>
                        <MenuItem value="female">{t('female')}</MenuItem>
                      </Select>
                      {errors && errors.get('gender') && <div className="form-control-feedback text-center error">{errors.get('gender').get(0)}</div>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3" htmlFor="phone">{t('birthday')}</label>
                    <div className="col-lg-9">                            
                      <MuiDatePicker
                        InputProps={{
                            className: "form-control m-input px-2 py-1",
                            disableUnderline: true                    
                        }}
                        style={{width: '100%'}}                        
                        value={user.birthday || null}
                        onChange={(date) => { this._handleDateChange(date, 'birthday') }}/>                                
                      {errors && errors.get('birthday') && <div className="form-control-feedback text-center error">{errors.get('birthday').get(0)}</div>}
                    </div>
                  </div>
                </div>
                <div className="m-separator"></div>
                <div className="text-right">
                  <button className="btn-success btn mr-3" disabled={updateRequest.get('loading')}>{t('saveChanges')}</button>
                  <button className="btn-default btn" onClick={() => { this._handleSwitchMode('overview') }}>{t('cancel')}</button>
                </div>
              </form>
            </div>}
          </div>
        </div>
    );
  }
}

export default withTranslation('translations')(connect(
  (state) => ({    
    updateRequest: selectUpdateRequest(state)
  }),
  (dispatch) => ({    
    update: (form, params = {}) => { dispatch(update(form, params)) }
  })
)(Details));
