import React, {Component} from 'react';
import background from '../../media/images/bg-3.jpg';
import logo from '../../media/images/logo.png';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { login, setRedirectUrl } from '../../redux/auth/actions';
import { selectLoginRequest } from '../../redux/auth/selectors';
import { FormControlLabel, Button, CircularProgress, Checkbox } from '@material-ui/core';
import { withRouter, NavLink } from 'react-router-dom';

class Login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false
    };
  }

  componentDidMount() {
      const { auth, history } = this.props;

      if (auth.get('isLoggedIn')) {
          history.push('/dashboard')
      }
  }

  _handleUsernameChange = (event) => { this.setState({username: event.target.value}); };
  _handlePasswordChange = (event) => { this.setState({password: event.target.value}); };
  _handleRememberChange = (event) => { this.setState({remember: !this.state.remember}); };

  _login(e) {
    e.preventDefault();

    const { setRedirectUrl, login } = this.props;
    const { username, password, remember } = this.state;

    let pathname = '/dashboard';
    try {
      pathname = this.props.location.state.from.pathname;
    } catch (e) {}

    setRedirectUrl(pathname);
    login(username, password, remember);
  }

  render() {
    const { loginRequest, t } = this.props;
    const loading = loginRequest.get('loading');
    const errors = loginRequest.get('errors');

    return (
      <div style={{position:'fixed'}} className="loginWrapper">
        <div className="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2 m--full-height" id="m_login" style={{backgroundImage: `url(${background})`}}>
          <div className="m-grid__item m-grid__item--fluid m-login__wrapper">
            <div className="m-login__container">
              <div className="m-login__logo">
                <a href="#">
                  <img src={logo}/>
                </a>
              </div>
              <div className="m-login__signin">
                <div className="m-login__head">
                  <h3 className="m-login__title">{t('signIn')} </h3>
                </div>
                <form className="m-login__form m-form" onSubmit={(e) => { this._login(e) }}>
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
                      <a href="javascript:;" id="m_login_forget_password" className="m-link">{t('forgetPassword')}?</a>
                    </div>
                  </div>
                  <div className="m-login__form-action">
                    <Button id="m_login_signin_submit" variant="raised" color="primary" type='submit' disabled={loading}
                        className="btn  m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn m-login__btn--primary">
                      <span>{t('signIn')}</span>
                        {loading && <CircularProgress color="primary"/>}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="m-login__forget-password">
                <div className="m-login__head">
                  <h3 className="m-login__title">{t('forgenterEmailToResetPasswordottenPassword')}?</h3>
                  <div className="m-login__desc">{t('enterEmailToResetPassword')}:</div>
                </div>
                <form className="m-login__form m-form" action="">
                  <div className="form-group m-form__group">
                    <input className="form-control m-input" type="text" placeholder={t('email')} name="email" id="m_email" autoComplete="off"/>
                  </div>
                  <div className="m-login__form-action">
                    <button id="m_login_forget_password_submit" className="btn m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn m-login__btn--primary">{t('request')}</button>
                    <button id="m_login_forget_password_cancel" className="btn m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn">{t('cancel')}</button>
                  </div>
                </form>
              </div>
              <div className="m-login__account">
                <span className="m-login__account-msg">
                {t('doNotHaveAccountYet')}
                </span>
                <NavLink to="signUp" id="m_login_signup" className="m--margin-left-5 m-link m-link--light m-login__account-link">{t('signUp')}</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {};

Login = connect(
  state => ({
    loginRequest: selectLoginRequest(state),
    auth: state.auth
  }),
  (dispatch) => ({
    login: (username, password, remember) => { dispatch(login(username, password, remember)); },
    setRedirectUrl: (uri) => { dispatch(setRedirectUrl(uri)); },
  })
)(Login);

export default withRouter(translate("translations")(Login));
