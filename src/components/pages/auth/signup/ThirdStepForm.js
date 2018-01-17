import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';

class ThirdStepForm extends Component {
    render() {
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
                              <td>gegham_user</td>
                              <td>petros_user</td>
                          </tr>
                          <tr>
                              <td>Gegham</td>
                              <td></td>
                          </tr>
                          <tr>
                              <td>Shmavonyan</td>
                              <td></td>
                          </tr>
                      </tbody>
                  </table>
                </div> 
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default translate("ThirdStepForm")(connect(
    mapStateToProps,
)(ThirdStepForm));

