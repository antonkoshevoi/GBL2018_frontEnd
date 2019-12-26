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
import { selectGetSingleRecordRequest, selectUpdateRequest} from '../../../redux/classrooms/selectors';
import { resetGetSingleRecordRequest, resetUpdateRequest, update } from '../../../redux/classrooms/actions';
import Modal from "../../../components/ui/Modal";
import DemoClassroomForm from '../forms/DemoClassroomForm';
import ImageCropper from "../../../components/ui/ImageCropper";

class EditDemoClassroomModal extends Component {
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
      classroom: {}
    };
  }

  componentDidUpdate(prevProps) {
    const record = this.props.getSingleRecordRequest.get('record');    

    if (record && !prevProps.getSingleRecordRequest.get('record')) {
      this.setState({
        id: record.get('id'),
        classroom: record.toJS(),
        avatar: record.toJS().avatar
      });
    }

    const success = this.props.updateRequest.get('success');    

    if (success && !prevProps.updateRequest.get('success')) {
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
  }

  _onChange (classroom) {
    this.setState({ classroom });
  }

  _onSubmit (e) {
    e.preventDefault();
    this.props.update(
      this.state.id,
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
    this.setState({avatar: img});
  }

  render() {
    const { isOpen, updateRequest, getSingleRecordRequest, t } = this.props;
    const loading = updateRequest.get('loading') || getSingleRecordRequest.get('loading');    
    const errors = updateRequest.get('errors');

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
              {t('editDemoClassroomClassroom')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="mt-4">
          <form id='update-classroom-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <div className="row">
              <div className="col-md-7">
                <DemoClassroomForm
                  onChange={(classroom) => { this._onChange(classroom) }}
                  classroom={this.state.classroom}
                  errors={errors}/>
              </div>
              <div className="col-md-5">
                <ImageCropper
                  image={this.state.avatar || ''}
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
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('updateClassroom')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

export default withTranslation('translations')(connect(
  (state) => ({
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    updateRequest: selectUpdateRequest(state)
  }),
  (dispatch) => ({
    update: (id, form, params = {}) => { dispatch(update(id, form, params)) },
    resetUpdateRequest: () => { dispatch(resetUpdateRequest()) },
    resetGetSingleRecordRequest: () => { dispatch(resetGetSingleRecordRequest()) }
  })
)(EditDemoClassroomModal));
