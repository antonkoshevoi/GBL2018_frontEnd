import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Select, MenuItem, InputLabel, TextField, Input, FormControl, FormHelperText } from '@material-ui/core';
import { selectGetGroupsRequest } from '../../../redux/messages/selectors';
import { getGroups } from '../../../redux/messages/actions';
import Loader from '../../../components/layouts/Loader';

class MessageForm extends Component {

    constructor(props) {
        super(props);        
        this.state = this.getInitialState();
    }
    
    getInitialState() {
        return {                       
            group: null,
            subject: null,
            message: null
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
    
    _sendMessage() {
        const {onSubmit} = this.props;
        const {message, subject, group } = this.state;
        
        onSubmit({            
            message:    message,
            subject:    subject,
            type:       'chat',
            group:      group            
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
                <div className='row'>
                  <div className='col-sm-6 col-md-5 col-lg-4'>
                      <FormControl className='full-width form-inputs'>
                      <InputLabel htmlFor='title-error'>{t('chatName')} <span className='small'>({t('visibleForParticipants')})</span></InputLabel>
                        <Input
                          name='subject'
                          fullWidth
                          value={this.state.subject || ''}
                          onChange={(e) => {
                            this._handleChange(e)
                          }}/>
                        {errors && errors.get('name') && <FormHelperText error>{errors.get('subject').get(0)}</FormHelperText>}
                      </FormControl>
                  </div>        
                </div>                
                <div className="row">
                    <div className="col-sm-6 col-md-5 col-lg-4">
                        <FormControl className='full-width form-inputs'>
                            <InputLabel htmlFor='recipients'>{t('participants')}</InputLabel>                            
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