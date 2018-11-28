import React, {Component} from 'react';
import Card from "../../../components/ui/Card";
import {MyPreloader} from '../../../components/ui/table';
import {IconButton, CircularProgress, Icon} from '@material-ui/core';
import {translate} from 'react-i18next';
import {connect} from "react-redux";
import {getSingleRecord} from '../../../redux/students/actions';
import {selectGetSingleRecordRequest} from '../../../redux/students/selectors';
import EditStudentModal from "../../students/modals/EditStudentModal";
import HasRole from "../../middlewares/HasRole";

class InfoSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
        student: null,
        editModalIsOpen: false
    }
  }
  
  componentDidMount() {        
        this.props.getStudent(this.props.studentId);
  }
  
  componentWillReceiveProps(nextProps) {
    const success = this.props.studentRequest.get('success');
    const nextSuccess = nextProps.studentRequest.get('success');
    
    if (!success && nextSuccess) {
        this.setState({student: nextProps.studentRequest.get('record').toJS()});
    }
  }  

  _openEditDialog() {
        this.props.getStudent(this.props.studentId);  
        this.setState({ editModalIsOpen: true });
  };
  
  _closeEditDialog() {      
        
        this.setState({ editModalIsOpen: false });
  };
  
  _onStudentUpdate() {
      this.props.getStudent(this.props.studentId);    
  }
    
  _renderCourseTable(courses) {
    if (!courses.length) {
        return <tr>
            <td colSpan='4'><h5 className='text-center m--margin-20'>{this.props.t('noData')}</h5></td>
        </tr>;
    }
    return courses.map(function (item, i) {
      return (
        <tr key={i}>
          <td className="align-middle">{item.courseName}</td>
          <td className="align-middle">{item.classroomName}</td>
          <td className="align-middle">
            <div className="progress m-progress--sm">
              <div className="progress-bar bg-success" role="progressbar" style={{width: item.progress.completedProgress + '%'}}></div>
              <div className="progress-bar bg-warning" role="progressbar" style={{width: item.progress.inprogressProgress + '%'}}></div>
            </div>
          </td>
          <td className="align-middle">
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
    const {studentRequest, data, t} = this.props;

    const loading       = !data.length;
    const student       = this.state.student;

    const defaultAvatar = '//s3.amazonaws.com/37assets/svn/765-default-avatar.png';

    return (
      <div className="row">
        <div className="col-sm-5 col-md-4 col-lg-3">
          <div className="imgBlock">
            {studentRequest.get('loading') ? <MyPreloader text="Loading..." color="primary"/> : 
            <div className="avatar m--margin-bottom-20">
              {student && <img src={(student.avatar || defaultAvatar)} alt="" className="" />}
            </div>}
          </div>
        </div>
         <div className="col-sm-7 col-md-8 col-lg-3 m--margin-bottom-20">           
            <div className="m-portlet  m-portlet--head-solid-bg">
              <div className="m-portlet__head border-b-blue m--padding-right-0">
                <div className="m-portlet__head-caption">
                    <HasRole roles={['Superadministrator', 'School', 'Teacher', 'Parents']}>
                        <div className="pull-right m--margin-top-10 m--margin-right-10">                      
                            <IconButton color='primary' onClick={() => { this._openEditDialog() }}>                        
                              <Icon className="material-icons">
                                edit_icon
                              </Icon>
                            </IconButton>                      
                        </div>
                    </HasRole>
                  <div className="m-portlet__head-title">
                    <span className="m-portlet__head-icon"><i className="display-5 la la-info"></i></span>              
                    <h3 className="m-portlet__head-text">
                      {t('about')}
                    </h3>
                  </div>
                </div>
              </div>
              <div className='m-portlet__body position-relative'>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                    <tr>
                      <th>{t('username')}</th>
                      <td>{!student ? <CircularProgress color="primary"/> : (student.username)}</td>
                    </tr>                    
                    <tr>
                      <th>{t('firstName')}</th>
                      <td>{!student ? <CircularProgress color="primary"/> : student.firstName}</td>
                    </tr>
                    <tr>
                      <th>{t('lastName')}</th>
                      <td>{!student ? <CircularProgress color="primary"/> : student.lastName}</td>
                    </tr>
                    <tr>
                      <th>{t('birthday')}</th>
                      <td>{!student ? <CircularProgress color="primary"/> : (student.birthday || 'N / A')}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>          
              </div>
           </div>      
        </div>
        <div className="col-sm-12 col-lg-6 m--margin-bottom-20">
          <Card title={t('myCourses')} icon="display-5 la la-sitemap">                
            <div className="table-responsive">
              <table className="table">
                <thead>
                <tr>
                  <th>{t('course')}</th>
                  <th>{t('classroom')}</th>
                  <th>{t('progress')}</th>
                  <th>{t('performance')}</th>
                </tr>
                </thead>
                <tbody>
                {loading && <tr>
                  <td colSpan="3" className="text-center"><CircularProgress color="primary"/></td>
                </tr>}
                {!loading && this._renderCourseTable(data)}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <EditStudentModal
          isOpen={this.state.editModalIsOpen}
          onClose={() => { this._closeEditDialog() }}
          onSuccess={() => { this._onStudentUpdate() }}/>        
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

export default translate('translations')(InfoSection);
