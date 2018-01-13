import React, {Component} from 'react';
import {translate} from "react-i18next";
import StudentsList from "../components/pages/students/StudentsList";
import {Button, Icon} from "material-ui";
import AddStudentDialog from "../components/pages/students/AddStudentDialog";



class Students extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogIsOpen:false
        }
    }


    _openAddDialog = () => {
        this.setState({ dialogIsOpen: true });
    };

    _closeAddDialog = () => {
        this.setState({ dialogIsOpen: false });
    };


    render() {
        return (
            <div className="fadeInLeft  animated">

                <div className="m-portlet m-portlet--head-solid-bg m-portlet--brand">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">
                            <div className="m-portlet__head-title">
                            <span className="m-portlet__head-icon">
							    <i className="la la-user" style={{fontSize:'55px'}}></i>
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
                                    <Button raised color="accent" onClick={this._openAddDialog} className="mt-btn mt-btn-success" style={{marginRight:'7px'}}>
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
                        <StudentsList/>
                    </div>
                </div>

                <AddStudentDialog dialogIsOpen={this.state.dialogIsOpen} handlerClose = {this._closeAddDialog} />

            </div>
        );
    }
}



export default translate('students')(Students);