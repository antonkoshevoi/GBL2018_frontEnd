import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent, Icon, Checkbox, FormControlLabel,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Modal from "../../../components/ui/Modal";
import {
  selectGetAssignStudentsRequest,
  selectGetRecordForAssignStudentsRequest
} from "../../../redux/classrooms/selectors";
import {assignStudents, resetAssignStudentsRequest} from "../../../redux/classrooms/actions";
import AssignStudentsForm from "../forms/AssignStudentsForm";

class AssignStudentsModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,
    assignStudents: PropTypes.func.isRequired,
    assignStudentsRequest: PropTypes.any.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      id: null,
      schoolId: null,
      studentIds: [],
      useCourseCredits: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this._handleSuccessRecord(nextProps);
    this._handleSuccessAssigned(nextProps);
  }

  _handleSuccessRecord(nextProps) {
    const success = this.props.getRecordForAssignStudentsRequest.get('record');
    const nextRecord= nextProps.getRecordForAssignStudentsRequest.get('record');

    if(!success && nextRecord) {
      const classroom = nextRecord.toJS();

      const studentIds = classroom.students.map((student) => {
        return student.id.toString();
      });

      this.setState({
        id: classroom.id,
        classroom: classroom,
        schoolId: classroom.schoolId,
        studentIds: studentIds
      });
    }
  }

  _handleSuccessAssigned(nextProps) {
    const success = this.props.assignStudentsRequest.get('success');
    const nextSuccess = nextProps.assignStudentsRequest.get('success');

    if(!success && nextSuccess) {
      this._close();
      this.props.onSuccess();
    }
  }

  _close () {
    this.setState({
      id: null,
      studentIds: [],
      useCourseCredits: false
    });
    this.props.resetAssignStudentsRequest();
    this.props.onClose();
  };

  _onChange (studentIds) {
    this.setState({ studentIds });
  };

  _onSubmit (e) {
    e.preventDefault();

    const { id, studentIds, useCourseCredits } = this.state;

    this.props.assignStudents(id, {
      studentIds: studentIds,
      useCourseCredits: useCourseCredits      
    });   
  };
  
  _handleUseCourseCreditsChange(e) 
  {
      this.setState({useCourseCredits: e.target.checked});
  }

  render() {
    const { classroom, useCourseCredits } = this.state;
    const { isOpen, assignStudentsRequest, getRecordForAssignStudentsRequest, t } = this.props;
    const loading = assignStudentsRequest.get('loading') || getRecordForAssignStudentsRequest.get('loading');    
    const errors = assignStudentsRequest.get('errors');

    return (
      <Modal bigger isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>            
              {loading ? (
                <CircularProgress className="mr-3" color="inherit"/>
              ) : (
                <Icon className="mr-3" >person</Icon>
              )}            
            <Typography variant="h6" color="inherit" >
              {t('assignStudents')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="mt-4">          
          <form id='assign-students-form' onSubmit={(e) => { this._onSubmit(e) }}>
            {(classroom && classroom.courseCredits > 0) && <div className="alert alert-secondary pb-0">
                <p className="mb-0"><strong>{t('youHaveUnassignedCourseCredits', {count: classroom.courseCredits})}</strong></p>                    
                <FormControlLabel
                    className=""
                    control={<Checkbox
                      color="primary"
                      checked={useCourseCredits}
                      onChange={(e) => { this._handleUseCourseCreditsChange(e) }}
                      value="1"
                    />}
                    label={t('assignAllowedCourseCreditsToSelectedStudents')}
                />                
            </div>}
            <AssignStudentsForm
              onChange={(studentIds) => { this._onChange(studentIds) }}
              studentIds={this.state.studentIds}
              schoolId={this.state.schoolId}
              errors={errors}/>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='assign-students-form'
            disabled={loading}            
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('assignStudents')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

AssignStudentsModal = connect(
  (state) => ({
    getRecordForAssignStudentsRequest: selectGetRecordForAssignStudentsRequest(state),
    assignStudentsRequest: selectGetAssignStudentsRequest(state)
  }),
  (dispatch) => ({
    assignStudents: (id, data, params = {}) => { dispatch(assignStudents(id, data, params)) },
    resetAssignStudentsRequest: () => { dispatch(resetAssignStudentsRequest()) },
  })
)(AssignStudentsModal);

export default withTranslation('translations')(AssignStudentsModal);
