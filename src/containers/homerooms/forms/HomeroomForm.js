import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { FormControl, FormControlLabel, FormHelperText, Input, Checkbox, InputLabel, MenuItem, Select, Typography, Tab, Tabs } from '@material-ui/core';
import {getSchoolTeachers, getSchoolStudents} from "../../../redux/schools/actions";
import {
    selectGetSchoolStudentsRequest, selectGetSchoolTeachersRequest    
} from "../../../redux/schools/selectors";
import MuiDatePicker from '../../../components/ui/MuiDatePicker';
import ImageCropper from "../../../components/ui/ImageCropper";

function TabContainer(props) {
  return (
    <Typography component="div" className="mt-4">
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class HomeroomForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    homeroom: PropTypes.object.isRequired,    
    errors: PropTypes.any
  };

  constructor (props) {
    super(props);
    this.state = {
      schoolTeachers: [],
      schoolStudents: [],
      activeTab: 0,
      studentIds: [],
      avatar: null
    };
  }

  handleChangeTab = (event, activeTab) => {
    this.setState({
      ...this.state,
      activeTab: activeTab
    });
  };

  componentDidMount() {
    const { homeroom, getSchoolTeachers, getSchoolStudents } = this.props;

    if (homeroom.id) {
      const studentIds = homeroom.students.map((student) => {
        return student.id.toString();
      });
           
      this.setState({
        ...this.state,
        avatar: homeroom.avatar,
        studentIds: studentIds
      });
    }
    
    const params = homeroom.id ? {schoolId: homeroom.schoolId} : {};
    
    getSchoolTeachers(params);
    getSchoolStudents(params);
  }

  componentDidUpdate(prevProps) {
    this._getSchoolTeachersSuccess(prevProps);
    this._getSchoolStudentsSuccess(prevProps);
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

  _getSchoolStudentsSuccess(prevProps) {
    const success = this.props.getSchoolStudentsRequest.get('success');    

    if (success && !prevProps.getSchoolStudentsRequest.get('success')) {
      this.setState({
        ...this.state,
        schoolStudents: this.props.getSchoolStudentsRequest.get('records').toJS()
      });
    }
  }

  _handleDateChange(m, dateField) {
      this.props.onChange({
      ...this.props.homeroom,
      [dateField]: m
    });
  }

  _handleInputChange(event) {
    const { name, value } = event.target;

    this.props.onChange({
      ...this.props.homeroom,
      [name]: value
    });
  }
  
  _setCroppedImage(img) {
    this.props.onChange({
      ...this.props.homeroom,
      avatarCropped: img
    });    
  }

  _setImage(img) {
    this.setState({ avatar: img });
  }  

  _handleStudentsCheckboxChange(event) {
    const { value } = event.target;
    const index = this.state.studentIds.indexOf(value.toString());

    if (index < 0) {
      this.state.studentIds.push(value.toString());
    } else {
      this.state.studentIds.splice(index, 1);
    }

    this.props.onChange({
      ...this.props.homeroom,
      homeroomStudents: this.state.studentIds
    });
  }

  _renderTeachers() {
    const { schoolTeachers } = this.state;

    return schoolTeachers.map((teacher, key) => (
      <MenuItem key={key} value={ teacher.id }>
        { teacher.name }
      </MenuItem>
    ));
  }

  _renderStudents() {
    const { schoolStudents } = this.state;
    const { t } = this.props;
    
    if (!schoolStudents.length) {
      return <div>
        <Typography variant="h6" gutterBottom>
          {t('studentsNotFound')}
        </Typography>
      </div>
    }

    return schoolStudents.map((student, key) => (
      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3" key={key}>
        <FormControlLabel
          control={<Checkbox
            color="primary"
            checked={this.state.studentIds.indexOf(student.id.toString()) > -1}
            onChange={ (e) => {this._handleStudentsCheckboxChange(e) }}
            value={student.id.toString()}
          />}
          label={student.name}
        />
      </div>
    ))
  }

  render() {
    const { homeroom, errors, t } = this.props;
    const { activeTab } = this.state;

    return (
        <div>
          <Tabs value={activeTab} onChange={this.handleChangeTab}>
            <Tab label={t('details')} />            
            <Tab label={t('students')} />
          </Tabs>

          {activeTab === 0 && <TabContainer>
          <div className="row">
            <div className="col-sm-12 col-md-7 col-xl-6 m-auto">
            <FormControl className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>{t('name')}</InputLabel>
              <Input
                name='name'
                margin='dense'
                fullWidth
                value={homeroom.name || ''}
                onChange={(e) => { this._handleInputChange(e) }}/>
                {errors && errors.get('name') && <FormHelperText error>{ errors.get('name').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl className='full-width form-inputs'>
              <InputLabel htmlFor='name-error'>{t('teacher')}</InputLabel>
              <Select
                  primarytext={t('selectTeacher')}
                  name='teacherId'
                  onChange={(e) => { this._handleInputChange(e) }}
                  value={homeroom.teacherId || ''}>
                <MenuItem value={null} primarytext=""/>
                {this._renderTeachers()}
              </Select>
              {errors && errors.get('teacherId') && <FormHelperText error>{ errors.get('teacherId').get(0) }</FormHelperText>}
            </FormControl>            
            <FormControl className='full-width form-inputs'>
                <MuiDatePicker
                  label={t('startDate')}
                  name='startDate'
                  value={homeroom.startDate || null}
                  onChange={(m) => { this._handleDateChange(m, 'startDate') }}
                />              
              {errors && errors.get('startDate') && <FormHelperText error>{ errors.get('startDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl className='full-width form-inputs'>
                <MuiDatePicker
                  label={t('endDate')}
                  name='endDate'
                  value={homeroom.endDate || null}
                  onChange={(m) => { this._handleDateChange(m, 'endDate') }}
                />              
              {errors && errors.get('endDate') && <FormHelperText error>{ errors.get('endDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl className='full-width form-inputs'>          
                <MuiDatePicker
                  label={t('enrollmentStartDate')}
                  name='enrollmentStartDate'
                  value={homeroom.enrollmentStartDate || null}
                  onChange={(m) => { this._handleDateChange(m, 'enrollmentStartDate') }}
                />              
              {errors && errors.get('enrollmentStartDate') && <FormHelperText error>{ errors.get('enrollmentStartDate').get(0) }</FormHelperText>}
            </FormControl>
            <FormControl className='full-width form-inputs'>
                <MuiDatePicker
                  label={t('enrollmentEndDate')}
                  name='enrollmentEndDate'
                  value={homeroom.enrollmentEndDate || null}
                  onChange={(m) => { this._handleDateChange(m, 'enrollmentEndDate') }}
                />              
              {errors && errors.get('enrollmentEndDate') && <FormHelperText error>{ errors.get('enrollmentEndDate').get(0) }</FormHelperText>}
            </FormControl>
            </div>
              <div className="col-sm-12 col-md-5">
                <ImageCropper
                  circularButton
                  image={homeroom.avatar || ''}
                  onCrop={(cropImg) => this._setCroppedImage(cropImg)}
                  setFile={(img) => this._setImage(img)}
                />
              </div>
              </div>
          </TabContainer>}
          {activeTab === 1 && <TabContainer>
            <div className="row">
                {this._renderStudents()}
            </div>
          </TabContainer>}        
        </div>
    );
  }
}

export default withTranslation('translations')(connect(
  (state) => ({    
    getSchoolTeacherRequest: selectGetSchoolTeachersRequest(state),
    getSchoolStudentsRequest: selectGetSchoolStudentsRequest(state),
  }),
  (dispatch) => ({    
    getSchoolTeachers: (params = {}) => { dispatch(getSchoolTeachers(params)) },
    getSchoolStudents: (params = {}) => { dispatch(getSchoolStudents(params)) }
  })
)(HomeroomForm));