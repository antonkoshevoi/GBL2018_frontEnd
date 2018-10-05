import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate, Interpolate} from 'react-i18next';
import background from '../../media/images/bg-3.jpg';
import {NavLink} from 'react-router-dom';
import {Divider, Step, StepLabel, Stepper} from '@material-ui/core';

import FirstStepForm from './forms/FirstStepForm';
import SecondStepForm from './forms/SecondStepForm';
import ThirdStepForm from './forms/ThirdStepForm';
import {signUp, validateStep1} from '../../redux/signUpParent/actions';
import {selectSignUpRequest, selectValidateStep1Request} from '../../redux/signUpParent/selectors';
import MetronicProgressButton from "../../components/ui/metronic/MetronicProgressButton";
import { push } from 'react-router-redux';
import { load } from '../../redux/app/actions';
import './Signup.css'

const logoUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/gravitybrain-logo.svg';

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
    const success = this.props.validateStep1Request.get('success');
    const nextSuccess = nextProps.validateStep1Request.get('success');
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
    this.props.validateStep1({
        email:          this.state.form.step1.email,
        password:       this.state.form.step1.password,
        firstName:      this.state.form.step1.firstName,
        lastName:       this.state.form.step1.lastName
    });
  };

  _submitStep2() {
    this.props.signUp({
        step1: {
            avatarCropped:  this.state.form.step1.avatarCropped,
            email:          this.state.form.step1.email,
            password:       this.state.form.step1.password,
            firstName:      this.state.form.step1.firstName,
            lastName:       this.state.form.step1.lastName
        },
        step2: {
            avatarCropped:  this.state.form.step2.avatarCropped,
            username:       this.state.form.step2.username,
            password:       this.state.form.step2.password,
            firstName:      this.state.form.step2.firstName,
            lastName:       this.state.form.step2.lastName
        }
    });
  };

  _goToDashboard() {
    this.props.appLoad();
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
    
    const step1Loading = this.props.validateStep1Request.get('loading');
    const step1Errors = this.props.validateStep1Request.get('errors');

    const step2Loading = this.props.signUpRequest.get('loading');
    const step2Errors = this.props.signUpRequest.get('errors').get('step2');
    
    const loginBtn =  <NavLink to='/login'><strong>Login</strong></NavLink>;
        
    return (
      <form  onSubmit={(e) => { e.preventDefault(); this._next(); }}>
        <div className='m-grid__item animate fadeInLeftBig m-grid__item--fluid m-grid m-grid--hor  m-login--2 m-login-2--skin-2 m--full-height' id='m_login' style={{backgroundImage: `url(${background})`,minHeight:'100vh'}}>
          <div className='m-grid__item m-grid__item--fluid m-login__wrapper'>
            <div className='m-login__container signup-page'>
              <div className='m-login__logo text-center m--margin-top-15'>
                <a href='/'>
                  <img alt="GravityBrain" style={{width: '270px', height: 'auto'}} src={logoUrl} />
                </a>
              </div>
              <div className='m-signup col-lg-8 col-md-10 col-sm-12 m-auto'>
                <div className='m-signup__head'>
                  <h3 className='m-login__title text-center m--margin-top-30'>{t('Sign Up')}</h3>
                </div>
                <div className='m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--info m-portlet--bordered-semi m--margin-top-40 m-portlet--full-height'>
                  <div className='m-portlet__body'>
                    <Stepper activeStep={activeStep} alternativeLabel className="g-stepper">
                      <Step>
                        <StepLabel>{t('Parent Profile')}</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>{t('Child Profil')}e</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>{t('Confirmation')}</StepLabel>
                      </Step>
                    </Stepper>
                    <div>
                      {[
                        <FirstStepForm form={form.step1} errors={step1Errors} onChange={(form) => { this._registerStep1Changes(form) }}/>,
                        <SecondStepForm form={form.step2} errors={step2Errors} onChange={(form) => { this._registerStep2Changes(form) }}/>,
                        <ThirdStepForm form={form}/>
                      ][activeStep]}
                    </div>
                    {activeStep < 2 &&
                        <Divider className='m--margin-top-25'/>
                    }
                    <div className='row'>
                      <div className='col-sm-12 text-right m--padding-top-20 text-center'>
                        {activeStep === 0 &&
                           <MetronicProgressButton type='submit' disabled={step1Loading} loading={step1Loading} className='m-btn m-btn--air m--margin-5 btn btn-info text-uppercase'>{t('next')}</MetronicProgressButton>
                        }
                        {activeStep === 1 &&
                          <div>
                            <button
                              type='button'
                              disabled={activeStep === 0}
                              onClick={() => { this._back(); }}
                              className='m-btn m-btn--air m--margin-5 btn btn-default text-uppercase'>
                              {t('back')}
                            </button>
                            <MetronicProgressButton type='submit' disabled={step2Loading} loading={step2Loading} className='m-btn m-btn--air m--margin-5 btn btn-info text-uppercase'>{t('next')}</MetronicProgressButton>
                          </div>
                        }
                        {activeStep === 2 &&
                          <div>
                            <p className="display-10"><strong>{t('signUpCompletedMessage')}</strong></p>            
                            <button type='submit' className='m-btn m-btn--air m--margin-5 btn btn-info text-uppercase'>{t('goToDashboard')}</button>
                          </div>
                        }
                      </div>
                    </div>
                    {activeStep < 2 &&
                    <div className='alert m-alert m-alert--default'>
                      <p className='text-center'>
                        <Interpolate i18nKey="alreadyHaveAccountMessage" loginLink={loginBtn} />
                      </p>                              
                    </div>   
                    }
                  </div>
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
    validateStep1Request: selectValidateStep1Request(state),
    signUpRequest: selectSignUpRequest(state),
  }),
  (dispatch) => ({
    validateStep1: (form, params = {}) => { dispatch(validateStep1(form, params)) },
    signUp: (form, params = {}) => { dispatch(signUp(form, params)) },
    goToDashboard: () => { dispatch(push('/dashboard')) },
    appLoad: () => { dispatch(load()) }
  })
)(SignUpParent);

export default translate('translations')(SignUpParent);
