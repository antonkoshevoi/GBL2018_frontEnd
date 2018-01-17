import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import background from '../../media/images/bg-3.jpg';
import logo from '../../media/images/logo.png'

import {NavLink} from "react-router-dom";
import {Divider, Step,  StepLabel, Stepper, Typography} from "material-ui";

import FirstStepForm from "../../components/pages/auth/signup/FirstStepForm";
import SecondStepForm from "../../components/pages/auth/signup/SecondStepForm";
import ThirdStepForm from "../../components/pages/auth/signup/ThirdStepForm";


function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <FirstStepForm/>;
        case 1:
            return <SecondStepForm/>;
        case 2:
            return <ThirdStepForm/>;

        default:
            return 'Uknown stepIndex';
    }
}

class SignUpParent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
        };
    }


    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };


    render() {

        const {activeStep} = this.state;

        return (
            <div>
                <div className="m-grid__item animate fadeInLeftBig m-grid__item--fluid m-grid m-grid--hor  m-login--2 m-login-2--skin-2 m--full-height" id="m_login" style={{backgroundImage: `url(${background})`,minHeight:'100vh'}}>
                    <div className="m-grid__item m-grid__item--fluid m-login__wrapper">
                        <div className="m-login__container">
                            <div className="m-login__logo text-center">
                                <a href="#">
                                    <img src={logo}/>
                                </a>
                            </div>
                            <div className="m-signup col-sm-6 m-auto">
                                <div className="m-signup__head">
                                    <h3 className="m-login__title">Sign Up </h3>
                                </div>
                                <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--info m-portlet--bordered-semi m--margin-top-40 m-portlet--full-height">
                                    <div className="m-portlet__head">
                                        <div className="m-portlet__head-caption">
                                            <div className="m-portlet__head-title full-width">
                                                <h3 className="m-portlet__head-text text-center full-width">
                                                    SETUP YOUR PARENT PROFILE
                                                </h3>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="m-portlet__body">
                                        <div className="alert m-alert m-alert--default">
                                            <p className="text-center"> If you already have a account, <NavLink to="/login"><strong>Login</strong></NavLink> to start your session. Otherwise,</p>
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


                                        <div >{getStepContent(activeStep)}</div>
                                        <Divider className="m--margin-top-25"/>

                                        <div className="row">
                                            <div className="col-sm-12 text-right m--padding-top-20 text-center">

                                                {activeStep !== 2 &&
                                                    <button
                                                        disabled={activeStep === 0}
                                                        onClick={this.handleBack}
                                                        className="m-btn m-btn--air m--margin-5 btn btn-default"
                                                    >
                                                        BACK
                                                    </button>
                                                }
                                                    <button className={`m-btn m-btn--air m--margin-5 btn btn-${activeStep === 2 ? 'success' : 'info'}`} raised onClick={this.handleNext}>
                                                        {activeStep === 2 ? 'GO TO DASHBOARD' : 'NEXT'}
                                                    </button>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default translate("SignUpParent")
(connect(
    mapStateToProps,
)(SignUpParent));

