import React, {Component} from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { login, setRedirectUrl } from '../../redux/auth/actions';
import { selectLoginRequest } from '../../redux/auth/selectors';
import {FormControlLabel, Button, CircularProgress, Checkbox, Avatar} from '@material-ui/core';
import { withRouter, NavLink } from 'react-router-dom';

const logoUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/gravitybrain-logo.svg';

class RestoreLogin extends Component {

  constructor (props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false
    };
  }

  componentWillMount(){
      const {history, auth} = this.props;
     
      if (!auth.get('restoreLoginUser') || auth.get('restoreLoginUser').size === 0) {
          history.push('/login');
      }
  }

  _handleUsernameChange = (event) => { this.setState({username: event.target.value}); };
  _handlePasswordChange = (event) => { this.setState({password: event.target.value}); };
  _handleRememberChange = (event) => { this.setState({remember: !this.state.remember}); };

  _login() {
    const { setRedirectUrl, login, auth } = this.props;
    const { password, remember } = this.state;

    let pathname = '/';

    try {
      pathname = this.props.location.state.from.pathname;
    } catch (e) {}

    setRedirectUrl(pathname);
    login(auth.get('restoreLoginUser').get('username'), password, remember);
  }

  render() {
    const { loginRequest, t } = this.props;
    const loading = loginRequest.get('loading');
    const errors = loginRequest.get('errors');
    const user = this.props.auth.get('restoreLoginUser');

      return (
      <div className="m-grid m-grid--hor m-grid--root m-page m--full-height">
        <div className="main-background m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop justify-content-center m-login">
          <div className="m-login__wrapper">            
              <div className="m-login__container">
                <div className="m-login__logo">
                  <a href={"/"}>
                    <img src={logoUrl} alt="GravityBrain"/>
                  </a>
                </div>
                { user && user !== undefined &&
                <div>
                  <div className="m-login__head"> 
                    <h3 className="m-login__title">{t('signIn')}</h3> 
                  </div> 
                  <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--bordered-semi m--margin-top-20 m-portlet--full-height ">
                    <div className="m-portlet__body">
                        <div className="m-form m--margin-top-30 m--margin-bottom-15 m--margin-left-10 m--margin-right-10">
                        <div className="form-group m-form__group">
                          <div className="d-flex align-items-center">
                            <Avatar src={user.get('avatar') || 'https://bzabc.s3.ap-southeast-1.amazonaws.com/default-avatars/user-sm.png'}/>
                            <span className="m--margin-left-10">{user.get('username') || 'N/A'}</span>
                          </div>
                            {(errors.errors !== undefined && errors.errors.username) && <div id="username-error" className="form-control-feedback  text-center error">{errors.errors.username[0]}</div>}
                        </div>
                        <div className="form-group m-form__group m--margin-top-10">
                          <input className="form-control m-input--pill" type="password"
                                 placeholder="Password" name="password" value={this.state.password}
                                 onChange={this._handlePasswordChange}/>
                            {(errors.errors !== undefined && errors.errors.password) && <div id="password-error"
                                                                                             className="form-control-feedback  text-center error">{errors.errors.password[0]}</div>}
                        </div>
                        <div className="row">
                          <div className="col m--align-left">
                            <FormControlLabel
                                control={<Checkbox
                                    color="primary"
                                    checked={this.state.remember}
                                    onChange={this._handleRememberChange}
                                    value={''}
                                />}
                                label={t('rememberMe')}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <Button id="m_login_signin_submit" variant="contained" color="primary" onClick={() => {
                              this._login()
                          }}
                                  className="btn  m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn m-login__btn--primary">
                            <span>{t('signIn')}</span>
                              {loading &&
                              <CircularProgress color="primary"/>
                              }
                          </Button>
                        </div>
                    </div>
                    </div>
                </div>
              </div> }
              <div className="m-login__account">
                <span className="m-login__account-msg">
                {t('logInDifferentUser')}
                </span>
                <NavLink to="/login" id="m_login_signup" className="m--margin-left-5 m-link m-link--light m-login__account-link">{t('logIn')}</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RestoreLogin.propTypes = {};

RestoreLogin = connect(
  state => ({
    loginRequest: selectLoginRequest(state),
    auth: state.auth
  }),
  (dispatch) => ({
    login: (username, password, remember) => { dispatch(login(username, password, remember)); },
    setRedirectUrl: (uri) => { dispatch(setRedirectUrl(uri)); },
  })
)(RestoreLogin);

export default withRouter(translate("translations")(RestoreLogin));
