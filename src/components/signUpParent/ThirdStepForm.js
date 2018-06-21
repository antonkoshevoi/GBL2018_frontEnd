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
             <div className="row">
               <div className="col-md-9 m-auto">
                 <table className="table m-table m-table-noborder">
                   <thead>
                   <tr>
                     <th>PARENT PROFILE</th>
                     <th>STUDENT PROFILE</th>
                     <th>COMPLETION OPTIONS</th>
                   </tr>
                   </thead>
                   <tbody>
                   <tr>
                     <td>
                        {form.step1.avatarCropped && <p><img className='img-thumbnail' style={{ width: '150px' }} src={form.step1.avatarCropped} alt='My Profile' /></p> }
                        {form.step1.email}
                     </td>
                     <td>
                        {form.step2.avatarCropped && <p><img className='img-thumbnail' style={{ width: '150px' }} src={form.step2.avatarCropped} alt='My Student' /></p> }
                        {form.step2.username}
                     </td>
                     <td><button className="btn m-btn btn-info"> Download App <i className="fa fa-download"></i> </button></td>
                   </tr>
                   <tr>
                     <td>{form.step1.firstName}</td>
                     <td>{form.step2.firstName}</td>
                     <td> </td>
                   </tr>
                   <tr>
                     <td>{form.step1.lastName}</td>
                     <td>{form.step2.firstName}</td>
                     <td></td>
                   </tr>
                   </tbody>
                 </table>
               </div>
             </div>
    );
  }
}

export default translate("ThirdStepForm")(ThirdStepForm);

