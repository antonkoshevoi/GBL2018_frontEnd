import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent, DialogContentText, FormControl, InputLabel, FormHelperText,
  Icon, IconButton,
  Toolbar, Typography, MenuItem, Select, Paper, FormGroup,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import Modal from '../../ui/Modal';
import {selectRecords} from "../../../redux/students/selectors";
import {getRecords} from "../../../redux/students/actions";
import { selectAssignCourseCreditRequest } from "../../../redux/classrooms/selectors";
import { assignCourseCreditRequest, resetAssignCourseCreditRequest } from "../../../redux/classrooms/actions";

class AssignStudentModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,    
    onSuccess: PropTypes.func.isRequired,    
    course: PropTypes.object.isRequired
  };
  
  constructor (props) {
    super(props);
    this.state = {
        studentId: null,
        students: []
    };
  };

  componentDidMount() {    
    const {getStudents} = this.props;    
    getStudents();
  }
  
  componentWillReceiveProps(nextProps) {    
    const success = this.props.assignCourseCreditRequest.get('success');
    const nextSuccess = nextProps.assignCourseCreditRequest.get('success');

    if (!success && nextSuccess) {
      this._close();     
      this.props.onSuccess();
    } 
  };
  
  _close () {     
    this.setState({studentId: null});  
    this.props.onClose();
    this.props.resetAssignCourseCreditRequest();
  };

  _handleSubmit (e) {            
    e.preventDefault();
       
    const { course } = this.props;
    
    this.props.assignCourseCredit({
        creditId: course.id,
        studentId: this.state.studentId
    });    
  };
  
  _renderStudents() {
    const students = this.props.students.toJS();

    return students.map((student, key) => (
      <MenuItem key={key} value={student.id}>
        {student.firstName} {student.lastName}
      </MenuItem>
    ));
  }  

  _handleInputChange(event) {
    const {name, value} = event.target;    

    this.setState({[name]: value});
  }
  
  render() {
    const { isOpen, course, assignCourseCreditRequest } = this.props;
    const loading = assignCourseCreditRequest.get('loading');
    const errors  = assignCourseCreditRequest.get('errors');
        
    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>
            <IconButton color="inherit" aria-label='Close'>
              {loading ? (
                <CircularProgress style={{float: 'right'}} color='inherit'/>
              ) : (
                <Icon>persone</Icon>
              )}
            </IconButton>
            <Typography type='title' color='inherit'>
              Assign Student
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25'>
        
        <div className='row'>
          <Paper className='full-width' style={{boxShadow:'0 0 0 0'}}>            
            <FormGroup row style={{minWidth: '500px'}}>
                <div className='col-sm-6 col-lg-6 m-auto'>
                {course &&
                    <div className="text-center">
                      <img src={course.image} width={70}/>
                      <p className='m--margin-top-25'><strong>{course.title}</strong></p>
                    </div>}
                </div>
                <div className='col-sm-6 col-lg-6 m-auto'>    
                    <FormControl className='full-width form-inputs'>
                      <InputLabel htmlFor='studentId' shrink={!!this.state.studentId}>Select Student</InputLabel>
                      <Select
                        primarytext="Select Student"
                        id='studentId'
                        name='studentId'
                        value={this.state.studentId}
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
          </Paper>
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
            Assign
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}
    
AssignStudentModal = connect(
  (state) => ({
    students: selectRecords(state),
    assignCourseCreditRequest: selectAssignCourseCreditRequest(state)
  }),
  (dispatch) => ({
    getStudents: (params = {}) => { dispatch(getRecords(params)) },
    assignCourseCredit: (form, params = {}) => { dispatch(assignCourseCreditRequest(form, params)) },
    resetAssignCourseCreditRequest: () => { dispatch(resetAssignCourseCreditRequest()) }
  })
)(AssignStudentModal);
  
export default AssignStudentModal;