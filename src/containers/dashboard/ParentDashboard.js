import React, {Component} from 'react';
import { Avatar, CircularProgress, withStyles } from '@material-ui/core';
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';
import { push } from 'react-router-redux';
import { selectStudentsRequest, selectStudentStatusRequest } from "../../redux/student-parents/selectors";
import { getStudents, acceptStudentRequest, declineStudentRequest, resetStudentRequest } from "../../redux/student-parents/actions";
import { selectDeleteRequest } from "../../redux/students/selectors";
import { deleteRecord, resetDeleteRecordRequest } from "../../redux/students/actions"; 
import { getParentRecords } from "../../redux/store/actions";
import { selectRecords as storeItems }  from "../../redux/store/selectors";
import DeleteButton from "../../components/ui/DeleteButton";
import CreateStudentModal from "../students/modals/CreateStudentModal";
import FeaturedItems from "./sections/FeaturedItems";
import UnassignedCourses from "./sections/UnassignedCourses";
import Subscriptions from "./sections/Subscriptions";
import QuickLink from "./sections/QuickLink";
import ShoppingCart from "./sections/ShoppingCart";
import Alerts from "./sections/Alerts";

const styles = {
  avatar: {
    width: 80,
    height: 80,    
    border: 'solid 3px white',
    margin: 10    
  },
  profileBlock: {
    position:'relative',
    background: '#f4f3f8',
    borderRadius: 5,
    marginBottom: '5px'   
    
  },
  btnGroup: {    
    position: 'absolute',
    right: 15,
    top: 15
  },
  progress: {
    display: 'flex',
    margin: '8px 0',
    background: 'white',
    padding: 5,
    borderRadius: 7
  },
  students: {    
    minHeight:340, 
    overflowY:'auto',
    overflowX:'hidden'
  }
};

class ParentDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createModalIsOpen: false
        }
    }

    componentDidMount() {
        const {getStudents, getCartItems} = this.props;
        getCartItems();
        getStudents();                
    }
  
    componentWillReceiveProps(nextProps) {        
        const {getStudents, studentStatusRequest, resetStudentRequest, deleteStudentRequest, resetDeleteStudentRequest} = this.props;
        
        if (!studentStatusRequest.get('success') && nextProps.studentStatusRequest.get('success')) {            
            getStudents();
            resetStudentRequest();
        }

        if (!deleteStudentRequest.get('success') && nextProps.deleteStudentRequest.get('success')) {
            getStudents();
            resetDeleteStudentRequest();
        }
    }  

    _openCreateDialog = () => {
        this.setState({createModalIsOpen: true});
    };
  
    _closeCreateDialog = () => {
        this.setState({createModalIsOpen: false});
    };

    _acceptRequest(id) {        
        this.props.acceptStudentRequest(id);
    };
  
    _declineRequest(id) {            
        this.props.declineStudentRequest(id);
    };
    
    _deleteStudent(id) {
        this.props.deleteStudent(id);
    }
  
    _renderStudents() {
        const {studentsRequest, goTo, classes, t} = this.props;
        const requests = studentsRequest.get('records').toJS();        

        if (!requests.length) {
            return <div className="display-1">
                <h2 className="text-center m--margin-top-75 m--margin-bottom-75">{t('studentsNotFound')}</h2>
            </div>
        }

        return requests.map((request, i) => {
            let student = request.student;

            if (!request.accepted) {
                return '';
            }
            
            return (
              <div key={i} className={classes.profileBlock} >
                <div className={classes.btnGroup}>
                  <div className="form-group-inline">
                    <button title={t('reports')} onClick={() => { goTo(`/reports/students/${student.id}`) }} className='btn btn-info m-btn m-btn--icon m-btn--icon-only m--margin-left-5 m-btn--pill'>
                        <i className='la la-search'></i>
                    </button>
                    <DeleteButton 
                        onClick={() => { this._deleteStudent(student.id) }}
                        btnName={t('delete')}
                        title={t('deleteLearnerConfirmation')}
                        icon="la la-close"
                        className="btn btn-danger m-btn m-btn--icon m-btn--icon-only m--margin-left-5 m-btn--pill"
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center pointer" onClick={() => { goTo(`/reports/students/${student.id}`); }} >
                  <Avatar alt={student.firstName} src={student.avatarSmall} className={classes.avatar} />
                  <div className="info">
                    <h5 className="m--margin-top-15 m--bottom-top-5">{student.name}</h5>
                    <span>{student.username}</span>
                    <div className={classes.progress}>
                      <div className="progress m-progress--sm" style={{minWidth: 80, marginRight:5}}>
                        <div title={t('completed')} className="progress-bar bg-success" role="progressbar" style={{width: student.completed + '%'}}></div>
                        <div title={t('inProgress')} className="progress-bar bg-warning" role="progressbar" style={{width: student.inProgress + '%'}}></div>
                      </div>
                      <div className="progress m-progress--sm" style={{minWidth: 110, marginLeft: 5}}>
                        <div title={t('averageGrade')} className="progress-bar bg-success" role="progressbar" style={{width: student.averageGrade + '%'}}></div>
                        <div title={t('averageGrade')} className="progress-bar bg-danger" role="progressbar" style={{width: (100 - Math.round(student.averageGrade)) + '%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>);
        });
    }

  _renderStudentRequests() {
        const {studentsRequest, studentStatusRequest, classes, t} = this.props;
        const requests = studentsRequest.get('records').toJS();
        const loading = studentStatusRequest.get('loading') ;

        if (!requests.length) {
            return '';
        }

        return requests.map((request, i) => {
            if (request.accepted) {
                return '';
            }
        
            return (
            <div key={i} className={classes.profileBlock} style={{background: '#D3A9A9'}}>
              <div className={classes.btnGroup}>
                <div className="form-group-inline">
                    <button title={t('accept')} disabled={loading} onClick={() => { this._acceptRequest(request.id) }} className='btn btn-success m-btn m-btn--icon m-btn--icon-only m--margin-left-5 m-btn--pill'>
                        <i className='la la-check'></i>
                    </button> 
                    <button title={t('decline')} disabled={loading} onClick={() => { this._declineRequest(request.id) }} className='btn btn-danger m-btn m-btn--icon m-btn--icon-only m--margin-left-5 m-btn--pill'>
                        <i className='la la-close'></i>
                    </button>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Avatar alt={request.student.name} src={request.student.avatarSmall} className={classes.avatar} />
                <div className="info">
                  <h5 className="m--margin-top-15 m--bottom-top-5">{request.student.name}</h5>
                  <span>{request.student.username}</span>
                </div>
              </div>
            </div>);
        });
    }
      
    render() {    
        const {storeItems, getStudents, studentsRequest, classes, t} = this.props;
        const loading = studentsRequest.get('loading');

        return <div className="fadeInLeft animated m--margin-left-15 m--margin-right-15">
            <Alerts />
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <div className='block-header border-b-blue'>                                                      
                    <button title={t('add')} onClick={() => { this._openCreateDialog(); }} className="btn m-btn m-btn--icon m-btn--icon-only pull-right bg-transparent m--margin-right-10">
                      <i className="display-5 fa fa-plus-circle"></i>
                    </button> 
                    <h3 className='m-portlet__head-text'>{t('myLearners')}</h3>
                </div>              
                <div className="m-portlet m-portlet--head-solid-bg">
                  <div className="m-portlet__body m--padding-top-10">
                    <div className={classes.students}>
                      {!loading && this._renderStudentRequests()}
                      {!loading && this._renderStudents()}
                      {loading && <div className="m-auto m--margin-100 text-center"><CircularProgress /></div>}    
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                  <Subscriptions/>
              </div>              
              <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                  <UnassignedCourses/>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-4">
                  <ShoppingCart/>
              </div>
              <div className="col-md-12 col-lg-6 col-xl-8">
                  <FeaturedItems data={storeItems}/>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4">
                <QuickLink />
              </div>         
            </div>
            <CreateStudentModal
            isOpen={this.state.createModalIsOpen}
            onClose={() => { this._closeCreateDialog() }}
            onSuccess={() => { getStudents() }}/>
        </div>
    }
}

ParentDashboard = connect(
    (state) => ({        
        storeItems: storeItems(state),
        studentsRequest: selectStudentsRequest(state),
        studentStatusRequest: selectStudentStatusRequest(state),
        deleteStudentRequest: selectDeleteRequest(state)
    }),
    (dispatch) => ({        
        goTo: (url) => { dispatch(push(url)) },
        getCartItems: (params = {type: 'recent'}) => { dispatch(getParentRecords(params)) },
        getStudents: () => {dispatch(getStudents())},        
        acceptStudentRequest: (id) => {dispatch(acceptStudentRequest(id))},
        declineStudentRequest: (id) => {dispatch(declineStudentRequest(id))},
        resetStudentRequest: () => {dispatch(resetStudentRequest())},
        
        deleteStudent: (id) => {dispatch(deleteRecord(id))},
        resetDeleteStudentRequest: () => {dispatch(resetDeleteRecordRequest())},
    })
)(ParentDashboard);

export default withStyles(styles)(withTranslation('translations')(ParentDashboard));   