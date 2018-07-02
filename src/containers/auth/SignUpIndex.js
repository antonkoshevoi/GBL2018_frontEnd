import React, {Component} from 'react';
import {translate} from 'react-i18next';
import background from '../../media/images/bg-3.jpg';
import {NavLink} from "react-router-dom";

const logoUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/gravitybrain-logo.svg';

class SignUpIndex extends Component {
  render() {
    return (
      <div id="signUpSwitch" className="animate fadeInLeftBig">
        <div style={{position:'fixed'}} className="loginWrapper">
          <div className="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2 m--full-height" id="m_login" style={{backgroundImage: `url(${background})`}}>
            <div className="m-grid__item m-grid__item--fluid	m-login__wrapper">
              <div className="m-login__container">
                <div className="m-login__logo">
                  <a href={"/"}>
                    <img src={logoUrl} alt="GravityBrain"/>
                  </a>
                </div>
                <div className="m-login__signin">
                  <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--info m-portlet--bordered-semi m--margin-top-40 m-portlet--full-height ">
                    <div className="m-portlet__head">
                      <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title full-width">
                          <h3 className="m-portlet__head-text text-center full-width">
                            Sign Up To GravityBrain
                          </h3>
                        </div>
                      </div>

                    </div>
                    <div className="m-portlet__body">
                      <h2 className="text-center m--margin-top-25">Select your account type</h2>

                      <div className="signup-btns flex-column d-flex flex m--margin-top-40 ">
                        <NavLink to="/signUp/parent" activeClassName="link-active" className="btn m-btn--pill m--margin-bottom-10 btn-lg m-btn m-btn--gradient-from-primary m-btn--gradient-to-info">
                          Parent
                        </NavLink>
                        <NavLink to="/signUp/principal" activeClassName="link-active" className="btn m-btn--pill btn-lg m-btn m-btn--gradient-from-success m-btn--gradient-to-info">
                          Principal
                        </NavLink>
                      </div>

                      <div className="alert m-alert m-alert--default">
                        <p className="text-center"> If you already have a account, <NavLink to="/login"><strong>Login</strong></NavLink> to start your session.</p>
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

SignUpIndex.propTypes = {};

export default translate("translation")(SignUpIndex);
