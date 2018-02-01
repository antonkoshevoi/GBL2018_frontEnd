import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Tabs, Tab, Typography, GridList, GridListTile, GridListTileBar, IconButton, Icon,
  LinearProgress, Input, InputAdornment
} from 'material-ui';
import {getAllStudents} from "../../../../services/Students";
import {NavLink} from "react-router-dom";
import {Search} from "material-ui-icons";
import {OldProgressBar} from "../../../ui/LinearProgress";

function TabContainer(props) {
  return (
    <Typography component="div" style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  );
}


class TabSection extends Component {
  state = {
    value: "schools",
    cols: 4,
    tabCentered: false,
    tabFullWidth: false,
    tabScrollButtons: false
  };


  componentDidMount() {
    this._setGridCols();
    window.addEventListener("resize", this._setGridCols.bind(this));
  }


  //(temp) TODO need create UI component for Grids
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


  _renderStudents(students) {
    return students.map(function (student, i) {
      return (
        <GridListTile key={i} className="grid-tile">
          <img src={student.avatar} alt={student.first_name}/>

          <GridListTileBar
            className="myGridTileBar"
            title={<NavLink
              to={`/reports/students/${student.id}`}>{student.first_name + " " + student.last_name}</NavLink>}
            subtitle={
              (
                <div>
                  <span className="text-right d-block">75%</span>
                  <OldProgressBar correctValue="40" type="performance"/>
                  <br />
                  <span className="text-right  d-block">35%</span>
                  <OldProgressBar complateValue="40" progressValue="10" type="progress"/>
                </div>
              )
            }
            actionIcon={
              <IconButton color="contrast">

              </IconButton>
            }
          />

        </GridListTile>
      )
    })
  }


  render() {
    const {value, cols, tabCentered, tabFullWidth, tabScrollButtons} = this.state;
    return (
      <div className="row ">
        <div className="col-md-12">
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
                      scrollButtons={tabScrollButtons}
                    >
                      <Tab className="tab-header-item" value="schools" label="Schools"/>
                      <Tab className="tab-header-item" value="students" label="Students"/>
                      <Tab className="tab-header-item" value="classRooms" label="Classrooms"/>
                      <Tab className="tab-header-item" value="homeRooms" label="Homerooms"/>
                    </Tabs>
                  </div>
                  <div className="m-portlet__head-tools  col-sm-4">
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
              <div className="m-portlet__body m--full-height" >
                {value === 'schools' && <TabContainer>
                  <GridList cellHeight={250} cols={cols}>
                    { this._renderStudents(getAllStudents().students) }
                  </GridList>
                </TabContainer>}
                {value === 'students' && <TabContainer>
                  <GridList cellHeight={250} cols={cols}>
                    { this._renderStudents(getAllStudents().students) }
                  </GridList>
                </TabContainer>}

                {value === 'homeRooms' && <TabContainer>
                  <GridList cellHeight={250} cols={cols}>
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
