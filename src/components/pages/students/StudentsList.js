import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import {getAllStudents} from '../../../services/Students'
import {Button, Icon} from "material-ui";

class StudentsList extends Component {

    state = {
        students:getAllStudents().students
    }

    _renderStudents(students) {
        console.log(getAllStudents());
        return students.map(function (student,i) {
            return (
                <tr key={i} data-row="0" className={`m-datatable__row ${(i % 2 !== 0 ? 'm-datatable__row--even' : '')}`} style={{height: '64px'}}>
                    <td data-field="RecordID" className="m-datatable__cell--center m-datatable__cell m-datatable__cell--check"><span
                        style={{width: '100px'}}>{i+1}</span>
                    </td>
                    <td data-field="OrderID" className="m-datatable__cell"><span style={{width: '132px'}}>{student.username}</span></td>
                    <td data-field="ShipName" className="m-datatable__cell"><span style={{width: '132px'}}>{student.first_name}</span></td>
                    <td data-field="Currency" className="m-datatable__cell">
                        <span style={{width: '132px'}}>{student.last_name}</span>
                    </td>
                    <td data-field="ShipAddress" className="m-datatable__cell"><span style={{width: '132px'}}>{student.email}</span>
                    </td>
                    <td data-field="Status" className="m-datatable__cell"><span style={{width: '132px'}}><span
                        className="m-badge m-badge--brand m-badge--wide">Student</span></span></td>
                    <td data-field="ShipDate" className="m-datatable__cell"><span style={{width: '132px'}}>{student.school}</span></td>

                    <td data-field="Type" className="m-datatable__cell"><span style={{width: '100px'}}>
                        <button  className="btn btn-accent m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill">
									<i className="la la-edit"></i>
						</button>
                    </span>
                    </td>

                </tr>
            )
        })
    }

    render() {
        return (

                    <div className="m_datatable m-datatable m-datatable--default m-datatable--loaded" id="ajax_data" >
                        <table className="m-datatable__table" >
                            <thead className="m-datatable__head">
                            <tr className="m-datatable__row" style={{height: '56px'}}>
                                <th data-field="RecordID" className="m-datatable__cell--center m-datatable__cell m-datatable__cell--check"><span
                                   style={{width: '100px'}}>#</span></th>
                                <th data-field="OrderID" className="m-datatable__cell"><span style={{width: '132px'}}>Username</span></th>
                                <th data-field="ShipName" className="m-datatable__cell"><span style={{width: '132px'}}>Lastname</span></th>
                                <th data-field="Currency" className="m-datatable__cell"><span style={{width: '132px'}}>Firstname</span></th>
                                <th data-field="ShipAddress" className="m-datatable__cell"><span style={{width: '132px'}}>Email</span></th>
                                <th data-field="ShipDate" className="m-datatable__cell"><span style={{width: '132px'}}>Role</span></th>
                                <th data-field="Status" className="m-datatable__cell"><span style={{width: '132px'}}>School</span></th>
                                <th data-field="Actions" className="m-datatable__cell"><span style={{width: '100px'}}>Actions</span></th>
                            </tr>
                            </thead>
                            <tbody className="m-datatable__body" >
                            {this._renderStudents(this.state.students)}
                            </tbody>
                        </table>
                    </div>

        );
    }
}

StudentsList.propTypes = {};

export default translate('students')(StudentsList);
