import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Select, MenuItem, InputLabel, TextField, FormHelperText, FormControlLabel, Checkbox, Button} from '@material-ui/core';
import Loader from '../../components/layouts/Loader';
import { selectGetSchoolHomeroomsRequest, selectGetSchoolClassroomsRequest, selectGetSchoolTeachersRequest } from '../../redux/schools/selectors';
import { getSchoolHomerooms, getSchoolClassrooms, getSchoolTeachers} from '../../redux/schools/actions';
import { selectSendMessageRequest } from '../../redux/messages/selectors';
import { selectGetUserRequest, selectUserData } from "../../redux/user/selectors";
import { selectUserRoles } from "../../redux/user/selectors";
import { sendMessage } from '../../redux/messages/actions';
import HasRole from "../middlewares/HasRole";

class Compose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipient: '',
            type: 'mail',            
            homerooms: null,
            classrooms: null,
            teachers: null,
            roles: [
                'student',
                'teacher',
                'principal',
                'administrator',                
                'superintendent'
            ],
            homeroomIds: [],
            classroomIds: [],
            roleIds: [],
            teacherId: [],
            message: ''
        }
    }

    componentDidMount() {
        

    }

    componentWillReceiveProps(nextProps) {
       
        const {homeroomsRequest, classroomsRequest, teachersRequest} = this.props;

        if (!homeroomsRequest.get('success') && nextProps.homeroomsRequest.get('success')) {
            this.setState({homerooms: nextProps.homeroomsRequest.get('records').toJS()});
        }
        
        if (!classroomsRequest.get('success') && nextProps.classroomsRequest.get('success')) {
            this.setState({classrooms: nextProps.classroomsRequest.get('records').toJS()});
        }
        
        if (!teachersRequest.get('success') && nextProps.teachersRequest.get('success')) {
            this.setState({teachers: nextProps.teachersRequest.get('records').toJS()});
        }         
    }
    
    _handleChange(event) {
        const { value, name } = event.target;  
        
        this.setState({[name]: value});        
    }
    
    _handleChangeRecipients(event) {
        const { value } = event.target;  
        this.setState({recipient: value});                
        alert(value);
        if (value === 'classroomIds' && !this.state.classrooms) {
            this.props.getClassrooms();
        }
        
        if (value === 'homeroomIds' && !this.state.homerooms) {
            this.props.getHomerooms();
        }
        
        if (value === 'teacherId' && !this.state.teachers) {
            this.props.getTeachers();
        }        
    }
    
    _handleCheckboxChange(event) {
        const { value, name } = event.target;
        
        let selected = this.state[name];
        let index = selected.indexOf(value.toString());
        
        if (index < 0) {
            selected.push(value.toString());
        } else {
            selected.splice(index, 1);
        }
        
        this.setState({[name]: selected});
    }
    
    _handleSelectAllChange(event, ids)
    {
        const { checked, name } = event.target;
        this.setState({[name]: (checked ? ids : [])});
    }
    
    _sendMessage() {
        const {sendMessage} = this.props;
        const {message, type, recipient } = this.state;
        
        sendMessage({
            message:        message,
            type:           type,
            recipients:     recipient,
            [recipient]:    this.state[recipient] || 'all'
        });
    }
    
    _renderRecipients()
    {        
        const {recipient, roles, homerooms, classrooms, teachers, classroomIds, homeroomIds, roleIds} = this.state;        
        const {t, sendMessageRequest, userRequest, userData} = this.props;
        const errors = sendMessageRequest.get('errors');
        const userId = userRequest.get('success') ? userData.get('id') : null;
        
        if (recipient === 'homeroomIds' && homerooms) {
            return this._renderRecipientCheckboxes('selectHomerooms', 'homeroomIds', homerooms.map(option => ({
                id:     option.id,
                name:   option.name
            })), homeroomIds);
        }
        
        if (recipient === 'classroomIds' && classrooms) {
            return this._renderRecipientCheckboxes('selectClassrooms', 'classroomIds', classrooms.map(option => ({
                id:     option.crmId,
                name:   option.crmName
            })), classroomIds);
        }        
               
        if (recipient === 'roleIds') {
            return this._renderRecipientCheckboxes('selectRoles', 'roleIds', roles.map(option => ({
                id:     option,
                name:   t(option + 'Role')
            })), roleIds);
        }
        
        if (recipient === 'teacherId' && teachers) {        
            return (<div className="row">
                <div className="col-sm-6 col-md-5 col-lg-4">
                    <div aria-describedby='recipients' className='full-width form-inputs d-inline-flex flex-column'>
                        <InputLabel htmlFor='recipients'>{t('teacher')}</InputLabel>

                        <Select
                            value={this.state.teacherId}
                            onChange={(e) => { this._handleChange(e) }}
                            inputProps={{ name: 'teacherId', id: 'teacherId' }}
                            >
                            {teachers.map((teacher, key) => (
                               (userId !== teacher.id) && <MenuItem key={key} value="{teacher.id.toString()}">{teacher.firstName} {teacher.lastName}</MenuItem>
                            ))}                        
                        </Select>                        
                    </div>
                    {errors && errors.get('recipients') && <FormHelperText error>{errors.get('recipients').get(0)}</FormHelperText>}
                </div>
            </div>);
        }
    }
    
    _renderRecipientCheckboxes(title, name, options, selected)
    {
        const {t, sendMessageRequest} = this.props;
        const errors = sendMessageRequest.get('errors');
        
        return <div className="row">
            <div className="col-sm-12">{t(title)}</div>
            {options.map((option, key) => (
                <div key={key} className="col-sm-4 col-lg-3 margin-0">
                      <FormControlLabel
                        control={<Checkbox checked={selected.indexOf(option.id.toString()) > -1} name={name} onChange={ (e) => {this._handleCheckboxChange(e) }} value={option.id.toString()} />}
                        label={option.name} />                            
                </div>
            ))}
            <div className="col-sm-4 col-lg-3 margin-0">
                <FormControlLabel
                  control={<Checkbox name={name} checked={(selected.length === options.length)} onChange={ (e) => {this._handleSelectAllChange(e, options.map(option => option.id.toString())) }} value="1" />}
                  label={t('selectAll')} />                            
            </div>
            {errors && errors.get('recipients') && <div className="col-sm-12"><FormHelperText error>{errors.get('recipients').get(0)}</FormHelperText></div>}
        </div>;       
    }
    
    render() {
        const {homeroomsRequest, classroomsRequest, teachersRequest, sendMessageRequest, t} = this.props;

        const loading = homeroomsRequest.get('loading') || classroomsRequest.get('loading') || teachersRequest.get('loading') || sendMessageRequest.get('loading');                
        
        const errors = sendMessageRequest.get('errors');
        
        const roles = this.props.userRoles.toJS();
        
        if (roles && roles[0] && roles[0].name === 'Parents' && !this.state.recipient) {
            this.props.getTeachers();
            this.setState({recipient: 'teacherId'});
        }
        
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
                            <HasRole roles={['Superadministrator', 'Superintendent', 'Principal', 'Administrator', 'Teacher']}>
                            <div className="col-sm-6 col-md-5 col-lg-4">
                                <div aria-describedby='recipients' className='full-width form-inputs d-inline-flex flex-column'>
                                    <InputLabel htmlFor='recipients'>{t('recipients')}</InputLabel>
                                    <HasRole roles={['Teacher']}>
                                        <Select
                                            value={this.state.recipient || ''}
                                            onChange={(e) => { this._handleChangeRecipients(e) }}
                                            inputProps={{  name: 'recipients', id: 'recipients' }}
                                            >
                                            <MenuItem value="0"></MenuItem>
                                            <MenuItem value="classroomIds">{t('classrooms')}</MenuItem>
                                            <MenuItem value="homeroomIds">{t('homerooms')}</MenuItem>                                        
                                            <MenuItem value="teacherId">{t('teacher')}</MenuItem>
                                        </Select>
                                    </HasRole>
                                    <HasRole roles={['Superadministrator', 'Superintendent', 'Principal', 'Administrator']}>
                                        <Select
                                            value={this.state.recipient || ''}
                                            onChange={(e) => { this._handleChangeRecipients(e) }}
                                            inputProps={{  name: 'recipients', id: 'recipients' }}
                                            >
                                            <MenuItem value="0"></MenuItem>
                                            <MenuItem value="roleIds">{t('entireSchool')}</MenuItem>
                                            <MenuItem value="classroomIds">{t('classrooms')}</MenuItem>
                                            <MenuItem value="homeroomIds">{t('homerooms')}</MenuItem>                                           
                                            <MenuItem value="teachers">{t('teachers')}</MenuItem>
                                            <MenuItem value="students">{t('studentsAndParents')}</MenuItem>
                                        </Select>
                                    </HasRole>
                                </div>
                                {errors && errors.get('recipients') && <FormHelperText error>{errors.get('recipients').get(0)}</FormHelperText>}
                            </div>
                            </HasRole> 
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
                                        <MenuItem value="mail">{t('mail')}</MenuItem> 
                                        <MenuItem value="alert">{t('alert')}</MenuItem>
                                        <MenuItem value="annoucement">{t('annoucement')}</MenuItem>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {this._renderRecipients()}
                        
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
                                {errors && errors.get('message') && <FormHelperText error>{errors.get('message').get(0)}</FormHelperText>}
                          </div>        
                        </div>
                        <div className='row'>
                            <div className='col-sm-12 col-md-12 text-center'>
                                <Button
                                  type='submit'
                                  form='create-student-form'            
                                  variant="raised"
                                  className='mt-btn-success m--margin-top-10 btn btn-success mt-btn'
                                  color='primary'
                                  disabled={loading}
                                  onClick={(e) => {
                                      this._sendMessage(e)
                                  }} >
                                  {t('sendMessage')}                                     
                                </Button>                                                                    
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
        sendMessageRequest: selectSendMessageRequest(state),
        homeroomsRequest: selectGetSchoolHomeroomsRequest(state),
        classroomsRequest: selectGetSchoolClassroomsRequest(state),
        teachersRequest: selectGetSchoolTeachersRequest(state),
        userRoles: selectUserRoles(state),
        userRequest: selectGetUserRequest(state),
        userData: selectUserData(state)
    }),
    (dispatch) => ({
        sendMessage: (params = {}) => { dispatch(sendMessage(params)) },
        getHomerooms: (params = {}) => { dispatch(getSchoolHomerooms(params)) },
        getClassrooms: (params = {}) => { dispatch(getSchoolClassrooms(params)) },
        getTeachers: (params = {}) => { dispatch(getSchoolTeachers(params)) }
    })
)(Compose);

export default translate('translations')(Compose);