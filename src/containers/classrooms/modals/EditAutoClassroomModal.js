import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, CircularProgress,
  DialogContent, 
  Icon,
  Toolbar, Typography,
  Divider, Button, DialogActions, FormControl, InputLabel, Input, FormHelperText, Select, MenuItem
} from '@material-ui/core';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {
  selectGetSingleRecordRequest,
  selectUpdateRequest
} from '../../../redux/classrooms/selectors';
import {
  resetGetSingleRecordRequest, resetUpdateRequest,
  updateAutoClass
} from '../../../redux/classrooms/actions';
import Modal from "../../../components/ui/Modal";
import {selectGetSchoolTeachersRequest} from "../../../redux/schools/selectors";

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
      schoolTeachers: [],
      taskConfig: {
        autoCreateTask: {
          frequency: 'weekly',
          courseDuration: 150,
          maxStudent: 100,
          rollOver: null
        }
      }
    };
  }

  componentDidUpdate(prevProps) {
    const record = this.props.getSingleRecordRequest.get('record');

    if (record && !prevProps.getSingleRecordRequest.get('record')) {
      this.setState({
        id: record.get('crsId'),
        taskConfig: record.toJS()
      });
    }
    
    this._getSchoolTeachersSuccess(prevProps);
    
    const success = this.props.updateRequest.get('success');

    if (success && !prevProps.updateRequest.get('success')) {
      this._close();
      this.props.onSuccess();
    }
  }

  _getSchoolTeachersSuccess(prevProps) {
    const success = this.props.getSchoolTeacherRequest.get('success');

    if (success && !prevProps.getSchoolTeacherRequest.get('success')) {
      this.setState({
        ...this.state,
        schoolTeachers: this.props.getSchoolTeacherRequest.get('records').toJS()
      });
    }
  }

  _close() {
    this.setState({
      id: undefined,
      taskConfig: {
        autoCreateTask: {
          frequency: 'weekly',
          courseDuration: 150,
          maxStudent: 100,
          rollOver: null
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

  _handleDateChange = (date,dateField) => {
    this.setState({
      taskConfig: {
        ...this.state.taskConfig,
        autoCreateTask: {
          ...this.state.taskConfig.autoCreateTask,
          [dateField]: date,
        }
      }
    });
  }

  _onSubmit(e) {
    e.preventDefault();
    const {taskConfig} = this.state;
    
    this.props.update(taskConfig.crsId, taskConfig);    
  };

  _renderTeachers() {
    const {schoolTeachers} = this.state;

    return schoolTeachers.map((teacher, key) => (
      <MenuItem key={key} value={teacher.id}>
        {teacher.name}
      </MenuItem>
    ));
  }

  _renderRollOverDay(){
    const {taskConfig} = this.state;
    const {t} = this.props;
    const days = Array.from(Array(28).keys());
    return (
        <div>
        {taskConfig.autoCreateTask.frequency === 'weekly' &&

        <FormControl className='full-width form-inputs'>          
            <InputLabel htmlFor="age-simple">{t('rolloverDay')}</InputLabel>
            <Select
              name="rollOver"
              value={taskConfig.autoCreateTask.rollOver || ''}
              onChange={this._handleInputChange}
            >
              <MenuItem value={'Monday'}>{t('monday')}</MenuItem>
              <MenuItem value={'Tuesday'}>{t('tuesday')}</MenuItem>
              <MenuItem value={'Wednesday'}>{t('wednesday')}</MenuItem>
              <MenuItem value={'Thursday'}>{t('thursday')}</MenuItem>
              <MenuItem value={'Friday'}>{t('friday')}</MenuItem>
              <MenuItem value={'Saturday'}>{t('saturday')}</MenuItem>
              <MenuItem value={'Sunday'}>{t('sunday')}</MenuItem>
            </Select>         
        </FormControl>

        }

          {taskConfig.autoCreateTask.frequency === 'monthly' &&
          <FormControl className='full-width form-inputs'>            
              <InputLabel htmlFor="age-simple">{t('rolloverDayNumber')}</InputLabel>
              <Select
                name="rollOver"
                value={+taskConfig.autoCreateTask.rollOver || ''}
                onChange={this._handleInputChange}
              >
                { days.map( (index,value) => (<MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)) }
              </Select>
          </FormControl>
          }
        </div>
    )
  }


  render() {
    const schoolTeachersSuccess = this.props.getSchoolTeacherRequest.get('success');
    const {isOpen, updateRequest, getSingleRecordRequest, t} = this.props;
    const loading = updateRequest.get('loading') || getSingleRecordRequest.get('loading');    
    const errors = updateRequest.get('errors');
    const {taskConfig} = this.state;

    return (
      <Modal isOpen={isOpen} onClose={() => this._close()}>
        <AppBar position="static" color="primary" className="dialogAppBar">
          <Toolbar>            
              {loading ? (
                <CircularProgress className="mr-3" color="inherit"/>
              ) : (
                <Icon className="mr-3">person</Icon>
              )}            
            <Typography variant="h6" color="inherit">
              {t('autoClassroomSimilarityRegularCreation')}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent className="mt-4">
          <form id='update-classroom-form' onSubmit={(e) => {
            this._onSubmit(e)
          }}>            
            <div className="row">
              <div className="col-md-12">
                <FormControl className='full-width form-inputs'>                  
                    <InputLabel htmlFor="age-simple">{t('frequency')}</InputLabel>
                    <Select
                      name="frequency"
                      value={taskConfig.autoCreateTask.frequency || ''}
                      onChange={this._handleInputChange}
                    >
                      <MenuItem value="weekly">{t('weekly')}</MenuItem>
                      <MenuItem value="monthly">{t('monthly')}</MenuItem>
                    </Select>                  
                  {errors && errors.get('autoCreateTask.frequency') &&
                  <FormHelperText error>{errors.get('autoCreateTask.frequency').get(0)}</FormHelperText>}
                </FormControl>
                {this._renderRollOverDay()}
                <FormControl  className='full-width form-inputs'>
                  <InputLabel htmlFor='maxStudent-error'>{t('maxStudents')}</InputLabel>
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
                <FormControl className='full-width form-inputs'>
                  <InputLabel htmlFor='duration-error'>{t('durationInDays')}</InputLabel>
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
                  <InputLabel htmlFor='name-error'>{t('teacher')}</InputLabel>
                  <Select
                    primarytext={t('selectTeacher')}
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
            className='mt-btn-success mt-btn'
            color='primary'>
            {t('startAutoClassroom')}
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

export default withTranslation('translations')(EditAutoClassroomModal);
