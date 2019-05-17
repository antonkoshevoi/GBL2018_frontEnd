import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getResetPasswordUser, updatePassword, resetUpdatePasswordRequest } from '../../redux/auth/actions';
import { selectResetPasswordUserRequest, selectUpdatePasswordRequest} from '../../redux/auth/selectors';
import { Button, CircularProgress, Avatar } from '@material-ui/core';
import { push } from 'react-router-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Logo from '../ui/Logo';
import NotFoundPage from '../errors/404';
import Loader from '../../components/layouts/Loader';

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: ''
        };
    }

    componentDidMount () {
        const { getUser, match, auth, goTo} = this.props;
        const id = match.params.id;
        const hash = match.params.hash;

        if (auth.get('isLoggedIn')) {
            return goTo('/dashboard');
        }
        
        this.setState({
            id: id,        
            hash: hash
        });
            
        getUser(id, hash);
    }
    
    componentWillReceiveProps(nextProps) {        
        const {updatePasswordRequest, resetUpdatePasswordRequest, goTo} = this.props;         
                       
        if (!updatePasswordRequest.get('success') && nextProps.updatePasswordRequest.get('success')) {
            
            resetUpdatePasswordRequest();
            
            goTo('/login');            
        }        
    }    

    _handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    _savePassword() {        
        const {id, hash, password} = this.state;

        this.props.updatePassword({
            id: id, 
            hash: hash,
            password: password            
        });
    }

    render() {
        const {userRequest, updatePasswordRequest, t} = this.props;
        const loading = updatePasswordRequest.get('loading');        
        const errors = updatePasswordRequest.get('errors');
        
        if (userRequest.get('fail')) {
            return <NotFoundPage/>;
        }
        
        if (userRequest.get('loading')) {
            return <Loader/>;
        }        
        
        return (
            <div className="m-page m--full-height">
                {loading && <Loader/>}
                <div className="main-background m-body justify-content-center m-login">
                    <div className="m-login__wrapper">            
                        <div className="m-login__container">
                            <Logo />                
                            <div>
                                <div className="m-login__head"> 
                                    <h3 className="m-login__title">{t('setNewPassword')}</h3> 
                                </div> 
                                <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--bordered-semi m--margin-top-20 m-portlet--full-height ">
                                    <div className="m-portlet__body">
                                        {userRequest.get('success') &&
                                        <div className="m-form m--margin-top-30 m--margin-bottom-15 m--margin-left-10 m--margin-right-10">
                                            <div className="form-group m-form__group">
                                              <div className="d-flex align-items-center">
                                                <Avatar src={userRequest.get('record').get('avatarSmall')}/>
                                                <span className="m--margin-left-10">{userRequest.get('record').get('username')}</span>
                                              </div>                                                
                                            </div>
                                            <div className="form-group m-form__group m--margin-top-10 m--margin-bottom-10">
                                                <input className="form-control m-input--pill" type="password"
                                                       placeholder={t('password')} name="password" value={this.state.password}
                                                       onChange={this._handlePasswordChange}/>
                                                {(errors && errors.get('password')) && <div className="form-control-feedback text-center error">{errors.get('password').get(0)}</div>}
                                            </div>
                                            <div className="text-center">
                                                <Button variant="contained" color="primary" onClick={() => { this._savePassword() }} className="btn m-btn m-btn--pill m-btn--custom">
                                                    <span>{t('save')}</span>
                                                    {loading && <CircularProgress color="primary"/>}
                                                </Button>
                                            </div>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                            <div className="m-login__account">
                                <span className="m-login__account-msg">{t('logInDifferentUser')}</span>
                                <NavLink to="/login" id="m_login_signup" className="m--margin-left-5 m-link m-link--light m-login__account-link">{t('logIn')}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ResetPassword = connect(
    state => ({
        userRequest: selectResetPasswordUserRequest(state),
        updatePasswordRequest: selectUpdatePasswordRequest(state),
        auth: state.auth
    }),
    (dispatch) => ({
        updatePassword: (data) => {dispatch(updatePassword(data))},
        resetUpdatePasswordRequest: () => {dispatch(resetUpdatePasswordRequest())},
        getUser: (id, hash) => {dispatch(getResetPasswordUser(id, hash))},        
        goTo: (page) => {dispatch(push(page))}
    })
)(ResetPassword);

export default withRouter(withTranslation("translations")(ResetPassword));