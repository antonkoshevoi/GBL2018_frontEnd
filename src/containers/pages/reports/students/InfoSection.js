import React, {Component} from 'react';
import Card from "../../../../components/ui/Card";
import {MyPreloader} from '../../../../components/ui/table';
import {IconButton, CircularProgress} from '@material-ui/core';
import {translate} from 'react-i18next';
import {Edit} from "@material-ui/icons";
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {getSchoolReportStudent} from '../../../../redux/reports/actions';
import {selectGetStudentForReportRequest} from '../../../../redux/reports/selectors';

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
          <td>{item.classroomName}</td>
          <td>
            <div className="progress m-progress--sm">
              <div className="progress-bar bg-success" role="progressbar" style={{width: item.progress.completedProgress + '%'}}></div>
              <div className="progress-bar bg-warning" role="progressbar" style={{width: item.progress.inprogressProgress + '%'}}></div>
            </div>
          </td>
          <td>
            <div className="progress m-progress--sm">
              <div className="progress-bar bg-success" role="progressbar" style={{width: item.averageGrade + '%'}}></div>
              <div className="progress-bar bg-danger" role="progressbar" style={{width: (100 - item.averageGrade) + '%'}}></div>
            </div>
          </td>
        </tr>
      )
    })
  }

  render() {
    const {data} = this.props.data;
    const {id} = this.props.match.params;
    const coursesLoading = this.props.data.loading;
    const {getStudentForReportRequest, t} = this.props;
    const firstName = getStudentForReportRequest.get('record').toJS().firstName;
    const lastName = getStudentForReportRequest.get('record').toJS().lastName;
    const birthday = getStudentForReportRequest.get('record').toJS().birthday;
    const avatar = getStudentForReportRequest.get('record').toJS().avatar;
    const loading = getStudentForReportRequest.get('loading');

    const defaultAvatar = '//s3.amazonaws.com/37assets/svn/765-default-avatar.png';

    return (
      <div className="row">
        <div className="col-md-3">
          <div className="imgBlock">
            {loading && <MyPreloader text="Loading..." color="primary"/>}
            <div className="avatar m--margin-bottom-20">
              {!loading && <img src={(avatar) ? avatar : defaultAvatar} alt="" className="" />}
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-lg-4 m--margin-bottom-20">
            
      <div className="m-portlet  m-portlet--head-solid-bg">
        <div className="m-portlet__head">
          <div className="m-portlet__head-caption">
            <div className="m-portlet__head-title">
            
              <span className="m-portlet__head-icon">
        
                              <i className="la la-info"></i></span>
              

              <h3 className="m-portlet__head-text">
                {t('about')}
              </h3>
            </div>
            
          </div>
        </div>
        <div className='m-portlet__body position-relative'>
                  <div style={{position:'absolute', right:10, top:-60}}>
                    <NavLink to={`/reports/students/${id}/edit`}>
                      <IconButton color='primary'>
                        <Edit/>
                      </IconButton>
                    </NavLink>
                  </div>                
                <div className="table-responsive">
                  <table className="table m-table m-table--head-separator-primary m-middle-table">
                    <tbody>
                    <tr>
                      <th>{t('firstName')}</th>
                      <td>{loading && <CircularProgress color="primary"/>} {!loading && firstName}</td>
                    </tr>
                    <tr>
                      <th>{t('lastName')}</th>
                      <td>{loading && <CircularProgress color="primary"/>} {!loading && lastName}</td>
                    </tr>
                    <tr>
                      <th>{t('birthday')}</th>
                      <td>{loading && <CircularProgress color="primary"/>} {!loading && (birthday ? birthday : 'N / A')}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>          
        </div>
      </div>
      

            </div>
            <div className="col-lg-8 m--margin-bottom-20">
              <Card title={t('myCourses')} icon="fa fa-sitemap">                
                <div className="table-responsive">
                  <table className="table m-table  m-table--head-separator-primary m-middle-table">
                    <thead>
                    <tr>
                      <th>{t('course')}</th>
                      <th>{t('classroom')}</th>
                      <th>{t('progress')}</th>
                      <th>{t('performance')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coursesLoading && <tr>
                      <td colSpan="3" className="text-center"><CircularProgress color="primary"/></td>
                    </tr>}
                    {!coursesLoading && this._renderCourseTable(data)}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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

export default withRouter(translate('translations')(InfoSection));
