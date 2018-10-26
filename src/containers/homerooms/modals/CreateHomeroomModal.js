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
import { translate } from "react-i18next";
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
    this.setState({avatar: img});
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
            <Typography variant="h6" color="inherit" >
              {t('createHomeroom')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <form id='create-homeroom-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <div className="row">
              <div className="col-md-7">
                <HomeroomForm
                  onChange={(homeroom) => { this._onChange(homeroom) }}
                  homeroom={this.state.homeroom}
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
            form='create-homeroom-form'
            disabled={loading}            
            className='mt-btn-success pull-right btn btn-success mt-btn'
            color='primary'>
            {t('addNewHomeroom')}
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

export default translate('translations')(CreateHomeroomModal);
