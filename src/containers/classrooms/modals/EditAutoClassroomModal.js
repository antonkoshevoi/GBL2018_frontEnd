import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent,
  DialogContentText,
  Icon, IconButton,
  Toolbar, Typography,
  Divider, Button, DialogActions, FormControl, InputLabel, Input, FormHelperText, Menu, Select, MenuItem
} from 'material-ui';
import {connect} from 'react-redux';
import {
  selectGetSingleRecordRequest,
  selectUpdateRequest
} from '../../../redux/classrooms/selectors';
import {
  getSchools, resetGetSingleRecordRequest, resetUpdateRequest,
  update, updateAutoClass
} from '../../../redux/classrooms/actions';
import Modal from "../../../components/ui/Modal";
import ClassroomForm from "../forms/ClassroomForm";
import ImageCropper from "../../../components/ui/ImageCropper";
import {selectGetSchoolTeachersRequest} from "../../../redux/schools/selectors";
import {getSchoolTeachers} from "../../../redux/schools/actions";

class EditAutoClassroomModal extends Component {
  static propTypes = {
    isPublic: PropTypes.bool,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.any.isRequired,
    update: PropTypes.func.isRequired,
    resetUpdateRequest: PropTypes.func.isRequired,
    updateRequest: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: undefined,
      taskConfig: {
        autoCreateTask: {
          frequencyId: 1,
          courseDuration: 150,
          maxStudent: 100,
        }
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    const record = this.props.getSingleRecordRequest.get('record');
    const nextRecord = nextProps.getSingleRecordRequest.get('record');

    if (!record && nextRecord) {
      this.setState({
        id: nextRecord.get('courseId'),
        taskConfig: nextRecord.get('courses').toJS()
      });
    }
    this._getSchoolTeachersSuccess(nextProps);
    const success = this.props.updateRequest.get('success');
    const nextSuccess = nextProps.updateRequest.get('success');

    if (!success && nextSuccess) {
      this._close();
      this.props.onSuccess();
    }
  }

  _getSchoolTeachersSuccess(nextProps) {
    const schoolTeachers = this.props.getSchoolTeacherRequest.get('success');
    const nextschoolTeachers = nextProps.getSchoolTeacherRequest.get('success');

    if (!schoolTeachers && nextschoolTeachers) {
      this.setState({
        ...this.state,
        schoolTeachers: nextProps.getSchoolTeacherRequest.get('records').toJS()
      });
    }
  }

  _close() {
    this.setState({
      id: undefined,
      taskConfig: {
        autoCreateTask: {
          frequencyId: 1,
          courseDuration: 150,
          maxStudent: 100,
        }
      }
    });
    this.props.resetUpdateRequest();
    this.props.resetGetSingleRecordRequest();
    this.props.onClose();
  };

  _onChange(taskConfig) {
    this.setState({taskConfig});
  };

  _handleInputChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      taskConfig: {
        ...this.state.taskConfig,
        autoCreateTask: {
          ...this.state.taskConfig.autoCreateTask,
          [name]: value,
        }
      }
    });
  };

  _onSubmit(e) {
    e.preventDefault();
    const {taskConfig} = this.state;
    console.log('_onSubmit', taskConfig);
    this.props.update(taskConfig.crsId, taskConfig);
    // this.props.resetUpdateRequest();
  };

  _renderTeachers() {
    const {schoolTeachers} = this.state;

    return schoolTeachers.map((teacher, key) => (
      <MenuItem key={key} value={teacher.id}>
        {teacher.firstName} {teacher.lastName}
      </MenuItem>
    ));
  }


  render() {
    const schoolTeachersSuccess = this.props.getSchoolTeacherRequest.get('success');
    const {isOpen, updateRequest, getSingleRecordRequest} = this.props;
    const loading = updateRequest.get('loading') || getSingleRecordRequest.get('loading');
    const errorMessage = updateRequest.get('errorMessage');
    const errors = updateRequest.get('errors');
    const {taskConfig} = this.state;

    console.log(taskConfig);
    console.log('errors', errors);
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
            <Typography type="title" color="inherit">
              Auto Classroom Similarity Regular Creation
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="m--margin-top-25">
          <form id='update-classroom-form' onSubmit={(e) => {
            this._onSubmit(e)
          }}>
            <DialogContentText>
              {/*{errorMessage && <span>{errorMessage}</span>}*/}
            </DialogContentText>
            <div className="row">
              <div className="col-md-12">
                <FormControl aria-describedby='crmEnrollmentStartDate-error-text' className='full-width form-inputs'>
                  <FormControl>
                    <InputLabel htmlFor="age-simple">Frequency</InputLabel>
                    <Select
                      name="frequencyId"
                      value={taskConfig.autoCreateTask.frequencyId || ''}
                      onChange={this._handleInputChange}
                    >
                      <MenuItem value={1}>Weekly</MenuItem>
                      <MenuItem value={2}>Monthly</MenuItem>
                    </Select>
                  </FormControl>
                  {errors && errors.get('autoCreateTask.frequencyId') &&
                  <FormHelperText error>{errors.get('autoCreateTask.frequencyId').get(0)}</FormHelperText>}
                </FormControl>
                <FormControl aria-describedby='maxStudent-error-text' className='full-width form-inputs'>
                  <InputLabel htmlFor='maxStudent-error'>Max Students</InputLabel>
                  <Input
                    type="number"
                    name='maxStudent'
                    margin='dense'
                    fullWidth
                    value={taskConfig.autoCreateTask.maxStudent || ''}
                    onChange={this._handleInputChange}/>
                  {errors && errors.get('autoCreateTask.maxStudent') &&
                  <FormHelperText error>{errors.get('autoCreateTask.maxStudent').get(0)}</FormHelperText>}
                </FormControl>
                <FormControl aria-describedby='courseDuration-error-text' className='full-width form-inputs'>
                  <InputLabel htmlFor='duration-error'>Duration in days</InputLabel>
                  <Input
                    type="number"
                    name='courseDuration'
                    margin='dense'
                    fullWidth
                    value={taskConfig.autoCreateTask.courseDuration || ''}
                    onChange={this._handleInputChange}/>
                  {errors && errors.get('autoCreateTask.courseDuration') &&
                  <FormHelperText error>{errors.get('autoCreateTask.courseDuration').get(0)}</FormHelperText>}
                </FormControl>
                <FormControl className='full-width form-inputs'>
                  <InputLabel htmlFor='name-error'>Teacher</InputLabel>
                  <Select
                    primarytext="Select Teacher"
                    name='teacherId'
                    onChange={(e) => {
                      this._handleInputChange(e)
                    }}
                    value={taskConfig.autoCreateTask.teacherId || ''}>
                    <MenuItem value={null} primarytext=""/>

                    {schoolTeachersSuccess && this._renderTeachers()}
                  </Select>
                  {errors && errors.get('teacherId') &&
                  <FormHelperText error>{errors.get('teacherId').get(0)}</FormHelperText>}
                </FormControl>
                {taskConfig &&
                <div className="row">
                  <div className="col-4">
                    <img src={taskConfig.image} width={70} alt={taskConfig.crsTitle}/>
                  </div>
                  <div className="col-8 d-flex justify-content-center flex-column">
                    {taskConfig.crsTitle}
                  </div>
                </div>
                }
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
            variant="raised"
            className='mt-btn-success m--margin-top-10 pull-right btn btn-success mt-btn'
            color='primary'>
            Start Auto Classroom
          </Button>
        </DialogActions>
      </Modal>
    );
  }
}

EditAutoClassroomModal = connect(
  (state) => ({
    getSingleRecordRequest: selectGetSingleRecordRequest(state),
    updateRequest: selectUpdateRequest(state),
    getSchoolTeacherRequest: selectGetSchoolTeachersRequest(state),
  }),
  (dispatch) => ({
    update: (id, form, params = {}) => {
      dispatch(updateAutoClass(id, form, params))
    },
    resetUpdateRequest: () => {
      dispatch(resetUpdateRequest())
    },
    resetGetSingleRecordRequest: () => {
      dispatch(resetGetSingleRecordRequest())
    },
  })
)(EditAutoClassroomModal);

export default EditAutoClassroomModal;
