import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Select, MenuItem, InputLabel, Input, FormControl, FormHelperText, FormControlLabel, Checkbox } from '@material-ui/core';
import { selectGetSchoolHomeroomsRequest, selectGetSchoolClassroomsRequest, selectGetSchoolTeachersRequest, selectGetSchoolStudentsRequest, selectGetSchoolAdminsRequest } from '../../../redux/schools/selectors';
import { getSchoolHomerooms, getSchoolClassrooms, getSchoolTeachers, getSchoolStudents, getSchoolAdmins} from '../../../redux/schools/actions';
import { selectGetUserRequest, selectUserData } from "../../../redux/user/selectors";
import Loader from '../../../components/layouts/Loader';
import HasRole from "../../middlewares/HasRole";

class GroupForm extends Component {

    constructor(props) {
        super(props);        
        this.state = this.getInitialState();
    }
    
    getInitialState() {
        return {            
            name: null,            
            recipient: null,
            message: null,
            roles: [
                'student',
                'parents',
                'teacher',
                'principal',
                'administrator',
                'superintendent'
            ],
            rolesInGroup: [
                'student'
            ],
            adminIds: [],
            homeroomIds: [],
            classroomIds: [],
            teacherIds: [],
            roleIds: [],            
            studentIds: []            
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
            teacherIds:     () => load('getTeachers',     'teachersRequest'),
            studentIds:     () => load('getStudents',     'studentsRequest'),
            adminIds:       () => load('getAdmins',       'adminsRequest')
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
    
    _save() {        
        const {name, rolesInGroup, recipient } = this.state;
        
        this.props.onSubmit({                        
            name:       name,
            roles:      rolesInGroup,
            recipients: recipient,
            ids:        this.state[recipient] || null            
        });  
    }    
    
    _goBack() {
        this.props.onCancel();
    }     
    
    _renderRecipients()
    {        
        const {recipient, roles} = this.state;
        const {homeroomsRequest, classroomsRequest, teachersRequest, studentsRequest, adminsRequest, t}   = this.props;                
        
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
        
        if (recipient === 'teacherIds' && teachersRequest.get('success')) {   
            return this._renderRecipientCheckboxes('selectPersone', 'teacherIds', this._getOptions(teachersRequest));
        }
        
        if (recipient === 'studentIds' && studentsRequest.get('success')) {   
            return this._renderRecipientCheckboxes('selectPersone', 'studentIds', this._getOptions(studentsRequest));
        }
        if (recipient === 'adminIds' && adminsRequest.get('success')) {   
            return this._renderRecipientCheckboxes('selectPersone', 'adminIds', this._getOptions(adminsRequest));
        }        
    }
    
    _getOptions(request, id = 'id', name = 'name') {
        return request.get('records').toJS().map(item => ({
            id:     item[id],
            name:   item[name]
        }));
    }   
    
    _renderRecipientCheckboxes(title, name, options) {
        const {t, errors} = this.props;        
        const {[name]: selected} = this.state;
        
        return <div className="row">
            <div className="col-sm-12">{t(title)}</div>
            {options.map((option, key) => (
                <div key={key} className="col-sm-4 col-lg-3 margin-0">
                      <FormControlLabel
                        control={<Checkbox color="primary" checked={selected.indexOf(option.id.toString()) > -1} name={name} onChange={ (e) => {this._handleCheckboxChange(e) }} value={option.id.toString()} />}
                        label={option.name} />                            
                </div>
            ))}
            <div className="col-sm-4 col-lg-3 margin-0">
                <FormControlLabel
                  control={<Checkbox color="primary" name={name} checked={(selected.length === options.length)} onChange={ (e) => {this._handleSelectAllChange(e, options.map(option => option.id.toString())) }} value="1" />}
                  label={t('selectAll')} />                            
            </div>
            {errors && errors.get('ids') && <div className="col-sm-12"><FormHelperText error className="m--margin-top-0 m--margin-bottom-15">{errors.get('ids').get(0)}</FormHelperText></div>}
        </div>;       
    }
    
    render() {
        const {homeroomsRequest, classroomsRequest, teachersRequest, studentsRequest, adminsRequest, errors, t} = this.props;
        const {recipient, rolesInGroup} = this.state;
        const loading = homeroomsRequest.get('loading') || classroomsRequest.get('loading') || adminsRequest.get('loading') || teachersRequest.get('loading') || studentsRequest.get('loading');
        
        return (
            <div>
                { loading && <Loader/> }                       
                <div className='row'>
                  <div className='col-sm-6 col-md-5 col-lg-4'>
                      <FormControl className='full-width form-inputs'>
                        <InputLabel htmlFor='title-error'>{t('name')}</InputLabel>
                        <Input
                          name='name'
                          fullWidth
                          value={this.state.name || ''}
                          onChange={(e) => {
                            this._handleChange(e)
                          }}/>
                        {errors && errors.get('name') && <FormHelperText error>{errors.get('name').get(0)}</FormHelperText>}
                      </FormControl>
                  </div>        
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-5 col-lg-4">
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='recipients'>{t('recipientGroups')}</InputLabel>                        
                            <HasRole roles={['Teacher']}>
                                <Select
                                    value={this.state.recipient || ''}
                                    onChange={(e) => { this._handleChange(e) }}
                                    name="recipient"
                                    >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="classroomIds">{t('classrooms')}</MenuItem>
                                    <MenuItem value="homeroomIds">{t('homerooms')}</MenuItem>
                                    <MenuItem value="studentIds">{t('studentsAndParents')}</MenuItem>
                                </Select>
                            </HasRole>
                            <HasRole roles={['Superadministrator', 'School']}>
                                <Select
                                    value={this.state.recipient || ''}
                                    onChange={(e) => { this._handleChange(e) }}
                                    name="recipient"
                                    >
                                    <MenuItem value=""></MenuItem>
                                    <MenuItem value="roleIds">{t('entireSchool')}</MenuItem>
                                    <MenuItem value="adminIds">{t('schoolManagement')}</MenuItem>
                                    <MenuItem value="classroomIds">{t('classrooms')}</MenuItem>
                                    <MenuItem value="homeroomIds">{t('homerooms')}</MenuItem>                                           
                                    <MenuItem value="teacherIds">{t('teachers')}</MenuItem>
                                    <MenuItem value="studentIds">{t('studentsAndParents')}</MenuItem>
                                </Select>
                            </HasRole>
                            {errors && errors.get('recipients') && <FormHelperText error>{errors.get('recipients').get(0)}</FormHelperText>}
                        </FormControl>
                    </div> 
                </div>
                {this._renderRecipients()}
                { !loading && (['classroomIds', 'homeroomIds', 'studentIds'].indexOf(recipient) > -1) &&
                <div className='row'>
                    <div className='col-sm-6 col-md-5 col-lg-4'>
                        <InputLabel htmlFor='title-error'>{t('userRolesInGroups')}</InputLabel>
                        <div>
                            <FormControlLabel
                                control={<Checkbox color="primary" name="rolesInGroup" checked={rolesInGroup.indexOf('student') > -1} onChange={(e) => this._handleCheckboxChange(e)} value="student" />}
                                label={t('studentRole')} />                             
                            <FormControlLabel
                                control={<Checkbox color="primary" name="rolesInGroup" checked={rolesInGroup.indexOf('parents') > -1} onChange={(e) => this._handleCheckboxChange(e)} value="parents" />}
                                label={t('parentsRole')} />  
                        </div>
                    </div>
                </div>}
                <div className='row'>
                    <div className='col-sm-12 col-md-12 text-center'>                        

                        <button onClick={() => { this._save() }} disabled={loading} className="btn btn-success  m--margin-right-10" >{t('save')}</button>
                            
                        <button onClick={() => { this._goBack() }} disabled={loading} className="btn btn-default" >{t('back')}</button>
                    </div>
                </div>
            </div>           
        );
    }
}

GroupForm = connect(
    (state) => ({
        homeroomsRequest: selectGetSchoolHomeroomsRequest(state),
        classroomsRequest: selectGetSchoolClassroomsRequest(state),
        teachersRequest: selectGetSchoolTeachersRequest(state),
        studentsRequest: selectGetSchoolStudentsRequest(state),
        adminsRequest: selectGetSchoolAdminsRequest(state),
        userRequest: selectGetUserRequest(state),
        userData: selectUserData(state)
    }),
    (dispatch) => ({
        getHomerooms: (params = {}) => { dispatch(getSchoolHomerooms(params)) },
        getClassrooms: (params = {}) => { dispatch(getSchoolClassrooms(params)) },
        getTeachers: (params = {}) => { dispatch(getSchoolTeachers(params)) },
        getStudents: (params = {}) => { dispatch(getSchoolStudents(params)) },
        getAdmins: (params = {}) => { dispatch(getSchoolAdmins(params)) }
    })
)(GroupForm);

export default translate('translations')(GroupForm);