import React, {Component} from 'react';
import Card from "../../../../components/ui/Card";
import {MyPreloader} from '../../../../components/ui/table';
import {IconButton, CircularProgress, Icon} from '@material-ui/core';
import {translate} from 'react-i18next';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from "react-redux";
import {getSingleRecord} from '../../../../redux/students/actions';
import {selectGetSingleRecordRequest} from '../../../../redux/students/selectors';

class InfoSection extends Component {

  componentDidMount() {
    const studentId = this.props.match.params.id;
    this.props.getStudent(studentId);
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
    const {id}   = this.props.match.params;        
    const {studentRequest, data, t} = this.props;

    const loading = studentRequest.get('loading');
    const student = loading ? null : studentRequest.get('record').toJS();

    const defaultAvatar = '//s3.amazonaws.com/37assets/svn/765-default-avatar.png';

    return (
      <div className="row">
        <div className="col-md-3">
          <div className="imgBlock">
            {loading && <MyPreloader text="Loading..." color="primary"/>}
            <div className="avatar m--margin-bottom-20">
              {!loading && <img src={(student.avatar || defaultAvatar)} alt="" className="" />}
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
                        <span className="m-portlet__head-icon"><i className="la la-info"></i></span>              
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
                          <Icon className="material-icons">
                            edit_icon
                          </Icon>
                        </IconButton>
                      </NavLink>
                    </div>                
                    <div className="table-responsive">
                      <table className="table m-table m-table--head-separator-primary m-middle-table">
                        <tbody>
                        <tr>
                          <th>{t('firstName')}</th>
                          <td>{loading ? <CircularProgress color="primary"/> : student.firstName}</td>
                        </tr>
                        <tr>
                          <th>{t('lastName')}</th>
                          <td>{loading ? <CircularProgress color="primary"/> : student.lastName}</td>
                        </tr>
                        <tr>
                          <th>{t('birthday')}</th>
                          <td>{loading ? <CircularProgress color="primary"/> : (student.birthday || 'N / A')}</td>
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
                    {data.loading && <tr>
                      <td colSpan="3" className="text-center"><CircularProgress color="primary"/></td>
                    </tr>}
                    {!data.loading && this._renderCourseTable(data.data)}
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
    studentRequest: selectGetSingleRecordRequest(state)
  }),
  (dispatch) => ({
    getStudent: (id) => { dispatch(getSingleRecord(id)) }
  })
)(InfoSection);

export default withRouter(translate('translations')(InfoSection));
