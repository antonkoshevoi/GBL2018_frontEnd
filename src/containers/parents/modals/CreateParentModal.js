import React, {Component} from 'react';
import {AppBar, CircularProgress, DialogContent, Icon, Toolbar, Typography, Divider, Button, DialogActions} from '@material-ui/core';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {selectCreateRequest} from '../../../redux/parents/selectors';
import {create, resetCreateRequest} from '../../../redux/parents/actions';
import Modal from "../../../components/ui/Modal";
import ParentForm from "../forms/ParentForm";
import ImageCropper from "../../../components/ui/ImageCropper";
import {selectUserData} from "../../../redux/user/selectors";

class CreateParentModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      parent: {
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
    
  componentDidMount() {
    const {userData} = this.props;
    
    this.setState({
        parent: {
          ...this.state.parent,
          schoolId: userData.get('schoolId')
        }
    });
  }  

  componentDidUpdate(prevProps) {
    const success = this.props.createRequest.get('success');    

    if (success && !prevProps.createRequest.get('success')) {
      this._close();
      this.props.onSuccess();
    }
  }

  _onChange(parent) {
    this.setState({parent});
  };

  _onSubmit(e) {
    e.preventDefault();
    let parent = this.state.parent;
    delete parent.avatar;
    this.props.create( parent );
  };

  _close() {
    this.setState({
      parent: {}
    });
    this.props.onClose();
    this.props.resetCreateRequest();
  }

  _setCroppedImage(img) {
    this.setState({
        parent: {
          ...this.state.parent,
          avatarCropped: img
        }
    });
  }

  _setImage(img) {
    this.setState({avatar: img});
  }

  render() {
    const {isOpen, createRequest, t} = this.props;
    const loading = createRequest.get('loading');    
    const errors = createRequest.get('errors');
    return (
      <Modal isOpen={isOpen} middle={true} onClose={() => this._close()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>            
              {loading ? (
                <CircularProgress className="mr-3" color="inherit"/>
              ) : (
                <Icon className="mr-3">person</Icon>
              )}            
            <Typography variant="h6" color="inherit">{t('createParent')}</Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="mt-3">
          <form id='create-parent-form' onSubmit={(e) => { this._onSubmit(e) }}>
            <div className="row">
              <div className="col-md-6">
                <ParentForm
                  onChange={(parent) => {
                    this._onChange(parent)
                  }}
                  parent={this.state.parent}
                  errors={errors}/>
              </div>
              <div className="col-md-6">
                <ImageCropper circularButton onCrop={(cropImg) => this._setCroppedImage(cropImg)} setFile={(img) => this._setImage(img)}/>
              </div>
            </div>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='create-parent-form'
            disabled={loading}            
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('addNewParent')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

CreateParentModal = connect(
  (state) => ({
    createRequest: selectCreateRequest(state),
    userData: selectUserData(state)
  }),
  (dispatch) => ({
    create: (form, params = {}) => {
      dispatch(create(form, params))
    },
    resetCreateRequest: () => {
      dispatch(resetCreateRequest())
    }
  })
)(CreateParentModal);

export default withTranslation('translations')(CreateParentModal);
