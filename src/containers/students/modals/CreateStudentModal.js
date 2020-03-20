import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,  
  Icon,
  Toolbar, Typography,
  Divider, Button, DialogActions
} from '@material-ui/core';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {selectCreateRequest} from '../../../redux/students/selectors';
import {create, resetCreateRequest} from '../../../redux/students/actions';
import Modal from "../../../components/ui/Modal";
import StudentForm from "../forms/StudentForm";
import ImageCropper from "../../../components/ui/ImageCropper";
import {selectUserData} from "../../../redux/user/selectors";

class CreateStudentModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,
    create: PropTypes.func.isRequired,
    createRequest: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      student: {
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
        student: {
          ...this.state.student,
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

  _onChange(student) {
    this.setState({student});
  }

  _onSubmit(e) {
    e.preventDefault();
    let student = this.state.student;
    delete student.avatar;
    this.props.create( student );
  }

  _close() {
    this.setState({
      student: {}
    });
    this.props.onClose();
    this.props.resetCreateRequest();
  }

  _setCroppedImage(img) {
    this.setState({
        student: {
          ...this.state.student,
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
            <Typography variant="h6" color="inherit">
              {t('createStudent')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="mt-3">
          <form id='create-student-form' onSubmit={(e) => {
            this._onSubmit(e)
          }}>
            <div className="row">
              <div className="col-md-6">
                <StudentForm
                  onChange={(student) => {
                    this._onChange(student)
                  }}
                  student={this.state.student}
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
            form='create-student-form'
            disabled={loading}            
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('addNewStudent')}
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

export default withTranslation('translations')(connect(
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
)(CreateStudentModal));
