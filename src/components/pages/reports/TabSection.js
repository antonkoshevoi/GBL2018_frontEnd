import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon,
    LinearProgress
} from 'material-ui';
import {getAllStudents} from "../../../services/Students";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


class TabSection extends Component {
    state = {
        value: "students",
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };


    _renderStudents(students) {
        return students.map(function (student,i) {
            return (
                <GridListTile key={i}>
                    <img src={student.avatar} alt={student.first_name} />

                    <GridListTileBar
                        className="myGridTileBar"
                        title={student.first_name + " " + student.last_name}
                        subtitle={
                            (
                                <div>
                                    <span className="text-right d-block">75%</span>
                                    <LinearProgress mode="determinate" className="gridProgressBar" value={75} />
                                    <br />
                                    <span  className="text-right  d-block">35%</span>
                                    <LinearProgress color="accent" className="gridProgressBar" mode="determinate" value={35} />
                                </div>
                            )
                        }
                        actionIcon={
                            <IconButton  color="contrast">

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
            <div className="m--margin-top-50" >
                <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                    <div className="m-portlet__head">
                        <div className="m-portlet__head-tools">
                            <Tabs
                                className="nav nav-tabs m-tabs-line m-tabs-line--primary m-tabs-line--2x main-tabs"
                                value={this.state.value}
                                onChange={this.handleChange}

                            >
                                <Tab className="tab-header-item" value="students" label="Students" />
                                <Tab className="tab-header-item" value="classRooms" label="Classrooms" />
                                <Tab className="tab-header-item" value="homeRooms" label="Homerooms" />
                            </Tabs>
                        </div>


                    </div>
                    <div className="m-portlet__body" style={{height:"100%"}}>
                        {value === 'students' && <TabContainer>
                            <GridList cellHeight={250} cols={3}>
                                { this._renderStudents(getAllStudents().students) }
                            </GridList>
                        </TabContainer>}
                        {value === 'classRooms' && <TabContainer>
                            <GridList cellHeight={250} cols={3}>
                                <h1>ClassRooms</h1>
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
        );
    }
}

TabSection.propTypes = {};

export default TabSection;
