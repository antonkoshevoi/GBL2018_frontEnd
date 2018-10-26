import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,  
  Icon,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { selectAssignDemoStudentRequest } from "../../../redux/classrooms/selectors";
import { assignDemoStudent, resetAssignDemoStudentRequest } from "../../../redux/classrooms/actions";
import Modal from '../../../components/ui/Modal';
import AssignStudentForm from '../forms/AssignStudentForm';

class AssignStudentModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,    
    assignDemoStudent: PropTypes.func.isRequired,
    assignDemoStudentRequest: PropTypes.any.isRequired
  };
  
  constructor (props) {
    super(props);
    this.state = {
      form: {
        classroomId: '',
        studentId: ''
      }
    };
  };
  
  componentWillReceiveProps(nextProps) {
    const success = this.props.assignDemoStudentRequest.get('success');
    const nextSuccess = nextProps.assignDemoStudentRequest.get('success');

    if (!success && nextSuccess) {
      this._close();     
      this.props.onSuccess();
    }
  };

  _close () {     
    this.setState({
      form: {        
        classroomId: '',      
        studentId: ''
      }
    });
    this.props.onClose();
    this.props.resetAssignDemoStudentRequest();        
  };

  _onChange (form) {  
      this.setState({ form });
  };

  _onSubmit (e) {            
    e.preventDefault();    
    this.props.assignDemoStudent(this.state.form);    
  };

  render() {
    const { isOpen, assignDemoStudentRequest, t } = this.props;
    const loading = assignDemoStudentRequest.get('loading');        
    const errors  = assignDemoStudentRequest.get('errors');        
    
    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
              {loading ? (
                <CircularProgress className="m--margin-right-15" color='inherit'/>
              ) : (
                <Icon className="m--margin-right-15">persone</Icon>
              )}            
            <Typography variant="h6" color='inherit'>
              {t('assignStudent')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25'>
          <form id='create-student-form' onSubmit={(e) => { this._onSubmit(e) }}>            
            <AssignStudentForm
              onChange={(e) => { this._onChange(e) }}
              form={this.state.form}
              errors={errors}/>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='create-student-form'
            disabled={loading}            
            className='mt-btn-success pull-right btn btn-success mt-btn'
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
    assignDemoStudentRequest: selectAssignDemoStudentRequest(state)
  }),
  (dispatch) => ({
    assignDemoStudent: (form, params = {}) => { dispatch(assignDemoStudent(form, params)) },
    resetAssignDemoStudentRequest: () => { dispatch(resetAssignDemoStudentRequest()) },
  })
)(AssignStudentModal);
  
export default translate('translations')(AssignStudentModal);