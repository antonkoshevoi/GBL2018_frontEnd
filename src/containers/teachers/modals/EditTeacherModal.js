import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,
  DialogContentText,
  Icon, IconButton,
  Toolbar, Typography,
  Divider, Button,
  DialogActions
} from 'material-ui';
import { connect } from 'react-redux';
import {
  selectGetSingleRecordRequest, selectUpdateRequest,
} from '../../../redux/teachers/selectors';
import {
  resetGetSingleRecordRequest, resetUpdateRequest, update
} from '../../../redux/teachers/actions';
import Modal from "../../../components/ui/Modal";
import TeacherForm from "../form/TeacherForm";

class EditTeacherModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,
    update: PropTypes.func.isRequired,
    resetUpdateRequest: PropTypes.func.isRequired,
    updateRequest: PropTypes.any.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      id: undefined,
      teacher: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const record = this.props.getSingleRecordRequest.get('record');
    const nextRecord = nextProps.getSingleRecordRequest.get('record');

    if (!record && nextRecord) {
      this.setState({
        id: nextRecord.get('id'),
        teacher: nextRecord.toJS()
      });
    }

    const success = this.props.updateRequest.get('success');
    const nextSuccess = nextProps.updateRequest.get('success');

    if(!success && nextSuccess) {
      this._close();
      this.props.onSuccess();
    }
  }

  _close () {
    this.setState({
      id: undefined,
      teacher: {}
    });
    this.props.onClose();
    this.props.resetUpdateRequest();
    this.props.resetGetSingleRecordRequest();
  };

  _onChange (teacher) {
    this.setState({ teacher });
  };

  _onSubmit (e) {
    e.preventDefault();
    this.props.update(
      this.state.id,
      this.state.teacher
    );
  };

  render() {
    const { isOpen, updateRequest, getSingleRecordRequest } = this.props;
    const loading = updateRequest.get('loading') || getSingleRecordRequest.get('loading');
    const errorMessage = updateRequest.get('errorMessage');
    const errors = updateRequest.get('errors');

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
              Edit Teacher
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <DialogContentText>
            {/*{errorMessage && <span>{errorMessage}</span>}*/}
          </DialogContentText>
          <form id='update-teacher-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <TeacherForm
              onChange={(teacher) => { this._onChange(teacher) }}
              teacher={this.state.teacher}
              errors={errors}/>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='update-teacher-form'
            disabled={loading}
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
            color='primary'>
            Update Teacher
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

EditTeacherModal = connect(
  (state) => ({
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    updateRequest: selectUpdateRequest(state),
  }),
  (dispatch) => ({
    update: (id, form, params = {}) => { dispatch(update(id, form, params)) },
    resetUpdateRequest: () => { dispatch(resetUpdateRequest()) },
    resetGetSingleRecordRequest: () => { dispatch(resetGetSingleRecordRequest()) },
  })
)(EditTeacherModal);

export default EditTeacherModal;
