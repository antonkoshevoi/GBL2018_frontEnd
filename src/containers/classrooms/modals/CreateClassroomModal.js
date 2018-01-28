import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,
  DialogContentText,
  Icon, IconButton,
  Toolbar, Typography,
  Divider, Button
} from 'material-ui';
import { connect } from 'react-redux';
import { selectCreateRequest, selectSchools } from '../../../redux/classrooms/selectors';
import { create, getSchools, resetCreateRequest } from '../../../redux/classrooms/actions';
import Modal from "../../../components/ui/Modal";
import ClassroomForm from "../forms/ClassroomForm";

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
      classroom: {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: null,
        phone: '',
        schoolId: null,
      }
    };
  }

  componentDidMount() {
    this.props.getSchools();
  }

  componentWillReceiveProps(nextProps) {
    const success = this.props.createRequest.get('success');
    const nextSuccess = nextProps.createRequest.get('success');

    if(!success && nextSuccess) {
      this._onClose();
      this.props.onSuccess();
    }
  }

  _onClose () {
    this.setState({
      classroom: {}
    });
    this.props.resetCreateRequest();
    this.props.onClose();
  };

  _onChange (classroom) {
    this.setState({ classroom });
  };

  _onSubmit = () => {
    this.props.create(
      this.state.classroom
    );

    this.props.resetCreateRequest();
  };

  render() {
    const { isOpen, createRequest, schools } = this.props;
    const loading = createRequest.get('loading');
    const errorMessage = createRequest.get('errorMessage');
    const errors = createRequest.get('errors');

    return (
      <Modal isOpen={isOpen} onClose={() => this._onClose()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>
            <IconButton color="contrast" aria-label="Close">
              {loading ? (
                <CircularProgress style={{float: 'right'}} color="inherit"/>
              ) : (
                <Icon>person</Icon>
              )}
            </IconButton>
            <Typography type="title" color="inherit" >
              Create Classroom
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <DialogContentText>
            {/*{errorMessage && <span>{errorMessage}</span>}*/}
          </DialogContentText>
          <ClassroomForm
            onChange={(classroom) => { this._onChange(classroom) }}
            classroom={this.state.classroom}
            // schools={schools}
            errors={errors}/>
          <div className='col-sm-12'>
            <Divider/>
            <Button disabled={loading} raised className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn' color='primary' onClick={() => { this._onSubmit() }} >
              Add New Classroom
            </Button>
          </div>
        </DialogContent>
      </Modal>
    );
  }
}

CreateClassroomModal = connect(
  (state) => ({
    createRequest: selectCreateRequest(state),
    schools: selectSchools(state),
  }),
  (dispatch) => ({
    create: (form, params = {}) => { dispatch(create(form, params)) },
    resetCreateRequest: () => { dispatch(resetCreateRequest()) },
    getSchools: () => { dispatch(getSchools()) },
  })
)(CreateClassroomModal);

export default CreateClassroomModal;
