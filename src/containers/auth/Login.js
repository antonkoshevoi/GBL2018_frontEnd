import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Logo from '../ui/Logo';
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
      <div className="m-page m--full-height">
        <div className="main-background m-body justify-content-center m-login">
          <div className="m-login__wrapper">            
              <div className="m-login__container">
                <Logo />
                <div>
                  <div className="m-login__head"> 
                    <h3 className="m-login__title">{t('signIn')}</h3> 
                  </div> 
                  <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg mt-4 m-portlet--full-height ">
                    <div className="m-portlet__body">
                        <form className="m-form mt-4 mb-3 mx-3" onSubmit={(e) => { this._login(e) }}>
                          <div className="form-group">
                            <input className="form-control m-input--pill" type="text" placeholder={t('username')} name="username" autoComplete="off" value={this.state.username} onChange={this._handleUsernameChange}/>
                              {(errors.errors !== undefined && errors.errors.username) && <div id="username-error" className="form-control-feedback  text-center error">{errors.errors.username[0]}</div>}
                          </div>
                          <div className="form-group mt-3">
                            <input className="form-control m-input--pill" type="password" placeholder={t('password')} name="password" value={this.state.password} onChange={this._handlePasswordChange}/>
                              {(errors.errors !== undefined && errors.errors.password) && <div id="password-error" className="form-control-feedback  text-center error">{errors.errors.password[0]}</div>}
                          </div>
                          <div className="row">
                            <div className="col text-left">
                              <FormControlLabel
                                control={<Checkbox
                                  value='1'
                                  checked={this.state.remember}
                                  onChange={this._handleRememberChange}
                                />}
                                label={t('rememberMe')}
                              />
                            </div>
                          </div>
                          <div className="text-center">
                            <Button id="m_login_signin_submit" variant="contained" color="primary" type='submit' disabled={loading}
                                className="btn  m-btn--pill m-btn--custom m-btn--air  m-login__btn m-login__btn--primary">
                              <span>{t('signIn')}</span>
                                {loading && <CircularProgress color="primary"/>}
                            </Button>
                          </div>
                        </form>
                    </div>
                  </div>
                <div className="m-login__account">
                  <span className="m-login__account-msg">
                  {t('doNotHaveAccountYet')}
                  </span>
                  <NavLink to="signUp" id="m_login_signup" className="ml-2 m-login__account-link">{t('signUp')}</NavLink>
                  <div className='mt-3'>
                    <NavLink to="restore-password" className="m-login__account-link">{t('forgotPassword')}?</NavLink>
                  </div>
                </div>                  
                </div>
              </div>              
            </div>        
        </div>
      </div>);
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

export default withRouter(withTranslation("translations")(Login));
