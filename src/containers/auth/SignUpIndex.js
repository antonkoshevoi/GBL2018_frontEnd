import React, {Component} from 'react';
import {translate, Interpolate} from 'react-i18next';
import {NavLink} from "react-router-dom";

const logoUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/gravitybrain-logo.svg';

class SignUpIndex extends Component {
  render() {      
    const { t } = this.props;
    const loginBtn = <NavLink to="/login"><strong>{t('login')}</strong></NavLink>;
    return (            
      <div className="m-grid m-grid--hor m-grid--root m-page m--full-height">
        <div className="main-background m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop justify-content-center m-login">
          <div className="m-login__wrapper">           
              <div className="m-login__container">
                <div className="m-login__logo">
                  <a href={"/"}>
                    <img src={logoUrl} alt="GravityBrain"/>
                  </a>
                </div>
                <div>
                  <div className="m-login__head"> 
                    <h3 className="m-login__title">{t('signUp')}</h3> 
                  </div> 
                  <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--info m-portlet--bordered-semi m--margin-top-20 m-portlet--full-height ">
                    
                    <div className="m-portlet__body">
                      <h4 className="text-center m--margin-top-25">{t('selectYourAccountType')}</h4>

                      <div className="signup-btns flex-column d-flex flex m--margin-top-15 m--margin-bottom-15">
                        <NavLink to="/signUp/parent" activeClassName="link-active" className="btn m-btn--pill m--margin-top-15 m--margin-bottom-25 btn-lg m-btn btn-primary">
                          {t('parent')}
                        </NavLink>
                        <NavLink to="/signUp/principal" activeClassName="link-active" className="btn m-btn--pill m--margin-bottom-15 btn-lg m-btn btn-success">
                          {t('principal')}
                        </NavLink>
                      </div>
                      <div className="alert m-alert m-alert--default margin-bottom-0">
                        <p className="text-center margin-bottom-0"><Interpolate i18nKey="alreadyHaveAccountMessage" loginLink={loginBtn} /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>              
            </div>          
        </div>
      </div>);    
  }
}

SignUpIndex.propTypes = {};

export default translate("translations")(SignUpIndex);
