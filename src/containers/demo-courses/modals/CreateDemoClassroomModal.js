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
import { withTranslation } from 'react-i18next';
import { selectCreateRequest } from '../../../redux/classrooms/selectors';
import { create, resetCreateRequest } from '../../../redux/classrooms/actions';
import Modal from "../../../components/ui/Modal";
import DemoClassroomForm from '../forms/DemoClassroomForm';
import ImageCropper from "../../../components/ui/ImageCropper";

class CreateDemoClassroomModal extends Component {
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

  componentDidUpdate(prevProps) {
    const success = this.props.createRequest.get('success');    

    if(success && !prevProps.createRequest.get('success')) {
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
  }

  _onChange (classroom) {
    this.setState({ classroom });
  }

  _onSubmit (e) {
    e.preventDefault();
    this.props.create(
      this.state.classroom
    );   
  }

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
    this.setState({ avatar: img });
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
                <CircularProgress className="mr-3" color="inherit"/>
              ) : (
                <Icon className="mr-3">person</Icon>
              )}            
            <Typography variant="h6" color="inherit" >
              {t('createDemoCourseClassroom')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="mt-4">
          <form id='create-classroom-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <div className="row">
              <div className="col-md-7">
                <DemoClassroomForm
                  onChange={(classroom) => { this._onChange(classroom) }}
                  classroom={this.state.classroom}
                  errors={errors}/>
              </div>
              <div className="col-md-5">
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
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('addNewClassroom')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

export default withTranslation('translations')(connect(
  (state) => ({
    createRequest: selectCreateRequest(state),
  }),
  (dispatch) => ({
    create: (form, params = {}) => { dispatch(create(form, params)) },
    resetCreateRequest: () => { dispatch(resetCreateRequest()) }
  })
)(CreateDemoClassroomModal));
