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
    this.setState({
        teacher: {
          ...this.state.teacher,
          avatarCropped:img
        }
    });
  }

  _setImage(img){
    this.setState({avatar:img});
  }

  _close () {
    this.setState({
      teacher: {}
    });
    this.props.onClose();
    this.props.resetCreateRequest();
  }

  render() {
    const { isOpen, createRequest, t } = this.props;
    const loading = createRequest.get('loading');    
    const errors = createRequest.get('errors');


    return (
      <Modal isOpen={isOpen} middle={true} onClose={() => this._close()}>
        <AppBar position='static' color='primary' className='dialogAppBar'>
          <Toolbar>            
              {loading ? (
                <CircularProgress className="mr-3" color='inherit'/>
              ) : (
                <Icon className="mr-3">person</Icon>
              )}            
            <Typography variant="h6" color='inherit' >
              {t('createTeacher')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className='mt-4'>
          <form id='create-teacher-form' onSubmit={(e) => { this._onSubmit(e) }}>
             <div className="row">
               <div className="col-md-6">
                   <TeacherForm
                       onChange={(teacher) => { this._onChange(teacher) }}
                       teacher={this.state.teacher}
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
            form='create-teacher-form'
            disabled={loading}            
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('addNewTeacher')}
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

export default withTranslation('translations')(CreateTeacherModal);
