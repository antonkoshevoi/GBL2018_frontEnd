import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, Typography, Tab, Tabs, Paper } from 'material-ui';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { getSchoolTeachers, getSchoolStudents } from "../../../redux/schools/actions";
import {selectGetSchoolStudentsRequest, selectGetSchoolTeachersRequest} from "../../../redux/schools/selectors";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class HomeroomForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    homeroom: PropTypes.object.isRequired,
    schools: PropTypes.any,
    errors: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.state = {
      schoolTeachers: [],
      schoolStudents: [],
      activeTab: 0,
      studentIds: [],
    };
  }

  handleChangeTab = (event, activeTab) => {
    this.setState({
      ...this.state,
      activeTab: activeTab
    });
  };

  componentDidMount() {
    if (this.props.homeroom.id) {

      const studentIds = this.props.homeroom.students.map((student) => {
        return student.id.toString();
      });

      this.setState({
        ...this.state,
        studentIds: studentIds
      });

      this.props.getSchoolTeachers(this.props.homeroom.schoolId);
      this.props.getSchoolStudents(this.props.homeroom.schoolId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const schoolTeachers = this.props.getSchoolTeacherRequest.get('records');
    const nextschoolTeachers = nextProps.getSchoolTeacherRequest.get('records');

    if (!schoolTeachers && nextschoolTeachers) {
      this.setState({
        ...this.state,
        schoolTeachers: nextschoolTeachers.toJS()
      });
    }

    const schoolStudents = this.props.getSchoolStudentsRequest.get('records');
    const nextschoolStudents = nextProps.getSchoolStudentsRequest.get('records');

    if (!schoolStudents && nextschoolStudents) {
      this.setState({
        ...this.state,
        schoolStudents: nextschoolStudents.toJS()
      });
    }

    if (!this.props.errors.size && nextProps.errors.size) {
      this.setState({
        ...this.state,
        activeTab: nextProps.errors.get('schoolId') ? 1 : 0
      });
    }
  }

  _handleInputChange(event) {
    const { name, type, value, checked } = event.target;

    this.props.onChange({
      ...this.props.homeroom,
      [name]: value
    });
  }

  _handleStudentsCheckboxChange(event) {
    const { value } = event.target;
    const index = this.state.studentIds.indexOf(value.toString());

    if (index < 0) {
      this.state.studentIds.push(value.toString());
    } else {
      this.state.studentIds.splice(index, 1);
    }

    this.props.onChange({
      ...this.props.homeroom,
      homeroomStudents: this.state.studentIds
    });
  }

  _handleSchoolChange(event) {
    const { value } = event.target;

    this.setState({
      ...this.state,
      studentIds: []
    });

    if (value) {
      this.props.getSchoolTeachers(value);
      this.props.getSchoolStudents(value);
    } else {
      this.setState({
        ...this.state,
        schoolTeachers: [],
        schoolStudents: [],
      });
    }

    this._handleInputChange(event);
  }

  _renderSchools() {
    const { schools } = this.props;

    return schools.map((school, key) => (
      <MenuItem key={key} value={ school.get('schId') }>
        { school.get('schName') }
      </MenuItem>
    ));
  }

  _renderTeachers() {
    const { schoolTeachers } = this.state;

    return schoolTeachers.map((teacher, key) => (
      <MenuItem key={key} value={ teacher.id }>
        { teacher.firstName } { teacher.lastName }
      </MenuItem>
    ));
  }

  _renderStudents() {
    const { schoolStudents } = this.state;

    return schoolStudents.map((student, key) => (
      <FormControlLabel key={key}
        control={<Checkbox
          checked={this.state.studentIds.indexOf(student.id.toString()) > -1}
          onChange={ (e) => {this._handleStudentsCheckboxChange(e) }}
          value={student.id.toString()}
        />}
        label={student.firstName + ' ' + student.lastName}
      />
    ))
  }

  render() {
    const { homeroom, errors } = this.props;
    const { activeTab } = this.state;

    return (
      <div className='row'>

          <Paper>
            <Tabs value={activeTab} onChange={this.handleChangeTab} centered>
              <Tab label="Details" />
              <Tab label="Administration" />
              <Tab label="Students" />
            </Tabs>

          {activeTab === 0 && <TabContainer>
            <div className="col-sm-8 m-auto">
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>Name</InputLabel>
              <Input
                  name='name'
                  margin='dense'
                  fullWidth
                  value={homeroom.name || ''}
                  onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('name') && <FormHelperText error>{ errors.get('name').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>Start Date</InputLabel>
              <Input
                  name='startDate'
                  margin='dense'
                  fullWidth
                  value={homeroom.startDate || ''}
                  onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('startDate') && <FormHelperText error>{ errors.get('startDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>End Date</InputLabel>
              <Input
                  name='endDate'
                  margin='dense'
                  fullWidth
                  value={homeroom.endDate || ''}
                  onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('endDate') && <FormHelperText error>{ errors.get('endDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>Enrollment Start Date</InputLabel>
              <Input
                  name='enrollmentStartDate'
                  margin='dense'
                  fullWidth
                  value={homeroom.enrollmentStartDate || ''}
                  onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('enrollmentStartDate') && <FormHelperText error>{ errors.get('enrollmentStartDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>Enrollment End Date</InputLabel>
              <Input
                  name='enrollmentEndDate'
                  margin='dense'
                  fullWidth
                  value={homeroom.enrollmentEndDate || ''}
                  onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('enrollmentEndDate') && <FormHelperText error>{ errors.get('enrollmentEndDate').get(0) }</FormHelperText>}
            </FormControl>
            </div>
          </TabContainer>}
          {activeTab === 1 && <TabContainer>
            <div className="col-sm-8 m-auto">
            <FormControl className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>School</InputLabel>
              <Select
                  primarytext=""
                  name='schoolId'
                  onChange={(e) => { this._handleSchoolChange(e) }}
                  value={homeroom.schoolId || ''}>
                <MenuItem value={null} primarytext="Select School"/>
                {this._renderSchools()}
              </Select>
              {errors && errors.get('schoolId') && <FormHelperText error>{ errors.get('schoolId').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>Teacher</InputLabel>
              <Select
                  primarytext="Select Teacher"
                  name='teacherId'
                  onChange={(e) => { this._handleInputChange(e) }}
                  value={homeroom.teacherId || ''}>
                <MenuItem value={null} primarytext=""/>
                {this._renderTeachers()}
              </Select>
                {errors && errors.get('teacherId') && <FormHelperText error>{ errors.get('teacherId').get(0) }</FormHelperText>}
            </FormControl>
            </div>
          </TabContainer>}
          {activeTab === 2 && <TabContainer>
            <FormGroup row>
                {this._renderStudents()}
            </FormGroup>
          </TabContainer>}
          </Paper>
      </div>
    );
  }
}

HomeroomForm = connect(
    (state) => ({
        getSchoolTeacherRequest: selectGetSchoolTeachersRequest(state),
        getSchoolStudentsRequest: selectGetSchoolStudentsRequest(state),
    }),
    (dispatch) => ({
        getSchoolTeachers: (schoolId) => { dispatch(getSchoolTeachers(schoolId)) },
        getSchoolStudents: (schoolId) => { dispatch(getSchoolStudents(schoolId)) },
    })
)(HomeroomForm);

export default HomeroomForm;