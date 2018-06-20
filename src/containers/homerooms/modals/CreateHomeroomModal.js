import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,  
  Icon, IconButton,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { selectCreateRequest } from '../../../redux/homerooms/selectors';
import { create, resetCreateRequest } from '../../../redux/homerooms/actions';
import Modal from "../../../components/ui/Modal";
import HomeroomForm from "../forms/HomeroomForm";
import ImageCropper from "../../../components/ui/ImageCropper";

class CreateHomeroomModal extends Component {
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
      homeroom: {}
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
      homeroom: {}
    });
    this.props.resetCreateRequest();
    this.props.onClose();
  };

  _onChange (homeroom) {
    this.setState({ homeroom });
  };

  _onSubmit (e) {
    e.preventDefault();
    this.props.create(
      this.state.homeroom
    );

    this.props.resetCreateRequest();
  };

  _setCroppedImage(img) {
    this.setState(
      {
        homeroom: {
          ...this.state.homeroom,
          avatarCropped: img
        }
      }
    );
  }

  _setImage(img) {
    this.setState(
      {
        homeroom: {
          ...this.state.homeroom,
          avatar: img
        }
      }
    );
  }

  render() {
    const { isOpen, createRequest } = this.props;
    const loading = createRequest.get('loading');    
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
              Create Homeroom
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <form id='create-homeroom-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <div className="row">
              <div className="col-md-8">
                <HomeroomForm
                  onChange={(homeroom) => { this._onChange(homeroom) }}
                  homeroom={this.state.homeroom}
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
            form='create-homeroom-form'
            disabled={loading}
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
            color='primary'>
            Add New Homeroom
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

CreateHomeroomModal = connect(
  (state) => ({
    createRequest: selectCreateRequest(state),
  }),
  (dispatch) => ({
    create: (form, params = {}) => { dispatch(create(form, params)) },
    resetCreateRequest: () => { dispatch(resetCreateRequest()) },
  })
)(CreateHomeroomModal);

export default CreateHomeroomModal;
