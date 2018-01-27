import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, Typography, Tab, Tabs, Paper, Grid } from 'material-ui';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import {getSchoolTeachers, getSchoolStudents, getSchools} from "../../../redux/schools/actions";
import {
    selectGetSchoolStudentsRequest, selectGetSchoolTeachersRequest,
    selectSchools
} from "../../../redux/schools/selectors";
import DatePicker from '../../../components/ui/DatePicker';

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
    const { homeroom, getSchoolTeachers, getSchoolStudents, getSchools } = this.props;

    if (homeroom.id) {
      const studentIds = homeroom.students.map((student) => {
        return student.id.toString();
      });

      this.setState({
        ...this.state,
        studentIds: studentIds
      });
    }

    getSchools();
    getSchoolTeachers();
    getSchoolStudents();
  }

  componentWillReceiveProps(nextProps) {
    this._getErrorsSuccess(nextProps);
    this._getSchoolTeachersSuccess(nextProps);
    this._getSchoolStudentsSuccess(nextProps);
  }

  _getErrorsSuccess(nextProps) {
    if (!this.props.errors.size && nextProps.errors.size) {
      this.setState({
        ...this.state,
        activeTab: nextProps.errors.get('schoolId') ? 1 : 0
      });
    }
  }

  _getSchoolTeachersSuccess(nextProps) {
    const schoolTeachers = this.props.getSchoolTeacherRequest.get('records');
    const nextschoolTeachers = nextProps.getSchoolTeacherRequest.get('records');

    if (!schoolTeachers && nextschoolTeachers) {
      this.setState({
        ...this.state,
        schoolTeachers: nextschoolTeachers.toJS()
      });
    }
  }

  _getSchoolStudentsSuccess(nextProps) {
    const schoolStudents = this.props.getSchoolStudentsRequest.get('records');
    const nextschoolStudents = nextProps.getSchoolStudentsRequest.get('records');

    if (!schoolStudents && nextschoolStudents) {
      this.setState({
        ...this.state,
        schoolStudents: nextschoolStudents.toJS()
      });
    }
  }

  _handleDateChange(m, dateField) {
      this.props.onChange({
      ...this.props.homeroom,
      [dateField]: m
    });
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

    if (!schoolStudents.length) {
      return <div>
        <Typography type="display1" gutterBottom>
          Assign students to homeroom
        </Typography>
        <Typography type="title" gutterBottom>
          Select a school for students list to be available.
        </Typography>
      </div>
    }

    return schoolStudents.map((student, key) => (
      <Grid item xs={4} key={key}>
        <FormControlLabel
          control={<Checkbox
            checked={this.state.studentIds.indexOf(student.id.toString()) > -1}
            onChange={ (e) => {this._handleStudentsCheckboxChange(e) }}
            value={student.id.toString()}
          />}
          label={student.firstName + ' ' + student.lastName}
        />
      </Grid>
    ))
  }

  render() {
    const { homeroom, errors } = this.props;
    const { activeTab } = this.state;

    return (
      <div className='row'>
        <Paper className='full-width' style={{boxShadow:'0 0 0 0'}}>
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
              <InputLabel htmlFor='name-error' shrink={!!homeroom.startDate}>Start Date</InputLabel>
              <DatePicker
                name='startDate'
                value={homeroom.startDate || null}
                onChange={(m) => { this._handleDateChange(m, 'startDate') }}
              />
              {errors && errors.get('startDate') && <FormHelperText error>{ errors.get('startDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error' shrink={!!homeroom.endDate}>End Date</InputLabel>
              <DatePicker
                name='endDate'
                value={homeroom.endDate || null}
                onChange={(m) => { this._handleDateChange(m, 'endDate') }}
              />
              {errors && errors.get('endDate') && <FormHelperText error>{ errors.get('endDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error' shrink={!!homeroom.enrollmentStartDate}>Enrollment Start Date</InputLabel>
              <DatePicker
                name='enrollmentStartDate'
                value={homeroom.enrollmentStartDate || null}
                onChange={(m) => { this._handleDateChange(m, 'enrollmentStartDate') }}
              />
              {errors && errors.get('enrollmentStartDate') && <FormHelperText error>{ errors.get('enrollmentStartDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl aria-describedby='name-error-text' className='full-width form-inputs'>
              <InputLabel htmlFor='name-error' shrink={!!homeroom.enrollmentEndDate}>Enrollment End Date</InputLabel>
              <DatePicker
                name='enrollmentEndDate'
                value={homeroom.enrollmentEndDate || null}
                onChange={(m) => { this._handleDateChange(m, 'enrollmentEndDate') }}
              />
              {errors && errors.get('enrollmentEndDate') && <FormHelperText error>{ errors.get('enrollmentEndDate').get(0) }</FormHelperText>}
            </FormControl>
            </div>
          </TabContainer>}
          {activeTab === 1 && <TabContainer>
            <div className="col-sm-8 m-auto">
            {/*<FormControl className='full-width form-inputs'>*/}
              {/*<InputLabel htmlFor='name-error'>School</InputLabel>*/}
              {/*<Select*/}
                  {/*primarytext=""*/}
                  {/*name='schoolId'*/}
                  {/*onChange={(e) => { this._handleSchoolChange(e) }}*/}
                  {/*value={homeroom.schoolId || ''}>*/}
                {/*<MenuItem value={null} primarytext="Select School"/>*/}
                {/*{this._renderSchools()}*/}
              {/*</Select>*/}
              {/*{errors && errors.get('schoolId') && <FormHelperText error>{ errors.get('schoolId').get(0) }</FormHelperText>}*/}
            {/*</FormControl>*/}
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
    schools: selectSchools(state),
    getSchoolTeacherRequest: selectGetSchoolTeachersRequest(state),
    getSchoolStudentsRequest: selectGetSchoolStudentsRequest(state),
  }),
  (dispatch) => ({
    getSchools: () => { dispatch(getSchools()) },
    getSchoolTeachers: () => { dispatch(getSchoolTeachers()) },
    getSchoolStudents: () => { dispatch(getSchoolStudents()) },
  })
)(HomeroomForm);

export default HomeroomForm;