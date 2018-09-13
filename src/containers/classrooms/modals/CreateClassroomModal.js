import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,  
  Icon,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
    const { isOpen, createRequest, t } = this.props;
    const loading = createRequest.get('loading');    
    const errors = createRequest.get('errors');

    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>            
              {loading ? (
                <CircularProgress className="m--margin-right-15" color="inherit"/>
              ) : (
                <Icon className="m--margin-right-15">person</Icon>
              )}            
            <Typography type="title" color="inherit" >
              {t('createClassroom')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <form id='create-classroom-form' onSubmit={(e) => { this._onSubmit(e) }}>
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
            {t('addNewClassroom')}
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

export default translate('translations')(CreateClassroomModal);
