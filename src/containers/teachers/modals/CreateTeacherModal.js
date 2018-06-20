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
import { selectCreateRequest } from '../../../redux/teachers/selectors';
import { create, resetCreateRequest } from '../../../redux/teachers/actions';
import Modal from '../../../components/ui/Modal';
import TeacherForm from '../form/TeacherForm';
import ImageCropper from "../../../components/ui/ImageCropper";

class CreateTeacherModal extends Component {
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
      teacher: {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: null,
        phone: '',
        schoolId: '',
        homeroomId: '',
        croppedAvatar: '',
        avatar: '',
      }
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

  _onChange (teacher) {
    this.setState({ teacher });
  };

  _onSubmit (e) {
    e.preventDefault();
    this.props.create(
      this.state.teacher
    );
  };


  _setCroppedImage(img){
    this.setState(
      {
        teacher: {
          ...this.state.teacher,
          croppedAvatar:img
        }
      }
    );
  }

  _setImage(img){
    this.setState(
      {
        teacher: {
          ...this.state.teacher,
          avatar:img
        }
      }
    );
  }

  _close () {
    this.setState({
      teacher: {}
    });
    this.props.onClose();
    this.props.resetCreateRequest();
  }

  render() {
    const { isOpen, createRequest } = this.props;
    const loading = createRequest.get('loading');    
    const errors = createRequest.get('errors');


    return (
      <Modal isOpen={isOpen} bigger onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>
            <IconButton color="inherit" aria-label='Close'>
              {loading ? (
                <CircularProgress style={{float: 'right'}} color='inherit'/>
              ) : (
                <Icon>person</Icon>
              )}
            </IconButton>
            <Typography type='title' color='inherit' >
              Create Teacher
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='m--margin-top-25'>
          <form id='create-teacher-form' onSubmit={(e) => { this._onSubmit(e) }}>
             <div className="row">
               <div className="col-md-6">
                    <ImageCropper circularButton onCrop={(cropImg) => this._setCroppedImage(cropImg)} setFile={(img) => this._setImage(img)}/>
               </div>
               <div className="col-md-6">
                   <TeacherForm
                       onChange={(teacher) => { this._onChange(teacher) }}
                       teacher={this.state.teacher}
                       errors={errors}/>
               </div>
             </div>
          </form>
        </DialogContent>
        <Divider className='full-width'/>
        <DialogActions>
          <Button
            type='submit'
            form='create-teacher-form'
            disabled={loading}
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
            color='primary'>
            Add New Teacher
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

CreateTeacherModal = connect(
  (state) => ({
    createRequest: selectCreateRequest(state),
  }),
  (dispatch) => ({
    create: (form, params = {}) => { dispatch(create(form, params)) },
    resetCreateRequest: () => { dispatch(resetCreateRequest()) },
  })
)(CreateTeacherModal);

export default CreateTeacherModal;
