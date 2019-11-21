import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, FormHelperText, FormControlLabel, CircularProgress, Checkbox } from '@material-ui/core';
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

  componentDidUpdate(prevProps) {
    this._handleSchoolStudentsSuccess(prevProps);
  }

  _handleSchoolStudentsSuccess(prevProps) {
    const students = this.props.getSchoolStudentsRequest.get('records');
    const prevStudents = prevProps.getSchoolStudentsRequest.get('records');

    if (students && !prevStudents) {
      this.setState({
        ...this.state,
        schoolStudents: students.toJS()
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
      <div key={key} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
        <FormControlLabel
          control={<Checkbox
            color="primary"
            checked={this.state.studentIds.indexOf(student.id.toString()) > -1}
            onChange={ (e) => {this._handleStudentsCheckboxChange(e) }}
            value={student.id.toString()}
          />}
          label={student.name}
        />
      </div>
    ))
  }

  render() {
    const { errors } = this.props;
    const studentsLoading = this.props.getSchoolStudentsRequest.get('loading');
    const studentsSuccess = this.props.getSchoolStudentsRequest.get('success');

    return (
      <div>        
          {errors && errors.get('studentIds') && <FormHelperText error>{ errors.get('studentIds').get(0) }</FormHelperText>}
          {studentsLoading && !studentsSuccess && <div className="text-center m-5 p-5"><CircularProgress color="primary" size={80}/></div>}
          <div className="row">
            {!studentsLoading && studentsSuccess && this._renderStudents()}
          </div>
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