import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,
  DialogContentText,
  Icon, IconButton,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
      studentIds: []
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
      studentIds: []
    });
    this.props.resetAssignStudentsRequest();
    this.props.onClose();
  };

  _onChange (studentIds) {
    this.setState({ studentIds });
  };

  _onSubmit (e) {
    e.preventDefault();

    const { id, studentIds } = this.state;

    this.props.assignStudents(id, {
      studentIds: studentIds
    });   
  };

  render() {
    const { isOpen, assignStudentsRequest, getRecordForAssignStudentsRequest, t } = this.props;
    const loading = assignStudentsRequest.get('loading') || getRecordForAssignStudentsRequest.get('loading');    
    const errors = assignStudentsRequest.get('errors');

    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>
            <IconButton color="inherit" aria-label="Close">
              {loading ? (
                <CircularProgress style={{float: 'right'}} color="inherit"/>
              ) : (
                <Icon>person</Icon>
              )}
            </IconButton>
            <Typography type="title" color="inherit" >
              {t('assignStudents')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <DialogContentText></DialogContentText>
          <form id='assign-students-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <AssignStudentsForm
              onChange={(studentIds) => { this._onChange(studentIds) }}
              studentIds={this.state.studentIds}
              errors={errors}/>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='assign-students-form'
            disabled={loading}
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
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

export default translate('translations')(AssignStudentsModal);
