import React, {Component} from 'react';
import background from '../../media/images/bg-3.jpg';
import logo from '../../media/images/logo.png';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { login, setRedirectUrl } from '../../redux/auth/actions';
import { selectLoginRequest } from '../../redux/auth/selectors';
import { FormControlLabel } from 'material-ui/Form';
import {Button, CircularProgress, Checkbox, Avatar} from 'material-ui';
import { withRouter, NavLink } from 'react-router-dom';
import SessionStorage from "../../services/SessionStorage";

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
      console.log(auth);
      if (auth.get('restoreLoginUser') == undefined || auth.get('restoreLoginUser').size === 0) {
          history.push('/login')
      }
  }

  _handleUsernameChange = (event) => { this.setState({username: event.target.value}); };
  _handlePasswordChange = (event) => { this.setState({password: event.target.value}); };
  _handleRememberChange = (event) => { this.setState({remember: !this.state.remember}); };

  _login() {
    const { setRedirectUrl, login, auth } = this.props;
    const { username, password, remember } = this.state;

      console.log(this.state);
      let pathname = '/';
    try {
      pathname = this.props.location.state.from.pathname;
    } catch (e) {}

    setRedirectUrl(pathname);
    login(auth.get('restoreLoginUser').get('username'), password, remember);
  }

  render() {
    const { loginRequest } = this.props;
    const loading = loginRequest.get('loading');
    const errors = loginRequest.get('errors');
    const user = this.props.auth.get('restoreLoginUser');

      return (
            <div style={{position:'fixed'}} className="loginWrapper">
        <div className="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2 m--full-height" id="m_login" style={{backgroundImage: `url(${background})`}}>
          <div className="m-grid__item m-grid__item--fluid	m-login__wrapper">
            <div className="m-login__container">
              <div className="m-login__logo">
                <a href="#">
                  <img src={logo}/>
                </a>
              </div>
                {  user && user !== undefined &&
                <div className="m-login__signin">
                  <div className="m-login__head">
                    <h3 className="m-login__title">Sign In </h3>
                  </div>
                  <div className="m-login__form m-form" action="">
                    <div className="form-group m-form__group">
                      <div className="m-list-search form-control m-input m--padding-10 d-flex align-items-center">
                        <Avatar src={user.get('avatar')}/>
                        <span
                            className="m-list-search__result-item-text m--margin-left-10">{user.get('username')}</span>
                      </div>
                        {(errors.errors !== undefined && errors.errors.username) && <div id="username-error"
                                                                                         className="form-control-feedback  text-center error">{errors.errors.username[0]}</div>}
                    </div>
                    <div className="form-group m-form__group">
                      <input className="form-control m-input m-login__form-input--last" type="password"
                             placeholder="Password" name="password" value={this.state.password}
                             onChange={this._handlePasswordChange}/>
                        {(errors.errors !== undefined && errors.errors.password) && <div id="password-error"
                                                                                         className="form-control-feedback  text-center error">{errors.errors.password[0]}</div>}
                    </div>
                    <div className="row m-login__form-sub">
                      <div className="col m--align-left m-login__form-left">
                        <FormControlLabel
                            control={<Checkbox
                                checked={this.state.remember}
                                onChange={this._handleRememberChange}
                                value={''}
                            />}
                            label="Remember me"
                        />
                      </div>
                      <div className="col m--align-right m-login__form-right m--hide">
                        <a href="javascript:;" id="m_login_forget_password" className="m-link">Forget Password ?</a>
                      </div>
                    </div>
                    <div className="m-login__form-action">
                      <Button id="m_login_signin_submit" raised color="primary" onClick={() => {
                          this._login()
                      }}
                              className="btn  m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn m-login__btn--primary">
                        <span>Sign In</span>
                          {loading &&
                          <CircularProgress color="accent"/>
                          }
                      </Button>
                    </div>
                  </div>
                </div>
                }

              <div className="m-login__forget-password">
                <div className="m-login__head">
                  <h3 className="m-login__title">Forgotten Password ?</h3>
                  <div className="m-login__desc">Enter your email to reset your password:</div>
                </div>
                <form className="m-login__form m-form" action="">
                  <div className="form-group m-form__group">
                    <input className="form-control m-input" type="text" placeholder="Email" name="email" id="m_email" autoComplete="off"/>
                  </div>
                  <div className="m-login__form-action">
                    <button id="m_login_forget_password_submit" className="btn m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn m-login__btn--primary">Request</button>
                    <button id="m_login_forget_password_cancel" className="btn m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn">Cancel</button>
                  </div>
                </form>
              </div>
              <div className="m-login__account">
                <span className="m-login__account-msg">
                Log In different user
                </span>
                <NavLink to="/login" id="m_login_signup" className="m--margin-left-5 m-link m-link--light m-login__account-link">Log in</NavLink>
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

export default withRouter(translate("LanguageSwitcher")(RestoreLogin));
