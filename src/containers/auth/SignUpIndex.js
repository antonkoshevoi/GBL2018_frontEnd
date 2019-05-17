import React, {Component} from 'react';
import {withTranslation, Trans} from 'react-i18next';
import {NavLink} from "react-router-dom";
import Logo from '../ui/Logo';

class SignUpIndex extends Component {
  render() {      
    const { t } = this.props;    
    return (            
      <div className="m-page m--full-height">
        <div className="main-background m-body justify-content-center m-login">
          <div className="m-login__wrapper">           
              <div className="m-login__container">
                <Logo />
                <div>
                  <div className="m-login__head"> 
                    <h3 className="m-login__title">{t('signUp')}</h3> 
                  </div> 
                  <div className="m-portlet m-portlet--brand m-portlet--head-solid-bg m-portlet--borderedm-portlet m-portlet--bordered-semi m--margin-top-20 m-portlet--full-height ">
                    
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
                      <div className="alert m-alert m-alert--default m--margin-bottom-0">
                        <p className="text-center m--margin-bottom-0"><Trans i18nKey="translations:alreadyHaveAccountMessage"><NavLink className='alert-link' to="/login"></NavLink>.</Trans></p>
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

export default withTranslation("translations")(SignUpIndex);
