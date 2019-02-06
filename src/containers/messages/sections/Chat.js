import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetChatMessagesRequest, selectReplyMessageRequest } from '../../../redux/messages/selectors';
import { getChatMessages, replyMessage } from '../../../redux/messages/actions';

import { CircularProgress, Divider, TextField, FormControl, FormHelperText, InputLabel } from '@material-ui/core';

import Loader from '../../../components/layouts/Loader';
import moment from 'moment/moment';

class Chat extends Component {
       
    constructor(props) {
        super(props);
                
        this.state = {
            message: '',
            chatId: this.props.chatId
        }
    }

    componentWillMount() {
        if (this.state.chatId) {
            this._getRecords(this.state.chatId);
        }
    }
   
    componentWillReceiveProps(nextProps) {        
        if (nextProps.chatId !== this.props.chatId) {
            this.setState({chatId: nextProps.chatId});            
            this._getRecords(nextProps.chatId);
        }
        
        if (!this.props.replyMessageRequest.get('success') && nextProps.replyMessageRequest.get('success')) {
            this.setState({message: ''});
        }     
    }
    
    _getRecords(chatId) {
        this.props.getRecords(chatId);
    }
    
    _handleChange(event) {
        const { value, name } = event.target;
        this.setState({[name]: value});
    }
    
    _send() {
        const { chatId, message} = this.state;    
        this.props.replyMessage(chatId, {
            message
        });
    }
    
    _renderRecords() {
        const {t} = this.props;
        const loading = this.props.getRecordsRequest.get('loading');
        const records = this.props.getRecordsRequest.get('records');

        return records.map((record, key) => (
            <div className={`message-box my-2 ${record.get('isMine') ? 'sent' : 'inbox'}`}  index={key} key={key}>
                <div className='text-muted'>
                    {record.get('isMine') ? t('me') : record.get('user').get('name')}, {moment(record.get('created')).format('lll')}
                </div>
                <div className='message-content'>
                    <div className='pre-line'>                    
                        {record.get('body')}
                    </div>                
                </div>
            </div>
        ));        
    }

    _scrollToBottom = () => {
        console.log('_scrollToBottom');    
        console.log(this.messages);
        this.messages.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this._scrollToBottom();
    }

    componentDidUpdate() {
        this._scrollToBottom();
    }

    render() {
        const {getRecordsRequest, replyMessageRequest, t} = this.props;
        const {message} = this.state;
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');        

        return (
            <div className='px-3 py-3'>
                <div className="chat-messages" ref={(el) => { this.messages = el; }}>
                    <div className='mr-2'>
                        {loading && <Loader /> }
                        {success && this._renderRecords() }
                    </div>
                </div>
                <div className='new-message'>
                    <div className='form-group'>
                        <FormControl className='full-width'>
                            <TextField                                                                                    
                                multiline
                                name="message"                                        
                                placeholder={t('message')}          
                                fullWidth
                                margin="normal"
                                variant="outlined"                                          
                                rows="3"                                  
                                value={message || ''}                                                       
                                onChange={(e) => {
                                    this._handleChange(e)
                                }}                      
                            />                                    
                        </FormControl>
                    </div>
                    <div className='form-group'>
                        <button disabled={replyMessageRequest.get('loading')} className='mt-btn-success btn btn-success mt-btn' onClick={ () => {this._send() }} >
                          {t('sendMessage')}
                        </button>                            
                    </div>
                </div>
            </div>
        );
    }
}

Chat = connect(
    (state) => ({
        getRecordsRequest: selectGetChatMessagesRequest(state),
        replyMessageRequest: selectReplyMessageRequest(state)
    }),
    (dispatch) => ({
        getRecords: (id, params = {}) => {
            dispatch(getChatMessages(id, params));
        },
        replyMessage: (id, params = {}) => {
            dispatch(replyMessage(id, params));
        }
    })
)(Chat);

export default translate('translations')(Chat);