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
import { selectSubscribeStudentRequest } from "../../../redux/subscriptions/selectors";
import { subscribeStudent, resetSubscribeStudentRequest } from "../../../redux/subscriptions/actions";
import Modal from '../../../components/ui/Modal';
import AssignStudentForm from '../forms/AssignStudentForm';

class AssignStudentModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired
  };
  
  constructor (props) {
    super(props);
    this.state = {
      form: {        
        courseId: '',
        studentId: ''
      }
    };
  };
  
  componentWillReceiveProps(nextProps) {
    const success = this.props.subscribeStudentRequest.get('success');
    const nextSuccess = nextProps.subscribeStudentRequest.get('success');

    if (!success && nextSuccess) {
      this._close();     
      this.props.onSuccess();
    }
  };

  _close () {     
    this.setState({
      form: {
        courseId: '',
        studentId: ''
      }
    });
    this.props.onClose();
    this.props.resetSubscribeStudentRequest();        
  };

  _onChange (form) {  
      this.setState({ form });
  };

  _onSubmit (e) {            
    e.preventDefault();
    
    this.props.subscribeStudent({
        ...this.state.form, 
        subscriptionId: this.props.subscriptionId
    });    
  };

  render() {
    const { isOpen, subscribeStudentRequest, t } = this.props;
    const loading = subscribeStudentRequest.get('loading');        
    const errors  = subscribeStudentRequest.get('errors');        
    
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
    subscribeStudentRequest: selectSubscribeStudentRequest(state)
  }),
  (dispatch) => ({
    subscribeStudent: (form, params = {}) => { dispatch(subscribeStudent(form, params)) },
    resetSubscribeStudentRequest: () => { dispatch(resetSubscribeStudentRequest()) }
  })
)(AssignStudentModal);
  
export default translate('translations')(AssignStudentModal);