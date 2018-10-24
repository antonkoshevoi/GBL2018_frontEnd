import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Select, MenuItem, InputLabel, Input, TextField, FormControl, FormHelperText, FormControlLabel, Checkbox } from '@material-ui/core';
import { selectGetSchoolHomeroomsRequest, selectGetSchoolClassroomsRequest, selectGetSchoolTeachersRequest, selectGetSchoolAdminsRequest } from '../../../redux/schools/selectors';
import { getSchoolHomerooms, getSchoolClassrooms, getSchoolTeachers, getSchoolAdmins} from '../../../redux/schools/actions';
import { getUsers } from "../../../redux/connections/actions";
import { selectGetUserRequest, selectUserData } from "../../../redux/user/selectors";
import { selectGetUsersRequest} from "../../../redux/connections/selectors";
import Loader from '../../../components/layouts/Loader';
import HasRole from "../../middlewares/HasRole";

class MessageForm extends Component {

    constructor(props) {
        super(props);        
        this.state = this.getInitialState();
    }
    
    getInitialState() {
        return {            
            subject: null,
            type: 'mail', 
            recipient: null,
            message: null,
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
            teacherId: null,
            adminId: null,
            userId: null
        }
    }
    
    componentDidMount() {
        const {formData} = this.props;
        
        if (formData) {
            this.setState(formData);
            this._changeRecipients((formData.recipient || ''));
        }                
    }
    
    _handleChange(event) {
        const { value, name } = event.target;
        
        this.setState({[name]: value});
                       
        if (name === 'recipient') {
            this._changeRecipients(value);
        }
    }
    
    _changeRecipients(recipient) {
        
        const load = (actionName, requestName) => {
            const {[actionName]: action, [requestName]: request} = this.props;
            if (!(request.get('success') || request.get('loading'))) {
                action();
            }
        };
        
        (({
            classroomIds:   () => load('getClassrooms',   'classroomsRequest'),
            homeroomIds:    () => load('getHomerooms',    'homeroomsRequest'),
            teacherId:      () => load('getTeachers',     'teachersRequest'),
            adminId:        () => load('getAdmins',       'adminsRequest'),
            userId:         () => load('getUsers',        'usersRequest')
        })[recipient] || (() => false))();
    }
    
    _handleCheckboxChange(event) {
        let { value, name } = event.target;
        let {[name]: selected} = this.state;
        let index = selected.indexOf(value.toString());

        if (index < 0) {
            selected.push(value.toString());
        } else {
            selected.splice(index, 1);
        }
        
        this.setState({[name]: selected});
    }
    
    _handleSelectAllChange(event, ids) {
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
        const {onSubmit} = this.props;
        const {message, type, recipient, subject } = this.state;
        
        onSubmit({            
            message:        message,
            subject:        subject,
            type:           type,
            recipients:     recipient,
            ids:            this.state[recipient] || null,
            isDraft:        draft
        });        
    }
    
    _goBack() {
        this.props.onCancel();
    }     
    
    _renderRecipients()
    {        
        const {recipient, roles} = this.state;
        const {homeroomsRequest, classroomsRequest, teachersRequest, adminsRequest, usersRequest, t}   = this.props;                
        
        if (recipient === 'homeroomIds' && homeroomsRequest.get('success')) {
            return this._renderRecipientCheckboxes('selectHomerooms', 'homeroomIds', this._getOptions(homeroomsRequest));
        }
        
        if (recipient === 'classroomIds' && classroomsRequest.get('success')) {
            return this._renderRecipientCheckboxes('selectClassrooms', 'classroomIds', this._getOptions(classroomsRequest, 'crmId', 'crmName'));
        }        
               
        if (recipient === 'roleIds') {
            return this._renderRecipientCheckboxes('selectRoles', 'roleIds', roles.map(item => ({
                id:     item,
                name:   t(item + 'Role')
            })));
        }
        
        if (recipient === 'teacherId' && teachersRequest.get('success')) {   
            return this._renderRecipientSelectbox('selectTeacher', 'teacherId', this._getOptions(teachersRequest));
        }
        
        if (recipient === 'adminId' && adminsRequest.get('success')) {   
            return this._renderRecipientSelectbox('schoolManagement', 'adminId', this._getOptions(adminsRequest));
        }
        
        if (recipient === 'userId' && usersRequest.get('success')) {   
            return this._renderRecipientSelectbox('selectPersone', 'userId', this._getOptions(usersRequest));
        }
    }
    
    _getOptions(request, id = 'id', name = 'name') {
        return request.get('records').toJS().map(item => ({
            id:     item[id],
            name:   item[name]
        }));
    }
    
