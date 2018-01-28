import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon,
    LinearProgress, Input, InputAdornment
} from 'material-ui';
import classRooms from "../../../../data/json/classrooms.json";
import {NavLink} from "react-router-dom";
import {Search} from "material-ui-icons";
import {OldProgressBar} from '../../../ui/LinearProgress'

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


class TabSection extends Component {
    state = {
        value: "classRooms",
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };


    _renderSchoolStudents() {

        const schoolStudents = this.props.schoolStudents.toJS().records;
        const avatar = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';

        return schoolStudents.map(function (student,i) {
            return (
                <GridListTile key={i} className="grid-tile">
                    <img src={ (!student.avatar) ? avatar : student.avatar } alt={student.firstName} />

                    <GridListTileBar
                        className="myGridTileBar"
                        title={<NavLink to={`/reports/students/${student.id}`}>{student.firstName + " " + student.lastName}</NavLink>}
                        subtitle={
                            (
                                <div>
                                    <span className="text-right d-block">75%</span>
                                    <OldProgressBar correctValue="40" type="performance" />
                                    <br />
                                    <span  className="text-right  d-block">35%</span>
                                    <OldProgressBar complateValue="40" progressValue="10" type="progress" />
                                </div>
                            )
                        }
                        actionIcon={
                            <IconButton  color="default">

                            </IconButton>
                        }
                    />

                </GridListTile>
            )
        })
    }

    _renderSchoolHomerooms() {

        const schoolHomerooms = this.props.schoolHomerooms.toJS().records;
        console.log(schoolHomerooms);
        return schoolHomerooms.map(function (homeroom,i) {
            return (
                <GridListTile key={i} className="grid-tile">
                    <img src="https://www.usnews.com/dims4/USNEWS/90238a1/2147483647/thumbnail/652x435%3E/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2F03%2Fa4%2Fc21e092747eb902379ae57eb9987%2F141030-pfcquizgraduate.jpg" alt={homeroom.id} />

                    <GridListTileBar
                        className="myGridTileBar"
                        title={<NavLink to={`/reports/homerooms/${homeroom.id}`}>{homeroom.name}</NavLink>}
                        // subtitle={
                        //     (
                        //         <div>
                        //             <span className="text-right d-block">75%</span>
                        //             <OldProgressBar correctValue="40" type="performance" />
                        //             <br />
                        //             <span  className="text-right  d-block">35%</span>
                        //             <OldProgressBar complateValue="40" progressValue="10" type="progress" />
                        //         </div>
                        //     )
                        // }
                       actionIcon={
                          <IconButton  color="default">

                         </IconButton>
                       }
                    />

                </GridListTile>
            )
        })
    }

    _renderSchoolClassrooms() {

        const schoolClassrooms = this.props.schoolClassrooms;
        const avatar = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
        // console.log(schoolClassrooms);


        // return schoolClassrooms.map(function (classroom,i) {
        //     return (
        //         <GridListTile key={i} className="grid-tile">
        //             <img src={ (!classroom.avatar) ? avatar : classroom.avatar } alt={classroom.name} />
        //
        //             <GridListTileBar
        //                 className="myGridTileBar"
        //                 title={<NavLink to={`/reports/classroom/${classroom.id}`}>{classroom.name}</NavLink>}
        //                 // subtitle={
        //                 //     (
        //                 //         <div>
        //                 //             <span className="text-right d-block">75%</span>
        //                 //             <OldProgressBar correctValue="40" type="performance" />
        //                 //             <br />
        //                 //             <span  className="text-right  d-block">35%</span>
        //                 //             <OldProgressBar complateValue="40" progressValue="10" type="progress" />
        //                 //         </div>
        //                 //     )
        //                 // }
        //                 actionIcon={
        //                     <IconButton  color="default">
        //
        //                     </IconButton>
        //                 }
        //             />
        //
        //         </GridListTile>
        //     )
        // })

    }


    // _renderClassRooms() {
    //
    //     const schoolClassrooms = this.props.schoolClassrooms.toJS().records;
    //     const avatar = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
    //
    //     return schoolClassrooms.map(function (classroom,i) {
    //         return (
    //             <GridListTile key={i} className="grid-tile">
    //                 <img src={ (!classroom.avatar) ? avatar : classroom.avatar } alt={classroom.id} />
    //
    //                 <GridListTileBar
    //                     className="myGridTileBar"
    //                     title={<NavLink to={`/reports/classrooms/${classroom.id}`}>{classroom.name}</NavLink>}
    //                     subtitle={
    //                         (
    //                             <div>
    //                                 <span className="text-right d-block">75%</span>
    //                                     <OldProgressBar correctValue="40" type="performance" />
    //                                 <br />
    //                                 <span  className="text-right  d-block">35%</span>
    //                                 <OldProgressBar complateValue="40" progressValue="10" type="progress" />
    //                             </div>
    //                         )
    //                     }
    //                     actionIcon={
    //                         <IconButton  color="contrast">
    //
    //                         </IconButton>
    //                     }
    //                 />
    //
    //             </GridListTile>
    //         )
    //     })
    // }


    render() {
        const { value } = this.state;
        return (
            <div className="row ">
                <div className="col-md-12">
                    <div className="m--margin-top-50" >
                        <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
                            <div className="m-portlet__head">
                                <div className="row">

                                    <div className="m-portlet__head-tools text-left col-md-8"  >
                                        <Tabs
                                            className="nav nav-tabs m-tabs-line m-tabs-line--primary m-tabs-line--2x main-tabs"
                                            value={this.state.value}
                                            onChange={this.handleChange}
                                            scrollable

                                            scrollButtons="off"
                                            indicatorColor="secondary"
                                            textColor="secondary"

                                        >
                                            {/*<Tab className="tab-header-item" value="schools" label="Schools" />*/}
                                            <Tab className="tab-header-item" value="classRooms" label="Classrooms" />
                                            <Tab className="tab-header-item" value="homeRooms" label="Homerooms" />
                                            <Tab className="tab-header-item" value="students" label="Students" />
                                        </Tabs>
                                    </div>
                                    <div className="m-portlet__head-tools col-md-4">
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

                            </div>
                            <div className="m-portlet__body" style={{height:"100%"}}>
                                {/*{value === 'schools' && <TabContainer>*/}
                                    {/*<GridList cellHeight={250} cols={4}>*/}
                                        {/*{ this._renderStudents(getAllStudents().students) }*/}
                                    {/*</GridList>*/}
                                {/*</TabContainer>}*/}
                                {value === 'students' && <TabContainer>
                                    <GridList cellHeight={250} cols={4}>
                                        { this._renderSchoolStudents() }
                                    </GridList>
                                </TabContainer>}
                                {value === 'classRooms' && <TabContainer>
                                    <GridList cellHeight={250} cols={3}>
                                        {this._renderSchoolClassrooms()}
                                    </GridList>

                                </TabContainer>}
                                {value === 'homeRooms' && <TabContainer>
                                    <GridList cellHeight={250} cols={3}>
                                        { this._renderSchoolHomerooms() }
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

// TabSection.propTypes = {};

export default TabSection;
