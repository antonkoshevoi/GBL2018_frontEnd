import React, {Component} from 'react';
import { push } from 'react-router-redux';
import {
  Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Input, InputAdornment
} from '@material-ui/core';
import { NavLink } from "react-router-dom";
import { Search } from "@material-ui/icons";
import {connect} from "react-redux";
import {
  selectClassroomsRequest, selectHomeroomsRequest,
  selectStudentsRequest
} from "../../../redux/reports/dashboard/selectors";
import {getClassrooms, getHomerooms, getStudents} from "../../../redux/reports/dashboard/actions";

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

class DashboardTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "classRooms",
      cols: 4,
      tabCentered: false,
      tabFullWidth: false,
      tabScrollButtons: false
    };
  }

  componentDidMount() {
    const { getStudents, getHomerooms, getClassrooms } = this.props;

    getStudents();
    getHomerooms();
    getClassrooms();

    this._setGridCols();
    window.addEventListener("resize", this._setGridCols.bind(this));
  }

  //TODO: need create UI component for Grids
  _setGridCols() {
    if (window.innerWidth <= 768) {
      this._setTabsOptions();
      this.setState({cols: 2})
    } else if (window.innerWidth > 767 && window.innerWidth <= 1024) {
      this.setState({cols: 4})
    } else if (window.innerWidth > 1024 && window.innerWidth <= 1367) {
      this.setState({cols: 6})
    } else if (window.innerWidth > 1367) {
      this.setState({cols: 7})
    }
  }

  _setTabsOptions() {
    if (window.innerWidth <= 575) {
      this.setState({
        tabCentered: true,
        tabFullWidth: true,
        tabScrollButtons: true
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  _renderEmptyDataMsg(message){
    return (
      <div className="display-1">
        <h1 className="text-center">{message}</h1>
      </div>
    )
  }

  _renderStudents() {
    const { goTo } = this.props;
    const students = this.props.getStudentsRequest.get('records').toJS();
    const defaultAvatar = '//s3.amazonaws.com/37assets/svn/765-default-avatar.png';

    if (this.props.getStudentsRequest.get('success') && !students.length) {
      return this._renderEmptyDataMsg('No Students...');
    }

    return students.map(function (student, i) {
      return (
        <GridListTile key={i} className="grid-tile" onClick={() => { goTo(`/reports/students/${student.id}`); }} style={{ cursor: 'pointer' }}>

          <img src={(!student.avatar) ? defaultAvatar : student.avatar} alt={student.firstName}/>
          <GridListTileBar
            className="myGridTileBar"
            title={(student.firstName || student.lastName) ? student.firstName + " " + student.lastName : student.username}
            subtitle={(
              <div>
                <span className="text-right d-block">{student.passRate} %</span>
                <div className="progress m-progress--sm">
                  <div title="Completed" className="progress-bar bg-success" role="progressbar" style={{width: student.completed + '%'}}></div>
                  <div title="In Progress" className="progress-bar bg-warning" role="progressbar" style={{width: student.inProgress + '%'}}></div>
                </div>
                <br/>
                <div className="progress m-progress--sm">
                  <div title="Average Grade" className="progress-bar bg-success" role="progressbar" style={{width: student.averageGrade + '%'}}></div>
                  <div title="Average Grade" className="progress-bar bg-danger" role="progressbar" style={{width: (100 - parseInt(student.averageGrade)) + '%'}}></div>
                </div>
              </div>
            )}
            actionIcon={
              <IconButton color="default"></IconButton>
            }
          />
        </GridListTile>
      )
    })
  }

  _renderHomerooms() {
    const { goTo } = this.props;
    const homerooms = this.props.getHomeroomsRequest.get('records').toJS();

    if (this.props.getHomeroomsRequest.get('success') && !homerooms.length) {
      return this._renderEmptyDataMsg('No Homerooms...');
    }

    return homerooms.map(function (homeroom, i) {
      return (
        <GridListTile key={i} className="grid-tile" onClick={() => { goTo(`/reports/homerooms/${homeroom.id}`); }} style={{ cursor: 'pointer' }}>

          <img src={homeroom.avatar} alt={homeroom.name}/>
          <GridListTileBar
            className="myGridTileBar"
            title={homeroom.name}
            subtitle={(
              <div>
                <span className="text-right d-block">{homeroom.passRate} %</span>
                <div className="progress m-progress--sm">
                  <div title="Completed" className="progress-bar bg-success" role="progressbar" style={{width: homeroom.completed + '%'}}></div>
                  <div title="In Progress" className="progress-bar bg-warning" role="progressbar" style={{width: homeroom.inProgress + '%'}}></div>
                </div>
                <br/>
                <div className="progress m-progress--sm">
                  <div title="Average Grade" className="progress-bar bg-success" role="progressbar" style={{width: homeroom.averageGrade + '%'}}></div>
                  <div title="Average Grade" className="progress-bar bg-danger" role="progressbar" style={{width: (100 - parseInt(homeroom.averageGrade)) + '%'}}></div>
                </div>
              </div>
            )}
            actionIcon={
              <IconButton color="default"></IconButton>
            }
          />
        </GridListTile>
      )
    })
  }

  _renderClassrooms() {
    const { goTo } = this.props;
    const classrooms = this.props.getClassroomsRequest.get('records').toJS();

    if (this.props.getClassroomsRequest.get('success') && !classrooms.length) {
      return this._renderEmptyDataMsg('No Classrooms...');
    }

    return classrooms.map(function (classroom, i) {
      return (
        <GridListTile key={i} className="grid-tile" onClick={() => { goTo(`/reports/classrooms/${classroom.id}`); }} style={{ cursor: 'pointer' }}>

          <img src={classroom.avatar} alt={classroom.crmName}/>
          <GridListTileBar
            className="myGridTileBar"
            title={classroom.crmName}
            subtitle={(
              <div>
                {/*<span className="text-right d-block">{classroom.passRate} %</span>*/}
                <div className="progress m-progress--sm">
                  <div title="Average Grade" className="progress-bar bg-success" role="progressbar" style={{width: classroom.averageGrade + '%'}}></div>
                  <div title="Average Grade" className="progress-bar bg-danger" role="progressbar" style={{width: (100 - parseInt(classroom.averageGrade)) + '%'}}></div>
                </div>
                <br/>
                <div className="progress m-progress--sm">
                  <div title="Completed" className="progress-bar bg-success" role="progressbar" style={{width: classroom.completed + '%'}}></div>
                  <div title="In Progress" className="progress-bar bg-warning" role="progressbar" style={{width: classroom.inProgress + '%'}}></div>
                </div>

              </div>
            )}
            actionIcon={
              <IconButton color="default"></IconButton>
            }
          />
        </GridListTile>
      )
    })
  }

  render() {
    const { value, cols, tabCentered, tabFullWidth, tabScrollButtons } = this.state;

    return (
      <div className="m--margin-top-50">
        <div className="m-portlet  m-portlet--info">
          <div className="m-portlet__head d-inline-block border-b-blue">
            <div className="row">
              <div className="m-portlet__head-tools text-left col-sm-8">
                <Tabs
                  className="main-tabs"
                  value={this.state.value}
                  onChange={this.handleChange}
                  scrollable={true}
                  centered={tabCentered}
                  fullWidth={tabFullWidth}
                >
                  <Tab className="tab-header-item" value="classRooms" label="Classrooms"/>
                  <Tab className="tab-header-item" value="homeRooms" label="Homerooms"/>
                  <Tab className="tab-header-item" value="students" label="Students"/>
                </Tabs>
              </div>
              <div className="m-portlet__head-tools col-sm-4">
                <Input
                  className="portlet-header-input"
                  id="search"
                  type='search'
                  placeholder="Search"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <Search/>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
            </div>
          </div>
          <div className="m-portlet__body" style={{height: "100%"}}>
            {value === 'students' && <TabContainer>
              <GridList cellHeight={200} cols={cols}>
                {this._renderStudents()}
              </GridList>
            </TabContainer>}
            {value === 'classRooms' && <TabContainer>
              <GridList cellHeight={200} cols={cols}>
                {this._renderClassrooms()}
              </GridList>

            </TabContainer>}
            {value === 'homeRooms' && <TabContainer>
              <GridList cellHeight={200} cols={cols}>
                {this._renderHomerooms()}
              </GridList>
            </TabContainer>}
          </div>
        </div>
        <Paper></Paper>
      </div>
    );
  }
}

DashboardTabs = connect(
  (state) => ({
    getStudentsRequest: selectStudentsRequest(state),
    getHomeroomsRequest: selectHomeroomsRequest(state),
    getClassroomsRequest: selectClassroomsRequest(state),
  }),
  (dispatch) => ({
    getStudents: (params = {}) => {dispatch(getStudents(params))},
    getHomerooms: (params = {}) => {dispatch(getHomerooms(params))},
    getClassrooms: (params = {}) => {dispatch(getClassrooms(params))},

    goTo: (url) => { dispatch(push(url)) }
  })
)(DashboardTabs);

export default DashboardTabs;