    _renderRecipientSelectbox(title, name, options) {
        const {t, errors, userRequest, userData} = this.props;        
        const {[name]: selected} = this.state;
        const userId = userRequest.get('success') ? userData.get('id') : null;       
        
        return <div className="row">
            <div className="col-sm-6 col-md-5 col-lg-4">
                <div aria-describedby='recipients' className='full-width form-inputs d-inline-flex flex-column'>
                    <InputLabel htmlFor='recipients'>{t(title)}</InputLabel>
                    <Select
                        value={selected ? selected.toString() : ''}
                        onChange={(e) => { this._handleChange(e) }}
                        name={name}
                        >
                        {options.map((option, key) => (
                           (userId !== option.id) && <MenuItem key={key} value={option.id.toString()}>{option.name}</MenuItem>
                        ))}
                    </Select>
                </div>
                {errors && errors.get('ids') && <FormHelperText error className="margin-0">{errors.get('ids').get(0)}</FormHelperText>}
            </div>
        </div>;       
    }
    
    _renderRecipientCheckboxes(title, name, options) {
        const {t, errors} = this.props;        
        const {[name]: selected} = this.state;
        
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
            {errors && errors.get('ids') && <div className="col-sm-12"><FormHelperText error className="margin-0">{errors.get('ids').get(0)}</FormHelperText></div>}
        </div>;       
    }
    
    render() {
        const {homeroomsRequest, classroomsRequest, teachersRequest, adminsRequest, usersRequest, errors, t} = this.props;
        const loading = homeroomsRequest.get('loading') || classroomsRequest.get('loading') || teachersRequest.get('loading') || adminsRequest.get('loading') || usersRequest.get('loading');
        
        return (
            <div>
                { loading && <Loader/> }                
                <div className="row">
                    <div className="col-sm-6 col-md-5 col-lg-4">
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='recipients'>{t('recipients')}</InputLabel>
                            <HasRole roles={['Parents']}>
                                <Select
                                    value={this.state.recipient || ''}
                                    onChange={(e) => { this._handleChange(e) }}
                                    name="recipient"
                                    >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="teacherId">{t('teacher')}</MenuItem>
                                    <MenuItem value="userId">{t('myConnections')}</MenuItem>
                                </Select>
                            </HasRole>                            
                            <HasRole roles={['Teacher']}>
                                <Select
                                    value={this.state.recipient || ''}
                                    onChange={(e) => { this._handleChange(e) }}
                                    name="recipient"
                                    >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="classroomIds">{t('classrooms')}</MenuItem>
                                    <MenuItem value="homeroomIds">{t('homerooms')}</MenuItem>                                        
                                    <MenuItem value="teacherId">{t('teacher')}</MenuItem>
                                    <MenuItem value="adminId">{t('schoolManagement')}</MenuItem>
                                </Select>
                            </HasRole>
                            <HasRole roles={['Superadministrator', 'Superintendent', 'Principal', 'Administrator']}>
                                <Select
                                    value={this.state.recipient || ''}
                                    onChange={(e) => { this._handleChange(e) }}
                                    name="recipient"
                                    >
                                    <MenuItem value=""></MenuItem>
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
                    <HasRole roles={['Superadministrator', 'Superintendent', 'Principal', 'Administrator', 'Teacher']}>
                    <div className="col-sm-6 col-md-5 col-lg-4">
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='type'>{t('type')}</InputLabel>
                            <Select
                                value={this.state.type || ''}
                                onChange={(e) => { this._handleChange(e) }}
                                name="type"          
                                >
                                <MenuItem value=""></MenuItem>
                                <MenuItem value="mail">{t('mail')}</MenuItem> 
                                <MenuItem value="alert">{t('alert')}</MenuItem>
                                <MenuItem value="annoucement">{t('annoucement')}</MenuItem>
                            </Select>
                            {errors && errors.get('type') && <FormHelperText error>{errors.get('type').get(0)}</FormHelperText>}
                        </FormControl>
                    </div>
                    </HasRole>
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
                                placeholder={t('message')}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                rows="20"
                                value={this.state.message || ''}
                                name="message"
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

                        <button onClick={() => { this._saveAsDraft() }} disabled={loading} className="btn btn-success m--margin-right-10" >{t('saveAsDraft')}</button>

                        <button onClick={() => { this._sendMessage() }} disabled={loading} className="btn btn-success  m--margin-right-10" >{t('sendMessage')}</button>
                            
                        <button onClick={() => { this._goBack() }} disabled={loading} className="btn btn-default" >{t('back')}</button>
                    </div>
                </div>
            </div>           
        );
    }
}

MessageForm = connect(
    (state) => ({
        homeroomsRequest: selectGetSchoolHomeroomsRequest(state),
        classroomsRequest: selectGetSchoolClassroomsRequest(state),
        teachersRequest: selectGetSchoolTeachersRequest(state),
        adminsRequest: selectGetSchoolAdminsRequest(state),
        usersRequest: selectGetUsersRequest(state),
        userRequest: selectGetUserRequest(state),
        userData: selectUserData(state)
    }),
    (dispatch) => ({
        getHomerooms: (params = {}) => { dispatch(getSchoolHomerooms(params)) },
        getClassrooms: (params = {}) => { dispatch(getSchoolClassrooms(params)) },
        getTeachers: (params = {}) => { dispatch(getSchoolTeachers(params)) },
        getUsers: (params = {}) => { dispatch(getUsers(params)) },
        getAdmins: (params = {}) => { dispatch(getSchoolAdmins(params)) }
    })
)(MessageForm);

export default translate('translations')(MessageForm);