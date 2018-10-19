import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { selectGetParentRecordsRequest, selectRecords as selectStoreItems } from "../../../redux/store/selectors";
import { getParentRecords } from "../../../redux/store/actions";

import { selectGetRecordsRequest, selectRecords as selectStudents} from "../../../redux/students/selectors";
import { getRecords } from "../../../redux/students/actions";

class AssignStudentForm extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    errors: PropTypes.any    
  };
  
  constructor (props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    const { getStudents, getStoreItems } = this.props;    
    getStudents();    
    getStoreItems();
  }  
  
  _handleInputChange(event) {
    const { name, value } = event.target;

    this.props.onChange({
      ...this.props.form,
      [name]: value
    });
  }
  
  _renderStudents() {
    const { parentStudents } = this.props;    
    return parentStudents.toJS().map((student, key) => (
      <MenuItem key={key} value={ student.id }>
        { student.name }
      </MenuItem>
    ));    
  }
  
  _renderStoreItems() {
    const { storeItems } = this.props;
   
    return storeItems.map((storeItem, key) => (
      <MenuItem key={key} value={ storeItem.get('courseId') }>
        { storeItem.get('title') }
      </MenuItem>
    ));    
  }  

  render() {
    
    const { form, errors, t , parentRecordsRequest, parentStudentsRequest} = this.props;    
    
    return (
      <div className='row'>
        <div className='col-sm-8 col-lg-12 m-auto'>
        {(parentRecordsRequest.get('success') && parentStudentsRequest.get('success')) ? (
            <div>
                <FormControl className='full-width form-inputs'>              
                  <InputLabel htmlFor='name-error'>{t('course')}</InputLabel>                  
                  <Select
                      primarytext=""
                      name='courseId'
                      style={{minWidth: 200}}
                      onChange={(e) => { this._handleInputChange(e) }}
                      value={form.courseId || ''}>
                    <MenuItem value={null} primarytext=""/>
                    { this._renderStoreItems() }
                  </Select>
                  {errors && errors.get('courseId') && <FormHelperText error>{ errors.get('courseId').get(0) }</FormHelperText>}            
                </FormControl>
                <FormControl className='full-width form-inputs'>
                  <InputLabel htmlFor='name-error'>{t('student')}</InputLabel>                 
                  <Select
                      primarytext=""
                      name='studentId'
                      style={{minWidth: 200}}
                      onChange={(e) => { this._handleInputChange(e) }}
                      value={form.studentId || ''}>
                    <MenuItem value={null} primarytext=""/>
                    { this._renderStudents() }
                  </Select>
                  {errors && errors.get('studentId') && <FormHelperText error>{ errors.get('studentId').get(0) }</FormHelperText>}            
                </FormControl>
            </div>
        ) : (
            <div className="text-center" style={{width: '100%'}}><CircularProgress color="primary"/></div>
        )}
        </div>        
      </div>
    );
  }
}

AssignStudentForm = connect(
  (state) => ({    
    parentStudents: selectStudents(state),
    storeItems: selectStoreItems(state),    
    parentStudentsRequest: selectGetRecordsRequest(state),
    parentRecordsRequest: selectGetParentRecordsRequest(state)
  }),
  (dispatch) => ({
    getStudents: () => { dispatch(getRecords()) },
    getStoreItems: (params = {perPage: '500', filter: {category: 1}}) => {
        dispatch(getParentRecords(params))
    }
  })
)(AssignStudentForm);

export default translate('translations')(AssignStudentForm);