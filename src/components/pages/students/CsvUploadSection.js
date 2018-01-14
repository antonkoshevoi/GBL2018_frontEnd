import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormControl, FormHelperText, Input, InputLabel,TextField, TableBody, TableCell, TableHead, TableRow, Table, MenuItem, Select, Tab, Tabs, Typography} from "material-ui";
import CSVReader from "react-csv-reader";
import toastr from 'toastr';
import {CSVLink} from "react-csv";


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

const schools = [
    {
        id:1,
        name:"SCHOOL N184"
    },
    {
        id:2,
        name:"SCHOOL N29"
    },
    {
        id:3,
        name:"SCHOOL N45"
    }
]


const requiredCsvFields = [
    'username',
    'password',
    'firstname',
    'lastname',
    'email',
    'phone',
    'homeroom',
    'student_id'
];

const csvTemplate = [
    [...requiredCsvFields]
]

class CsvUploadSection extends Component {

    state = {
        activeTab: '1',
        school:'',
        csvData:[]
    };


    handleChange = (event, value) => {
        this.setState({ activeTab:value });
    };


    _selectSchool(event) {
        this.setState({school:event.target.value})
    }


    _renderSchools(data){
        return data.map(function (item,i) {
            return  <MenuItem  key={ i } value={item.id}>{item.name}</MenuItem>
        })
    }

    _onLoadCSV = data => {
        let inCorrectCount = 0
        const _self = this;
        requiredCsvFields.map(function (item) {
            if (!data[0].includes(item)) {
                toastr.error('Field is missing ' + item);
                inCorrectCount ++;
            }
        });
        if (inCorrectCount === 0 && requiredCsvFields.length === data[0].length) {
            this.setState({csvData:data})
        }

    }


    _saveCsvData() {
        //TODO
    }

    _renderUploadedCsv(data){
        return data.map((item,i) => {
            return (
                <TableRow key={i}>
                    <TableCell padding="dense" className="m--padding-right-5 m--padding-left-5"><TextField value={item.username}/></TableCell>
                    <TableCell padding="dense" className="m--padding-right-5 m--padding-left-5"><TextField value={item.password}/></TableCell>
                    <TableCell padding="dense" className="m--padding-right-5 m--padding-left-5"><TextField value={item.firstname}/></TableCell>
                    <TableCell padding="dense" className="m--padding-right-5 m--padding-left-5"><TextField value={item.lastname}/></TableCell>
                    <TableCell padding="dense" className="m--padding-right-5 m--padding-left-5"><TextField value={item.phone}/></TableCell>
                    <TableCell padding="dense" className="m--padding-right-5 m--padding-left-5"><TextField value={item.homeroom}/></TableCell>
                    <TableCell padding="dense" className="m--padding-right-5 m--padding-left-5"><TextField value={item.student_id}/></TableCell>
                </TableRow>
            );
        })
    }

    render() {

        const {activeTab} = this.state

        return (
            <div>
            <div className="m-portlet m-portlet--brand  m-portlet--head-solid-bg m-portlet--bordered">
                <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                        <div className="m-portlet__head-title">
												<span className="m-portlet__head-icon">
													<i className="flaticon-cogwheel-2"></i>
												</span>
                            <h3 className="m-portlet__head-text">
                                CSV
                            </h3>
                        </div>
                    </div>
                    <div className="m-portlet__head-tools">
                        <Tabs
                            className="nav nav-tabs m-tabs-line m-tabs-line--primary m-tabs-line--2x main-tabs pull-right"
                            value={this.state.activeTab}
                            onChange={this.handleChange}

                        >
                            <Tab className="tab-header-item" value="1" label="Upload CSV" />
                            <Tab className="tab-header-item" value="2" label="Download CSV Template" />
                        </Tabs>
                    </div>
                </div>
                <div className="m-portlet__body">
                    {activeTab === '1' && <TabContainer>
                        <div className="row">
                            <div className="col-sm-6">
                               <div className="row">
                                   <div className="col-xs-12 ">
                                       <FormControl>
                                           <InputLabel htmlFor="school-helper">Schools</InputLabel>
                                           <Select
                                               style={{minWidth:'120px'}}
                                               value={this.state.school}
                                               onChange={(e) => { this._selectSchool(e)}}
                                               input={<Input name="school" id="school-helper" />}
                                           >
                                               <MenuItem value="">
                                                   <em>None</em>
                                               </MenuItem>
                                               {this._renderSchools(schools)}
                                           </Select>
                                           <FormHelperText></FormHelperText>
                                       </FormControl>
                                   </div>
                               </div>
                            </div>
                            <div  className={`col-sm-6 ${!this.state.school ? ' not-allowed' : ''}` }>
                                <CSVReader
                                    cssClass={`react-csv-input ${!this.state.school ? ' disabled' : 'fdsfsf'}`}
                                    label="Select CSV file"
                                    onFileLoaded={this._onLoadCSV}
                                />
                            </div>
                        </div>
                    </TabContainer>}
                    {activeTab === '2' && <TabContainer>
                        <div >

                            <h6>
                                You may download this .csv template to use it as pattern for your csv file. Kindly make sure that you have a valid .csv format before uploading to the system.
                            </h6>

                            <CSVLink data={csvTemplate} filename="students.csv" className="btn btn-success">Download</CSVLink>

                        </div>
                    </TabContainer>}
                </div>
            </div>
                <div className="col-xs-12">
                    {this.state.csvData.length > 0 &&
                    <div className="m-portlet m-portlet--head-solid-bg m-portlet--bordered">
                        <div className="m-portlet__head">
                            <div className="m-portlet__head-caption">
                                <div className="m-portlet__head-title">
												<span className="m-portlet__head-icon">
													<i className="flaticon-edit"></i>
												</span>
                                    <h3 className="m-portlet__head-text">
                                        EDIT
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="m-portlet__body">
                            <div className="table-responsive csvTable">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Password</TableCell>
                                        <TableCell>Firstname</TableCell>
                                        <TableCell>Lastname</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Homeroom</TableCell>
                                        <TableCell>Student Id</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this._renderUploadedCsv(this.state.csvData)}
                                </TableBody>
                            </Table>
                            </div>
                        </div>

                        <div className="m-portlet__foot">
                            <div className="row align-items-center">
                                <div className="col-lg-12 text-right">
                                    <button  className="btn btn-success" onClick={() => {this._saveCsvData()}}>
                                        Save
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        );
    }
}


export default CsvUploadSection;
