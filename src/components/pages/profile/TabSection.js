import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon,
    LinearProgress, Select, MenuItem, Button
} from 'material-ui';
import DateTime from "react-datetime";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


class TabSection extends Component {
    state = {
        value: "personalData",
        activeSchool: 1,
        activeHomerooms: [1,3],
        ...this.props.data
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };



    _selectGender (gender) {
        this.setState({ gender })
    }

    _selectSchool (activeSchool) {
        this.setState({ activeSchool })
    }



    _selectHomeRooms = event => {
        console.log(event.target.value);
        this.setState({ activeHomerooms: event.target.value });
    };

    render() {

        const {schools, homerooms} = this.props.data;
        const { value } = this.state;
        return (
            <div >
                <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-tools">
                            <Tabs
                                className="nav nav-tabs m-tabs-line m-tabs-line--primary m-tabs-line--2x main-tabs"
                                value={this.state.value}
                                onChange={this.handleChange}

                            >
                                <Tab className="tab-header-item" value="personalData" label="Personal Data" />
                                <Tab className="tab-header-item" value="schools" label="Schools" />
                                <Tab className="tab-header-item" value="homeRooms" label="Homerooms" />
                            </Tabs>
                        </div>


                    </div>
                    <div className="m-portlet__body m--padding-top-5" style={{height:"100%"}}>
                        {value === 'personalData' && <TabContainer>
                            <div className="alert m-alert m-alert--default">
                                <p>Submitting the following information is optional. Your profile is never shared.</p>
                            </div>
                            <div className="m-form">
                                <div className="form-group m-form__group row">
                                    <label className="col-form-label col-lg-3" htmlFor="firsName">First Name</label>
                                    <div className="col-lg-9">
                                        <input type="text" onChange={this.handleChange} value={this.state.firstName} className="form-control m-input--air form-control-success m-input" id="firsName"/>
                                            <div className="form-control-feedback"></div>
                                    </div>
                                </div>
                                <div className="form-group m-form__group row">
                                    <label className="col-form-label col-lg-3" htmlFor="lastName">Last Name</label>
                                    <div className="col-lg-9">
                                        <input type="text" onChange={this.handleChange} value={this.state.lastName} className="form-control m-input--air form-control-success m-input" id="lastName"/>
                                        <div className="form-control-feedback"></div>
                                    </div>
                                </div>
                                <div className="form-group m-form__group row">
                                    <label className="col-form-label col-lg-3" htmlFor="email">Email</label>
                                    <div className="col-lg-9">
                                        <input type="email" onChange={this.handleChange} value={this.state.email} className="form-control m-input--air form-control-success m-input" id="email"/>
                                        <div className="form-control-feedback"></div>
                                    </div>
                                </div>
                                <div className="form-group m-form__group row">
                                    <label className="col-form-label col-lg-3" htmlFor="phone">Phone Number</label>
                                    <div className="col-lg-9">
                                        <input type="text" onChange={this.handleChange} value={this.state.phone} className="form-control m-input--air form-control-success m-input" id="phone"/>
                                        <div className="form-control-feedback"></div>
                                    </div>
                                </div>
                                <div className="form-group m-form__group row">
                                    <label className="col-form-label col-lg-3" htmlFor="gender">Gender</label>
                                    <div className="col-lg-9">
                                        <Select
                                            id="gender"
                                            className="form-control m-input  m-input--air  main-select"
                                            style={{minWidth:'120px'}}
                                            value={this.state.gender}
                                            onChange={(e) => { this._selectGender(e.target.value) }}
                                        >
                                            <MenuItem value={1}>Male</MenuItem>
                                            <MenuItem value={2}>Famele</MenuItem>
                                        </Select>
                                        <div className="form-control-feedback"></div>
                                    </div>
                                </div>
                                <div className="form-group m-form__group row">
                                    <label className="col-form-label col-lg-3" htmlFor="phone">Birthday</label>
                                    <div className="col-lg-9">
                                        <DateTime dateFormat="YYYY-MM-DD" value={this.state.birthday} inputProps={{className:"form-control m-input m-input--air"}}/>
                                        <div className="form-control-feedback"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="m-separator m-separator--dashed"></div>
                            <div className="text-right">
                                <button className="btn-outline-success m-btn--outline-2x m-btn btn">Submit</button>
                            </div>
                        </TabContainer>}
                        {value === 'schools' && <TabContainer>

                                <h4>Assign Schools</h4>
                                <div className="row form-group m-form__group">
                                    <label className="col-form-label col-md-3" htmlFor="gender">School</label>
                                    <div className="col-md-8">
                                        <Select
                                            id="gender"
                                            className="form-control m-input  m-input--air  main-select"
                                            style={{minWidth:'120px'}}
                                            value={this.state.activeSchool}
                                            onChange={(e) => { this._selectSchool(e.target.value) }}
                                        >
                                            {schools.map((item,i)=>{
                                                return <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                            })}

                                        </Select>
                                        <div className="form-control-feedback"></div>
                                    </div>

                                    <div className="col-md-1">
                                        <Button fab mini color="primary" aria-label="add" >
                                            <Icon>add</Icon>
                                        </Button>
                                    </div>
                                </div>
                            <div className="m-separator m-separator--dashed"></div>
                            <div className="text-right">
                                <button className="btn-outline-success m-btn--outline-2x m-btn btn">Submit</button>
                            </div>
                            </TabContainer>}
                        {value === 'homeRooms' && <TabContainer>

                            <h4>Assign Homeroom</h4>
                            <div className="row form-group m-form__group">
                                <label className="col-form-label col-md-3" htmlFor="gender">School</label>
                                <div className="col-md-8">
                                    <Select
                                        id="gender"
                                        multiple
                                        className="form-control m-input  m-input--air  main-select"
                                        style={{minWidth:'120px'}}
                                        value={this.state.activeHomerooms}
                                        onChange={(e) => { this._selectHomeRooms(e) }}
                                    >
                                        {homerooms.map((item,i)=>{
                                            return <MenuItem key={i} value={item.id}>{item.name}</MenuItem>
                                        })}

                                    </Select>
                                    <div className="form-control-feedback"></div>
                                </div>

                                <div className="col-md-1">
                                    <Button fab mini color="primary" aria-label="add" >
                                        <Icon>add</Icon>
                                    </Button>
                                </div>
                            </div>
                            <div className="m-separator m-separator--dashed"></div>
                            <div className="text-right">
                              <button className="btn-outline-success m-btn--outline-2x m-btn btn">Submit</button>
                            </div>
                        </TabContainer>}


                    </div>
                </div>

            </div>
        );
    }
}

TabSection.propTypes = {};

export default TabSection;
