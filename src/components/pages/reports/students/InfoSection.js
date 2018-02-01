import React, {Component} from 'react';
import Card from "../../../ui/Card";
import {TablePreloader, MyPreloader} from '../../../ui/table';
import {IconButton, LinearProgress} from "material-ui";
import {translate} from 'react-i18next';
import {Delete, Edit} from "material-ui-icons";
import {OldProgressBar} from "../../../ui/LinearProgress";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {getSchoolReportStudent} from '../../../../redux/reports/actions';
import {selectGetStudentForReportRequest} from '../../../../redux/reports/selectors';
import {CircularProgress} from "material-ui";

class InfoSection extends Component {

  componentDidMount() {
    const studentId = this.props.match.params.id;
    this.props.getSchoolReportStudent(studentId);
  }

  _renderCourseTable(courses) {
    return courses.map(function (item, i) {
      return (
        <tr key={i}>
          <td>{item.course.crsTitle}</td>
          <td>
            <div className="progress m-progress--sm">
              <div className="progress-bar bg-success" role="progressbar"
                   style={{width: item.progress.completedProgress + '%'}}></div>
              <div className="progress-bar bg-warning" role="progressbar"
                   style={{width: item.progress.inprogresProgress + '%'}}></div>
              <div className="progress-bar bg-danger" role="progressbar"
                   style={{width: item.progress.not_started + '%'}}></div>
            </div>
          </td>
          <td>
            <div className="progress m-progress--sm">
              <div className="progress-bar bg-success" role="progressbar"
                   style={{width: item.progress.averageGrade + '%'}}></div>
              <div className="progress-bar bg-danger" role="progressbar"
                   style={{width: (100 - item.progress.averageGrade) + '%'}}></div>
            </div>
          </td>
        </tr>
      )
    })
  }

  render() {
    const { data } = this.props.data;
    const coursesLoading = this.props.data.loading;
    const {getStudentForReportRequest} = this.props;
    const firstName = getStudentForReportRequest.get('record').toJS().firstName;
    const lastName = getStudentForReportRequest.get('record').toJS().lastName;
    const birthday = getStudentForReportRequest.get('record').toJS().birthday;
    const avatar = getStudentForReportRequest.get('record').toJS().avatar;
    const loading = getStudentForReportRequest.get('loading');

    const defaultAvatar = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';

    return (
      <div className="row">
        <div className="col-md-3">
          <div className="imgBlock">
            {loading && <MyPreloader text="Loading..." color="accent"/>}
            <div className="avatar m--margin-bottom-20">
              {!loading && <img src={(avatar) ? avatar : defaultAvatar} alt="" className=""/>}
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-lg-6 m--margin-bottom-20">
              <Card title="About" icon="la la-info">
                <div className="table-responsive">
                  <table className="table m-table m-table--head-separator-primary m-middle-table">
                    <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      {/*<th className="text-center">Actions</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <th>First Name</th>
                      <td>{loading && <CircularProgress color="accent"/>} {!loading && firstName}</td>
                      {/*<td className="text-center">*/}
                      {/*<div className="actions">*/}
                      {/*<IconButton color='primary'*/}
                      {/*>*/}
                      {/*<Edit/>*/}
                      {/*</IconButton>*/}
                      {/*<IconButton color='accent'*/}
                      {/*>*/}
                      {/*<Delete/>*/}
                      {/*</IconButton>*/}
                      {/*</div>*/}
                      {/*</td>*/}
                    </tr>
                    <tr>
                      <th>Last Name</th>
                      <td>{loading && <CircularProgress color="accent"/>} {!loading && lastName}</td>
                    </tr>
                    <tr>
                      <th>Birthday</th>
                      <td>{(birthday) ? birthday : 'N / A'}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            <div className="col-lg-6 m--margin-bottom-20">
              <Card title="My Courses" icon="fa fa-sitemap">
                {/*<h1>No Info...</h1>*/}
                <div className="table-responsive">
                  <table className="table m-table  m-table--head-separator-primary m-middle-table">
                    <thead>
                    <tr>
                      <th>Courses</th>
                      <th>Progress</th>
                      <th>Performance</th>
                    </tr>
                    </thead>
                    <tbody>
                      {coursesLoading && <tr><td colSpan="3" className="text-center"><CircularProgress color="accent"/></td></tr>}
                      {!coursesLoading && this._renderCourseTable(data)}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            <div className="col-md-12 m--margin-bottom-10">
              <Card title="Remarks" icon="flaticon-edit">
                <h1>No Info...</h1>
              </Card>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

// InfoSection.propTypes = {};
InfoSection = connect(
  (state) => ({
    getStudentForReportRequest: selectGetStudentForReportRequest(state),
  }),
  (dispatch) => ({
    getSchoolReportStudent: (id) => {
      dispatch(getSchoolReportStudent(id))
    },
  })
)(InfoSection);

export default withRouter(translate('reports')(InfoSection));
