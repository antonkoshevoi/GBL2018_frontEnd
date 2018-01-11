import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {translate} from "react-i18next";
import {getAllStudents} from '../../services/Students'
import {Button, Icon} from "material-ui";

class StudentsList extends Component {

    state = {
        students:getAllStudents().students
    }

    _renderStudents(students) {
        console.log(getAllStudents());
        return students.map(function (student,i) {
            return (
                <tr data-row="0" className={`m-datatable__row ${(i % 2 !== 0 ? 'm-datatable__row--even' : '')}`} style={{height: '64px'}}>
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
            <div className="m-portlet m-portlet--head-solid-bg m-portlet--brand">
                <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
                            <span class="m-portlet__head-icon">
							    <i class="la la-user" style={{fontSize:'55px'}}></i>
						    </span>
                            <h3 className="m-portlet__head-text">
                                Students
                            </h3>
                        </div>
                    </div>

                </div>
                <div className="m-portlet__body">
                    <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                        <div className="row align-items-center">

                            <div className="col-xl-12 order-1 order-xl-2 m--align-right">
                                <Button raised color="accent" className="mt-btn mt-btn-success" style={{marginRight:'7px'}}>
                                    Add New
                                    <Icon style={{marginLeft:'5px'}}>add</Icon>
                                </Button>
                                <Button raised className="btn-success mt-btn mt-btn-success" >
                                    Bulk Add Students
                                    <Icon style={{marginLeft:'5px'}}>person</Icon>
                                </Button>
                            </div>

                        </div>
                    </div>
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
                </div>
            </div>
        );
    }
}

StudentsList.propTypes = {};

export default translate('students')(StudentsList);
