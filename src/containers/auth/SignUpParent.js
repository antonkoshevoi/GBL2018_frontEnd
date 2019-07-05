import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation, Trans} from 'react-i18next';
import {NavLink} from 'react-router-dom';
import {Divider, Step, StepLabel, Stepper} from '@material-ui/core';
import Loader from "../../components/layouts/Loader";
import FirstStepForm from './forms/FirstStepForm';
import SecondStepForm from './forms/SecondStepForm';
import ThirdStepForm from './forms/ThirdStepForm';
import {signUpParent, validate, resetSignUpRequest, resetValidateRequest} from '../../redux/signup/actions';
import {selectSignUpRequest, selectValidateRequest} from '../../redux/signup/selectors';
import { push } from 'react-router-redux';
import { load } from '../../redux/app/actions';
import './Signup.css'

class SignUpParent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            form: {
                step1: {},
                step2: {}
            }
        };
    }

    componentWillReceiveProps (nextProps) {
        this._goForwardOnStep1Success(nextProps);
        this._goForwardOnStep2Success(nextProps);    
    }

    _goForwardOnStep1Success (nextProps) {
        const success = this.props.validateRequest.get('success');
        const nextSuccess = nextProps.validateRequest.get('success');
        const { activeStep } = this.state;

        if(!success && nextSuccess) {
            this.setState({
              activeStep: (activeStep + 1)
            });
        }
    }

    _goForwardOnStep2Success (nextProps) {
        const success = this.props.signUpRequest.get('success');
        const nextSuccess = nextProps.signUpRequest.get('success');
        const { activeStep } = this.state;

        if(!success && nextSuccess) {
            this.setState({
              activeStep: (activeStep + 1)
            });
        }
    }

    _registerStep1Changes (step1) {
        this.setState({
            form: {
                ...this.state.form,
                step1
            }
        });
    }

    _registerStep2Changes (step2) {
        this.setState({
            form: {
                ...this.state.form,
                step2
            }
        });
    }

    _submitStep1() {
        this.props.validate({
            email:          this.state.form.step1.email,
            password:       this.state.form.step1.password,
            firstName:      this.state.form.step1.firstName,
            lastName:       this.state.form.step1.lastName
        });
    };

    _submitStep2(skipStudent = false) {
        this.props.signUp({
            step1: {
                avatarCropped:  this.state.form.step1.avatarCropped,
                email:          this.state.form.step1.email,
                password:       this.state.form.step1.password,
                firstName:      this.state.form.step1.firstName,
                lastName:       this.state.form.step1.lastName
            },
            step2: skipStudent ? { 
                skip: true
            } : {
                avatarCropped:  this.state.form.step2.avatarCropped,
                username:       this.state.form.step2.username,
                password:       this.state.form.step2.password,
                firstName:      this.state.form.step2.firstName,
                lastName:       this.state.form.step2.lastName
            }
        });
    };
  
    _skip() {
        this.setState({
            form: {
                ...this.state.form,
                step2: { skip: true }
            }
        });
        this._submitStep2(true);
    }

    _goToDashboard() {
        this.props.appLoad();
        this.props.resetSignUpRequest();
        this.props.resetValidateRequest();
        this.props.goToDashboard();
    };

    _next() {
        const { activeStep } = this.state;

        if (activeStep === 0) {
            this._submitStep1();
        }
        if (activeStep === 1) {
            this._submitStep2();
        }
        if (activeStep === 2) {
            this._goToDashboard();
        }    
    };

    _back() {
        const { activeStep } = this.state;    
        this.setState({
          activeStep: (activeStep - 1)
        });
    }; 

    render() {
        const { activeStep, form } = this.state;
        const { t } = this.props;

        const loading = this.props.validateRequest.get('loading') || this.props.signUpRequest.get('loading');
        const step1Errors = this.props.validateRequest.get('errors');
        const step2Errors = this.props.signUpRequest.getIn(['errors', 'step2']);        

        return (
            <form  onSubmit={(e) => { e.preventDefault(); this._next(); }}>
                {loading && <Loader/>}
                <div className='signup-page'>
                  <div className='m-signup col-lg-8 col-md-10 col-sm-12 m-auto'>
                    <div className='m-signup__head'>
                      <h3 className='m-login__title text-center mt-5'>{t('signUp')}</h3>
                    </div>
                    <div className='m-portlet m-portlet--brand mt-5 m-portlet--full-height'>
                      <div className='m-portlet__body'>
                        <Stepper activeStep={activeStep} alternativeLabel className="g-stepper">
                          <Step>
                            <StepLabel>{t('parentProfile')}</StepLabel>
                          </Step>
                          <Step>
                            <StepLabel>{t('childProfile')}</StepLabel>
                          </Step>
                          <Step>
                            <StepLabel>{t('confirmation')}</StepLabel>
                          </Step>
                        </Stepper>
                        <div className="mt-2 mt-md-5 mx-2">
                          {[
                            <FirstStepForm form={form.step1} errors={step1Errors} onChange={(form) => { this._registerStep1Changes(form) }}/>,
                            <SecondStepForm form={form.step2} errors={step2Errors} onChange={(form) => { this._registerStep2Changes(form) }}/>,
                            <ThirdStepForm form={form}/>
                          ][activeStep]}                                                    
                          {activeStep < 2 && <Divider className='mt-4'/>}                       
                          <div className='pt-4 text-center'>
                          {[
                            <button type='submit' disabled={loading} className='m-btn m-btn--air m-2 btn btn-info text-uppercase'>
                                {t('next')}
                            </button>,                          
                            <div>
                                <button type='button' onClick={() => { this._back(); }} className='m-btn m-btn--air m-2 btn btn-default text-uppercase'>
                                    {t('back')}
                                </button>
                                <button type='button' onClick={() => { this._skip(); }} disabled={loading} className='m-btn m-btn--air m-2 btn btn-info text-uppercase'>
                                    {t('skip')}
                                </button>
                                <button type='submit' disabled={loading} className='m-btn m-btn--air m-2 btn btn-info text-uppercase'>
                                    {t('next')}
                                </button>
                            </div>,
                            <div>
                                <p className="display-10"><strong>{t('signUpCompletedMessage')}</strong></p>            
                                <button type='submit' className='m-btn m-btn--air m-2 btn btn-info text-uppercase'>{t('goToDashboard')}</button>
                            </div>
                          ][activeStep]}                            
                          </div>                        
                          {activeStep < 2 &&
                          <div className='alert m-alert m-alert--default mt-4'>
                            <p className='text-center m-0'>
                              <Trans i18nKey="translations:alreadyHaveAccountMessage"><NavLink className='alert-link' to="/login"></NavLink>.</Trans>                            
                            </p>                              
                          </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </form>
        );
    }
}

SignUpParent = connect(
    (state) => ({
        validateRequest: selectValidateRequest(state),
        signUpRequest: selectSignUpRequest(state)
    }),
    (dispatch) => ({
        validate: (form, params = {}) => { dispatch(validate(form, params)) },
        signUp: (form, params = {}) => { dispatch(signUpParent(form, params)) },
        resetValidateRequest: () => { dispatch(resetValidateRequest()) },
        resetSignUpRequest: () => { dispatch(resetSignUpRequest()) }, 
        goToDashboard: () => { dispatch(push('/dashboard')) },
        appLoad: () => { dispatch(load()) }
    })
)(SignUpParent);

export default withTranslation('translations')(SignUpParent);
