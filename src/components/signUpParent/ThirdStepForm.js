import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from 'react-i18next';

class ThirdStepForm extends Component {
  static propTypes = {
    form: PropTypes.any.isRequired
  };

  render() {

    const { form } = this.props;

    return (
     <div className='row'>
       <div className="col-lg-4 col-md-4 col-sm-12">                                  
            <p><strong>PARENT PROFILE</strong></p>
            <div className='row'>
                {form.step1.avatarCropped && 
                <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12">
                    <p><img className='img-thumbnail' style={{ maxWidth: '200px', width: '100%' }} src={form.step1.avatarCropped} alt='My Profile' /></p> 
                </div>
                }
                <div className={`col-lg-12 col-md-12 ${form.step1.avatarCropped ? 'col-sm-6' : 'col-sm-12'}`}>
                    <p className="display-10">{form.step1.firstName} {form.step1.lastName}</p>                    
                    <p className="display-10">{form.step1.email}</p>
                </div>            
            </div>
        </div>                     
        <div className="col-lg-4 col-md-4 col-sm-12">
            <p><strong>STUDENT PROFILE</strong></p>
            <div className='row'>
                {form.step2.avatarCropped && 
                <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12">
                    <p><img className='img-thumbnail' style={{ maxWidth: '200px', width: '100%' }} src={form.step2.avatarCropped} alt='My Student' /></p> 
                </div>
                }
                <div className={`col-lg-12 col-md-12 ${form.step2.avatarCropped ? 'col-sm-6' : 'col-sm-12'}`}>
                    <p className="display-10">{form.step2.firstName} {form.step2.lastName}</p>
                    <p className="display-10">{form.step2.username}</p>                    
                </div>            
            </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
            <p><strong>COMPLETION OPTIONS</strong></p>
            <p className="download-button"><button className="btn m-btn btn-info"> Download App <i className="fa fa-download"></i> </button></p>
        </div>               
     </div>
    );
  }
}

export default translate("ThirdStepForm")(ThirdStepForm);

