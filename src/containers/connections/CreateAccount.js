import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {translate, Interpolate} from 'react-i18next';
import { push } from 'react-router-redux';
import {NavLink} from 'react-router-dom';
import {Divider} from '@material-ui/core';
import { selectChangeStatusRequest, selectGetRecordRequest } from "../../redux/connections/selectors";
import { acceptAndCreate, getRecord, resetChangeStatusRequest } from "../../redux/connections/actions"; 
import { load } from '../../redux/app/actions';
import Loader from '../../components/layouts/Loader';
import background from '../../media/images/bg-3.jpg';

class CreateAccount extends Component {

    componentDidMount () {
        const { getRecord, match, auth, goTo} = this.props;
        const id = match.params.id;
        const hash = match.params.hash;

        if (auth.get('isLoggedIn')) {
            return goTo('/dashboard');
        }
            
        getRecord(id, hash);
    }    
  
    componentWillReceiveProps(nextProps) {        
        const {acceptRequest, resetAcceptRequest, getRecordRequest, appLoad, goTo, auth} = this.props;         
                
        if (!acceptRequest.get('success') && nextProps.acceptRequest.get('success')) {
            
            resetAcceptRequest();
            
            if (auth.get('isLoggedIn')) {
                return goTo('/dashboard');
            } else {
                appLoad();
                return goTo('/login');
            }
        }
        
        if (!getRecordRequest.get('fail') && nextProps.getRecordRequest.get('fail')) {
            return goTo('/login');
        }
        
        if (!getRecordRequest.get('success') && nextProps.getRecordRequest.get('success')) {
            const data = nextProps.getRecordRequest.get('record');

            this.setState({      
                  form: {
                      firstName: data.get('firstName'),
                      lastName:  data.get('lastName'),
                      email:     data.get('email')
                  }
            });                        
        }
    }
   
    constructor(props) {
        super(props);    
        this.state = {      
              form: {}
        };    
    }  

    _handleInputChange(event) {
        const { name, value } = event.target;

        this.setState({      
            form: {
                ...this.state.form,
                [name]: value
            }
        });
    }
    
    _createAccount() {
        const { accept, match} = this.props;
        accept(match.params.id, match.params.hash, this.state.form);
    }
  
