import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon,
    LinearProgress, Select, MenuItem, Button, Tooltip
} from '@material-ui/core';
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
        mode: "overviewMode",
        activeSchool: 1,
        activeHomerooms: [1,3],
        ...this.props.data
    };

    handleChange = (event, mode) => {
        this.setState({ mode });
    };



    _selectGender (gender) {
        this.setState({ gender })
    }

    _selectSchool (activeSchool) {
        this.setState({ activeSchool })
    }



    _selectHomeRooms(activeHomerooms) {
        this.setState({ activeHomerooms });
    };


    _switchMode(mode) {
        this.setState({mode})
    }

    render() {

        const {schools, homerooms} = this.props.data;
        const { mode } = this.state;
        return (
            <div >
                <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-caption">
                            <div className="m-portlet__head-title">
						<span className="m-portlet__head-icon">
                            {(mode === 'overviewMode') ?
							    <i className="flaticon-info"></i> :
                                <Tooltip  title="Back" placement="top">
                                     <a onClick={() => {this._switchMode('overviewMode')}} className="pointer la la-arrow-left"></a>
                                </Tooltip>
                            }
						</span>
                                <h3 className="m-portlet__head-text">
                                    {mode === 'overviewMode' ? 'Info' : 'Edit'}
                                </h3>
                            </div>
                        </div>
                        <div className="m-portlet__head-tools">
                            <ul className="m-portlet__nav">
                                <li className="m-portlet__nav-item">
                                    {mode === 'overviewMode' &&
                                    <Tooltip id="tooltip-icon" title="Edit" placement="top">
                                    <a onClick={() => {this._switchMode('editMode')}}
                                       className=" pointer m-portlet__nav-link m-portlet__nav-link--icon">
                                        <i className="la la-edit"></i>
                                    </a>
                                    </Tooltip>
                                    }
                                </li>
                            </ul>

                        </div>


                    </div>
                    <div className="m-portlet__body m--padding-top-5" style={{height:"100%"}}>
                        {mode === 'overviewMode' && <TabContainer>

                            <div className="m-widget1 m-widget1--paddingless">
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding align-items-center">
                                        <div className="col">
                                            <h3 className="m-widget1__title">First Name</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__number m--font-brand">{this.state.firstName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding align-items-center">
                                        <div className="col">
                                            <h3 className="m-widget1__title">Last Name</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__number m--font-brand">{this.state.lastName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding align-items-center">
                                        <div className="col">
                                            <h3 className="m-widget1__title">Email</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__number m--font-brand">{this.state.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-widget1__item">
                                    <div className="row m-row--no-padding align-items-center">
                                        <div className="col">
                                            <h3 className="m-widget1__title">Birthday</h3>
                                        </div>
                                        <div className="col m--align-right">
                                            <span className="m-widget1__number m--font-brand">{this.state.birthday.toDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabContainer>}

                        {mode == 'editMode' && <TabContainer>

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
                            <div className="row form-group m-form__group">
                                <label className="col-form-label col-md-3" htmlFor="gender">School</label>
                                <div className="col-md-8">
                                    <Select
                                        id="schools"
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

                            <div className="row form-group m-form__group">
                                <label className="col-form-label col-md-3" htmlFor="gender">Homerooms</label>
                                <div className="col-md-8">
                                    <Select
                                        id="homerooms"
                                        multiple
                                        className="form-control m-input  m-input--air  main-select"
                                        style={{minWidth:'120px'}}
                                        value={this.state.activeHomerooms}
                                        onChange={(e) => { this._selectHomeRooms(e.target.value) }}
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
