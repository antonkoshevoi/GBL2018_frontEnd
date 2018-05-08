import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from 'material-ui';
import { connect } from 'react-redux';
import { getDemoClassrooms } from '../../../redux/classrooms/actions';
import { selectGetRecordsRequest, selectRecords } from '../../../redux/classrooms/selectors';
import { getSchoolStudents } from "../../../redux/schools/actions";
import { selectGetSchoolStudentsRequest } from "../../../redux/schools/selectors";

class AssignStudentForm extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    errors: PropTypes.any    
  };
  
  constructor (props) {
    super(props);
    this.state = {
        schoolStudents: [],
        demoClassrooms: []
    };
  }
  
  componentDidMount() {
    const { getSchoolStudents } = this.props;
    getSchoolStudents();
  }
  
  componentWillReceiveProps(nextProps) {
    this._handleSchoolStudentsSuccess(nextProps);
  }

  _handleSchoolStudentsSuccess(nextProps) {
    const schoolStudents = this.props.schoolStudentsRequest.get('records');
    const nextschoolStudents = nextProps.schoolStudentsRequest.get('records');

    if (!schoolStudents && nextschoolStudents) {
      this.setState({
        ...this.state,
        schoolStudents: nextschoolStudents.toJS()
      });
    }
  }  
  
  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;

    this.props.onChange({
      ...this.props.form,
      [name]: value
    });
  }
  
  _renderStudents() {
    const { schoolStudents } = this.state;

    return schoolStudents.map((students, key) => (
      <MenuItem key={key} value={ students.id }>
        { students.firstName } { students.lastName }
      </MenuItem>
    ));
  }
  
  _renderDemoClassrooms() {
    const { demoClassrooms } = this.props;

    return demoClassrooms.map((classroom, key) => (
      <MenuItem key={key} value={ classroom.get('id') }>
        { classroom.get('crmName') }
      </MenuItem>
    ));
  }  

  render() {
    
    const { form, errors } = this.props;    
    
    return (
      <div className='row'>
        <div className='col-sm-8 col-lg-12 m-auto'>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Demo Classroom</InputLabel>
            <Select
                primarytext=""
                name='classroomId'
                style={{minWidth: 200}}
                onChange={(e) => { this._handleInputChange(e) }}
                value={form.classroomId || ''}>
              <MenuItem value={null} primarytext=""/>
              { this._renderDemoClassrooms() }
            </Select>
            {errors && errors.get('classroomId') && <FormHelperText error>{ errors.get('classroomId').get(0) }</FormHelperText>}            
          </FormControl>
          <FormControl className='full-width form-inputs'>
            <InputLabel htmlFor='name-error'>Student</InputLabel>
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
      </div>
    );
  }
}

AssignStudentForm = connect(
  (state) => ({    
    demoClassrooms: selectRecords(state),
    schoolStudentsRequest: selectGetSchoolStudentsRequest(state)
  }),
  (dispatch) => ({
    getSchoolStudents: () => { dispatch(getSchoolStudents()) },
    getDemoCourses: () => { dispatch(getDemoClassrooms({
      perPage: 0
    }))}
  })
)(AssignStudentForm);

export default AssignStudentForm;