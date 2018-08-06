import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../../styles/store.css'
import { withRouter } from 'react-router-dom';
import ServiceList from "../../../../components/pages/store/payment/ServiceList";
import {selectLoginRequest} from "../../../../redux/auth/selectors";
import {login, setRedirectUrl} from "../../../../redux/auth/actions";
import {Button, Checkbox, CircularProgress, FormControlLabel} from '@material-ui/core';

class PaymentStatusContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false
    };
  }

  _handleUsernameChange = (event) => { this.setState({username: event.target.value}); };
  _handlePasswordChange = (event) => { this.setState({password: event.target.value}); };
  _handleRememberChange = (event) => { this.setState({remember: !this.state.remember}); };

  _login() {
    const { setRedirectUrl, login } = this.props;
    const { username, password, remember } = this.state;

    let pathname = '/';
    try {
      pathname = this.props.location.pathname;
    } catch (e) {}

    setRedirectUrl(pathname);
    login(username, password, remember);
  }

  render() {

    const {auth, loginRequest, t} = this.props;
    const isLoggedIn = auth.get('isLoggedIn')
    const loading   = loginRequest.get('loading');
    const status    = this.props.status;
    const errors    = loginRequest.get('errors');
   
    return (
      <div className="row">
        <div className="col-md-10 m-auto">
          <div className="m-portlet m--margin-top-35">
            <div className="m-portlet__body">
              <div className="alert m-alert m-alert--default">
                <h3 className="display-4 text-center">
                  <i className={`la ${(status === 'pending') ? 'la-check-circle' : 'la-times'} align-middle m--margin-right-20`} style={{
                    color: (status === 'pending') ? '#FFD844' : '#D2322D',
                    fontSize: '100px'
                  }}/>
                  {t(status + 'PaymentMessage')}
                </h3>
              </div>
              {!isLoggedIn &&
              <div className="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2 m--full-height" id="m_login">
                <div className="m-grid__item m-grid__item--fluid m-login__wrapper">
                  <div className="m-login__container">
                    <div className="paymentLoginBlock">
                      <p className="text-center">{t('loginToSeeYourTransactions')}</p>
                      <div className="m-login__signin">
                        <div className="m-login__head">
                          <h3 className="m-login__title">{t('signIn')} </h3>
                        </div>
                        <div className="m-login__form m-form" action="">
                          <div className="form-group m-form__group">
                            <input className="form-control m-input" type="text" placeholder={t('username')} name="username" autoComplete="off" value={this.state.username} onChange={this._handleUsernameChange}/>
                            {(errors.errors !== undefined && errors.errors.username) && <div id="username-error" className="form-control-feedback  text-center error">{errors.errors.username[0]}</div>}
                          </div>
                          <div className="form-group m-form__group">
                            <input className="form-control m-input m-login__form-input--last" type="password" placeholder={t('password')} name="password" value={this.state.password} onChange={this._handlePasswordChange}/>
                            {(errors.errors !== undefined && errors.errors.password) && <div id="password-error" className="form-control-feedback  text-center error">{errors.errors.password[0]}</div>}
                          </div>
                          <div className="row m-login__form-sub">
                            <div className="col m--align-left m-login__form-left">
                              <FormControlLabel
                                control={<Checkbox
                                  checked={this.state.remember}
                                  onChange={this._handleRememberChange}
                                  value={''}
                                />}
                                label={t('rememberMe')}
                              />
                            </div>
                            <div className="col m--align-right m-login__form-right m--hide">
                              <a href="javascript:;" id="m_login_forget_password" className="m-link">{t('forgetPassword')} ?</a>
                            </div>
                          </div>
                          <div className="m-login__form-action">
                            <Button id="m_login_signin_submit"  variant="raised" color="primary" onClick={() => { this._login() }}
                                className="btn  m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn m-login__btn--primary">
                              <span>{t('signIn')}</span>
                              {loading && <CircularProgress color="primary"/> }
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              }
              {isLoggedIn && <ServiceList/> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PaymentStatusContainer = connect(
  (state) => ({
    loginRequest: selectLoginRequest(state),
    auth: state.auth
  }),
  (dispatch) => ({
    login: (username, password, remember) => { dispatch(login(username, password, remember)); },
    setRedirectUrl: (uri) => { dispatch(setRedirectUrl(uri)); }
  })
)(PaymentStatusContainer);

export default withRouter(translate('translations')(PaymentStatusContainer));