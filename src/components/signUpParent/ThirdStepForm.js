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
        <div className="col-md-12">
          <table className="table m-table m-table--head-separator-primary">
            <thead>
              <tr>
                <th>Parent</th>
                <th>Student</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{form.step1.username}</td>
                <td>{form.step2.username}</td>
              </tr>
              <tr>
                <td>{form.step1.firstName}</td>
                <td></td>
              </tr>
              <tr>
                <td>{form.step1.lastName}</td>
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

