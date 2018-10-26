import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, Grid, FormHelperText, FormControlLabel, FormGroup, CircularProgress, Checkbox } from '@material-ui/core';
import { getSchoolStudents } from "../../../redux/schools/actions";
import { selectGetSchoolStudentsRequest } from "../../../redux/schools/selectors";

class AssignStudentsForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    schoolId: PropTypes.any,
    studentIds: PropTypes.array.isRequired,
    errors: PropTypes.any
  };

  constructor (props) {
    super(props);   
    this.state = {
      schoolStudents: [],
      schoolId: this.props.schoolId,
      studentIds: this.props.studentIds
    };
  }

  componentDidMount() {
    const { getSchoolStudents } = this.props;

    getSchoolStudents({schoolId: this.state.schoolId});
  }

  componentWillReceiveProps(nextProps) {
    this._handleSchoolStudentsSuccess(nextProps);
  }

  _handleSchoolStudentsSuccess(nextProps) {
    const schoolStudents = this.props.getSchoolStudentsRequest.get('records');
    const nextschoolStudents = nextProps.getSchoolStudentsRequest.get('records');

    if (!schoolStudents && nextschoolStudents) {
      this.setState({
        ...this.state,
        schoolStudents: nextschoolStudents.toJS()
      });
    }
  }

  _handleStudentsCheckboxChange(event) {
    const { value } = event.target;
    const index = this.state.studentIds.indexOf(value.toString());

    if (index < 0) {
      this.state.studentIds.push(value.toString());
    } else {
      this.state.studentIds.splice(index, 1);
    }

    this.props.onChange(this.state.studentIds);
  }

  _renderStudents() {
    const { schoolStudents } = this.state;

    if (!schoolStudents.length) {
      return <div>
        <Typography variant="h6" gutterBottom>
          No Students in School
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
          label={student.name}
        />
      </Grid>
    ))
  }

  render() {
    const { errors } = this.props;
    const studentsLoading = this.props.getSchoolStudentsRequest.get('loading');
    const studentsSuccess = this.props.getSchoolStudentsRequest.get('success');

    return (
      <div className='row'>
        <Paper className='full-width' style={{boxShadow:'0 0 0 0'}}>
          {errors && errors.get('studentIds') && <FormHelperText error>{ errors.get('studentIds').get(0) }</FormHelperText>}
          <FormGroup row style={{minWidth: '500px'}}>
            {studentsLoading && !studentsSuccess && <div className="text-center" style={{width: '100%'}}><CircularProgress color="primary"/></div>}
            {!studentsLoading && studentsSuccess && this._renderStudents()}
          </FormGroup>
        </Paper>
      </div>
    );
  }
}

AssignStudentsForm = connect(
  (state) => ({
    getSchoolStudentsRequest: selectGetSchoolStudentsRequest(state)
  }),
  (dispatch) => ({
    getSchoolStudents: (params = {}) => { dispatch(getSchoolStudents(params)) }
  })
)(AssignStudentsForm);

export default AssignStudentsForm;