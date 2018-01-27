import React, {Component} from 'react';
import ChartData from "../../data/Charts";
import Card from "../../components/ui/Card";
import studentsJson from '../../data/json/students.json';
import {
  GridList, GridListTile, GridListTileBar, IconButton
} from 'material-ui';
import {OldProgressBar} from "../../components/ui/LinearProgress";
import {NavLink} from "react-router-dom";
import products from "../../data/json/products.json"
import DashboardStore from "../../components/pages/store/DashboardStore";
import HowToMovies from "../../components/pages/dashboard/HowToMovies";
import UnassignedCourses from "../../components/pages/dashboard/UnassignedCourses";

class ParentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...ChartData
    }
  }

  _renderStudents() {
    return studentsJson.students.slice(0,5).map(function (student, i) {
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
                  <br/>
                  <span className="text-right  d-block">35%</span>
                  <OldProgressBar complateValue="40" progressValue="10" type="progress"/>
                </div>
              )
            }
            actionIcon={
              <IconButton>

              </IconButton>
            }
          />

        </GridListTile>
      )
    })
  }

  render() {
    return <div className="fadeInLeft animated">

      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-4">
          <Card title="My Learners" icon="flaticon-list-3">
            <GridList cellHeight={250} cols={1}>
              {this._renderStudents()}
            </GridList>
          </Card>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-8">
          <div className="row">
              <div className="col-md-12">
                  <DashboardStore/>
              </div>
              <div className="col-md-12">
                  <HowToMovies/>
              </div>

              <div className="col-md-12">
                  <UnassignedCourses/>
              </div>

              <div className="col-md-12" style={{marginBottom:0}}>
                  <div className="m-portlet m-portlet--bordered-semi  cartItems">
                      <div className="m-portlet__body">
                          <div className="m-widget25">
                              <span className="m-widget25__price m--font-brand">Student App</span>
                              <span className="m-widget25__desc">My Os</span>
                          </div>
                          <div className="m-widget4 text-right">
                              <button className="btn m-btn btn-lg btn-success"> DOWNLOAD APP <i className="fa fa-download"></i> </button>
                          </div>
                      </div>
                  </div>


              </div>

          </div>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4">

        </div>
      </div>
    </div>
  }
}

export default ParentDashboard;