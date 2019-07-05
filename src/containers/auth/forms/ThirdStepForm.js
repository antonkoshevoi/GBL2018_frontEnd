import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {Divider} from '@material-ui/core';

class ThirdStepForm extends Component {
  static propTypes = {
    form: PropTypes.any.isRequired
  };

  render() {

    const { form, t } = this.props;

    return (
     <div className='row'>
       <div className={`col-lg-6 col-md-6 col-sm-12 ${form.step2.skip ? 'm-auto' : ''}`}>                                  
            <p className="text-center text-uppercase"><strong>{t('parentProfile')}</strong></p>
            <div className='row'>
                {form.step1.avatarCropped && 
                <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12">
                    <p className="text-center"><img className='img-thumbnail' style={{ maxWidth: '200px', width: '100%' }} src={form.step1.avatarCropped} alt={t('parentProfile')} /></p> 
                </div>
                }
                <div className={`text-center col-lg-12 col-md-12 ${form.step1.avatarCropped ? 'col-sm-6' : 'col-sm-12'}`}>
                    <p className="display-10">{form.step1.firstName} {form.step1.lastName}</p>              
                    <p>
                        <div className="g-blue text-lowercase">{t('email')}:</div>
                        <div className="display-10">{form.step1.email}</div>
                    </p>
                </div>            
            </div>
        </div>
        {!form.step2.skip && 
        <div className="col-lg-6 col-md-6 col-sm-12">
            <Divider className='mb-4 m--hidden-tablet m--hidden-desktop'/>
            <p className="text-center text-uppercase"><strong>{t('studentProfile')}</strong></p>
            <div className='row'>
                {form.step2.avatarCropped && 
                <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12">
                    <p className="text-center"><img className='img-thumbnail' style={{ maxWidth: '200px', width: '100%' }} src={form.step2.avatarCropped} alt={t('studentProfile')} /></p> 
                </div>
                }
                <div className={`text-center col-lg-12 col-md-12 ${form.step2.avatarCropped ? 'col-sm-6' : 'col-sm-12'}`}>
                    <p className="display-10">{form.step2.firstName} {form.step2.lastName}</p>                 
                    <p>
                        <div className="g-blue text-lowercase">{t('username')}:</div>
                        <div className="display-10">{form.step2.username}</div>
                    </p>                    
                </div>            
            </div>
        </div>}
     </div>
    );
  }
}

export default withTranslation('translations')(ThirdStepForm);

