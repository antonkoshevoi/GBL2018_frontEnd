import React, {Component} from 'react';
import ChartData from "../../data/Charts";
import Card from "../../components/ui/Card";
import studentsJson from '../../data/json/students.json';
import {
  GridList, GridListTile, GridListTileBar, IconButton
} from 'material-ui';
import {OldProgressBar} from "../../components/ui/LinearProgress";
import {NavLink} from "react-router-dom";

class ParentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...ChartData
    }
  }

  _renderStudents() {
    return studentsJson.students.map(function (student, i) {
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
              <IconButton color="contrast">

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
        <div className="col-sm-12 col-md-5 col-lg-5">
          <Card title="My Learners" icon="flaticon-list-3">
            <GridList cellHeight={250} cols={2}>
              {this._renderStudents()}
            </GridList>
          </Card>
        </div>
        <div className="col-sm-12 col-md-3 col-lg-3">
          {/*<Card title="Student App" icon="flaticon-list-3">*/}

          {/*</Card>*/}

          {/*<Card title="How To Movies" icon="flaticon-list-3">*/}

          {/*</Card>*/}
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4">
          {/*<Card title="Shop" icon="flaticon-list-3">*/}

          {/*</Card>*/}
          {/*<Card title="Unassigned Courses" icon="flaticon-list-3">*/}

          {/*</Card>*/}
        </div>
      </div>
    </div>
  }
}

export default ParentDashboard;