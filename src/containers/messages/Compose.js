import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Select, MenuItem, InputLabel, Input, TextField, FormControl, FormHelperText, FormControlLabel, Checkbox } from '@material-ui/core';
import { selectGetSchoolHomeroomsRequest, selectGetSchoolClassroomsRequest, selectGetSchoolTeachersRequest } from '../../redux/schools/selectors';
import { getSchoolHomerooms, getSchoolClassrooms, getSchoolTeachers} from '../../redux/schools/actions';
import { selectSendMessageRequest, selectGetRecordRequest } from '../../redux/messages/selectors';
import { selectGetUserRequest, selectUserData } from "../../redux/user/selectors";
import { selectUserRoles } from "../../redux/user/selectors";
import { sendMessage, getDraftMessage, resetSendMessageRequest, resetGetMessageRequest } from '../../redux/messages/actions';
import Loader from '../../components/layouts/Loader';
import HasRole from "../middlewares/HasRole";

class Compose extends Component {

    constructor(props) {
        super(props);
        
        this.state = this.getInitialState();
    }
    
    getInitialState() {
        return {
            draftId: null,
            subject: null,
            type: null, 
            recipient: null,
            message: null,
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
            teacherId: []            
        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {            
            this.props.getDraftMessage(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(nextProps) {
       
        const {
            homeroomsRequest,
            classroomsRequest, 
            teachersRequest, 
            sendMessageRequest, 
            resetSendMessageRequest,
            resetGetMessageRequest,
            messageRequest, 
            goTo} = this.props;

        if (this.props.match.params.id !== nextProps.match.params.id) {
            resetGetMessageRequest();
            this.setState(this.getInitialState());
        }
        
        if (!messageRequest.get('success') && nextProps.messageRequest.get('success')) {
            resetSendMessageRequest();
            this._setDraftMessage(nextProps.messageRequest.get('record').toJS());
        }
        
        if (!homeroomsRequest.get('success') && nextProps.homeroomsRequest.get('success')) {
            this.setState({homerooms: nextProps.homeroomsRequest.get('records').toJS()});
        }
        
        if (!classroomsRequest.get('success') && nextProps.classroomsRequest.get('success')) {
            this.setState({classrooms: nextProps.classroomsRequest.get('records').toJS()});
        }
        
        if (!teachersRequest.get('success') && nextProps.teachersRequest.get('success')) {
            this.setState({teachers: nextProps.teachersRequest.get('records').toJS()});
        }
        
        if (!sendMessageRequest.get('success') && nextProps.sendMessageRequest.get('success')) {
            resetSendMessageRequest();
            goTo(`/messages/${this.state.isDraft ? 'drafts' : 'sent'}`);
        }        
    }
    
    _setDraftMessage(message)
    {
        this.setState({
            draftId: message.id,
            recipient: message.recipients,
            type: message.type,
            message: message.body,
            subject: message.subject,
            [message.recipients]: message.recipientsIds
        });
        
        this._changeRecipients(message.recipients);
    }
    
    _handleChange(event) {
        const { value, name } = event.target;
        
        this.setState({[name]: value});
        
        if (name === 'recipients') {
            this._changeRecipients(value);
        }
    }
    
    _changeRecipients(recipients) {                   
        if (recipients === 'classroomIds' && !this.state.classrooms) {
            this.props.getClassrooms();
        }
        
        if (recipients === 'homeroomIds' && !this.state.homerooms) {
            this.props.getHomerooms();
        }
        
        if (recipients === 'teacherId' && !this.state.teachers) {
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
        this.setState({isDraft: false});
        
        this._send(false);
    }
    
    _saveAsDraft() {        
        this.setState({isDraft: true});
        
        this._send(true);
    }
    
    _send(draft) {
        const {sendMessage} = this.props;
        const {message, type, recipient, subject, draftId } = this.state;                
        
        sendMessage({
            draftId:        draftId,
            message:        message,
            subject:        subject,
            type:           type,
            recipients:     recipient,
            ids:            this.state[recipient] || 'all',
            isDraft:        draft
        });        
    }
    
    _goBack() {
        this.props.resetGetMessageRequest();     
        this.props.resetSendMessageRequest();        
        this.props.goTo(this.state.draftId ? '/messages/drafts' : '/messages');
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
        const {homeroomsRequest, classroomsRequest, teachersRequest, sendMessageRequest, messageRequest, t} = this.props;

        const loading = homeroomsRequest.get('loading') || classroomsRequest.get('loading') || teachersRequest.get('loading') || sendMessageRequest.get('loading') || messageRequest.get('loading');
        
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
                                <FormControl className='full-width form-inputs'>
                                    <InputLabel htmlFor='recipients'>{t('recipients')}</InputLabel>
                                    <HasRole roles={['Teacher']}>
                                        <Select
                                            value={this.state.recipient || ''}
                                            onChange={(e) => { this._handleChange(e) }}
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
                                    {errors && errors.get('recipients') && <FormHelperText error>{errors.get('recipients').get(0)}</FormHelperText>}
                                </FormControl>
                            </div>
                            </HasRole> 
                            <div className="col-sm-6 col-md-5 col-lg-4">
                                <FormControl className='full-width form-inputs'>
                                    <InputLabel htmlFor='type'>{t('type')}</InputLabel>
                                    <Select
                                        value={this.state.type || ''}
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
                                </FormControl>
                            </div>
                        </div>

                        {this._renderRecipients()}
                        
                        <div className='row'>
                          <div className='col-sm-12 col-md-12'>
                              <FormControl className='full-width form-inputs'>
                                <InputLabel htmlFor='title-error'>{t('subject')}</InputLabel>
                                <Input
                                  name='subject'                                  
                                  fullWidth
                                  value={this.state.subject || ''}
                                  onChange={(e) => {
                                    this._handleChange(e)
                                  }}/>
                                {errors && errors.get('subject') && <FormHelperText error>{errors.get('subject').get(0)}</FormHelperText>}
                              </FormControl>
                          </div>        
                        </div>
                        
                        <div className='row'>
                            <div className='col-sm-12 col-md-12'>
                                <FormControl className='full-width form-inputs'>
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
                                </FormControl>
                          </div>        
                        </div>
                        <div className='row'>
                            <div className='col-sm-12 col-md-12 text-center'>
                                <button onClick={() => { this._goBack() }} disabled={loading} className="btn btn-default m--margin-right-10" >{t('back')}</button>
                                
                                <button onClick={() => { this._saveAsDraft() }} disabled={loading} className="btn btn-success m--margin-right-10" >{t('saveAsDraft')}</button>
                                                                        
                                <button onClick={() => { this._sendMessage() }} disabled={loading} className="btn btn-success" >{t('sendMessage')}</button>
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
        messageRequest: selectGetRecordRequest(state),
        sendMessageRequest: selectSendMessageRequest(state),
        homeroomsRequest: selectGetSchoolHomeroomsRequest(state),
        classroomsRequest: selectGetSchoolClassroomsRequest(state),
        teachersRequest: selectGetSchoolTeachersRequest(state),
        userRoles: selectUserRoles(state),
        userRequest: selectGetUserRequest(state),
        userData: selectUserData(state)
    }),
    (dispatch) => ({
        getDraftMessage: (id) => { dispatch(getDraftMessage(id)) },
        resetGetMessageRequest: () => { dispatch(resetGetMessageRequest()) },
        sendMessage: (params = {}) => { dispatch(sendMessage(params)) },
        resetSendMessageRequest: () => { dispatch(resetSendMessageRequest()) },
        getHomerooms: (params = {}) => { dispatch(getSchoolHomerooms(params)) },
        getClassrooms: (params = {}) => { dispatch(getSchoolClassrooms(params)) },
        getTeachers: (params = {}) => { dispatch(getSchoolTeachers(params)) },
        goTo: (page) => { dispatch(push(page)) }
    })
)(Compose);

export default translate('translations')(Compose);