import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { selectGetChatMessagesRequest, selectSendMessageRequest } from '../../../redux/messages/selectors';
import { getChatMessages, sendChatMessage } from '../../../redux/messages/actions';
import { CircularProgress, Avatar, TextField, FormControl } from '@material-ui/core';
import Loader from '../../../components/layouts/Loader';
import moment from 'moment/moment';

class Chat extends Component {
       
    constructor(props) {
        super(props);
                
        console.log('Chat: ' + this.props.chatId);
        this.state = {
            message:    '',
            chatId:     this.props.chatId
        }
    }

    componentWillMount() {
        if (this.props.chatId) {
            this._getRecords(this.props.chatId);
        }
    }
   
    componentWillReceiveProps(nextProps) {        
        if (nextProps.chatId !== this.props.chatId) {                                        
            this._getRecords(nextProps.chatId);
        }           
        
        if (!this.props.sendMessageRequest.get('success') && nextProps.sendMessageRequest.get('success')) {
            this.setState({message: ''});
        }     
    }
    
    _getRecords(chatId) {
        this.setState({
            chatId: chatId            
        });

        this.props.getChatMessages(chatId);
    }
    
    _handleChange(event) {
        const { value, name } = event.target;
        this.setState({[name]: value});
    }
    
    _send() {
        const { message, chatId} = this.state;
        
        console.log('send message to chat = ' + chatId);
        
        this.props.sendMessage({                       
            chatId:     chatId,
            message:    message
        });
    }
    
    _renderRecords() {
        const {t} = this.props;        
        const records = this.props.getRecordsRequest.get('records');
        
        if (!records.size) {
            return <div><h3 className='text-center my-5'>{t('messagesNotFound')}</h3></div>;
        }

        return records.map((record, key) => (
            <div className={`message-box my-2 ${record.get('isMine') ? 'sent' : 'inbox'}`}  index={key} key={key}>
                {!record.get('isMine') && <div className='d-inline-block mr-3'>
                    <Avatar src={record.get('user').get('avatarSmall')} className='border' />
                </div>}
                <div className='d-inline-block'>
                    <div className='text-muted'>
                        {record.get('isMine') ? t('me') : record.get('user').get('name')}, {moment(record.get('created')).format('lll')}
                    </div>
                    <div className='message-content mt-1'>
                        <div className='pre-line'>                    
                            {record.get('body')}
                        </div>                
                    </div>
                </div>
            </div>
        ));        
    }
    
    _handleKeyPress(e) {
        if (e.shiftKey) {
            return;
        }        
        if (e.key === 'Enter') {
            this._send();
        }
    }

    _scrollToBottom = () => {       
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    componentDidMount() {
        this._scrollToBottom();
    }

    componentDidUpdate() {
        this._scrollToBottom();
    }

    render() {
        const {getRecordsRequest, sendMessageRequest, t} = this.props;
        const {message} = this.state;
        const loading = getRecordsRequest.get('loading');
        const success = getRecordsRequest.get('success');        

        return (
            <div class='h-100 px-3'>
                {loading && <Loader /> }
                <div className="chat-messages" ref={(el) => { this.messages = el; }}>
                    <div className='mx-2'>
                        {success && this._renderRecords() }
                        {sendMessageRequest.get('loading') && <CircularProgress className="float-right my-2 mx-2" />}
                    </div>
                </div>
                <div className='px-3 new-message'>
                    <div className='form-group'>
                        <FormControl className='full-width'>
                            <TextField                                                                                    
                                multiline
                                name="message"                                        
                                placeholder={t('message')}          
                                fullWidth
                                margin="normal"
                                variant="outlined"                                          
                                rows="2"
                                disabled={sendMessageRequest.get('loading')}
                                value={message || ''}
                                onKeyPress={(e) => {
                                    this._handleKeyPress(e)
                                }}
                                onChange={(e) => {
                                    this._handleChange(e)
                                }}                      
                            />                                    
                        </FormControl>
                    </div>
                </div>
            </div>
        );
    }
}

Chat = connect(
    (state) => ({
        getRecordsRequest: selectGetChatMessagesRequest(state),
        sendMessageRequest: selectSendMessageRequest(state)
    }),
    (dispatch) => ({
        getChatMessages: (id, params = {}) => {
            dispatch(getChatMessages(id, params));
        },
        sendMessage: (id, params = {}) => {
            dispatch(sendChatMessage(id, params));
        }
    })
)(Chat);

export default translate('translations')(Chat);