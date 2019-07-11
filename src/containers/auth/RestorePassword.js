import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { resetPassword } from '../../redux/auth/actions';
import { selectResetPasswordRequest } from '../../redux/auth/selectors';
import { Button, CircularProgress } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { push } from 'react-router-redux';
import Logo from '../ui/Logo';

class RestorePassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };
    }

    componentDidMount() {
        const {goTo, auth} = this.props;

        if (auth.get('isLoggedIn')) {
            goTo('/dashboard');
        }
    }

    _handleUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    _resetPassword() {        
        const {username} = this.state;

        this.props.resetPassword(username);
    }

    render() {
        const {resetPasswordRequest, t} = this.props;
        const loading = resetPasswordRequest.get('loading');
        const errors = resetPasswordRequest.get('errors');       

        return (
            <div className="m-page m--full-height">
                <div className="main-background m-body justify-content-center m-login">
                    <div className="m-login__wrapper">            
                        <div className="m-login__container">
                            <Logo />                
                            <div>
                                <div className="m-login__head"> 
                                    <h3 className="m-login__title">{t('forgotPassword')}</h3> 
                                </div> 
                                <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg mt-4 m-portlet--full-height ">
                                    <div className="m-portlet__body">
                                        <div className="m-form mt-4 mb-3 mx-3">            
                                            {resetPasswordRequest.get('success') && <div className="alert alert-success">{t('passwordResetMessage')}</div>}
                                            <div className="form-group mt-3 mb-3">
                                                <input className="form-control m-input--pill" type="text"
                                                       placeholder={t('usernameOrEmail')} name="username" value={this.state.username}
                                                       onChange={this._handleUsernameChange}/>
                                                {(errors && errors.get('username')) && <div className="form-control-feedback text-center error">{errors.get('username').get(0)}</div>}
                                            </div>   
                                            <div className="text-center">
                                                <Button variant="contained" color="primary" onClick={() => { this._resetPassword() }} className="btn m-btn--pill m-btn--custom">
                                                    <span>{t('request')}</span>
                                                    {loading && <CircularProgress color="primary"/>}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="m-login__account">
                                <span className="m-login__account-msg">{t('logInDifferentUser')}</span>
                                <NavLink to="/login" id="m_login_signup" className="ml-2 m-login__account-link">{t('logIn')}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RestorePassword = connect(
    state => ({
        resetPasswordRequest: selectResetPasswordRequest(state),
        auth: state.auth
    }),
    (dispatch) => ({
        resetPassword: (username) => {dispatch(resetPassword(username))},        
        goTo: (page) => {dispatch(push(page))}
    })
)(RestorePassword);

export default withTranslation("translations")(RestorePassword);
