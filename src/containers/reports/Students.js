import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import {IconButton, CircularProgress} from '@material-ui/core';
import {selectStudentReportRequest} from "../../redux/reports/students/selectors";
import {selectGetSingleRecordRequest} from '../../redux/students/selectors';
import {getReport} from "../../redux/reports/students/actions";
import {getSingleRecord} from '../../redux/students/actions';
import {selectUserData} from "../../redux/user/selectors";
import {Preloader} from '../../components/ui/Preloader';
import {Date} from "../../components/ui/DateTime";
import Card from "../../components/ui/Card";
import EditStudentModal from "../students/modals/EditStudentModal";
import TabSection from "./students/TabSection";
import HasRole from "../middlewares/HasRole";

class Students extends Component {

    constructor(props) {
        super(props);
        this.state = {
            student: {},
            studentId: (this.props.match.params.id || 'my'),
            editModalIsOpen: false
        }
    }

    componentDidMount() {
        const {getReport, getStudent} = this.props;

        getReport(this.state.studentId);
        getStudent(this.state.studentId);
    }

    componentDidUpdate(prevProps) {
        const success = this.props.studentRequest.get('success');        

        if (success && !prevProps.studentRequest.get('success')) {
            this.setState({student: this.props.studentRequest.get('record').toJS()});
        }
    }

    _openEditDialog() {
        this.setState({editModalIsOpen: true});
    }
    
    _closeEditDialog() {
        this.setState({editModalIsOpen: false});
    }
    
    _onStudentUpdate() {
        this.props.getStudent(this.state.studentId);
    }

    _renderCourseTable(courses) {
        if (!courses.length) {
            return <tr>
                <td colSpan='4'><h5 className='text-center m-4'>{this.props.t('noData')}</h5></td>
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
            );
        });
    }

    render() {
        const {t, getReportRequest, studentRequest, userData} = this.props;
        const {student, studentId} = this.state;
        const data = getReportRequest.get('data').toJS();

        return (
            <div className="fadeInLeft animated ml-3 mr-3">
                <div>
                    <div className='block-header border-b-blue'>
                        <h3 className='m-portlet__head-text'>{t('reportsSnapshot')}</h3>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-sm-5 col-md-4 col-lg-3">
                            <div className="imgBlock">
                                {studentRequest.get('loading') ? <Preloader text={t('loading')} color="primary"/> :
                                <div className="avatar mb-4">
                                    <img src={student.avatar} alt="" className="" />
                                </div>}
                            </div>
                        </div>
                        <div className="col-sm-7 col-md-8 col-lg-3 mb-4">           
                            <div className="m-portlet  m-portlet--head-solid-bg">
                                <div className="m-portlet__head border-b-blue pr-0">
                                    <div className="m-portlet__head-caption">
                                        {student && <div>
                                            <HasRole roles={['Superadministrator', 'School', 'Teacher']}>
                                                <div className="pull-right mt-3 mr-3">
                                                    <IconButton color='primary' onClick={() => {this._openEditDialog()}}>                        
                                                        <i className="la  la-pencil display-6"></i>
                                                    </IconButton>                              
                                                </div>
                                            </HasRole>
                                            <HasRole roles={['Parents']}>
                                                {(userData.get('id') === student.ownerId) && <div className="pull-right mt-3 mr-3">
                                                    <IconButton title={t('edit')} color='primary' onClick={() => {this._openEditDialog() }}>                        
                                                        <i className="la  la-pencil display-6"></i>
                                                    </IconButton>                              
                                                </div>}
                                            </HasRole>
                                        </div>}
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
                                                    <td>{studentRequest.get('loading') ? <CircularProgress color="primary"/> : (student.username || '-')}</td>
                                                </tr>                    
                                                <tr>
                                                    <th>{t('firstName')}</th>
                                                    <td>{studentRequest.get('loading') ? <CircularProgress color="primary"/> : (student.firstName || '-')}</td>
                                                </tr>
                                                <tr>
                                                    <th>{t('lastName')}</th>
                                                    <td>{studentRequest.get('loading') ? <CircularProgress color="primary"/> : (student.lastName || '-')}</td>
                                                </tr>
                                                <tr>
                                                    <th>{t('birthday')}</th>
                                                    <td>{studentRequest.get('loading') ? <CircularProgress color="primary"/> : (student.birthday ? <Date time={student.birthday} /> : '-')}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>          
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-6 mb-4">
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
                                        { getReportRequest.get('loading') ?
                                        <tr>
                                            <td colSpan="3" className="text-center"><CircularProgress color="primary"/></td>
                                        </tr>
                                        : this._renderCourseTable(data) }
                                    </tbody>
                                </table>
                            </div>
                            </Card>
                        </div>
                        <EditStudentModal
                            isOpen={this.state.editModalIsOpen}
                            onClose={() => { this._closeEditDialog()}}
                            onSuccess={() => {this._onStudentUpdate()}}/>        
                    </div>
                    {!getReportRequest.get('loading') && <TabSection data={data} studentId={studentId} />}
                </div>        
            </div>
        );
    }
}

Students = connect(
        (state) => ({
        userData: selectUserData(state),
        studentRequest: selectGetSingleRecordRequest(state),
        getReportRequest: selectStudentReportRequest(state)
    }),
        (dispatch) => ({
        getStudent: (id) => {
            dispatch(getSingleRecord(id))
        },
        getReport: (id, params = {}) => {
            dispatch(getReport(id, params))
        }
    })
)(Students);

export default withRouter(withTranslation('translations')(Students));