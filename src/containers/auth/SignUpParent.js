import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import background from '../../media/images/bg-3.jpg';
import logo from '../../media/images/logo.png'

import {NavLink} from 'react-router-dom';
import {Divider, Step,  StepLabel, Stepper, Typography} from 'material-ui';

import FirstStepForm from '../../components/pages/auth/signup/FirstStepForm';
import SecondStepForm from '../../components/pages/auth/signup/SecondStepForm';
import ThirdStepForm from '../../components/pages/auth/signup/ThirdStepForm';
import { validateStep1 } from '../../redux/signUpParent/actions';
import { selectValidateStep1Request } from '../../redux/signUpParent/selectors';

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
    const success = this.props.validateStep1Request.get('success');
    const nextSuccess = nextProps.validateStep1Request.get('success');

    if(!success && nextSuccess) {
      this._next();
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
    this.props.validateStep1(
      this.state.form.step1
    );
  };

  _next() {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  _back() {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  render() {
    const { activeStep, form } = this.state;
    const step1Errors = this.props.validateStep1Request.get('errors');

    return (
      <form onSubmit={[
        (e) => { e.preventDefault(); this._submitStep1(); },
        (e) => { e.preventDefault(); this._submitStep2(); },
        (e) => { e.preventDefault(); this._goToDashboard(); }
      ][activeStep]}>
        <div className='m-grid__item animate fadeInLeftBig m-grid__item--fluid m-grid m-grid--hor  m-login--2 m-login-2--skin-2 m--full-height' id='m_login' style={{backgroundImage: `url(${background})`,minHeight:'100vh'}}>
          <div className='m-grid__item m-grid__item--fluid m-login__wrapper'>
            <div className='m-login__container'>
              <div className='m-login__logo text-center'>
                <a href='#'>
                  <img src={logo}/>
                </a>
              </div>
              <div className='m-signup col-sm-6 m-auto'>
                <div className='m-signup__head'>
                  <h3 className='m-login__title'>Sign Up</h3>
                </div>
                <div className='m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--info m-portlet--bordered-semi m--margin-top-40 m-portlet--full-height'>
                  <div className='m-portlet__head'>
                    <div className='m-portlet__head-caption'>
                      <div className='m-portlet__head-title full-width'>
                        <h3 className='m-portlet__head-text text-center full-width'>
                          SETUP YOUR PARENT PROFILE
                        </h3>
                      </div>
                    </div>

                  </div>
                  <div className='m-portlet__body'>
                    <div className='alert m-alert m-alert--default'>
                      <p className='text-center'> If you already have a account, <NavLink to='/login'><strong>Login</strong></NavLink> to start your session. Otherwise,</p>
                    </div>

                    <Stepper activeStep={activeStep} alternativeLabel>
                      <Step>
                        <StepLabel>STEP 1</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>STEP 2</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>STEP 3</StepLabel>
                      </Step>
                    </Stepper>

                    <div>
                      {[
                        <FirstStepForm form={form.step1} errors={step1Errors} onChange={(form) => { this._registerStep1Changes(form) }}/>,
                        <SecondStepForm form={form.step2} onChange={(form) => { this._registerStep2Changes(form) }}/>,
                        <ThirdStepForm/>
                      ][activeStep]}
                    </div>
                    <Divider className='m--margin-top-25'/>

                    <div className='row'>
                      <div className='col-sm-12 text-right m--padding-top-20 text-center'>
                        {activeStep !== 2 &&
                          <button
                            disabled={activeStep === 0}
                            onClick={() => { this._back(); }}
                            className='m-btn m-btn--air m--margin-5 btn btn-default'>
                            BACK
                          </button>}
                        {[
                          <button type='submit' className='m-btn m-btn--air m--margin-5 btn btn-info'>NEXT</button>,
                          <button type='submit' className='m-btn m-btn--air m--margin-5 btn btn-info'>NEXT</button>,
                          <button type='submit' className='m-btn m-btn--air m--margin-5 btn btn-info'>GO TO DASHBOARD</button>
                        ][activeStep]}
                      </div>
                    </div>

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
    validateStep1Request: selectValidateStep1Request(state)
  }),
  (dispatch) => ({
    validateStep1: (form, params = {}) => { dispatch(validateStep1(form, params)) },
  })
)(SignUpParent);

export default translate('SignUpParent')(SignUpParent);
