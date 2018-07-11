import React, {Component} from 'react';
import {Avatar, CircularProgress, Tooltip} from '@material-ui/core';
import {NavLink} from "react-router-dom";
import UnassignedCourses from "./sections/UnassignedCourses";
import {connect} from "react-redux";
import {translate} from 'react-i18next';
import {selectRecords, selectGetRecordsRequest} from "../../redux/students/selectors";
import {getRecords} from "../../redux/students/actions";
import {getParentRecords} from "../../redux/store/actions";
import {Row, Td} from "../../components/ui/table";
import CreateStudentModal from "../students/modals/CreateStudentModal";
import {push} from 'react-router-redux';
import {GridOn} from "@material-ui/icons";
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import FeaturedItems from "./sections/FeaturedItems";
import {selectRecords as storeItems}  from "../../redux/store/selectors";
import QuickLink from "./sections/QuickLink";
import ShoppingCart from "../pages/store/shopping-cart/ShoppingCart";

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
    background: '#9600ff',
    borderRadius: 5,
    margin: '3px 0',
    display: 'flex',
  },
  btnGroup: {
    display: 'flex',
    position: 'absolute',
    right: 10,
    top: 10
  },
  btnProfile: {
    color: 'white',
    background: '#2e40d4',
    padding: 5,
    width: '100%',
    display: 'flex'
  },
  icon: {
    height: 14,
    width: 14,
    margin: '3px 0'
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
    const {getParentStudents} = this.props;
    this.props.getRecords();
    getParentStudents();
  }

  _openCreateDialog = () => {
    this.setState({createModalIsOpen: true});
  };
  _closeCreateDialog = () => {
    this.setState({createModalIsOpen: false});
  };

  _renderStudents() {
    const {goTo} = this.props;
    const students = this.props.parentStudents.toJS();
    const {classes, t} = this.props;

    if (!students.length) {
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
              <NavLink to="/profile" className={classNames(classes.btnProfile, classes.radiusLeft)}>
                <GridOn className={classes.icon}/>
                {t('reportProfile')}
              </NavLink>
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
                  <div title={t('averageGrade')} className="progress-bar bg-danger" role="progressbar" style={{width: (100 - parseInt(student.averageGrade)) + '%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    const students = this.props.parentStudents;
    const loading = this.props.getParentStudentsRequest.get('loading');
    const {records, t} = this.props;

    return <div className="fadeInLeft animated">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4">
          <div className="m-portlet m-portlet--head-solid-bg m-portlet--info" style={{marginTop:15}}>
            <div className="m-portlet__head">
              <div className="m-portlet__head-caption">
                <div className="m-portlet__head-title">
                  <span className="m-portlet__head-icon">
                    {loading && <CircularProgress color="inherit"/>}
                    {!loading && <span>{students.size}</span>}
                  </span>
                  <h3 className="m-portlet__head-text">
                    {t('myLearners')}
                  </h3>
                </div>
              </div>
              <div className="m-portlet__head-tools">
                <ul className="m-portlet__nav">
                  <li className="m-portlet__nav-item">
                    <Tooltip id="tooltip-icon" title={t('add')} placement="top">
                      <a onClick={() => {
                        this._openCreateDialog()
                      }} className=" pointer m-portlet__nav-link m-portlet__nav-link--icon">
                        <i className="la la-plus"></i>
                      </a>
                    </Tooltip>
                  </li>
                </ul>
              </div>
            </div>
            <div className="m-portlet__body m--padding-top-5" style={{height: "100%"}}>
              <div style={{maxHeight:320,overflowY:'auto',overflowX:'hidden'}}>
                {!loading && this._renderStudents()}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-7 col-xl-5">
            <UnassignedCourses/>
        </div>
        <div className="col-md-6 col-lg-6 col-xl-3">
          <QuickLink style={{marginTop:15, height:'80%'}}/>
        </div>
        <div className="col-md-6 col-lg-6 m--visible-tablet-and-mobile m--visible-desktop-lg" style={{marginTop:15}}>
            <div>
                <ShoppingCart preview = {true}/>
            </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-lg-12 col-xl-8 margin-top-15">
          <FeaturedItems data={records}/>
        </div>

        <div className="col-md-4 col-xl-4 m--hidden-tablet-and-mobile m--hidden-desktop-lg" style={{marginTop:15}}>
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
    getParentStudentsRequest: selectGetRecordsRequest(state),
    records: storeItems(state),

  }),
  (dispatch) => ({
    getParentStudents: (params = {}) => {
      dispatch(getRecords(params))
    },
    goTo: (url) => {
      dispatch(push(url))
    },
    getRecords: (params = {type: 'recent'}) => {
      dispatch(getParentRecords(params))
    },
  })
)(ParentDashboard);

export default withStyles(styles)(translate('translations')(ParentDashboard));