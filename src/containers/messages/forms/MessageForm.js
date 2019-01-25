import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Select, MenuItem, InputLabel, Input, TextField, FormControl, FormHelperText } from '@material-ui/core';
import { selectGetGroupsRequest } from '../../../redux/messages/selectors';
import { getGroups } from '../../../redux/messages/actions';
import MuiDatePicker from '../../../components/ui/MuiDatePicker';
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
            group: null,
            message: null,
            expired: null
        };
    }
    
    componentDidMount() {
        const {formData} = this.props;
        
        this.props.getGroups();
        
        if (formData) {
            this.setState(formData);            
        }                
    }
    
    _handleChange(event) {
        const { value, name } = event.target;
        
        this.setState({[name]: value});                       
    }
    
    _handleDateChange(m, dateField) {
        this.setState({[dateField]: m});
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
        const {message, type, group, subject, expired } = this.state;
        
        onSubmit({            
            message:    message,
            subject:    subject,
            type:       type,
            group:      group,            
            isDraft:    draft,
            expired:    expired
        });        
    }
    
    _goBack() {
        this.props.onCancel();
    }
    
    render() {
        const {groupsRequest, errors, t} = this.props;
        const loading = groupsRequest.get('loading');
        
        return (
            <div>
                { loading && <Loader/> }                
                <div className="row">
                    <div className="col-sm-6 col-md-5 col-lg-4">
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='recipients'>{t('recipients')}</InputLabel>                            
                            <Select
                                value={this.state.group || ''}
                                onChange={(e) => { this._handleChange(e) }}
                                name="group"
                                >
                                <MenuItem value=""></MenuItem>
                                {groupsRequest.get('records').toJS().map((item, key) => {
                                    return <MenuItem key={key} value={item.id}>{item.name}</MenuItem>;                                
                                })}
                            </Select>                                                      
                            {errors && errors.get('group') && <FormHelperText error>{errors.get('group').get(0)}</FormHelperText>}
                        </FormControl>
                    </div>
                    <HasRole roles={['Superadministrator', 'School', 'Teacher']}>
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
                  <div className='col-sm-6 col-md-5 col-lg-4'>
                      <FormControl className='full-width form-inputs'>                        
                            <MuiDatePicker
                                name='expired'
                                label={t('expires')}
                                value={this.state.expired || null}
                                onChange={(m) => {
                                  this._handleDateChange(m, 'expired')
                                }}
                              />
                        {errors && errors.get('expired') && <FormHelperText error>{errors.get('expired').get(0)}</FormHelperText>}
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
        groupsRequest: selectGetGroupsRequest(state)
    }),
    (dispatch) => ({        
        getGroups: (params = {}) => { dispatch(getGroups(params)) }
    })
)(MessageForm);

export default translate('translations')(MessageForm);