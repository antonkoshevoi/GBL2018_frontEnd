import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import '../../../../styles/store.css'
import { withRouter } from 'react-router-dom';
import {Button, Checkbox, CircularProgress, FormControlLabel} from "material-ui";
import {selectLoginRequest} from "../../../../redux/auth/selectors";
import {login, setRedirectUrl} from "../../../../redux/auth/actions";
import ServiceList from "../../../../components/pages/store/payment/ServiceList";

class PaymentPendingContainer extends Component {

  constructor (props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      remember: false
    };
  }


  componentDidMount () {
    const {history} = this.props;

    if (history.action !== "PUSH") {
      history.push('/login')
    }
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

    const { auth, loginRequest } = this.props;
    const isLoggedIn = auth.get('isLoggedIn');
    const loading = loginRequest.get('loading');
    const errors = loginRequest.get('errors');

    return (
      <div className="row">
        <div className="col-md-10 m-auto">
          <div className="m-portlet m--margin-top-35">
            <div className="m-portlet__body">
              <div className="alert m-alert m-alert--default">
                <h3 className="display-4 text-center">
                  <i className="la la-check-circle align-middle m--margin-right-20" style={{
                    color: '#ffd844',
                    fontSize: '100px'
                  }}/>
                  Your payment is now pending
                </h3>
                <p style={{textAlign: 'center'}}>
                  You will be notified once your payment is declined ar accepted
                </p>
              </div>

              {!isLoggedIn &&
                <div className="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2 m--full-height" id="m_login">
                  <div className="m-grid__item m-grid__item--fluid	m-login__wrapper">
                    <div className="m-login__container">
                    <div className="paymentLoginBlock">
                      <p className="text-center">Please log in to see yuor transaction</p>

                      <div className="m-login__signin">
                        <div className="m-login__head">
                          <h3 className="m-login__title">Sign In </h3>
                        </div>
                        <div className="m-login__form m-form">
                          <div className="form-group m-form__group">
                            <input className="form-control m-input" type="text" placeholder="Username" name="username" autoComplete="off" value={this.state.username} onChange={this._handleUsernameChange}/>
                            {(errors.errors !== undefined && errors.errors.username) && <div id="username-error" className="form-control-feedback  text-center error">{errors.errors.username[0]}</div>}
                          </div>
                          <div className="form-group m-form__group">
                            <input className="form-control m-input m-login__form-input--last" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this._handlePasswordChange}/>
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
                                label="Remember me"
                              />
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
                    </div>
                    </div>
                  </div>
                </div>
              }

              {isLoggedIn &&
                <ServiceList/>
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

PaymentPendingContainer = connect(
  (state) => ({
    loginRequest: selectLoginRequest(state),
    auth: state.auth
  }),
  (dispatch) => ({
    login: (username, password, remember) => { dispatch(login(username, password, remember)); },
    setRedirectUrl: (uri) => { dispatch(setRedirectUrl(uri)); },
  })
)(PaymentPendingContainer);

export default withRouter(translate('PaymentPendingContainer')(PaymentPendingContainer));