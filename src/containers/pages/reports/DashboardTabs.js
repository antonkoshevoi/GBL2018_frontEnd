import React, {Component} from 'react';
import { push } from 'react-router-redux';
import {
  Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Input, InputAdornment
} from 'material-ui';
import { NavLink } from "react-router-dom";
import { Search } from "material-ui-icons";
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
      this.setState({cols: 1})
    } else if (window.innerWidth > 767 && window.innerWidth <= 1024) {
      this.setState({cols: 2})
    } else if (window.innerWidth > 1024 && window.innerWidth <= 1367) {
      this.setState({cols: 3})
    } else if (window.innerWidth > 1367) {
      this.setState({cols: 4})
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

  _renderStudents() {
    const { goTo } = this.props;
    const students = this.props.getStudentsRequest.get('records').toJS();
    const defaultAvatar = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';

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
    const homerooms = this.props.getHomeroomsRequest.get('records').toJS();

    return homerooms.map(function (homeroom, i) {
      return (
        <GridListTile key={i} className="grid-tile">
          <img
            src="https://is5-ssl.mzstatic.com/image/thumb/Purple1/v4/7d/3c/43/7d3c4388-f8c2-466d-0848-b7ec85c0fd3b/pr_source.jpg/1200x630bb.jpg"
            alt={homeroom.id}/>
          <GridListTileBar
            className="myGridTileBar"
            title={<NavLink to={`/reports/homerooms/${homeroom.id}`}>{homeroom.name}</NavLink>}
            actionIcon={
              <IconButton color="default"></IconButton>
            }
          />
        </GridListTile>
      )
    })
  }

  _renderClassrooms() {
    const classrooms = this.props.getClassroomsRequest.get('records').toJS();

    return classrooms.map(function (classroom, i) {
      return (
        <GridListTile key={i} className="grid-tile">
          <img
            src="http://energydiet.canadiangeographic.ca/application/assets/img/2013/classroom-avatar.png"
            alt={classroom.id}/>
          <GridListTileBar
            className="myGridTileBar"
            title={<NavLink to={`/reports/classrooms/${classroom.id}`}>{classroom.crmName}</NavLink>}
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
        <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
          <div className="m-portlet__head d-inline-block">
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
              <GridList cellHeight={250} cols={cols}>
                {this._renderStudents()}
              </GridList>
            </TabContainer>}
            {value === 'classRooms' && <TabContainer>
              <GridList cellHeight={250} cols={cols}>
                {this._renderClassrooms()}
              </GridList>

            </TabContainer>}
            {value === 'homeRooms' && <TabContainer>
              <GridList cellHeight={250} cols={cols}>
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
