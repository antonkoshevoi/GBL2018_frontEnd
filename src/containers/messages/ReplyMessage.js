import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { InputLabel, Input, TextField, FormControl, FormHelperText, FormControlLabel } from '@material-ui/core';
import { selectSendMessageRequest, selectGetRecordRequest } from '../../redux/messages/selectors';
import { sendMessage, getDraftMessage, resetSendMessageRequest, resetGetMessageRequest } from '../../redux/messages/actions';
import Loader from '../../components/layouts/Loader';

class ReplyMessage extends Component {

    constructor(props) {
        super(props);        
        this.state = this.getInitialState();
    }
    
    getInitialState() {
        return {
            id: null,
            subject: null,                        
            message: null         
        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {            
            this.props.getDraftMessage(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(nextProps) {
       
        const {
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
        
        if (!sendMessageRequest.get('success') && nextProps.sendMessageRequest.get('success')) {
            resetSendMessageRequest();
            goTo(`/messages/${this.state.isDraft ? 'drafts' : 'sent'}`);
        }        
    }    
    
    _handleChange(event) {
        const { value, name } = event.target;
        
        this.setState({[name]: value});        
    }
              
    _sendMessage() {
        const {sendMessage} = this.props;
        const {message, subject, id } = this.state;                
        
        sendMessage({
            messageId:  id,
            message:    message,
            subject:    subject
        });        
    }
    
    _goBack() {
        this.props.resetGetMessageRequest();     
        this.props.resetSendMessageRequest();        
        this.props.goTo(this.state.draftId ? '/messages/drafts' : '/messages');
    }         
        
    render() {
        const {sendMessageRequest, messageRequest, t} = this.props;
               
        const errors = sendMessageRequest.get('errors');
        const loading = sendMessageRequest.get('loading') || messageRequest.get('loading') ;
        
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
                                <h3 className='m-portlet__head-text'>{t('ReplyMessage')}</h3>
                            </div>
                        </div>
                    </div>          
                    <div className="m-portlet__body">                        
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
                                                                        
                                <button onClick={() => { this._sendMessage() }} disabled={loading} className="btn btn-success" >{t('sendMessage')}</button>
                            </div>
                        </div>
                    </div>
                </div>                    
            </div>
        );
    }
}

ReplyMessage = connect(
    (state) => ({    
        messageRequest: selectGetRecordRequest(state),
        sendMessageRequest: selectSendMessageRequest(state)
    }),
    (dispatch) => ({
        getDraftMessage: (id) => { dispatch(getDraftMessage(id)) },
        resetGetMessageRequest: () => { dispatch(resetGetMessageRequest()) },
        sendMessage: (params = {}) => { dispatch(sendMessage(params)) },
        resetSendMessageRequest: () => { dispatch(resetSendMessageRequest()) },        
        goTo: (page) => { dispatch(push(page)) }
    })
)(ReplyMessage);

export default translate('translations')(ReplyMessage);