import React, {Component} from 'react';
import Card from "../../components/ui/Card";
import {
  GridList, GridListTile, GridListTileBar, IconButton, Tooltip
} from 'material-ui';
import {OldProgressBar} from "../../components/ui/LinearProgress";
import {NavLink} from "react-router-dom";
import DashboardStore from "../../components/pages/store/DashboardStore";
import HowToMovies from "../../components/pages/dashboard/HowToMovies";
import UnassignedCourses from "../../components/pages/dashboard/UnassignedCourses";
import {connect} from "react-redux";
import {selectGetParentRecordsRequest} from "../../redux/students/selectors";
import {getParentRecords} from "../../redux/students/actions";
import {Row, Table, TablePreloader, Tbody, Td} from "../../components/ui/table";

class ParentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { getParentStudents } = this.props;

    getParentStudents();
  }

  _renderStudentsList() {
    const students = this.props.getParentStudentsRequest.get('records');
    const loading = this.props.getParentStudentsRequest.get('loading');

    if (!loading && students.size === 0) {
      return (
        <tr>
          <td>
            <div className="table-message">
              <h2>Students Not Found...</h2>
            </div>
          </td>
        </tr>
      )
    }

    return students.map((student, key) => (
      <Row index={key} key={key}>
        <Td width='132px'>{student.get('username')}</Td>
        <Td width='132px'>{student.get('firstName')}</Td>
        <Td width='132px'>{student.get('lastName')}</Td>
      </Row>
    ));
  }

  _renderStudents() {
    const students = this.props.getParentStudentsRequest.get('records');

    if (!students.size) {
      return <div className="display-1">
        <h1 className="text-center">No Students found</h1>
      </div>
    }

    return students.map(function (student, i) {
      return (
        <GridListTile key={i} className="grid-tile">
          <img src={student.get('avatar')} alt={student.get('firstName')}/>

          <GridListTileBar
            className="myGridTileBar"
            title={<NavLink
              to={`/reports/students/${student.get('id')}`}>{student.get('firstName') + " " + student.get('lastName')}</NavLink>}
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
    const loading = this.props.getParentStudentsRequest.get('loading');

    return <div className="fadeInLeft animated">
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-4">
          <div className="m-portlet m-portlet--head-solid-bg m-portlet--info">
            <div className="m-portlet__head">
              <div className="m-portlet__head-caption">
                <div className="m-portlet__head-title">
                  <span className="m-portlet__head-icon">
                    <i className="flaticon-list-3"></i> :
                  </span>
                  <h3 className="m-portlet__head-text">
                    My Learners
                  </h3>
                </div>
              </div>
              <div className="m-portlet__head-tools">
                <ul className="m-portlet__nav">
                  <li className="m-portlet__nav-item">
                    <Tooltip id="tooltip-icon" title="Add" placement="top">
                      <a onClick={() => {
                        // this._handleSwitchMode('edit')
                      }} className=" pointer m-portlet__nav-link m-portlet__nav-link--icon">
                        <i className="la la-plus"></i>
                      </a>
                    </Tooltip>
                  </li>
                </ul>
              </div>
            </div>
            <div className="m-portlet__body m--padding-top-5" style={{height: "100%"}}>
              <Table>
                <Tbody>
                {loading &&
                <TablePreloader text="Loading..." color="primary"/>
                }
                { this._renderStudentsList() }
                </Tbody>
              </Table>
              {/*<GridList cellHeight={250} cols={1}>*/}
                {/*{this._renderStudents()}*/}
              {/*</GridList>*/}
            </div>
          </div>
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
            <div className="col-md-12" style={{marginBottom: 0}}>
              <div className="m-portlet m-portlet--bordered-semi  cartItems">
                <div className="m-portlet__body">
                  <div className="m-widget25">
                    <span className="m-widget25__price m--font-brand">Student App</span>
                    <span className="m-widget25__desc">My Os</span>
                  </div>
                  <div className="m-widget4 text-right">
                    <button className="btn m-btn btn-lg btn-success"> DOWNLOAD APP <i className="fa fa-download"></i>
                    </button>
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

ParentDashboard = connect(
  (state) => ({
    getParentStudentsRequest: selectGetParentRecordsRequest(state)
  }),
  (dispatch) => ({
    getParentStudents: (params = {}) => {dispatch(getParentRecords(params))},
  })
)(ParentDashboard);

export default ParentDashboard;