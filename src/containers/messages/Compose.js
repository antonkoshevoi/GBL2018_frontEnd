import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Select, MenuItem, InputLabel, TextField, FormHelperText, FormControl } from '@material-ui/core';
import Loader from '../../components/layouts/Loader';
import { selectGetSchoolTeachersRequest, selectGetSchoolStudentsRequest, selectGetSchoolHomeroomsRequest, selectGetSchoolClassroomsRequest } from '../../redux/schools/selectors';
import { getSchoolTeachers, getSchoolStudents, getSchoolHomerooms, getSchoolClassrooms } from '../../redux/schools/actions';

class Compose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipient: 'groups',
            type: 'mail',
            homerooms: null,
            classrooms: null,
            teachers: null,
            students: null,
            message: ''
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
       
        const {teachersRequest, studentsRequest, homeroomsRequest, classroomsRequest} = this.props;

        if (!teachersRequest.get('success') && nextProps.teachersRequest.get('success')) {
            this.setState({teachers: nextProps.teachersRequest.get('records')});
        }
        
        if (!studentsRequest.get('success') && nextProps.studentsRequest.get('success')) {
            this.setState({students: nextProps.studentsRequest.get('records')});
        }
        
        if (!homeroomsRequest.get('success') && nextProps.homeroomsRequest.get('success')) {
            this.setState({homerooms: nextProps.homeroomsRequest.get('records')});
        }
        
        if (!classroomsRequest.get('success') && nextProps.classroomsRequest.get('success')) {
            this.setState({classrooms: nextProps.classroomsRequest.get('records')});
        }        
    }
    
    _handleChange(event) {
        const { value, name } = event.target;  
        
        this.setState({[name]: value});        
    }
    
    _handleChangeRecipients(event) {
        const { value } = event.target;  
        this.setState({recipient: value});
        
        if (value === 'classrooms' && !this.state.classrooms) {
            this.props.getClassrooms();
        }
        
        if (value === 'homerooms' && !this.state.homerooms) {
            this.props.getHomerooms();
        }
        
        if (value === 'teachers' && !this.state.teachers) {
            this.props.getTeachers();
        }
        
        if (value === 'students' && !this.state.students) {
            this.props.getStudents();
        }        
    }
        
    render() {
        const {teachersRequest, studentsRequest, homeroomsRequest, classroomsRequest, t} = this.props;

        const loading = teachersRequest.get('loading') || studentsRequest.get('loading') || homeroomsRequest.get('loading') || classroomsRequest.get('loading');
        
        const error = null;
        
        return (
                <div className="animated fadeInLeft">
                    { loading && <Loader/> }
                    <div className="m-portlet messages-portlet  m-portlet--info">
                        <div className='m-portlet__head border-b-blue'>
                            <div className='m-portlet__head-caption'>
                                <div className='m-portlet__head-title'>
                                    <span className='m-portlet__head-icon'>
                                        <i className='la la-comments-o' style={{fontSize: '55px'}}></i>
                                    </span>
                                    <h3 className='m-portlet__head-text'>{t('composeMessage')}</h3>
                                </div>
                            </div>
                        </div>          
                        <div className="m-portlet__body">
                            <div className="row">
                                <div className="col-sm-6 col-md-5 col-lg-4">
                                    <div aria-describedby='recipients' className='full-width form-inputs d-inline-flex flex-column'>
                                        <InputLabel htmlFor='recipients'>{t('recipients')}</InputLabel>

                                        <Select
                                            value={this.state.recipient}
                                            onChange={(e) => { this._handleChangeRecipients(e) }}
                                            inputProps={{
                                                name: 'recipients',
                                                id: 'recipients'
                                            }}
                                            >
                                            <MenuItem key={1} value="groups">{t('entireSchool')}</MenuItem>
                                            <MenuItem key={2} value="classrooms">{t('classrooms')}</MenuItem>
                                            <MenuItem key={3} value="homerooms">{t('homerooms')}</MenuItem>
                                            <MenuItem key={4} value="teachers">{t('teachers')}</MenuItem>
                                            <MenuItem key={5} value="students">{t('studentsAndParents')}</MenuItem>    
                                        </Select>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-5 col-lg-4">
                                    <div aria-describedby='recipients' className='full-width form-inputs d-inline-flex flex-column'>
                                        <InputLabel htmlFor='type'>{t('type')}</InputLabel>
                                        <Select
                                            value={this.state.type}
                                            onChange={(e) => { this._handleChange(e) }}
                                            inputProps={{
                                                name: 'type',
                                                id: 'type'
                                            }}
                                            >
                                            <MenuItem key={3} value="mail">{t('mail')}</MenuItem> 
                                            <MenuItem key={1} value="alert">{t('alert')}</MenuItem>
                                            <MenuItem key={2} value="annoucement">{t('annoucement')}</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                                <div className='row'>
                                  <div className='col-sm-12 col-md-12'>
                                        <TextField                                                                                    
                                            multiline
                                            id="message"                   
                                            placeholder={t('message')}          
                                            fullWidth
                                            margin="normal"
                                            variant="outlined"                                          
                                            rows="20"                                  
                                            value={this.state.message || ''}   
                                            inputProps={{
                                              name: 'message',
                                              id: 'message'
                                            }}                                          
                                            onChange={(e) => {
                                                this._handleChange(e)
                                            }}                      
                                        />       
                                        {error && <FormHelperText error>{error}</FormHelperText>}                                    
                                  </div>        
                                </div>                                
                            </div>
                        </div>                    
                </div>
        );
    }
}

Compose = connect(
    (state) => ({
        teachersRequest: selectGetSchoolTeachersRequest(state), 
        studentsRequest: selectGetSchoolStudentsRequest(state), 
        homeroomsRequest: selectGetSchoolHomeroomsRequest(state), 
        classroomsRequest: selectGetSchoolClassroomsRequest(state)
    }),
    (dispatch) => ({
        getTeachers: (params = {}) => { dispatch(getSchoolTeachers(params)) },
        getStudents: (params = {}) => { dispatch(getSchoolStudents(params)) },
        getHomerooms: (params = {}) => { dispatch(getSchoolHomerooms(params)) },
        getClassrooms: (params = {}) => { dispatch(getSchoolClassrooms(params)) }
    })
)(Compose);

export default translate('translations')(Compose);