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
import { selectCreateRequest } from '../../../redux/classrooms/selectors';
import { create, resetCreateRequest } from '../../../redux/classrooms/actions';
import Modal from "../../../components/ui/Modal";
import ClassroomForm from "../forms/ClassroomForm";
import ImageCropper from "../../../components/ui/ImageCropper";

class CreateClassroomModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,
    create: PropTypes.func.isRequired,
    createRequest: PropTypes.any.isRequired,
  };

  constructor (props) {
    super(props);
    this.state = {
      classroom: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const success = this.props.createRequest.get('success');
    const nextSuccess = nextProps.createRequest.get('success');

    if(!success && nextSuccess) {
      this._close();
      this.props.onSuccess();
    }
  }

  _close () {
    this.setState({
      classroom: {}
    });
    this.props.resetCreateRequest();
    this.props.onClose();
  };

  _onChange (classroom) {
    this.setState({ classroom });
  };

  _onSubmit (e) {
    e.preventDefault();
    this.props.create(
      this.state.classroom
    );
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
    const { isOpen, createRequest } = this.props;
    const loading = createRequest.get('loading');
    const errorMessage = createRequest.get('errorMessage');
    const errors = createRequest.get('errors');

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
              Create Classroom
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <form id='create-classroom-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <DialogContentText>
              {/*{errorMessage && <span>{errorMessage}</span>}*/}
            </DialogContentText>
            <div className="row">
              <div className="col-md-8">
                <ClassroomForm
                  onChange={(classroom) => { this._onChange(classroom) }}
                  classroom={this.state.classroom}
                  errors={errors}/>
              </div>
              <div className="col-md-4">
                <ImageCropper
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
            form='create-classroom-form'
            disabled={loading}
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
            color='primary'>
            Add New Classroom
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

CreateClassroomModal = connect(
  (state) => ({
    createRequest: selectCreateRequest(state),
  }),
  (dispatch) => ({
    create: (form, params = {}) => { dispatch(create(form, params)) },
    resetCreateRequest: () => { dispatch(resetCreateRequest()) },
  })
)(CreateClassroomModal);

export default CreateClassroomModal;
