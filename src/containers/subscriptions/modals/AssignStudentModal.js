import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,  
  Icon,
  Toolbar, Typography,
  Divider, Button, DialogActions,
  FormControl, FormHelperText, InputLabel, MenuItem, Select
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { selectSubscribeStudentRequest } from "../../../redux/subscriptions/selectors";
import { subscribeStudent, resetSubscribeStudentRequest } from "../../../redux/subscriptions/actions";
import { selectGetParentRecordsRequest, selectRecords as selectStoreItems } from "../../../redux/store/selectors";
import { getParentRecords } from "../../../redux/store/actions";
import { selectGetRecordsRequest, selectRecords as selectStudents} from "../../../redux/students/selectors";
import { getRecords } from "../../../redux/students/actions";
import Modal from '../../../components/ui/Modal';

class AssignStudentModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired
  };
  
  constructor (props) {
    super(props);
    this.state = {           
        courseId: '',
        studentId: ''      
    };
  }
  
  componentDidUpdate(prevProps) {
    const success = this.props.subscribeRequest.get('success');    

    if (success && !prevProps.subscribeRequest.get('success')) {
      this._close();     
      this.props.onSuccess();
    }
    
    if (this.props.isOpen && !prevProps.isOpen) {
        this.props.getStudents();    
        this.props.getStoreItems();        
    }
  }
  
  _close () {     
    this.setState({      
        courseId: '',
        studentId: ''      
    });
    this.props.onClose();
    this.props.resetSubscribeRequest();        
  }

  _handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({      
      [name]: value
    });
  }

  _onSubmit (e) {            
    e.preventDefault();
    
    this.props.subscribeStudent({
        courseId: this.state.courseId, 
        studentId: this.state.studentId, 
        subscriptionId: this.props.subscriptionId
    });    
  }
  
  _renderStudents() {
    const { parentStudents } = this.props;    
    return parentStudents.toJS().map((student, key) => (
      <MenuItem key={key} value={ student.id }>{ student.name }</MenuItem>
    ));    
  }
  
  _renderStoreItems() {
    const { storeItems } = this.props;
   
    return storeItems.map((storeItem, key) => (
      <MenuItem key={key} value={ storeItem.get('courseId') }>{ storeItem.get('title') }</MenuItem>
    ));    
  }    
  
  _renderForm()
  {
    const { subscribeRequest, parentRecordsRequest, parentStudentsRequest, parentStudents, t } = this.props;        
    const errors  = subscribeRequest.get('errors');
    
    return (
      <div className='row'>
        <div className='col-sm-8 col-lg-12 m-auto'>
        {(parentRecordsRequest.get('success') && parentStudentsRequest.get('success')) ? (
            <div>
                {parentStudents.size ?
                <form id='create-student-form' onSubmit={(e) => { this._onSubmit(e) }}>
                    <FormControl className='full-width form-inputs'>              
                      <InputLabel htmlFor='name-error'>{t('course')}</InputLabel>                  
                      <Select                          
                          name='courseId'
                          style={{minWidth: 200}}
                          onChange={(e) => { this._handleInputChange(e) }}
                          value={this.state.courseId || ''}>
                        <MenuItem value={null} primarytext=""/>
                        { this._renderStoreItems() }
                      </Select>
                      {errors && errors.get('courseId') && <FormHelperText error>{ errors.get('courseId').get(0) }</FormHelperText>}            
                    </FormControl>
                    <FormControl className='full-width form-inputs'>
                      <InputLabel htmlFor='name-error'>{t('student')}</InputLabel>                 
                      <Select                          
                          name='studentId'
                          style={{minWidth: 200}}
                          onChange={(e) => { this._handleInputChange(e) }}
                          value={this.state.studentId || ''}>
                        <MenuItem value={null} primarytext=""/>
                        { this._renderStudents() }
                      </Select>
                      {errors && errors.get('studentId') && <FormHelperText error>{ errors.get('studentId').get(0) }</FormHelperText>}            
                    </FormControl>
                 </form> : 
                <div className="alert alert-warning">{t('youNotHaveStudents')}</div>
                }
            </div>
        ) : (
            <div className="text-center my-5 mx-5"><CircularProgress color="primary"/></div>
        )}
        </div>
      </div>
    );      
  }

  render() {
    const { isOpen, subscribeRequest, parentStudentsRequest, parentStudents, t } = this.props;    
    const loading = subscribeRequest.get('loading');        
    
    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
            {loading ? (
              <CircularProgress className="mr-3" color='inherit'/>
            ) : (
              <Icon className="mr-3">persone</Icon>
            )}            
            <Typography variant="h6" color='inherit'>
              {t('assignStudent')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='mt-4'>                      
            {this._renderForm()}         
        </DialogContent>
        <Divider className='full-width'/>
        {parentStudentsRequest.get('success') &&
        <DialogActions>
            {parentStudents.size ?
                <Button
                    type='submit'
                    form='create-student-form'
                    disabled={loading}            
                    className='mt-btn-success mt-btn'
                    color='primary'>
                    {t('assign')}
                </Button>
              :
                <Button
                    type='button'
                    onClick={(e) => { this._close(e) }}
                    className='mt-btn-success mt-btn'
                    color='primary'>
                    {t('ok')}
                </Button>                  
            }          
        </DialogActions>}
      </Modal>
    );
  }
}
 
export default withTranslation('translations')(connect(
  (state) => ({
    parentStudents: selectStudents(state),
    storeItems: selectStoreItems(state),    
    parentStudentsRequest: selectGetRecordsRequest(state),
    parentRecordsRequest: selectGetParentRecordsRequest(state),
    subscribeRequest: selectSubscribeStudentRequest(state)
  }),
  (dispatch) => ({
    getStudents: (params = {filter: {owner: true}}) => { dispatch(getRecords(params)) },
    getStoreItems: (params = {perPage: '500', filter: {category: 1}}) => {dispatch(getParentRecords(params))},
    subscribeStudent: (form, params = {}) => { dispatch(subscribeStudent(form, params)) },
    resetSubscribeRequest: () => { dispatch(resetSubscribeStudentRequest()) }
  })
)(AssignStudentModal));