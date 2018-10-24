import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent, FormControl, InputLabel, FormHelperText,
  Icon, Toolbar, Typography, MenuItem, Select, FormGroup,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import {translate} from "react-i18next";
import Modal from '../../../components/ui/Modal';
import {selectRecords, selectGetRecordsRequest} from "../../../redux/students/selectors";
import {getRecords} from "../../../redux/students/actions";
import { selectAssignCourseCreditRequest } from "../../../redux/course-credits/selectors";
import { assignCourseCredit, resetAssignCourseCreditRequest } from "../../../redux/course-credits/actions";

class AssignStudentModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,    
    onSuccess: PropTypes.func.isRequired    
  };
  
  constructor (props) {
    super(props);
    this.state = {
        studentId: null,
        students: []
    };
  };

  
  componentWillReceiveProps(nextProps) {    
    const success = this.props.assignCourseCreditRequest.get('success');
    const nextSuccess = nextProps.assignCourseCreditRequest.get('success');

    if (!success && nextSuccess) {
      this._close();     
      this.props.onSuccess();
    }
    
    if (!this.props.isOpen && nextProps.isOpen) {
        this.props.getStudents();
    }    
  };
  
  _close () {     
    this.setState({studentId: null});  
    this.props.onClose();
    this.props.resetAssignCourseCreditRequest();
  };

  _handleSubmit (e) {            
    e.preventDefault();
       
    const { unassignedItem } = this.props;
    
    this.props.assignCourseCredit({
        creditId: unassignedItem.id,
        studentId: this.state.studentId
    });    
  };
  
  _renderStudents() {
    const students = this.props.students.toJS();

    return students.map((student, key) => (
      <MenuItem key={key} value={student.id}>
        {student.name}
      </MenuItem>
    ));
  }  

  _handleInputChange(event) {
    const {name, value} = event.target;    

    this.setState({[name]: value});
  }
  
  render() {
    const { isOpen, unassignedItem, assignCourseCreditRequest, getStudentsRequest, t } = this.props;
    const loading = assignCourseCreditRequest.get('loading') || getStudentsRequest.get('loading');
    const errors  = assignCourseCreditRequest.get('errors');
        
    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
              {loading ? (
                <CircularProgress className="m--margin-right-15" color='inherit'/>
              ) : (
                <Icon className="m--margin-right-15">persone</Icon>
              )}            
            <Typography type='title' color='inherit'>
              {t('assignStudent')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25'>        
            <div className='row'>                    
                <FormGroup row style={{minWidth: '500px'}}>
                    <div className='col-sm-6 col-lg-6 m-auto'>
                    {unassignedItem &&
                        <div className="text-center">
                          <img alt={unassignedItem.item.title} src={unassignedItem.item.thumbnail} width={70}/>
                          <p className='m--margin-top-25'><strong>{unassignedItem.item.title}</strong></p>
                        </div>}
                    </div>
                    <div className='col-sm-6 col-lg-6 m-auto'>    
                        <FormControl className='full-width form-inputs'>
                          <InputLabel htmlFor='studentId' shrink={!!this.state.studentId}>{t('selectStudent')}</InputLabel>
                          <Select
                            primarytext={t('selectStudent')}
                            id='studentId'
                            name='studentId'
                            value={this.state.studentId || ''}
                            onChange={(e) => {
                              this._handleInputChange(e)
                            }}> 
                            <MenuItem value={null} primarytext=""/>
                            {this._renderStudents()}
                          </Select>
                          {errors && errors.get('studentId') &&
                          <FormHelperText error>{errors.get('studentId').get(0)}</FormHelperText>}
                        </FormControl>            
                      </div>
                </FormGroup>          
            </div>       
        </DialogContent>
        
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='button'
            onClick={(e) => { this._handleSubmit(e) }}
            form='create-student-form'
            disabled={loading}
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
            color='primary'>
            {t('assign')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}
    
AssignStudentModal = connect(
  (state) => ({
    students: selectRecords(state),
    getStudentsRequest: selectGetRecordsRequest(state),
    assignCourseCreditRequest: selectAssignCourseCreditRequest(state)
  }),
  (dispatch) => ({
    getStudents: (params = {}) => { dispatch(getRecords(params)) },
    assignCourseCredit: (form, params = {}) => { dispatch(assignCourseCredit(form, params)) },
    resetAssignCourseCreditRequest: () => { dispatch(resetAssignCourseCreditRequest()) }
  })
)(AssignStudentModal);
  
export default translate('translations')(AssignStudentModal);