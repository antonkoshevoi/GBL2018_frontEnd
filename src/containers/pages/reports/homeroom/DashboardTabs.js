import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Input, InputAdornment
} from 'material-ui';
import { NavLink } from "react-router-dom";
import { Search } from "material-ui-icons";
import {connect} from "react-redux";
import {selectStudentsRequest} from "../../../../redux/reports/homerooms/selectors";
import {getStudents} from "../../../../redux/reports/homerooms/actions";

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}

class DashboardTabs extends Component {
  static propTypes = {
    homeroomId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: "students",
      cols: 4,
      tabCentered: false,
      tabFullWidth: false,
      tabScrollButtons: false
    };
  }

  componentDidMount() {
    const { getStudents, homeroomId } = this.props;

    getStudents(homeroomId);

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

  _renderEmptyDataMsg(){
    return (
      <div className="display-1">
        <h1 className="text-center">No Students...</h1>
      </div>
    )
  }

  _renderStudents() {
    const students = this.props.getStudentsRequest.get('records').toJS();
    const defaultAvatar = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';

    if (this.props.getStudentsRequest.get('records') && !students.length) {
      return this._renderEmptyDataMsg();
    }

    return students.map(function (student, i) {
      return (
        <GridListTile key={i} className="grid-tile">
          <img src={(!student.avatar) ? defaultAvatar : student.avatar} alt={student.firstName}/>
          <GridListTileBar
            className="myGridTileBar"
            title={
              <NavLink to={`/reports/students/${student.id}`}>{student.firstName + " " + student.lastName}</NavLink>
            }
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

  render() {
    const { value, cols, tabCentered, tabFullWidth } = this.state;

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
  }),
  (dispatch) => ({
    getStudents: (id, params = {}) => {dispatch(getStudents(id, params))},
  })
)(DashboardTabs);

export default DashboardTabs;
