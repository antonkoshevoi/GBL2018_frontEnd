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
                     <td>{form.step1.username}</td>
                     <td>{form.step2.username}</td>
                     <td><button className="btn m-btn btn-info"> Download App <i className="fa fa-download"></i> </button></td>
                   </tr>
                   <tr>
                     <td>{form.step1.firstName}</td>
                     <td></td>
                     <td> </td>
                   </tr>
                   <tr>
                     <td>{form.step1.lastName}</td>
                     <td></td>
                     <td></td>
                   </tr>
                   <tr>
                     <td>{form.step1.addressLine1}</td>
                     <td></td>
                     <td></td>
                   </tr>
                   <tr>
                     <td>{form.step1.addressLine2}</td>
                     <td></td>
                     <td></td>
                   </tr>
                   <tr>
                     <td>{form.step1.city}</td>
                     <td></td>
                     <td></td>
                   </tr>
                   <tr>
                     <td>{form.step1.region}</td>
                     <td></td>
                     <td></td>
                   </tr>
                   <tr>
                     <td>{form.step1.country}</td>
                     <td></td>
                     <td></td>
                   </tr>
                   <tr>
                     <td>{form.step1.phoneNumber}</td>
                     <td></td>
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

