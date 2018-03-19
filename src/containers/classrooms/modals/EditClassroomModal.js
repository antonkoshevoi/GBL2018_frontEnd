import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,
  DialogContentText,
  Icon, IconButton,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from 'material-ui';
import { connect } from 'react-redux';
import {
  selectGetSingleRecordRequest,
  selectUpdateRequest
} from '../../../redux/classrooms/selectors';
import {
  getSchools, resetGetSingleRecordRequest, resetUpdateRequest,
  update
} from '../../../redux/classrooms/actions';
import Modal from "../../../components/ui/Modal";
import ClassroomForm from "../forms/ClassroomForm";
import ImageCropper from "../../../components/ui/ImageCropper";

class EditClassroomModal extends Component {
  static propTypes = {
    isPublic: PropTypes.bool,
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
      classroom: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const record = this.props.getSingleRecordRequest.get('record');
    const nextRecord = nextProps.getSingleRecordRequest.get('record');

    if (!record && nextRecord) {
      this.setState({
        id: nextRecord.get('id'),
        classroom: nextRecord.toJS()
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
      classroom: {}
    });
    this.props.resetUpdateRequest();
    this.props.resetGetSingleRecordRequest();
    this.props.onClose();
  };

  _onChange (classroom) {
    this.setState({ classroom });
  };

  _onSubmit (e) {
    e.preventDefault();
    this.props.update(
      this.state.id,
      this.state.classroom
    );

    this.props.resetUpdateRequest();
  };

  _setCroppedImage(img) {
    this.setState(
      {
        classroom: {
          ...this.state.classroom,
          avatarCropped: img
        }
      }
    );
  }

  _setImage(img) {
    this.setState(
      {
        classroom: {
          ...this.state.classroom,
          avatar: img
        }
      }
    );
  }

  render() {
    const { isOpen, updateRequest, getSingleRecordRequest,isPublic } = this.props;
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
              Edit Classroom
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <form id='update-classroom-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <DialogContentText>
              {/*{errorMessage && <span>{errorMessage}</span>}*/}
            </DialogContentText>
            <div className="row">
              <div className="col-md-8">
                <ClassroomForm
                  isPublic={isPublic}
                  onChange={(classroom) => { this._onChange(classroom) }}
                  classroom={this.state.classroom}
                  errors={errors}/>
              </div>
              <div className="col-md-4">
                <ImageCropper
                  image={this.state.classroom.avatar}
                  circularButton
                  onCrop={(cropImg) => this._setCroppedImage(cropImg)}
                  setFile={(img) => this._setImage(img)}
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='update-classroom-form'
            disabled={loading}
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
            color='primary'>
            Update Classroom
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

EditClassroomModal = connect(
  (state) => ({
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    updateRequest: selectUpdateRequest(state),
  }),
  (dispatch) => ({
    update: (id, form, params = {}) => { dispatch(update(id, form, params)) },
    resetUpdateRequest: () => { dispatch(resetUpdateRequest()) },
    resetGetSingleRecordRequest: () => { dispatch(resetGetSingleRecordRequest()) },
  })
)(EditClassroomModal);

export default EditClassroomModal;
