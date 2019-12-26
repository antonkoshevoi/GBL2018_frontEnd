import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent, Icon,
  Toolbar, Typography, Divider,
  Button, DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { selectCreateRequest } from '../../../redux/administration/selectors';
import { create, resetCreateRequest } from '../../../redux/administration/actions';
import Modal from "../../../components/ui/Modal";
import AdministrationForm from "../forms/AdministrationForm";
import ImageCropper from "../../../components/ui/ImageCropper";

class CreateAdministrationModal extends Component {
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
      adminUser: {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: null,
        phone: '',
        schoolId: '',
        homeroomId: '',
        avatarCropped: ''
      },
      avatar: ''
    };
  }

  componentDidUpdate(prevProps) {
    const success = this.props.createRequest.get('success');    

    if (success && !prevProps.createRequest.get('success')) {
      this._close();
      this.props.onSuccess();
    }
  }

  _close () {
    this.setState({
      adminUser: {}
    });
    this.props.resetCreateRequest();
    this.props.onClose();
  }

  _onChange (adminUser) {
    this.setState({ adminUser });
  }

  _onSubmit (e) {
    e.preventDefault();
    this.props.create(
      this.state.adminUser
    );
  }


  _setCroppedImage(img){

    this.setState(
      {
        adminUser: {
          ...this.state.adminUser,
          avatarCropped:img
        }
      }
    );
  }

  _setImage(img){
    this.setState({avatar:img});
  }

  render() {
    const { isOpen, createRequest, t } = this.props;
    const loading = createRequest.get('loading');    
    const errors = createRequest.get('errors');

    return (
      <Modal middle={true} isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>            
              {loading ? (
                <CircularProgress className="mr-3" color="inherit"/>
              ) : (
                <Icon className="mr-3">person</Icon>
              )}            
            <Typography variant="h6" color="inherit" >
              {t('createUser')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="mt-4">
          <form id='create-administrator-form' onSubmit={(e) => { this._onSubmit(e) }}>
           <div className="row">
             <div className="col-md-6">
                 <AdministrationForm
                     onChange={(adminUser) => { this._onChange(adminUser) }}
                     adminUser={this.state.adminUser}
                     errors={errors}/>
             </div>
             <div className="col-md-6">
                 <ImageCropper circularButton onCrop={(cropImg) => {this._setCroppedImage(cropImg)}} setFile={(img) => {this._setImage(img)}}/>
             </div>
           </div>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='create-administrator-form'
            disabled={loading}            
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('updateUser')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

export default withTranslation('translations')(connect(
  (state) => ({
    createRequest: selectCreateRequest(state)
  }),
  (dispatch) => ({
    create: (form, params = {}) => { dispatch(create(form, params)) },
    resetCreateRequest: () => { dispatch(resetCreateRequest()) }
  })
)(CreateAdministrationModal));