    render() {
        
        const {acceptRequest, getRecordRequest, t} = this.props;                 
        const loading = getRecordRequest.get('loading') || acceptRequest.get('loading');        
        const loginBtn  =  <NavLink to='/login'><strong>Login</strong></NavLink>;        
        const errors    = acceptRequest.get('errors');
        const { form }  = this.state;        
    
        return <div>
            {loading && <Loader/>}
            <div className='m-grid__item animate fadeInLeftBig m-grid__item--fluid m-grid m-grid--hor m--full-height' id='m_login' style={{backgroundImage: `url(${background})`,minHeight:'100vh'}}>
              <div className='m-grid__item m-grid__item--fluid'>
                <div className='signup-page'>
                  <div className='m-login__logo text-center m--margin-top-15'>
                    <a href='/'>
                      <img alt="GravityBrain" style={{width: '270px', height: 'auto'}} src='//d2cnhr6egzpvdl.cloudfront.net/image/gravitybrain-logo.svg' />
                    </a>
                  </div>
                  <div className='m-signup col-lg-8 col-md-10 col-sm-12 m-auto'>
                    <div className='m-signup__head'>
                        {getRecordRequest.get('success') && <h3 className='m-login__title text-center m--margin-top-30'>{t('acceptInviteAndCreateAccount', {user: getRecordRequest.get('record').get('fromUser')})}</h3>}
                    </div>
                    <div className='m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--info m-portlet--bordered-semi m--margin-top-40 m-portlet--full-height'>
                      <div className='m-portlet__body'>
                            <div className='row'>
                              <div className='col-lg-7 col-md-6 col-sm-12 m-auto m--margin-top-40'>          
                                  <legend className='m--margin-bottom-10'>{t('required')}</legend>
                                  <div className='m-form__section m-form__section--first'>
                                    <div className="form-group m-form__group row">
                                      <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('email')} </label>
                                      <div className="col-lg-8 col-md-12 col-sm-12">
                                        <input
                                          value={form.email || ''}
                                          name='email'
                                          readOnly={true}
                                          type='email'
                                          className='form-control m-input m-input--air '
                                          placeholder=''/>
                                        <div className='form-control-feedback'>
                                          {errors && errors.get('email') &&
                                          <div className="form-control-feedback text-center error">{errors.get('email').get(0)}</div>}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group m-form__group row">
                                      <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('password')} </label>
                                      <div className="col-lg-8 col-md-12 col-sm-12">
                                        <input
                                          value={form.password || ''}
                                          name='password'
                                          onChange={(e) => { this._handleInputChange(e) }}
                                          type='password'
                                          className='form-control m-input m-input--air '
                                          placeholder=''/>
                                        <div className='form-control-feedback'>
                                          {errors && errors.get('password') &&
                                          <div className="form-control-feedback text-center error">{errors.get('password').get(0)}</div>}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <legend className='m--margin-bottom-10 m--margin-top-10'>{t('optional')}</legend>

                                  <div className='m-form__section m-form__section--first'>
                                    <div className="form-group m-form__group row">
                                      <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('firstName')}</label>
                                      <div className="col-lg-8 col-md-12 col-sm-12">
                                        <input
                                          value={form.firstName || ''}
                                          name='firstName'
                                          onChange={(e) => { this._handleInputChange(e) }}
                                          type='text'
                                          className='form-control m-input m-input--air '
                                          placeholder=''/>
                                        <div className='form-control-feedback'>
                                          {errors && errors.get('firstName') &&
                                          <div className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="form-group m-form__group row">
                                      <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('lastName')} </label>
                                      <div className="col-lg-8 col-md-12 col-sm-12">
                                        <input
                                          value={form.lastName || ''}
                                          name='lastName'
                                          onChange={(e) => { this._handleInputChange(e) }}
                                          type='text'
                                          className='form-control m-input m-input--air '
                                          placeholder=''/>
                                        <div className='form-control-feedback'>
                                          {errors && errors.get('lastName') &&
                                          <div className="form-control-feedback text-center error">{errors.get('lastName').get(0)}</div>}
                                        </div>
                                      </div>
                                    </div>
                                  </div>         
                              </div>                    
                            </div>                       
                        <Divider className='m--margin-top-25'/>
                        <div className='row'>
                          <div className='col-sm-12 text-right m--padding-top-20 text-center'>
                            <button onClick={() => { this._createAccount() }} disabled={loading} className='m-btn m-btn--air m--margin-5 btn btn-info text-uppercase'>
                                {t('createAccount')}
                            </button>                                      
                          </div>
                        </div>
                        <div className='alert m-alert m-alert--default m--margin-top-25'>
                          <p className='text-center margin-0'>
                            <Interpolate i18nKey="alreadyHaveAccountMessage" loginLink={loginBtn} />
                          </p>                              
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>;
    }
}

CreateAccount = connect(
    (state) => ({
        acceptRequest: selectChangeStatusRequest(state),
        getRecordRequest: selectGetRecordRequest(state),
        auth: state.auth
    }),
    (dispatch) => ({        
        goTo: (url) => { dispatch(push(url)) },        
        getRecord: (id, hash) => {dispatch(getRecord(id, hash))},
        accept: (id, hash, data = {}) => {dispatch(acceptAndCreate(id, hash, data))},
        resetAcceptRequest: () => {dispatch(resetChangeStatusRequest())},
        appLoad: () => { dispatch(load()) }
    })
)(CreateAccount);

export default translate('translations')(withRouter(CreateAccount));   