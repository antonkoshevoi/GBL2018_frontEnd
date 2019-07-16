import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withTranslation, Trans } from 'react-i18next';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { selectChangeStatusRequest, selectGetRecordRequest } from "../../redux/connections/selectors";
import { acceptAndCreate, getRecord, resetChangeStatusRequest } from "../../redux/connections/actions"; 
import { load } from '../../redux/app/actions';
import {Loader} from '../../components/ui/Loader';

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
        const errors    = acceptRequest.get('errors');
        const { form }  = this.state;        
    
        return <div>
            {loading && <Loader/>}
            <div className='signup-page'>
              <div className='m-signup col-lg-8 col-md-10 col-sm-12 m-auto'>
                <div className='m-signup__head'>
                    {getRecordRequest.get('success') && <h3 className='m-login__title text-center mt-4'>{t('acceptInviteAndCreateAccount', {user: getRecordRequest.get('record').get('fromUser')})}</h3>}
                </div>
                <div className='m-portlet m-portlet--brand m-portlet--head-solid-bg mt-5 m-portlet--full-height'>
                  <div className='m-portlet__body'>
                    <div className='row'>
                      <div className='col-lg-7 col-md-6 col-sm-12 m-auto mt-5'>          
                          <legend className='mb-3'>{t('required')}</legend>
                          <div className='m-form__section'>
                            <div className="form-group row">
                              <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('email')} </label>
                              <div className="col-lg-8 col-md-12 col-sm-12">
                                <input
                                  value={form.email || ''}
                                  name='email'
                                  readOnly={true}
                                  type='email'
                                  className='form-control m-input'
                                  placeholder=''/>
                                <div className='form-control-feedback'>
                                  {errors && errors.get('email') &&
                                  <div className="form-control-feedback text-center error">{errors.get('email').get(0)}</div>}
                                </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('password')} </label>
                              <div className="col-lg-8 col-md-12 col-sm-12">
                                <input
                                  value={form.password || ''}
                                  name='password'
                                  onChange={(e) => { this._handleInputChange(e) }}
                                  type='password'
                                  className='form-control m-input'
                                  placeholder=''/>
                                <div className='form-control-feedback'>
                                  {errors && errors.get('password') &&
                                  <div className="form-control-feedback text-center error">{errors.get('password').get(0)}</div>}
                                </div>
                              </div>
                            </div>
                          </div>
                          <legend className='mb-3 mt-3'>{t('optional')}</legend>

                          <div className='m-form__section'>
                            <div className="form-group row">
                              <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('firstName')}</label>
                              <div className="col-lg-8 col-md-12 col-sm-12">
                                <input
                                  value={form.firstName || ''}
                                  name='firstName'
                                  onChange={(e) => { this._handleInputChange(e) }}
                                  type='text'
                                  className='form-control m-input'
                                  placeholder=''/>
                                <div className='form-control-feedback'>
                                  {errors && errors.get('firstName') &&
                                  <div className="form-control-feedback text-center error">{errors.get('firstName').get(0)}</div>}
                                </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-form-label col-lg-3 col-md-12 col-sm-12">{t('lastName')} </label>
                              <div className="col-lg-8 col-md-12 col-sm-12">
                                <input
                                  value={form.lastName || ''}
                                  name='lastName'
                                  onChange={(e) => { this._handleInputChange(e) }}
                                  type='text'
                                  className='form-control m-input'
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
                <Divider className='mt-4'/>
                <div className='row'>
                  <div className='col-sm-12 pt-4 text-center'>
                    <button onClick={() => { this._createAccount() }} disabled={loading} className='m-btn--air m-2 btn btn-info text-uppercase'>
                        {t('createAccount')}
                    </button>                                      
                  </div>
                </div>
                <div className='alert alert-secondary mt-4'>
                  <p className='text-center m-0'>
                    <Trans i18nKey="translations:alreadyHaveAccountMessage"><NavLink className='alert-link' to="/login"></NavLink>.</Trans>
                  </p>                              
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

export default withTranslation('translations')(withRouter(CreateAccount));   