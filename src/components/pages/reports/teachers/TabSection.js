import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon,
    LinearProgress, Input, InputAdornment
} from '@material-ui/core';
import {getAllStudents} from "../../../../services/Students";
import classRooms from "../../../../data/json/classrooms.json";
import {NavLink} from "react-router-dom";
import {Search} from "@material-ui/icons";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


class TabSection extends Component {
    state = {
        value: "schools",
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };


    _renderStudents(students) {
        return students.map(function (student,i) {
            return (
                <GridListTile key={i} className="grid-tile">
                    <img src={student.avatar} alt={student.first_name} />

                    <GridListTileBar
                        className="myGridTileBar"
                        title={<NavLink to={`/reports/students/${student.id}`}>{student.first_name + " " + student.last_name}</NavLink>}
                        subtitle={
                            (
                                <div>
                                    <span className="text-right d-block">75%</span>
                                    <LinearProgress mode="determinate" className="gridProgressBar" value={75} />
                                    <br />
                                    <span  className="text-right  d-block">35%</span>
                                    <LinearProgress color="primary" className="gridProgressBar" mode="determinate" value={35} />
                                </div>
                            )
                        }
                        actionIcon={
                            <IconButton  color="primary">

                            </IconButton>
                        }
                    />

                </GridListTile>
            )
        })
    }


    _renderClassRooms(classrooms) {
        return classrooms.map(function (classroom,i) {
            return (
                <GridListTile key={i} className="grid-tile">
                    <img src={classroom.avatar} alt={classroom.first_name} />

                    <GridListTileBar
                        className="myGridTileBar"
                        title={<NavLink to={`/reports/classrooms/${classroom.id}`}>{classroom.name}</NavLink>}
                        subtitle={
                            (
                                <div>
                                    <span className="text-right d-block">75%</span>
                                    <LinearProgress mode="determinate" className="gridProgressBar" value={75} />
                                    <br />
                                    <span  className="text-right  d-block">35%</span>
                                    <LinearProgress color="primary" className="gridProgressBar" mode="determinate" value={35} />
                                </div>
                            )
                        }
                        actionIcon={
                            <IconButton  color="primary">

                            </IconButton>
                        }
                    />

                </GridListTile>
            )
        })
    }


    render() {
        const { value } = this.state;
        return (
            <div className="row ">
                <div className="col-md-12">
                    <div className="m--margin-top-50" >
                        <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                            <div className="m-portlet__head">
                                <div className="m-portlet__head-tools">
                                    <Tabs
                                        className="nav nav-tabs m-tabs-line m-tabs-line--primary m-tabs-line--2x main-tabs"
                                        value={this.state.value}
                                        onChange={this.handleChange}

                                    >
                                        <Tab className="tab-header-item" value="schools" label="Schools" />
                                        <Tab className="tab-header-item" value="students" label="Students" />
                                        <Tab className="tab-header-item" value="classRooms" label="Classrooms" />
                                        <Tab className="tab-header-item" value="homeRooms" label="Homerooms" />
                                    </Tabs>
                                </div>

                            <div className="m-portlet__head-tools">
                                <Input
                                    className="portlet-header-input"
                                    id="search"
                                    type='search'
                                    placeholder="Search"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            >
                                                <Search/>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </div>
                            </div>
                            <div className="m-portlet__body" style={{height:"100%"}}>
                                {value === 'schools' && <TabContainer>
                                    <GridList cellHeight={250} cols={4}>
                                        { this._renderStudents(getAllStudents().students) }
                                    </GridList>
                                </TabContainer>}
                                {value === 'students' && <TabContainer>
                                    <GridList cellHeight={250} cols={4}>
                                        { this._renderStudents(getAllStudents().students) }
                                    </GridList>
                                </TabContainer>}
                                {value === 'classRooms' && <TabContainer>
                                    <GridList cellHeight={250} cols={3}>
                                        {this._renderClassRooms(classRooms)}
                                    </GridList>

                                </TabContainer>}
                                {value === 'homeRooms' && <TabContainer>
                                    <GridList cellHeight={250} cols={3}>
                                        { this._renderStudents(getAllStudents().students) }
                                    </GridList>
                                </TabContainer>}


                            </div>
                        </div>

                        <Paper >


                        </Paper>
                    </div>
                </div>
            </div>

        );
    }
}

TabSection.propTypes = {};

export default TabSection;
