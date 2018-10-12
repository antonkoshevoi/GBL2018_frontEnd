import React, {Component} from 'react';
import {Avatar, CircularProgress} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import UnassignedCourses from "./sections/UnassignedCourses";
import {connect} from "react-redux";
import {translate} from 'react-i18next';
import {selectRecords, selectGetRecordsRequest } from "../../redux/students/selectors";
import {getRecords } from "../../redux/students/actions";

import { selectStudentRequestsRequest, selectStudentStatusRequest} from "../../redux/parents/selectors";
import { getStudentRequests, acceptStudentRequest, declineStudentRequest, resetStudentRequest} from "../../redux/parents/actions"; 

import {getParentRecords} from "../../redux/store/actions";
import CreateStudentModal from "../students/modals/CreateStudentModal";
import {push} from 'react-router-redux';
import {withStyles} from '@material-ui/core/styles';
import FeaturedItems from "./sections/FeaturedItems";
import {selectRecords as storeItems}  from "../../redux/store/selectors";
import QuickLink from "./sections/QuickLink";
import ShoppingCart from "../pages/store/ShoppingCart";

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 80,
    height: 80,
    margin: 10,
    border: 'solid 3px white'
  },
  name: {
    color: 'white',
    display: 'block',
    marginTop: 35,
    marginBottom:5
  },
  profileBlock: {
    position:'relative',
    background: '#adadad',
    borderRadius: 5,
    margin: '3px 0',
    display: 'flex',
  },
  btnGroup: {
    display: 'flex',
    position: 'absolute',
    right: 15,
    top: 15
  },
  radiusLeft: {
    borderRadius: '5px 0 0 5px',
  },
  radiusRight: {
    borderRadius: '0 5px 5px 0',
  },
  username: {
    color: 'white',
  },
  progress: {
    display: 'flex',
    margin: '8px 5px',
    background: 'white',
    padding: 5,
    borderRadius: 7,
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
        const {getParentStudents, getStudentRequests, getCartItems} = this.props;
        getCartItems();
        getStudentRequests();
        getParentStudents();
    }
  
    componentWillReceiveProps(nextProps) {        
        const {getParentStudents, getStudentRequests, studentStatusRequest, resetStudentRequest} = this.props;
        
        if (!studentStatusRequest.get('success') && nextProps.studentStatusRequest.get('success')) {
            getStudentRequests();
            getParentStudents();
            resetStudentRequest();
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
  
    _renderStudents() {
        const {goTo} = this.props;
        const students = this.props.parentStudents.toJS();
        const requests = this.props.studentRequestsRequest.get('records').toJS();
        const {classes, t} = this.props;

        if (!students.length && !requests.length) {
            return <div className="display-1">
                <h1 className="text-center">{t('studentsNotFound')}</h1>
            </div>
        }

        return students.map(function (student, i) {
            return (
              <div key={i} className={classes.profileBlock} onClick={() => {
                goTo(`/reports/students/${student.id}`);
              }} style={{cursor: 'pointer'}}>
                <div className={classes.btnGroup}>
                  <div className="form-group-inline btn-group">
                    <NavLink to="/profile" className="btn m-btm btn-primary smaller-padding pull-right"><i className="la la-th"></i> {t('reportProfile')}</NavLink>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <Avatar alt={student.firstName} src={student.avatar} className={classes.bigAvatar}/>
                  <div className="info">
                    <h5 className={classes.name}>{(student.firstName || student.lastName) ? student.firstName + " " + student.lastName : student.username}</h5>
                    <span className={classes.username}>{student.username}</span>
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
        const {studentRequestsRequest, studentStatusRequest, classes, t} = this.props;
        const requests = studentRequestsRequest.get('records').toJS();
        const loading = studentStatusRequest.get('loading') ;

        if (!requests.length) {
            return '';
        }

        return requests.map((request, i) => {
            return (
            <div key={i} className={classes.profileBlock} style={{background: '#D3A9A9'}}>
              <div className={classes.btnGroup}>
                <div className="form-group-inline">
                  <button disabled={loading} className="btn m-btm btn-danger pull-right" onClick={() => { this._declineRequest(request.id) }}>{t('decline')}</button>
                  <button disabled={loading} className="btn m-btm btn-success pull-right m--margin-right-5" onClick={() => { this._acceptRequest(request.id) }}>{t('accept')}</button>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Avatar alt={request.student.name} src={request.student.avatar} className={classes.bigAvatar}/>
                <div className="info">
                  <h5 className={classes.name}>{request.student.name}</h5>
                  <span className={classes.username}>{request.student.username}</span>
                </div>
              </div>
            </div>);
        });
    }
  
    render() {    
        const {records, studentRequestsRequest, studentsRequest, t} = this.props;
        const loading = studentsRequest.get('loading') || studentRequestsRequest.get('loading');

        return <div className="fadeInLeft animated">
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4">
                <div className="m-portlet m-portlet--head-solid-bg m-portlet--info" style={{marginTop:15}}>
                  <div className="m-portlet__head">
                    <div className="m-portlet__head-caption">
                      <div className="m-portlet__head-title">
                        <span className="m-portlet__head-icon">
                          {loading && <CircularProgress color="inherit"/>}                    
                        </span>
                        <h3 className="m-portlet__head-text">
                          {t('myLearners')}
                        </h3>
                      </div>
                    </div>
                    <div className="m-portlet__head-tools">
                      <ul className="m-portlet__nav">
                        <li className="m-portlet__nav-item">                    
                            <a title={t('add')} onClick={() => { this._openCreateDialog() }} className=" pointer m-portlet__nav-link m-portlet__nav-link--icon">
                              <i className="la la-plus"></i>
                            </a>                    
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="m-portlet__body m--padding-top-5" style={{height: "100%"}}>
                    <div style={{maxHeight:330,overflowY:'auto',overflowX:'hidden'}}>
                      {!loading && this._renderStudentRequests()}
                      {!loading && this._renderStudents()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-7 col-xl-5">
                  <UnassignedCourses/>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
                <QuickLink className="m--margin-top-15"/>
              </div>
              <div className="col-md-6 col-lg-6 m--visible-tablet-and-mobile m--visible-desktop-lg m--margin-top-15">
                  <div>
                      <ShoppingCart preview = {true}/>
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-12 col-xl-8 margin-top-15">
                  <FeaturedItems data={records}/>
              </div>
              <div className="col-md-4 col-xl-4 m--hidden-tablet-and-mobile m--hidden-desktop-lg m--margin-top-15">
                  <div>
                      <ShoppingCart preview = {true}/>
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-8 col-lg-8">
                <div className="row">
                  <div className="col-md-12">
                  </div>
                </div>
              </div>
            </div>
            <CreateStudentModal
            isOpen={this.state.createModalIsOpen}
            onClose={() => {
              this._closeCreateDialog()
            }}
            onSuccess={() => {}}/>
        </div>
    }
}

ParentDashboard = connect(
    (state) => ({
        parentStudents: selectRecords(state),
        studentsRequest: selectGetRecordsRequest(state),
        studentRequestsRequest: selectStudentRequestsRequest(state),
        records: storeItems(state),
        studentStatusRequest: selectStudentStatusRequest(state)
    }),
    (dispatch) => ({
        getParentStudents: (params = {}) => { dispatch(getRecords(params)) },
        goTo: (url) => { dispatch(push(url)) },
        getCartItems: (params = {type: 'recent'}) => { dispatch(getParentRecords(params)) },
        getStudentRequests: () => {dispatch(getStudentRequests())},
        acceptStudentRequest: (id) => {dispatch(acceptStudentRequest(id))},
        declineStudentRequest: (id) => {dispatch(declineStudentRequest(id))},
        resetStudentRequest: () => {dispatch(resetStudentRequest())}    
    })
)(ParentDashboard);

export default withStyles(styles)(translate('translations')(ParentDashboard));   