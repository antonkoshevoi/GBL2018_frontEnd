import React, {Component} from 'react';
import PropTypes from 'prop-types';
import background from '../../media/images/bg-3.jpg';
import logo from '../../media/images/logo.png';
import * as AUTH from '../../services/AuthService';
import { withRouter } from "react-router";
import { translate } from "react-i18next";
import { connect } from 'react-redux';
import { login } from '../../redux/auth/actions';
import {selectAuthDomain, selectLoginRequest} from "../../redux/auth/selectors";
import { createStructuredSelector } from "reselect";
import Loader from "../../components/layouts/Loader";
import {Button, CircularProgress} from "material-ui";

class Login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsernameChange = (event) => { this.setState({username: event.target.value}); };
  handlePasswordChange = (event) => { this.setState({password: event.target.value}); };

  _login() {
    this.props.login(
      this.state.username,
      this.state.password
    );
    // AUTH.login();
    // console.log(this.props);
    // this.props.history.push('/dashboard')
    // console.log(AUTH.isLodegIn());
  }

  render() {
    const { loginRequest } = this.props;
    const loading = loginRequest.get('loading');
    const errors = loginRequest.get('errors');
      return (
      <div style={{position:'fixed',}} className="loginWrapper">
        <div className="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2 m--full-height" id="m_login" style={{backgroundImage: `url(${background})`}}>
          <div className="m-grid__item m-grid__item--fluid	m-login__wrapper">
            <div className="m-login__container">
              <div className="m-login__logo">
                <a href="#">
                  <img src={logo}/>
                </a>
              </div>
              <div className="m-login__signin">
                <div className="m-login__head">
                  <h3 className="m-login__title">Sign In </h3>
                </div>
                <div className="m-login__form m-form" action="">
                  <div className="form-group m-form__group">
                    <input className="form-control m-input" type="text" placeholder="Username" name="username" autoComplete="off" value={this.state.username} onChange={this.handleUsernameChange}/>
                      {(errors.errors !== undefined && errors.errors.username) && <div id="username-error" className="form-control-feedback  text-center error">{errors.errors.username[0]}</div>}

                  </div>
                  <div className="form-group m-form__group">
                    <input className="form-control m-input m-login__form-input--last" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                      {(errors.errors !== undefined && errors.errors.password) && <div id="password-error" className="form-control-feedback  text-center error">{errors.errors.password[0]}</div>}

                  </div>
                  <div className="row m-login__form-sub">
                    <div className="col m--align-left m-login__form-left">
                      <label className="m-checkbox  m-checkbox--light">
                        <input type="checkbox" name="remember"/> Remember me
                          <span></span>
                      </label>
                    </div>
                    <div className="col m--align-right m-login__form-right m--hide">
                      <a href="javascript:;" id="m_login_forget_password" className="m-link">Forget Password ?</a>
                    </div>
                  </div>
                  <div className="m-login__form-action">
                    <Button id="m_login_signin_submit"  raised color="primary" onClick={() => { this._login() }}
                        className="btn  m-btn m-btn--pill m-btn--custom m-btn--air  m-login__btn m-login__btn--primary">
                      <span>Sign In</span>
                        {loading &&
                        <CircularProgress color="accent"/>
                        }
                    </Button>
                  </div>
                </div>
              </div>

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
                Don't have an account yet ?
                </span>
                <a href="javascript:;" id="m_login_signup" className="m-link m-link--light m-login__account-link">Sign Up</a>
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
    login: (username, password) => { dispatch(login(username, password)); },
  })
)(Login);

export default withRouter(translate("LanguageSwitcher")(Login));
